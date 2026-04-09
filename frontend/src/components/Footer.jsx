import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  const pages = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/about', label: t('nav.about') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const services = [
    t('home.services.wedding.title'),
    t('home.services.graduation.title'),
    t('home.services.portrait.title'),
    t('home.services.family.title'),
  ]

  const socials = ['Facebook', 'Instagram', 'YouTube', 'TikTok']

  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-display font-light text-3xl tracking-wider mb-4">Lumière</h2>
            <p className="font-body font-light text-sm text-cream/60 leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="space-y-2">
              <p className="font-body text-xs text-cream/50 leading-relaxed">{t('footer.address')}</p>
              <p className="font-body text-xs text-cream/50">{t('footer.phone')}</p>
              <p className="font-body text-xs text-cream/50">{t('footer.email')}</p>
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="section-label text-cream/40 mb-6">{t('footer.pagesTitle')}</p>
            <ul className="space-y-3">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="font-body font-light text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="section-label text-cream/40 mb-6">{t('footer.servicesTitle')}</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="font-body font-light text-sm text-cream/60 hover:text-cream transition-colors duration-200">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="section-label text-cream/40 mb-6">{t('footer.followTitle')}</p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s}>
                  <span className="font-body font-light text-sm text-cream/60 hover:text-cream transition-colors duration-200 cursor-pointer">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-xs text-cream/40 tracking-wide">
            {t('footer.copyright')}
          </p>
          <p className="font-body font-light text-xs text-cream/30 tracking-widest uppercase">
            Lumière Studio
          </p>
        </div>
      </div>
    </footer>
  )
}
