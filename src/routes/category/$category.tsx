import { createFileRoute, Link } from '@tanstack/react-router'
import products, { categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/category/$category')({
  component: CategoryPage,
  loader: ({ params }) => {
    const cat = categories.find((c) => c.id === params.category)
    if (!cat) throw new Error('Category not found')
    const categoryProducts = products.filter((p) => p.category === params.category)
    return { cat, categoryProducts }
  },
})

function CategoryPage() {
  const { cat, categoryProducts } = Route.useLoaderData()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        All Products
      </Link>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white px-8 py-10 mb-10">
        <span className="text-5xl block mb-3">{cat.icon}</span>
        <h1 className="text-3xl font-bold mb-2">{cat.name}</h1>
        <p className="text-indigo-200">{categoryProducts.length} products available</p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-medium">No products in this category yet</p>
          <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Other Categories */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories
            .filter((c) => c.id !== cat.id)
            .map((c) => (
              <Link
                key={c.id}
                to="/category/$category"
                params={{ category: c.id }}
                className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-xs font-medium text-gray-600 text-center">{c.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
