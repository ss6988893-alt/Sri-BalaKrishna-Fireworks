import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineDocumentDownload, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi'
import { useQuotation } from '../context/QuotationContext'

const catalogueUrl = '/catalogue/sri-bala-krishna-fireworks-catalogue.pdf'

export default function Quotation() {
  const { items, totalItems, updateQuantity, removeProduct, clearQuotation } = useQuotation()
  const [customer, setCustomer] = useState({ name: '', phone: '', location: '', notes: '' })
  const [error, setError] = useState('')

  const validateCustomer = () => {
    if (!items.length) return 'Add at least one product to your quotation.'
    if (customer.name.trim().length < 2) return 'Please enter your name.'
    if (!/^\d{10,15}$/.test(customer.phone.replace(/\D/g, ''))) return 'Please enter a valid phone number.'
    if (customer.location.trim().length < 3) return 'Please enter your city or location.'
    return ''
  }

  const downloadQuotation = async () => {
    const validationError = validateCustomer()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')

    const { jsPDF } = await import('jspdf')
    const document = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageWidth = document.internal.pageSize.getWidth()
    const pageHeight = document.internal.pageSize.getHeight()
    let y = 20

    const addHeader = () => {
      document.setFillColor(122, 12, 30)
      document.rect(0, 0, pageWidth, 34, 'F')
      document.setTextColor(244, 216, 140)
      document.setFont('helvetica', 'bold')
      document.setFontSize(19)
      document.text('SRI BALA KRISHNA FIREWORKS', 15, 16)
      document.setTextColor(255, 255, 255)
      document.setFontSize(10)
      document.text('Product Enquiry Quotation', 15, 24)
      document.text('+91 98947 27599 | Sivakasi', pageWidth - 15, 24, { align: 'right' })
      y = 44
    }

    addHeader()
    document.setTextColor(44, 5, 9)
    document.setFontSize(11)
    document.setFont('helvetica', 'bold')
    document.text(`Customer: ${customer.name}`, 15, y)
    document.text(`Phone: ${customer.phone}`, 15, y + 7)
    document.text(`Location: ${customer.location}`, 15, y + 14)
    document.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 15, y, { align: 'right' })
    y += 26

    document.setFillColor(244, 216, 140)
    document.roundedRect(15, y, pageWidth - 30, 10, 2, 2, 'F')
    document.setFontSize(10)
    document.text('No.', 19, y + 6.5)
    document.text('Product', 33, y + 6.5)
    document.text('Category', 128, y + 6.5)
    document.text('Qty', pageWidth - 23, y + 6.5, { align: 'center' })
    y += 15

    items.forEach((item, index) => {
      const productLines = document.splitTextToSize(item.name, 87)
      const rowHeight = Math.max(11, productLines.length * 5 + 4)
      if (y + rowHeight > pageHeight - 24) {
        document.addPage()
        addHeader()
      }
      document.setDrawColor(230, 215, 185)
      document.line(15, y + rowHeight, pageWidth - 15, y + rowHeight)
      document.setFont('helvetica', 'normal')
      document.text(String(index + 1), 20, y + 5)
      document.text(productLines, 33, y + 5)
      document.text(document.splitTextToSize(item.category || '-', 45), 128, y + 5)
      document.text(String(item.quantity), pageWidth - 23, y + 5, { align: 'center' })
      y += rowHeight
    })

    if (customer.notes.trim()) {
      y += 8
      document.setFont('helvetica', 'bold')
      document.text('Customer Notes', 15, y)
      document.setFont('helvetica', 'normal')
      document.text(document.splitTextToSize(customer.notes, pageWidth - 30), 15, y + 6)
      y += 20
    }

    if (y > pageHeight - 35) {
      document.addPage()
      y = 30
    }
    document.setFillColor(251, 247, 238)
    document.roundedRect(15, y + 8, pageWidth - 30, 24, 2, 2, 'F')
    document.setTextColor(122, 12, 30)
    document.setFont('helvetica', 'bold')
    document.text('Important', 20, y + 16)
    document.setFont('helvetica', 'normal')
    document.setTextColor(70, 60, 55)
    document.text(document.splitTextToSize('This is a product enquiry list. Final price, taxes, availability, delivery and permitted sale conditions will be confirmed by Sri Bala Krishna Fireworks.', pageWidth - 40), 20, y + 22)

    document.save(`SBK-quotation-${customer.name.trim().replace(/\s+/g, '-').toLowerCase()}.pdf`)
  }

  const sendWhatsApp = () => {
    const validationError = validateCustomer()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    const productLines = items.map((item, index) => `${index + 1}. ${item.name} - Qty: ${item.quantity}`).join('\n')
    const message = [
      'Hello Sri Bala Krishna Fireworks,',
      '',
      'I would like a quotation for:',
      productLines,
      '',
      `Name: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Location: ${customer.location}`,
      customer.notes ? `Notes: ${customer.notes}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/919894727599?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-screen bg-cream pb-16 pt-[128px] sm:pt-[168px]">
      <section className="bg-gradient-to-br from-amber-50 via-cream to-orange-50 py-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-maroon">Product Enquiry</span>
            <h1 className="mt-3 font-display text-4xl font-bold text-maroon-darker sm:text-5xl">My Quotation</h1>
            <p className="mt-3 text-maroon-darker/65">Review products, update quantities, and download or WhatsApp your enquiry.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={catalogueUrl} download className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white px-5 py-3 text-sm font-bold text-maroon shadow-sm hover:bg-gold-light/20"><HiOutlineDocumentDownload /> Download Catalogue</a>
            <Link to="/products" className="rounded-full bg-maroon-gradient px-5 py-3 text-sm font-bold text-cream shadow-premium">Add More Products</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="rounded-2xl border border-gold/20 bg-white p-5 shadow-glass sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-maroon-darker">Selected Products</h2>
            <span className="rounded-full bg-gold-light/35 px-3 py-1.5 text-xs font-bold text-maroon">{totalItems} items</span>
          </div>

          {items.length ? (
            <div className="mt-5 space-y-3">
              {items.map((item) => (
                <motion.article layout key={item.name} className="flex items-center gap-4 rounded-xl border border-gold/15 bg-cream/45 p-3 sm:p-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white p-1.5">
                    {item.image ? <img src={item.image} alt="" className="h-full w-full object-contain" /> : <span className="grid h-full place-items-center text-xs text-maroon/40">Product</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-display font-bold text-maroon-darker">{item.name}</h3>
                    <p className="mt-1 text-xs text-maroon-darker/55">{item.category}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-gold/25 bg-white">
                    <button type="button" onClick={() => updateQuantity(item.name, item.quantity - 1)} className="grid h-9 w-9 place-items-center text-maroon" aria-label="Decrease quantity"><HiOutlineMinus /></button>
                    <input type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.name, event.target.value)} className="w-10 bg-transparent text-center text-sm font-bold outline-none" aria-label={`${item.name} quantity`} />
                    <button type="button" onClick={() => updateQuantity(item.name, item.quantity + 1)} className="grid h-9 w-9 place-items-center text-maroon" aria-label="Increase quantity"><HiOutlinePlus /></button>
                  </div>
                  <button type="button" onClick={() => removeProduct(item.name)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-red-500 hover:bg-red-50" aria-label={`Remove ${item.name}`}><HiOutlineTrash /></button>
                </motion.article>
              ))}
              <button type="button" onClick={clearQuotation} className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700">Clear all products</button>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-gold/35 bg-cream/60 px-6 py-12 text-center">
              <p className="font-display text-xl font-bold text-maroon-darker">Your quotation is empty</p>
              <Link to="/products" className="mt-4 inline-flex rounded-full bg-maroon px-5 py-2.5 text-sm font-bold text-cream">Browse Products</Link>
            </div>
          )}
        </div>

        <div className="h-fit rounded-2xl border border-gold/20 bg-white p-5 shadow-premium sm:p-7 lg:sticky lg:top-[140px]">
          <h2 className="font-display text-2xl font-bold text-maroon-darker">Customer Details</h2>
          <div className="mt-5 space-y-4">
            {[
              ['name', 'Name', 'Your full name', 'text'],
              ['phone', 'Phone', 'Contact number', 'tel'],
              ['location', 'Location', 'City or delivery location', 'text'],
            ].map(([name, label, placeholder, type]) => (
              <label key={name} className="block text-sm font-semibold text-maroon-darker">
                {label}
                <input type={type} value={customer[name]} onChange={(event) => setCustomer({ ...customer, [name]: event.target.value })} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold-light/20" />
              </label>
            ))}
            <label className="block text-sm font-semibold text-maroon-darker">
              Notes
              <textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} rows={3} placeholder="Special requirements or questions" className="mt-2 w-full resize-none rounded-xl border border-gold/25 bg-cream/50 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold-light/20" />
            </label>
          </div>
          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={downloadQuotation} className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon-gradient px-6 py-3 text-sm font-bold text-cream shadow-premium"><HiOutlineDocumentDownload /> Download Quotation PDF</button>
            <button type="button" onClick={sendWhatsApp} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-500"><FaWhatsapp size={18} /> Send on WhatsApp</button>
          </div>
          <p className="mt-4 text-xs leading-5 text-maroon-darker/50">Final pricing, availability, taxes and permitted delivery terms are confirmed by our team.</p>
        </div>
      </section>
    </main>
  )
}
