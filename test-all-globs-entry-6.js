const studyModules = import.meta.glob('/content/studies/*.md', { eager: true, query: '?raw' });
console.log(studyModules);
