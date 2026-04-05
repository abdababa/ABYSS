'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setState('error')
      return
    }
    setState('loading')
    // Mock submission
    setTimeout(() => {
      setState('success')
      setEmail('')
    }, 1200)
  }

  return (
    <section className="py-24 lg:py-32 bg-cream-dark">
      <motion.div
        ref={ref}
        variants={fadeInUp}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <p className="section-subtitle mb-3">The Inner Circle</p>
        <h2 className="font-serif text-3xl lg:text-4xl text-brand-black mb-3">
          Receive the Quiet Communiqué
        </h2>
        <div className="divider mb-6" />
        <p className="font-sans text-sm text-brand-black/60 mb-10 leading-relaxed tracking-wide">
          Invitations to private sales. First access to limited editions.
          Archival notes on craft and provenance. No noise — only signal.
        </p>

        <AnimatePresence mode="wait">
          {state === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6"
            >
              <div className="w-10 h-10 border border-burgundy flex items-center justify-center mx-auto mb-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burgundy">
                  <path d="M2 8l4 4 8-8" />
                </svg>
              </div>
              <p className="font-serif text-lg text-brand-black">You have been admitted.</p>
              <p className="font-sans text-xs text-brand-black/50 mt-1 tracking-wide">
                Expect your first communiqué shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === 'error') setState('idle')
                }}
                placeholder="Your email address"
                className={`flex-1 px-5 py-4 bg-brand-white border text-brand-black font-sans text-xs placeholder:text-brand-black/30 focus:outline-none transition-colors ${
                  state === 'error'
                    ? 'border-burgundy focus:border-burgundy'
                    : 'border-cream-muted focus:border-burgundy'
                }`}
              />
              <motion.button
                type="submit"
                whileHover={{ backgroundColor: '#2E0A10' }}
                whileTap={{ scale: 0.98 }}
                disabled={state === 'loading'}
                className="px-8 py-4 bg-burgundy text-cream font-sans text-xs tracking-luxury uppercase whitespace-nowrap transition-colors disabled:opacity-70"
              >
                {state === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="block w-3 h-3 border border-cream/50 border-t-cream rounded-full"
                    />
                    Joining
                  </span>
                ) : (
                  'Join'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {state === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs text-burgundy mt-2 tracking-wide"
          >
            Please enter a valid email address.
          </motion.p>
        )}

        <p className="font-sans text-[10px] text-brand-black/30 tracking-wide mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  )
}
