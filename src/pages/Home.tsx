import React from 'react'
import StatusCard from '../components/StatusCard'
import RegisterForm from '../components/RegisterForm'
import ScannerButton from '../components/ScannerButton'
import BatteryMap from '../components/BatteryMap'
import { setInitDataHeader } from '../lib/api'
import { getInitData, getStartParam } from '../lib/telegram'
import { useAppStore } from '../state/useAppStore'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const nav = useNavigate()
  const setStationId = useAppStore(s=>s.setStationId)
  React.useEffect(()=>{
    setInitDataHeader(getInitData())
    const st = getStartParam()
    if (st) { setStationId(st); nav(`/station/${encodeURIComponent(st)}`, { replace:true }) }
  },[])

  return <div className="space-y-3">
    <StatusCard />
    <RegisterForm />
    <BatteryMap />
    <ScannerButton />
  </div>
}
