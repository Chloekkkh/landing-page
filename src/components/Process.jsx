import { useI18n } from '../i18n.jsx'

export default function Process() {
  const { t } = useI18n()
  return (
    <section id="process">
      <div className="page-wrap wrap">
        <div className="section-heading">
          <span className="kicker">{t('proc.kicker')}</span>
          <h2>{t('proc.h2')}</h2>
        </div>
        <div className="steps grid grid-cols-3 gap-[26px] mt-[52px] max-tab:grid-cols-1">
          <div className="step reveal"><span className="section-number" aria-hidden="true">01</span><h3>{t('proc.s1h')}</h3><p>{t('proc.s1p')}</p></div>
          <div className="step reveal"><span className="section-number" aria-hidden="true">02</span><h3>{t('proc.s2h')}</h3><p>{t('proc.s2p')}</p></div>
          <div className="step reveal"><span className="section-number" aria-hidden="true">03</span><h3>{t('proc.s3h')}</h3><p>{t('proc.s3p')}</p></div>
        </div>
      </div>
    </section>
  )
}
