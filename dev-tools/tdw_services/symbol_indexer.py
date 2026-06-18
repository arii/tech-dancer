import os
import re
from typing import Dict, List

class SymbolIndexer:
    def __init__(self, root_dir: str = "src"):
        self.root_dir = root_dir

    def extract_exports(self, filepath: str) -> List[str]:
        exports = []
        # Patterns for named exports
        # export const foo = ...
        # export function bar() ...
        # export type Baz = ...
        # export interface Quux ...
        # export class MyClass ...
        # export enum MyEnum ...
        named_export_pattern = r"export\s+(?:const|let|var|function|type|interface|class|enum)\s+([a-zA-Z0-9_]+)"

        # export { foo, bar as baz }
        brace_export_pattern = r"export\s+\{([^}]+)\}"

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

                # Find named exports
                named_matches = re.finditer(named_export_pattern, content)
                for match in named_matches:
                    exports.append(match.group(1))

                # Find braced exports
                brace_matches = re.finditer(brace_export_pattern, content)
                for match in brace_matches:
                    items = match.group(1).split(',')
                    for item in items:
                        item = item.strip()
                        if not item:
                            continue
                        # Handle 'foo as bar'
                        if ' as ' in item:
                            exports.append(item.split(' as ')[1].strip())
                        else:
                            exports.append(item)

        except Exception:
            pass

        return sorted(list(set(exports)))

    def index(self) -> Dict[str, List[str]]:
        symbols = {}
        if not os.path.exists(self.root_dir):
            return symbols

        for root, _, files in os.walk(self.root_dir):
            for file in files:
                if file.endswith(('.ts', '.tsx')):
                    path = os.path.join(root, file)
                    file_exports = self.extract_exports(path)
                    if file_exports:
                        symbols[path] = file_exports
        return symbols

if __name__ == "__main__":
    import sys
    root = sys.argv[1] if len(sys.argv) > 1 else "src"
    indexer = SymbolIndexer(root)
    inventory = indexer.index()
    for path, syms in sorted(inventory.items()):
        print(f"{path}: {', '.join(syms)}")
