'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax: image moves up at 40% of scroll speed
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden bg-brand-black">
      {/* Parallax image */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src="/assets/classic_longcoat_1775376253908.png"
          alt="ABYSS — The Sovereign Longcoat"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/75 via-brand-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 px-6 lg:px-20 max-w-7xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-xl"
        >
          <motion.p
            variants={staggerItem}
            className="font-sans text-[10px] tracking-luxury uppercase text-cream/60 mb-4"
          >
            Spring / Summer Collection
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-cream leading-[1.05] tracking-tight"
          >
            Where Silence
            <br />
            <span className="italic text-cream/80">Speaks</span>
            <br />
            Loudest.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="font-sans text-sm text-cream/60 mt-6 leading-relaxed max-w-sm tracking-wide"
          >
            Garments built for those who need no introduction. Sourced from highland cashmere, Lyonnais silk, and Neapolitan craft.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link href="/tier-1/shop" className="btn-primary">
              Explore the Collection
            </Link>
            <Link href="/tier-1/heritage" className="inline-flex items-center gap-2 font-sans text-xs tracking-luxury uppercase text-cream/70 hover:text-cream transition-colors group">
              Our Heritage
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 right-8 lg:right-20 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[9px] tracking-luxury uppercase text-cream/40 writing-mode-vertical">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  )
}
