import { createFileRoute, useNavigate } from '@tanstack/react-router'
import products, { categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { z } from 'zod'
import { SlidersHorizontal } from 'lucide-react'

const searchSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(['default', 'price-asc', 'price-desc', 'rating']).optional(),
})

export const Route = createFileRoute('/products/')({
  validateSearch: searchSchema,
  component: ProductsPage,
})

function ProductsPage() {
  const { category, sort = 'default' } = Route.useSearch()
  const navigate = useNavigate({ from: '/products/' })

  let filtered = category ? products.filter((p) => p.category === category) : products

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  const activeCategory = categories.find((c) => c.id === category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {activeCategory ? `${activeCategory.icon} ${activeCategory.name}` : 'All Products'}
        </h1>
        <p className="text-gray-500 mt-1">{filtered.length} products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal size={16} className="text-gray-500" />
              <span className="font-semibold text-gray-900 text-sm">Filters</span>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</p>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => navigate({ search: (prev) => ({ ...prev, category: undefined }) })}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      !category ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => navigate({ search: (prev) => ({ ...prev, category: cat.id }) })}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat.id
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sort By</p>
              <select
                value={sort}
                onChange={(e) =>
                  navigate({
                    search: (prev) => ({ ...prev, sort: e.target.value as typeof sort }),
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium">No products found</p>
              <button
                onClick={() => navigate({ search: {} })}
                className="mt-4 text-indigo-600 hover:underline text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
