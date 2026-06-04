import chromadb
from chromadb.utils import embedding_functions
from pr_review_pipeline.config import settings
from typing import List, Dict, Iterable

class Chunk:
    def __init__(self, content: str, metadata: Dict):
        self.content = content
        self.metadata = metadata

class InMemoryVectorStore:
    """Tiny lexical fallback store."""
    def __init__(self):
        self._chunks = []

    def add_chunks(self, chunks: List[Dict]):
        for c in chunks:
            self._chunks.append(Chunk(c['content'], c['metadata']))

    def query(self, query_text: str, n_results: int = 5) -> List[Dict]:
        terms = {term.lower() for term in query_text.split() if len(term) > 2}
        scored = []
        for chunk in self._chunks:
            text = chunk.content.lower()
            score = sum(1 for term in terms if term in text)
            if score:
                scored.append((score, chunk))
        scored.sort(key=lambda item: item[0], reverse=True)
        return [{"content": c.content, "metadata": c.metadata} for _, c in scored[:n_results]]

class VectorStore:
    def __init__(self, collection_name: str = "repo_context"):
        self.client = chromadb.PersistentClient(path=".rag")
        self.embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name=settings.embedding_model
        )
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=self.embedding_function
        )

    def add_chunks(self, chunks: List[Dict]):
        ids = [f"{c['metadata']['source_path']}_{c['metadata']['chunk_index']}" for c in chunks]
        documents = [c['content'] for c in chunks]
        metadatas = [c['metadata'] for c in chunks]

        self.collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatas
        )

    def query(self, query_text: str, n_results: int = 5) -> List[Dict]:
        results = self.collection.query(
            query_texts=[query_text],
            n_results=n_results
        )

        output = []
        if results['documents']:
            for i in range(len(results['documents'][0])):
                output.append({
                    "content": results['documents'][0][i],
                    "metadata": results['metadatas'][0][i]
                })
        return output
