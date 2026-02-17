import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-semibold transition ${
          isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            A
          </span>
          <span className="tracking-tight">Agentic Shop</span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/shop" label="Shop" />
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Cart
            <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
              {cartCount}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

