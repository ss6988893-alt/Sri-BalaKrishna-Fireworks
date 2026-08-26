import { motion } from 'framer-motion'
import { HiOutlineDownload, HiShieldCheck } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import safetyGuide from '../../assets/safety/fireworks-safety-guide.png'

export default function SafetyCTA() {
  return (
    <section className="relative overflow-hidden bg-gold-gradient py-12 sm:py-14">
      <div className="absolute -left-16 -top-20 h-64 w-64 rounded-full border-[34px] border-white/15" />
      <div className="absolute -bottom-24 right-5 h-72 w-72 rounded-full border-[42px] border-maroon/10" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left"
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-maroon-darker text-gold-light shadow-xl">
          <HiShieldCheck size={32} />
        </span>
        <div className="flex-1">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-maroon">Safety Is Shared</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-maroon-darker sm:text-3xl">Plan carefully. Celebrate responsibly.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-maroon-darker/70">Download the guide for your family or speak with our team before planning a fireworks display.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:justify-end">
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href={safetyGuide}
            download="sri-bala-krishna-fireworks-safety-guide.png"
            className="inline-flex items-center gap-2 rounded-xl bg-maroon-darker px-5 py-3 font-bold text-white shadow-lg"
          >
            <HiOutlineDownload size={19} /> Download Guide
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/919894727599?text=Hello%20Sri%20Bala%20Krishna%20Fireworks%2C%20I%20would%20like%20fireworks%20safety%20guidance."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-maroon-darker/20 bg-white/70 px-5 py-3 font-bold text-maroon-darker shadow-sm backdrop-blur hover:bg-white"
          >
            <FaWhatsapp size={19} /> Ask on WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
