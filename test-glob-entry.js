const modules = import.meta.glob('/content/posts/*.md', { eager: true, query: '?raw' });
console.log(modules);
