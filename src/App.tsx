import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useAppStore } from './state/useAppStore'
import { tg } from './lib/telegram'

export default function App() {
  React.useEffect(() => { tg?.expand?.() }, [])
  const isAdmin = useAppStore(s => s.isAdmin)

  return (
    <div className="max-w-screen-sm mx-auto p-3 space-y-3">
      <header className="flex items-center justify-between">
        <div className="text-xl font-semibold">EcoBike</div>
        <nav className="flex gap-2 text-sm">
          <Link to="/" className="btn">Главная</Link>
          <Link to="/map" className="btn">Карта</Link>
          {isAdmin && <Link to="/diag" className="btn">Диагностика</Link>}
        </nav>
      </header>
      <Outlet />
      <footer className="text-center text-slate-400 text-xs py-6">© EcoBike</footer>
    </div>
  )
}
