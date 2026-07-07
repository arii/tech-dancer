import sys

with open('boomtick-pkg/cli/dev_tools/services/ai_service.py', 'r') as f:
    content = f.read()

func_old = """def _get_review_prompt_constants() -> tuple[str, str]:
    import os
    import re
    # Determine repo root from the current file's relative path execution
    try:
        root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
        ts_path = os.path.join(root_dir, 'scripts', 'lib', 'ReviewPromptConstants.ts')
        with open(ts_path, 'r') as f:
            ts_content = f.read()

        json_match = re.search(r'export const STRICT_JSON_VERIFICATION\s*=\s*`([\s\S]*?)`;', ts_content)
        snippet_match = re.search(r'export const SNIPPET_AND_VERIFICATION_RULES\s*=\s*`([\s\S]*?)`;', ts_content)

        json_rules = json_match.group(1).replace('\\`', '`') if json_match else ""
        snippet_rules = snippet_match.group(1).replace('\\`', '`') if snippet_match else ""

        return json_rules, snippet_rules
    except Exception as e:
        log_warn(f"Failed to load ReviewPromptConstants.ts: {e}")
        return "", ""
"""

func_new = """_REVIEW_CONSTANTS_CACHE = None

def _get_review_prompt_constants() -> tuple[str, str]:
    global _REVIEW_CONSTANTS_CACHE
    if _REVIEW_CONSTANTS_CACHE is not None:
        return _REVIEW_CONSTANTS_CACHE

    import os
    import re
    # Determine repo root from the current file's relative path execution
    try:
        root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
        ts_path = os.path.join(root_dir, 'scripts', 'lib', 'ReviewPromptConstants.ts')
        with open(ts_path, 'r') as f:
            ts_content = f.read()

        json_match = re.search(r'export const STRICT_JSON_VERIFICATION\s*=\s*`([\s\S]*?)`;', ts_content)
        snippet_match = re.search(r'export const SNIPPET_AND_VERIFICATION_RULES\s*=\s*`([\s\S]*?)`;', ts_content)

        json_rules = json_match.group(1).replace('\\`', '`') if json_match else ""
        snippet_rules = snippet_match.group(1).replace('\\`', '`') if snippet_match else ""

        _REVIEW_CONSTANTS_CACHE = (json_rules, snippet_rules)
        return _REVIEW_CONSTANTS_CACHE
    except Exception as e:
        log_warn(f"Failed to load ReviewPromptConstants.ts: {e}")
        # Default fallback values to prevent empty constraints from degrading review quality
        default_json = "Strict JSON Verification:\\n- Every finding MUST have an `id`, `file`, `issue`, and `status`."
        default_snippet = "Snippet rules:\\n- STRICT SNIPPET RULE: Quote exact line from diff."
        _REVIEW_CONSTANTS_CACHE = (default_json, default_snippet)
        return _REVIEW_CONSTANTS_CACHE
"""

content = content.replace(func_old, func_new)

with open('boomtick-pkg/cli/dev_tools/services/ai_service.py', 'w') as f:
    f.write(content)
