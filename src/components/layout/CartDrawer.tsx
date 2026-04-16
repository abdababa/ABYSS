'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { drawerVariants, overlayVariants } from '@/lib/animations'

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cream flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-cream-dark">
              <div>
                <p className="section-subtitle">Your Selection</p>
                <h2 className="font-serif text-xl mt-0.5">
                  {itemCount === 0 ? 'Cart' : `${itemCount} Item${itemCount > 1 ? 's' : ''}`}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-8 h-8 flex items-center justify-center text-brand-black hover:text-burgundy transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 1l14 14M15 1L1 15" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cream-deep">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <div>
                    <p className="font-serif text-lg text-brand-black/60">Your cart is empty</p>
                    <p className="font-sans text-xs text-brand-black/40 mt-1 tracking-wide">Discover our collection</p>
                  </div>
                  <Link href="/tier-1/shop" onClick={closeCart} className="btn-outline mt-2">
                    Shop Now
                  </Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-5 border-b border-cream-dark last:border-0">
                        {/* Image */}
                        <div className="relative w-20 h-24 flex-shrink-0 bg-cream-dark overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/tier-1/product/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm leading-snug hover:text-burgundy transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="font-sans text-xs text-brand-black/50 mt-1 tracking-wide">
                            Size: {item.size} · {item.color}
                          </p>
                          <p className="font-sans text-sm mt-1 text-burgundy font-medium">
                            £{item.product.price.toLocaleString()}
                          </p>

                          {/* Quantity + Remove */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-cream-dark">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-brand-black/60 hover:text-brand-black transition-colors"
                              >
                                −
                              </button>
                              <span className="w-7 text-center font-sans text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-brand-black/60 hover:text-brand-black transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/40 hover:text-burgundy transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-cream-dark bg-brand-white">
                {/* Subtotal */}
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-sans text-xs tracking-luxury uppercase text-brand-black/60">Subtotal</span>
                  <span className="font-serif text-lg">£{subtotal.toLocaleString()}</span>
                </div>
                <p className="font-sans text-[10px] text-brand-black/40 tracking-wide mb-5">
                  Shipping and duties calculated at checkout
                </p>
                <Link
                  href="/tier-1/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full mt-3 font-sans text-xs tracking-luxury uppercase text-brand-black/50 hover:text-brand-black transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
