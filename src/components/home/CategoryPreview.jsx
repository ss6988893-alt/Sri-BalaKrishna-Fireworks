import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { productCategoryPreview } from '../../data/homeData'
import { useLanguage } from '../../context/LanguageContext'

const tamilCategoryNames = {
  'Flower Pots': 'பூச்சட்டிகள்',
  Crackers: 'சரவெடிகள்',
  Rockets: 'ராக்கெட்டுகள்',
  Sparklers: 'கம்பி மத்தாப்புகள்',
  Bombs: 'வெடிகள்',
  'Fancy Shots': 'ஃபேன்சி ஷாட்ஸ்',
  'Gift Boxes': 'பரிசுப் பெட்டிகள்',
  Chakkars: 'சக்கரங்கள்',
  'Kids Collection': 'குழந்தைகள் தொகுப்பு',
  'Festival Combos': 'விழா காம்போ',
}

const hindiCategoryNames = {
  'Flower Pots': 'फ्लावर पॉट्स',
  Crackers: 'पटाखे',
  Rockets: 'रॉकेट',
  Sparklers: 'फुलझड़ियाँ',
  Bombs: 'बम',
  'Fancy Shots': 'फैंसी शॉट्स',
  'Gift Boxes': 'गिफ्ट बॉक्स',
  Chakkars: 'चक्कर',
  'Kids Collection': 'बच्चों का संग्रह',
  'Festival Combos': 'त्योहार कॉम्बो',
}

export default function CategoryPreview() {
  const { language, t } = useLanguage()
  return (
    <section className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-3 text-maroon">
            {t('home.products')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-maroon-darker">{t('home.categories')}</h2>
          <div className="w-20 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {productCategoryPreview.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (idx % 5) * 0.06 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-premium transition-all duration-300 hover:-translate-y-1.5 cursor-pointer border border-gold/10"
            >
              <Link to={`/products?category=${encodeURIComponent(category.name)}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <span className="absolute top-2.5 left-2.5 z-10 bg-maroon-gradient text-gold-light text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow">
                    {category.id}
                  </span>
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-darker/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="font-display font-semibold text-maroon-darker text-sm sm:text-base">
                    {language === 'ta'
                      ? tamilCategoryNames[category.name] || category.name
                      : language === 'hi'
                        ? hindiCategoryNames[category.name] || category.name
                        : category.name}
                  </h3>
                </div>
              </Link>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
