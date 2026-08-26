import { motion } from 'framer-motion'
import {
  HiOutlineAcademicCap,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineGift,
} from 'react-icons/hi'
import { GiTempleGate, GiPartyPopper, GiTrophyCup } from 'react-icons/gi'
import { FaSchool, FaMusic } from 'react-icons/fa'
import { specializations } from '../../data/eventsData'

const icons = [
  FaSchool,
  HiOutlineAcademicCap,
  HiOutlineAcademicCap,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineHeart,
  GiTempleGate,
  GiPartyPopper,
  FaMusic,
  GiTrophyCup,
]

export default function Specializations() {
  return (
    <section className="py-16 sm:py-20 bg-amber-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold-dark" />
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-maroon-darker">
              Events We Specialize In
            </h2>
            <span className="h-px w-8 bg-gold-dark" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {specializations.map((label, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.07 }}
                className="bg-maroon-darker rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-3 text-center px-3 shadow-glass hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={28} className="text-gold-light" />
                <span className="text-cream text-xs sm:text-sm font-bold tracking-wide uppercase">
                  {label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
