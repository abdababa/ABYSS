import { Metadata } from 'next'
import ShopClient from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'The complete ABYSS collection. Menswear, Womenswear, and Accessories.',
}

export default function ShopPage() {
  return <ShopClient initialCategory="" />
}
