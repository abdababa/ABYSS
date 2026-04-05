import { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import BrandStatement from '@/components/home/BrandStatement'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import NewsletterSignup from '@/components/home/NewsletterSignup'
import ProductCard from '@/components/shop/ProductCard'
import PageTransition from '@/components/layout/PageTransition'
import { getFeaturedProducts } from '@/data/products'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ABYSS — Minimalist Luxury',
  description: 'Where silence speaks loudest. Garments built for those who need no introduction.',
}

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <PageTransition>
      {/* Hero */}
      <Hero />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Featured Products */}
      <section className="py-24 lg:py-32 bg-brand-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-subtitle mb-2">Signature Pieces</p>
              <h2 className="section-title">The Edit</h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 font-sans text-xs tracking-luxury uppercase text-brand-black/60 hover:text-burgundy transition-colors group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop" className="btn-outline">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <BrandStatement />

      {/* Full-width visual break */}
      <section className="relative h-[50vh] overflow-hidden bg-brand-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/elegant_womens_dress_1775376237419.png')" }}
        />
        <div className="absolute inset-0 bg-brand-black/55" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="font-sans text-[10px] tracking-luxury uppercase text-cream/50 mb-4">
              Timeless. Considered. Yours.
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl text-cream leading-tight max-w-2xl mx-auto">
              Crafted for those who understand the value of restraint.
            </h2>
            <Link href="/shop" className="btn-primary mt-10 inline-flex">
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Newsletter */}
      <NewsletterSignup />
    </PageTransition>
  )
}
