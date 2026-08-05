import * as fs from 'fs';
import * as path from 'path';
import { resolveLatest } from './api/_lib/versions.ts';

async function main() {
    const dir = '.github/workflows';
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yml'));

    // We want to use the version resolution to get the latest action version
    // Then replace it in the files

    const actionCache = new Map<string, string>();
    let numFilesNeedingUpdates = 0;

    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;

        // Update Node.js action
        content = content.replace(/node-version:\s*['"]?24.*['"]?/g, 'node-version-file: .node-version');

        // Update pnpm version to use exclusively pnpm
        content = content.replace(/\bnpm (install|run|ci)\b/g, 'pnpm $1');
        content = content.replace(/\byarn (install|run|add)\b/g, 'pnpm $1');

        const actionRegex = /uses: ([a-zA-Z0-9_\-\/]+)@([a-zA-Z0-9_\-\.]+)(.*)/g;
        let match;
        let newContent = content;
        const replacements = [];

        // Find all matches first
        while ((match = actionRegex.exec(content)) !== null) {
            const fullMatch = match[0];
            const actionName = match[1];
            const currentVersion = match[2];
            const restOfLine = match[3];

            if (actionName.startsWith('./') || actionName.includes('boomtick/') || actionName === 'write' || actionName === 'read') {
                continue;
            }

            if (!actionCache.has(actionName)) {
                let latestVersion = await resolveLatest('gh-action', actionName);
                if (latestVersion) {
                    if (latestVersion.includes('codeql-bundle-')) {
                        latestVersion = 'v4'; // Map codeql to v4 (since v4 is used in ci.yml)
                    }
                    actionCache.set(actionName, latestVersion);
                } else {
                    actionCache.set(actionName, currentVersion); // fallback
                }
            }

            let resolvedVersion = actionCache.get(actionName);
            // We want the major version (e.g., v7) if possible
            if (resolvedVersion && resolvedVersion.startsWith('v')) {
                const major = resolvedVersion.split('.')[0];
                if (actionName === 'github/codeql-action/init' || actionName === 'github/codeql-action/analyze') {
                    resolvedVersion = 'v4';
                } else {
                    resolvedVersion = major;
                }
            }

            if (actionName === 'github/codeql-action/init' || actionName === 'github/codeql-action/analyze') {
                resolvedVersion = 'v4';
            }

            replacements.push({
                fullMatch,
                replacement: `uses: ${actionName}@${resolvedVersion}${restOfLine}`
            });
        }

        // Apply replacements
        for (const { fullMatch, replacement } of replacements) {
            newContent = newContent.replace(fullMatch, replacement);
        }

        if (initialContent !== newContent) {
           fs.writeFileSync(filePath, newContent, 'utf8');
           console.log(`Updated ${file}`);
           numFilesNeedingUpdates++;
        }
    }

    console.log(`Total files updated: ${numFilesNeedingUpdates}`);
}
main();
