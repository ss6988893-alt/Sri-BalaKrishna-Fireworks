import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineMenu, HiOutlineX, HiOutlinePhone, HiOutlineSparkles } from 'react-icons/hi'
import brandLogo from '../assets/logo/sri-bala-krishna-navbar-generated-transparent.png'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'

const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.products', to: '/products' },
  { key: 'nav.safety', to: '/safety-tips' },
  { key: 'nav.events', to: '/events' },
  { key: 'nav.contact', to: '/contact' },
  { key: 'nav.shop', to: '/shop' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 z-50 top-0 sm:top-8 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-glass py-2' : 'bg-white py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
          <img
            src={brandLogo}
            alt="Sri Bala Krishna Fireworks"
            className="h-14 w-36 rounded-md object-contain sm:h-16 sm:w-40"
          />
        </Link>

        {/* Center menu - desktop */}
        <ul className="hidden 2xl:flex items-center gap-0.5">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.045 }}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `group relative block overflow-hidden rounded-lg px-3 py-2 text-[13px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'text-maroon shadow-[0_5px_16px_rgba(212,167,44,0.18)]'
                      : 'text-maroon-darker/70 hover:text-maroon hover:shadow-[0_5px_16px_rgba(212,167,44,0.14)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        isActive ? 'bg-gold-light/45' : 'bg-gold-light/35 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                    <span className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-pulse" />
                    <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-gold opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100 group-hover:animate-pulse" />
                    <span className="relative z-10 flex items-center gap-1">
                      {t(link.key)}
                      <HiOutlineSparkles className="text-gold opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" size={13} />
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gold-gradient"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden 2xl:flex items-center gap-3 shrink-0">
          <a
            href="tel:+919894727599"
            className="inline-flex items-center gap-2 bg-maroon-gradient text-cream text-sm font-semibold px-5 py-2.5 rounded-full shadow-premium hover:brightness-110 hover:scale-[1.03] active:scale-95 transition-all duration-200"
          >
            <HiOutlinePhone className="text-gold-light" size={16} />
            {t('common.contact')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="2xl:hidden text-maroon-darker p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="2xl:hidden bg-white border-t border-gold/20 shadow-glass"
        >
          <ul className="flex flex-col px-4 py-3">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.to}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gold-light/35 text-maroon'
                        : 'border-b border-gold/10 text-maroon-darker/70 hover:bg-gold-light/20 hover:text-maroon'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{t(link.key)}</span>
                      <HiOutlineSparkles
                        size={16}
                        className={`text-gold transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
            <li className="pt-3">
              <LanguageSwitcher compact />
            </li>
            <li className="pt-3">
              <a
                href="tel:+919894727599"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full bg-maroon-gradient text-cream text-sm font-semibold px-5 py-3 rounded-full"
              >
                <HiOutlinePhone className="text-gold-light" size={16} />
                {t('common.contact')}
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  )
}
