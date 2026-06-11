const fs = require('fs');
const yaml = require('yaml');

try {
  const fileContent = fs.readFileSync('content/posts/2026-04-18-financial-literacy-dancers.md', 'utf8');
  const match = fileContent.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (match) {
    const yamlStr = match[1];
    const data = yaml.parse(yamlStr);
    console.log('Draft value:', data.draft);
    console.log('Type:', typeof data.draft);
  } else {
    console.log('No frontmatter match');
  }
} catch (e) {
  console.error(e);
}
