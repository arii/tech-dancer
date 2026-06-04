from pr_review_pipeline.rag.store import VectorStore

class Retriever:
    def __init__(self, store: VectorStore):
        self.store = store

    def get_context(self, query: str) -> str:
        results = self.store.query(query)
        context_parts = []
        for r in results:
            source = r['metadata']['source_path']
            section = r['metadata']['section']
            content = r['content']
            context_parts.append(f"--- Source: {source} (Section: {section}) ---\n{content}")

        return "\n\n".join(context_parts)
