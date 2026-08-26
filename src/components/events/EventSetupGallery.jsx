import { motion } from 'framer-motion'
import { FaCheckCircle, FaTools } from 'react-icons/fa'
import setupCrew from '../../assets/events/display-setup-crew.jpg'
import pipeLayout from '../../assets/events/display-pipe-layout.jpg'

const setupPhotos = [
  {
    image: setupCrew,
    title: 'Experienced Display Crew',
    description: 'Our team carefully positions and prepares every launch pipe before the display.',
  },
  {
    image: pipeLayout,
    title: 'Planned Pipe Arrangement',
    description: 'Each layout is arranged with proper spacing for a coordinated fireworks presentation.',
  },
]

const setupHighlights = ['Careful Installation', 'Planned Layout', 'Professional Execution']

export default function EventSetupGallery() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-maroon/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon shadow-sm">
            <FaTools /> Behind the Display
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-maroon-darker sm:text-4xl">
            Professional Preparation for Every Show
          </h2>
          <p className="mt-4 text-sm leading-7 text-maroon-darker/70 sm:text-base">
            Our experienced display crew carefully installs the launch pipes and prepares every firing position for a beautifully coordinated fireworks display.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {setupHighlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white px-4 py-2 text-xs font-semibold text-maroon-darker shadow-sm"
              >
                <FaCheckCircle className="text-gold-dark" /> {highlight}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {setupPhotos.map((photo, index) => (
            <motion.article
              key={photo.title}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -7 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 170, damping: 19, delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-gold/25 bg-white shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden bg-maroon-darker">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold text-maroon-darker">{photo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-maroon-darker/70">{photo.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
