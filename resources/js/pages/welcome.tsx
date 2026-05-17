import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

// ==========================================
// MOCK DATA
// ==========================================
const PRODUCTS: Product[] = [
  { id: 1, name: 'Minimalist Wireless Headphones', price: 129, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', rating: 4.8 },
  { id: 2, name: 'Mechanical Gaming Keyboard', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80', rating: 4.5 },
  { id: 3, name: 'Ergonomic Wireless Mouse', price: 59, category: 'Accessories', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80', rating: 4.7 },
  { id: 4, name: 'Smart Fitness Watch Pro', price: 199, category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', rating: 4.9 },
  { id: 5, name: 'Noise Cancelling Earbuds', price: 79, category: 'Audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', rating: 4.4 },
  { id: 6, name: 'Ultra-Wide 4K Monitor', price: 449, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80', rating: 4.6 },
];

const CATEGORIES: string[] = ['All', 'Audio', 'Accessories', 'Wearables', 'Displays'];

export default function WelcomePage(): React.JSX.Element {
  const { auth } = usePage().props as any;
  
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // ==========================================
  // CART ACTIONS
  // ==========================================
  const addToCart = (product: Product): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open drawer automatically on add
  };

  const updateQuantity = (id: number, delta: number): void => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // ==========================================
  // COMPUTED PROPERTIES
  // ==========================================
  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight text-slate-900">
            NEXUS<span className="text-blue-600">LABS</span>
          </div>
          
          <nav className="hidden space-x-8 md:flex">
            <a href="#shop" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Shop</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Features</a>
            <a href="#support" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition">Support</a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
          >
            <span>Cart</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </button>

          {/* AUTH NAVIGATION */}
          <div className="flex items-center gap-3">
            {auth?.user ? (
              <>
                <Link href="/profile" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
                  {auth.user.name}
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition border border-red-200"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
                  Sign in
                </Link>
                <Link href="/signup" className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mb-6">
                Next-Gen Ecosystem
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                Upgrade your workflow setup.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Engineered for maximum performance and minimalist aesthetics. Experience responsive hardware that keeps pace with your logic.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#shop"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition"
                >
                  Explore Collection
                </a>
                <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Workspace setup detailing high-end electronics"
                className="w-full rounded-2xl bg-slate-100 object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* E-COMMERCE ENGINE SECTION */}
      <main id="shop" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured Products</h2>
            <p className="mt-2 text-sm text-slate-500">Premium peripherals calibrated for extreme focus.</p>
          </div>
          
          {/* CATEGORY FILTER PILLS */}
          <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-2 text-xs font-medium tracking-wide uppercase transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-xl bg-slate-100 group-hover:opacity-90 transition">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between pt-4">
                <div>
                  <p className="text-xs text-slate-400 tracking-wider uppercase font-medium">{product.category}</p>
                  <h3 className="text-sm font-semibold text-slate-900 mt-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-amber-500 text-sm">★</span>
                    <span className="text-xs font-medium text-slate-600">{product.rating}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-lg font-bold text-slate-900">${product.price}.00</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer id="support" className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 NEXUSLABS Ecosystem. All rights reserved.</p>
      </footer>

      {/* SIDEBAR CART DRAWER SYSTEM */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-6 sm:px-6">
                <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-500 text-xl font-bold">×</button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
                {cart.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-12">Your cart is empty. Explore the shop to add peripherals.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex py-4 border-b border-slate-100 last:border-0">
                      <img src={item.image} alt={item.name} className="h-16 w-16 flex-shrink-0 rounded-lg bg-slate-100 object-cover" />
                      <div className="ml-4 flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</h4>
                          <p className="mt-1 text-xs text-slate-500">${item.price}.00 each</p>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-slate-500 hover:text-slate-900 font-bold">-</button>
                            <span className="font-medium text-slate-800">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-slate-500 hover:text-slate-900 font-bold">+</button>
                          </div>
                          <span className="font-bold text-slate-900">${item.price * item.quantity}.00</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-200 px-4 py-6 sm:px-6 bg-slate-50">
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <p>Subtotal</p>
                  <p>${cartTotal}.00</p>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    disabled={cart.length === 0}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}