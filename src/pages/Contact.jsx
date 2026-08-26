import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'
import {
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiOutlineExternalLink,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineOfficeBuilding,
  HiOutlinePhone,
  HiOutlineUser,
} from 'react-icons/hi'

const locations = [
  {
    id: 'office',
    label: 'Office Location',
    title: 'Office Room',
    address: 'Sri Bala Krishna Fireworks Office',
    mapUrl: 'https://www.google.com/maps?q=9.451423,77.802426&z=17&output=embed',
    directionsUrl: 'https://maps.app.goo.gl/UM3pKywppzmPoBzA7?g_st=ac',
  },
  {
    id: 'factory',
    label: 'Factory Location',
    title: 'Our Factory',
    address: 'Sri Balakrishna Fireworks, Chokkalingapuram, Sivakasi, Tamil Nadu 626189',
    mapUrl: 'https://www.google.com/maps?q=Sri+Balakrishna+Fireworks,+Sivakasi,+Chokkalingapuram,+Tamil+Nadu+626189&z=17&output=embed',
    directionsUrl: 'https://maps.app.goo.gl/swmQjRyUfbtMtEPFA?g_st=ac',
  },
]

const formTabs = [
  { id: 'enquiry', label: 'Enquiry', icon: HiOutlineChatAlt2 },
  { id: 'feedback', label: 'Feedback', icon: HiOutlineDocumentText },
  { id: 'dealership', label: 'New Dealership', icon: HiOutlineOfficeBuilding },
]

function Field({ name, label, icon: Icon, type = 'text', placeholder, textarea = false, required = true, error, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-maroon-darker/80">{label}</span>
      <motion.div
        animate={error ? { x: [0, -4, 4, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.34, ease: 'easeInOut' }}
        className={`group flex items-start gap-2.5 rounded-lg border bg-cream/60 px-3 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:ring-4 ${
          error
            ? 'border-red-400 bg-red-50/60 focus-within:border-red-500 focus-within:ring-red-100'
            : 'border-gold/20 focus-within:border-gold focus-within:ring-gold-light/20'
        }`}
      >
        <Icon size={18} className="mt-0.5 shrink-0 text-maroon transition-transform duration-200 group-focus-within:scale-110" />
        {textarea ? (
          <textarea
            name={name}
            required={required}
            rows={3}
            placeholder={placeholder}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            className="w-full resize-none bg-transparent text-sm text-maroon-darker outline-none placeholder:text-maroon-darker/40"
          />
        ) : (
          <input
            name={name}
            required={required}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            className="w-full bg-transparent text-sm text-maroon-darker outline-none placeholder:text-maroon-darker/40"
          />
        )}
      </motion.div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.span
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -5, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] leading-none text-white">!</span>
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

function SubmitButton({ label }) {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon-gradient px-6 py-2.5 text-sm font-bold text-cream shadow-premium transition-all duration-200 hover:brightness-110"
    >
      <HiOutlineCheckCircle size={19} />
      Send {label}
    </motion.button>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('enquiry')
  const [submittedTab, setSubmittedTab] = useState(null)
  const [errors, setErrors] = useState({})
  const activeForm = formTabs.find((tab) => tab.id === activeTab)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const nextErrors = {}
    const requiredFields = {
      enquiry: { name: 'Name', email: 'Email', phone: 'Phone', location: 'Location', message: 'Your message' },
      feedback: { name: 'Name', customerType: 'Dealer, retailer or customer', address: 'Address', phone: 'Phone', email: 'Email ID', feedback: 'Your feedback' },
      dealership: { name: 'Name', email: 'Email address', phone: 'Contact number', licenseNumber: 'License number', gstNumber: 'GST number', licenseValidity: 'License validity', dealerAddress: 'Dealer address', licenseType: 'License type' },
    }

    Object.entries(requiredFields[activeTab]).forEach(([fieldName, label]) => {
      if (!String(formData[fieldName] || '').trim()) nextErrors[fieldName] = `${label} is required.`
    })

    if (formData.name && String(formData.name).trim().length < 2) nextErrors.name = 'Enter at least 2 characters.'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formData.email))) nextErrors.email = 'Enter a valid email address.'
    if (formData.phone && !/^\d{10,15}$/.test(String(formData.phone).replace(/\D/g, ''))) nextErrors.phone = 'Enter a valid 10 to 15 digit phone number.'
    if (formData.message && String(formData.message).trim().length < 10) nextErrors.message = 'Please enter at least 10 characters.'
    if (formData.feedback && String(formData.feedback).trim().length < 10) nextErrors.feedback = 'Please enter at least 10 characters.'
    if (formData.address && String(formData.address).trim().length < 5) nextErrors.address = 'Enter a complete address.'
    if (formData.dealerAddress && String(formData.dealerAddress).trim().length < 5) nextErrors.dealerAddress = 'Enter a complete dealer address.'
    if (formData.licenseNumber && String(formData.licenseNumber).trim().length < 3) nextErrors.licenseNumber = 'Enter a valid license number.'
    if (formData.gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/i.test(String(formData.gstNumber).trim())) nextErrors.gstNumber = 'Enter a valid 15-character GST number.'
    if (formData.licenseValidity && new Date(formData.licenseValidity) < new Date(new Date().toDateString())) nextErrors.licenseValidity = 'License validity must be today or later.'

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setSubmittedTab(null)
      return
    }

    setErrors({})
    setSubmittedTab(activeTab)
  }

  const clearFieldError = (fieldName) => {
    if (!errors[fieldName]) return
    setErrors((currentErrors) => ({ ...currentErrors, [fieldName]: undefined }))
  }

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-amber-50 via-cream to-orange-50 pb-12 pt-[128px] sm:pb-16 sm:pt-[168px]">
        <div className="max-w-6xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full bg-gold-light/40 px-4 py-2 text-xs font-bold tracking-[0.18em] text-maroon uppercase">
            {t('contact.badge')}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-maroon-darker sm:text-5xl">
            {t('contact.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-maroon-darker/70 sm:text-lg">
            {t('contact.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <motion.a
              href="tel:+919894727599"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-maroon-gradient px-6 py-3 text-sm font-bold text-cream shadow-premium"
            >
              <HiOutlinePhone size={19} /> +91 98947 27599
            </motion.a>
            <motion.a
              href="https://wa.me/919894727599?text=Hello%20Sri%20Bala%20Krishna%20Fireworks%2C%20I%20would%20like%20to%20know%20more."
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-emerald-500"
            >
              <FaWhatsapp size={20} /> {t('common.whatsapp')}
            </motion.a>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-gold/20 bg-white shadow-premium">
            <div className="border-b border-gold/15 bg-cream/70 p-2.5 sm:p-3">
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-white p-1 shadow-sm">
                {formTabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id)
                        setSubmittedTab(null)
                        setErrors({})
                      }}
                      className={`relative flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-bold transition-colors duration-200 sm:px-3 sm:text-sm ${
                        isActive ? 'text-cream' : 'text-maroon-darker/70 hover:text-maroon'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="contact-active-tab"
                          className="absolute inset-0 rounded-xl bg-maroon-gradient shadow"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        />
                      )}
                      <Icon size={18} className="relative z-10 shrink-0" />
                      <span className="relative z-10 hidden sm:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-maroon uppercase">{activeForm.label}</span>
                    <h2 className="mt-1.5 font-display text-2xl font-extrabold text-maroon-darker sm:text-3xl">
                      {activeTab === 'enquiry' && 'How can we help?'}
                      {activeTab === 'feedback' && 'Share your experience'}
                      {activeTab === 'dealership' && 'Join our dealer network'}
                    </h2>
                  </div>

                  {activeTab === 'enquiry' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Name" icon={HiOutlineUser} placeholder="Your full name" error={errors.name} onChange={() => clearFieldError('name')} />
                      <Field name="email" label="Email" icon={HiOutlineMail} type="email" placeholder="you@example.com" error={errors.email} onChange={() => clearFieldError('email')} />
                      <Field name="phone" label="Phone" icon={HiOutlinePhone} type="tel" placeholder="Your contact number" error={errors.phone} onChange={() => clearFieldError('phone')} />
                      <Field name="location" label="Location" icon={HiOutlineLocationMarker} placeholder="City or town" error={errors.location} onChange={() => clearFieldError('location')} />
                      <div className="sm:col-span-2">
                        <Field name="message" label="Your Message" icon={HiOutlineChatAlt2} placeholder="Tell us how we can help" textarea error={errors.message} onChange={() => clearFieldError('message')} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'feedback' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Name" icon={HiOutlineUser} placeholder="Your full name" error={errors.name} onChange={() => clearFieldError('name')} />
                      <Field name="customerType" label="Dealer, Retailer or Customer" icon={HiOutlineOfficeBuilding} placeholder="Your relationship with us" error={errors.customerType} onChange={() => clearFieldError('customerType')} />
                      <Field name="address" label="Address" icon={HiOutlineLocationMarker} placeholder="Your address" error={errors.address} onChange={() => clearFieldError('address')} />
                      <Field name="phone" label="Phone" icon={HiOutlinePhone} type="tel" placeholder="Your contact number" error={errors.phone} onChange={() => clearFieldError('phone')} />
                      <Field name="email" label="Email ID" icon={HiOutlineMail} type="email" placeholder="you@example.com" error={errors.email} onChange={() => clearFieldError('email')} />
                      <div className="sm:col-span-2">
                        <Field name="feedback" label="Your Feedback" icon={HiOutlineChatAlt2} placeholder="Share your experience with us" textarea error={errors.feedback} onChange={() => clearFieldError('feedback')} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'dealership' && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Name" icon={HiOutlineUser} placeholder="Your full name" error={errors.name} onChange={() => clearFieldError('name')} />
                      <Field name="email" label="Email Address" icon={HiOutlineMail} type="email" placeholder="you@example.com" error={errors.email} onChange={() => clearFieldError('email')} />
                      <Field name="phone" label="Contact Number" icon={HiOutlinePhone} type="tel" placeholder="Your contact number" error={errors.phone} onChange={() => clearFieldError('phone')} />
                      <Field name="licenseNumber" label="License Number" icon={HiOutlineDocumentText} placeholder="Business license number" error={errors.licenseNumber} onChange={() => clearFieldError('licenseNumber')} />
                      <Field name="gstNumber" label="GST Number" icon={HiOutlineDocumentText} placeholder="GST registration number" error={errors.gstNumber} onChange={() => clearFieldError('gstNumber')} />
                      <Field name="licenseValidity" label="License Validity" icon={HiOutlineDocumentText} type="date" placeholder="License expiry date" error={errors.licenseValidity} onChange={() => clearFieldError('licenseValidity')} />
                      <div className="sm:col-span-2">
                        <Field name="dealerAddress" label="Dealer Address" icon={HiOutlineLocationMarker} placeholder="Business address" textarea error={errors.dealerAddress} onChange={() => clearFieldError('dealerAddress')} />
                      </div>
                      <fieldset className="sm:col-span-2">
                        <legend className="mb-2 text-sm font-semibold text-maroon-darker/80">License Type</legend>
                        <div className="flex flex-wrap gap-3">
                          {['Permanent', 'Temporary'].map((licenseType) => (
                            <label key={licenseType} className="flex cursor-pointer items-center gap-2 rounded-full border border-gold/20 bg-cream/60 px-4 py-2 text-sm font-semibold text-maroon-darker/75 transition-colors hover:bg-gold-light/25">
                              <input type="radio" name="licenseType" value={licenseType.toLowerCase()} defaultChecked={licenseType === 'Permanent'} onChange={() => clearFieldError('licenseType')} />
                              {licenseType}
                            </label>
                          ))}
                        </div>
                        {errors.licenseType && <span className="mt-1.5 block text-xs font-semibold text-red-600">{errors.licenseType}</span>}
                      </fieldset>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <SubmitButton label={activeForm.label} />
                    {submittedTab === activeTab && (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-semibold text-emerald-700"
                      >
                        Thank you! We&apos;ll be in touch soon.
                      </motion.p>
                    )}
                  </div>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-maroon-darker py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-red-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
              <HiOutlineLocationMarker size={18} /> Our Locations
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
              Visit Our Office &amp; Factory
            </h2>
            <p className="mt-4 text-sm leading-7 text-cream/75 sm:text-base">
              Find Sri Bala Krishna Fireworks easily using the maps below. Choose a location for turn-by-turn Google Maps navigation.
            </p>
          </motion.div>

          <div className="grid gap-7 lg:grid-cols-2">
            {locations.map((location, index) => (
              <motion.article
                key={location.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -7 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 170, damping: 19, delay: index * 0.1 }}
                className="overflow-hidden rounded-3xl border border-gold/25 bg-white shadow-2xl"
              >
                <div className="bg-cream p-1.5">
                  <iframe
                    title={`Sri Bala Krishna Fireworks ${location.title} location`}
                    src={location.mapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-[300px] w-full rounded-[1.25rem] border-0 sm:h-[340px]"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-maroon">
                    <HiOutlineLocationMarker size={17} /> {location.label}
                  </span>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient text-maroon-darker shadow-gold-glow">
                      <HiOutlineOfficeBuilding size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-maroon-darker">{location.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-maroon-darker/65">{location.address}</p>
                    </div>
                  </div>
                  <motion.a
                    href={location.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-maroon-gradient px-5 py-2.5 text-sm font-bold text-cream shadow-premium"
                  >
                    Get Directions <HiOutlineExternalLink size={18} />
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
