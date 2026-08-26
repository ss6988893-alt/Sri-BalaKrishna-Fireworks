import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 ${
            light ? 'text-gold-light' : 'text-maroon'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold ${light ? 'text-cream' : 'text-maroon-darker'}`}>
        {title}
      </h2>
      <div className="w-20 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
    </motion.div>
  )
}
