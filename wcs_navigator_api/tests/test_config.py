import pytest
from wcs_navigator_api.config import (
    is_valid_gemini_api_key_format,
    InvalidGeminiAPIKeyError,
    get_genai_client,
    settings,
)


def test_is_valid_gemini_api_key_format():
    # Valid key format (39 chars starting with AIzaSy)
    valid_key = "AIzaSy" + "A" * 33
    assert is_valid_gemini_api_key_format(valid_key) is True

    # Invalid cases
    assert is_valid_gemini_api_key_format("") is False
    assert is_valid_gemini_api_key_format("test-key-placeholder") is False
    assert is_valid_gemini_api_key_format("AIzaSyTooShort") is False
    assert is_valid_gemini_api_key_format("BIzaSy" + "A" * 33) is False


def test_get_genai_client_invalid_format(monkeypatch):
    monkeypatch.setattr(settings, "GEMINI_API_KEY", "test-key-placeholder")
    with pytest.raises(InvalidGeminiAPIKeyError):
        get_genai_client()
