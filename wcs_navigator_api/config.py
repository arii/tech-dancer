import re
from google import genai
from pydantic_settings import BaseSettings, SettingsConfigDict

GEMINI_API_KEY_REGEX = re.compile(r"^AIzaSy[A-Za-z0-9_-]{33}$")


class MissingGeminiAPIKeyError(Exception):
    """Raised when GEMINI_API_KEY environment variable is missing or empty."""

    pass


class InvalidGeminiAPIKeyError(Exception):
    """Raised when GEMINI_API_KEY format is invalid according to structure checks."""

    pass


def is_valid_gemini_api_key_format(key: str) -> bool:
    """Validate structure of Google Gemini API key without making API calls."""
    if not key:
        return False
    return bool(GEMINI_API_KEY_REGEX.match(key))


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
    """Initialize and return a Google GenAI Client using GEMINI_API_KEY settings."""
    if not settings.GEMINI_API_KEY:
        raise MissingGeminiAPIKeyError(
            "GEMINI_API_KEY environment variable is missing or empty."
        )
    if not is_valid_gemini_api_key_format(settings.GEMINI_API_KEY):
        raise InvalidGeminiAPIKeyError(
            "GEMINI_API_KEY format is invalid (must start with 'AIzaSy' and be 39 characters)."
        )
    return genai.Client(api_key=settings.GEMINI_API_KEY)
