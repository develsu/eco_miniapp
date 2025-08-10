import { api } from './api'

let lastSend = 0

function send(message: string) {
  const now = Date.now()
  if (now - lastSend < 15000) return
  lastSend = now
  api.post('/api/debugEcho', { message }).catch(() => {})
}

export function initLogger() {
  window.addEventListener('error', e => {
    send(e.message)
  })
  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    send(String(e.reason))
  })
}
