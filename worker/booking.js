const LIMITS = { name: 200, school: 200, contact: 200, level: 100, need: 100, note: 2000 }

async function sendNotification(data, env) {
  const missing = ['RESEND_API_KEY', 'NOTIFY_EMAIL'].filter((key) => !env[key])
  if (missing.length) {
    console.error('booking.email_unconfigured', { missing })
    return false
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `言传中文预约表单 <${env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [env.NOTIFY_EMAIL],
        subject: `【言传中文】新的预约咨询 · ${data.name}`,
        text: [
          `姓名：${data.name}`,
          `学校 / 工作单位：${data.school}`,
          `联系方式：${data.contact}`,
          `中文水平：${data.level}`,
          `主要需求：${data.need}`,
          `备注：${data.note || '（无）'}`,
          '',
          `提交时间（UTC）：${data.ts}`,
        ].join('\n'),
      }),
    })
    if (!res.ok) console.error('booking.email_rejected', { status: res.status })
    return res.ok
  } catch {
    console.error(controller.signal.aborted ? 'booking.email_timeout' : 'booking.email_failed')
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export async function handleBooking(request, env, ctx) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ ok: false }, { status: 400 })
  }

  // 蜜罐：返回假成功，不保存或发送邮件。
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return Response.json({ ok: true })
  }

  const data = {}
  for (const [key, limit] of Object.entries(LIMITS)) {
    data[key] = typeof body[key] === 'string' ? body[key].trim().slice(0, limit) : ''
  }
  if (!data.name || !data.school || !data.contact) {
    return Response.json({ ok: false }, { status: 400 })
  }
  data.ts = new Date().toISOString()

  let saved = false
  try {
    await env.BOOKINGS.put(`booking-${Date.now()}-${crypto.randomUUID()}`, JSON.stringify(data))
    saved = true
  } catch {
    console.error('booking.kv_failed')
  }

  if (saved) {
    // KV 已留档，通知在响应后继续执行；邮件慢或失败不影响预约成功。
    ctx.waitUntil(sendNotification(data, env))
    return Response.json({ ok: true, saved: true })
  }

  // KV 故障时等待邮件结果，至少确认一个渠道接收后才返回成功。
  const emailed = await sendNotification(data, env)
  if (emailed) return Response.json({ ok: true, saved: false, emailed: true })
  return Response.json({ ok: false }, { status: 500 })
}
