import re

with open('package.json', 'r') as f:
    content = f.read()

pattern = re.compile(r'<<<<<<< HEAD\n.*?\n=======\n.*?\n>>>>>>> main\n', re.DOTALL)
merged_scripts = """    "lint:ox": "oxlint . --deny-warnings",
    "type-check": "tsc --noEmit",
    "audit": "node scripts/detect-antipatterns.mjs > antipattern-report.txt 2>&1 || true && node scripts/generate-todo.mjs"\n"""

content = pattern.sub(merged_scripts, content)

with open('package.json', 'w') as f:
    f.write(content)
print("package.json fixed")
