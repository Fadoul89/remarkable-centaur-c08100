import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useCart } from '@/store/cart'
import { createCheckoutSession } from '@/lib/stripe'
import { useState } from 'react'

export function CartDrawer() {
  const { state, removeItem, updateQuantity, setCartOpen, totalPrice, totalItems } = useCart()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (state.items.length === 0) return
    setLoading(true)
    try {
      const cartItems = state.items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
      const url = await createCheckoutSession({ data: cartItems })
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">
              Your Cart {totalItems > 0 && <span className="text-gray-400 font-normal">({totalItems})</span>}
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to get started</p>
              <Link
                to="/products"
                onClick={() => setCartOpen(false)}
                className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-4 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/products/$productId"
                      params={{ productId: item.product.id.toString() }}
                      onClick={() => setCartOpen(false)}
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 line-clamp-2 block"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-indigo-600 font-bold mt-1">${item.product.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors rounded-l-lg"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 transition-colors rounded-r-lg"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              {loading ? 'Redirecting to Checkout...' : 'Checkout'}
            </button>
            <Link
              to="/products"
              onClick={() => setCartOpen(false)}
              className="block text-center text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
