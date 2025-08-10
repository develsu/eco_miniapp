import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useAppStore } from '../state/useAppStore'
import { useUserStatus } from '../hooks/useUserStatus'
import { useTranslation } from 'react-i18next'

export default function SwapFlow({ stationId }: { stationId: string }) {
  const telegramId = useAppStore(s => s.telegramId)
  const qc = useQueryClient()
  const { t } = useTranslation()
  const [info, setInfo] = React.useState<any>(null)
  const [poll, setPoll] = React.useState(false)
  const [seconds, setSeconds] = React.useState(60)
  const [done, setDone] = React.useState(false)
  const startBattery = React.useRef<string | undefined>(undefined)

  const { data: status } = useUserStatus(poll ? 5000 : undefined)

  const requestSwap = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/requestSwap', { telegram_id: telegramId, station_id: stationId })
      return data
    },
    onSuccess: data => {
      setInfo(data)
      startBattery.current = status?.batteryId
      setPoll(true)
      setSeconds(60)
    },
    onError: (e: any) => {
      alert(e?.response?.data?.message || e.message || 'Ошибка запроса')
    },
  })

  // countdown timer
  React.useEffect(() => {
    if (!poll) return
    const t = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setPoll(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [poll])

  // detect battery change
  React.useEffect(() => {
    if (!poll) return
    if (status && status.batteryId && startBattery.current && status.batteryId !== startBattery.current) {
      setDone(true)
      setPoll(false)
    }
  }, [status, poll])

  // refresh user status every 5s while polling
  React.useEffect(() => {
    if (!poll) return
    const t = setInterval(async () => {
      await qc.invalidateQueries({ queryKey: ['userStatus', telegramId] })
    }, 5000)
    return () => clearInterval(t)
  }, [poll, qc, telegramId])

  return (
    <div className="card space-y-3">
      <div className="text-lg font-semibold">{t('station')} {stationId}</div>
      {!info && (
        <button className="btn btn-primary w-full" onClick={() => requestSwap.mutate()} disabled={requestSwap.isPending}>
          {requestSwap.isPending ? t('sending_command') : t('get_charged')}
        </button>
      )}
      {info && !done && (
        <>
          <div>{t('go_to_cell', { cell: info.cell })}</div>
          <div className="text-sm text-slate-400">{t('seconds_left', { count: seconds })}</div>
        </>
      )}
      {done && <div>{t('swap_complete')}</div>}
      {info && <pre className="mono text-xs overflow-auto">{JSON.stringify(info, null, 2)}</pre>}
    </div>
  )
}
