"""Request payload models for WCS Navigator API."""

from typing import Any
from pydantic import BaseModel, HttpUrl


class DiscoverUrlRequest(BaseModel):
    """Payload for Stage 1 URL pre-scan discovery request."""

    url: HttpUrl


class GenerateUrlRequest(BaseModel):
    """Payload for Stage 2 schedule generation request via URL."""

    url: HttpUrl
    questionnaire_responses: dict[str, Any]
