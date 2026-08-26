import { useState } from 'react'

export default function CategoryNav({ categories }) {
  const [active, setActive] = useState(null)

  const handleClick = (id) => {
    setActive(id)
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-[80px] sm:top-[136px] z-30 bg-white/95 backdrop-blur-md border-b border-gold/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                active === cat.id
                  ? 'bg-maroon-gradient text-cream shadow'
                  : 'bg-cream text-maroon-darker/70 hover:bg-gold-light/40 border border-gold/20'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
