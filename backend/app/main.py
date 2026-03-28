from contextlib import asynccontextmanager

import vertexai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.requests import router as requests_router
from app.core.config import get_settings
from app.database import create_db_and_tables

# Ensure SQLModel metadata includes all tables.
from app.models import request as _request_models  # noqa: F401


@asynccontextmanager
async def lifespan(_: FastAPI):
    settings = get_settings()
    create_db_and_tables()
    vertexai.init(
        project=settings.VERTEX_PROJECT_ID,
        location=settings.VERTEX_LOCATION,
    )
    yield


app = FastAPI(
    title="Request Management AI MVP",
    version="0.1.0",
    lifespan=lifespan,
)

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(requests_router, prefix="/api", tags=["requests"])


@app.get("/health", tags=["meta"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
