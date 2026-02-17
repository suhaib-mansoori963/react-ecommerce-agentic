export function formatCurrency(value) {
  const safe = Number.isFinite(value) ? value : 0
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    safe,
  )
}

