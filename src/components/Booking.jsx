import { useState } from 'react'
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react'
import { useI18n } from '../i18n.jsx'

const LEVELS = ['lv.0', 'lv.1', 'lv.2', 'lv.3', 'lv.4']
const NEEDS = ['nd.0', 'nd.1', 'nd.2', 'nd.3', 'nd.4', 'nd.5']
const FIELDS = ['name', 'school', 'contact', 'level', 'need', 'note']

export default function Booking() {
  const { t } = useI18n()
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    const data = new FormData(event.target)
    const payload = { website: data.get('website') }
    FIELDS.forEach((key) => { payload[key] = data.get(key) || '' })
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      setStatus(response.ok && result.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="book" id="booking">
      <div className="page-wrap" id="form">
        <div className="book-grid">
          <div className="book-heading">
            <span className="kicker">{t('book.kicker')}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t('book.h2') }} />
            <p className="book-intro">{t('book.intro')}</p>
          </div>
          {status === 'sent' ? (
            <div className="form-ok" role="status">
              <CheckCircle size={42} weight="light" aria-hidden="true" />
              <b>{t('f.okB')}</b><p>{t('f.okP')}</p>
            </div>
          ) : (
            <form className="form" id="bookForm" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp-field" />
              <div className="form-fields">
                <div className="field">
                  <label htmlFor="book-name">{t('f.name')} <span className="required" aria-hidden="true">*</span></label>
                  <input id="book-name" type="text" name="name" autoComplete="name" placeholder={t('ph.name')} required />
                </div>
                <div className="field">
                  <label htmlFor="book-school">{t('f.school')} <span className="required" aria-hidden="true">*</span></label>
                  <input id="book-school" type="text" name="school" autoComplete="organization" placeholder={t('ph.school')} required />
                </div>
                <div className="field">
                  <label htmlFor="book-contact">{t('f.contact')} <span className="required" aria-hidden="true">*</span></label>
                  <input id="book-contact" type="text" name="contact" placeholder={t('ph.contact')} required />
                </div>
                <div className="field">
                  <label htmlFor="book-level">{t('f.level')}</label>
                  <select id="book-level" name="level">{LEVELS.map((key) => <option key={key}>{t(key)}</option>)}</select>
                </div>
                <div className="field field-wide">
                  <label htmlFor="book-need">{t('f.need')}</label>
                  <select id="book-need" name="need">{NEEDS.map((key) => <option key={key}>{t(key)}</option>)}</select>
                </div>
                <div className="field field-wide">
                  <label htmlFor="book-note">{t('f.note')}</label>
                  <textarea id="book-note" name="note" placeholder={t('ph.note')} />
                </div>
              </div>
              <button className="btn btn-primary submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('f.sending') : t('f.submit')}
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              {status === 'error' && <p className="form-err" role="alert">{t('f.err')}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
