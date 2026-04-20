import matter from 'gray-matter';
const resourceModules = import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' });
for (const path in resourceModules) {
  const raw = resourceModules[path];
  const contentStr = typeof raw === 'string' ? raw : raw?.default;
  console.log("path:", path, "contentStr typeof:", typeof contentStr);
  if (contentStr === undefined) {
    console.log("raw:", raw);
  }
}
