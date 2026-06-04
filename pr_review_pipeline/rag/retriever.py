from pathlib import Path

from .indexer import build_memory_store


class Retriever:
    def __init__(self, repo: Path, extra_docs: list[Path] | None = None) -> None:
        self.store = build_memory_store(repo, extra_docs)

    def retrieve(self, queries: list[str], limit: int = 5) -> list[dict[str, object]]:
        seen: set[str] = set()
        results: list[dict[str, object]] = []
        for query in queries:
            for chunk in self.store.query(query, limit=limit):
                key = f"{chunk.metadata['source_path']}:{chunk.metadata['chunk_index']}"
                if key in seen:
                    continue
                seen.add(key)
                results.append({"content": chunk.content, "metadata": chunk.metadata})
        return results[:limit]
