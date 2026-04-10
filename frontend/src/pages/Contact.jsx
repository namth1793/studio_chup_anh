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

export default function Contact() {
  const { t } = useLang()
  const tr = (k) => t(`contact.${k}`)

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await axios.post('/api/contacts', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const info = t('contact.info') || {}
  const socials = (info.social && info.social.items) || []

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-14 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=1920&q=80"
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Contact Info */}
          <AosDiv className="lg:col-span-2">
            <p className="section-label mb-8">{info.title}</p>
            <div className="space-y-8 mb-12">
              {['address', 'phone', 'email', 'hours'].map((key) => {
                const field = info[key] || {}
                return (
                  <div key={key}>
                    <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-2">{field.label}</p>
                    <p className="font-body font-light text-sm text-stone leading-relaxed">{field.value}</p>
                  </div>
                )
              })}
            </div>
            {info.social && (
              <div>
                <p className="font-body font-medium text-xs tracking-widest uppercase text-mist mb-4">
                  {info.social.title}
                </p>
                <div className="flex flex-wrap gap-4">
                  {socials.map((s) => (
                    <span
                      key={s}
                      className="font-body font-light text-sm text-stone hover:text-ink transition-colors cursor-pointer border-b border-bone hover:border-ink pb-px"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AosDiv>

          {/* Form */}
          <AosDiv delay={200} className="lg:col-span-3">
            <p className="section-label mb-8">{tr('form.title')}</p>
            <form onSubmit={submit} className="space-y-8">
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="form-label">{tr('form.phone')}</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handle}
                    placeholder={tr('form.phonePlaceholder')}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">{tr('form.subject')}</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handle}
                    placeholder={tr('form.subjectPlaceholder')}
                    className="form-input"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">{tr('form.message')}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handle}
                  placeholder={tr('form.messagePlaceholder')}
                  rows={5}
                  required
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

              <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-50">
                {status === 'sending' ? tr('form.sending') : tr('form.submit')}
              </button>
            </form>
          </AosDiv>
        </div>
      </section>

      {/* Map */}
      <section className="h-80 lg:h-96 bg-sand overflow-hidden">
        <iframe
          title="Studio Location Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=106.6732%2C10.7650%2C106.7032%2C10.7850&layer=mapnik&marker=10.7753%2C106.6882"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </div>
  )
}
