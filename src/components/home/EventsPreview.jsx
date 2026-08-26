import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import academyEvents from '../../assets/home/events/academy-events.png'
import birthdayParties from '../../assets/home/events/birthday-parties.png'
import collegeEvents from '../../assets/home/events/college-events.png'
import culturalPrograms from '../../assets/home/events/cultural-programs.png'
import familyFunctions from '../../assets/home/events/family-functions.png'
import privateCompanyEvents from '../../assets/home/events/private-company-events.png'
import sportsEvents from '../../assets/home/events/sports-events.png'
import templeFestivals from '../../assets/home/events/temple-festivals.png'
import weddings from '../../assets/home/events/weddings.png'
import { useLanguage } from '../../context/LanguageContext'

const events = [
  { label: 'Sports Events', ta: 'விளையாட்டு நிகழ்ச்சிகள்', hi: 'खेल आयोजन', image: sportsEvents },
  { label: 'Private Company Events', ta: 'தனியார் நிறுவன நிகழ்ச்சிகள்', hi: 'निजी कंपनी आयोजन', image: privateCompanyEvents },
  { label: 'College Events', ta: 'கல்லூரி நிகழ்ச்சிகள்', hi: 'कॉलेज आयोजन', image: collegeEvents },
  { label: 'Cultural Programs', ta: 'கலாச்சார நிகழ்ச்சிகள்', hi: 'सांस्कृतिक कार्यक्रम', image: culturalPrograms },
  { label: 'Academy Events', ta: 'அகாடமி நிகழ்ச்சிகள்', hi: 'अकादमी आयोजन', image: academyEvents },
  { label: 'Birthday Parties', ta: 'பிறந்தநாள் விழாக்கள்', hi: 'जन्मदिन समारोह', image: birthdayParties },
  { label: 'Weddings', ta: 'திருமணங்கள்', hi: 'विवाह समारोह', image: weddings },
  { label: 'Family Functions', ta: 'குடும்ப விழாக்கள்', hi: 'पारिवारिक समारोह', image: familyFunctions },
  { label: 'Temple Festivals', ta: 'கோவில் திருவிழாக்கள்', hi: 'मंदिर उत्सव', image: templeFestivals },
]

const cardVariants = {
  hidden: { opacity: 0, y: 44, scale: 0.92, rotate: -1.5 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 155,
      damping: 18,
      delay: (index % 5) * 0.07,
    },
  }),
  hover: {
    y: -12,
    scale: 1.025,
    transition: { type: 'spring', stiffness: 280, damping: 20 },
  },
}

const imageVariants = {
  hover: { scale: 1.1, transition: { duration: 0.45, ease: 'easeOut' } },
}

const shineVariants = {
  hidden: { opacity: 0, x: '-140%' },
  visible: { opacity: 0, x: '-140%' },
  hover: { opacity: 0.7, x: '140%', transition: { duration: 0.75, ease: 'easeInOut' } },
}

export default function EventsPreview({ isEventPage = false }) {
  const { language, t } = useLanguage()

  return (
    <section className={`bg-gradient-to-b from-cream via-gold-light/10 to-cream pb-16 sm:pb-20 ${
      isEventPage ? 'pt-[128px] sm:pt-[168px]' : 'pt-16 sm:pt-20'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-maroon sm:text-sm">
            {t('events.services')}
          </span>
          <h2 className="text-3xl font-bold text-maroon-darker sm:text-4xl">
            {t('events.title')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-maroon-darker/70 sm:text-base">
            {t('events.subtitle')}
          </p>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold-gradient" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {events.map((event, index) => {
            const localizedLabel = language === 'ta' ? event.ta : language === 'hi' ? event.hi : event.label

            return (
              <Link key={event.label} to="/events" aria-label={`View ${event.label} fireworks displays`} className="block">
                <motion.article
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  className="group overflow-hidden rounded-2xl border border-gold/25 bg-maroon-darker shadow-glass transition-shadow duration-300 hover:shadow-premium"
                >
                  <div className="relative aspect-square overflow-hidden bg-maroon-darker">
                    <motion.img
                      variants={imageVariants}
                      src={event.image}
                      alt={`${event.label} fireworks display service`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-darker via-maroon-darker/85 to-transparent px-3 pb-3 pt-14 text-center">
                      <p className="font-display text-sm font-extrabold leading-tight text-cream drop-shadow-md sm:text-base">{localizedLabel}</p>
                      <motion.span
                        className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-gold"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + index * 0.03, duration: 0.35 }}
                      />
                    </div>
                    <motion.div
                      variants={shineVariants}
                      className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                    />
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
