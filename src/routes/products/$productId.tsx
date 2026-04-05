import { Link, createFileRoute } from '@tanstack/react-router'
import products from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/store/cart'
import { Star, ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { createCheckoutSession } from '@/lib/stripe'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const product = products.find((p) => p.id === +params.productId)
    if (!product) throw new Error('Product not found')
    return product
  },
})

function ProductDetailPage() {
  const product = Route.useLoaderData()
  const { addItem, setCartOpen } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setCartOpen(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = async () => {
    setCheckoutLoading(true)
    try {
      const url = await createCheckoutSession({
        data: [{ productId: product.id, quantity }],
      })
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Shop
      </Link>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative bg-gray-50 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col">
            <p className="text-indigo-600 font-medium text-sm uppercase tracking-wide capitalize mb-2">
              {product.category}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.rating) ? 'fill-current' : 'text-gray-200 fill-current'}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                <span className="text-gray-400 text-sm">USD</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-5 py-2 font-semibold border-x border-gray-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-indigo-600 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <ShoppingCart size={18} />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={checkoutLoading}
                  className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-wait"
                >
                  {checkoutLoading ? 'Redirecting...' : 'Buy Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
