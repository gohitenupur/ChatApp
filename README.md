# WhatsApp Clone (MERN + Socket.IO)

Beginner-friendly WhatsApp-style chat clone with:

- ✅ Register / Login / Logout (JWT)
- ✅ User list + search
- ✅ One-to-one real-time messaging
- ✅ Message history in MongoDB
- ✅ Online/offline user status

## Project structure

```text
whatsapp-clone/
 ├── client/   # React + Vite frontend
 └── server/   # Node + Express + MongoDB backend
```

## Tech stack

- Frontend: React, Axios, CSS
- Backend: Node.js, Express.js
- DB: MongoDB + Mongoose
- Realtime: Socket.IO
- Auth: JWT + bcrypt

## Setup

### 1) Install dependencies

```bash
npm install
npm install --prefix server
npm install --prefix client
```

### 2) Configure env files

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update values in `server/.env`:
- `MONGO_URI`
- `JWT_SECRET`

### 3) Start development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users?search=` (auth required)
- `GET /api/messages/:userId` (auth required)

## Socket events

Client emits:
- `send-message` `{ receiverId, text }`

Server emits:
- `new-message`
- `online-users` (array of user IDs)

## Next beginner steps

- Add media upload (Multer + Cloudinary)
- Add notification toasts/browser notifications
- Add OTP auth later (Firebase)
- Deploy backend (Render/Railway), frontend (Vercel/Netlify), and DB (MongoDB Atlas)
