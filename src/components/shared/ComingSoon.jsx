import { motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function ComingSoon({ title }) {
  return (
    <section className="pt-[110px] sm:pt-[160px] pb-24 min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-cream to-orange-50">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <div className="w-16 h-16 rounded-full bg-white shadow-glass flex items-center justify-center mx-auto mb-5">
          <HiOutlineSparkles size={28} className="text-gold-dark" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-maroon-darker mb-3">
          {title}
        </h1>
        <p className="text-maroon-darker/60 max-w-md mx-auto mb-6">
          This page is being crafted right now. Check back soon, or head home in the meantime.
        </p>
        <Link
          to="/"
          className="inline-block bg-maroon-gradient text-cream font-semibold px-6 py-3 rounded-full shadow-premium hover:brightness-110 transition-all duration-200"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  )
}
