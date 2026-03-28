from contextlib import asynccontextmanager

import vertexai
from fastapi import FastAPI

from app.api.requests import router as requests_router
from app.core.config import get_settings


@asynccontextmanager
async def lifespan(_: FastAPI):
    settings = get_settings()
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

app.include_router(requests_router, prefix="/api", tags=["requests"])


@app.get("/health", tags=["meta"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
