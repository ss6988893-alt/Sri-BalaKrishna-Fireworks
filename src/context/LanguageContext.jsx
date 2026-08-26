import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.safety': 'Safety Tips',
    'nav.events': 'Event Display',
    'nav.contact': 'Contact Info',
    'nav.shop': 'Shop Details',
    'common.contact': 'Contact Us',
    'common.call': 'Call Now',
    'common.whatsapp': 'WhatsApp',
    'common.top': 'Top',
    'common.backToTop': 'Back to top',
    'common.whoosh': 'Whoosh!',
    'common.directions': 'Get Directions',
    'common.viewDetails': 'View details',
    'common.addEnquiry': 'Add to Enquiry',
    'common.added': 'Added',
    'common.downloadCatalogue': 'Download Catalogue',
    'common.quotation': 'My Quotation',
    'common.bookNow': 'Book Display',
    'common.english': 'English',
    'common.tamil': 'தமிழ்',
    'common.hindi': 'हिंदी',
    'products.badge': 'Premium Fireworks Collection',
    'products.title': 'Our Products',
    'products.subtitle': 'Choose a category, explore products, and create your enquiry quotation.',
    'products.categories': 'Categories',
    'products.selected': 'Selected Category',
    'products.search': 'Search products by name...',
    'products.results': 'Search Results',
    'products.count': 'products',
    'events.services': 'Fireworks Display Services',
    'events.title': 'We Light Up Every Celebration',
    'events.subtitle': 'Professionally coordinated fireworks displays for memorable celebrations.',
    'contact.badge': 'We Would Love To Hear From You',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Send an enquiry, share your feedback, or connect with our team.',
    'footer.quick': 'Quick Links',
    'footer.support': 'Safety & Support',
    'footer.tagline': 'Lighting the sky for decades with quality, safety and happiness.',
    'footer.owner': 'Owner Login',
    'top.factory': 'Direct From Sivakasi Factory',
    'top.safe': '100% Safe & Tested',
    'top.quality': 'Premium Quality',
    'top.bulk': 'Bulk & Wholesale Orders Available',
    'top.follow': 'Follow Us:',
    'home.products': 'Our Products',
    'home.categories': 'Our Product Categories',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.products': 'தயாரிப்புகள்',
    'nav.safety': 'பாதுகாப்பு குறிப்புகள்',
    'nav.events': 'வாணவேடிக்கை நிகழ்ச்சி',
    'nav.contact': 'தொடர்பு',
    'nav.shop': 'விற்பனை விவரங்கள்',
    'common.contact': 'தொடர்பு கொள்ள',
    'common.call': 'அழைக்கவும்',
    'common.whatsapp': 'வாட்ஸ்அப்',
    'common.top': 'மேலே',
    'common.backToTop': 'மேலே செல்லவும்',
    'common.whoosh': 'சூப்பர் பறப்பு!',
    'common.directions': 'வழிகாட்டல் பெற',
    'common.viewDetails': 'விவரங்களை பார்க்க',
    'common.addEnquiry': 'விசாரணையில் சேர்க்க',
    'common.added': 'சேர்க்கப்பட்டது',
    'common.downloadCatalogue': 'பட்டியலை பதிவிறக்க',
    'common.quotation': 'என் விலைப்பட்டியல்',
    'common.bookNow': 'நிகழ்ச்சி பதிவு',
    'common.english': 'English',
    'common.tamil': 'தமிழ்',
    'common.hindi': 'हिंदी',
    'products.badge': 'தரமான பட்டாசு தொகுப்பு',
    'products.title': 'எங்கள் தயாரிப்புகள்',
    'products.subtitle': 'வகையைத் தேர்ந்தெடுத்து தயாரிப்புகளை பார்த்து விசாரணை பட்டியலை உருவாக்குங்கள்.',
    'products.categories': 'வகைகள்',
    'products.selected': 'தேர்ந்தெடுத்த வகை',
    'products.search': 'தயாரிப்பு பெயரை தேடுங்கள்...',
    'products.results': 'தேடல் முடிவுகள்',
    'products.count': 'தயாரிப்புகள்',
    'events.services': 'வாணவேடிக்கை நிகழ்ச்சி சேவைகள்',
    'events.title': 'ஒவ்வொரு கொண்டாட்டத்தையும் ஒளிரச் செய்கிறோம்',
    'events.subtitle': 'மறக்க முடியாத கொண்டாட்டங்களுக்கான தொழில்முறை வாணவேடிக்கை நிகழ்ச்சிகள்.',
    'contact.badge': 'உங்களிடமிருந்து கேட்க விரும்புகிறோம்',
    'contact.title': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'contact.subtitle': 'விசாரணை அனுப்பவும், கருத்து பகிரவும் அல்லது எங்கள் குழுவை தொடர்பு கொள்ளவும்.',
    'footer.quick': 'விரைவு இணைப்புகள்',
    'footer.support': 'பாதுகாப்பு மற்றும் உதவி',
    'footer.tagline': 'தரம், பாதுகாப்பு மற்றும் மகிழ்ச்சியுடன் பல ஆண்டுகளாக வானத்தை ஒளிரச் செய்கிறோம்.',
    'footer.owner': 'உரிமையாளர் உள்நுழைவு',
    'top.factory': 'சிவகாசி தொழிற்சாலையிலிருந்து நேரடியாக',
    'top.safe': '100% பாதுகாப்பாக சோதிக்கப்பட்டது',
    'top.quality': 'உயர்தர தயாரிப்புகள்',
    'top.bulk': 'மொத்த மற்றும் பெரிய ஆர்டர்கள் கிடைக்கும்',
    'top.follow': 'எங்களை பின்தொடருங்கள்:',
    'home.products': 'எங்கள் தயாரிப்புகள்',
    'home.categories': 'தயாரிப்பு வகைகள்',
  },
  hi: {
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.products': 'उत्पाद',
    'nav.safety': 'सुरक्षा सुझाव',
    'nav.events': 'आतिशबाज़ी प्रदर्शन',
    'nav.contact': 'संपर्क',
    'nav.shop': 'दुकान विवरण',
    'common.contact': 'संपर्क करें',
    'common.call': 'अभी कॉल करें',
    'common.whatsapp': 'व्हाट्सऐप',
    'common.top': 'ऊपर',
    'common.backToTop': 'ऊपर जाएँ',
    'common.whoosh': 'उड़ चलें!',
    'common.directions': 'दिशा-निर्देश पाएँ',
    'common.viewDetails': 'विवरण देखें',
    'common.addEnquiry': 'पूछताछ में जोड़ें',
    'common.added': 'जोड़ा गया',
    'common.downloadCatalogue': 'कैटलॉग डाउनलोड करें',
    'common.quotation': 'मेरा कोटेशन',
    'common.bookNow': 'डिस्प्ले बुक करें',
    'common.english': 'English',
    'common.tamil': 'தமிழ்',
    'common.hindi': 'हिंदी',
    'products.badge': 'प्रीमियम आतिशबाज़ी संग्रह',
    'products.title': 'हमारे उत्पाद',
    'products.subtitle': 'श्रेणी चुनें, उत्पाद देखें और अपना पूछताछ कोटेशन तैयार करें।',
    'products.categories': 'श्रेणियाँ',
    'products.selected': 'चुनी गई श्रेणी',
    'products.search': 'उत्पाद का नाम खोजें...',
    'products.results': 'खोज परिणाम',
    'products.count': 'उत्पाद',
    'events.services': 'आतिशबाज़ी प्रदर्शन सेवाएँ',
    'events.title': 'हम हर उत्सव को रोशन करते हैं',
    'events.subtitle': 'यादगार समारोहों के लिए पेशेवर रूप से समन्वित आतिशबाज़ी प्रदर्शन।',
    'contact.badge': 'हमें आपसे बात करके खुशी होगी',
    'contact.title': 'संपर्क करें',
    'contact.subtitle': 'पूछताछ भेजें, प्रतिक्रिया साझा करें या हमारी टीम से जुड़ें।',
    'footer.quick': 'त्वरित लिंक',
    'footer.support': 'सुरक्षा और सहायता',
    'footer.tagline': 'गुणवत्ता, सुरक्षा और खुशियों के साथ दशकों से आसमान रोशन कर रहे हैं।',
    'footer.owner': 'मालिक लॉगिन',
    'top.factory': 'सीधे शिवकाशी फैक्टरी से',
    'top.safe': '100% सुरक्षित और जाँचा हुआ',
    'top.quality': 'प्रीमियम गुणवत्ता',
    'top.bulk': 'थोक और बड़े ऑर्डर उपलब्ध',
    'top.follow': 'हमें फ़ॉलो करें:',
    'home.products': 'हमारे उत्पाद',
    'home.categories': 'हमारी उत्पाद श्रेणियाँ',
  },
}

const supportedLanguages = ['en', 'ta', 'hi']

const getDocumentLanguage = (language) => (supportedLanguages.includes(language) ? language : 'en')

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => getDocumentLanguage(localStorage.getItem('sbk-language')))

  useEffect(() => {
    document.documentElement.lang = getDocumentLanguage(language)
  }, [language])

  const setLanguage = (nextLanguage) => {
    const resolvedLanguage = getDocumentLanguage(nextLanguage)
    setLanguageState(resolvedLanguage)
    localStorage.setItem('sbk-language', resolvedLanguage)
    document.documentElement.lang = resolvedLanguage
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(supportedLanguages[(supportedLanguages.indexOf(language) + 1) % supportedLanguages.length]),
      t: (key, fallback) => translations[language]?.[key] || translations.en[key] || fallback || key,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
