import { motion } from 'framer-motion'
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineColorSwatch, HiOutlineCog, HiOutlineGlobe } from 'react-icons/hi'
import { whyChooseUs } from '../../data/eventsData'

const icons = [HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineUserGroup, HiOutlineColorSwatch, HiOutlineCog, HiOutlineGlobe]

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-maroon-darker relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_20%_30%,white,transparent_35%),radial-gradient(circle_at_80%_70%,white,transparent_35%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gold-light">
              Why Choose Sri Bala Krishna Fireworks?
            </h2>
            <span className="h-px w-8 bg-gold" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {whyChooseUs.map((item, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="border border-gold/25 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-3 hover:bg-white/5 transition-colors duration-300"
              >
                <Icon size={26} className="text-gold-light" />
                <h4 className="font-display font-bold text-cream text-xs sm:text-sm tracking-wide uppercase">
                  {item.title}
                </h4>
                <p className="text-cream/55 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
