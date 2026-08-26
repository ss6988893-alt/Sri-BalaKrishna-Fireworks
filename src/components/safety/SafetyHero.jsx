import { motion } from 'framer-motion'
import { HiOutlineDownload, HiOutlinePhone } from 'react-icons/hi'
import { PiShieldCheckDuotone, PiHandHeartDuotone, PiSparkleDuotone } from 'react-icons/pi'
import { GiWaterDrop, GiBookCover, GiCompass } from 'react-icons/gi'
import { FaUserShield } from 'react-icons/fa'
import { quickTips } from '../../data/safetyData'
import heroPhoto from '../../assets/safety/krishna-safety.png'
import safetyGuide from '../../assets/safety/fireworks-safety-guide.png'

const trustBadges = [
  { icon: PiShieldCheckDuotone, label: 'Licensed Range' },
  { icon: PiHandHeartDuotone, label: 'Label-led Safety' },
  { icon: PiSparkleDuotone, label: 'Responsible Celebrations' },
]

const quickTipIcons = [FaUserShield, GiWaterDrop, GiBookCover, GiCompass]

const colorMap = {
  red: 'from-red-500 to-rose-700',
  blue: 'from-sky-500 to-blue-700',
  orange: 'from-amber-400 to-orange-600',
  green: 'from-emerald-500 to-green-700',
}

export default function SafetyHero() {
  return (
    <section className="relative overflow-hidden bg-maroon-darker pt-[88px] sm:pt-[128px]">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_15%_20%,rgba(244,216,140,.45),transparent_28%),radial-gradient(circle_at_85%_65%,rgba(212,167,44,.28),transparent_32%)]" />
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.75, 0.3] }}
        transition={{ duration: 3.6, repeat: Infinity }}
        className="absolute right-[12%] top-[22%] h-3 w-3 rounded-full bg-gold-light shadow-[0_0_30px_12px_rgba(244,216,140,.4)]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-light/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur">
            <PiShieldCheckDuotone size={18} /> Fireworks Safety Guide
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Bright celebrations begin with
            <span className="block bg-gold-gradient bg-clip-text text-transparent">responsible choices.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-cream/75 sm:text-lg">
            Fireworks always require care. Read every label, prepare the area, protect children and pets, and keep a safe distance.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold text-cream/90">
                <Icon size={19} className="text-gold-light" /> {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={safetyGuide}
              download="sri-bala-krishna-fireworks-safety-guide.png"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-3.5 font-bold text-maroon-darker shadow-[0_16px_40px_rgba(212,167,44,.25)]"
            >
              <HiOutlineDownload size={20} /> Download Safety Guide
            </motion.a>
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+919894727599"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 font-bold text-white backdrop-blur hover:bg-white/15"
            >
              <HiOutlinePhone size={20} /> Ask Our Team
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 1.5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative mx-auto w-full max-w-[390px]"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gold-gradient opacity-70 blur-sm" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-gold-light/50 bg-maroon shadow-2xl">
            <img src={heroPhoto} alt="Sri Krishna with a fireworks celebration background" className="h-full w-full object-cover object-top" loading="eager" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-darker via-maroon-darker/75 to-transparent px-6 pb-6 pt-20">
              <p className="font-display text-xl font-bold text-white">Celebrate with care</p>
              <p className="mt-1 text-sm text-cream/75">Plan first. Light one. Move back.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickTips.map((tip, index) => {
            const Icon = quickTipIcons[index]
            return (
              <motion.article
                key={tip.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.07 }}
                whileHover={{ y: -5 }}
                className="group flex min-h-[132px] items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.13]"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[tip.color]} text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110`}>
                  <Icon size={22} />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-white">{tip.title}</h2>
                  <p className="mt-1.5 text-sm leading-5 text-cream/65">{tip.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
