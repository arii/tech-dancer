import json
import pytest
from pathlib import Path
from wcs_navigator_api.services.cache_service import get_cache_key, get_cached_response, set_cached_response, CACHE_DIR

def test_get_cache_key_determinism():
    """Verify that get_cache_key produces stable hashes for the same inputs and sorts dict keys."""
    pdf_bytes = b"%PDF-mock"
    params1 = {"b": 2, "a": 1}
    params2 = {"a": 1, "b": 2}

    key1 = get_cache_key(pdf_bytes, params1)
    key2 = get_cache_key(pdf_bytes, params2)

    assert key1 == key2

    key3 = get_cache_key(pdf_bytes, None)
    assert key1 != key3

def test_cache_set_and_get():
    """Verify that set_cached_response writes to disk and get_cached_response reads it."""
    test_key = "test_cache_key_123"
    test_data = {"some": "data", "list": [1, 2, 3]}

    # Ensure it's not there initially
    cache_path = CACHE_DIR / f"{test_key}.json"
    if cache_path.exists():
        cache_path.unlink()

    assert get_cached_response(test_key) is None

    set_cached_response(test_key, test_data)

    assert cache_path.exists()

    retrieved = get_cached_response(test_key)
    assert retrieved == test_data

    # Cleanup
    cache_path.unlink()

def test_pre_seeded_fixtures():
    """Verify that the module-level pre-seeding logic ran successfully for the California 2026 fixtures."""
    # Assuming pre_seed_fixtures is called automatically when cache_service is imported.
    # We will check if the cache keys for the bbb_2026 fixture exist in .wcs_cache.

    fixtures_dir = Path(__file__).parent / "fixtures"
    fixture_path = fixtures_dir / "bbb_2026.json"

    if not fixture_path.exists():
        pytest.skip("Fixture not found.")

    with open(fixture_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    preset_id = data.get("preset_id", "")
    synthetic_pdf_bytes = preset_id.encode("utf-8")

    disc_key = get_cache_key(synthetic_pdf_bytes)
    gen_key = get_cache_key(synthetic_pdf_bytes, data["inputs"])

    disc_cached = get_cached_response(disc_key)
    gen_cached = get_cached_response(gen_key)

    assert disc_cached is not None, "Discovery cache for bbb_2026 was not pre-seeded."
    assert gen_cached is not None, "Generate cache for bbb_2026 was not pre-seeded."

    # Optional: Verify it matches the fixture data
    assert disc_cached == data["discovery"]
    assert gen_cached == data["generate"]
