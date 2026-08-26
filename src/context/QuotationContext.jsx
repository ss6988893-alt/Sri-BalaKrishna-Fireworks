import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'sbk-quotation-items-v1'
const QuotationContext = createContext(null)

function readItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function QuotationProvider({ children }) {
  const [items, setItems] = useState(readItems)

  const persist = (nextItems) => {
    setItems(nextItems)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
  }

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      hasProduct: (name) => items.some((item) => item.name === name),
      addProduct: (product) => {
        const existing = items.find((item) => item.name === product.name)
        persist(
          existing
            ? items.map((item) => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
            : [...items, { ...product, quantity: 1 }],
        )
      },
      updateQuantity: (name, quantity) => {
        const nextQuantity = Math.max(1, Number(quantity) || 1)
        persist(items.map((item) => item.name === name ? { ...item, quantity: nextQuantity } : item))
      },
      removeProduct: (name) => persist(items.filter((item) => item.name !== name)),
      clearQuotation: () => persist([]),
    }),
    [items],
  )

  return <QuotationContext.Provider value={value}>{children}</QuotationContext.Provider>
}

export function useQuotation() {
  const context = useContext(QuotationContext)
  if (!context) throw new Error('useQuotation must be used inside QuotationProvider')
  return context
}
