import { motion } from 'framer-motion'
import { FaBell, FaChild, FaEye, FaFirstAid, FaPaw, FaRulerHorizontal, FaTshirt } from 'react-icons/fa'
import { childrenSafety, emergencySteps } from '../../data/safetyData'
import safetyTipsBanner from '../../assets/safety/fireworks-safety-tips-banner.png'

const familyIcons = [FaChild, FaTshirt, FaPaw, FaRulerHorizontal]
const firstAidIcons = [FaFirstAid, FaEye, FaBell]

export default function EmergencyAndChildren() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gold-light/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-maroon">Protect Every Guest</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">Family safety and first response</h2>
          <p className="mt-3 text-sm leading-6 text-maroon-darker/65 sm:text-base">Keep the celebration controlled, and know what to do if something goes wrong.</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <motion.figure
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="group overflow-hidden rounded-3xl border border-gold/25 bg-white shadow-premium"
          >
            <div className="flex h-[220px] items-center justify-center overflow-hidden bg-maroon-darker p-2 sm:h-[260px]">
              <img
                src={safetyTipsBanner}
                alt="Illustrated fireworks safety tips for responsible celebrations"
                className="max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-display font-bold text-maroon-darker">Keep this guide visible</p>
                <p className="mt-0.5 text-xs text-maroon-darker/55">Share it with every adult supervising the display.</p>
              </div>
              <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 sm:inline">Safety first</span>
            </figcaption>
          </motion.figure>

          <motion.article
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-rose-200 bg-gradient-to-br from-white to-rose-50 p-6 shadow-glass sm:p-7"
          >
            <div className="mb-5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-rose-600">If an accident happens</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-maroon-darker">First-response basics</h3>
            </div>
            <div className="space-y-3">
              {emergencySteps.map((item, index) => {
                const Icon = firstAidIcons[index]
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    className="flex gap-3 rounded-2xl border border-rose-100 bg-white p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm"><Icon size={18} /></span>
                    <div>
                      <h4 className="text-sm font-extrabold text-maroon-darker">{item.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-maroon-darker/65">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-6 rounded-3xl border border-emerald-200 bg-white p-5 shadow-glass sm:p-7"
        >
          <div className="flex flex-col gap-2 border-b border-emerald-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-emerald-700">Extra Care</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-maroon-darker">Children and pet safety</h3>
            </div>
            <p className="max-w-md text-sm leading-6 text-maroon-darker/60">Children and pets should never enter the lighting or firing area.</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {childrenSafety.map((item, index) => {
              const Icon = familyIcons[index]
              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition-colors hover:bg-emerald-50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm transition-transform group-hover:rotate-6"><Icon size={19} /></span>
                  <h4 className="mt-4 font-display text-base font-bold text-maroon-darker">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-5 text-maroon-darker/65">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
