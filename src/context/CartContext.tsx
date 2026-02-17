import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  cartCount: number
  subtotal: number
  addToCart: (product: Product, quantity?: number) => void
  decreaseQty: (productId: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'agentic_cart_v1'

function readInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readInitialCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore quota / privacy mode failures
    }
  }, [items])

  const cartCount = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.quantity, 0),
    [items],
  )

  const addToCart = (product: Product, quantity = 1) => {
    const safeQty = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.product.id === product.id)
      if (idx === -1) return [...prev, { product, quantity: safeQty }]
      const next = prev.slice()
      next[idx] = { ...next[idx], quantity: next[idx].quantity + safeQty }
      return next
    })
  }

  const decreaseQty = (productId: number) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.product.id === productId)
      if (idx === -1) return prev
      const item = prev[idx]
      if (item.quantity <= 1) return prev.filter((p) => p.product.id !== productId)
      const next = prev.slice()
      next[idx] = { ...item, quantity: item.quantity - 1 }
      return next
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((p) => p.product.id !== productId))
  }

  const clearCart = () => setItems([])

  const value: CartContextValue = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      addToCart,
      decreaseQty,
      removeFromCart,
      clearCart,
    }),
    [items, cartCount, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

