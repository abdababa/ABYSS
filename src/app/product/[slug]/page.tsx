import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageTransition from '@/components/layout/PageTransition'
import ProductGallery from '@/components/pdp/ProductGallery'
import ProductInfo from '@/components/pdp/ProductInfo'
import ProductCard from '@/components/shop/ProductCard'
import { getProductBySlug, products } from '@/data/products'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3)

  const others = related.length < 3
    ? [...related, ...products.filter((p) => p.id !== product.id && !related.find(r => r.id === p.id)).slice(0, 3 - related.length)]
    : related

  return (
    <PageTransition>
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-4">
        <div className="flex items-center gap-2 font-sans text-[10px] tracking-luxury uppercase text-brand-black/40">
          <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-burgundy transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-burgundy transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-brand-black/70">{product.name}</span>
        </div>
      </nav>

      {/* PDP main layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <ProductGallery product={product} />

          {/* Info */}
          <div className="lg:pt-2">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* Related products */}
      {others.length > 0 && (
        <section className="border-t border-cream-dark bg-cream-dark/30 py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="section-subtitle mb-1">You May Also Consider</p>
                <h2 className="font-serif text-2xl text-brand-black">Curated For You</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 font-sans text-xs tracking-luxury uppercase text-brand-black/50 hover:text-burgundy transition-colors group"
              >
                All Pieces
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {others.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
