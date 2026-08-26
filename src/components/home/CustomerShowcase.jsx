import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi'
import setupCrew from '../../assets/events/display-setup-crew.jpg'
import pipeLayout from '../../assets/events/display-pipe-layout.jpg'
import displayOne from '../../assets/home/hero/hero-1.jpg'
import displayTwo from '../../assets/home/hero/hero-2.jpg'
import { useLanguage } from '../../context/LanguageContext'

const testimonials = [
  {
    quote: 'Professional planning, beautiful colours, and excellent coordination throughout our celebration.',
    quoteTa: 'தொழில்முறை திட்டமிடல், அழகான வண்ணங்கள் மற்றும் சிறந்த ஒருங்கிணைப்பு எங்கள் விழாவை சிறப்பாக்கியது.',
    quoteHi: 'पेशेवर योजना, सुंदर रंगों और बेहतरीन समन्वय ने हमारे समारोह को खास बना दिया।',
    name: 'Wedding Customer',
    nameTa: 'திருமண வாடிக்கையாளர்',
    nameHi: 'विवाह ग्राहक',
    location: 'Tamil Nadu',
    locationTa: 'தமிழ்நாடு',
    locationHi: 'तमिलनाडु',
  },
  {
    quote: 'The team handled the setup carefully and delivered a memorable fireworks display for everyone.',
    quoteTa: 'குழுவினர் அமைப்பை கவனமாக செய்து அனைவருக்கும் மறக்க முடியாத வாணவேடிக்கை நிகழ்ச்சியை வழங்கினர்.',
    quoteHi: 'टीम ने सावधानी से तैयारी की और सभी के लिए यादगार आतिशबाज़ी प्रदर्शन प्रस्तुत किया।',
    name: 'Festival Committee',
    nameTa: 'விழா குழு',
    nameHi: 'उत्सव समिति',
    location: 'Sivakasi Region',
    locationTa: 'சிவகாசி பகுதி',
    locationHi: 'शिवकाशी क्षेत्र',
  },
  {
    quote: 'Clear communication and a well-timed presentation made our special event even more impressive.',
    quoteTa: 'தெளிவான தகவல் தொடர்பும் சரியான நேர நிகழ்ச்சியும் எங்கள் விழாவை மேலும் சிறப்பாக்கியது.',
    quoteHi: 'स्पष्ट संवाद और सही समय पर प्रस्तुति ने हमारे विशेष कार्यक्रम को और प्रभावशाली बनाया।',
    name: 'Event Organizer',
    nameTa: 'நிகழ்ச்சி ஒருங்கிணைப்பாளர்',
    nameHi: 'कार्यक्रम आयोजक',
    location: 'Tamil Nadu',
    locationTa: 'தமிழ்நாடு',
    locationHi: 'तमिलनाडु',
  },
]

const galleryItems = [
  { image: displayOne, title: 'Grand Celebration Display', titleTa: 'பிரம்மாண்ட விழா வாணவேடிக்கை', titleHi: 'भव्य उत्सव प्रदर्शन' },
  { image: displayTwo, title: 'Premium Night Presentation', titleTa: 'உயர்தர இரவு நிகழ்ச்சி', titleHi: 'प्रीमियम रात्रि प्रदर्शन' },
  { image: setupCrew, title: 'Professional On-site Preparation', titleTa: 'தொழில்முறை தள தயாரிப்பு', titleHi: 'पेशेवर स्थल तैयारी' },
  { image: pipeLayout, title: 'Planned Display Arrangement', titleTa: 'திட்டமிட்ட வாணவேடிக்கை அமைப்பு', titleHi: 'योजनाबद्ध प्रदर्शन व्यवस्था' },
]

export default function CustomerShowcase() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { language } = useLanguage()
  const isTamil = language === 'ta'
  const isHindi = language === 'hi'
  const localize = (item, key) => (isTamil ? item[`${key}Ta`] : isHindi ? item[`${key}Hi`] : item[key])

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-light/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon"><FaStar /> {isTamil ? 'வாடிக்கையாளர் அனுபவங்கள்' : isHindi ? 'ग्राहक अनुभव' : 'Customer Experiences'}</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-maroon-darker sm:text-4xl">{isTamil ? 'நாங்கள் ஒளிரச் செய்த சிறப்பு விழாக்கள்' : isHindi ? 'वे उत्सव जिन्हें रोशन करने पर हमें गर्व है' : 'Celebrations We Are Proud to Light'}</h2>
          <p className="mt-4 text-sm leading-7 text-maroon-darker/65 sm:text-base">{isTamil ? 'வாடிக்கையாளர் கருத்துகள் மற்றும் எங்கள் தொழில்முறை தயாரிப்பு பணிகளின் காட்சிகள்.' : isHindi ? 'ग्राहकों की प्रतिक्रिया और हमारी पेशेवर तैयारी व प्रदर्शन कार्य की झलक।' : 'Customer feedback and a closer look at our professional preparation and display work.'}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article key={testimonial.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -7 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-gold/20 bg-cream/45 p-6 shadow-sm">
              <FaQuoteLeft className="text-2xl text-gold" />
              <div className="mt-4 flex gap-1 text-gold-dark" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <FaStar key={star} size={13} />)}</div>
              <p className="mt-4 text-sm italic leading-7 text-maroon-darker/75">“{localize(testimonial, 'quote')}”</p>
              <div className="mt-5 border-t border-gold/20 pt-4">
                <h3 className="font-display font-bold text-maroon-darker">{localize(testimonial, 'name')}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.13em] text-maroon/55">{localize(testimonial, 'location')}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon"><HiOutlinePhotograph size={18} /> {isTamil ? 'முடிக்கப்பட்ட நிகழ்ச்சி படங்கள்' : isHindi ? 'पूर्ण प्रदर्शन गैलरी' : 'Completed Display Gallery'}</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-maroon-darker">{isTamil ? 'தயாரிப்பிலிருந்து ஒளிரும் வானம் வரை' : isHindi ? 'तैयारी से चमकते आसमान तक' : 'From Preparation to Brilliant Skies'}</h2>
          </div>
          <Link to="/events" className="rounded-full border border-gold/35 px-5 py-2.5 text-sm font-bold text-maroon transition hover:bg-gold-light/25">{isTamil ? 'நிகழ்ச்சி வீடியோக்கள்' : isHindi ? 'प्रदर्शन वीडियो देखें' : 'View Display Videos'}</Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.button key={item.title} type="button" onClick={() => setSelectedImage(item)} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ y: -6 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.06 }} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-maroon-darker text-left shadow-glass">
              <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-maroon-darker/90 via-transparent to-transparent" />
              <span className="absolute bottom-0 left-0 right-0 p-4 text-sm font-bold text-white sm:text-base">{localize(item, 'title')}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[220] grid place-items-center bg-maroon-darker/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={localize(selectedImage, 'title')}>
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
                <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-maroon text-cream shadow-lg" aria-label="Close gallery image"><HiOutlineX size={22} /></button>
                <img src={selectedImage.image} alt={localize(selectedImage, 'title')} className="max-h-[78vh] w-full rounded-2xl object-contain" />
                <p className="px-4 py-3 text-center font-display text-lg font-bold text-maroon-darker">{localize(selectedImage, 'title')}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
