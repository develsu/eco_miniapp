# EcoBike — Telegram Mini App (React + Vite + TS)

## Быстрый старт
```bash
npm i
cp .env.example .env
npm run dev
```
Откройте `http://localhost:5173` через Telegram Desktop (WebApp SDK доступен и в обычном браузере).

## Переменные окружения
- `VITE_API_BASE` — URL Cloud Functions
- `VITE_BOT_NAME` — имя бота
- `VITE_MAP_TILES` — тайлы Leaflet
- `VITE_TRACCAR_URL` — ссылка «Open in Traccar»
- `VITE_TIMEZONE` — `Asia/Almaty`
- `VITE_ADMIN_IDS` — через запятую

## Контракты API (ожидаемые)
- `GET /getUserStatus?telegram_id=...`
- `POST /registerUser`
- `POST /requestSwap` (fallback на `/swapBattery`)
- `GET /getStationCommand?station_id=...`
- `POST /api/reportSwapSuccess`
- `POST /completeSwap`
- `POST /setRentalPlan`
- `GET /getRentalStatus?telegram_id=...`
- `GET /api/healthz`

## Notes
- В запросы добавляется заголовок `X-Telegram-Init-Data` (если доступен) — сервер обязан валидировать initData (HMAC).
- После `requestSwap` идёт опрос `getUserStatus` до 60с и показ «ячейка N» по ответу сервера.
