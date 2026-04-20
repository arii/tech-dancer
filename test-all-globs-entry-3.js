import matter from 'gray-matter';
const modules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
for (const path in modules) {
  const raw = modules[path];
  const contentStr = typeof raw === 'string' ? raw : raw?.default;
  console.log("path:", path, "contentStr typeof:", typeof contentStr);
  if (contentStr === undefined) {
    console.log("raw:", raw);
  }
}
