import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetails from './pages/ProductDetails'
import Shop from './pages/Shop'

function CheckoutSuccessBanner() {
  const location = useLocation()
  const success = Boolean((location.state as { checkoutSuccess?: boolean } | null)?.checkoutSuccess)

  if (!success) return null

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
        <div className="font-semibold">Order placed (demo)</div>
        <div className="mt-1 text-sm text-emerald-800">
          Thanks! Your cart has been cleared.
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <CheckoutSuccessBanner />
      <main className="min-h-[calc(100dvh-64px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

