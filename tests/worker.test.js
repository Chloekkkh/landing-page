import assert from 'node:assert/strict'
import test from 'node:test'
import worker from '../worker/index.js'

const valid = { name: 'Test Student', school: 'Test School', contact: 'test@example.com' }

function setup(t, { kvFails = false, email = true } = {}) {
  const writes = []
  const tasks = []
  const logs = t.mock.method(console, 'error', () => {})
  const mail = t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: 200 }))
  const env = {
    BOOKINGS: {
      async put(key, value) {
        if (kvFails) throw new Error('KV unavailable')
        writes.push({ key, data: JSON.parse(value) })
      },
    },
    ASSETS: { fetch: async () => new Response('asset') },
    ...(email ? { RESEND_API_KEY: 'mock-key', NOTIFY_EMAIL: 'owner@example.com' } : {}),
  }
  const ctx = { waitUntil: (task) => tasks.push(task) }
  const request = (body = JSON.stringify(valid), pathname = '/api/booking', method = 'POST') =>
    worker.fetch(new Request(`https://example.test${pathname}`, { method, ...(method === 'POST' ? { body } : {}) }), env, ctx)
  return { env, request, writes, tasks, mail, logs }
}

for (const body of ['{', 'null', '[]', '"string"', '42', 'true', '{}', '{"name":12,"school":"Test","contact":"test"}']) {
  test(`rejects invalid booking input: ${body}`, async (t) => {
    const { request, writes, mail } = setup(t)
    const res = await request(body)
    assert.equal(res.status, 400)
    assert.deepEqual(await res.json(), { ok: false })
    assert.equal(writes.length, 0)
    assert.equal(mail.mock.callCount(), 0)
  })
}

test('honeypot returns success without saving or notifying', async (t) => {
  const { request, writes, mail } = setup(t)
  const res = await request(JSON.stringify({ website: 'bot' }))
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(writes.length, 0)
  assert.equal(mail.mock.callCount(), 0)
})

test('trims, limits and stores fields, ignoring extra input', async (t) => {
  const { request, writes, tasks, mail } = setup(t)
  const res = await request(JSON.stringify({ ...valid, name: '  Test Student  ', note: 'x'.repeat(2100), level: 12, admin: true }))
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true, saved: true })
  assert.match(writes[0].key, /^booking-\d+-[a-f0-9-]+$/)
  assert.equal(writes[0].data.name, 'Test Student')
  assert.equal(writes[0].data.note.length, 2000)
  assert.equal(writes[0].data.level, '')
  assert.equal(writes[0].data.admin, undefined)
  assert.ok(Number.isFinite(Date.parse(writes[0].data.ts)))
  await Promise.all(tasks)
  const [url, options] = mail.mock.calls[0].arguments
  assert.equal(url, 'https://api.resend.com/emails')
  assert.equal(JSON.parse(options.body).from, '言传中文预约表单 <onboarding@resend.dev>')
  assert.deepEqual(JSON.parse(options.body).to, ['owner@example.com'])
})

test('responds after KV save while email is still pending', async (t) => {
  const { request, tasks } = setup(t)
  let finishEmail
  t.mock.method(globalThis, 'fetch', () => new Promise((resolve) => { finishEmail = resolve }))
  try {
    const res = await request()
    assert.deepEqual(await res.json(), { ok: true, saved: true })
    assert.equal(tasks.length, 1)
  } finally {
    finishEmail(new Response('{}'))
    await Promise.all(tasks)
  }
})

test('saves successfully when email is unconfigured', async (t) => {
  const { request, tasks, mail, logs } = setup(t, { email: false })
  assert.deepEqual(await (await request()).json(), { ok: true, saved: true })
  await Promise.all(tasks)
  assert.equal(mail.mock.callCount(), 0)
  assert.deepEqual(logs.mock.calls[0].arguments, ['booking.email_unconfigured', {
    missing: ['RESEND_API_KEY', 'NOTIFY_EMAIL'],
  }])
})

for (const missingKey of ['RESEND_API_KEY', 'NOTIFY_EMAIL']) {
  test(`reports only missing ${missingKey} without logging configuration values`, async (t) => {
    const { env, request, writes, tasks, mail, logs } = setup(t)
    delete env[missingKey]
    const res = await request()
    assert.deepEqual(await res.json(), { ok: true, saved: true })
    assert.equal(writes.length, 1)
    await Promise.all(tasks)
    assert.equal(mail.mock.callCount(), 0)
    assert.deepEqual(logs.mock.calls.map((call) => call.arguments), [
      ['booking.email_unconfigured', { missing: [missingKey] }],
    ])
  })
}

test('background email rejection does not undo a saved booking or log provider data', async (t) => {
  const { request, tasks, logs } = setup(t)
  t.mock.method(globalThis, 'fetch', async () => new Response('private-provider-detail', { status: 403 }))
  assert.deepEqual(await (await request()).json(), { ok: true, saved: true })
  assert.deepEqual(await Promise.all(tasks), [false])
  assert.deepEqual(logs.mock.calls[0].arguments, ['booking.email_rejected', { status: 403 }])
})

test('email can receive the booking when KV fails, using the configured sender', async (t) => {
  const { env, request, tasks, mail } = setup(t, { kvFails: true })
  env.RESEND_FROM_EMAIL = 'bookings@example.com'
  const res = await request()
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true, saved: false, emailed: true })
  assert.equal(tasks.length, 0)
  assert.equal(JSON.parse(mail.mock.calls[0].arguments[1].body).from, '言传中文预约表单 <bookings@example.com>')
})

for (const failure of ['rejected', 'network', 'unconfigured']) {
  test(`returns 500 when KV fails and email is ${failure}`, async (t) => {
    const { request } = setup(t, { kvFails: true, email: failure !== 'unconfigured' })
    t.mock.method(globalThis, 'fetch', async () => {
      if (failure === 'network') throw new Error('private-network-detail')
      return new Response('{}', { status: 429 })
    })
    const res = await request()
    assert.equal(res.status, 500)
    assert.deepEqual(await res.json(), { ok: false })
  })
}

for (const kvFails of [false, true]) {
  test(`aborts pending email after five seconds with KV ${kvFails ? 'failed' : 'saved'}`, async (t) => {
    const { request, tasks, logs } = setup(t, { kvFails })
    t.mock.timers.enable({ apis: ['setTimeout'] })
    let started
    const emailStarted = new Promise((resolve) => { started = resolve })
    t.mock.method(globalThis, 'fetch', (_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true })
      started()
    }))
    const response = request()
    await emailStarted
    if (!kvFails) assert.deepEqual(await (await response).json(), { ok: true, saved: true })
    t.mock.timers.tick(5000)
    const res = await response
    await Promise.all(tasks)
    assert.equal(res.status, kvFails ? 500 : 200)
    assert.ok(logs.mock.calls.some((call) => call.arguments[0] === 'booking.email_timeout'))
  })
}

for (const method of ['GET', 'PUT', 'DELETE', 'OPTIONS']) {
  test(`booking rejects ${method} with JSON 405`, async (t) => {
    const { request, writes } = setup(t)
    const res = await request(undefined, '/api/booking', method)
    assert.equal(res.status, 405)
    assert.equal(res.headers.get('Allow'), 'POST')
    assert.deepEqual(await res.json(), { ok: false })
    assert.equal(writes.length, 0)
  })
}

for (const pathname of ['/api', '/api/missing']) {
  test(`unknown API ${pathname} returns JSON 404`, async (t) => {
    const { request } = setup(t)
    const res = await request(undefined, pathname, 'GET')
    assert.equal(res.status, 404)
    assert.deepEqual(await res.json(), { ok: false })
  })
}

test('non-API requests go to the static asset binding', async (t) => {
  const { request } = setup(t)
  assert.equal(await (await request(undefined, '/', 'GET')).text(), 'asset')
  assert.equal(await (await request(undefined, '/assets/carousel/svc1.png', 'GET')).text(), 'asset')
})
