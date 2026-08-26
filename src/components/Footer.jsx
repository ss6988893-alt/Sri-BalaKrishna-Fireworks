import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import brandLogo from '../assets/logo/sri-bala-krishna-combined-cropped.png'
import { useLanguage } from '../context/LanguageContext'

const quickLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.safety', to: '/safety-tips' },
  { key: 'nav.contact', to: '/contact' },
  { key: 'nav.shop', to: '/shop' },
]
const safetyLinks = [
  { en: 'Safety Guidelines', ta: 'பாதுகாப்பு வழிகாட்டிகள்', hi: 'सुरक्षा दिशानिर्देश' },
  { en: 'Safe Usage Tips', ta: 'பாதுகாப்பான பயன்பாடு', hi: 'सुरक्षित उपयोग सुझाव' },
  { en: 'Storage Instructions', ta: 'சேமிப்பு வழிமுறைகள்', hi: 'भंडारण निर्देश' },
  { en: "Do's & Don'ts", ta: 'செய்ய வேண்டியவை / கூடாதவை', hi: 'क्या करें / क्या न करें' },
  { en: 'FAQs', ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', hi: 'सामान्य प्रश्न' },
  { en: 'Bulk Orders', ta: 'மொத்த ஆர்டர்கள்', hi: 'थोक ऑर्डर' },
  { en: 'Terms & Conditions', ta: 'விதிமுறைகள்', hi: 'नियम और शर्तें' },
]

const socials = [
  { icon: FaFacebookF, label: 'Facebook' },
  {
    icon: FaInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/sribalakrishnafireworks?igsh=MW1mdDI4cjdnZzBrMg==',
  },
  { icon: FaYoutube, label: 'YouTube' },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: 'https://wa.me/919894727599?text=Hello%20Sri%20Bala%20Krishna%20Fireworks%2C%20I%20would%20like%20to%20know%20more.',
  },
]

export default function Footer() {
  const { language, t } = useLanguage()
  return (
    <footer className="bg-maroon-darker text-cream/80 pt-14 pb-6 border-t border-gold/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <img src={brandLogo} alt="Sri Bala Krishna Fireworks" className="h-20 w-24 object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-5">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href = '#' }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-gold/20 text-gold-light hover:bg-gold hover:text-maroon-darker transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-cream text-sm font-semibold tracking-widest uppercase mb-4">{t('footer.quick')}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-gold-light transition-colors">{t(l.key)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-cream text-sm font-semibold tracking-widest uppercase mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm">
              {safetyLinks.map((l) => (
                <li key={l.en}><Link to="/safety-tips" className="hover:text-gold-light transition-colors">{l[language] || l.en}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 py-6 border-y border-white/10 text-sm">
          <div className="flex items-start gap-3">
            <HiOutlineLocationMarker className="text-gold-light text-lg shrink-0 mt-0.5" />
            <span>308, Chairman P.K.S.A Arumugam Road, Sivakasi - 626 189, (TN)</span>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlinePhone className="text-gold-light text-lg shrink-0" />
            <a href="tel:+919894727599" className="transition-colors hover:text-gold-light">
              +91 98947 27599
            </a>
          </div>
          <div className="flex items-center gap-3">
            <HiOutlineMail className="text-gold-light text-lg shrink-0" />
            <span>info@sribalakrishna.com</span>
          </div>
        </div>

        <p className="text-center text-xs text-cream/50 pt-5">
          © 2025 Sri Balakrishna Fireworks. All Rights Reserved. Made with ❤️ in Sivakasi.
        </p>
        <Link to="/admin" className="mx-auto mt-3 block w-fit text-[10px] uppercase tracking-[0.18em] text-cream/25 transition-colors hover:text-gold-light">
          {t('footer.owner')}
        </Link>
      </div>
    </footer>
  )
}
