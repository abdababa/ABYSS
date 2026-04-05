'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const categories = [
  {
    name: 'Menswear',
    description: 'Sartorial precision for the discerning gentleman',
    image: '/assets/mens_wool_suit_1775376502201.png',
    href: '/shop?category=Menswear',
    count: '3 Pieces',
  },
  {
    name: 'Womenswear',
    description: 'Fluid elegance grounded in European tradition',
    image: '/assets/elegant_womens_dress_1775376237419.png',
    href: '/shop?category=Womenswear',
    count: '2 Pieces',
  },
  {
    name: 'Accessories',
    description: 'The finishing touch of the irreproachably dressed',
    image: '/assets/silk_scarf_1775376536545.png',
    href: '/shop?category=Accessories',
    count: '1 Piece',
  },
]

export default function FeaturedCategories() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="section-subtitle mb-3">Curated for the Considered</p>
          <h2 className="section-title">The Collection</h2>
          <div className="divider mt-4" />
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream-dark"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={staggerItem}>
              <Link href={cat.href} className="group block bg-cream relative overflow-hidden">
                {/* Image */}
                <div className="relative h-80 lg:h-[420px] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-burgundy/10"
                  />
                </div>

                {/* Text */}
                <div className="p-6 border-b border-cream-dark group-hover:border-burgundy/30 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-[10px] tracking-luxury uppercase text-burgundy mb-1">
                        {cat.count}
                      </p>
                      <h3 className="font-serif text-xl text-brand-black">{cat.name}</h3>
                      <p className="font-sans text-xs text-brand-black/50 mt-1 tracking-wide">{cat.description}</p>
                    </div>
                    <span className="text-brand-black/40 group-hover:text-burgundy transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
