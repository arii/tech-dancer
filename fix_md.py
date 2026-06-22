import re

filepath = 'content/posts/2026-06-19-deployment-impact-analyzer.md'
with open(filepath, 'r') as f:
    content = f.read()

# Fix the card nesting issue
# Replace <Box paddingBottom={8}>\n<Grid ...>\n...\n</Grid>\n</Box> with just <Grid ...>\n...\n</Grid>
content = re.sub(r'<Box paddingBottom=\{8\}>\n(<Grid cols=\{\{ base: 1, md: 3 \}\} gap=\{6\}>.*?)</Grid>\n</Box>', r'\1</Grid>', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
