import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageTransition from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  title: 'Heritage',
  description: 'The story of ABYSS. Where it came from. What it stands for. Why it endures.',
}

const timeline = [
  {
    year: '1987',
    title: 'The Beginning',
    body: 'Founded in a small Florentine atelier by Alessandro Veri, ABYSS began as a commission-only tailoring house serving a private clientele of industrialists, diplomats, and architects. No advertising. No retail presence. Word of mouth only.',
  },
  {
    year: '1994',
    title: 'The First Collection',
    body: 'Under mounting pressure from existing clients to make the house accessible, ABYSS released its first ready-to-wear collection — 12 pieces, 200 units total. The entire allocation sold in 72 hours to a private subscriber list.',
  },
  {
    year: '2003',
    title: 'The Burgundy Archive',
    body: 'The house commissioned its first signature scarf from a Lyon atelier — the piece that would become the Burgundy Foulard. The hand-rolled hem and heraldic motif set the visual language for everything that followed.',
  },
  {
    year: '2011',
    title: 'The Scottish Accord',
    body: 'ABYSS formalised a decade-long relationship with a cashmere farm in the Outer Hebrides, becoming the sole international buyer of its Grade-A spring clip. This commitment guaranteed both quality and exclusivity.',
  },
  {
    year: '2019',
    title: 'The Digital Presence',
    body: 'After years of deliberate absence, ABYSS launched its online presence — not to grow, but to serve an existing clientele more gracefully. Two collections per year. Limited quantities. The philosophy unchanged.',
  },
  {
    year: 'Today',
    title: 'The Ongoing Work',
    body: 'Every piece released under the ABYSS name is considered for months before it reaches production. The house does not move quickly. It moves correctly.',
  },
]

const craftDetails = [
  {
    title: 'Full Canvas Construction',
    body: 'Every ABYSS jacket and coat is built on a full canvas chest piece, hand-basted to the shell. This is the most labour-intensive construction method in tailoring — and the only one that truly molds to a body over time.',
    image: '/assets/mens_wool_suit_1775376502201.png',
  },
  {
    title: 'Hand-Rolled Hems',
    body: 'Our silk accessories are finished by a single artisan in Lyon who hand-rolls each hem — a process requiring over 40 minutes per piece. The result is a hem that falls differently, moves differently, and speaks louder than any printed edge.',
    image: '/assets/silk_scarf_1775376536545.png',
  },
  {
    title: 'Bias-Cut Precision',
    body: 'The Obsidian Dress is cut entirely on the bias — a technique that requires more fabric, more skill, and more time, but yields a drape that follows the body with liquid precision. No other cut achieves this.',
    image: '/assets/elegant_womens_dress_1775376237419.png',
  },
]

export default function HeritagePage() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative h-[60vh] bg-brand-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/assets/classic_longcoat_1775376253908.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 lg:px-20 max-w-7xl mx-auto">
          <p className="section-subtitle text-cream/50 mb-2">Our Story</p>
          <h1 className="font-serif text-5xl lg:text-7xl text-cream leading-tight">
            Heritage
          </h1>
        </div>
      </div>

      {/* Opening statement */}
      <section className="py-24 lg:py-32 bg-brand-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="divider mb-8" />
          <blockquote className="font-serif text-2xl lg:text-3xl text-brand-black leading-relaxed italic">
            &ldquo;We do not make clothing. We make time — the kind that outlasts trend, season, and fashion&rsquo;s relentless demand for the new.&rdquo;
          </blockquote>
          <p className="font-sans text-xs text-brand-black/40 tracking-luxury uppercase mt-6">
            Alessandro Veri, Founder
          </p>
          <div className="divider mt-8" />
        </div>
      </section>

      {/* Timeline */}
      <section id="history" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-subtitle mb-3">Our Journey</p>
          <h2 className="section-title mb-16">A History of Restraint</h2>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`flex gap-8 lg:gap-16 py-10 border-b border-cream-dark ${
                  i % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-shrink-0 w-24 lg:w-32 pt-1">
                  <p className="font-serif text-2xl lg:text-3xl text-burgundy/40">{item.year}</p>
                </div>
                <div className="flex-1 max-w-xl">
                  <h3 className="font-serif text-xl lg:text-2xl text-brand-black mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-black/60 leading-relaxed tracking-wide">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft section */}
      <section id="craft" className="py-24 lg:py-32 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-subtitle mb-3">How We Work</p>
            <h2 className="section-title">The Craft</h2>
            <div className="divider mt-4" />
          </div>

          <div className="space-y-20 lg:space-y-32">
            {craftDetails.map((item, i) => (
              <div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={`max-w-lg ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="section-subtitle mb-3">0{i + 1}</p>
                  <h3 className="font-serif text-3xl text-brand-black mb-4">{item.title}</h3>
                  <div className="w-8 h-px bg-burgundy mb-6" />
                  <p className="font-sans text-sm text-brand-black/65 leading-relaxed tracking-wide">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-24 bg-brand-black text-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="section-subtitle text-cream/40 mb-3">Our Responsibility</p>
          <h2 className="font-serif text-4xl lg:text-5xl mb-8">Sustainability</h2>
          <div className="divider bg-cream/30 mb-8" />
          <p className="font-sans text-sm text-cream/60 leading-relaxed tracking-wide mb-6">
            Sustainability at ABYSS is not a marketing position. It is the natural result of making things that last. A suit worn for twenty years has an environmental footprint that no fast fashion alternative can approach. We source from farms and ateliers we visit personally. We pay above market rates. We produce in limited quantities. We do not have overstock because we do not produce beyond demand.
          </p>
          <p className="font-sans text-sm text-cream/60 leading-relaxed tracking-wide">
            We are working toward full supply-chain transparency by 2026 and carbon-neutral shipping by the same date. These are not aspirational targets. They are commitments already in motion.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: '100%', label: 'Natural Fibres' },
              { value: '40+', label: 'Hours Per Garment' },
              { value: '2×', label: 'Collections Per Year' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-4xl lg:text-5xl text-cream">{value}</p>
                <p className="font-sans text-[10px] tracking-luxury uppercase text-cream/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="section-subtitle mb-3">Now That You Know Us</p>
          <h2 className="font-serif text-3xl text-brand-black mb-6">
            Discover the Collection
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact the Atelier
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
