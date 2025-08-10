import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useUserStatus } from '../hooks/useUserStatus'

const tiles = import.meta.env.VITE_MAP_TILES as string
const traccar = import.meta.env.VITE_TRACCAR_URL as string

export default function BatteryMap() {
  const { data } = useUserStatus()
  const loc = data?.last_location
  if (!loc) return <div className="card">Пока нет координат</div>
  const pos: [number, number] = [loc.lat, loc.lon]
  return <div className="card">
    <div className="h-80 rounded-xl overflow-hidden">
      <MapContainer center={pos} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer url={tiles} />
        <Marker position={pos} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconAnchor:[12,41] })}>
          <Popup>
            <div className="space-y-1">
              <div>lat: {loc.lat.toFixed(6)} lon: {loc.lon.toFixed(6)}</div>
              {loc.accuracy && <div>±{Math.round(loc.accuracy)} м</div>}
              <a className="btn" href={traccar} target="_blank" rel="noreferrer">Открыть в Traccar</a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  </div>
}
