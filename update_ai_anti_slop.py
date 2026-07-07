import sys

with open('boomtick-pkg/cli/dev_tools/services/ai_service.py', 'r') as f:
    content = f.read()

old_rules = """REPO RULES: Prefer removal. Flag redundant wrappers/abstractions. BANNED: Raw Tailwind layout (flex/grid/px-*) in TSX (use Stack/Grid/Box).\"\"\""""

new_rules = """REPO RULES: Prefer removal. Flag redundant wrappers/abstractions. BANNED: Raw Tailwind layout (flex/grid/px-*) in TSX (use Stack/Grid/Box).
ANTI-SLOP: DO NOT recommend overly complex error handling, defensive guards, extra unit tests for simple internal scripts, or boilerplate documentation/comments.\"\"\""""

content = content.replace(old_rules, new_rules)

with open('boomtick-pkg/cli/dev_tools/services/ai_service.py', 'w') as f:
    f.write(content)
