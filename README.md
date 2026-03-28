# 🚀 Hackathon Template

> FastAPI · PostgreSQL · Qdrant · Nuxt 3 · Tailwind · JWT

## Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Backend   | FastAPI + SQLModel                |
| Auth      | JWT (python-jose + passlib bcrypt)|
| SQL DB    | PostgreSQL via psycopg2           |
| Vector DB | Qdrant                            |
| Frontend  | Nuxt 3 + Tailwind CSS             |

## Project structure

```
.
├── .env.example
├── .gitignore
├── Makefile
├── backend/
│   ├── main.py            # FastAPI app entry point
│   ├── requirements.txt
│   └── app/
│       ├── config.py      # Pydantic settings (reads .env)
│       ├── database.py    # SQLModel engine + session dep
│       ├── qdrant_client.py
│       ├── auth/
│       │   ├── jwt.py     # Hashing, token create/decode, get_current_user
│       │   └── routes.py  # /auth/register  /auth/login  /auth/me
│       ├── models/
│       │   └── user.py    # User SQLModel table + UserRead schema
│       └── routers/
│           └── example.py # /api/ping (public) + /api/protected (auth)
└── frontend/
    ├── nuxt.config.ts
    ├── tailwind.config.js
    ├── app.vue
    ├── composables/
    │   └── useApi.ts      # $fetch wrapper with Bearer auth
    └── pages/
        └── index.vue
```

## Quick start

### 1. Environment

```bash
cp .env.example .env
# fill in DATABASE_URL, QDRANT_URL, JWT_SECRET
```

### 2. Install everything

```bash
make install
```

### 3. Start Postgres + Qdrant (Docker)

```bash
docker run -d --name pg -e POSTGRES_PASSWORD=password -e POSTGRES_DB=hackathon -p 5432:5432 postgres:16-alpine
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
```

### 4. Migrate DB

```bash
make migrate
```

### 5. Run dev servers

```bash
# Two separate terminals:
make dev-backend    # → http://localhost:8000  (Swagger at /docs)
make dev-frontend   # → http://localhost:3000
```

## Auth flow

| Endpoint           | Method | Auth     | Description            |
|--------------------|--------|----------|------------------------|
| `/auth/register`   | POST   | —        | Create account         |
| `/auth/login`      | POST   | —        | Get JWT token          |
| `/auth/me`         | GET    | Bearer   | Current user info      |
| `/api/ping`        | GET    | —        | Public API health      |
| `/api/protected`   | GET    | Bearer   | Example protected route|

## Useful commands

```bash
make format     # black + isort on backend
make clean      # remove __pycache__, .nuxt, .output
```

## Adding a new model

1. Create `backend/app/models/yourmodel.py` with a `SQLModel(table=True)` class
2. Import it in `main.py` before `create_db_and_tables()` so it registers
3. Add a router in `backend/app/routers/` and include it in `main.py`

## Adding a Qdrant collection

```python
from app.qdrant_client import ensure_collection
ensure_collection("my_vectors", vector_size=768)  # call in startup
```
