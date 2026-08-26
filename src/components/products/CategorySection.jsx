import { motion } from 'framer-motion'

export default function CategorySection({ category, index }) {
  return (
    <section id={category.id} className="scroll-mt-[170px] py-10 sm:py-12 border-b border-gold/10 last:border-0">
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="font-display font-bold text-xl sm:text-2xl text-maroon-darker mb-6 flex items-center gap-3"
      >
        <span className="w-8 h-8 rounded-full bg-gold-gradient text-maroon-darker text-xs font-extrabold flex items-center justify-center shrink-0">
          {index + 1}
        </span>
        {category.title}
      </motion.h3>

      <div className={`grid gap-5 ${category.images.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
        {category.images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="rounded-2xl overflow-hidden shadow-glass hover:shadow-premium transition-shadow duration-300 bg-white"
          >
            <img
              src={img}
              alt={`${category.title} ${idx + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
