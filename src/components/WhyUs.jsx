import { useI18n } from '../i18n.jsx'

// 师资力量三卡片（红带内白卡）
export default function WhyUs() {
  const { t } = useI18n()
  return (
    <section className="why" id="why">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 why-inner">
        <div className="text-center center">
          <span className="kicker">{t('why.cap')}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t('why.h2') }} />
        </div>
        <div className="why-grid grid grid-cols-3 gap-6 mt-[52px] max-tab:grid-cols-1">
          <div className="why-card reveal">
            <h3>{t('why1.h3')}</h3>
            <ul>
              <li><span>{t('why1.l1s')}</span></li>
              <li><span>{t('why1.l2s')}</span></li>
              <li><span>{t('why1.l3s')}</span></li>
            </ul>
          </div>
          <div className="why-card reveal">
            <h3>{t('why2.h3')}</h3>
            <ul>
              <li><span>{t('why2.l1')}</span></li>
              <li><span>{t('why2.l2')}</span></li>
            </ul>
          </div>
          <div className="why-card reveal">
            <h3>{t('why3.h3')}</h3>
            <ul>
              <li><span>{t('why3.l1')}</span></li>
              <li><span>{t('why3.l2')}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
