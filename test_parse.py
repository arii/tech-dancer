content = """## Gemini Code Review Agent

Skipped: No GEMINI_API_KEY provided.
"""
lines = [line.strip() for line in content.splitlines() if line.strip()]
print(lines)
if len(lines) == 2 and lines[1].startswith("Skipped:"):
    print("Is skipped")
