import fs from 'fs';
import path from 'path';
import ts from 'typescript';

export function getRouteMap(): Record<string, string> {
  const routesPath = path.resolve(process.cwd(), 'src/config/routes.ts');
  const fileContent = fs.readFileSync(routesPath, 'utf8');

  const sourceFile = ts.createSourceFile('routes.ts', fileContent, ts.ScriptTarget.Latest, true);
  const routeMap: Record<string, string> = {};

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      let routePath = '';
      let componentPath = '';

      for (const prop of node.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          if (prop.name.text === 'path' && ts.isStringLiteral(prop.initializer)) {
            routePath = prop.initializer.text;
          }
          if (prop.name.text === 'lazy') {
            const findImport = (n: ts.Node) => {
              if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword) {
                if (n.arguments.length > 0 && ts.isStringLiteral(n.arguments[0])) {
                  const importPath = n.arguments[0].text;
                  if (importPath.startsWith('@/')) {
                    componentPath = `src/${importPath.slice(2)}.tsx`;
                  }
                }
              }
              ts.forEachChild(n, findImport);
            };
            findImport(prop.initializer);
          }
        }
      }

      if (routePath && componentPath) {
        routeMap[componentPath] = routePath;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return routeMap;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(getRouteMap());
}
