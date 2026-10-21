import { useEffect } from 'react'
import { I18nProvider } from './i18n.jsx'
import BgDeco from './components/BgDeco.jsx'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import WhyUs from './components/WhyUs.jsx'
import Voices from './components/Voices.jsx'
import Faq from './components/Faq.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'

// 滚动入场：.reveal 进入视口后加 .in（与旧版 IntersectionObserver 逻辑一致）
function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

export default function App() {
  return (
    <I18nProvider>
      <RevealObserver />
      <BgDeco />
      <NavBar />
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <Voices />
      <Faq />
      <Booking />
      <Footer />
    </I18nProvider>
  )
}
