import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'

const allPhotos = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', category: 'wedding' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', category: 'wedding' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80', category: 'wedding' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', category: 'wedding' },
  { id: 5,  src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80', category: 'portrait' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80', category: 'portrait' },
  { id: 7,  src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80', category: 'portrait' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80', category: 'portrait' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80', category: 'graduation' },
  { id: 10, src: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?w=600&q=80', category: 'graduation' },
  { id: 11, src: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80', category: 'graduation' },
  { id: 12, src: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=600&q=80', category: 'family' },
  { id: 13, src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', category: 'family' },
  { id: 14, src: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=600&q=80', category: 'family' },
  { id: 15, src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80', category: 'portrait' },
  { id: 16, src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80', category: 'wedding' },
]

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

export default function Portfolio() {
  const { t } = useLang()
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const heroRef = useAos()

  const filtered = active === 'all' ? allPhotos : allPhotos.filter(p => p.category === active)

  const categories = [
    { key: 'all', label: t('portfolio.categories.all') },
    { key: 'wedding', label: t('portfolio.categories.wedding') },
    { key: 'graduation', label: t('portfolio.categories.graduation') },
    { key: 'portrait', label: t('portfolio.categories.portrait') },
    { key: 'family', label: t('portfolio.categories.family') },
  ]

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const navigate = (dir) => {
    const idx = filtered.findIndex(p => p.id === lightbox.id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt="Portfolio hero"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full aos-hidden">
          <p className="section-label text-cream/60 mb-2">{t('portfolio.hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{t('portfolio.hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-md">{t('portfolio.hero.subtitle')}</p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-20 z-40 bg-cream border-b border-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 py-5 overflow-x-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`font-body font-medium text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 pb-1 border-b-2
                  ${active === c.key ? 'border-ink text-ink' : 'border-transparent text-mist hover:text-stone'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="masonry-grid">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="masonry-item overflow-hidden group cursor-pointer"
              onClick={() => setLightbox(photo)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.category}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream font-body text-2xl font-light transition-colors"
          >
            ←
          </button>
          <img
            src={lightbox.src.replace('w=600', 'w=1200')}
            alt=""
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream font-body text-2xl font-light transition-colors"
          >
            →
          </button>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream/60 hover:text-cream font-body text-sm tracking-widest uppercase transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
