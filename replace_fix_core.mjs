import fs from 'fs';
import path from 'path';

function replaceFileContent(filePath, replaces) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replacement] of replaces) {
        content = content.split(search).join(replacement);
    }
    fs.writeFileSync(filePath, content);
}

// CoreServicesGrid.tsx fixes
replaceFileContent('src/components/services/CoreServicesGrid.tsx', [
    ['</Stack>\n              </Box>', '</Stack>'], // remove the extra box
    ['</div>', '</Stack>'] // replace all the </div> with </Stack> for the other accordions
]);
