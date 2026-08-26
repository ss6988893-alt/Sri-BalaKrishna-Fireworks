import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useSearchParams } from 'react-router-dom'
import { HiOutlineClipboardList, HiOutlineDocumentDownload } from 'react-icons/hi'
import { productCatalogue } from '../data/productCatalogue'
import { useProductData } from '../context/ProductDataContext'
import { useQuotation } from '../context/QuotationContext'
import { useLanguage } from '../context/LanguageContext'

export default function Products() {
  const { getProductDetails } = useProductData()
  const { totalItems } = useQuotation()
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const requestedCategory = searchParams.get('category')
  const initialCategory = productCatalogue.some((category) => category.name === requestedCategory)
    ? requestedCategory
    : productCatalogue[0].name
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const productPanelRef = useRef(null)
  const selectedCatalogue = productCatalogue.find((category) => category.name === selectedCategory)
  const allProducts = productCatalogue.flatMap((category) =>
    category.sections.flatMap((section) =>
      section.products.map((name) => ({ name, section: section.title, category: category.name })),
    ),
  )
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const products = normalizedSearchTerm
    ? allProducts.filter((product) => product.name.toLowerCase().includes(normalizedSearchTerm))
    : selectedCatalogue.sections.flatMap((section) =>
        section.products.map((name) => ({ name, section: section.title, category: selectedCategory })),
      )
  const displayProducts = products.map((product) => ({ ...product, ...getProductDetails(product.name) }))

  const selectCategory = (categoryName) => {
    setSelectedCategory(categoryName)
    setSearchTerm('')
    window.requestAnimationFrame(() => {
      productPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  useEffect(() => {
    if (!selectedProduct) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProduct(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-cream">
      <section className="bg-gradient-to-br from-amber-50 via-cream to-orange-50 pb-10 pt-[128px] sm:pb-12 sm:pt-[168px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full bg-gold-light/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-maroon">
            {t('products.badge')}
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-maroon-darker sm:text-5xl">{t('products.title')}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-maroon-darker/70 sm:text-lg">
            {t('products.subtitle')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/catalogue/sri-bala-krishna-fireworks-catalogue.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white px-5 py-3 text-sm font-bold text-maroon shadow-sm transition hover:-translate-y-1 hover:bg-gold-light/20"
            >
              <HiOutlineDocumentDownload size={19} /> {t('common.downloadCatalogue')}
            </a>
            <Link
              to="/quotation"
              className="inline-flex items-center gap-2 rounded-full bg-maroon-gradient px-5 py-3 text-sm font-bold text-cream shadow-premium transition hover:-translate-y-1"
            >
              <HiOutlineClipboardList size={19} /> {t('common.quotation')} ({totalItems})
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="grid w-full gap-8 px-6 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-12">
          <aside className="lg:sticky lg:top-[136px] lg:h-fit">
            <div className="rounded-2xl border border-gold/15 bg-white p-5 shadow-glass sm:p-6">
              <h2 className="font-display text-2xl font-extrabold text-maroon-darker">{t('products.categories')}</h2>
              <nav aria-label="Product categories" className="mt-5 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                <ul className="space-y-1">
                  {productCatalogue.map((category, index) => {
                    const isSelected = category.name === selectedCategory

                    return (
                      <motion.li
                        key={category.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.3, delay: index * 0.045 }}
                      >
                        <button
                          type="button"
                          onClick={() => selectCategory(category.name)}
                          aria-current={isSelected ? 'page' : undefined}
                          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-all duration-200 sm:text-base ${
                            isSelected
                              ? 'bg-gold-light/45 text-maroon shadow-sm'
                              : 'text-maroon-darker/75 hover:bg-gold-light/20 hover:text-maroon'
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full transition-all duration-200 ${
                              isSelected ? 'scale-125 bg-maroon' : 'bg-gold/50 group-hover:bg-gold'
                            }`}
                          />
                          <span>{category.name}</span>
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <main ref={productPanelRef} className="min-w-0 scroll-mt-[150px] rounded-2xl border border-gold/15 bg-white p-5 shadow-glass sm:p-8">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">{t('products.selected')}</span>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-3xl font-extrabold text-maroon-darker sm:text-4xl">
                  {normalizedSearchTerm ? t('products.results') : selectedCategory}
                </h2>
                <span className="rounded-full bg-gold-light/35 px-3 py-1.5 text-xs font-bold text-maroon">
                  {products.length} {t('products.count')}
                </span>
              </div>
              <div className="mt-5 h-1 w-20 rounded-full bg-gold-gradient" />

              <label className="mt-7 block">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t('products.search')}
                  className="w-full rounded-xl border border-gold/25 bg-cream/60 px-4 py-3 text-sm font-medium text-maroon-darker outline-none transition-all placeholder:text-maroon-darker/40 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold-light/25"
                />
              </label>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {displayProducts.map((product, index) => (
                  <motion.article
                    key={`${product.section}-${product.name}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.35) }}
                    whileHover={{ y: -5 }}
                    className="group overflow-hidden rounded-xl border border-gold/15 bg-white shadow-sm transition-shadow duration-300 hover:shadow-premium"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center border-b border-dashed border-gold/25 bg-gradient-to-br from-cream via-amber-50/60 to-gold-light/10 p-5">
                      {product.image ? (
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="relative h-full w-full cursor-zoom-in overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
                          aria-label={`View details for ${product.name}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-maroon-darker/60 px-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                            <span className="rounded-full border border-gold/60 bg-maroon px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cream shadow-lg">
                              {t('common.viewDetails')}
                            </span>
                          </span>
                        </button>
                      ) : (
                        <span className="rounded-full border border-gold/25 bg-white/75 px-3 py-1.5 text-center text-xs font-semibold text-maroon-darker/45 transition-colors duration-300 group-hover:text-maroon-darker/70">
                          Product image space
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-maroon/65">
                        {normalizedSearchTerm ? `${product.category} · ${product.section}` : product.section}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-maroon-darker">{product.name}</h3>
                    </div>
                  </motion.article>
                ))}
              </div>

              {products.length === 0 && (
                <div className="mt-8 rounded-xl border border-dashed border-gold/35 bg-cream/70 px-6 py-12 text-center">
                  <p className="font-display text-xl font-bold text-maroon-darker">No matching products found</p>
                  <p className="mt-2 text-sm text-maroon-darker/65">Try a different product name or select a category.</p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-gold/45 bg-[linear-gradient(135deg,_#4b0713_0%,_#870d25_50%,_#4b0713_100%)] px-6 py-10 text-center shadow-2xl sm:px-10 sm:py-12"
        >
          <motion.span
            aria-hidden="true"
            className="absolute -left-16 -top-20 h-48 w-48 rounded-full border border-gold/30 bg-gold/10 blur-sm"
            animate={{ scale: [1, 1.22, 1], rotate: [0, 120, 240], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-24 -right-12 h-56 w-56 rounded-full border border-gold/30 bg-gold-light/10 blur-sm"
            animate={{ scale: [1.2, 0.95, 1.2], rotate: [240, 120, 0], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10">
            <motion.span
              className="inline-flex rounded-full border border-gold/45 bg-maroon-darker/45 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-light"
              animate={{ boxShadow: ['0 0 0 rgba(244,216,140,0)', '0 0 24px rgba(244,216,140,0.35)', '0 0 0 rgba(244,216,140,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              Complete Product Album
            </motion.span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold text-cream sm:text-4xl">
              Want details about all our products?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-cream/75 sm:text-base">
              Download the complete Krishna Product Album to explore every available fireworks collection in one place.
            </p>

            <motion.a
              href="/catalogue/krishna-product-albums.pdf"
              download
              whileHover={{ y: -5, scale: 1.045 }}
              whileTap={{ scale: 0.96 }}
              className="group relative mt-7 inline-flex min-w-[250px] items-center justify-center gap-3 overflow-hidden rounded-full border border-white/35 bg-gold-gradient px-7 py-4 text-sm font-extrabold uppercase tracking-[0.08em] text-maroon-darker shadow-[0_14px_36px_rgba(244,190,45,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-light/60"
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/55 blur-sm"
                animate={{ x: ['0%', '480%'] }}
                transition={{ duration: 2.3, repeat: Infinity, repeatDelay: 1.1, ease: 'easeInOut' }}
              />
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                className="relative grid h-9 w-9 place-items-center rounded-full bg-maroon text-xl text-gold-light shadow-md"
              >
                <HiOutlineDocumentDownload />
              </motion.span>
              <span className="relative">Download Product Album</span>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {createPortal(
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-maroon-darker/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onMouseDown={() => setSelectedProduct(null)}
          >
              <motion.div
                className="relative grid max-h-[calc(100vh-7rem)] w-full max-w-4xl overflow-y-auto rounded-[1.5rem] border border-gold/50 bg-white shadow-2xl md:grid-cols-[1.2fr_0.8fr] md:overflow-hidden"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-maroon/15 bg-cream/95 text-2xl leading-none text-maroon shadow-md transition hover:scale-110 hover:bg-maroon hover:text-cream focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/50"
                  aria-label="Close product details"
                >
                  ×
                </button>

                <div className="flex min-h-[340px] flex-col justify-between bg-[radial-gradient(circle_at_top,_rgba(245,195,66,0.38),_transparent_60%),linear-gradient(145deg,_#4b0b17,_#770c20)] p-5 sm:p-6">
                  <span className="w-fit rounded-full border border-gold/50 bg-maroon-darker/35 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-light">
                    Product preview
                  </span>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="mx-auto my-3 max-h-[45vh] w-full object-contain drop-shadow-2xl"
                  />
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-cream/75">
                    Tap outside or use the close button to return
                  </p>
                </div>

                <div className="flex flex-col justify-center bg-gradient-to-br from-white via-amber-50/80 to-white p-4 sm:p-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-maroon">
                    {selectedProduct.category} · {selectedProduct.section}
                  </p>
                  <h2 id="product-modal-title" className="mt-2 font-display text-2xl text-maroon-darker sm:text-3xl">
                    {selectedProduct.name}
                  </h2>
                  <div className="my-3 h-1 w-14 rounded-full bg-gold" />
                  <p className="leading-6 text-maroon-darker/85">{selectedProduct.description}</p>

                  <div className="mt-4 border-t border-gold/20 pt-3">
                    <h3 className="font-display text-lg text-maroon">Product information</h3>
                    <ul className="mt-2 space-y-1.5 text-sm leading-5 text-maroon-darker/85">
                      <li><strong>Duration:</strong> {selectedProduct.duration}</li>
                      <li><strong>Availability:</strong> {selectedProduct.availability}</li>
                      <li>{selectedProduct.safetyNote}</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="rounded-full border border-gold/35 px-5 py-2.5 text-sm font-bold text-maroon transition hover:bg-gold-light/20"
                    >
                      Close details
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
