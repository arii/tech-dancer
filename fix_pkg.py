with open('package.json', 'r') as f:
    content = f.read()

import re
content = re.sub(
    r'"impact:crawler": "tsx scripts/ai-playwright-crawler.ts"\n    "impact:github-models-code-review": "tsx scripts/impact-github-models-code-review.ts"\n',
    '"impact:crawler": "tsx scripts/ai-playwright-crawler.ts"\n',
    content
)

with open('package.json', 'w') as f:
    f.write(content)
