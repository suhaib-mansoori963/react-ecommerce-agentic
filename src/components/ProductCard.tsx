import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { formatCurrency } from '../utils/format'
import { useCart } from '../context/CartContext'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="flex aspect-square items-center justify-center bg-slate-50 p-4">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/product/${product.id}`}
            className="line-clamp-2 text-sm font-semibold text-slate-900 hover:underline"
          >
            {product.title}
          </Link>
          <div className="shrink-0 text-sm font-bold text-slate-900">
            {formatCurrency(product.price)}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

