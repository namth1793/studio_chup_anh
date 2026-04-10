import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LanguageContext'

function useAos() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('aos-visible'); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function AosDiv({ className = '', children, delay = 0 }) {
  const ref = useAos()
  return (
    <div ref={ref} className={`aos-hidden ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Booking() {
  const { t } = useLang()
  const tr = (k) => t(`booking.${k}`)

  const [form, setForm] = useState({
    name: '', phone: '', email: '', date: '', service_type: '', package: '', notes: ''
  })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/bookings', form)
      setStatus('success')
      setForm({ name: '', phone: '', email: '', date: '', service_type: '', package: '', notes: '' })
    } catch {
      setStatus('error')
    }
  }

  const serviceOptions = Object.entries(tr('form.serviceOptions') || {})
  const packageOptions = Object.entries(tr('form.packageOptions') || {})
  const info = tr('info') || {}

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-14 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574285013029-29296a71930e?w=1920&q=80"
          alt="Booking"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Form + Info */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form */}
          <AosDiv className="lg:col-span-3">
            <form onSubmit={submit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="form-label">{tr('form.name')}</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handle}
                    placeholder={tr('form.namePlaceholder')}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">{tr('form.phone')}</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder={tr('form.phonePlaceholder')}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">{tr('form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  placeholder={tr('form.emailPlaceholder')}
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">{tr('form.date')}</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handle}
                  min={today}
                  required
                  className="form-input"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="form-label">{tr('form.service')}</label>
                  <select
                    name="service_type"
                    value={form.service_type}
                    onChange={handle}
                    required
                    className="form-input bg-transparent"
                  >
                    <option value="">{tr('form.servicePlaceholder')}</option>
                    {serviceOptions.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">{tr('form.package')}</label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handle}
                    className="form-input bg-transparent"
                  >
                    <option value="">{tr('form.packagePlaceholder')}</option>
                    {packageOptions.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">{tr('form.notes')}</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handle}
                  placeholder={tr('form.notesPlaceholder')}
                  rows={4}
                  className="form-input resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="bg-sand border border-bone px-6 py-4">
                  <p className="font-body font-light text-sm text-stone">{tr('form.success')}</p>
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-100 px-6 py-4">
                  <p className="font-body font-light text-sm text-red-700">{tr('form.error')}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:opacity-50"
              >
                {status === 'sending' ? tr('form.sending') : tr('form.submit')}
              </button>
            </form>
          </AosDiv>

          {/* Info */}
          <AosDiv delay={200} className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="section-label mb-8">{info.title}</p>
              <div className="space-y-8 mb-12">
                <div>
                  <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-2">
                    {t('contact.info.address.label')}
                  </p>
                  <p className="font-body font-light text-sm text-stone leading-relaxed whitespace-pre-line">{info.address}</p>
                </div>
                <div>
                  <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-2">
                    {t('contact.info.phone.label')}
                  </p>
                  <p className="font-body font-light text-sm text-stone">{info.phone}</p>
                </div>
                <div>
                  <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-2">
                    {t('contact.info.email.label')}
                  </p>
                  <p className="font-body font-light text-sm text-stone">{info.email}</p>
                </div>
                <div>
                  <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-2">
                    {t('contact.info.hours.label')}
                  </p>
                  <p className="font-body font-light text-sm text-stone">{info.hours}</p>
                </div>
              </div>
              <div className="aspect-video bg-sand overflow-hidden">
                <iframe
                  title="Studio Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=106.6832%2C10.7753%2C106.6932%2C10.7813&layer=mapnik"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </AosDiv>
        </div>
      </section>
    </div>
  )
}
