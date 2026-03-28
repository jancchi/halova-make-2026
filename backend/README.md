# FastAPI Vertex AI MVP

Minimal backend-only MVP with a single endpoint:

- `POST /api/requests`

It sends request data to Vertex AI Gemini and returns structured JSON.

## Requirements

- Python 3.11+
- A GCP project with Vertex AI enabled
- Service account key JSON with Vertex AI access

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
3. Grant a role with Vertex AI access (for MVP, `Vertex AI User` is sufficient).
4. Create and download a JSON key for that service account.
5. Set `GOOGLE_APPLICATION_CREDENTIALS` to the JSON file path.

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
    "company_name": "Acme Labs",
    "web_url": "https://acme.example",
    "description": "We need warm intros to seed investors in climate fintech in the next 3 weeks."
  }'
```

Expected response shape:

```json
{
  "category": "INVESTOR_INTRO",
  "priority_score": 8,
  "priority_reasoning": "Fundraising request with near-term timeline and clear target profile.",
  "summary": "Acme Labs seeks seed-stage investor introductions in climate fintech within three weeks.",
  "required_member_roles": ["INVESTOR", "ECOSYSTEM_PARTNER"]
}
```
