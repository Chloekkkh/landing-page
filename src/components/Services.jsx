import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n.jsx'

// 轮播数据：与旧版 index.html 的 5 张 slide 一一对应（第 5 张为活动页，用 event 文案代替三项列表）
const SLIDES = [
  { img: '/assets/carousel/svc1.png', alt: '学业通关辅导 · 老师一对一辅导留学生写作业', no: '01',
    title: 'svc1.title', sub: 'svc1.sub', who: 'svc1.who',
    items: [['svc1.li1b', 'svc1.li1s'], ['svc1.li2b', 'svc1.li2s'], ['svc1.li3b', 'svc1.li3s']] },
  { img: '/assets/carousel/svc2.png', alt: 'HSK 专项冲刺课 · 词汇表讲解与模拟练习', no: '02',
    title: 'svc2.title', sub: 'svc2.sub', who: 'svc2.who',
    items: [['svc2.li1b', 'svc2.li1s'], ['svc2.li2b', 'svc2.li2s'], ['svc2.li3b', 'svc2.li3s']] },
  { img: '/assets/carousel/svc3.png', alt: '生活文化中文课 · 课堂茶话文化互动', no: '03',
    title: 'svc3.title', sub: 'svc3.sub', who: 'svc3.who',
    items: [['svc3.li1b', 'svc3.li1s'], ['svc3.li2b', 'svc3.li2s'], ['svc3.li3b', 'svc3.li3s']] },
  { img: '/assets/carousel/svc4.png', alt: '商务职场中文课 · 会议室情景对话演练', no: '04',
    title: 'svc4.title', sub: 'svc4.sub', who: 'svc4.who',
    items: [['svc4.li1b', 'svc4.li1s'], ['svc4.li2b', 'svc4.li2s'], ['svc4.li3b', 'svc4.li3s']] },
  { img: '/assets/carousel/svc5.png', alt: '月度文化体验活动 · 中式茶文化与月饼体验', no: '05',
    title: 'act.h3', sub: 'act.tag', who: 'act.note', event: 'act.p' },
]

export default function Services() {
  const { t } = useI18n()
  const [cur, setCur] = useState(0)
  const curRef = useRef(0)
  const hoveredRef = useRef(false)
  const timerRef = useRef(null)
  const rootRef = useRef(null)
  const n = SLIDES.length
  const reduced = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const stop = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null } }
  const start = () => { if (reduced || hoveredRef.current) return; stop(); timerRef.current = setInterval(() => go(curRef.current + 1), 6000) }
  const go = (i) => { const next = ((i % n) + n) % n; curRef.current = next; setCur(next) }

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let sx = null
    // 键盘：轮播在视口内时 ← → 切换
    const onKey = (e) => {
      const r = root.getBoundingClientRect()
      if (r.top > window.innerHeight || r.bottom < 0) return
      if (e.key === 'ArrowRight') { go(curRef.current + 1); start() }
      else if (e.key === 'ArrowLeft') { go(curRef.current - 1); start() }
    }
    // 悬停暂停、移开继续：只认真实鼠标移动，触屏点按合成的假悬停不会把播放停死
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const over = root.contains(e.target)
      if (over === hoveredRef.current) return
      hoveredRef.current = over
      if (over) stop(); else start()
    }
    const onTouchStart = (e) => { sx = e.touches[0].clientX; stop() }
    const onTouchEnd = (e) => {
      if (sx !== null) {
        const dx = e.changedTouches[0].clientX - sx
        if (Math.abs(dx) > 40) go(curRef.current + (dx < 0 ? 1 : -1))
        sx = null
      }
      start() // 竖滑 / 轻点后恢复自动播放
    }
    const onTouchCancel = () => { sx = null; start() }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointermove', onMove)
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchend', onTouchEnd, { passive: true })
    root.addEventListener('touchcancel', onTouchCancel, { passive: true })
    start()
    return () => {
      stop()
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointermove', onMove)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchend', onTouchEnd)
      root.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [])

  return (
    <section id="services">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap">
        <div className="text-center center">
          <span className="kicker">{t('svc.kicker')}</span>
          <h2>{t('svc.h2')}</h2>
        </div>
        <div className="carousel reveal" id="svcCarousel" ref={rootRef}>
          <button className="c-arrow prev" type="button" aria-label="上一条" onClick={() => { go(curRef.current - 1); start() }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <div className="c-viewport">
            {SLIDES.map((s, idx) => {
              const rel = ((idx - cur) % n + n) % n
              const cls = ['slide',
                rel === 0 && 'active',
                rel === 1 && 'pos-next',
                rel > 1 && rel < n - 1 && 'pos-hidden',
                rel === n - 1 && 'pos-prev'].filter(Boolean).join(' ')
              return (
                <div key={idx} className={cls} onClick={() => { if (rel === 1 || rel === n - 1) { go(idx); start() } }}>
                  <div className="slide-img"><div className="slide-img-inner"><img src={s.img} alt={s.alt} /></div></div>
                  <div className="slide-body"><span className="ghost">{s.no}</span>
                    <div className="svc-head">
                      <span className="no">{s.no}</span>
                      <div>
                        <h3>{t(s.title)}</h3>
                        <div className="tag">{t(s.sub)}</div>
                      </div>
                    </div>
                    <span className="who">{t(s.who)}</span>
                    {s.event
                      ? <p className="act-p">{t(s.event)}</p>
                      : <ul>{s.items.map(([b, s2], j) => (<li key={j}><b>{t(b)}</b><span>{t(s2)}</span></li>))}</ul>}
                  </div>
                </div>
              )
            })}
          </div>
          <button className="c-arrow next" type="button" aria-label="下一条" onClick={() => { go(curRef.current + 1); start() }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="c-dots">
            {SLIDES.map((_, i) => (
              <button key={i} type="button" className={i === cur ? 'active' : ''} aria-label={String(i + 1)}
                onClick={() => { go(i); start() }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
