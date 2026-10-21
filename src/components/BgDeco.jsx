import { useEffect, useRef } from 'react'

// 全局透视装饰层：固定色斑 + 滚动视差（尊重 reduced-motion）
export default function BgDeco() {
  const boxRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = boxRef.current
    if (!box) return
    const blobs = Array.from(box.querySelectorAll('.blob'))
    if (!blobs.length) return
    let tick = false
    const onScroll = () => {
      if (tick) return; tick = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        blobs.forEach((b, i) => { b.style.marginTop = (y * 0.07 * (i % 2 ? -1 : 1) * (0.6 + i * 0.12)) + 'px' })
        tick = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-deco" aria-hidden="true" ref={boxRef}>
      <span className="blob b1" /><span className="blob b2" /><span className="blob b3" /><span className="blob b4" /><span className="blob b5" />
    </div>
  )
}
