# blog-app

Full-stack sample blog application — .NET 9 backend (REST API) + React frontend (Create React App).

This repo demonstrates a small production-style setup with JWT authentication (access + refresh tokens), a simple SQL Server-backed repository layer, and a React + Redux Toolkit SPA.

---

## Table of Contents

- Overview
- Tech stack
- Local development
  - Backend
  - Frontend
- API reference (quick)
- Authentication & tokens
- Database
- Useful files / important paths
- Contributing

---

## Overview

The repository contains two main folders:

- `backend/` — .NET 9 Web API (C#). Implements authentication, posts management, token storage and basic repository implementations.
- `frontend/` — React SPA (Create React App) using Redux Toolkit, React Router v7, Axios and form validation.

The app implements a typical blog workflow:

- Users can sign up and log in
- Authenticated users can create, update and delete their own posts
- Refresh tokens are stored server-side and rotated

## Tech stack

- Backend: .NET 9, C#, minimal Web API, JWT auth, SQL Server via Microsoft.Data.SqlClient
- Frontend: React 19 (Create React App), Redux Toolkit, React Router, Axios, Formik, Yup

---

## Local development

Note: this project expects a SQL Server database. See the Database section below for instructions.

### Backend

1. Open a terminal in `backend/`.
2. Configure connection string and JWT options in `backend/appsettings.Development.json` (or `appsettings.json`) as needed.
3. Start the backend API (development profile):

```bash
cd backend
dotnet run --project backend.csproj
```

By default the API in this repo is configured for local development at:

- HTTP: http://localhost:5287
- HTTPS: https://localhost:7096

The frontend expects the API base at `http://localhost:5287/api` (see `frontend/src/services/axiosConfig.js`). Adjust CORS or ports in `Program.cs` if you change the API port.

Swagger / OpenAPI is enabled for development — visit `http://localhost:5287/swagger` after launching the backend.

### Frontend

1. Open a terminal in `frontend/`.
2. Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm start
```

The React dev server runs on port 3000 by default (http://localhost:3000). It communicates with the backend at `http://localhost:5287/api`.

---

## API reference (quick)

Auth endpoints (see `backend/Controllers/AuthController.cs`):

- POST /api/auth/signup — create account
- POST /api/auth/login — returns { accessToken, refreshToken }
- POST /api/auth/logout — revoke refresh token
- POST /api/auth/refresh-token — exchange refresh token for new access + refresh token

Post endpoints (see `backend/Controllers/PostsController.cs`):

- GET /api/post/top — list latest featured/top posts
- GET /api/post?offset={offset}&limit={limit} — get paginated posts
- GET /api/post/{slug} — get a single post by slug
- POST /api/post — create post (authenticated)
- PUT /api/post/{postId} — update post (authenticated, owner only)
- DELETE /api/post/{postId} — delete post (authenticated, owner only)

Example: login with curl

```bash
curl -X POST http://localhost:5287/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username":"alice","password":"password"}'
```

---

## Authentication & tokens

- The backend issues short-lived JWT access tokens and longer-lived server-side refresh tokens.
- Access tokens are used in the `Authorization: Bearer <token>` header for authenticated requests.
- Refresh tokens are stored server-side (see `backend/Repositories/RefreshTokenRepository.cs` and `backend/Services/RefreshTokenService.cs`) and rotated on refresh.
- Frontend token helpers live in `frontend/src/helpers/tokensUtils.js`. The Axios instance in `frontend/src/services/axiosConfig.js` automatically adds the access token to requests and tries to refresh when receiving 401 responses.

---

## Database

This repository expects a SQL Server database. The sample config values live in `backend/appsettings.Development.json`.

You must create a database (for example `BlogDB`) and create the tables used by the repository layer:

- Users
- Posts
- RefreshTokens

There are no EF Core migrations in this project — create the schema manually or via your own scripts. Check the repository code under `backend/Repositories` for the exact column names and SQL used.

---

## Useful files / code entry points

- Backend

  - `backend/Program.cs` — application startup / DI / services
  - `backend/Controllers/AuthController.cs` — auth endpoints
  - `backend/Controllers/PostsController.cs` — posts endpoints
  - `backend/Services/*.cs` — core business logic
  - `backend/Repositories/*.cs` — data access

- Frontend
  - `frontend/src/index.js` — SPA entry
  - `frontend/src/App.jsx` — app shell / router
  - `frontend/src/services/axiosConfig.js` — Axios instance and token refresh logic
  - `frontend/src/services/*` — authService & postService wrappers

---

## Development notes

- Update CORS, ports or connection strings in `backend/Program.cs` and appsettings as necessary.
- If you want HTTPS dev experience between frontend and backend, ensure the dev certificates are configured for .NET and CRA proxy settings (not included in this repo).

---

## Contributing

PRs welcome — suggested improvements include:

- Add SQL schema scripts or migrations
- Add tests for backend and frontend
- Add Docker compose to run the full stack locally

---

## License

This repository contains sample code. Add your preferred license file (e.g., `LICENSE`) to make the intended usage explicit.
