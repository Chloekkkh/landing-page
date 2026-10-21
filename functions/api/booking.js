// 预约表单接收：写入 KV 备份 + 通过 Resend 发送通知邮件
// 部署：Cloudflare Pages（functions/ 自动识别为 API 路由）
//   需绑定 KV namespace `BOOKINGS`；环境变量（Secrets）：RESEND_API_KEY、NOTIFY_EMAIL
// 发件说明：Resend 免费层沙箱域（onboarding@resend.dev）只能发到账户验证过的邮箱；
//   验证自有域名后把下方 from 改为 hello@mandarinbridge.cn 即可

const LIMITS = { name: 200, school: 200, contact: 200, level: 100, need: 100, note: 2000 }

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false }, 400)
  }

  // 蜜罐：隐藏字段被填写说明是 bot，假装成功但不做任何事
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true })
  }

  const data = {}
  for (const k of Object.keys(LIMITS)) {
    const v = body[k]
    data[k] = typeof v === 'string' ? v.trim().slice(0, LIMITS[k]) : ''
  }
  // 必填校验
  if (!data.name || !data.school || !data.contact) return json({ ok: false }, 400)

  data.ts = new Date().toISOString()

  // 1) KV 备份优先：备份成功即视为提交成功，邮件失败不丢单
  let saved = false
  try {
    await env.BOOKINGS.put(`booking-${Date.now()}-${crypto.randomUUID()}`, JSON.stringify(data))
    saved = true
  } catch (err) {
    console.error('KV write failed:', err)
  }

  // 2) Resend 邮件通知
  let emailed = false
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: '言传中文预约表单 <onboarding@resend.dev>',
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
      emailed = res.ok
      if (!res.ok) console.error('Resend failed:', res.status, await res.text())
    } catch (err) {
      console.error('Resend error:', err)
    }
  } else {
    console.error('Missing RESEND_API_KEY / NOTIFY_EMAIL env vars')
  }

  if (!saved && !emailed) return json({ ok: false }, 500)
  return json({ ok: true, saved, emailed })
}
