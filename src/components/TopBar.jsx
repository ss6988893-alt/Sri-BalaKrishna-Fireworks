import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiOutlineTruck, HiOutlineBadgeCheck, HiOutlineSparkles, HiOutlineBriefcase } from 'react-icons/hi'
import { useLanguage } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const items = [
  { icon: HiOutlineTruck, key: 'top.factory' },
  { icon: HiOutlineBadgeCheck, key: 'top.safe' },
  { icon: HiOutlineSparkles, key: 'top.quality' },
  { icon: HiOutlineBriefcase, key: 'top.bulk' },
]

export default function TopBar() {
  const { t } = useLanguage()
  return (
    <div className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-maroon-gradient text-cream/90 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {items.map(({ icon: Icon, key }) => (
            <span key={key} className="flex items-center gap-1.5 whitespace-nowrap">
              <Icon size={13} className="text-gold-light" />
              {t(key)}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher topbar />
          <span className="hidden text-cream/70 xl:inline">{t('top.follow')}</span>
          <a href="#" aria-label="Facebook" className="hover:text-gold-light transition-colors"><FaFacebookF size={12} /></a>
          <a
            href="https://www.instagram.com/sribalakrishnafireworks?igsh=MW1mdDI4cjdnZzBrMg=="
            target="_blank"
            rel="noreferrer"
            aria-label="Sri Bala Krishna Fireworks on Instagram"
            className="hover:text-gold-light transition-colors"
          >
            <FaInstagram size={12} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-gold-light transition-colors"><FaYoutube size={12} /></a>
        </div>
      </div>
    </div>
  )
}
