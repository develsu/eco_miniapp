import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import Home from './pages/Home'
import Station from './pages/Station'
import MapPage from './pages/Map'
import Diag from './pages/Diag'
import './i18n'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: '/station/:id', element: <Station /> },
    { path: '/map', element: <MapPage /> },
    { path: '/diag', element: <Diag /> },
  ]},
])

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 10000, retry: 1 } }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
