from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    VERTEX_PROJECT_ID: str
    VERTEX_LOCATION: str = "us-central1"
    GOOGLE_APPLICATION_CREDENTIALS: str


settings = Settings()
