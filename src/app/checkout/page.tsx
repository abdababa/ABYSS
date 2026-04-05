'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import { useCart } from '@/context/CartContext'
import { shippingMethods } from '@/data/products'
import { CheckoutStep } from '@/types'

const STEPS: CheckoutStep[] = ['cart', 'information', 'shipping', 'payment', 'confirmation']
const STEP_LABELS = {
  cart: 'Bag',
  information: 'Information',
  shipping: 'Shipping',
  payment: 'Payment',
  confirmation: 'Confirmed',
}

function formatCard(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(value: string) {
  const v = value.replace(/\D/g, '').slice(0, 4)
  if (v.length >= 3) return `${v.slice(0, 2)}/${v.slice(2)}`
  return v
}

const orderNumber = `ABYSS-${Math.floor(100000 + Math.random() * 900000)}`

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<CheckoutStep>(items.length === 0 ? 'cart' : 'cart')
  const [shipping, setShipping] = useState(shippingMethods[0])
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })
  const [loading, setLoading] = useState(false)

  const total = subtotal + shipping.price
  const stepIndex = STEPS.indexOf(step)

  const goTo = (s: CheckoutStep) => {
    const target = STEPS.indexOf(s)
    if (target <= stepIndex) setStep(s)
  }

  const advance = () => {
    const next = STEPS[stepIndex + 1]
    if (next) setStep(next)
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      clearCart()
      setStep('confirmation')
    }, 2000)
  }

  const update = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }))

  // Step indicator
  const StepIndicator = () => (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.filter((s) => s !== 'confirmation').map((s, i) => {
        const isActive = s === step
        const isDone = STEPS.indexOf(s) < stepIndex
        const isClickable = STEPS.indexOf(s) < stepIndex

        return (
          <div key={s} className="flex items-center">
            <button
              onClick={() => isClickable && goTo(s)}
              className={`flex items-center gap-2 font-sans text-[10px] tracking-luxury uppercase transition-colors ${
                isActive ? 'text-burgundy' : isDone ? 'text-brand-black/60 hover:text-burgundy cursor-pointer' : 'text-brand-black/30'
              }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center border text-[9px] ${
                  isDone
                    ? 'bg-burgundy border-burgundy text-cream'
                    : isActive
                    ? 'border-burgundy text-burgundy'
                    : 'border-cream-dark text-brand-black/30'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </span>
              <span className="hidden sm:block">{STEP_LABELS[s]}</span>
            </button>
            {i < STEPS.filter((s) => s !== 'confirmation').length - 1 && (
              <div className={`w-8 h-px mx-3 ${isDone ? 'bg-burgundy' : 'bg-cream-dark'}`} />
            )}
          </div>
        )
      })}
    </div>
  )

  // Order summary sidebar
  const OrderSummary = () => (
    <div className="bg-brand-white border border-cream-dark p-6">
      <h3 className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/50 mb-5">
        Order Summary
      </h3>
      <div className="space-y-4 mb-5">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
            <div className="relative w-14 h-18 flex-shrink-0 bg-cream-dark overflow-hidden">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover object-top" sizes="56px" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-burgundy text-cream text-[9px] flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-xs leading-snug line-clamp-2">{item.product.name}</p>
              <p className="font-sans text-[10px] text-brand-black/40 mt-0.5">Size: {item.size}</p>
              <p className="font-sans text-xs text-burgundy mt-0.5">£{(item.product.price * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-cream-dark pt-4 space-y-2">
        <div className="flex justify-between font-sans text-xs text-brand-black/60">
          <span>Subtotal</span>
          <span>£{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-sans text-xs text-brand-black/60">
          <span>Shipping</span>
          <span>{shipping.price === 0 ? 'Complimentary' : `£${shipping.price}`}</span>
        </div>
        <div className="flex justify-between font-serif text-base pt-2 border-t border-cream-dark">
          <span>Total</span>
          <span>£{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream pt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="font-serif text-2xl tracking-widest text-burgundy">
              ABYSS
            </Link>
          </div>

          {step !== 'confirmation' && <StepIndicator />}

          <div className={`grid ${step !== 'confirmation' ? 'grid-cols-1 lg:grid-cols-3 gap-12' : 'grid-cols-1'}`}>
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">

                {/* STEP: Cart */}
                {step === 'cart' && (
                  <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <h2 className="font-serif text-2xl mb-6">Your Selection</h2>
                    {items.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="font-serif text-xl text-brand-black/40 mb-4">Your cart is empty</p>
                        <Link href="/shop" className="btn-primary">
                          Continue Shopping
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-brand-white p-4">
                            <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-cream-dark">
                              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover object-top" sizes="80px" />
                            </div>
                            <div className="flex-1">
                              <p className="font-serif text-sm">{item.product.name}</p>
                              <p className="font-sans text-xs text-brand-black/50 mt-0.5">
                                {item.color} · Size {item.size} · Qty {item.quantity}
                              </p>
                              <p className="font-sans text-sm text-burgundy mt-1">
                                £{(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                        <button onClick={advance} className="btn-primary w-full justify-center mt-6">
                          Proceed to Information →
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP: Information */}
                {step === 'information' && (
                  <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <h2 className="font-serif text-2xl mb-6">Contact & Delivery</h2>
                    <form
                      onSubmit={(e) => { e.preventDefault(); advance() }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">First Name</label>
                          <input required className="input-field" placeholder="James" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                        </div>
                        <div>
                          <label className="label">Last Name</label>
                          <input required className="input-field" placeholder="Ashford" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="label">Email</label>
                        <input required type="email" className="input-field" placeholder="james@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                      </div>
                      <div>
                        <label className="label">Phone</label>
                        <input type="tel" className="input-field" placeholder="+44 20 7000 0000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                      </div>
                      <div className="border-t border-cream-dark pt-5">
                        <h3 className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/50 mb-4">Delivery Address</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="label">Street Address</label>
                            <input required className="input-field" placeholder="14 Mount Street" value={form.address} onChange={(e) => update('address', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="label">City</label>
                              <input required className="input-field" placeholder="London" value={form.city} onChange={(e) => update('city', e.target.value)} />
                            </div>
                            <div>
                              <label className="label">Postal Code</label>
                              <input required className="input-field" placeholder="W1K 3NX" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} />
                            </div>
                          </div>
                          <div>
                            <label className="label">Country</label>
                            <select className="input-field appearance-none" value={form.country} onChange={(e) => update('country', e.target.value)}>
                              {['United Kingdom', 'France', 'Germany', 'Italy', 'United States', 'Switzerland', 'Japan', 'Australia', 'Other'].map((c) => (
                                <option key={c}>{c}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="btn-primary w-full justify-center">
                        Continue to Shipping →
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP: Shipping */}
                {step === 'shipping' && (
                  <motion.div key="ship" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <h2 className="font-serif text-2xl mb-6">Shipping Method</h2>
                    <p className="font-sans text-xs text-brand-black/50 tracking-wide mb-6">
                      Delivering to <span className="text-brand-black">{form.address || '—'}, {form.city || '—'}, {form.country}</span>
                    </p>
                    <div className="space-y-3 mb-8">
                      {shippingMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-4 p-5 border cursor-pointer transition-all duration-200 ${
                            shipping.id === method.id
                              ? 'border-burgundy bg-burgundy/5'
                              : 'border-cream-dark bg-brand-white hover:border-burgundy/50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 border rounded-full flex items-center justify-center flex-shrink-0 ${
                              shipping.id === method.id ? 'border-burgundy' : 'border-cream-dark'
                            }`}
                          >
                            {shipping.id === method.id && <div className="w-2 h-2 bg-burgundy rounded-full" />}
                          </div>
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shipping.id === method.id}
                            onChange={() => setShipping(method)}
                            className="sr-only"
                          />
                          <div className="flex-1">
                            <p className="font-sans text-xs tracking-wide font-medium">{method.name}</p>
                            <p className="font-sans text-xs text-brand-black/50 mt-0.5">{method.description}</p>
                            <p className="font-sans text-xs text-brand-black/40 mt-0.5">{method.days}</p>
                          </div>
                          <p className="font-serif text-sm text-brand-black flex-shrink-0">
                            {method.price === 0 ? 'Free' : `£${method.price}`}
                          </p>
                        </label>
                      ))}
                    </div>
                    <button onClick={advance} className="btn-primary w-full justify-center">
                      Continue to Payment →
                    </button>
                  </motion.div>
                )}

                {/* STEP: Payment */}
                {step === 'payment' && (
                  <motion.div key="pay" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <h2 className="font-serif text-2xl mb-6">Payment</h2>
                    <div className="bg-cream-dark/30 border border-cream-dark px-5 py-3 mb-6 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burgundy flex-shrink-0">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <p className="font-sans text-[10px] tracking-wide text-brand-black/60">
                        This is a mock checkout. No real payment will be processed.
                      </p>
                    </div>
                    <form onSubmit={handlePayment} className="space-y-5">
                      <div>
                        <label className="label">Cardholder Name</label>
                        <input
                          required
                          className="input-field"
                          placeholder="James Ashford"
                          value={form.cardName}
                          onChange={(e) => update('cardName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="label">Card Number</label>
                        <input
                          required
                          className="input-field font-mono"
                          placeholder="4242 4242 4242 4242"
                          value={form.cardNumber}
                          onChange={(e) => update('cardNumber', formatCard(e.target.value))}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">Expiry Date</label>
                          <input
                            required
                            className="input-field font-mono"
                            placeholder="MM/YY"
                            value={form.cardExpiry}
                            onChange={(e) => update('cardExpiry', formatExpiry(e.target.value))}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="label">Security Code</label>
                          <input
                            required
                            className="input-field font-mono"
                            placeholder="CVV"
                            value={form.cardCvc}
                            onChange={(e) => update('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      {/* Order total summary */}
                      <div className="bg-brand-white border border-cream-dark p-5 space-y-2 mt-4">
                        <div className="flex justify-between font-sans text-xs text-brand-black/60">
                          <span>Subtotal</span><span>£{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-sans text-xs text-brand-black/60">
                          <span>Shipping ({shipping.name})</span>
                          <span>{shipping.price === 0 ? 'Free' : `£${shipping.price}`}</span>
                        </div>
                        <div className="flex justify-between font-serif text-lg border-t border-cream-dark pt-2">
                          <span>Total</span><span>£{total.toLocaleString()}</span>
                        </div>
                      </div>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              className="block w-3.5 h-3.5 border border-cream/40 border-t-cream rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          `Place Order · £${total.toLocaleString()}`
                        )}
                      </motion.button>
                      <p className="font-sans text-[10px] text-brand-black/35 tracking-wide text-center">
                        By placing your order you agree to our{' '}
                        <a href="/legal/terms" className="text-burgundy hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/legal/privacy" className="text-burgundy hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* STEP: Confirmation */}
                {step === 'confirmation' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-2xl mx-auto text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
                      className="w-16 h-16 border-2 border-burgundy flex items-center justify-center mx-auto mb-8"
                    >
                      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burgundy">
                        <path d="M1 9l7 7L23 1" />
                      </svg>
                    </motion.div>
                    <p className="section-subtitle mb-3">Order Confirmed</p>
                    <h2 className="font-serif text-4xl text-brand-black mb-2">Thank You</h2>
                    <p className="font-sans text-xs tracking-luxury uppercase text-burgundy mb-8">
                      {orderNumber}
                    </p>
                    <p className="font-sans text-sm text-brand-black/60 leading-relaxed tracking-wide mb-3 max-w-sm mx-auto">
                      A confirmation has been sent to <span className="text-brand-black">{form.email || 'your email address'}</span>. Your order will be prepared and dispatched within 1–2 business days.
                    </p>
                    <p className="font-sans text-xs text-brand-black/40 tracking-wide mb-10">
                      Shipping method: <span className="text-brand-black">{shipping.name}</span> — {shipping.days}
                    </p>
                    <div className="bg-brand-white border border-cream-dark p-6 text-left mb-10">
                      <h3 className="font-sans text-[10px] tracking-luxury uppercase text-brand-black/50 mb-4">What Happens Next</h3>
                      <div className="space-y-3">
                        {[
                          'Our atelier will inspect and package your order by hand.',
                          'You will receive a shipping confirmation with tracking details.',
                          'Your order arrives in signature ABYSS packaging.',
                          'Our client advisors are available if you need anything.',
                        ].map((step, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="font-sans text-[10px] tracking-luxury text-burgundy/60 mt-0.5 flex-shrink-0">0{i + 1}</span>
                            <p className="font-sans text-xs text-brand-black/60 tracking-wide">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/shop" className="btn-primary">
                        Continue Shopping
                      </Link>
                      <Link href="/contact" className="btn-outline">
                        Contact Us
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar: order summary */}
            {step !== 'confirmation' && (
              <div className="hidden lg:block">
                <OrderSummary />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
