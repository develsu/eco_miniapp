import { create } from 'zustand'
import { getTelegramId } from '../lib/telegram'

type State = {
  telegramId: string | null
  stationId: string | null
  isAdmin: boolean
  setStationId: (id: string | null) => void
}

const ADMIN = (import.meta.env.VITE_ADMIN_IDS || '').split(',').map(s=>s.trim()).filter(Boolean)

export const useAppStore = create<State>((set, get) => ({
  telegramId: getTelegramId(),
  stationId: null,
  isAdmin: ADMIN.includes(String(getTelegramId() || '')),
  setStationId: (id) => set({ stationId: id }),
}))
