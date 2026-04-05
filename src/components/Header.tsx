import { Link } from '@tanstack/react-router'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/store/cart'
import { categories } from '@/data/products'

export function Header() {
  const { totalItems, toggleCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Albasse <span className="text-indigo-600">Shopping</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Shop
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.id}
                to="/category/$category"
                params={{ category: cat.id }}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
            </button>

            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 font-medium py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-gray-700 font-medium py-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>
          <div className="border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Categories</p>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to="/category/$category"
                params={{ category: cat.id }}
                className="block text-gray-600 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
