import { useEffect, useState } from 'react'
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
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const LANGS = [
    { code: 'vi', flag: '🇻🇳', name: 'Việt Nam' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'jp', flag: '🇯🇵', name: '日本語' },
  ]

  const isActive = (to) => location.pathname === to

  const navBg = scrolled || !isHome || menuOpen
    ? 'bg-cream border-b border-bone'
    : 'bg-transparent'

  const textColor = scrolled || !isHome || menuOpen ? 'text-ink' : 'text-cream'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-display font-bold text-xl lg:text-2xl tracking-wider transition-colors duration-500 shrink-0" style={{ color: '#BBA18E' }}>
            MOMIJI STUDIO
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

          {/* Right side — desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Language switcher */}
            <div className={`flex items-center gap-1 font-body text-xs font-medium ${textColor}`}>
              {LANGS.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  {i > 0 && <span className="opacity-20 mx-1">|</span>}
                  <button
                    onClick={() => setLang(l.code)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-200 hover:opacity-100 ${lang === l.code ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span className="tracking-wide">{l.name}</span>
                  </button>
                </span>
              ))}
            </div>
            <Link
              to="/booking"
              className={`font-body font-medium text-xs tracking-widest uppercase border px-5 py-2.5 transition-all duration-300
                ${scrolled || !isHome
                  ? 'border-gold text-gold hover:bg-gold hover:text-white'
                  : 'border-cream text-cream hover:bg-cream hover:text-ink'
                }`}
            >
              {t('nav.bookNow')}
            </Link>
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex flex-col justify-center gap-[5px] w-10 h-10 ${textColor}`}
              aria-label="Toggle menu"
            >
              <span className={`block h-px w-6 mx-auto bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-px w-6 mx-auto bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-px w-6 mx-auto bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-cream ${menuOpen ? 'max-h-screen pb-6' : 'max-h-0'}`}>
        <div className="px-5 pt-2 pb-2 flex flex-col border-t border-bone">
          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body font-medium text-sm tracking-widest uppercase text-ink py-4 border-b border-bone/50 transition-opacity duration-200
                ${isActive(link.to) ? 'opacity-100' : 'opacity-50 active:opacity-100'}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Book Now */}
          <Link to="/booking" className="btn-primary text-center mt-5 mb-1">
            {t('nav.bookNow')}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1 pt-4 pb-2 flex-wrap">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-2 px-3 py-2 border transition-all duration-200
                  ${lang === l.code
                    ? 'border-gold text-ink opacity-100'
                    : 'border-bone text-mist opacity-70 hover:opacity-100'
                  }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="font-body text-xs tracking-wide">{l.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
