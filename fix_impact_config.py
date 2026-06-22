import re

filepath = 'scripts/impact-analysis.config.ts'
with open(filepath, 'r') as f:
    content = f.read()

content = re.sub(
    r'\} as Record<string, string>\n\};',
    "} as Record<string, string>,\n\n  // Performance and resource limits\n  MAX_BUFFER: 10 * 1024 * 1024 // 10MB buffer for large dependency graphs\n};",
    content
)

with open(filepath, 'w') as f:
    f.write(content)
