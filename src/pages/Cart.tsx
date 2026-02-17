import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

export default function Cart() {
  const { items, subtotal, addToCart, decreaseQty, removeFromCart } = useCart()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Your cart
          </h1>
          <p className="mt-1 text-sm text-slate-600">Review items before checkout</p>
        </div>
        <div className="text-sm text-slate-700">
          Subtotal: <span className="font-extrabold">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-700">Your cart is empty.</div>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
                >
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{product.title}</div>
                        <div className="mt-1 text-xs text-slate-600">{product.category}</div>
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {formatCurrency(product.price)}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white">
                        <button
                          type="button"
                          onClick={() => decreaseQty(product.id)}
                          className="px-3 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
                        >
                          −
                        </button>
                        <div className="min-w-10 px-3 py-2 text-center text-sm font-semibold text-slate-800">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="px-3 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold text-slate-700">
                          Line: {formatCurrency(product.price * quantity)}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-sm font-semibold text-red-700 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-bold text-slate-900">Order summary</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-slate-700">
                <span>Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Shipping</span>
                <span className="font-semibold">{formatCurrency(0)}</span>
              </div>
              <div className="h-px bg-slate-200" />
              <div className="flex items-center justify-between text-slate-900">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold">{formatCurrency(subtotal)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Checkout
            </Link>

            <Link
              to="/shop"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

