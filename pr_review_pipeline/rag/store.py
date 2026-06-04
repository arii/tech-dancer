from pathlib import Path
from typing import Iterable

from .chunker import Chunk


class InMemoryVectorStore:
    """Tiny lexical fallback store used by tests and fixture mode."""

    def __init__(self, chunks: Iterable[Chunk] = ()) -> None:
        self._chunks = list(chunks)

    def add(self, chunks: Iterable[Chunk]) -> None:
        self._chunks.extend(chunks)

    def query(self, query: str, limit: int = 5) -> list[Chunk]:
        terms = {term.lower() for term in query.split() if len(term) > 2}
        scored: list[tuple[int, Chunk]] = []
        for chunk in self._chunks:
            text = chunk.content.lower()
            score = sum(1 for term in terms if term in text)
            if score:
                scored.append((score, chunk))
        scored.sort(key=lambda item: item[0], reverse=True)
        return [chunk for _, chunk in scored[:limit]]


class SentenceTransformerEmbeddingFunction:
    """Chroma-compatible embedding function loaded lazily for CPU local RAG."""

    def __init__(self, model_name: str) -> None:
        from sentence_transformers import SentenceTransformer

        self.model = SentenceTransformer(model_name)

    def __call__(self, input: list[str]) -> list[list[float]]:  # Chroma's embedding function protocol uses `input`.
        vectors = self.model.encode(input, convert_to_numpy=True, normalize_embeddings=True)
        return vectors.tolist()


class ChromaVectorStore:
    """Persistent ChromaDB store backed by sentence-transformers embeddings."""

    def __init__(self, path: Path, embedding_model: str, collection_name: str = "repo_guidance") -> None:
        import chromadb

        self.client = chromadb.PersistentClient(path=str(path))
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=SentenceTransformerEmbeddingFunction(embedding_model),
        )

    def reset(self, chunks: Iterable[Chunk]) -> None:
        chunk_list = list(chunks)
        if not chunk_list:
            return
        ids = [f"{chunk.metadata['source_path']}:{chunk.metadata['chunk_index']}:{chunk.metadata['content_hash']}" for chunk in chunk_list]
        self.collection.upsert(
            ids=ids,
            documents=[chunk.content for chunk in chunk_list],
            metadatas=[chunk.metadata for chunk in chunk_list],
        )

    def query(self, query: str, limit: int = 5) -> list[Chunk]:
        result = self.collection.query(query_texts=[query], n_results=limit)
        docs = result.get("documents", [[]])[0]
        metadata = result.get("metadatas", [[]])[0]
        return [Chunk(content=doc, metadata=meta) for doc, meta in zip(docs, metadata, strict=False)]


def chroma_path(repo: Path) -> Path:
    return repo / ".rag" / "chroma"
