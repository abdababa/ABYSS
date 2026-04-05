'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '@/components/shop/ProductCard'
import FilterPanel from '@/components/shop/FilterPanel'
import PageTransition from '@/components/layout/PageTransition'
import { products } from '@/data/products'

interface FilterState {
  category: string[]
  maxPrice: number
  sort: string
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory ? [initialCategory] : [],
    maxPrice: 99999,
    sort: 'featured',
  })
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category))
    }

    result = result.filter((p) => p.price <= filters.maxPrice)

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [filters])

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-brand-white border-b border-cream-dark pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-subtitle mb-2">The ABYSS Collection</p>
          <h1 className="section-title">Shop</h1>
          <p className="font-sans text-xs text-brand-black/50 mt-3 tracking-wide max-w-md">
            Each piece in the ABYSS archive is available in limited quantities.
            Once gone, they do not return.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          isOpen={filterOpen}
          onToggle={() => setFilterOpen(!filterOpen)}
        />

        {/* Result count */}
        <p className="font-sans text-xs text-brand-black/40 tracking-wide mb-8">
          Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-24 text-center"
            >
              <p className="font-serif text-xl text-brand-black/40 mb-3">
                No pieces match your selection
              </p>
              <button
                onClick={() =>
                  setFilters({ category: [], maxPrice: 99999, sort: 'featured' })
                }
                className="font-sans text-xs tracking-luxury uppercase text-burgundy hover:underline mt-2"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full collection note */}
        <div className="mt-20 py-12 border-t border-cream-dark text-center">
          <p className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/30 mb-2">
            Bespoke commissions available
          </p>
          <p className="font-serif text-lg text-brand-black/60">
            Cannot find what you are looking for?
          </p>
          <p className="font-sans text-xs text-brand-black/40 mt-2 mb-6 tracking-wide">
            Our ateliers accept bespoke commissions for qualified clients.
          </p>
          <a href="/contact" className="btn-outline">
            Enquire
          </a>
        </div>
      </div>
    </PageTransition>
  )
}
