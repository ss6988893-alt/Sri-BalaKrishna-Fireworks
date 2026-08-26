import { createContext, useContext, useMemo, useState } from 'react'
import { productCatalogue } from '../data/productCatalogue'
import { getProductImage } from '../data/productImages'

const STORAGE_KEY = 'sbk-product-overrides-v1'
const ProductDataContext = createContext(null)

const catalogueProducts = Array.from(
  new Map(
    productCatalogue.flatMap((category) =>
      category.sections.flatMap((section) =>
        section.products.map((name) => [
          name,
          {
            name,
            category: category.name,
            section: section.title,
            image: getProductImage(name) || '',
          },
        ]),
      ),
    ),
  ).values(),
)

const defaultDetails = {
  description: 'Premium Sri Bala Krishna Fireworks product crafted for bright and memorable celebrations.',
  packageSize: 'Details coming soon',
  effect: 'Premium fireworks effect',
  duration: 'Varies by product',
  availability: 'Enquire for availability',
  safetyNote: 'Use outdoors only and follow all printed safety instructions.',
  imageUrl: '',
}

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function ProductDataProvider({ children }) {
  const [overrides, setOverrides] = useState(readOverrides)

  const persist = (nextOverrides) => {
    setOverrides(nextOverrides)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOverrides))
  }

  const value = useMemo(() => {
    const getProductDetails = (name) => {
      const baseProduct = catalogueProducts.find((product) => product.name === name) || { name, category: '', section: '', image: '' }
      const custom = overrides[name] || {}
      return {
        ...defaultDetails,
        ...baseProduct,
        ...custom,
        image: custom.imageUrl || baseProduct.image,
      }
    }

    return {
      products: catalogueProducts,
      overrides,
      getProductDetails,
      updateProduct: (name, updates) => persist({ ...overrides, [name]: { ...(overrides[name] || {}), ...updates } }),
      resetProduct: (name) => {
        const nextOverrides = { ...overrides }
        delete nextOverrides[name]
        persist(nextOverrides)
      },
      replaceOverrides: (nextOverrides) => persist(nextOverrides && typeof nextOverrides === 'object' ? nextOverrides : {}),
      resetAllProducts: () => persist({}),
    }
  }, [overrides])

  return <ProductDataContext.Provider value={value}>{children}</ProductDataContext.Provider>
}

export function useProductData() {
  const context = useContext(ProductDataContext)
  if (!context) throw new Error('useProductData must be used inside ProductDataProvider')
  return context
}
