'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types'

interface Props {
  product: Product
}

export default function ProductGallery({ product }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !zoomed) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 lg:gap-3">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative flex-shrink-0 w-16 h-20 lg:w-20 lg:h-24 overflow-hidden transition-all duration-200 ${
              i === activeIndex
                ? 'ring-1 ring-offset-1 ring-offset-cream ring-burgundy'
                : 'ring-1 ring-transparent opacity-60 hover:opacity-100'
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${product.name} view ${i + 1}`}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <motion.div
        layoutId={`product-image-${product.id}`}
        className="flex-1 relative overflow-hidden bg-cream-dark"
      >
        <div
          ref={imageRef}
          className={`relative aspect-[3/4] lg:aspect-auto lg:h-[75vh] cursor-zoom-in ${
            zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setZoomed(!zoomed)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover object-top select-none"
                style={
                  zoomed
                    ? {
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: 'scale(1.8)',
                        transition: 'transform 0.1s ease',
                      }
                    : { transform: 'scale(1)', transition: 'transform 0.3s ease' }
                }
                sizes="(max-width: 1024px) 100vw, 55vw"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint */}
          <AnimatePresence>
            {!zoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 right-4 bg-cream/80 backdrop-blur-sm px-3 py-1.5 pointer-events-none"
              >
                <span className="font-sans text-[9px] tracking-luxury uppercase text-brand-black/60">
                  Hover to zoom
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile swipe dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 ${
                  i === activeIndex ? 'w-5 h-1.5 bg-burgundy' : 'w-1.5 h-1.5 rounded-full bg-brand-black/30'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
