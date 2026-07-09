import os
import sys
import json

import click

from dev_tools.services.dependency_graph import DependencyGraph
from dev_tools.services.vector_store import VectorStore
from dev_tools.utils import extract_semantic_context

def get_context(filepath: str, diff_text: str, graph: DependencyGraph, store: VectorStore, n_results: int = 3):
    context = {
        "path": filepath,
        "dependencies": [],
        "dependents": [],
        "semantic": []
    }

    if not isinstance(filepath, str) or not isinstance(diff_text, str) or not filepath.strip() or not diff_text.strip():
        return context

    context["dependencies"] = graph.get_dependencies(filepath)
    context["dependents"] = graph.get_dependents(filepath)
    context["semantic"] = extract_semantic_context(filepath, diff_text, store, n_results=n_results)

    return context

@click.command()
@click.argument('input_file', type=click.File('r'), default='-')
def main(input_file):
    """Retrieve dependency and semantic context for a set of changed files."""
    try:
        input_data = json.load(input_file)
    except Exception as e:
        click.echo(f"Error parsing input JSON: {e}", err=True)
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
        if filepath and diff_text:
            results.append(get_context(filepath, diff_text, graph, store))

    click.echo(json.dumps(results))

if __name__ == "__main__":
    main()
