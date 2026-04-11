import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

const serviceImages = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
  graduation: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80',
  portrait: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80',
  family: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=500&q=80',
  product: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
}

export default function Services() {
  const { t } = useLang()
  const tr = (k) => t(`services.${k}`)
  const [openFaq, setOpenFaq] = useState(null)

  const packages = [
    { key: 'basic', featured: false },
    { key: 'premium', featured: true },
    { key: 'vip', featured: false },
  ]

  const categories = ['wedding', 'graduation', 'portrait', 'family', 'product', 'event']
  const faqItems = t('services.faq') || []

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80"
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Packages */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="mb-16">
            <p className="section-label">{tr('packagesTitle')}</p>
          </AosDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone">
            {packages.map(({ key, featured }, i) => {
              const pkg = tr(`packages.${key}`)
              return (
                <AosDiv key={key} delay={i * 120} className={`relative p-10 flex flex-col ${featured ? 'bg-gold text-white' : 'bg-cream text-ink'}`}>
                  {featured && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gold" />
                  )}
                  <div className="mb-8">
                    <div className="flex items-start justify-between mb-2">
                      <p className={`font-body font-medium text-xs tracking-ultra uppercase ${featured ? 'text-white/70' : 'text-mist'}`}>
                        {pkg.tag}
                      </p>
                    </div>
                    <h3 className={`font-display font-light text-3xl mb-4 ${featured ? 'text-white' : 'text-ink'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`font-display text-2xl ${featured ? 'text-gold' : 'text-gold'}`}>
                      {pkg.price}
                    </p>
                  </div>
                  <ul className="flex-1 space-y-3 mb-10">
                    {(pkg.items || []).map((item) => (
                      <li key={item} className={`font-body font-light text-sm flex items-start gap-3 ${featured ? 'text-white/90' : 'text-stone'}`}>
                        <span className={`mt-0.5 flex-shrink-0 w-1 h-1 rounded-full ${featured ? 'bg-gold' : 'bg-gold'}`} style={{ marginTop: '0.45rem' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/booking"
                    className={`font-body font-medium text-xs tracking-widest uppercase border px-6 py-3.5 text-center transition-all duration-300
                      ${featured
                        ? 'border-white text-white hover:bg-white hover:text-gold'
                        : 'border-ink text-ink hover:bg-ink hover:text-cream'
                      }`}
                  >
                    {pkg.cta}
                  </Link>
                </AosDiv>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="mb-12">
            <p className="section-label">{tr('categoriesTitle')}</p>
          </AosDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bone">
            {categories.map((key, i) => {
              const cat = tr(`categories.${key}`)
              return (
                <AosDiv key={key} delay={i * 80} className="bg-cream overflow-hidden group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={serviceImages[key]}
                      alt={key}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-light text-xl text-ink mb-2">{cat.title}</h3>
                    <p className="font-body font-light text-xs text-mist leading-relaxed">{cat.desc}</p>
                  </div>
                </AosDiv>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 max-w-3xl mx-auto px-6 lg:px-12">
        <AosDiv className="mb-12">
          <p className="section-label">{tr('faqTitle')}</p>
        </AosDiv>
        <div className="space-y-px bg-bone">
          {faqItems.map((item, i) => (
            <AosDiv key={i} delay={i * 80} className="bg-cream">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-start justify-between gap-6 px-8 py-6 text-left"
              >
                <span className="font-body font-medium text-sm text-ink">{item.q}</span>
                <span className={`font-display text-xl text-mist flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                <p className="font-body font-light text-sm text-stone leading-relaxed px-8 pb-6">{item.a}</p>
              </div>
            </AosDiv>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-center px-6">
        <AosDiv>
          <h2 className="section-title-light mb-6">{t('home.ctaSection.title').replace('\n', ' ')}</h2>
          <Link to="/booking" className="btn-outline-cream">{t('home.ctaSection.button')}</Link>
        </AosDiv>
      </section>
    </div>
  )
}
