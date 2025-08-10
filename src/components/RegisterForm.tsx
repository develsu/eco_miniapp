import React from 'react'
import { api } from '../lib/api'
import { useAppStore } from '../state/useAppStore'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function RegisterForm(){
  const { t } = useTranslation()
  const telegramId = useAppStore(s=>s.telegramId)
  const qc = useQueryClient()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      telegram_id: telegramId,
      full_name: String(fd.get('full_name')||''),
      iin: String(fd.get('iin')||''),
      phone: String(fd.get('phone')||''),
      birth_year: Number(fd.get('birth_year')||0),
    }
    await api.post('/registerUser', payload)
    await qc.invalidateQueries({ queryKey: ['userStatus', telegramId] })
  }
  return <form id="reg-form" className="card space-y-2" onSubmit={onSubmit}>
    <div className="text-lg font-semibold">{t('register')}</div>
    <label className="block"><span>{t('full_name')}</span><input name="full_name" className="w-full p-2 rounded-xl border border-slate-700 bg-slate-900" required/></label>
    <label className="block"><span>{t('birth_year')}</span><input name="birth_year" type="number" className="w-full p-2 rounded-xl border border-slate-700 bg-slate-900" required/></label>
    <label className="block"><span>{t('iin')}</span><input name="iin" className="w-full p-2 rounded-xl border border-slate-700 bg-slate-900" required/></label>
    <label className="block"><span>{t('phone')}</span><input name="phone" className="w-full p-2 rounded-xl border border-slate-700 bg-slate-900" required/></label>
    <button className="btn btn-primary w-full" type="submit">{t('save')}</button>
  </form>
}
