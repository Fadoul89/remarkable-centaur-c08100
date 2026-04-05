export interface Product {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  price: number
  category: string
  badge?: string
  rating: number
  reviews: number
}

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'beauty', name: 'Beauty', icon: '✨' },
  { id: 'books', name: 'Books', icon: '📚' },
]

const products: Array<Product> = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    image: '/placeholder.png',
    description:
      'Experience music like never before with our premium wireless headphones. Featuring advanced active noise cancellation technology, these headphones block out the world so you can focus on what matters. With up to 30 hours of battery life, a comfortable over-ear design, and crystal-clear audio reproduction, these are the perfect companion for travel, work, or leisure.',
    shortDescription: 'Premium wireless headphones with 30hr battery life and active noise cancellation.',
    price: 299,
    category: 'electronics',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 2341,
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    image: '/placeholder.png',
    description:
      'Stay connected and track your health with the Smart Watch Pro. Features include heart rate monitoring, GPS tracking, sleep analysis, and over 100 workout modes. With a stunning AMOLED display and 7-day battery life, this watch keeps up with your lifestyle. Compatible with both iOS and Android.',
    shortDescription: 'Advanced smartwatch with health tracking, GPS, and 7-day battery.',
    price: 249,
    category: 'electronics',
    badge: 'New',
    rating: 4.6,
    reviews: 1876,
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    image: '/placeholder.png',
    description:
      'Fill any room with rich, 360-degree sound from this compact portable speaker. Waterproof and dustproof with an IPX7 rating, it goes wherever you go — beach, pool, or backyard. Enjoy 20 hours of playtime on a single charge and connect multiple speakers for stereo sound.',
    shortDescription: 'Waterproof portable speaker with 360° sound and 20hr playtime.',
    price: 79,
    category: 'electronics',
    rating: 4.5,
    reviews: 3102,
  },
  {
    id: 4,
    name: 'Classic Cotton Crew T-Shirt',
    image: '/placeholder.png',
    description:
      'Our signature crew-neck tee is made from 100% premium ringspun cotton for ultimate softness and comfort. Pre-shrunk for a consistent fit wash after wash. Available in 12 colors, this wardrobe essential pairs perfectly with everything from jeans to chinos. Sustainably sourced and ethically manufactured.',
    shortDescription: '100% ringspun cotton t-shirt, pre-shrunk, available in 12 colors.',
    price: 29,
    category: 'clothing',
    rating: 4.7,
    reviews: 5420,
  },
  {
    id: 5,
    name: 'Slim Fit Chino Pants',
    image: '/placeholder.png',
    description:
      'Versatile slim-fit chinos crafted from a stretch cotton blend for all-day comfort and a polished look. Features a mid-rise waist, zip fly, and four-pocket construction. Machine washable and wrinkle-resistant, these pants go from office to weekend effortlessly. Available in khaki, navy, and olive.',
    shortDescription: 'Stretch cotton slim-fit chinos, wrinkle-resistant, office to weekend.',
    price: 59,
    category: 'clothing',
    badge: 'Sale',
    rating: 4.4,
    reviews: 2189,
  },
  {
    id: 6,
    name: 'Lightweight Running Jacket',
    image: '/placeholder.png',
    description:
      'Stay dry and visible on your runs with this lightweight water-resistant jacket. Features a packable design, reflective details for low-light visibility, and a full zip with a secure pocket for your essentials. The breathable fabric keeps you comfortable even during intense workouts.',
    shortDescription: 'Packable water-resistant running jacket with reflective details.',
    price: 89,
    category: 'clothing',
    rating: 4.6,
    reviews: 987,
  },
  {
    id: 7,
    name: 'Ceramic Pour-Over Coffee Set',
    image: '/placeholder.png',
    description:
      'Elevate your morning ritual with our handcrafted ceramic pour-over coffee set. Includes a gooseneck kettle, ceramic dripper, and glass carafe. The precision-drilled filter basket ensures an even extraction every time. A beautiful addition to any kitchen counter.',
    shortDescription: 'Handcrafted ceramic pour-over set for the perfect morning brew.',
    price: 65,
    category: 'home',
    badge: 'Fan Favorite',
    rating: 4.9,
    reviews: 1543,
  },
  {
    id: 8,
    name: 'Bamboo Cutting Board Set',
    image: '/placeholder.png',
    description:
      'Our set of three bamboo cutting boards brings style and function to your kitchen. Made from sustainable, naturally antibacterial bamboo, these boards are gentle on knife edges and easy to clean. The set includes small, medium, and large boards with non-slip rubber feet.',
    shortDescription: 'Set of 3 sustainable bamboo cutting boards with non-slip feet.',
    price: 45,
    category: 'home',
    rating: 4.5,
    reviews: 2876,
  },
  {
    id: 9,
    name: 'Foam Yoga & Exercise Mat',
    image: '/placeholder.png',
    description:
      'Take your practice anywhere with this extra-thick 6mm non-slip yoga mat. Made from eco-friendly TPE foam, it provides superior cushioning and joint support. Includes alignment lines to improve your form, and comes with a carrying strap. Suitable for yoga, pilates, and general exercise.',
    shortDescription: 'Eco-friendly 6mm non-slip yoga mat with alignment lines.',
    price: 39,
    category: 'sports',
    rating: 4.6,
    reviews: 4231,
  },
  {
    id: 10,
    name: 'Adjustable Dumbbell Set',
    image: '/placeholder.png',
    description:
      'Replace an entire rack of weights with this innovative adjustable dumbbell set. Quickly dial in your desired weight from 5 to 50 lbs in 5 lb increments. The compact design stores neatly when not in use, making it perfect for home gyms. Includes a storage tray.',
    shortDescription: 'Space-saving adjustable dumbbells, 5–50 lbs in 5 lb increments.',
    price: 349,
    category: 'sports',
    badge: 'Top Pick',
    rating: 4.8,
    reviews: 1654,
  },
  {
    id: 11,
    name: 'Vitamin C Brightening Serum',
    image: '/placeholder.png',
    description:
      'Transform your skin with our potent 20% Vitamin C serum. Formulated with stabilized L-ascorbic acid, hyaluronic acid, and Vitamin E, this serum brightens dark spots, evens skin tone, and boosts collagen production. Suitable for all skin types, fragrance-free, and dermatologist-tested.',
    shortDescription: '20% Vitamin C serum that brightens, evens tone, and boosts collagen.',
    price: 48,
    category: 'beauty',
    badge: 'New',
    rating: 4.7,
    reviews: 3298,
  },
  {
    id: 12,
    name: 'The Art of Mindful Living',
    image: '/placeholder.png',
    description:
      'A transformative guide to incorporating mindfulness into every aspect of modern life. Written by renowned mindfulness teacher Dr. Sarah Chen, this bestselling book offers practical exercises, meditations, and real-world strategies for reducing stress, improving focus, and finding joy in everyday moments.',
    shortDescription: 'Bestselling mindfulness guide with practical exercises by Dr. Sarah Chen.',
    price: 19,
    category: 'books',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 7821,
  },
]

export default products
