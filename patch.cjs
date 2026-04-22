const fs = require('fs');

let content = fs.readFileSync('src/components/ui/PathSelector.tsx', 'utf8');
content = content.replace(/span: { base: 1, lg: 7 } as const,/g, 'span: { base: 1 } as const,\n    className: "lg:col-span-7",');
content = content.replace(/span: { base: 1, lg: 5 } as const,/g, 'span: { base: 1 } as const,\n    className: "lg:col-span-5",');
content = content.replace(/className="group touch-manipulation"/g, 'className={cn("group touch-manipulation", path.className)}');

fs.writeFileSync('src/components/ui/PathSelector.tsx', content);
