'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/types'

interface Props {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      layoutId={`product-card-${product.id}`}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-cream-dark aspect-[3/4]">
          {/* Main image */}
          <motion.div
            layoutId={`product-image-${product.id}`}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover object-top transition-transform duration-700 ease-luxury group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>

          {/* Hover: second image */}
          {product.images[1] && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image
                src={product.images[1]}
                alt={`${product.name} — alternate view`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.originalPrice && (
              <span className="bg-burgundy text-cream font-sans text-[9px] tracking-luxury uppercase px-2.5 py-1">
                Sale
              </span>
            )}
            {product.featured && !product.originalPrice && (
              <span className="bg-brand-black/80 text-cream font-sans text-[9px] tracking-luxury uppercase px-2.5 py-1">
                Signature
              </span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-luxury">
            <div className="bg-cream/95 backdrop-blur-sm px-4 py-3 text-center border-t border-cream-dark">
              <span className="font-sans text-[10px] tracking-luxury uppercase text-brand-black">
                View Details →
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <p className="font-sans text-[10px] tracking-luxury uppercase text-burgundy mb-1">
            {product.category}
          </p>
          <h3 className="font-serif text-base text-brand-black group-hover:text-burgundy transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
          <p className="font-sans text-xs text-brand-black/50 mt-1 leading-snug">
            {product.shortDescription}
          </p>
          <div className="flex items-baseline gap-3 mt-2.5">
            {product.originalPrice && (
              <span className="font-sans text-xs text-brand-black/35 line-through">
                £{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className={`font-sans text-sm ${product.originalPrice ? 'text-burgundy' : 'text-brand-black'}`}>
              £{product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
