import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useLang } from '../context/LanguageContext'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function BlogDetail() {
  const { slug } = useParams()
  const { t } = useLang()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios.get(`/api/posts/${slug}`)
      .then(r => { setPost(r.data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="font-body font-light text-sm text-mist tracking-widest">Loading...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center flex-col gap-6">
        <p className="font-display font-light text-3xl text-ink">404</p>
        <p className="font-body font-light text-sm text-mist">Không tìm thấy bài viết.</p>
        <Link to="/blog" className="btn-outline">{t('blog.backToBlog')}</Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={post.image_url}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl">
          <p className="font-body font-medium text-xs tracking-ultra uppercase text-gold mb-4">
            {(t('blog.categories') || {})[post.category] || post.category}
          </p>
          <h1 className="font-display font-light text-4xl md:text-5xl text-cream leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6">
            <span className="font-body font-light text-xs text-cream/60">{post.author}</span>
            <span className="font-body font-light text-xs text-cream/40">—</span>
            <span className="font-body font-light text-xs text-cream/60">{formatDate(post.published_at)}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 font-body font-medium text-xs tracking-widest uppercase text-mist hover:text-ink transition-colors duration-200 mb-12 group">
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            {t('blog.backToBlog')}
          </Link>

          {/* Excerpt */}
          <p className="font-display italic text-xl md:text-2xl text-stone leading-relaxed mb-10 pb-10 border-b border-bone">
            {post.excerpt}
          </p>

          {/* Body */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author card */}
          <div className="mt-16 pt-10 border-t border-bone flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xl text-stone">
                {post.author?.[0] || 'L'}
              </span>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-ink">{post.author}</p>
              <p className="font-body font-light text-xs text-mist">Lumière Studio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand py-20 text-center px-6">
        <p className="section-label mb-2">{''}</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-ink mb-6">
          {t('home.ctaSection.title').replace('\n', ' ')}
        </h2>
        <Link to="/booking" className="btn-primary">{t('home.ctaSection.button')}</Link>
      </section>

      <style>{`
        .prose-blog { color: #3A3A3A; font-family: Montserrat, sans-serif; font-weight: 300; font-size: 0.875rem; line-height: 1.9; }
        .prose-blog h2 { font-family: 'Cormorant Garamond', serif; font-weight: 400; font-size: 1.6rem; color: #0A0A0A; margin: 2.5rem 0 1rem; }
        .prose-blog p { margin-bottom: 1.2rem; }
        .prose-blog strong { font-weight: 500; color: #0A0A0A; }
      `}</style>
    </div>
  )
}
