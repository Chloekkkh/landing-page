import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer>
      <div className="page-wrap">
        <div className="foot-grid grid grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-10 max-tab:grid-cols-2 max-mob:grid-cols-1">
          <div className="foot-brand">
            <a className="brand" href="#top"><img className="ic" src="/assets/brand-mark.png" alt="" width="46" height="46" /><b>{t('hero.brand')}</b></a>
            <p>{t('foot.p')}</p>
          </div>
          <div className="foot-col">
            <b>{t('foot.srv')}</b>
            <a href="#services">{t('foot.s1')}</a>
            <a href="#services">{t('foot.s2')}</a>
            <a href="#services">{t('foot.s3')}</a>
            <a href="#services">{t('foot.s4')}</a>
            <a href="#services">{t('foot.s5')}</a>
          </div>
          <div className="foot-col">
            <b>{t('foot.nav')}</b>
            <a href="#process">{t('nav.process')}</a>
            <a href="#why">{t('nav.why')}</a>
            <a href="#voices">{t('voices.kicker')}</a>
            <a href="#faq">{t('nav.faq')}</a>
          </div>
          <div className="foot-col">
            <b>{t('foot.contact')}</b>
            <p>{t('foot.wechat')}</p>
            <p>{t('foot.email')}</p>
            <p className="foot-copy">{t('foot.copy')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
