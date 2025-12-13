export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString()
}
