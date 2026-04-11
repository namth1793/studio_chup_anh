import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

function useAos() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('aos-visible'); obs.unobserve(el) } },
      { threshold: 0.12 }
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

const btsImages = [
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  'https://images.unsplash.com/photo-1574285013029-29296a71930e?w=600&q=80',
]

export default function About() {
  const { t } = useLang()
  const tr = (k) => t(`about.${k}`)
  const members = t('about.team.members') || []
  const values = t('about.values.items') || []

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1920&q=80"
          alt="About hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AosDiv>
              <p className="section-label">{tr('story.label')}</p>
              <h2 className="section-title mb-8">{tr('story.title')}</h2>
              <div className="space-y-5">
                <p className="font-body font-light text-sm text-stone leading-relaxed">{tr('story.p1')}</p>
                <p className="font-body font-light text-sm text-stone leading-relaxed">{tr('story.p2')}</p>
                <p className="font-body font-light text-sm text-stone leading-relaxed">{tr('story.p3')}</p>
              </div>
            </AosDiv>
            <AosDiv delay={150} className="grid grid-cols-2 gap-4">
              {btsImages.map((src, i) => (
                <div key={i} className={`overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}>
                  <img
                    src={src}
                    alt="Behind the scenes"
                    className={`w-full object-cover ${i === 0 ? 'h-64' : 'h-44'}`}
                  />
                </div>
              ))}
            </AosDiv>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="text-center mb-16">
            <p className="section-label">{tr('values.label')}</p>
            <h2 className="section-title whitespace-pre-line">{tr('values.title')}</h2>
          </AosDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-bone">
            {values.map((v, i) => (
              <AosDiv key={v.title} delay={i * 100} className="bg-sand p-10">
                <p className="font-display font-light text-4xl text-gold mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display font-light text-xl text-ink mb-3">{v.title}</h3>
                <p className="font-body font-light text-xs text-stone leading-relaxed">{v.desc}</p>
              </AosDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="mb-16">
            <p className="section-label">{tr('team.label')}</p>
            <h2 className="section-title whitespace-pre-line">{tr('team.title')}</h2>
          </AosDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bone">
            {members.map((m, i) => (
              <AosDiv key={m.name} delay={i * 150} className="bg-cream">
                <div className="overflow-hidden h-80">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display font-light text-xl text-ink mb-1">{m.name}</h3>
                  <p className="font-body font-medium text-xs tracking-widest uppercase text-gold mb-4">{m.role}</p>
                  <p className="font-body font-light text-xs text-stone leading-relaxed">{m.bio}</p>
                </div>
              </AosDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <AosDiv className="relative z-10 text-center px-6">
          <h2 className="section-title-light mb-6">{t('home.ctaSection.title').replace('\n', ' ')}</h2>
          <p className="font-body font-light text-sm text-cream/70 mb-10 max-w-md mx-auto">
            {t('home.ctaSection.text')}
          </p>
          <Link to="/booking" className="btn-outline-cream">
            {t('home.ctaSection.button')}
          </Link>
        </AosDiv>
      </section>
    </div>
  )
}
