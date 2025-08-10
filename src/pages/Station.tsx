import React from 'react'
import { useParams } from 'react-router-dom'
import SwapFlow from '../components/SwapFlow'
import { useUserStatus } from '../hooks/useUserStatus'
import { useTranslation } from 'react-i18next'

export default function Station() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { data } = useUserStatus()

  if (!id) return <div className="card">{t('no_station_id')}</div>
  const hasAccess = data?.plan || data?.rentalType
  if (!hasAccess) {
    return <div className="card space-y-2">
      <div className="text-lg font-semibold">{t('access_denied')}</div>
      <div>{t('no_access_descr')}</div>
    </div>
  }

  return <SwapFlow stationId={id} />
}
