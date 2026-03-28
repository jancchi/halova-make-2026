from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    DATABASE_URL: str = "sqlite:///./requests.db"
    CORS_ORIGINS: list[str] = Field(default_factory=lambda: ["http://localhost:3000"])
    VERTEX_PROJECT_ID: str
    VERTEX_LOCATION: str = "global"
    GOOGLE_APPLICATION_CREDENTIALS: str


@lru_cache
def get_settings() -> Settings:
    return Settings()
