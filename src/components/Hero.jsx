import { useMemo } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Hero() {
  const { t } = useI18n()

  // 中央声波频谱条：中心对称、边缘渐低，逐条错峰跳动（生成公式与旧版一致）
  const bars = useMemo(() => {
    const n = 31, half = (n - 1) / 2
    return Array.from({ length: n }, (_, j) => {
      const x = Math.abs(j - half) / half // 0=中心 1=两端
      return {
        height: (10 + 40 * Math.pow(1 - x, 1.7) + Math.random() * 5).toFixed(1) + 'px',
        opacity: (0.3 + 0.55 * (1 - x)).toFixed(2),
        animationDelay: (-Math.random() * 2).toFixed(2) + 's',
        animationDuration: (1.3 + Math.random()).toFixed(2) + 's',
      }
    })
  }, [])

  return (
    <header className="hero" id="top">
      <span className="blk b1" aria-hidden="true" /><span className="blk b2" aria-hidden="true" />
      <span className="blk b3" aria-hidden="true" /><span className="blk b4" aria-hidden="true" />
      <span className="echo e1" aria-hidden="true" /><span className="echo e2" aria-hidden="true" /><span className="echo e3" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 hero-inner">
        <h1>
          <span className="grad">{t('hero.brand')}</span>
          <span className="ht-tag">{t('hero.tagline')}</span>
        </h1>
        <div className="voice-wave" aria-hidden="true">
          {bars.map((b, i) => <i key={i} style={b} />)}
        </div>
        <div className="flex gap-4 flex-wrap justify-center mt-[34px]">
          <a className="btn btn-secondary w-[260px] max-w-full" href="#services">{t('hero.cta2')}</a>
          <a className="btn btn-primary w-[260px] max-w-full" href="#booking">{t('hero.cta1')}</a>
        </div>
      </div>
      <div className="scroll-hint">SCROLL</div>
    </header>
  )
}
