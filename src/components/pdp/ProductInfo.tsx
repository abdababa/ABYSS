'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import SizingGuideModal from '@/components/ui/SizingGuideModal'

interface Props {
  product: Product
}

export default function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState<string | null>('description')
  const [sizeError, setSizeError] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    addItem(product, selectedSize, selectedColor)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2500)
  }

  const accordionSections = [
    {
      id: 'description',
      label: 'Description & Inspiration',
      content: product.description,
    },
    {
      id: 'details',
      label: 'Construction & Details',
      content: null,
      list: product.details,
    },
    {
      id: 'fabric',
      label: 'Fabric & Materials',
      content: product.fabric,
    },
    {
      id: 'origin',
      label: 'Provenance',
      content: product.origin,
    },
    {
      id: 'care',
      label: 'Care Instructions',
      content:
        'Dry clean recommended. Store on a shaped hanger in a breathable garment bag. Keep away from direct sunlight when not in use. For bespoke aftercare, contact our atelier at atelier@abyss.com.',
    },
  ]

  return (
    <>
      <div className="lg:sticky lg:top-20">
        {/* Category + Name */}
        <p className="section-subtitle mb-2">{product.category}</p>
        <motion.h1
          layoutId={`product-name-${product.id}`}
          className="font-serif text-3xl lg:text-4xl text-brand-black leading-tight"
        >
          {product.name}
        </motion.h1>

        {/* Price */}
        <div className="flex items-baseline gap-3 mt-3 mb-1">
          {product.originalPrice && (
            <span className="font-sans text-base text-brand-black/35 line-through">
              £{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-serif text-2xl text-brand-black">
            £{product.price.toLocaleString()}
          </span>
        </div>

        {/* Provenance mini-badge */}
        <div className="flex items-center gap-2 mb-6 mt-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-burgundy flex-shrink-0">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 6l1.5 1.5L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/50">
            {product.origin}
          </span>
        </div>

        <div className="w-10 h-px bg-cream-dark mb-8" />

        {/* Colour selector */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="label mb-0">Colour</p>
            <p className="font-sans text-xs text-burgundy">{selectedColor}</p>
          </div>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                title={color}
                className={`px-3 py-1.5 font-sans text-[10px] tracking-luxury uppercase border transition-all duration-200 ${
                  selectedColor === color
                    ? 'bg-burgundy text-cream border-burgundy'
                    : 'bg-transparent text-brand-black border-cream-dark hover:border-burgundy'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="label mb-0">Size</p>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="font-sans text-[10px] tracking-luxury uppercase text-burgundy hover:underline transition-all"
            >
              Size Guide
            </button>
          </div>

          <AnimatePresence>
            {sizeError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-sans text-[10px] text-burgundy tracking-wide mb-2"
              >
                Please select a size to continue.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <motion.button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setSizeError(false)
                }}
                whileTap={{ scale: 0.95 }}
                className={`min-w-[3rem] px-3 py-2.5 font-sans text-xs border transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-burgundy text-cream border-burgundy'
                    : sizeError
                    ? 'border-burgundy/50 text-brand-black hover:border-burgundy hover:text-burgundy'
                    : 'border-cream-dark text-brand-black hover:border-burgundy hover:text-burgundy'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <motion.button
          onClick={handleAddToCart}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 font-sans text-xs tracking-luxury uppercase transition-all duration-300 relative overflow-hidden ${
            addedFeedback
              ? 'bg-brand-black text-cream'
              : 'bg-burgundy text-cream hover:bg-burgundy-dark'
          }`}
        >
          <AnimatePresence mode="wait">
            {addedFeedback ? (
              <motion.span
                key="added"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 5l4 4 8-8" />
                </svg>
                Added to Your Selection
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Wishlist + Share */}
        <div className="flex gap-4 mt-3">
          <button className="flex-1 py-3 border border-cream-dark font-sans text-[10px] tracking-luxury uppercase text-brand-black/60 hover:border-burgundy hover:text-burgundy transition-all duration-200 flex items-center justify-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            Save
          </button>
          <button className="flex-1 py-3 border border-cream-dark font-sans text-[10px] tracking-luxury uppercase text-brand-black/60 hover:border-burgundy hover:text-burgundy transition-all duration-200 flex items-center justify-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
        </div>

        {/* Trust signals */}
        <div className="mt-8 pt-6 border-t border-cream-dark space-y-3">
          {[
            { icon: '🚚', text: 'Complimentary worldwide shipping on all orders' },
            { icon: '↩', text: 'Free returns within 30 days' },
            { icon: '🔒', text: 'Secure, encrypted checkout' },
            { icon: '📦', text: 'Arrives in signature ABYSS packaging' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-sm w-5">{icon}</span>
              <span className="font-sans text-[11px] text-brand-black/55 tracking-wide">{text}</span>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-8 border-t border-cream-dark">
          {accordionSections.map((section) => (
            <div key={section.id} className="border-b border-cream-dark">
              <button
                onClick={() =>
                  setAccordionOpen(accordionOpen === section.id ? null : section.id)
                }
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className="font-sans text-xs tracking-luxury uppercase text-brand-black group-hover:text-burgundy transition-colors">
                  {section.label}
                </span>
                <motion.span
                  animate={{ rotate: accordionOpen === section.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-brand-black/40 group-hover:text-burgundy transition-colors"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {accordionOpen === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">
                      {section.list ? (
                        <ul className="space-y-2">
                          {section.list.map((item) => (
                            <li
                              key={item}
                              className="font-sans text-xs text-brand-black/65 tracking-wide leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-burgundy mt-0.5 flex-shrink-0">–</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="font-sans text-xs text-brand-black/65 leading-relaxed tracking-wide">
                          {section.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <SizingGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </>
  )
}
