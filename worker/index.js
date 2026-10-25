import { handleBooking } from './booking.js'

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/booking') {
      if (request.method !== 'POST') {
        return Response.json({ ok: false }, { status: 405, headers: { Allow: 'POST' } })
      }
      return handleBooking(request, env, ctx)
    }

    if (pathname === '/api' || pathname.startsWith('/api/')) {
      return Response.json({ ok: false }, { status: 404 })
    }

    return env.ASSETS.fetch(request)
  },
}
