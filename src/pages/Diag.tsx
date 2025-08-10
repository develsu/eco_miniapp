import React from 'react'
import { useAppStore } from '../state/useAppStore'
import { api } from '../lib/api'
import { useSearchParams } from 'react-router-dom'

export default function Diag() {
  const isAdmin = useAppStore(s=>s.isAdmin)
  const [sp] = useSearchParams()
  const [station, setStation] = React.useState(sp.get('station') || 'eco_01')
  const [log, setLog] = React.useState<string>('')

  if (!isAdmin) return <div className="card">Доступ только для админов</div>

  const append = (x:any) => setLog(l => l + `\n` + (typeof x === 'string' ? x : JSON.stringify(x)))

  const getStatus = async () => {
    const { data } = await api.get('/getUserStatus', { params: { telegram_id: useAppStore.getState().telegramId } })
    append(data)
  }
  const getCmd = async () => {
    const { data } = await api.get('/getStationCommand', { params: { station_id: station } })
    append(data)
  }
  const clearCmd = async () => {
    const { data } = await api.post('/api/clearStationCommand', { station_id: station })
    append(data)
  }
  const completeSwap = async () => {
    const { data } = await api.post('/completeSwap', { station_id: station, cell: 1, battery_id: 'TEST', uid: 'TEST_UID' })
    append(data)
  }

  return <div className="space-y-3">
    <div className="card space-y-2">
      <div className="text-lg font-semibold">Диагностика станции</div>
      <input className="w-full p-2 rounded-xl border border-slate-700 bg-slate-900"
             value={station} onChange={e=>setStation(e.target.value)} placeholder="station_id" />
      <div className="grid grid-cols-2 gap-2">
        <button className="btn" onClick={getStatus}>getUserStatus</button>
        <button className="btn" onClick={getCmd}>getStationCommand</button>
        <button className="btn" onClick={clearCmd}>clearStationCommand</button>
        <button className="btn" onClick={completeSwap}>completeSwap</button>
      </div>
    </div>
    <pre className="card mono text-xs whitespace-pre-wrap min-h-40">{log}</pre>
  </div>
}
