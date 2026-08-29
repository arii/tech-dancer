from google import genai
from pydantic_settings import BaseSettings, SettingsConfigDict


class MissingGeminiAPIKeyError(Exception):
    """Raised when GEMINI_API_KEY environment variable is missing or empty."""

    pass


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.5-flash"
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "https://boomtick.blog",
    ]
    PORT: int = 8080

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()


def get_genai_client() -> genai.Client:
    """Initialize and return a Google GenAI Client using GEMINI_API_KEY settings."""
    if not settings.GEMINI_API_KEY:
        raise MissingGeminiAPIKeyError(
            "GEMINI_API_KEY environment variable is missing or empty."
        )
    return genai.Client(api_key=settings.GEMINI_API_KEY)
