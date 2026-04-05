import { Link, createFileRoute } from '@tanstack/react-router'
import { XCircle } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout Cancelled</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your payment was cancelled. No charges were made. Your cart items are still saved — continue shopping whenever you are ready.
        </p>
        <div className="space-y-3">
          <Link
            to="/products"
            className="block w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="block w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
