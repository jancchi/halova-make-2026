# Frontend (Nuxt 3)

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Environment

- `NUXT_PUBLIC_API_BASE` — base URL for backend API.
  - Example: `http://localhost:8000`

## API Fallback Behavior

- `GET /api/v1/categories` and `GET /api/v1/stats` use fallback data when backend is unavailable.
- UI remains operational in degraded mode (no hard crash for these endpoints).

## Submit Failure Handling

- Form submit handles offline/timeout/server failures with localized toasts.
- HTTP 422 responses map field errors to the appropriate form step and fields.
- User data is preserved on failure; retry path is available.
