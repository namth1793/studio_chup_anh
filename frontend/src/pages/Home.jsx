import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const HERO_SLIDES = [
  { src: '/anh_cuoi/DSC05002.JPG', label: 'Ảnh Cưới' },
  { src: '/anh_kimono/DSC02969.jpg', label: 'Kimono' },
  { src: '/anh_bau/2I4A1308.jpg', label: 'Mẹ Bầu' },
  { src: '/anh_cuoi/DSC04680.JPG', label: 'Ảnh Cưới' },
  { src: '/anh_be/DSC05028.jpg', label: 'Em Bé' },
]

const INTRO_IMG = '/anh_bau/2I4A1297.jpg'

const featuredPhotos = [
  { id: 1, src: '/anh_cuoi/DSC04991.JPG', category: 'wedding', tall: true },
  { id: 2, src: '/anh_bau/2I4A1716.jpg', category: 'bau', tall: false },
  { id: 3, src: '/anh_bau/2I4A1308.jpg', category: 'bau', tall: false },
  { id: 4, src: '/anh_cuoi/DSC05940.jpg', category: 'wedding', tall: true },
  { id: 5, src: '/anh_be/IMG_3690.JPG', category: 'be', tall: false },
  { id: 6, src: '/anh_bau/2I4A5985.jpg', category: 'bau', tall: false },
]

function useAos() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('aos-visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function AosDiv({ className, children, delay = 0 }) {
  const ref = useAos()
  return (
    <div ref={ref} className={`aos-hidden ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── Hero Carousel ─────────────────────────────────────── */
function HeroCarousel({ tr }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)
  const total = HERO_SLIDES.length

  const goTo = useCallback((idx) => {
    if (animating) return
    setPrev(current)
    setCurrent(idx)
    setAnimating(true)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 900)
  }, [animating, current])

  const next = useCallback(() => goTo((current + 1) % total), [goTo, current, total])
  const goIdx = useCallback((i) => { if (i !== current) goTo(i) }, [goTo, current])

  // Auto-advance every 5s
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 5000)
  }

  const handlePrev = () => { goTo((current - 1 + total) % total); resetTimer() }
  const handleNext = () => { next(); resetTimer() }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {HERO_SLIDES.map((slide, i) => {
        const isActive = i === current
        const isPrev = i === prev
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-900 ease-in-out
              ${isActive ? 'opacity-100 z-10' : isPrev ? 'opacity-0 z-10' : 'opacity-0 z-0'}`}
            style={{ transition: 'opacity 900ms ease-in-out' }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear
                ${isActive ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        )
      })}

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto w-full mx-auto">
        <p className="font-body font-medium text-lg text-cream/70 tracking-ultra uppercase mb-6">
          {tr('hero.label')}
        </p>
        <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-cream leading-tight mb-8 whitespace-pre-line">
          {tr('hero.title')}
        </h1>
        <p className="font-body font-light text-lg md:text-xl text-cream/80 leading-relaxed mb-12 max-w-lg mx-auto">
          {tr('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/portfolio" className="btn-outline-cream">
            {tr('hero.cta')}
          </Link>
          <Link to="/booking" className="font-body font-medium text-xs tracking-widest uppercase text-cream/70 hover:text-cream transition-colors duration-300 py-4">
            {tr('hero.cta2')} →
          </Link>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 text-cream/50 hover:text-cream transition-colors duration-300 text-2xl font-light w-12 h-12 flex items-center justify-center"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 text-cream/50 hover:text-cream transition-colors duration-300 text-2xl font-light w-12 h-12 flex items-center justify-center"
        aria-label="Next"
      >
        →
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { goIdx(i); resetTimer() }}
            className="relative h-px transition-all duration-500 bg-cream/30 hover:bg-cream/60"
            style={{ width: i === current ? '40px' : '20px', background: i === current ? 'rgba(250,248,245,0.9)' : 'rgba(250,248,245,0.3)' }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="w-px h-10 bg-cream/30 animate-pulse mx-auto" />
      </div>
    </section>
  )
}

/* ─── Testimonials Carousel ─────────────────────────────── */
function TestimonialsCarousel({ items, tr }) {
  const [current, setCurrent] = useState(0)
  const [animDir, setAnimDir] = useState(null) // 'left' | 'right'
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)
  const total = items.length

  const navigate = useCallback((dir) => {
    setVisible(false)
    setAnimDir(dir)
    setTimeout(() => {
      setCurrent((c) => (c + dir + total) % total)
      setVisible(true)
    }, 350)
  }, [total])

  const next = useCallback(() => navigate(1), [navigate])

  useEffect(() => {
    timerRef.current = setInterval(next, 6000)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 6000)
  }

  const handlePrev = () => { navigate(-1); resetTimer() }
  const handleNext = () => { navigate(1); resetTimer() }

  const item = items[current]

  return (
    <section className="py-20 bg-sand overflow-hidden">
      <div className="max-w-2xl mx-auto px-6">
        <AosDiv className="text-center mb-12">
          <p className="section-label">{tr('testimonials.label')}</p>
          <h2 className="section-title whitespace-pre-line">{tr('testimonials.title')}</h2>
        </AosDiv>

        <div className="relative max-w-xl mx-auto">
          {/* Card */}
          <div
            className="transition-all duration-350 ease-in-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateX(0)'
                : animDir === 1
                  ? 'translateX(-40px)'
                  : 'translateX(40px)',
            }}
          >
            {/* Quote mark */}
            <div className="text-center mb-4">
              <span className="font-display text-6xl text-gold/40 leading-none select-none">"</span>
            </div>

            <p className="font-display italic text-lg md:text-xl text-stone leading-relaxed text-center mb-8 px-2">
              {item.text}
            </p>

            <div className="flex flex-col items-center gap-2 pt-6 border-t border-bone">
              {/* Avatar initials */}
              <div className="w-12 h-12 rounded-full border border-gold/50 bg-blush flex items-center justify-center mb-2">
                <span className="font-display text-lg text-gold">
                  {item.name?.[0] || 'K'}
                </span>
              </div>
              <p className="font-body font-medium text-sm text-ink">{item.name}</p>
              <p className="font-body font-light text-xs text-mist tracking-wide">{item.role}</p>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 text-mist hover:text-gold transition-colors duration-300 text-2xl font-light w-12 h-12 flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 text-mist hover:text-gold transition-colors duration-300 text-2xl font-light w-12 h-12 flex items-center justify-center"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true) }, 350); resetTimer() }}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === current ? '28px' : '6px',
                height: '6px',
                borderRadius: i === current ? '3px' : '50%',
                background: i === current ? '#D8A7B1' : '#D4D0CA',
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function Home() {
  const { t } = useLang()
  const tr = (k) => t(`home.${k}`)
  const testimonialItems = t('home.testimonials.items') || []

  return (
    <div>
      {/* Hero Carousel */}
      <HeroCarousel tr={tr} />

      {/* Introduction */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AosDiv>
              <div className="relative">
                <img
                  src={INTRO_IMG}
                  alt="Photographer"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-sand px-8 py-6 hidden lg:block">
                  <p className="font-display italic text-2xl text-stone">10+</p>
                  <p className="font-body text-xs tracking-widest uppercase text-mist mt-1">{tr('intro.stat2.label')}</p>
                </div>
              </div>
            </AosDiv>
            <AosDiv delay={200}>
              <p className="section-label">{tr('intro.label')}</p>
              <h2 className="section-title mb-8 whitespace-pre-line">{tr('intro.title')}</h2>
              <p className="font-body font-light text-sm text-stone leading-relaxed mb-10">
                {tr('intro.text')}
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-bone">
                {[
                  { num: tr('intro.stat1.number'), lbl: tr('intro.stat1.label') },
                  { num: tr('intro.stat2.number'), lbl: tr('intro.stat2.label') },
                  { num: tr('intro.stat3.number'), lbl: tr('intro.stat3.label') },
                ].map((s) => (
                  <div key={s.lbl}>
                    <p className="font-display font-light text-3xl text-ink mb-1">{s.num}</p>
                    <p className="font-body text-xs text-mist leading-tight">{s.lbl}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-outline">{tr('intro.cta')}</Link>
            </AosDiv>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="text-center mb-16">
            <p className="section-label">{tr('featured.label')}</p>
            <h2 className="section-title whitespace-pre-line mb-4">{tr('featured.title')}</h2>
            <p className="font-body font-light text-sm text-stone max-w-md mx-auto">{tr('featured.subtitle')}</p>
          </AosDiv>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {featuredPhotos.map((photo, i) => (
              <AosDiv key={photo.id} delay={i * 80} className={photo.tall ? 'row-span-2' : ''}>
                <div className="overflow-hidden group cursor-pointer">
                  <img
                    src={photo.src}
                    alt={photo.category}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.tall ? 'h-[400px] md:h-[500px]' : 'h-[200px] md:h-[240px]'}`}
                  />
                </div>
              </AosDiv>
            ))}
          </div>
          <AosDiv className="text-center mt-12">
            <Link to="/portfolio" className="btn-outline">{tr('featured.viewAll')}</Link>
          </AosDiv>
        </div>
      </section>

      {/* Services */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AosDiv className="max-w-xl mb-16">
            <p className="section-label">{tr('services.label')}</p>
            <h2 className="section-title whitespace-pre-line">{tr('services.title')}</h2>
          </AosDiv>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone">
            {[
              { key: 'wedding', img: '/anh_cuoi/20x30%20in%20tguong.JPG' },
              { key: 'kimono', img: '/anh_kimono/DSC02618.JPG' },
              { key: 'bau', img: '/anh_bau/2I4A1234.jpg' },
              { key: 'be', img: '/anh_be/DSC05028.jpg' },
            ].map((svc, i) => (
              <AosDiv key={svc.key} delay={i * 100} className="bg-cream">
                <Link to={`/services?tab=${svc.key}`} className="block relative overflow-hidden group aspect-square cursor-pointer">
                  <img
                    src={svc.img}
                    alt={svc.key}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-display font-light text-2xl text-cream mb-2">
                      {tr(`services.${svc.key}.title`)}
                    </h3>
                    <p className="font-body font-light text-xs text-cream/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {tr(`services.${svc.key}.desc`)}
                    </p>
                  </div>
                </Link>
              </AosDiv>
            ))}
          </div>
          <AosDiv className="mt-10">
            <Link to="/services" className="btn-outline">{tr('services.viewAll')}</Link>
          </AosDiv>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel items={testimonialItems} tr={tr} />

      {/* CTA Banner */}
      <section className="relative py-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80"
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <AosDiv className="relative z-10 text-center px-6">
          <h2 className="section-title-light mb-6 whitespace-pre-line">{tr('ctaSection.title')}</h2>
          <p className="font-body font-light text-sm text-cream/70 mb-10 max-w-md mx-auto">
            {tr('ctaSection.text')}
          </p>
          <Link to="/booking" className="btn-outline-cream mb-6 inline-block">
            {tr('ctaSection.button')}
          </Link>
          <p className="font-body font-light text-xs text-cream/50 tracking-wide mt-4">
            {tr('ctaSection.phone')}
          </p>
        </AosDiv>
      </section>
    </div>
  )
}
