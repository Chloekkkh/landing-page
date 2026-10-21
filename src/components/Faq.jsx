import { useI18n } from '../i18n.jsx'

const FAQS = [
  ['faq.q1', 'faq.a1'],
  ['faq.q2', 'faq.a2'],
  ['faq.q3', 'faq.a3'],
  ['faq.q4', 'faq.a4'],
  ['faq.q5', 'faq.a5'],
]

export default function Faq() {
  const { t } = useI18n()
  return (
    <section id="faq">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap">
        <div className="text-center center">
          <span className="kicker">{t('faq.kicker')}</span>
          <h2>{t('faq.h2')}</h2>
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary><span>{t(q)}</span><span className="pm">＋</span></summary>
              <div className="ans">{t(a)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
