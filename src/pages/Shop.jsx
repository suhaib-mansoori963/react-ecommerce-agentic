import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../api/fakestore.js'
import { ErrorState } from '../components/ErrorState.jsx'
import { Loader } from '../components/Loader.jsx'
import { ProductCard } from '../components/ProductCard.jsx'

export default function Shop() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!products) return []
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }, [products, query])

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Shop
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            All products from Fake Store API
          </p>
        </div>
        <div className="w-full sm:w-80">
          <label className="text-xs font-semibold text-slate-700">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: jacket, electronics..."
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-900"
          />
        </div>
      </div>

      <div className="mt-6">
        {loading ? <Loader /> : null}
        {error ? <ErrorState message={error} onRetry={load} /> : null}

        {!loading && !error && products ? (
          filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
              No products match your search.
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}

