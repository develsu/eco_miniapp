import React from 'react'
import { useUserStatus } from '../hooks/useUserStatus'
import { useTranslation } from 'react-i18next'

export default function StatusCard() {
  const { t } = useTranslation()
  const { data, isLoading, error, refetch } = useUserStatus()
  if (isLoading) return <div className="card">{t('checking_access')}</div>
  if (error) return <div className="card">{t('error')}: {(error as any).message}</div>
  if (!data) return null

  if (!data.registered) {
    return <div className="card space-y-3">
      <div className="font-semibold text-lg">{t('register')}</div>
      <div>{t('not_registered')}</div>
      <a className="btn btn-primary" href="#" onClick={e=>{e.preventDefault(); document.getElementById('reg-form')?.scrollIntoView({behavior:'smooth'})}}>{t('fill_form')}</a>
    </div>
  }

  const sub = (data.startDate && data.endDate) || data.subscriptionActive ? t('active') : t('none')
  return <div className="card space-y-2">
    <div className="font-semibold text-lg">{t('status')}</div>
    <div>{t('full_name')}: <b>{data.full_name || '—'}</b></div>
    <div>{t('plan')}: <b>{data.plan || '—'}</b> ({t('subscription')}: <b>{sub}</b>)</div>
    <div>{t('rental')}: <b>{data.rentalType || '—'}</b></div>
    <div>{t('battery')}: <b>{data.batteryId || '—'}</b></div>
    <div className="text-slate-400 text-sm">{t('refresh')}: <button className="btn" onClick={()=>refetch()}>{t('refresh')}</button></div>
  </div>
}
