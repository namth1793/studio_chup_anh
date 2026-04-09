import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const isActive = (to) => location.pathname === to

  const navBg = scrolled || !isHome || menuOpen
    ? 'bg-cream border-b border-bone'
    : 'bg-transparent'

  const textColor = scrolled || !isHome || menuOpen ? 'text-ink' : 'text-cream'
  const logoColor = scrolled || !isHome || menuOpen ? 'text-ink' : 'text-cream'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className={`font-display font-light text-2xl tracking-wider transition-colors duration-500 ${logoColor}`}>
            Lumière
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body font-medium text-xs tracking-widest uppercase transition-all duration-300 relative group
                  ${textColor}
                  ${isActive(link.to) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                `}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300
                  ${isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language switcher */}
            <div className={`flex items-center gap-2 font-body text-xs font-medium tracking-widest ${textColor}`}>
              {['vi', 'en', 'jp'].map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  {i > 0 && <span className="opacity-30">|</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`uppercase transition-opacity duration-200 hover:opacity-100 ${lang === l ? 'opacity-100' : 'opacity-40'}`}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>
            <Link
              to="/booking"
              className={`font-body font-medium text-xs tracking-widest uppercase border px-5 py-2.5 transition-all duration-300
                ${scrolled || !isHome
                  ? 'border-ink text-ink hover:bg-ink hover:text-cream'
                  : 'border-cream text-cream hover:bg-cream hover:text-ink'
                }`}
            >
              {t('nav.bookNow')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex flex-col gap-1.5 w-6 ${textColor}`}
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-cream ${menuOpen ? 'max-h-screen pb-8' : 'max-h-0'}`}>
        <div className="px-6 pt-4 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body font-medium text-sm tracking-widest uppercase text-ink transition-opacity duration-200
                ${isActive(link.to) ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 font-body text-xs font-medium tracking-widest text-ink pt-2 border-t border-bone">
            {['vi', 'en', 'jp'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`uppercase transition-opacity duration-200 ${lang === l ? 'opacity-100' : 'opacity-40'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <Link to="/booking" className="btn-primary self-start">
            {t('nav.bookNow')}
          </Link>
        </div>
      </div>
    </header>
  )
}
