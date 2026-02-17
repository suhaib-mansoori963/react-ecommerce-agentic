import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/format'

type FormState = {
  fullName: string
  email: string
  address: string
  city: string
  zip: string
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  })

  const canSubmit = useMemo(() => {
    if (items.length === 0) return false
    return (
      form.fullName.trim().length >= 2 &&
      form.email.includes('@') &&
      form.address.trim().length >= 5 &&
      form.city.trim().length >= 2 &&
      form.zip.trim().length >= 3
    )
  }, [items.length, form])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    // Demo checkout: simulate request
    await new Promise((r) => setTimeout(r, 700))
    clearCart()
    navigate('/', { state: { checkoutSuccess: true } })
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-700">Your cart is empty.</div>
          <Link
            to="/shop"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Go to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Enter shipping details and place your order (demo).
          </p>
        </div>
        <div className="text-sm text-slate-700">
          Total: <span className="font-extrabold">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Full name</label>
              <input
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="Jane Doe"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="jane@example.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">Address</label>
              <input
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="123 Main St"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">City</label>
              <input
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="New York"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">ZIP</label>
              <input
                value={form.zip}
                onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-slate-900"
                placeholder="10001"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Placing order...' : 'Place order'}
          </button>

          <Link
            to="/cart"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Back to cart
          </Link>
        </form>

        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-bold text-slate-900">Order summary</div>
          <div className="mt-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {product.title}
                  </div>
                  <div className="text-xs text-slate-600">Qty: {quantity}</div>
                </div>
                <div className="shrink-0 text-sm font-bold text-slate-900">
                  {formatCurrency(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 h-px bg-slate-200" />
          <div className="mt-4 flex items-center justify-between text-sm text-slate-900">
            <span className="font-extrabold">Total</span>
            <span className="font-extrabold">{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

