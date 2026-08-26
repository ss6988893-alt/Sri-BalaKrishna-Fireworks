import { motion } from 'framer-motion'
import { HiOutlineCalendar, HiOutlineCube, HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineLocationMarker } from 'react-icons/hi'
import { companyStats } from '../../data/homeData'
import { useLanguage } from '../../context/LanguageContext'

const icons = [HiOutlineCalendar, HiOutlineCube, HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineLocationMarker]
const tamilLabels = ['ஆண்டுகள் அனுபவம்', 'தயாரிப்புகள்', 'மகிழ்ச்சியான வாடிக்கையாளர்கள்', 'பாதுகாப்பு உறுதி', 'மாநிலங்களுக்கு விநியோகம்']
const hindiLabels = ['वर्षों का अनुभव', 'उत्पाद', 'खुश ग्राहक', 'सुरक्षा सुनिश्चित', 'राज्यों में आपूर्ति']

export default function StatsBar() {
  const { language } = useLanguage()
  return (
    <section className="bg-maroon-gradient py-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_30%,white,transparent_35%),radial-gradient(circle_at_80%_70%,white,transparent_35%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6">
          {companyStats.map((stat, idx) => {
            const Icon = icons[idx]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg mb-1">
                  <Icon size={22} className="text-maroon-darker" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-gold-light font-display">
                  {stat.value}
                </span>
                <span className="text-cream/85 text-xs sm:text-sm font-medium tracking-wide">
                  {language === 'ta' ? tamilLabels[idx] : language === 'hi' ? hindiLabels[idx] : stat.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
