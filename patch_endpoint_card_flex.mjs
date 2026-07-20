import fs from 'fs';

const file = 'src/components/ui/EndpointCard.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Replace `<Box display="flex" flexDirection="col" gap={2}>` with `<Stack gap={2}>`
content = content.replace('<Box display="flex" flexDirection="col" gap={2}>', '<Stack gap={2}>');
content = content.replace('</Box>\n    </Stack>', '</Stack>\n    </Stack>');

fs.writeFileSync(file, content);
