import { Link, createFileRoute } from '@tanstack/react-router'
import products, { categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ArrowRight, ShieldCheck, Truck, RotateCcw, HeadphonesIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const featuredProducts = products.filter((p) => p.badge).slice(0, 4)

const perks = [
  { icon: <Truck size={24} />, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: <RotateCcw size={24} />, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: <ShieldCheck size={24} />, title: 'Secure Payment', desc: 'Your data is protected' },
  { icon: <HeadphonesIcon size={24} />, title: '24/7 Support', desc: 'We are here to help' },
]

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              New Arrivals — Spring 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Shop smarter.<br />
              <span className="text-indigo-200">Live better.</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed">
              Discover thousands of products handpicked for quality and value. From electronics to fashion, we have got everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/category/$category"
                params={{ category: 'electronics' }}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                Explore Electronics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3">
                <div className="text-indigo-600 flex-shrink-0">{perk.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{perk.title}</p>
                  <p className="text-gray-500 text-xs">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link
            to="/products"
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 text-sm"
          >
            All products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/category/$category"
              params={{ category: cat.id }}
              className="group flex flex-col items-center gap-3 bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-400 hover:shadow-md transition-all duration-200"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Our most popular picks this season</p>
            </div>
            <Link
              to="/products"
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 text-sm"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Full Catalog</h2>
            <p className="text-gray-500 mt-1">Quality products across every category</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-indigo-200 text-lg mb-8">Join thousands of happy customers and find your perfect products today.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Browse the Store <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
