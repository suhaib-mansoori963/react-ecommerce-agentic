export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {year} E-commerce Shop. Demo store using Fake Store API.
          </div>
          <div className="text-slate-500">Built with React + Vite + Tailwind</div>
        </div>
      </div>
    </footer>
  )
}

