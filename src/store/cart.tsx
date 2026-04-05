import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { Product } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_OPEN'; open: boolean }
  | { type: 'HYDRATE'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const qty = action.quantity ?? 1
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: qty }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'SET_OPEN':
      return { ...state, isOpen: action.open }
    case 'HYDRATE':
      return { ...state, items: action.items }
    default:
      return state
  }
}

interface CartContextValue {
  state: CartState
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'albasse-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        dispatch({ type: 'HYDRATE', items: JSON.parse(saved) })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product, quantity) => dispatch({ type: 'ADD_ITEM', product, quantity }),
        removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
        updateQuantity: (productId, quantity) =>
          dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
        toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
        setCartOpen: (open) => dispatch({ type: 'SET_OPEN', open }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
