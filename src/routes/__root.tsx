import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartProvider } from '@/store/cart'
import { Header } from '@/components/Header'
import { CartDrawer } from '@/components/CartDrawer'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Albasse Shopping' },
      { name: 'description', content: 'Shop the best products at Albasse Shopping' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">A</span>
              </div>
              <span className="text-white font-bold text-lg">Albasse Shopping</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted destination for quality products across every category. Shop with confidence.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="/category/electronics" className="hover:text-white transition-colors">Electronics</a></li>
              <li><a href="/category/clothing" className="hover:text-white transition-colors">Clothing</a></li>
              <li><a href="/category/home" className="hover:text-white transition-colors">Home & Garden</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-default">Returns & Exchanges</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Shipping Info</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Contact Us</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Albasse Shopping. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
