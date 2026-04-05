'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { scaleIn, overlayVariants } from '@/lib/animations'

interface Props {
  isOpen: boolean
  onClose: () => void
  category: 'Menswear' | 'Womenswear' | 'Accessories'
}

const menswearSizes = [
  { size: '36R', chest: '36"', waist: '30"', hips: '37"', height: "5'8\"–5'10\"" },
  { size: '38R', chest: '38"', waist: '32"', hips: '39"', height: "5'10\"–6'0\"" },
  { size: '40R', chest: '40"', waist: '34"', hips: '41"', height: "5'10\"–6'0\"" },
  { size: '42R', chest: '42"', waist: '36"', hips: '43"', height: "6'0\"–6'2\"" },
  { size: '44R', chest: '44"', waist: '38"', hips: '45"', height: "6'0\"–6'2\"" },
  { size: '46R', chest: '46"', waist: '40"', hips: '47"', height: "6'2\"–6'4\"" },
]

const womenswearSizes = [
  { size: 'XS', chest: '31–32"', waist: '23–24"', hips: '33–34"', ukSize: '6–8' },
  { size: 'S', chest: '33–34"', waist: '25–26"', hips: '35–36"', ukSize: '8–10' },
  { size: 'M', chest: '35–36"', waist: '27–28"', hips: '37–38"', ukSize: '10–12' },
  { size: 'L', chest: '37–39"', waist: '29–31"', hips: '39–41"', ukSize: '12–14' },
  { size: 'XL', chest: '40–42"', waist: '32–34"', hips: '42–44"', ukSize: '14–16' },
]

const menswearPoloSizes = [
  { size: 'S', chest: '36–38"', length: '29"', sleeve: '34"' },
  { size: 'M', chest: '38–40"', length: '30"', sleeve: '35"' },
  { size: 'L', chest: '40–42"', length: '31"', sleeve: '36"' },
  { size: 'XL', chest: '42–44"', length: '32"', sleeve: '37"' },
  { size: 'XXL', chest: '44–46"', length: '33"', sleeve: '38"' },
]

export default function SizingGuideModal({ isOpen, onClose, category }: Props) {
  const isMenswear = category === 'Menswear'
  const isAccessories = category === 'Accessories'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-brand-black/50 backdrop-blur-sm"
          />

          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-cream w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-cream-dark sticky top-0 bg-cream z-10">
                <div>
                  <p className="section-subtitle">How to fit</p>
                  <h2 className="font-serif text-2xl mt-0.5">Sizing Guide</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-brand-black hover:text-burgundy transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 1l14 14M15 1L1 15" />
                  </svg>
                </button>
              </div>

              <div className="px-8 py-8">
                {isAccessories ? (
                  <div className="space-y-6">
                    <p className="font-serif text-base leading-relaxed text-brand-black/80">
                      Our scarves and accessories are crafted in standard dimensions to suit all proportions. Each piece arrives in a signature ABYSS box.
                    </p>
                    <div className="bg-cream-dark/40 p-6">
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4">Foulard Dimensions</h3>
                      <p className="font-serif text-sm">90 × 90 cm — suitable for neck, wrist, or bag styling</p>
                    </div>
                    <div className="bg-cream-dark/40 p-6">
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-3">Care</h3>
                      <ul className="space-y-1.5">
                        {['Dry clean only', 'Do not bleach', 'Iron on low heat with pressing cloth', 'Store flat or rolled, never folded tight'].map((tip) => (
                          <li key={tip} className="font-sans text-xs text-brand-black/70 flex items-start gap-2">
                            <span className="text-burgundy mt-0.5">–</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : isMenswear ? (
                  <div className="space-y-8">
                    {/* Measuring instructions */}
                    <div>
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4 text-burgundy">How to Measure</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Chest', tip: 'Measure around the fullest part of your chest, keeping the tape level.' },
                          { label: 'Waist', tip: 'Measure around your natural waist, roughly 1" above your navel.' },
                          { label: 'Hips', tip: 'Measure around the widest part of your hips and seat.' },
                          { label: 'Height', tip: 'Stand tall without shoes. Short = <5\'8", Regular = 5\'8"–6\'1", Long = >6\'1".' },
                        ].map(({ label, tip }) => (
                          <div key={label} className="bg-cream-dark/30 p-4">
                            <p className="font-sans text-[10px] tracking-luxury uppercase mb-1">{label}</p>
                            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suit size table */}
                    <div>
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4 text-burgundy">Suit & Coat Sizing</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs font-sans">
                          <thead>
                            <tr className="border-b border-cream-dark">
                              {['Size', 'Chest', 'Waist', 'Hips', 'Height'].map((h) => (
                                <th key={h} className="text-left py-2 pr-4 font-sans text-[10px] tracking-luxury uppercase text-brand-black/50">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {menswearSizes.map((row, i) => (
                              <tr key={row.size} className={`border-b border-cream-dark/50 ${i % 2 === 0 ? 'bg-cream-dark/20' : ''}`}>
                                <td className="py-2.5 pr-4 font-semibold text-burgundy">{row.size}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.chest}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.waist}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.hips}</td>
                                <td className="py-2.5 text-brand-black/70">{row.height}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Polo/knitwear size table */}
                    <div>
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4 text-burgundy">Knitwear & Polos</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs font-sans">
                          <thead>
                            <tr className="border-b border-cream-dark">
                              {['Size', 'Chest', 'Body Length', 'Sleeve'].map((h) => (
                                <th key={h} className="text-left py-2 pr-4 font-sans text-[10px] tracking-luxury uppercase text-brand-black/50">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {menswearPoloSizes.map((row, i) => (
                              <tr key={row.size} className={`border-b border-cream-dark/50 ${i % 2 === 0 ? 'bg-cream-dark/20' : ''}`}>
                                <td className="py-2.5 pr-4 font-semibold text-burgundy">{row.size}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.chest}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.length}</td>
                                <td className="py-2.5 text-brand-black/70">{row.sleeve}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Womenswear */}
                    <div>
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4 text-burgundy">How to Measure</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { label: 'Bust', tip: 'Measure around the fullest part of your chest.' },
                          { label: 'Waist', tip: 'Measure around the narrowest part of your torso.' },
                          { label: 'Hips', tip: 'Measure around the widest part of your hips.' },
                        ].map(({ label, tip }) => (
                          <div key={label} className="bg-cream-dark/30 p-4">
                            <p className="font-sans text-[10px] tracking-luxury uppercase mb-1">{label}</p>
                            <p className="font-sans text-xs text-brand-black/60 leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-sans text-xs tracking-luxury uppercase mb-4 text-burgundy">Size Chart</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs font-sans">
                          <thead>
                            <tr className="border-b border-cream-dark">
                              {['Size', 'Bust', 'Waist', 'Hips', 'UK Size'].map((h) => (
                                <th key={h} className="text-left py-2 pr-4 font-sans text-[10px] tracking-luxury uppercase text-brand-black/50">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {womenswearSizes.map((row, i) => (
                              <tr key={row.size} className={`border-b border-cream-dark/50 ${i % 2 === 0 ? 'bg-cream-dark/20' : ''}`}>
                                <td className="py-2.5 pr-4 font-semibold text-burgundy">{row.size}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.chest}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.waist}</td>
                                <td className="py-2.5 pr-4 text-brand-black/70">{row.hips}</td>
                                <td className="py-2.5 text-brand-black/70">{row.ukSize}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bespoke CTA */}
                <div className="mt-8 pt-8 border-t border-cream-dark text-center">
                  <p className="font-serif text-base text-brand-black/70 mb-3">
                    Between sizes? Our ateliers offer bespoke adjustments.
                  </p>
                  <p className="font-sans text-xs text-brand-black/40 tracking-wide">
                    Contact us at{' '}
                    <span className="text-burgundy">atelier@abyss.com</span>
                    {' '}for a personal consultation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
