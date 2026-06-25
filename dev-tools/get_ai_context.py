import os
import sys
import json

# Add dev-tools to path
sys.path.append(os.path.join(os.getcwd(), "dev-tools"))

from tdw_services.services.dependency_graph import DependencyGraph
from tdw_services.services.vector_store import VectorStore

def get_context(filepath: str, diff_text: str, graph: DependencyGraph, store: VectorStore, n_results: int = 3):
    if not isinstance(filepath, str) or not filepath.strip():
        raise ValueError("filepath must be a non-empty string")
    if not isinstance(diff_text, str) or not diff_text.strip():
        raise ValueError("diff_text must be a non-empty string")

    context = {
        "path": filepath,
        "dependencies": graph.get_dependencies(filepath),
        "dependents": graph.get_dependents(filepath),
        "semantic": []
    }

    try:
        # Use diff_text for semantic search
        results = store.query(diff_text, n_results=n_results)
        for res in results:
            if res['metadata'].get('path') != filepath:
                context["semantic"].append({
                    "path": res['metadata'].get('path'),
                    "document": res['document']
                })
    except Exception as e:
        print(f"Error querying vector store: {e}", file=sys.stderr)

    return context

if __name__ == "__main__":
    # Load input from stdin to avoid E2BIG
    try:
        input_data = json.load(sys.stdin)
    except Exception as e:
        print(f"Error parsing input JSON: {e}", file=sys.stderr)
        sys.exit(1)

    files_data = input_data.get("files", [])
    if not files_data:
        print(json.dumps([]))
        sys.exit(0)

    # Initialize services once
    graph = DependencyGraph()
    store = VectorStore()

    results = []
    for item in files_data:
        filepath = item.get("path")
        diff_text = item.get("diff")
        if isinstance(filepath, str) and filepath.strip() and isinstance(diff_text, str) and diff_text.strip():
            try:
                results.append(get_context(filepath, diff_text, graph, store))
            except ValueError as e:
                print(f"Skipping invalid item: {e}", file=sys.stderr)

    print(json.dumps(results))
