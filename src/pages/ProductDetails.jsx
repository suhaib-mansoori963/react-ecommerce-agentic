import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProductById } from '../api/fakestore.js'
import { ErrorState } from '../components/ErrorState.jsx'
import { Loader } from '../components/Loader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/format.js'

export default function ProductDetails() {
  const params = useParams()
  const id = useMemo(() => Number(params.id), [params.id])
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const load = () => {
    if (!Number.isFinite(id)) {
      setError('Invalid product id')
      return () => {}
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetchProductById(id, controller.signal)
      .then((data) => setProduct(data))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))

    return () => controller.abort()
  }

  useEffect(() => load(), [id])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 text-sm">
        <Link to="/shop" className="font-semibold text-slate-700 hover:underline">
          ← Back to shop
        </Link>
      </div>

      {loading ? <Loader /> : null}
      {error ? <ErrorState message={error} onRetry={load} /> : null}

      {!loading && !error && product ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex aspect-square items-center justify-center bg-slate-50 p-6">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <div>
            <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {product.category}
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="text-2xl font-extrabold text-slate-900">
                {formatCurrency(product.price)}
              </div>
              <div className="text-sm text-slate-600">
                Rating:{' '}
                <span className="font-semibold">{product.rating?.rate ?? 0}</span> (
                {product.rating?.count ?? 0})
              </div>
            </div>

            <p className="mt-5 leading-7 text-slate-700">{product.description}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Add to cart
              </button>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Go to cart
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

