from unidiff import PatchSet
from typing import List, Dict

def extract_diff_context(diff_text: str) -> str:
    """Extracts a concise version of the diff for LLM consumption."""
    try:
        patch = PatchSet(diff_text)
        summary = []
        for file in patch:
            summary.append(f"File: {file.path}")
            for hunk in file:
                summary.append(f"  Hunk: {hunk.source_start}, {hunk.source_length} -> {hunk.target_start}, {hunk.target_length}")
                for line in hunk:
                    if line.is_added:
                        summary.append(f"    + {line.value.strip()}")
                    elif line.is_removed:
                        summary.append(f"    - {line.value.strip()}")
        return "\n".join(summary)
    except Exception as e:
        return diff_text # Fallback to raw diff if parsing fails

def get_changed_files(diff_text: str) -> List[str]:
    try:
        patch = PatchSet(diff_text)
        return [f.path for f in patch]
    except Exception:
        return []
