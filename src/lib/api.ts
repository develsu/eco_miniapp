import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE as string
const VERSION = '0.1.0'

export const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
})

api.interceptors.request.use(cfg => {
  cfg.headers = cfg.headers || {}
  cfg.headers['x-client'] = `miniapp/${VERSION}`
  return cfg
})

export function setInitDataHeader(initData: string | null) {
  if (initData) {
    (api.defaults.headers as any).common = (api.defaults.headers as any).common || {}
    ;(api.defaults.headers as any).common['X-Telegram-Init-Data'] = initData
  }
}
