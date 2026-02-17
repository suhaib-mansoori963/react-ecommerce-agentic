import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/fakestore.js'
import { ErrorState } from '../components/ErrorState.jsx'
import { Loader } from '../components/Loader.jsx'
import { ProductCard } from '../components/ProductCard.jsx'

export default function Home() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const featured = useMemo(() => (products ? products.slice(0, 4) : []), [products])

  const load = () => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchProducts(controller.signal)
      .then((data) => setProducts(data))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }

  useEffect(() => load(), [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Shop smarter with a clean, fast demo store.
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Browse featured products, view details, and manage your cart with Context API.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Start shopping
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View cart
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-700">Featured picks</div>
          <div className="mt-4">
            {loading ? <Loader /> : null}
            {error ? <ErrorState message={error} onRetry={load} /> : null}
            {!loading && !error && featured.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {featured.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

