import { useI18n } from '../i18n.jsx'

const VOICES = [
  { q: 'v1.q', n: 'v1.n', s: 'v1.s', ava: '/assets/avatars/ava1.png', alt: '金同学 · 韩国留学生' },
  { q: 'v2.q', n: 'v2.n', s: 'v2.s', ava: '/assets/avatars/ava2.png', alt: 'Anna · 俄罗斯留学生' },
  { q: 'v3.q', n: 'v3.n', s: 'v3.s', ava: '/assets/avatars/ava3.png', alt: '田中同学 · 日本留学生' },
]

function Stars() {
  return (
    <div className="t-stars" role="img" aria-label="五星好评">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
      ))}
    </div>
  )
}

export default function Voices() {
  const { t } = useI18n()
  return (
    <section id="voices">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap">
        <div className="text-center center">
          <span className="kicker">{t('voices.kicker')}</span>
          <h2>{t('voices.h2')}</h2>
        </div>
        <div className="t-grid grid grid-cols-3 gap-6 mt-[52px] max-tab:grid-cols-1">
          {VOICES.map((v) => (
            <div className="t-card soft reveal" key={v.q}>
              <Stars />
              <blockquote dangerouslySetInnerHTML={{ __html: t(v.q) }} />
              <div className="t-foot">
                <img className="t-ava" src={v.ava} alt={v.alt} />
                <div><b>{t(v.n)}</b><span>{t(v.s)}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
