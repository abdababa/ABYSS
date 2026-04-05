import { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'The complete ABYSS collection. Menswear, Womenswear, and Accessories.',
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams
  return <ShopClient initialCategory={category || ''} />
}
