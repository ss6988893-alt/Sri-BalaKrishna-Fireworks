import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher({ compact = false, topbar = false }) {
  const { language, setLanguage } = useLanguage()

  const containerClasses = topbar
    ? 'border-gold-light/45 bg-cream/95 p-0.5'
    : 'border-gold/30 bg-cream/80 p-1'
  const buttonClasses = topbar ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1.5 text-xs'

  return (
    <div className={`inline-flex rounded-full border shadow-sm ${containerClasses} ${compact ? 'w-full' : ''}`} aria-label="Language selector">
      {[
        ['en', 'EN'],
        ['ta', 'தமிழ்'],
        ['hi', 'हिंदी'],
      ].map(([code, label]) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          className={`relative rounded-full font-bold transition-colors ${buttonClasses} ${compact ? 'flex-1' : ''} ${language === code ? 'text-cream' : 'text-maroon-darker/65 hover:text-maroon'}`}
          aria-pressed={language === code}
        >
          {language === code && <motion.span layoutId="language-active" className="absolute inset-0 rounded-full bg-maroon-gradient" transition={{ type: 'spring', stiffness: 340, damping: 28 }} />}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  )
}
