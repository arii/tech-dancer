import ts from 'typescript';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Parses src/config/routes.ts and returns a map of source file paths to their public URLs.
 * Example: 'src/pages/Blog.tsx' -> ['/blog']
 */
export function getRouteMap(): Record<string, string[]> {
  const routesFile = path.resolve(process.cwd(), 'src/config/routes.ts');
  if (!fs.existsSync(routesFile)) {
    console.warn(`Could not find ${routesFile}`);
    return {};
  }

  const source = fs.readFileSync(routesFile, 'utf8');
  const sourceFile = ts.createSourceFile('routes.ts', source, ts.ScriptTarget.Latest, true);

  const routeMap: Record<string, string[]> = {};

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      let pathStr = '';
      let componentFile = '';

      node.properties.forEach(prop => {
        if (ts.isPropertyAssignment(prop)) {
          if (ts.isIdentifier(prop.name) && prop.name.text === 'path') {
            if (ts.isStringLiteral(prop.initializer)) {
              pathStr = prop.initializer.text;
            }
          }
          if (ts.isIdentifier(prop.name) && prop.name.text === 'lazy') {
            if (ts.isArrowFunction(prop.initializer)) {
              const traverseArrow = (n: ts.Node) => {
                if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) {
                  if (n.arguments.length > 0 && ts.isStringLiteral(n.arguments[0])) {
                    componentFile = n.arguments[0].text;
                  }
                }
                ts.forEachChild(n, traverseArrow);
              };
              traverseArrow(prop.initializer);
            }
          }
        }
      });

      if (pathStr && componentFile) {
        if (componentFile.startsWith('@/')) {
          const resolved = componentFile.replace('@/', 'src/') + '.tsx';
          if (!routeMap[resolved]) {
            routeMap[resolved] = [];
          }
          if (!routeMap[resolved].includes(pathStr)) {
            routeMap[resolved].push(pathStr);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return routeMap;
}

// Allow running standalone for debugging
const isMain = import.meta.url ? fileURLToPath(import.meta.url) === process.argv[1] : false;
if (isMain) {
  console.log(JSON.stringify(getRouteMap(), null, 2));
}
