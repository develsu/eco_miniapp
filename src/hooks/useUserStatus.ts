import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useAppStore } from '../state/useAppStore'

export type UserStatus = {
  registered: boolean
  full_name?: string
  phone?: string
  iin?: string
  plan?: string
  batteryId?: string
  startDate?: string
  endDate?: string
  rentalType?: string
  rentalStartDate?: string
  rentalEndDate?: string
  contractUrl?: string
  last_location?: { lat: number, lon: number, accuracy?: number } | null
  subscriptionActive?: boolean
}

export function useUserStatus(pollMs?: number) {
  const telegramId = useAppStore(s=>s.telegramId)
  return useQuery({
    queryKey: ['userStatus', telegramId],
    queryFn: async () => {
      const { data } = await api.get('/getUserStatus', { params: { telegram_id: telegramId } })
      return data as UserStatus
    },
    enabled: !!telegramId,
    refetchInterval: pollMs,
  })
}
