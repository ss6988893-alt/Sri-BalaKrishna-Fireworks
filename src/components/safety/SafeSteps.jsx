import { motion } from 'framer-motion'
import {
  HiShoppingCart,
  HiOutlineClipboardCheck,
  HiSparkles,
  HiOutlineArrowRight,
  HiOutlineTrash,
} from 'react-icons/hi'
import { safeSteps } from '../../data/safetyData'

const icons = [HiShoppingCart, HiOutlineClipboardCheck, HiSparkles, HiOutlineArrowRight, HiOutlineTrash]

const colorMap = {
  red: 'from-rose-500 to-red-700',
  orange: 'from-amber-400 to-orange-600',
  green: 'from-emerald-500 to-green-700',
  blue: 'from-sky-500 to-blue-700',
  purple: 'from-violet-500 to-purple-700',
}

export default function SafeSteps() {
  return (
    <section className="relative overflow-hidden bg-maroon-darker py-16 sm:py-20">
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_30%,rgba(244,216,140,.4),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(212,167,44,.3),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-light">Safe Celebration Flow</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">Five steps from purchase to cleanup</h2>
          <p className="mt-3 text-sm leading-6 text-cream/65 sm:text-base">Use this simple order every time you plan a fireworks celebration.</p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="absolute left-[8%] right-[8%] top-[44px] hidden h-px bg-gradient-to-r from-transparent via-gold-light/45 to-transparent lg:block" />
          {safeSteps.map((step, index) => {
            const Icon = icons[index]
            return (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -7, scale: 1.01 }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.08] p-5 text-center backdrop-blur-md"
              >
                <div className="relative mx-auto flex w-fit items-center justify-center">
                  <span className={`flex h-[88px] w-[88px] items-center justify-center rounded-full bg-gradient-to-br ${colorMap[step.color]} text-white shadow-xl ring-4 ring-white/10 transition-transform group-hover:rotate-6`}>
                    <Icon size={31} />
                  </span>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-[10px] font-black text-maroon-darker shadow-md">{step.num}</span>
                </div>
                <h3 className="mt-5 font-display text-base font-extrabold tracking-[0.16em] text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-5 text-cream/65">{step.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
