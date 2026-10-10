# To-Do App (MERN)

## Run locally
1. Start MongoDB (local, or use an Atlas URI).
2. Server:  cd server && npm install && cp .env.example .env && npm run dev
3. Client:  cd client && npm install && npm run dev   → http://localhost:5173

## API
GET    /api/tasks?search=   list / search (sorted by date, startTime)
POST   /api/tasks           create
PUT    /api/tasks/:id       update (also status toggle)
DELETE /api/tasks/:id       delete

## Design notes
- `date` ("YYYY-MM-DD") and `startTime` ("HH:mm") are required; `endTime` is optional and must be after start.
- Weeks run Monday–Sunday. Week counts/progress are calculated on the client, never stored.
- Delete uses a visible button + confirmation (swipe-to-delete not implemented).