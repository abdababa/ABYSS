export interface Product {
  id: number
  slug: string
  name: string
  category: 'Menswear' | 'Womenswear' | 'Accessories'
  price: number
  originalPrice?: number
  images: string[]
  shortDescription: string
  description: string
  details: string[]
  origin: string
  fabric: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export type CheckoutStep = 'cart' | 'information' | 'shipping' | 'payment' | 'confirmation'

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  days: string
}

export interface CheckoutForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  shippingMethod: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
}
