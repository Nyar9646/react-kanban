export function randomId() {
  const numalphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-'
  let id = ''

  for (let i = 12; i > 0; i--) {
    id += numalphabet[Math.random() * 64 | 0]
  }

  return id
}