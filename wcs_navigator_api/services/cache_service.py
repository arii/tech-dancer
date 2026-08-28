import hashlib
import json
from pathlib import Path
from typing import Any, Dict, Optional

CACHE_DIR = Path(".wcs_cache")

def get_cache_key(pdf_bytes: bytes, params: Optional[Dict[str, Any]] = None) -> str:
    """Computes a deterministic SHA256 hash for a request."""
    hasher = hashlib.sha256()
    hasher.update(pdf_bytes)
    if params:
        # Sort keys to ensure determinism
        params_str = json.dumps(params, sort_keys=True)
        hasher.update(params_str.encode("utf-8"))
    return hasher.hexdigest()

def get_cached_response(cache_key: str) -> Optional[Dict[str, Any]]:
    """Reads a response from the cache if it exists."""
    cache_path = CACHE_DIR / f"{cache_key}.json"
    if cache_path.exists():
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return None

def set_cached_response(cache_key: str, response_data: Dict[str, Any]) -> None:
    """Writes a response to the cache."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = CACHE_DIR / f"{cache_key}.json"
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(response_data, f, ensure_ascii=False, indent=2)

def pre_seed_fixtures() -> None:
    """Pre-seeds the cache with California 2026 event fixtures."""
    fixtures_dir = Path(__file__).parent.parent / "tests" / "fixtures"
    fixture_files = ["bbb_2026.json", "halloween_2026.json"]

    for filename in fixture_files:
        filepath = fixtures_dir / filename
        if not filepath.exists():
            continue

        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception:
            continue

        # Use preset_id as the synthetic pdf_bytes for the cache key
        preset_id = data.get("preset_id", "")
        if not preset_id:
            continue

        synthetic_pdf_bytes = preset_id.encode("utf-8")

        # Seed Discovery pass cache
        if "discovery" in data:
            disc_key = get_cache_key(synthetic_pdf_bytes)
            set_cached_response(disc_key, data["discovery"])

        # Seed Generate pass cache
        if "generate" in data and "inputs" in data:
            gen_key = get_cache_key(synthetic_pdf_bytes, data["inputs"])
            set_cached_response(gen_key, data["generate"])

# Auto-seed on import
pre_seed_fixtures()
