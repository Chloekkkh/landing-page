import { useI18n } from '../i18n.jsx'
import { Quotes } from '@phosphor-icons/react'

const VOICES = [
  { q: 'v1.q', n: 'v1.n', s: 'v1.s', ava: '/assets/avatars/ava1.png', alt: '金同学 · 韩国留学生' },
  { q: 'v2.q', n: 'v2.n', s: 'v2.s', ava: '/assets/avatars/ava2.png', alt: 'Anna · 俄罗斯留学生' },
  { q: 'v3.q', n: 'v3.n', s: 'v3.s', ava: '/assets/avatars/ava3.png', alt: '田中同学 · 日本留学生' },
]

export default function Voices() {
  const { t } = useI18n()
  return (
    <section id="voices">
      <div className="page-wrap wrap">
        <div className="section-heading">
          <span className="kicker">{t('voices.kicker')}</span>
          <h2>{t('voices.h2')}</h2>
        </div>
        <div className="t-grid grid grid-cols-3 gap-6 mt-[52px] max-tab:grid-cols-1">
          {VOICES.map((v) => (
            <div className="t-card soft reveal" key={v.q}>
              <Quotes className="quote-icon" size={30} weight="light" aria-hidden="true" />
              <blockquote dangerouslySetInnerHTML={{ __html: t(v.q) }} />
              <div className="t-foot">
                <img className="t-ava" src={v.ava} alt="" loading="lazy" />
                <div><b>{t(v.n)}</b><span>{t(v.s)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
