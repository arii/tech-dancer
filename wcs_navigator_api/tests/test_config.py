"""Unit tests for config module."""

from wcs_navigator_api.config import (
    is_valid_gemini_api_key_format,
    get_genai_client,
    settings,
)


def test_is_valid_gemini_api_key_format():
    """Verify non-empty key checking."""
    assert is_valid_gemini_api_key_format("AIzaSyAnyKey") is True
    assert is_valid_gemini_api_key_format("") is False
    assert is_valid_gemini_api_key_format("   ") is False


def test_get_genai_client_with_key(monkeypatch):
    """Verify client initialization with configured key."""
    monkeypatch.setattr(settings, "GEMINI_API_KEY", "test-key-placeholder")
    client = get_genai_client()
    assert client is not None
