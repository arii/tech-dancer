import json

def is_skipped_verdict(content: str) -> bool:
    try:
        data = json.loads(content)
        return data.get("llmVerdict") == "pass" and data.get("highCount") == 0 and len(data.get("routes", [])) == 0 and data.get("passed") is True
    except Exception:
        return False

print(is_skipped_verdict("invalid json"))
