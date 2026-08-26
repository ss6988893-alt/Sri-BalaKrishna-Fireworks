import { motion } from 'framer-motion'
import { GiFactory } from 'react-icons/gi'
import SectionHeading from '../SectionHeading'
import { sisterConcerns } from '../../data/aboutData'

export default function SisterConcerns() {
  return (
    <section className="py-16 sm:py-20 bg-maroon-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_15%_25%,white,transparent_35%),radial-gradient(circle_at_85%_75%,white,transparent_35%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading eyebrow="Our Group of Companies" title="Sister Concerns" light />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sisterConcerns.map((name, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white/5 border border-gold/20 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:bg-white/10 hover:border-gold/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                <GiFactory size={26} className="text-maroon-darker" />
              </div>
              <h4 className="font-display font-semibold text-cream text-sm sm:text-base leading-snug">
                {name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
