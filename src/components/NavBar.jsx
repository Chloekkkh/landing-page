import { useEffect, useRef, useState } from 'react'
import { Globe, List, X } from '@phosphor-icons/react'
import { useI18n } from '../i18n.jsx'

const LINKS = [['#services', 'nav.services'], ['#why', 'nav.why'], ['#process', 'nav.process'], ['#faq', 'nav.faq']]

export default function NavBar() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    let frame = null
    const spy = () => {
      const y = window.scrollY + 150
      let current = '#top'
      LINKS.forEach(([id]) => {
        const element = document.querySelector(id)
        if (element && element.offsetTop <= y) current = id
      })
      rootRef.current?.querySelectorAll('.nav-links a').forEach((link) => {
        if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
      frame = null
    }
    const onScroll = () => { if (frame === null) frame = requestAnimationFrame(spy) }
    window.addEventListener('scroll', onScroll, { passive: true })
    spy()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); menuRef.current?.focus() }
    }
    const onOutside = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
    }
  }, [open])

  return (
    <nav className="site-nav" ref={rootRef} aria-label={t('nav.label')}>
      <div className={'page-wrap nav-inner' + (open ? ' open' : '')}>
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <img className="ic" src="/assets/brand-mark.png" alt="" width="46" height="46" /><b>{t('hero.brand')}</b>
        </a>
        <div className="nav-links" id="navLinks">
          {LINKS.map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{t(label)}</a>)}
        </div>
        <div className="nav-actions">
          <div className="lang-toggle" role="group" aria-label={t('nav.language')}>
            <Globe size={17} weight="light" aria-hidden="true" />
            <button type="button" aria-pressed={lang === 'zh'} className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>CN</button>
            <button type="button" aria-pressed={lang === 'en'} className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="nav-cta" href="#booking">{t('nav.consultation')}</a>
          <button ref={menuRef} className="nav-burger" type="button" aria-label={t('nav.menu')} aria-expanded={open} aria-controls="navLinks"
            onClick={() => setOpen((value) => !value)}>
            {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
