import { motion } from 'framer-motion'
import { FaCity, FaPlay, FaStar, FaVideo } from 'react-icons/fa'
import heroOne from '../../assets/home/hero/hero-1.jpg'
import heroTwo from '../../assets/home/hero/hero-2.jpg'
import heroThree from '../../assets/home/hero/hero-3.jpg'

const eventVideos = [
  {
    title: 'Sri Bala Krishna Fireworks Display 01',
    caption: 'A vibrant fireworks display presented by Sri Bala Krishna Fireworks.',
    poster: heroOne,
    videoSrc: '/videos/wedding-fireworks-display.mp4',
  },
  {
    title: 'Sri Bala Krishna Fireworks Display 02',
    caption: 'Colourful sky effects from our professionally coordinated fireworks display.',
    poster: heroTwo,
    videoSrc: '/videos/temple-festival-display.mp4',
  },
  {
    title: 'Sri Bala Krishna Fireworks Display 03',
    caption: 'Premium display highlights showcasing colour, brilliance, and celebration.',
    poster: heroThree,
    videoSrc: '/videos/corporate-fireworks-display.mp4',
  },
]

export default function EventVideoGallery() {
  return (
    <section className="relative overflow-hidden bg-maroon-darker py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
            <FaVideo /> Company Display Videos
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Experience Our Fireworks in Action
          </h2>
          <p className="mt-4 text-sm leading-7 text-cream/75 sm:text-base">
            Watch highlights from professionally coordinated fireworks displays created with exclusive items for memorable celebrations.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center gap-4 rounded-2xl border border-gold/35 bg-white/10 px-5 py-4 text-left shadow-lg backdrop-blur-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-lg text-maroon-darker shadow-gold-glow">
                <FaCity />
              </span>
              <div>
                <strong className="block text-lg font-bold text-white">100+ Cities</strong>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-gold-light">
                  Fireworks Display Service
                </span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center gap-4 rounded-2xl border border-gold/35 bg-white/10 px-5 py-4 text-left shadow-lg backdrop-blur-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-lg text-maroon-darker shadow-gold-glow">
                <FaStar />
              </span>
              <div>
                <strong className="block text-lg font-bold text-white">Special Display Items</strong>
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-gold-light">
                  Exclusive Effects &amp; Designs
                </span>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {eventVideos.map((video, index) => (
            <motion.article
              key={video.title}
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 170, damping: 18, delay: index * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-gold/25 bg-white shadow-2xl"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                {video.videoSrc ? (
                  <video
                    controls
                    preload="metadata"
                    poster={video.poster}
                    className="h-full w-full object-cover"
                  >
                    <source src={video.videoSrc} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <>
                    <img
                      src={video.poster}
                      alt={`${video.title} video preview`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-darker/90 via-maroon/20 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-maroon/85 text-xl text-white shadow-xl"
                    >
                      <FaPlay className="ml-1" />
                    </motion.div>
                    <span className="absolute bottom-3 left-3 rounded-full border border-gold/40 bg-maroon-darker/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-light">
                      Video coming soon
                    </span>
                  </>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-maroon-darker">{video.title}</h3>
                <p className="mt-2 text-sm leading-6 text-maroon-darker/70">{video.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
