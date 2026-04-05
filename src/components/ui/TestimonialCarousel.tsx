'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote:
      'The Charcoal Sovereign arrived, and I understood immediately what ABYSS means. There is no peacocking here — only the quiet confidence of something made absolutely right. My tailor in Mayfair was rendered speechless.',
    author: 'Edward R.',
    title: 'Private Client — London',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'I have worn couture from the houses of Paris and Savile Row. The Obsidian Dress holds its own in that company. The bias cut moves like nothing I have experienced at any price point. ABYSS has earned a permanent place in my wardrobe.',
    author: 'Isabelle C.',
    title: 'Verified Client — Paris',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The Cashmere arrives with the scent of the Scottish Borders. Against the skin it is indistinguishable from temperature itself. I ordered in Ivory Cream and Mushroom Taupe before the email confirmation had landed.',
    author: 'Victoria M.',
    title: 'Member since 2022 — New York',
    rating: 5,
  },
  {
    id: 4,
    quote:
      'I gifted the Burgundy Foulard to my father on his sixty-fifth birthday. The hand-rolled hem, the depth of the print, the way it was presented — it communicated something words could not. He has worn it every day since.',
    author: 'Sebastian K.',
    title: 'Verified Purchaser — Vienna',
    rating: 5,
  },
  {
    id: 5,
    quote:
      'The Sovereign Longcoat is the best single garment investment I have made in a decade. Double-faced camel — so it needs no lining. The structure is impeccable. Ten years from now it will be more beautiful for the wear.',
    author: 'James A.',
    title: 'Private Client — Edinburgh',
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  }

  const t = testimonials[current]

  return (
    <section className="bg-brand-black text-cream py-24 lg:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p className="section-subtitle text-cream/50 mb-2">From Our Connoisseurs</p>
        <div className="divider bg-cream/30 mb-12" />

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#4A0E18" className="text-burgundy">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <div className="relative min-h-[180px] flex items-center justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="max-w-2xl">
                <blockquote className="font-serif text-xl lg:text-2xl leading-relaxed text-cream/90 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Author */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`author-${t.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8"
          >
            <p className="font-sans text-sm text-cream font-medium">{t.author}</p>
            <p className="font-sans text-xs text-cream/40 tracking-wide mt-0.5">{t.title}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`transition-all duration-300 ${
                i === current
                  ? 'w-6 h-1.5 bg-burgundy'
                  : 'w-1.5 h-1.5 rounded-full bg-cream/30 hover:bg-cream/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
