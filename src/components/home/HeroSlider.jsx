import { useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { heroSlides } from '../../data/homeData'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slides = heroSlides.slice(0, 3)

  return (
    <section className="relative bg-maroon-darker pt-[112px] sm:pt-[152px]">
      <div className="relative mx-auto w-full max-w-[1280px] aspect-[4/3] overflow-hidden bg-maroon-darker sm:aspect-video">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5200, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          loop
          speed={900}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.image}>
              <div className="relative h-full w-full overflow-hidden">
                <motion.img
                  src={slide.image}
                  alt={slide.heading}
                  initial={{ scale: 1 }}
                  animate={{ scale: index === activeIndex ? 1.045 : 1 }}
                  transition={{ duration: 5.8, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-contain"
                  fetchpriority={index === 0 ? 'high' : 'auto'}
                />
                <motion.div
                  animate={{ opacity: index === activeIndex ? 1 : 0.45 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
