'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const enquiryTypes = [
  'Product Enquiry',
  'Bespoke Commission',
  'Order & Shipping',
  'Returns & Exchanges',
  'Press & Collaborations',
  'Private Client Services',
  'Other',
]

const faqs = [
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Standard orders are dispatched within 1–2 business days and arrive within 5–7 business days worldwide. Express and White Glove options are available at checkout. All orders include tracking and signature-on-delivery.',
  },
  {
    id: 'returns',
    question: 'What is your returns policy?',
    answer:
      'We accept returns within 30 days of delivery, provided garments are unworn, unaltered, and in their original packaging. Bespoke commissions and personalised items are non-returnable. Please contact us to initiate a return.',
  },
  {
    id: 'sizing',
    question: 'Can I get help with sizing?',
    answer:
      'Our ateliers are available for personal video consultations to assist with sizing. We also offer complimentary alterations on first orders for private clients. Contact us to arrange.',
  },
  {
    id: 'bespoke',
    question: 'Do you offer bespoke services?',
    answer:
      'Yes. We accept bespoke commissions for qualified clients on a selective basis. Lead times are typically 8–12 weeks depending on the garment. Please use the contact form with "Bespoke Commission" selected as the enquiry type.',
  },
  {
    id: 'care',
    question: 'How should I care for my ABYSS garments?',
    answer:
      'All garments come with detailed care instructions. As a general rule: dry clean tailored pieces, hand-wash knitwear in cool water, and store all items on proper hangers in breathable garment bags. We recommend against machine washing all ABYSS pieces.',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const formRef = useRef<HTMLElement>(null)
  const isInView = useInView(formRef, { once: true, margin: '-80px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission
    setTimeout(() => setSubmitted(true), 800)
  }

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-brand-black pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-subtitle text-cream/50 mb-2">We Are Here</p>
          <h1 className="font-serif text-5xl lg:text-6xl text-cream">Contact</h1>
        </div>
      </div>

      {/* Contact info + form */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <p className="section-subtitle mb-3">The Atelier</p>
              <h2 className="font-serif text-2xl text-brand-black mb-4">Get in Touch</h2>
              <div className="w-8 h-px bg-burgundy mb-6" />
              <p className="font-sans text-sm text-brand-black/60 leading-relaxed tracking-wide">
                Our client advisors are available Monday through Friday, 9am to 6pm GMT. We endeavour to respond to all enquiries within one business day.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: 'Email',
                  value: 'atelier@abyss.com',
                  sub: 'For all general enquiries',
                },
                {
                  label: 'Private Client',
                  value: 'private@abyss.com',
                  sub: 'Bespoke and VIP services',
                },
                {
                  label: 'Press',
                  value: 'press@abyss.com',
                  sub: 'Media and collaboration requests',
                },
                {
                  label: 'Atelier Address',
                  value: '14 Mount Street, Mayfair, London W1K 3NX',
                  sub: 'By appointment only',
                },
              ].map(({ label, value, sub }) => (
                <div key={label}>
                  <p className="font-sans text-[10px] tracking-luxury uppercase text-burgundy mb-1">{label}</p>
                  <p className="font-sans text-sm text-brand-black">{value}</p>
                  <p className="font-sans text-xs text-brand-black/40 mt-0.5 tracking-wide">{sub}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="section-subtitle mb-4">Follow ABYSS</p>
              <div className="flex gap-3">
                {['Instagram', 'Pinterest', 'LinkedIn'].map((social) => (
                  <button
                    key={social}
                    className="px-4 py-2 border border-cream-dark font-sans text-[10px] tracking-luxury uppercase text-brand-black/60 hover:border-burgundy hover:text-burgundy transition-all duration-200"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <motion.section
            ref={formRef}
            variants={fadeInUp}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-14 h-14 border border-burgundy flex items-center justify-center mb-6">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burgundy">
                      <path d="M1 8l6 6L19 1" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-brand-black mb-3">Message Received</h3>
                  <p className="font-sans text-sm text-brand-black/55 tracking-wide max-w-xs leading-relaxed">
                    Thank you for your enquiry. A member of our atelier team will respond within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ firstName: '', lastName: '', email: '', phone: '', enquiryType: '', message: '' }) }}
                    className="mt-8 font-sans text-xs tracking-luxury uppercase text-burgundy hover:underline"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        required
                        value={formState.firstName}
                        onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                        placeholder="James"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formState.lastName}
                        onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                        placeholder="Ashford"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="james@example.com"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="label">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+44 20 7000 0000"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="label">Nature of Enquiry</label>
                    <select
                      required
                      value={formState.enquiryType}
                      onChange={(e) => setFormState({ ...formState, enquiryType: e.target.value })}
                      className="input-field appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select enquiry type</option>
                      {enquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please describe your enquiry in detail..."
                      className="input-field resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" required id="consent" className="mt-1 accent-burgundy w-4 h-4" />
                    <label htmlFor="consent" className="font-sans text-xs text-brand-black/55 tracking-wide leading-relaxed cursor-pointer">
                      I agree to ABYSS processing my personal data in accordance with the{' '}
                      <a href="/legal/privacy" className="text-burgundy hover:underline">Privacy Policy</a>.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ backgroundColor: '#2E0A10' }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full justify-center"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-brand-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Common Questions</p>
            <h2 className="section-title">FAQ</h2>
          </div>

          <div className="space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b border-cream-dark">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-serif text-base text-brand-black group-hover:text-burgundy transition-colors pr-8">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === faq.id ? 45 : 0 }}
                    className="flex-shrink-0 text-brand-black/40 group-hover:text-burgundy transition-colors"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-sm text-brand-black/60 leading-relaxed tracking-wide pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
