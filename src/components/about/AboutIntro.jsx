import { motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi'
import { aboutIntro } from '../../data/aboutData'

export default function AboutIntro() {
  return (
    <section className="relative pt-[100px] sm:pt-[152px] pb-16 sm:pb-20 bg-gradient-to-br from-amber-50 via-cream to-orange-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 bg-gold-gradient text-maroon-darker text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
            <HiOutlineSparkles size={14} />
            EstD. {aboutIntro.founded}
          </span>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-maroon-darker mb-6">
            About Us
          </h1>

          <blockquote className="italic text-lg sm:text-xl text-maroon-darker/70 font-display mb-2">
            &ldquo;{aboutIntro.quote}&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-gold-dark mb-10">— {aboutIntro.quoteAuthor}</p>

          <div className="space-y-5 text-left max-w-3xl mx-auto">
            {aboutIntro.paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
                className="text-maroon-darker/75 text-base sm:text-lg leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
