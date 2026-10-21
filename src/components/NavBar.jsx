import { useEffect, useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function NavBar() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)

  // scrollspy：滚动高亮当前板块（偏移 130，rAF 节流）
  useEffect(() => {
    const links = [...document.querySelectorAll('.nav-links a')]
    const secs = ['#top', '#services', '#process', '#why', '#faq']
    const spy = () => {
      const y = window.scrollY + 130
      let cur = secs[0]
      secs.forEach((id) => { const el = document.querySelector(id); if (el && el.offsetTop <= y) cur = id })
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === cur))
    }
    let tick = false
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(() => { spy(); tick = false }) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    spy()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav>
      <div className={'nav-inner' + (open ? ' open' : '')}>
        <a className="brand" href="#top"><span className="ic">语</span><b>言传中文</b></a>
        <div className="nav-links" id="navLinks">
          <a href="#top" onClick={() => setOpen(false)}>{t('nav.home')}</a>
          <a href="#services" onClick={() => setOpen(false)}>{t('nav.services')}</a>
          <a href="#process" onClick={() => setOpen(false)}>{t('nav.process')}</a>
          <a href="#why" onClick={() => setOpen(false)}>{t('nav.why')}</a>
          <a href="#faq" onClick={() => setOpen(false)}>{t('nav.faq')}</a>
        </div>
        <div className="lang-toggle" role="group" aria-label="Language">
          <button type="button" className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>中</button>
          <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
        <button className="nav-burger" type="button" aria-label="菜单" aria-expanded={open} aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
