import { Link } from '@tanstack/react-router'
import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '@/data/products'
import { useCart } from '@/store/cart'

export function ProductCard({ product }: { product: Product }) {
  const { addItem, setCartOpen } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setCartOpen(true)
  }

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-white shadow-md p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-indigo-600 hover:text-white text-gray-700"
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1 capitalize">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(product.rating) ? 'fill-current' : 'text-gray-200 fill-current'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
        </div>
      </div>
    </Link>
  )
}
