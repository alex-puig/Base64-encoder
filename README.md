# Base64 Encoder / Decoder

Simple fullstack project with an Express backend and a Vite + React frontend.

## Overview
- Backend: Express API in `backend/server/index.js` (serverless-ready via `serverless-http`).
- Frontend: Vite + React app in the `frontend/` folder.

## Prerequisites
- Node.js (18.x recommended)
- npm
- A MongoDB connection URL (hosted Atlas or self-hosted)

## Environment variables (backend)
Create a `.env` with values for the following variables:

```
MONGO_URI
JWT_SECRET
PORT
```

## Local setup
1. Install backend deps (root contains backend `package.json`):

```bash
# from repo root
npm install
```

2. Install frontend deps:

```bash
cd frontend
npm install
cd ..
```

## Running locally
- Start backend (from /backend ):

```bash
npm run dev
```

This runs the file `backend/server/index.js` directly. The API will listen on `PORT` (default 5000).

- Start frontend:

```bash
cd frontend
npm run dev
```

Open the app at the address shown by Vite (typically `http://localhost:5173`). The frontend talks to the backend API endpoints under `/api`.

## API endpoints
- `POST /api/users` - authentication routes (see `backend/routes/auth.js`)
- `POST /api/base64/encode` - encode text to base64 (see `backend/routes/base64.js`)

The frontend does not currently have a user creation interface. To create a user:

Open POSTMAN and create a New Collection with a New Request. This request must be a POST type. Point to `api/users/register`.

Add a raw JSON body containing the credentials `username` and `password`. Send the request, this will create a new user in the database.

## Building for production (frontend)

```bash
cd frontend
npm run build
```


