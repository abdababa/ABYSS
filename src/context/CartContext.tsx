'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color } = action.payload
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product, size, color, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.payload.productId && i.size === action.payload.size
              ? { ...i, quantity: action.payload.quantity }
              : i
          )
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem: (p, s, c) => dispatch({ type: 'ADD_ITEM', payload: { product: p, size: s, color: c } }),
        removeItem: (id, s) => dispatch({ type: 'REMOVE_ITEM', payload: { productId: id, size: s } }),
        updateQuantity: (id, s, q) =>
          dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: id, size: s, quantity: q } }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        openCart: () => dispatch({ type: 'OPEN_CART' }),
        closeCart: () => dispatch({ type: 'CLOSE_CART' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
