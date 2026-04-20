import matter from 'gray-matter';
const studyModules = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' });
for (const path in studyModules) {
  const raw = studyModules[path];
  const contentStr = typeof raw === 'string' ? raw : raw?.default;
  console.log("path:", path, "contentStr typeof:", typeof contentStr);
  if (contentStr === undefined) {
    console.log("raw:", raw);
  }
}
