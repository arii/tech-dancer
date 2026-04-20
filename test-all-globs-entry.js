import matter from 'gray-matter';
const postModules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
const resourceModules = import.meta.glob('/content/resources/*.md', { eager: true, query: '?raw' });
const studyModules = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' });
const eventModules = import.meta.glob('/content/events/*.md', { eager: true, query: '?raw' });

const allModules = { ...postModules, ...resourceModules, ...studyModules, ...eventModules };
for (const path in allModules) {
  const contentStr = typeof allModules[path] === 'string' ? allModules[path] : allModules[path].default;
  console.log(path, typeof contentStr);
  try {
     matter(contentStr);
  } catch (e) {
     console.error("FAILED ON", path, e.message);
  }
}
