import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineDownload,
  HiOutlineLockClosed,
  HiOutlinePhotograph,
  HiOutlineRefresh,
  HiOutlineSave,
  HiOutlineSearch,
  HiOutlineUpload,
} from 'react-icons/hi'
import { useProductData } from '../context/ProductDataContext'

const PIN_KEY = 'sbk-admin-pin-hash-v1'
const SESSION_KEY = 'sbk-admin-session-v1'

async function hashPin(pin) {
  const bytes = new TextEncoder().encode(pin)
  const digest = await window.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

const emptyForm = {
  description: '',
  packageSize: '',
  effect: '',
  duration: '',
  availability: '',
  safetyNote: '',
  imageUrl: '',
}

export default function OwnerAdmin() {
  const { products, overrides, getProductDetails, updateProduct, resetProduct, replaceOverrides, resetAllProducts } = useProductData()
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'active')
  const [hasPin, setHasPin] = useState(() => Boolean(localStorage.getItem(PIN_KEY)))
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [authError, setAuthError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedName, setSelectedName] = useState(products[0]?.name || '')
  const [form, setForm] = useState(emptyForm)
  const [notice, setNotice] = useState('')
  const importInputRef = useRef(null)

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return query
      ? products.filter((product) => `${product.name} ${product.category} ${product.section}`.toLowerCase().includes(query))
      : products
  }, [products, searchTerm])

  useEffect(() => {
    if (!selectedName) return
    const details = getProductDetails(selectedName)
    setForm({
      description: details.description,
      packageSize: details.packageSize,
      effect: details.effect,
      duration: details.duration,
      availability: details.availability,
      safetyNote: details.safetyNote,
      imageUrl: overrides[selectedName]?.imageUrl || '',
    })
    setNotice('')
  }, [selectedName, overrides, getProductDetails])

  const submitAccess = async (event) => {
    event.preventDefault()
    setAuthError('')
    if (!/^\d{4,8}$/.test(pin)) {
      setAuthError('Use a 4 to 8 digit owner PIN.')
      return
    }

    const pinHash = await hashPin(pin)
    if (!hasPin) {
      if (pin !== confirmPin) {
        setAuthError('PIN confirmation does not match.')
        return
      }
      localStorage.setItem(PIN_KEY, pinHash)
      setHasPin(true)
    } else if (pinHash !== localStorage.getItem(PIN_KEY)) {
      setAuthError('Incorrect owner PIN.')
      return
    }

    sessionStorage.setItem(SESSION_KEY, 'active')
    setIsAuthenticated(true)
    setPin('')
    setConfirmPin('')
  }

  const saveProduct = (event) => {
    event.preventDefault()
    updateProduct(selectedName, form)
    setNotice('Product details saved on this browser.')
  }

  const uploadProductImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const maxSize = 1200
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        setForm((current) => ({ ...current, imageUrl: canvas.toDataURL('image/jpeg', 0.82) }))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(overrides, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sbk-product-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importBackup = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        replaceOverrides(JSON.parse(reader.result))
        setNotice('Product backup restored successfully.')
      } catch {
        setNotice('Unable to read this backup file.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-cream to-orange-50 px-4 pb-16 pt-[140px] sm:pt-[180px]">
        <motion.form
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submitAccess}
          className="mx-auto max-w-md rounded-3xl border border-gold/25 bg-white p-7 shadow-premium sm:p-9"
        >
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-maroon-gradient text-gold-light shadow-premium">
            <HiOutlineLockClosed size={26} />
          </span>
          <h1 className="mt-5 text-center font-display text-3xl font-bold text-maroon-darker">Owner Product Manager</h1>
          <p className="mt-3 text-center text-sm leading-6 text-maroon-darker/65">
            {hasPin ? 'Enter your owner PIN to manage product content.' : 'Create a private PIN for this owner device.'}
          </p>
          <label className="mt-6 block text-sm font-semibold text-maroon-darker">
            Owner PIN
            <input type="password" inputMode="numeric" value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, '').slice(0, 8))} className="mt-2 w-full rounded-xl border border-gold/30 bg-cream/60 px-4 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-gold focus:ring-4 focus:ring-gold-light/25" autoFocus />
          </label>
          {!hasPin && (
            <label className="mt-4 block text-sm font-semibold text-maroon-darker">
              Confirm PIN
              <input type="password" inputMode="numeric" value={confirmPin} onChange={(event) => setConfirmPin(event.target.value.replace(/\D/g, '').slice(0, 8))} className="mt-2 w-full rounded-xl border border-gold/30 bg-cream/60 px-4 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-gold focus:ring-4 focus:ring-gold-light/25" />
            </label>
          )}
          {authError && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{authError}</p>}
          <button className="mt-6 w-full rounded-full bg-maroon-gradient px-5 py-3 font-bold text-cream shadow-premium">{hasPin ? 'Unlock Manager' : 'Create PIN & Continue'}</button>
          <Link to="/" className="mt-4 block text-center text-sm font-semibold text-maroon hover:text-gold-dark">Return to website</Link>
        </motion.form>
      </main>
    )
  }

  const selectedProduct = getProductDetails(selectedName)

  return (
    <main className="min-h-screen bg-cream pb-16 pt-[128px] sm:pt-[168px]">
      <section className="bg-maroon-gradient py-10 text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Owner Tools</span>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Product Content Manager</h1>
            <p className="mt-2 max-w-2xl text-sm text-cream/70">Changes are stored on this browser. Export a backup after important updates.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportBackup} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15"><HiOutlineDownload /> Export Backup</button>
            <button onClick={() => importInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15"><HiOutlineUpload /> Restore Backup</button>
            <input ref={importInputRef} type="file" accept="application/json" onChange={importBackup} className="hidden" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-2xl border border-gold/20 bg-white p-5 shadow-glass lg:sticky lg:top-[140px]">
          <label className="relative block">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-maroon" />
            <input type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products..." className="w-full rounded-xl border border-gold/25 bg-cream/60 py-3 pl-10 pr-3 text-sm outline-none focus:border-gold" />
          </label>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-maroon/65">{filteredProducts.length} Products</p>
          <div className="mt-3 max-h-[62vh] space-y-1 overflow-y-auto pr-1">
            {filteredProducts.map((product) => (
              <button key={product.name} type="button" onClick={() => setSelectedName(product.name)} className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${selectedName === product.name ? 'bg-gold-light/45 font-bold text-maroon' : 'text-maroon-darker/70 hover:bg-gold-light/20'}`}>
                <span className="block">{product.name}</span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-wider opacity-60">{product.category}</span>
              </button>
            ))}
          </div>
        </aside>

        <form onSubmit={saveProduct} className="rounded-2xl border border-gold/20 bg-white p-5 shadow-premium sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gold/15 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-maroon">{selectedProduct.category} · {selectedProduct.section}</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-maroon-darker">{selectedName}</h2>
            </div>
            <Link to="/products" className="rounded-full border border-gold/30 px-4 py-2 text-sm font-bold text-maroon hover:bg-gold-light/25">View Products Page</Link>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
            <div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gold/20 bg-cream p-4">
                {selectedProduct.image ? <img src={form.imageUrl || selectedProduct.image} alt={selectedName} className="h-full w-full object-contain" /> : <HiOutlinePhotograph size={54} className="text-maroon/30" />}
              </div>
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gold/40 bg-gold-light/15 px-4 py-3 text-sm font-bold text-maroon hover:bg-gold-light/30">
                <HiOutlineUpload /> Upload Product Image
                <input type="file" accept="image/*" onChange={uploadProductImage} className="hidden" />
              </label>
              <p className="mt-2 text-xs leading-5 text-maroon-darker/50">Images are optimized before browser storage.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2 text-sm font-semibold text-maroon-darker">
                Product Description
                <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} className="mt-2 w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none focus:border-gold" />
              </label>
              {[
                ['packageSize', 'Package / Pieces'],
                ['effect', 'Main Effect'],
                ['duration', 'Duration'],
                ['availability', 'Availability'],
              ].map(([name, label]) => (
                <label key={name} className="text-sm font-semibold text-maroon-darker">
                  {label}
                  <input value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none focus:border-gold" />
                </label>
              ))}
              <label className="sm:col-span-2 text-sm font-semibold text-maroon-darker">
                Safety Note
                <textarea value={form.safetyNote} onChange={(event) => setForm({ ...form, safetyNote: event.target.value })} rows={3} className="mt-2 w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none focus:border-gold" />
              </label>
            </div>
          </div>

          {notice && <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}
          <div className="mt-6 flex flex-wrap gap-3 border-t border-gold/15 pt-5">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-maroon-gradient px-6 py-3 text-sm font-bold text-cream shadow-premium"><HiOutlineSave /> Save Product</button>
            <button type="button" onClick={() => { resetProduct(selectedName); setNotice('Product restored to default content.') }} className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-3 text-sm font-bold text-maroon hover:bg-gold-light/20"><HiOutlineRefresh /> Reset Product</button>
            <button type="button" onClick={() => { if (window.confirm('Reset every product update saved on this browser?')) resetAllProducts() }} className="ml-auto text-sm font-semibold text-red-600 hover:text-red-700">Reset all updates</button>
          </div>
        </form>
      </section>
    </main>
  )
}
