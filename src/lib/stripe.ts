import { createServerFn } from '@tanstack/react-start'
import products from '@/data/products'

export interface CartLineItem {
  productId: number
  quantity: number
}

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .inputValidator((items: CartLineItem[]) => items)
  .handler(async ({ data: items }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured')
    }
    const { default: Stripe } = await import('stripe')
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) throw new Error(`Product not found: ${item.productId}`)
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.shortDescription,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/success`,
      cancel_url: `${process.env.SITE_URL ?? 'http://localhost:3000'}/checkout/cancel`,
    })

    return session.url
  })
