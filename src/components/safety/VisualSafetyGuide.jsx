import { motion } from 'framer-motion'
import {
  HiCheckCircle,
  HiXCircle,
  HiOutlineLocationMarker,
  HiOutlineEye,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineClock,
} from 'react-icons/hi'
import { visualGuideSteps } from '../../data/safetyData'

const icons = [
  HiOutlineLocationMarker,
  HiOutlineEye,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineClock,
]

export default function VisualSafetyGuide() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-gold-light/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-rose-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-maroon">Five-Point Guide</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">See the safe sequence</h2>
          <p className="mt-3 text-sm leading-6 text-maroon-darker/65 sm:text-base">
            Set up carefully, light from a distance, and treat every dud as active.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {visualGuideSteps.map((step, index) => {
            const Icon = icons[index]
            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-cream shadow-sm transition-shadow hover:shadow-premium"
              >
                <div className={`h-2 ${step.ok ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition-transform group-hover:rotate-6 ${step.ok ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-rose-500 to-red-700'}`}>
                      <Icon size={23} />
                    </span>
                    <span className="font-display text-3xl font-black text-gold/30">0{index + 1}</span>
                  </div>
                  <div className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${step.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {step.ok ? <HiCheckCircle size={15} /> : <HiXCircle size={15} />}
                    {step.ok ? 'Recommended' : 'Avoid'}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-maroon-darker">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-maroon-darker/65">{step.caption}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
