export const tg = (window as any).Telegram?.WebApp as (undefined | {
  initData?: string
  initDataUnsafe?: any
  expand?: () => void
  showScanQrPopup?: (params: { text?: string }, cb: (res: { data?: string }) => void) => void
  closeScanQrPopup?: () => void
})

export function getTelegramId(): string | null {
  const id = tg?.initDataUnsafe?.user?.id
  return id ? String(id) : null
}

export function getStartParam(): string | null {
  return tg?.initDataUnsafe?.start_param ?? null
}

export function getInitData(): string | null {
  return tg?.initData ?? null
}
