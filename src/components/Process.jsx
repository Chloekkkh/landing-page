import { useI18n } from '../i18n.jsx'

export default function Process() {
  const { t } = useI18n()
  return (
    <section id="process">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap">
        <div className="text-center center">
          <span className="kicker">{t('proc.kicker')}</span>
          <h2>{t('proc.h2')}</h2>
        </div>
        <div className="steps grid grid-cols-3 gap-[26px] mt-[52px] max-tab:grid-cols-1">
          <div className="step reveal"><h3>{t('proc.s1h')}</h3></div>
          <div className="step reveal"><h3>{t('proc.s2h')}</h3></div>
          <div className="step reveal"><h3>{t('proc.s3h')}</h3></div>
        </div>
      </div>
    </section>
  )
}
