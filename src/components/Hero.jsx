import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Pause, Play } from '@phosphor-icons/react'
import { useI18n } from '../i18n.jsx'
import { animateElement, enterFrames, useReducedMotion } from '../motion.js'

export default function Hero() {
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const rootRef = useRef(null)
  const photoRef = useRef(null)
  const waveRef = useRef(null)
  const enteredRef = useRef(false)
  const photoEnteredRef = useRef(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [canObserve, setCanObserve] = useState(() => typeof IntersectionObserver === 'function')
  const bars = useMemo(() => {
    const count = 31
    const half = (count - 1) / 2
    return Array.from({ length: count }, (_, index) => {
      const distance = Math.abs(index - half) / half
      return {
        height: ((10 + 40 * Math.pow(1 - distance, 1.7) + Math.random() * 5) / 56 * 100).toFixed(1) + '%',
        opacity: (0.3 + 0.55 * (1 - distance)).toFixed(2),
        animationDelay: (-Math.random() * 2).toFixed(2) + 's',
        animationDuration: (1.3 + Math.random()).toFixed(2) + 's',
      }
    })
  }, [])

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    update()
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!canObserve) return
    let observer
    try {
      observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
      observer.observe(waveRef.current)
    } catch {
      setCanObserve(false)
    }
    return () => observer?.disconnect()
  }, [canObserve])

  useEffect(() => {
    if (enteredRef.current) return
    if (reduced) { enteredRef.current = true; return }
    let animations = []
    const frame = requestAnimationFrame(() => {
      enteredRef.current = true
      animations = [...rootRef.current.querySelectorAll('[data-hero-step]')]
        .map((element, index) => animateElement(element, enterFrames(), {
          duration: 480, delay: index * 80, fill: 'backwards',
        })).filter(Boolean)
    })
    return () => { cancelAnimationFrame(frame); animations.forEach((animation) => animation.cancel()) }
  }, [reduced])

  useEffect(() => {
    if (photoEnteredRef.current) return
    if (reduced) { photoEnteredRef.current = true; return }
    const image = photoRef.current
    let animation
    let frame
    let observer
    let visible = false
    const play = () => {
      if (!visible || !image.complete || !image.naturalWidth || photoEnteredRef.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!visible || photoEnteredRef.current) return
        photoEnteredRef.current = true
        animation = animateElement(image, [{ transform: 'scale(1.015)' }, { transform: 'scale(1)' }], { duration: 640 })
        observer?.disconnect()
      })
    }
    const rect = image.getBoundingClientRect()
    visible = rect.top < window.innerHeight && rect.bottom > 0
    if (window.IntersectionObserver) {
      try {
        observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; play() }, { threshold: 0.1 })
        observer.observe(image)
      } catch { /* Keep the original image visible if observation is unavailable. */ }
    }
    image.addEventListener('load', play)
    play()
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      image.removeEventListener('load', play)
      animation?.cancel()
    }
  }, [reduced])

  const staticWave = reduced || !canObserve
  const playing = !staticWave && !paused && inView && pageVisible
  const waveLabel = t(staticWave ? 'hero.waveStatic' : paused ? 'hero.wavePlay' : 'hero.wavePause')

  return (
    <header className="hero" id="top" ref={rootRef}>
      <div className="page-wrap hero-inner">
        <h1 data-hero-step>{t('hero.tagline')}</h1>
        <p className="hero-description" data-hero-step>{t('hero.description')}</p>
        <div className="hero-actions" data-hero-step>
          <a className="btn btn-primary" href="#booking">
            {t('hero.cta1')}<ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <a className="text-link" href="#services">{t('hero.cta2')}</a>
        </div>
        <p className="hero-response">{t('hero.response')}</p>
        <button ref={waveRef} className="wave-control" type="button" data-playing={playing} data-paused={paused}
          disabled={staticWave} aria-pressed={paused} aria-label={waveLabel} title={waveLabel}
          onClick={() => setPaused((value) => !value)}>
          <span className="voice-wave" aria-hidden="true">
            {bars.map((bar, index) => <i key={index} style={bar} />)}
          </span>
          <span className="wave-state-icon" aria-hidden="true">{paused ? <Play size={14} /> : <Pause size={14} />}</span>
        </button>
        <div className="hero-photo">
          <img ref={photoRef} src="/assets/hero-campus.webp" alt={t('hero.photoAlt')} width="1920" height="736" fetchPriority="high" />
          <img className="hero-corners" src="/assets/hero-corners.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </header>
  )
}
