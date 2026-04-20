const modules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
for (const path in modules) {
  console.log(path, typeof modules[path].default, modules[path].default.slice(0, 50));
}
