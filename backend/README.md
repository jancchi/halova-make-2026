# FastAPI Vertex AI Request Backend

Backend for client request intake + admin dashboard APIs with Vertex AI analysis.

## Requirements

- Python 3.11+
- Google Cloud project with Vertex AI enabled
- Service account JSON credentials
- SQLite or PostgreSQL database URL

## Install

Using `uv`:

```bash
cd backend
uv sync
```

Using `pip`:

```bash
cd backend
pip install -e .
```

## Vertex AI credentials setup

1. In Google Cloud Console, enable **Vertex AI API** for your project.
2. Create a service account (IAM & Admin -> Service Accounts).
3. Grant it a role with Vertex AI access (`Vertex AI User` is sufficient for MVP).
4. Create and download the service account JSON key.
5. Put values in `.env`:
   - `DATABASE_URL=sqlite:///./requests.db`
   - `CORS_ORIGINS=["http://localhost:3000"]`
   - `VERTEX_PROJECT_ID=...`
   - `VERTEX_LOCATION=global`
   - `GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/key.json`

Copy env file:

```bash
cp .env.example .env
```

## Run

```bash
cd backend
uvicorn app.main:app --reload
```

Server will start on `http://127.0.0.1:8000`.

## Example request

```bash
curl -X POST "http://127.0.0.1:8000/api/requests" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jozef Mak",
    "email": "jozef@example.com",
    "organization": "Acme Labs",
    "role": "startup",
    "phone": "+421900123456",
    "city": "Bratislava",
    "category": "investor-search",
    "title": "Hladam investora na pre-seed",
    "description": "Potrebujeme uvod k investorom v CEE, runway mame na 4 mesiace a chceme closnut kolo do 6 tyzdnov.",
    "urgency": "high",
    "deadline": "2026-05-01",
    "budget": 0,
    "helpType": "financial",
    "tags": ["fundraising", "fintech", "pre-seed"]
  }'
```

Expected submit response:

```json
{
  "id": "1",
  "status": "OPEN",
  "createdAt": "2026-03-28T15:30:00Z"
}
```

## API overview

- `GET /health`
- `GET /api/ping`
- `GET /api/categories`
- `GET /api/stats`
- `POST /api/requests`
- `GET /api/requests/{id}`
- `GET /api/admin/requests/top-urgent?limit=10`
- `GET /api/admin/requests?category=&status=&urgency_min=&urgency_max=&q=&limit=&offset=`
- `PATCH /api/admin/requests/{id}`
