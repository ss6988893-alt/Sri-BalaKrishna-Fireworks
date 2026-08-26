import { motion } from 'framer-motion'
import { HiOutlineGlobeAlt, HiOutlineShieldCheck, HiOutlineBadgeCheck } from 'react-icons/hi'
import { GiFactory } from 'react-icons/gi'
import { RiLeafLine } from 'react-icons/ri'
import { MdOutlinePriceCheck } from 'react-icons/md'
import { FaStoreAlt } from 'react-icons/fa'
import SectionHeading from '../SectionHeading'
import { ourFocus, ourVision } from '../../data/aboutData'

const focusIcons = [RiLeafLine, HiOutlineShieldCheck, GiFactory]
const visionIcons = [HiOutlineBadgeCheck, MdOutlinePriceCheck, FaStoreAlt]

function BulletCard({ icon: Icon, text, delay, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white rounded-2xl p-6 shadow-glass hover:shadow-premium transition-shadow duration-300 flex flex-col items-start gap-4 h-full"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${accent.bg}`}>
        <Icon size={22} className={accent.text} />
      </div>
      <p className="text-sm sm:text-base text-maroon-darker/75 leading-relaxed">{text}</p>
    </motion.div>
  )
}

export default function FocusAndVision() {
  return (
    <>
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Drives Us" title="Our Focus" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourFocus.map((text, idx) => (
              <BulletCard
                key={text}
                icon={focusIcons[idx]}
                text={text}
                delay={idx * 0.1}
                accent={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-b from-cream to-gold-light/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Where We're Headed" title="Our Vision / Mission" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourVision.map((text, idx) => (
              <BulletCard
                key={text}
                icon={visionIcons[idx]}
                text={text}
                delay={idx * 0.1}
                accent={{ bg: 'bg-maroon/10', text: 'text-maroon' }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
