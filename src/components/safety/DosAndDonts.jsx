import { motion } from 'framer-motion'
import { HiCheck, HiOutlineSparkles, HiX } from 'react-icons/hi'
import { PiShieldCheckDuotone, PiWarningDuotone } from 'react-icons/pi'
import { dos, donts } from '../../data/safetyData'

function SafetyList({ title, subtitle, items, positive }) {
  const Icon = positive ? PiShieldCheckDuotone : PiWarningDuotone

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, rotateY: positive ? -4 : 4 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-[2rem] border bg-white shadow-glass ${positive ? 'border-emerald-200/80' : 'border-rose-200/80'}`}
    >
      <div className={`relative overflow-hidden px-6 py-7 sm:px-8 ${positive ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-950' : 'bg-gradient-to-br from-rose-600 via-red-700 to-rose-950'}`}>
        <motion.div
          aria-hidden="true"
          className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[22px] border-white/10"
          animate={{ rotate: positive ? 360 : -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative flex items-center gap-4">
          <motion.span
            whileHover={{ rotate: positive ? 8 : -8, scale: 1.08 }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25"
          >
            <Icon size={30} />
          </motion.span>
          <div>
            <h3 className="font-display text-2xl font-extrabold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/75">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 p-4 sm:p-6">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: positive ? -14 : 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.38, delay: Math.min(index * 0.045, 0.35) }}
            whileHover={{ x: 5, scale: 1.01 }}
            className={`relative flex min-h-[78px] items-start gap-3 overflow-hidden rounded-2xl border px-4 py-3.5 transition-colors ${positive ? 'border-emerald-100 bg-emerald-50/65 hover:bg-emerald-50' : 'border-rose-100 bg-rose-50/65 hover:bg-rose-50'}`}
          >
            <span className={`absolute inset-y-0 left-0 w-1 ${positive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${positive ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              {positive ? <HiCheck size={18} /> : <HiX size={18} />}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-extrabold text-maroon-darker">{item.title}</p>
                <span className={`text-[9px] font-extrabold uppercase tracking-[0.16em] ${positive ? 'text-emerald-700/65' : 'text-rose-700/65'}`}>
                  {positive ? 'Do' : 'Avoid'} {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium leading-5 text-maroon-darker/70">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.article>
  )
}

export default function DosAndDonts() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_50%_0%,rgba(212,167,44,.22),transparent_43%)]" />
      <motion.div
        aria-hidden="true"
        className="absolute left-[8%] top-16 h-36 w-36 rounded-full border border-gold/20"
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.55, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-maroon shadow-sm"
          >
            <HiOutlineSparkles /> Before You Light
          </motion.span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">Fireworks display do&apos;s and don&apos;ts</h2>
          <p className="mt-3 text-sm leading-6 text-maroon-darker/65 sm:text-base">
            Plan the firing area, follow every product label, and make sure one responsible adult controls the display.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-maroon">
            {['Plan safely', 'Light one at a time', 'Move back quickly', 'Keep water ready'].map((label) => (
              <span key={label} className="rounded-full bg-gold-light/35 px-3 py-1.5">{label}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SafetyList title="Do’s" subtitle="Prepare carefully and act responsibly." items={dos} positive />
          <SafetyList title="Don’ts" subtitle="Avoid every unsafe shortcut." items={donts} positive={false} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-7 rounded-2xl border border-gold/30 bg-white/85 px-5 py-4 text-center text-sm font-semibold leading-6 text-maroon-darker/75 shadow-sm"
        >
          Product instructions and local authority rules always take priority. Consumer fireworks must never be used as professional display fireworks.
        </motion.div>
      </div>
    </section>
  )
}
