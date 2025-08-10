import React from 'react'
import { useParams } from 'react-router-dom'
import SwapFlow from '../components/SwapFlow'
import { useUserStatus } from '../hooks/useUserStatus'

export default function Station() {
  const { id } = useParams<{ id: string }>()
  const { data } = useUserStatus()

  if (!id) return <div className="card">Нет station_id</div>
  const hasAccess = data?.plan || data?.rentalType
  if (!hasAccess) {
    return <div className="card space-y-2">
      <div className="text-lg font-semibold">Нет доступа</div>
      <div>Активируйте тариф или аренду, затем повторите попытку.</div>
    </div>
  }

  return <SwapFlow stationId={id} />
}
