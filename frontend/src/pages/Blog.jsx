import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function Blog() {
  const { t } = useLang()
  const tr = (k) => t(`blog.${k}`)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    axios.get('/api/posts').then(r => { setPosts(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const categories = Object.entries(t('blog.categories') || {})
  const filtered = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] flex items-end pb-14 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=80"
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
        <AosDiv className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <p className="section-label text-cream/60 mb-2">{tr('hero.label')}</p>
          <h1 className="section-title-light whitespace-pre-line mb-4">{tr('hero.title')}</h1>
          <p className="font-body font-light text-sm text-cream/70 max-w-lg">{tr('hero.subtitle')}</p>
        </AosDiv>
      </section>

      {/* Filter */}
      <div className="sticky top-20 z-40 bg-cream border-b border-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-8 py-5 overflow-x-auto">
            {categories.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`font-body font-medium text-xs tracking-widest uppercase whitespace-nowrap transition-all duration-300 pb-1 border-b-2
                  ${activeCategory === key ? 'border-ink text-ink' : 'border-transparent text-mist hover:text-stone'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12">
        {loading ? (
          <div className="py-32 text-center">
            <p className="font-body font-light text-sm text-mist tracking-widest">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-body font-light text-sm text-mist">No posts found.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <AosDiv className="mb-16">
                <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-sand hover:bg-bone transition-colors duration-300">
                  <div className="overflow-hidden h-64 lg:h-auto">
                    <img
                      src={featured.image_url}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    <p className="font-body font-medium text-xs tracking-ultra uppercase text-gold mb-4">
                      {(t('blog.categories') || {})[featured.category] || featured.category}
                    </p>
                    <h2 className="font-display font-light text-3xl lg:text-4xl text-ink mb-4 leading-snug">
                      {featured.title}
                    </h2>
                    <p className="font-body font-light text-sm text-stone leading-relaxed mb-8">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body font-medium text-xs tracking-widest uppercase text-ink border-b border-ink pb-px">
                        {tr('readMore')} →
                      </span>
                      <span className="font-body font-light text-xs text-mist">{formatDate(featured.published_at)}</span>
                    </div>
                  </div>
                </Link>
              </AosDiv>
            )}

            {/* Rest of Posts */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone">
                {rest.map((post, i) => (
                  <AosDiv key={post.id} delay={i * 100} className="bg-cream group">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="overflow-hidden h-52">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-8">
                        <p className="font-body font-medium text-xs tracking-ultra uppercase text-gold mb-3">
                          {(t('blog.categories') || {})[post.category] || post.category}
                        </p>
                        <h3 className="font-display font-light text-xl text-ink mb-3 leading-snug">{post.title}</h3>
                        <p className="font-body font-light text-xs text-stone leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-body font-medium text-xs tracking-widest uppercase text-ink border-b border-ink pb-px">
                            {tr('readMore')} →
                          </span>
                          <span className="font-body font-light text-xs text-mist">{formatDate(post.published_at)}</span>
                        </div>
                      </div>
                    </Link>
                  </AosDiv>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
