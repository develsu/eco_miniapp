import React from 'react'
import { tg } from '../lib/telegram'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../state/useAppStore'
import { useTranslation } from 'react-i18next'

export default function ScannerButton() {
  const nav = useNavigate()
  const setStationId = useAppStore(s=>s.setStationId)
  const { t } = useTranslation()

  const onScan = () => {
    if (!tg?.showScanQrPopup) {
      alert('QR-сканер Telegram недоступен')
      return
    }
    tg.showScanQrPopup({ text: t('scan_prompt') }, (res) => {
      const data = res?.data || ''
      try {
        const station = parseStationQr(data)
        setStationId(station)
        nav(`/station/${encodeURIComponent(station)}`)
      } catch (e:any) {
        alert(e.message || 'Неверный QR')
      }
    })
  }

  return <button className="btn btn-primary w-full" onClick={onScan}>{t('scan_station')}</button>
}

export function parseStationQr(qr: string): string {
  const prefix = 'eco:station:'
  if (!qr.startsWith(prefix)) throw new Error('Неверный QR')
  const rest = qr.slice(prefix.length).trim()
  if (!rest) throw new Error('Пустой station_id')
  return rest
}
