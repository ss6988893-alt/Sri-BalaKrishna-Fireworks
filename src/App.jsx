import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import InteractiveEffects from './components/InteractiveEffects'
import FloatingActions from './components/FloatingActions'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Events = lazy(() => import('./pages/Events'))
const Products = lazy(() => import('./pages/Products'))
const SafetyTips = lazy(() => import('./pages/SafetyTips'))
const Contact = lazy(() => import('./pages/Contact'))
const Shop = lazy(() => import('./pages/Shop'))
const OwnerAdmin = lazy(() => import('./pages/OwnerAdmin'))
const Quotation = lazy(() => import('./pages/Quotation'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <Suspense fallback={<div className="grid min-h-[55vh] place-items-center bg-cream text-sm font-semibold text-maroon">Loading…</div>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/products" element={<Products />} />
                <Route path="/safety-tips" element={<SafetyTips />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/admin" element={<OwnerAdmin />} />
                <Route path="/quotation" element={<Quotation />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingActions />
      <InteractiveEffects />
    </div>
  )
}
