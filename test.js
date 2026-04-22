import fs from 'fs';
let content = fs.readFileSync('src/index.css', 'utf8');
if (!content.includes('@config')) {
  content = content.replace('@import "tailwindcss";', '@import "tailwindcss";\n@config "../tailwind.config.js";');
  fs.writeFileSync('src/index.css', content);
}
