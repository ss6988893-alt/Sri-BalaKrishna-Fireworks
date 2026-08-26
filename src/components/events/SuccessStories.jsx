import { motion } from 'framer-motion'
import { HiOutlineArrowRight, HiOutlinePhotograph } from 'react-icons/hi'
import { successStories } from '../../data/eventsData'

function PhotoPlaceholder({ label, className = '' }) {
  return (
    <div className={`bg-maroon-darker/40 border border-gold/15 flex flex-col items-center justify-center text-cream/40 gap-1 ${className}`}>
      <HiOutlinePhotograph size={20} />
      <span className="text-[10px] text-center px-2 leading-tight">{label}</span>
    </div>
  )
}

export default function SuccessStories() {
  return (
    <section className="py-16 sm:py-20 bg-maroon-darker relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_15%_20%,white,transparent_35%),radial-gradient(circle_at_85%_80%,white,transparent_35%)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-cream">Our Successful Events</h2>
            <span className="h-px w-8 bg-gold" />
          </div>
          <p className="italic text-gold-light text-sm sm:text-base mb-2">Lighting Memories, Creating Magic</p>
          <p className="text-cream/60 text-sm max-w-xl mx-auto mb-12">
            We are proud to illuminate celebrations across Tamil Nadu with world-class fireworks displays.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {successStories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-maroon/20 border border-gold/20 rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <span className="absolute top-3 left-3 z-10 bg-maroon-gradient text-cream text-[11px] font-bold tracking-wide px-3 py-1.5 rounded">
                  {story.tag}
                </span>
                {story.date && (
                  <span className="absolute top-3 right-3 z-10 bg-cream text-maroon-darker text-center rounded-lg px-2.5 py-1.5 shadow leading-none">
                    <span className="block text-[9px] font-semibold">{story.date.month}</span>
                    <span className="block text-lg font-extrabold -my-0.5">{story.date.day}</span>
                    <span className="block text-[9px] font-semibold">{story.date.year}</span>
                  </span>
                )}
                <PhotoPlaceholder label="Main event photo needed" className="aspect-[16/10]" />
              </div>

              <div className="grid grid-cols-3 gap-1 p-1">
                <PhotoPlaceholder label="Photo 1" className="aspect-square text-[9px]" />
                <PhotoPlaceholder label="Photo 2" className="aspect-square text-[9px]" />
                <PhotoPlaceholder label="Photo 3" className="aspect-square text-[9px]" />
              </div>

              <div className="p-5">
                <p className="text-cream/75 text-sm leading-relaxed mb-4">{story.description}</p>
                <button className="inline-flex items-center gap-1.5 text-gold-light text-sm font-semibold hover:gap-2.5 transition-all duration-200">
                  View Details <HiOutlineArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
