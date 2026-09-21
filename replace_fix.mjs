import fs from 'fs';
import path from 'path';

function replaceFileContent(filePath, replaces) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replacement] of replaces) {
        content = content.split(search).join(replacement);
    }
    fs.writeFileSync(filePath, content);
}

// CtaBanner.tsx fixes
replaceFileContent('src/components/services/CtaBanner.tsx', [
    ['</h3>', '</Box>'],
    ['</p>', '</Box>'],
    ['</button>', '</Box>'],
    ['</Box>\n      </Box>', '</Stack>\n      </Stack>'],
    ['</Box>\n  );', '</Stack>\n  );'],
    ['<div>', '<Stack gap={1}>'],
    ['<Box as="h3"', '<Box as="h3"'], // no change, just in case
]);

// ServicesHero.tsx fixes
replaceFileContent('src/components/services/ServicesHero.tsx', [
    ['</h4>', '</Box>'],
    ['</h1>', '</Box>'],
    ['</p>', '</Box>'],
    ['</Stack>\n    </Stack>', '</Box>\n    </Grid>']
]);

// CoreServicesGrid.tsx fixes
replaceFileContent('src/components/services/CoreServicesGrid.tsx', [
    ['</div>\n                  <Stack as="ul"', '</Box>\n                  <Stack as="ul"'],
    ['</Box>\n                </Stack>\n              </Stack>', '</Stack>\n              </Stack>\n              </Stack>']
]);
