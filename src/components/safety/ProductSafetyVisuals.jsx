import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCheckCircle, HiOutlineArrowsExpand, HiX } from 'react-icons/hi'
import levelSurfaceGuide from '../../assets/safety/level-surface-guide.png'
import flowerPotGuide from '../../assets/safety/flower-pot-guide.png'
import fountainDisposalGuide from '../../assets/safety/fountain-disposal-guide.png'

const guides = [
  {
    title: 'Level-ground setup',
    label: 'Before lighting',
    image: levelSurfaceGuide,
    alt: 'Visual instructions for placing and lighting a cylindrical firework',
    summary: 'Place the item upright on firm, level ground. Straighten the fuse, light it at arm\'s length, and move back to the distance printed on the label.',
  },
  {
    title: 'Flower pot handling',
    label: 'Protect your face and hands',
    image: flowerPotGuide,
    alt: 'Visual do and do not instructions for lighting flower pot fireworks',
    summary: 'Never lean over or hold a flower pot. Keep unused fireworks away, extend your arm while lighting, and move away immediately.',
  },
  {
    title: 'Safe use and cleanup',
    label: 'After the display',
    image: fountainDisposalGuide,
    alt: 'Visual instructions for lighting and disposing of a fountain firework',
    summary: 'Let spent fireworks cool completely, soak them with water, and dispose of them according to local waste rules.',
  },
]

export default function ProductSafetyVisuals() {
  const [selectedGuide, setSelectedGuide] = useState(null)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedGuide(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-gold-light/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.28em] text-maroon">Product-wise Guidance</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">Learn visually before you light</h2>
          <p className="mt-3 text-sm leading-6 text-maroon-darker/65 sm:text-base">Select a diagram to inspect it. Always follow the instructions printed on the specific product.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.button
              key={guide.title}
              type="button"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedGuide(guide)}
              className="group overflow-hidden rounded-3xl border border-gold/20 bg-cream text-left shadow-sm transition-shadow hover:shadow-premium"
            >
              <span className="relative flex h-44 items-center justify-center overflow-hidden border-b border-gold/15 bg-white p-3 sm:h-48">
                <img src={guide.image} alt={guide.alt} className="max-h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-maroon text-white shadow-lg transition-transform group-hover:rotate-12 group-hover:scale-110"><HiOutlineArrowsExpand size={18} /></span>
              </span>
              <span className="block p-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800"><HiCheckCircle size={14} /> {guide.label}</span>
                <span className="mt-3 block font-display text-xl font-extrabold text-maroon-darker">{guide.title}</span>
                <span className="mt-2 block text-sm leading-6 text-maroon-darker/65">{guide.summary}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedGuide && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedGuide(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-maroon-darker/95 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedGuide.title}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-gold-light/40 bg-white shadow-2xl"
            >
              <button type="button" onClick={() => setSelectedGuide(null)} aria-label="Close visual guide" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-white shadow-lg transition-transform hover:rotate-90 hover:scale-110"><HiX size={22} /></button>
              <div className="grid lg:grid-cols-[1.45fr_.55fr]">
                <div className="flex max-h-[70vh] min-h-[280px] items-center justify-center bg-cream p-4 sm:p-6">
                  <img src={selectedGuide.image} alt={selectedGuide.alt} className="max-h-[64vh] w-full object-contain" />
                </div>
                <div className="flex flex-col justify-center bg-maroon-darker p-6 text-white sm:p-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold-light">{selectedGuide.label}</span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{selectedGuide.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-cream/75">{selectedGuide.summary}</p>
                  <p className="mt-5 rounded-2xl border border-gold-light/20 bg-white/10 p-4 text-xs leading-5 text-cream/70">The product label is the primary instruction. Use only the marked lighting method and safety distance.</p>
                </div>
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
