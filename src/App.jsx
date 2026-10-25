import { I18nProvider } from './i18n.jsx'
import RevealObserver from './components/RevealObserver.jsx'
import NavBar from './components/NavBar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import WhyUs from './components/WhyUs.jsx'
import Voices from './components/Voices.jsx'
import Faq from './components/Faq.jsx'
import Booking from './components/Booking.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <I18nProvider>
      <RevealObserver />
      <NavBar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Voices />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </I18nProvider>
  )
}
