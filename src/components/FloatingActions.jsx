import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaRocket, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { useQuotation } from '../context/QuotationContext'
import { useLanguage } from '../context/LanguageContext'

const whatsappUrl = 'https://wa.me/919894727599?text=Hello%20Sri%20Bala%20Krishna%20Fireworks%2C%20I%20would%20like%20to%20know%20more.'
const rocketSparks = [
  { x: -24, y: 22, color: 'bg-gold-light' },
  { x: -10, y: 30, color: 'bg-orange-400' },
  { x: 8, y: 32, color: 'bg-yellow-300' },
  { x: 24, y: 20, color: 'bg-red-400' },
  { x: 30, y: 2, color: 'bg-gold' },
]

export default function FloatingActions() {
  const { totalItems } = useQuotation()
  const { t } = useLanguage()
  const [showTopButton, setShowTopButton] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 500)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    if (reduceMotion) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsLaunching(true)
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 220)
    window.setTimeout(() => setIsLaunching(false), 1200)
  }

  return (
    <div className="fixed bottom-4 right-3 z-[90] flex flex-col items-end gap-2 sm:bottom-6 sm:right-5">
      {totalItems > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}>
          <Link to="/quotation" aria-label={`Open quotation with ${totalItems} items`} className="group flex items-center gap-2 rounded-full bg-gold-gradient p-3 text-maroon-darker shadow-xl sm:px-4">
            <HiOutlineClipboardList size={20} />
            <span className="hidden text-xs font-bold sm:inline">{t('common.quotation')}</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-maroon px-1 text-[10px] font-bold text-cream">{totalItems}</span>
          </Link>
        </motion.div>
      )}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.65, y: 12 }}
            animate={isLaunching
              ? { opacity: 1, scale: [1, 0.94, 1.08, 1], y: [0, 5, -18, 0], rotate: [0, -3, 3, 0] }
              : { opacity: 1, scale: 1, y: [0, -3, 0] }}
            exit={{ opacity: 0, scale: 0.65, y: 12 }}
            transition={isLaunching
              ? { duration: 0.72, ease: 'easeOut' }
              : { y: { duration: 2.1, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
            whileHover={{ x: -4, scale: 1.07, rotate: -2 }}
            whileTap={{ scale: 0.92 }}
            aria-label={t('common.backToTop')}
            title={t('common.backToTop')}
            className="group relative isolate flex items-center gap-2 overflow-visible rounded-full border border-gold/70 bg-maroon-gradient p-3 text-gold-light shadow-[0_10px_30px_rgba(90,8,24,0.34)] sm:px-4"
          >
            <motion.span
              className="relative z-10 inline-flex"
              animate={isLaunching ? { y: [0, 4, -22, -4], rotate: [-45, -42, -48, -45] } : { y: [0, -2, 0], rotate: -45 }}
              transition={isLaunching ? { duration: 0.7, ease: 'easeOut' } : { duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaRocket size={19} />
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-1.5 rounded-full bg-orange-400 blur-[1px]"
                animate={{ scaleY: isLaunching ? [0.6, 1.8, 0.8] : [0.5, 1, 0.5], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: isLaunching ? 0.25 : 0.7, repeat: Infinity }}
              />
            </motion.span>
            <span className="relative z-10 hidden text-xs font-bold sm:inline">{t('common.top')}</span>
            <span className="pointer-events-none absolute -top-10 right-0 rounded-xl rounded-br-sm bg-white px-2.5 py-1.5 text-[10px] font-black text-maroon opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
              {t('common.whoosh')}
            </span>
            <AnimatePresence>
              {isLaunching && rocketSparks.map((spark, index) => (
                <motion.span
                  key={`${spark.x}-${spark.y}`}
                  className={`pointer-events-none absolute left-4 top-5 h-2 w-2 rounded-full ${spark.color}`}
                  initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                  animate={{ x: spark.x, y: spark.y, scale: [0.2, 1.2, 0], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, delay: index * 0.035, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a whileHover={{ x: -4, scale: 1.04 }} whileTap={{ scale: 0.96 }} href="tel:+919894727599" aria-label="Call Sri Bala Krishna Fireworks" className="group flex items-center gap-2 rounded-full bg-maroon p-3 text-white shadow-xl sm:px-4">
        <FaPhoneAlt size={18} /> <span className="hidden text-xs font-bold sm:inline">{t('common.call')}</span>
      </motion.a>
      <motion.a whileHover={{ x: -4, scale: 1.04 }} whileTap={{ scale: 0.96 }} href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Sri Bala Krishna Fireworks on WhatsApp" className="group flex items-center gap-2 rounded-full bg-emerald-600 p-3 text-white shadow-xl sm:px-4">
        <FaWhatsapp size={20} /> <span className="hidden text-xs font-bold sm:inline">{t('common.whatsapp')}</span>
      </motion.a>
    </div>
  )
}
