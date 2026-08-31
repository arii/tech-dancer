import re
from google import genai
from pydantic_settings import BaseSettings, SettingsConfigDict

GEMINI_API_KEY_REGEX = re.compile(r"^AIza[A-Za-z0-9_-]{30,}$")


class MissingGeminiAPIKeyError(Exception):
    """Raised when GEMINI_API_KEY environment variable is missing or empty."""

    pass


class InvalidGeminiAPIKeyError(Exception):
    """Raised when GEMINI_API_KEY format is invalid according to structure checks."""

    pass


def is_valid_gemini_api_key_format(key: str) -> bool:
    """Check if API key string is non-empty."""
    if not key:
        return False
    return bool(key.strip().strip('"').strip("'"))


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-3.5-flash"
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
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
    """Initialize and return a Google GenAI Client using GEMINI_API_KEY settings or default environment."""
    raw_key = settings.GEMINI_API_KEY.strip().strip('"').strip("'") if settings.GEMINI_API_KEY else ""
    if raw_key:
        return genai.Client(api_key=raw_key)
    # Allows Google Cloud Run ADC (Application Default Credentials) or ambient GOOGLE_API_KEY
    return genai.Client()
