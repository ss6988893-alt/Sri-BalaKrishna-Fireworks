import { motion } from 'framer-motion'
import { HiOutlineClock, HiOutlineLocationMarker, HiOutlineTrash, HiOutlineUserGroup } from 'react-icons/hi'
import { communitySafety } from '../../data/safetyData'

const icons = [HiOutlineUserGroup, HiOutlineClock, HiOutlineLocationMarker, HiOutlineTrash]

export default function CommunityCare() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-light/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-maroon">Think Beyond the Fuse</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">Care for people, pets, and places</h2>
          <p className="mt-3 text-sm leading-6 text-maroon-darker/65 sm:text-base">A responsible celebration protects the whole neighbourhood before, during, and after the display.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communitySafety.map((item, index) => {
            const Icon = icons[index]
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -7, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
                className="group rounded-3xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/70 p-5 shadow-sm transition-shadow hover:shadow-premium"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-800 text-white shadow-lg transition-transform group-hover:rotate-12"><Icon size={23} /></span>
                  <span className="font-display text-3xl font-black text-gold/30">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-extrabold text-maroon-darker">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-maroon-darker/65">{item.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
