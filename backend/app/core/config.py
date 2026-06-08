from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env.local",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "local"
    database_url: str | None = None
    db_echo: bool = False

    @property
    def sqlalchemy_database_url(self) -> str:
        if self.database_url:
            return self.database_url
        if self.app_env == "docker":
            return "postgresql+psycopg://app:app@db:5432/app"
        return "sqlite:///./app.db"


@lru_cache
def get_settings() -> Settings:
    return Settings()
