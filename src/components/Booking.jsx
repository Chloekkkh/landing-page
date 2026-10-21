import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

const LEVELS = ['lv.0', 'lv.1', 'lv.2', 'lv.3', 'lv.4']
const NEEDS = ['nd.0', 'nd.1', 'nd.2', 'nd.3', 'nd.4']
const FIELDS = ['name', 'school', 'contact', 'level', 'need', 'note']

export default function Booking() {
  const { t } = useI18n()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.target)
    const payload = { website: fd.get('website') }
    FIELDS.forEach((k) => { payload[k] = fd.get(k) || '' })
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      setStatus(res.ok && data.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="book" id="booking">
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap">
        <div className="cta-band reveal">
          <h2>{t('book.ctaH2')}</h2>
          <p>{t('book.ctaP')}</p>
          <a className="btn btn-primary" href="#form">{t('book.ctaBtn')}</a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1180px] px-8 max-mob:px-5 wrap" id="form">
        <div className="book-grid">
          <div>
            <span className="kicker">{t('book.kicker')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('book.h2') }} />
          </div>
          {status === 'sent' ? (
            <div className="form neu">
              <div className="form-ok"><b>{t('f.okB')}</b><p>{t('f.okP')}</p></div>
            </div>
          ) : (
            <form className="form neu" id="bookForm" onSubmit={handleSubmit}>
              {/* 蜜罐：人类不可见，bot 填写后服务端静默丢弃 */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
              <div className="field"><label>{t('f.name')}</label><input type="text" name="name" placeholder={t('ph.name')} required /></div>
              <div className="f-row grid grid-cols-2 gap-4 max-mob:grid-cols-1">
                <div className="field"><label>{t('f.school')}</label><input type="text" name="school" placeholder={t('ph.school')} required /></div>
                <div className="field"><label>{t('f.contact')}</label><input type="text" name="contact" placeholder={t('ph.contact')} required /></div>
              </div>
              <div className="f-row grid grid-cols-2 gap-4 max-mob:grid-cols-1">
                <div className="field"><label>{t('f.level')}</label><select name="level">{LEVELS.map((k) => <option key={k}>{t(k)}</option>)}</select></div>
                <div className="field"><label>{t('f.need')}</label><select name="need">{NEEDS.map((k) => <option key={k}>{t(k)}</option>)}</select></div>
              </div>
              <div className="field"><label>{t('f.note')}</label><textarea name="note" placeholder={t('ph.note')} /></div>
              <button className="btn btn-primary submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('f.sending') : t('f.submit')}
              </button>
              {status === 'error' && <p className="form-err">{t('f.err')}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
