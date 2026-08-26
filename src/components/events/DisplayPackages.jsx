import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaCalendarAlt, FaCheck, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useLanguage } from '../../context/LanguageContext'

const packages = [
  {
    name: 'Classic Spark',
    nameTa: 'கிளாசிக் ஸ்பார்க்',
    nameHi: 'क्लासिक स्पार्क',
    badge: 'Essential',
    badgeTa: 'அடிப்படை',
    badgeHi: 'आवश्यक',
    description: 'A focused display plan for intimate celebrations and compact venues.',
    descriptionTa: 'சிறிய விழாக்கள் மற்றும் குறுகிய இடங்களுக்கு ஏற்ற திட்டமிட்ட வாணவேடிக்கை.',
    descriptionHi: 'छोटे समारोहों और सीमित स्थानों के लिए योजनाबद्ध आतिशबाज़ी प्रदर्शन।',
    features: ['Professional site planning', 'Selected colour effects', 'Coordinated firing sequence', 'Experienced display crew'],
    featuresTa: ['தொழில்முறை தள திட்டம்', 'தேர்ந்தெடுத்த வண்ண விளைவுகள்', 'ஒருங்கிணைந்த வெடிப்பு வரிசை', 'அனுபவமுள்ள குழு'],
    featuresHi: ['पेशेवर स्थल योजना', 'चुने हुए रंग प्रभाव', 'समन्वित फायरिंग क्रम', 'अनुभवी प्रदर्शन टीम'],
  },
  {
    name: 'Premium Celebration',
    nameTa: 'பிரீமியம் கொண்டாட்டம்',
    nameHi: 'प्रीमियम सेलिब्रेशन',
    badge: 'Most Popular',
    badgeTa: 'மிகவும் பிரபலமானது',
    badgeHi: 'सबसे लोकप्रिय',
    description: 'A balanced premium show with richer colours, special items, and extended sequences.',
    descriptionTa: 'செறிந்த வண்ணங்கள், சிறப்பு பொருட்கள் மற்றும் நீண்ட நிகழ்ச்சி வரிசையுடன் உயர்தர காட்சி.',
    descriptionHi: 'गहरे रंगों, विशेष आइटम और लंबे क्रम के साथ संतुलित प्रीमियम शो।',
    features: ['Everything in Classic Spark', 'Premium special display items', 'Multi-stage colour sequences', 'Enhanced finale arrangement'],
    featuresTa: ['கிளாசிக் தொகுப்பின் அனைத்தும்', 'உயர்தர சிறப்பு பொருட்கள்', 'பலநிலை வண்ண வரிசைகள்', 'சிறப்பான இறுதி நிகழ்ச்சி'],
    featuresHi: ['क्लासिक स्पार्क की सभी सुविधाएँ', 'प्रीमियम विशेष डिस्प्ले आइटम', 'बहु-स्तरीय रंग क्रम', 'बेहतर भव्य समापन'],
    featured: true,
  },
  {
    name: 'Grand Sky Show',
    nameTa: 'கிராண்ட் ஸ்கை ஷோ',
    nameHi: 'ग्रैंड स्काई शो',
    badge: 'Signature',
    badgeTa: 'சிறப்பு',
    badgeHi: 'सिग्नेचर',
    description: 'A large-format custom presentation designed for major events and grand audiences.',
    descriptionTa: 'பெரிய நிகழ்ச்சிகள் மற்றும் பார்வையாளர்களுக்காக வடிவமைக்கப்பட்ட தனிப்பயன் வாணவேடிக்கை.',
    descriptionHi: 'बड़े कार्यक्रमों और विशाल दर्शकों के लिए तैयार किया गया कस्टम भव्य प्रदर्शन।',
    features: ['Custom display choreography', 'Wide-range aerial presentation', 'Signature special effects', 'Grand multi-stage finale'],
    featuresTa: ['தனிப்பயன் நிகழ்ச்சி வடிவமைப்பு', 'பரந்த வான காட்சி', 'சிறப்பு விளைவுகள்', 'பிரம்மாண்ட பலநிலை இறுதி'],
    featuresHi: ['कस्टम प्रदर्शन कोरियोग्राफी', 'विस्तृत हवाई प्रस्तुति', 'सिग्नेचर विशेष प्रभाव', 'भव्य बहु-स्तरीय समापन'],
  },
]

const eventTypes = ['Wedding', 'Temple Festival', 'Corporate Event', 'Sports Event', 'College / School Event', 'Family Function', 'Birthday Celebration', 'Other']

export default function DisplayPackages() {
  const { language } = useLanguage()
  const isTamil = language === 'ta'
  const isHindi = language === 'hi'
  const localizePackage = (displayPackage, key) => (isTamil ? displayPackage[`${key}Ta`] : isHindi ? displayPackage[`${key}Hi`] : displayPackage[key])
  const bookingRef = useRef(null)
  const [booking, setBooking] = useState({ packageName: 'Premium Celebration', date: '', eventType: '', name: '', phone: '', city: '', venue: '', notes: '' })
  const [error, setError] = useState('')

  const choosePackage = (packageName) => {
    setBooking((current) => ({ ...current, packageName }))
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const submitBooking = (event) => {
    event.preventDefault()
    if (!booking.date || !booking.eventType || booking.name.trim().length < 2 || !/^\d{10,15}$/.test(booking.phone.replace(/\D/g, '')) || booking.city.trim().length < 2) {
      setError('Please complete the date, event, name, phone and city fields.')
      return
    }
    setError('')
    const message = [
      'Hello Sri Bala Krishna Fireworks,',
      '',
      'I would like to book a fireworks display.',
      `Package: ${booking.packageName}`,
      `Event: ${booking.eventType}`,
      `Date: ${booking.date}`,
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `City: ${booking.city}`,
      booking.venue ? `Venue: ${booking.venue}` : '',
      booking.notes ? `Notes: ${booking.notes}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/919894727599?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bg-gradient-to-b from-cream via-amber-50/60 to-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-light/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon"><HiOutlineSparkles /> {isTamil ? 'வாணவேடிக்கை சேவை தொகுப்புகள்' : isHindi ? 'आतिशबाज़ी सेवा पैकेज' : 'Display Service Packages'}</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-maroon-darker sm:text-4xl">{isTamil ? 'உங்கள் கொண்டாட்டத்திற்கு சரியான தொகுப்பை தேர்ந்தெடுக்கவும்' : isHindi ? 'अपने उत्सव के लिए सही स्तर चुनें' : 'Choose the Right Scale for Your Celebration'}</h2>
          <p className="mt-4 text-sm leading-7 text-maroon-darker/65 sm:text-base">{isTamil ? 'இடம், உள்ளூர் விதிகள், நிகழ்ச்சி நேரம் மற்றும் சிறப்பு பொருட்களின் அடிப்படையில் ஒவ்வொரு தொகுப்பும் தனிப்பயனாக்கப்படும்.' : isHindi ? 'हर पैकेज स्थल, स्थानीय आवश्यकताओं, प्रदर्शन अवधि और चुने गए विशेष आइटम के अनुसार अनुकूलित किया जाता है।' : 'Every package is customized after venue review, local requirements, display duration, and selected special items.'}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-3xl border border-gold/45 bg-maroon-gradient p-1 shadow-premium"
        >
          <div className="flex flex-col items-center justify-between gap-5 rounded-[1.3rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,214,102,0.22),_transparent_45%)] px-6 py-6 text-center text-cream sm:flex-row sm:px-8 sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">
                {isTamil ? 'வாணவேடிக்கை நிகழ்ச்சி ஆரம்ப விலை' : isHindi ? 'आतिशबाज़ी प्रदर्शन की शुरुआती कीमत' : 'Fireworks Display Starting Price'}
              </p>
              <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2 sm:justify-start">
                <span className="font-display text-4xl font-black text-white sm:text-5xl">₹50,000</span>
                <span className="text-sm font-bold text-gold-light">{isTamil ? 'முதல்' : isHindi ? 'से शुरू' : 'onwards'}</span>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-6 text-cream/80">
              {isTamil
                ? 'இறுதி கட்டணம் இடம், நகரம், நிகழ்ச்சி நேரம், பயணம், அனுமதிகள் மற்றும் தேர்ந்தெடுக்கப்படும் சிறப்பு வாணவேடிக்கை பொருட்களின் அடிப்படையில் மாறும்.'
                : isHindi
                  ? 'अंतिम शुल्क स्थान, शहर, प्रदर्शन अवधि, यात्रा, अनुमतियों और चुने गए विशेष आतिशबाज़ी आइटम के अनुसार बदलता है।'
                  : 'Final charges vary based on venue, city, display duration, travel, required permissions, and selected special fireworks items.'}
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((displayPackage, index) => (
            <motion.article key={displayPackage.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className={`relative flex flex-col rounded-3xl border p-6 shadow-glass sm:p-7 ${displayPackage.featured ? 'border-gold bg-maroon text-cream shadow-premium' : 'border-gold/20 bg-white text-maroon-darker'}`}>
              {displayPackage.featured && <span className="absolute right-5 top-5 rounded-full bg-gold-gradient px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-maroon-darker">{localizePackage(displayPackage, 'badge')}</span>}
              {!displayPackage.featured && <span className="text-xs font-bold uppercase tracking-[0.16em] text-maroon">{localizePackage(displayPackage, 'badge')}</span>}
              <h3 className={`mt-3 font-display text-2xl font-bold ${displayPackage.featured ? 'text-gold-light' : 'text-maroon-darker'}`}>{localizePackage(displayPackage, 'name')}</h3>
              <p className={`mt-3 text-sm leading-6 ${displayPackage.featured ? 'text-cream/70' : 'text-maroon-darker/65'}`}>{localizePackage(displayPackage, 'description')}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {localizePackage(displayPackage, 'features').map((feature) => <li key={feature} className="flex items-start gap-2 text-sm"><FaCheck className={`mt-1 shrink-0 ${displayPackage.featured ? 'text-gold-light' : 'text-gold-dark'}`} /> {feature}</li>)}
              </ul>
              <button type="button" onClick={() => choosePackage(displayPackage.name)} className={`mt-7 rounded-full px-5 py-3 text-sm font-bold transition hover:-translate-y-1 ${displayPackage.featured ? 'bg-gold-gradient text-maroon-darker' : 'bg-maroon-gradient text-cream'}`}>{isTamil ? 'இந்த தொகுப்பை பதிவு செய்க' : isHindi ? 'यह पैकेज बुक करें' : 'Book This Package'}</button>
            </motion.article>
          ))}
        </div>

        <motion.form ref={bookingRef} onSubmit={submitBooking} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} className="mt-12 rounded-3xl border border-gold/25 bg-white p-6 shadow-premium sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon"><FaCalendarAlt /> {isTamil ? 'நிகழ்ச்சி பதிவு காலண்டர்' : isHindi ? 'डिस्प्ले बुकिंग कैलेंडर' : 'Display Booking Calendar'}</span>
              <h3 className="mt-2 font-display text-3xl font-bold text-maroon-darker">{isTamil ? 'உங்கள் நிகழ்ச்சி தேதியை கோருங்கள்' : isHindi ? 'अपने कार्यक्रम की तारीख का अनुरोध करें' : 'Request Your Event Date'}</h3>
            </div>
            <span className="rounded-full bg-gold-light/35 px-4 py-2 text-sm font-bold text-maroon">{isTamil ? 'தேர்வு' : isHindi ? 'चुना गया' : 'Selected'}: {booking.packageName}</span>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-sm font-semibold text-maroon-darker">Display Package<select value={booking.packageName} onChange={(event) => setBooking({ ...booking, packageName: event.target.value })} className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold">{packages.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
            <label className="text-sm font-semibold text-maroon-darker">Event Date<input type="date" min={new Date().toISOString().slice(0, 10)} value={booking.date} onChange={(event) => setBooking({ ...booking, date: event.target.value })} className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
            <label className="text-sm font-semibold text-maroon-darker">Event Type<select value={booking.eventType} onChange={(event) => setBooking({ ...booking, eventType: event.target.value })} className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold"><option value="">Select event</option>{eventTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="text-sm font-semibold text-maroon-darker">Name<input value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Your name" className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
            <label className="text-sm font-semibold text-maroon-darker">Phone<input type="tel" value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="Contact number" className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
            <label className="text-sm font-semibold text-maroon-darker">City<input value={booking.city} onChange={(event) => setBooking({ ...booking, city: event.target.value })} placeholder="Event city" className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
            <label className="text-sm font-semibold text-maroon-darker sm:col-span-2">Venue<input value={booking.venue} onChange={(event) => setBooking({ ...booking, venue: event.target.value })} placeholder="Venue name or address" className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
            <label className="text-sm font-semibold text-maroon-darker sm:col-span-2 lg:col-span-4">Special Requirements<textarea value={booking.notes} onChange={(event) => setBooking({ ...booking, notes: event.target.value })} rows={3} placeholder="Display duration, audience size, special items or other requirements" className="mt-2 w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 outline-none focus:border-gold" /></label>
          </div>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-500"><FaWhatsapp size={18} /> {isTamil ? 'பதிவு கோரிக்கையை அனுப்பவும்' : isHindi ? 'बुकिंग अनुरोध भेजें' : 'Send Booking Request'}</button>
        </motion.form>
      </div>
    </section>
  )
}
