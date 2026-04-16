'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    number: '01',
    title: 'Provenance',
    body: 'Every fibre is sourced from a named origin. Our wool comes from Scottish highland farms. Our silk from Lyon. Our leather from a single tannery outside Florence.',
  },
  {
    number: '02',
    title: 'Craft',
    body: 'A single ABYSS suit requires over 40 hours of hand-finishing. We work with ateliers who have been at their craft for three or more generations.',
  },
  {
    number: '03',
    title: 'Restraint',
    body: 'We do not follow trends. We do not chase velocity. We release two collections per year — and we stand behind every piece we have ever made.',
  },
]

export default function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 lg:py-40 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Headline */}
        <div className="max-w-3xl mb-20">
          <p className="section-subtitle mb-3">The ABYSS Philosophy</p>
          <h2 className="font-serif text-4xl lg:text-6xl text-brand-black leading-tight">
            Luxury is not what you see.
            <br />
            <span className="italic text-burgundy">It is what you feel.</span>
          </h2>
          <div ref={lineRef} className="h-px bg-burgundy mt-8 w-full origin-left" />
        </div>

        {/* Pillars */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="font-sans text-[10px] tracking-luxury uppercase text-burgundy/60 mb-4">
                {pillar.number}
              </p>
              <h3 className="font-serif text-2xl text-brand-black mb-3">{pillar.title}</h3>
              <div className="w-8 h-px bg-burgundy mb-4" />
              <p className="font-sans text-sm text-brand-black/60 leading-relaxed tracking-wide">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex items-center gap-8"
        >
          <Link href="/tier-1/heritage" className="btn-outline">
            Our Heritage
          </Link>
          <Link
            href="/tier-1/shop"
            className="font-sans text-xs tracking-luxury uppercase text-brand-black/60 hover:text-burgundy transition-colors group flex items-center gap-2"
          >
            View all pieces
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
