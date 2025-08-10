import React from 'react'
import { useUserStatus } from '../hooks/useUserStatus'

export default function StatusCard() {
  const { data, isLoading, error, refetch } = useUserStatus()
  if (isLoading) return <div className="card">Проверяем доступ…</div>
  if (error) return <div className="card">Ошибка: {(error as any).message}</div>
  if (!data) return null

  if (!data.registered) {
    return <div className="card space-y-3">
      <div className="font-semibold text-lg">Регистрация</div>
      <div>Похоже, вы не зарегистрированы.</div>
      <a className="btn btn-primary" href="#" onClick={e=>{e.preventDefault(); document.getElementById('reg-form')?.scrollIntoView({behavior:'smooth'})}}>Заполнить форму</a>
    </div>
  }

  const sub = (data.startDate && data.endDate) || data.subscriptionActive ? 'активна' : 'нет'
  return <div className="card space-y-2">
    <div className="font-semibold text-lg">Статус</div>
    <div>ФИО: <b>{data.full_name || '—'}</b></div>
    <div>Тариф: <b>{data.plan || '—'}</b> (подписка: <b>{sub}</b>)</div>
    <div>Аренда: <b>{data.rentalType || '—'}</b></div>
    <div>Батарея: <b>{data.batteryId || '—'}</b></div>
    <div className="text-slate-400 text-sm">Обновить: <button className="btn" onClick={()=>refetch()}>Обновить</button></div>
  </div>
}
