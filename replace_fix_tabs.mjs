import fs from 'fs';
import path from 'path';

function replaceFileContent(filePath, replaces) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replacement] of replaces) {
        content = content.split(search).join(replacement);
    }
    fs.writeFileSync(filePath, content);
}

// FeatureTabs.tsx fixes
replaceFileContent('src/components/services/FeatureTabs.tsx', [
    ['</p>\n              </Stack>\n            </Stack>\n          </Stack>', '</Box>\n              </Box>\n            </Box>\n          </Grid>']
]);

// CoreServicesGrid.tsx fixes
replaceFileContent('src/components/services/CoreServicesGrid.tsx', [
    ['</Stack>\n              </Stack>\n              </Stack>', '</Stack>\n              </Stack>\n              </Box>']
]);
