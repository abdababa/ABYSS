import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/layout/CartDrawer'
import Footer from '@/components/layout/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ABYSS — Minimalist Luxury',
    template: '%s — ABYSS',
  },
  description:
    'ABYSS. Where silence speaks loudest. Garments built for those who need no introduction. Sourced from highland cashmere, Lyonnais silk, and Neapolitan craft.',
  keywords: ['luxury fashion', 'old money', 'minimalist', 'tailoring', 'heritage', 'ABYSS'],
  openGraph: {
    type: 'website',
    siteName: 'ABYSS',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
