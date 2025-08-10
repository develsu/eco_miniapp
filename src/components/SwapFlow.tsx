import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useAppStore } from '../state/useAppStore'
import { useUserStatus } from '../hooks/useUserStatus'

export default function SwapFlow({ stationId }: { stationId: string }) {
  const telegramId = useAppStore(s=>s.telegramId)
  const qc = useQueryClient()
  const [info, setInfo] = React.useState<any>(null)
  const [poll, setPoll] = React.useState(false)

  const requestSwap = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post('/requestSwap', { telegram_id: telegramId, station_id: stationId })
        return data
      } catch (e:any) {
        const { data } = await api.post('/swapBattery', { telegram_id: telegramId, station_id: stationId })
        return data
      }
    },
    onSuccess: (data) => {
      setInfo(data)
      setPoll(true)
    },
    onError: (e:any) => {
      alert(e?.response?.data?.message || e.message || 'Ошибка запроса')
    }
  })

  React.useEffect(() => {
    if (!poll) return
    const started = Date.now()
    const t = setInterval(async () => {
      await qc.invalidateQueries({ queryKey: ['userStatus', telegramId] })
      const now = Date.now()
      if (now - started > 60000) setPoll(false)
    }, 5000)
    return () => clearInterval(t)
  }, [poll, qc, telegramId])

  useUserStatus(poll ? 5000 : undefined)

  return <div className="card space-y-3">
    <div className="text-lg font-semibold">Станция {stationId}</div>
    <button className="btn btn-primary w-full" onClick={()=>requestSwap.mutate()} disabled={requestSwap.isPending}>
      {requestSwap.isPending ? 'Отправляем команду…' : 'Получить заряженный АКБ'}
    </button>
    {info && <pre className="mono text-xs overflow-auto">{JSON.stringify(info, null, 2)}</pre>}
    {poll && <div className="text-sm text-slate-400">Ждём подтверждения станции…</div>}
  </div>
}
