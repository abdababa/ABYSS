'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface FilterState {
  category: string[]
  maxPrice: number
  sort: string
}

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
  isOpen: boolean
  onToggle: () => void
}

const categories = ['Menswear', 'Womenswear', 'Accessories']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
]
const priceOptions = [
  { value: 500, label: 'Under £500' },
  { value: 1000, label: 'Under £1,000' },
  { value: 2000, label: 'Under £2,000' },
  { value: 99999, label: 'All Prices' },
]

export default function FilterPanel({ filters, onChange, isOpen, onToggle }: Props) {
  const toggleCategory = (cat: string) => {
    const next = filters.category.includes(cat)
      ? filters.category.filter((c) => c !== cat)
      : [...filters.category, cat]
    onChange({ ...filters, category: next })
  }

  const activeCount =
    filters.category.length +
    (filters.maxPrice < 99999 ? 1 : 0) +
    (filters.sort !== 'featured' ? 1 : 0)

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center justify-between py-4 border-b border-cream-dark mb-8 sticky top-16 bg-cream/95 backdrop-blur-sm z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 font-sans text-xs tracking-luxury uppercase text-brand-black hover:text-burgundy transition-colors"
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="0" y1="1" x2="14" y2="1" />
              <line x1="2" y1="5" x2="12" y2="5" />
              <line x1="4" y1="9" x2="10" y2="9" />
            </svg>
            Filter
            {activeCount > 0 && (
              <span className="w-4 h-4 bg-burgundy text-cream text-[9px] flex items-center justify-center rounded-full">
                {activeCount}
              </span>
            )}
          </button>

          {/* Active category pills */}
          <div className="hidden sm:flex items-center gap-2">
            {filters.category.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-1.5 px-3 py-1 bg-burgundy text-cream font-sans text-[10px] tracking-luxury uppercase"
              >
                {cat}
                <span className="text-cream/70">×</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/50 hidden sm:block">
            Sort:
          </span>
          <select
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            className="font-sans text-xs bg-transparent border-0 text-brand-black focus:outline-none cursor-pointer pr-4"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expandable filter panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 mb-8 border-b border-cream-dark">
              {/* Category */}
              <div>
                <p className="label mb-3">Category</p>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${
                          filters.category.includes(cat)
                            ? 'bg-burgundy border-burgundy'
                            : 'border-cream-muted group-hover:border-burgundy'
                        }`}
                        onClick={() => toggleCategory(cat)}
                      >
                        {filters.category.includes(cat) && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" stroke="white" strokeWidth="1.5">
                            <path d="M1 3l2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleCategory(cat)}
                        className="font-sans text-xs text-brand-black tracking-wide"
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="label mb-3">Maximum Price</p>
                <div className="space-y-2.5">
                  {priceOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors duration-200 ${
                          filters.maxPrice === opt.value
                            ? 'border-burgundy'
                            : 'border-cream-muted group-hover:border-burgundy'
                        }`}
                        onClick={() => onChange({ ...filters, maxPrice: opt.value })}
                      >
                        {filters.maxPrice === opt.value && (
                          <div className="w-2 h-2 bg-burgundy rounded-full" />
                        )}
                      </div>
                      <span
                        onClick={() => onChange({ ...filters, maxPrice: opt.value })}
                        className="font-sans text-xs text-brand-black tracking-wide"
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-end gap-3">
                {activeCount > 0 && (
                  <button
                    onClick={() => onChange({ category: [], maxPrice: 99999, sort: 'featured' })}
                    className="font-sans text-xs tracking-luxury uppercase text-burgundy hover:text-burgundy-dark transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
                <button
                  onClick={onToggle}
                  className="btn-outline self-start"
                >
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
