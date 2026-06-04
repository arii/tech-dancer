"""Lightweight retrieval-augmented context for RepoAuditor reviews.

The implementation intentionally avoids a separate vector database server. It stores
chunk metadata and embeddings in a JSON file, while supporting Google AI
`text-embedding-004` when an API key is available and a deterministic local
fallback for tests/offline development.
"""

from __future__ import annotations

import hashlib
import json
import math
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple

import requests

DEFAULT_INDEX_PATH = ".agent/review-rag-index.json"
DEFAULT_CHUNK_TOKENS = 500
DEFAULT_EMBEDDING_DIMENSIONS = 96
GOOGLE_EMBEDDING_MODEL = "text-embedding-004"

_TOKEN_RE = re.compile(r"[A-Za-z0-9_./#:-]+")
_DIFF_FILE_RE = re.compile(r"^\+\+\+ b/(.+)$", re.MULTILINE)
_ADDED_LINE_RE = re.compile(r"^\+(?!\+\+)(.*)$", re.MULTILINE)


@dataclass(frozen=True)
class RAGChunk:
    """A stored chunk of historical or standards context."""

    id: str
    source_type: str
    title: str
    text: str
    metadata: Dict[str, Any]
    embedding: List[float]

    def to_json(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "source_type": self.source_type,
            "title": self.title,
            "text": self.text,
            "metadata": self.metadata,
            "embedding": self.embedding,
        }

    @classmethod
    def from_json(cls, data: Dict[str, Any]) -> "RAGChunk":
        return cls(
            id=str(data.get("id", "")),
            source_type=str(data.get("source_type", "unknown")),
            title=str(data.get("title", "Untitled")),
            text=str(data.get("text", "")),
            metadata=dict(data.get("metadata", {})),
            embedding=[float(v) for v in data.get("embedding", [])],
        )


class HashEmbeddingProvider:
    """Deterministic embedding fallback for local/offline operation."""

    def __init__(self, dimensions: int = DEFAULT_EMBEDDING_DIMENSIONS):
        self.dimensions = dimensions

    def embed(self, text: str) -> List[float]:
        vector = [0.0] * self.dimensions
        for token in tokenize(text):
            digest = hashlib.sha256(token.encode("utf-8")).digest()
            idx = int.from_bytes(digest[:4], "big") % self.dimensions
            sign = 1.0 if digest[4] % 2 == 0 else -1.0
            vector[idx] += sign
        return normalize(vector)


class GoogleEmbeddingProvider:
    """Google AI embedding provider using `text-embedding-004`."""

    def __init__(self, api_key: str, model: str = GOOGLE_EMBEDDING_MODEL):
        self.api_key = api_key
        self.model = model

    def embed(self, text: str) -> List[float]:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:embedContent?key={self.api_key}"
        payload = {"content": {"parts": [{"text": text}]}}
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        values = response.json().get("embedding", {}).get("values", [])
        return normalize([float(v) for v in values])


class ResilientEmbeddingProvider:
    """Prefers Google embeddings and falls back to deterministic hashes on errors."""

    def __init__(self, api_key: Optional[str] = None):
        self._google = GoogleEmbeddingProvider(api_key) if api_key else None
        self._fallback = HashEmbeddingProvider()

    def embed(self, text: str) -> List[float]:
        if self._google:
            try:
                return self._google.embed(text)
            except Exception:
                pass
        return self._fallback.embed(text)


def tokenize(text: str) -> List[str]:
    return [match.group(0).lower() for match in _TOKEN_RE.finditer(text or "")]


def normalize(vector: Sequence[float]) -> List[float]:
    norm = math.sqrt(sum(value * value for value in vector))
    if norm == 0:
        return [0.0 for _ in vector]
    return [value / norm for value in vector]


def cosine_similarity(left: Sequence[float], right: Sequence[float]) -> float:
    if not left or not right:
        return 0.0
    size = min(len(left), len(right))
    return sum(left[i] * right[i] for i in range(size))


def chunk_text(text: str, max_tokens: int = DEFAULT_CHUNK_TOKENS) -> List[str]:
    """Chunk text into roughly `max_tokens` token segments preserving order."""
    words = (text or "").split()
    if not words:
        return []
    return [" ".join(words[i : i + max_tokens]) for i in range(0, len(words), max_tokens)]


def build_review_queries(diff: str, limit: int = 5) -> List[str]:
    """Generate deterministic retrieval queries from a PR diff."""
    files = _DIFF_FILE_RE.findall(diff or "")
    added_lines = [line.strip() for line in _ADDED_LINE_RE.findall(diff or "") if line.strip()]
    keywords = " ".join(tokenize(" ".join(added_lines[:80]))[:120])

    queries: List[str] = []
    if files:
        queries.append("changed files " + " ".join(files[:20]))
    if keywords:
        queries.append("new code patterns " + keywords)

    for file_path in files[:3]:
        related = [line for line in added_lines if Path(file_path).stem.lower() in line.lower()][:20]
        query = f"historical decisions and CI failures for {file_path}"
        if related:
            query += " " + " ".join(related)
        queries.append(query)

    if not queries and diff:
        queries.append(diff[:1200])

    deduped: List[str] = []
    for query in queries:
        if query not in deduped:
            deduped.append(query)
    return deduped[:limit]


class ReviewRAGStore:
    """JSON-backed vector store for RepoAuditor review context."""

    def __init__(self, index_path: str = DEFAULT_INDEX_PATH, embedding_provider: Optional[Any] = None):
        self.index_path = index_path
        api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")
        self.embedding_provider = embedding_provider or ResilientEmbeddingProvider(api_key=api_key)
        self.chunks: List[RAGChunk] = []
        self.load()

    def load(self) -> None:
        if not os.path.exists(self.index_path):
            self.chunks = []
            return
        try:
            with open(self.index_path, "r", encoding="utf-8") as handle:
                payload = json.load(handle)
            self.chunks = [RAGChunk.from_json(item) for item in payload.get("chunks", [])]
        except Exception:
            self.chunks = []

    def save(self) -> None:
        Path(self.index_path).parent.mkdir(parents=True, exist_ok=True)
        payload = {
            "version": 1,
            "embedding_model": GOOGLE_EMBEDDING_MODEL,
            "chunk_tokens": DEFAULT_CHUNK_TOKENS,
            "chunks": [chunk.to_json() for chunk in self.chunks],
        }
        with open(self.index_path, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2, sort_keys=True)
            handle.write("\n")

    def replace(self, documents: Iterable[Dict[str, Any]], persist: bool = True) -> int:
        self.chunks = []
        for document in documents:
            self.add_document(**document)
        if persist:
            self.save()
        return len(self.chunks)

    def add_document(self, source_type: str, title: str, text: str, metadata: Optional[Dict[str, Any]] = None) -> None:
        for idx, chunk in enumerate(chunk_text(text)):
            chunk_id = hashlib.sha256(f"{source_type}\0{title}\0{idx}\0{chunk}".encode("utf-8")).hexdigest()[:20]
            self.chunks.append(
                RAGChunk(
                    id=chunk_id,
                    source_type=source_type,
                    title=title,
                    text=chunk,
                    metadata={**(metadata or {}), "chunk_index": idx},
                    embedding=self.embedding_provider.embed(chunk),
                )
            )

    def retrieve(self, queries: Sequence[str], top_k: int = 8, source_type: Optional[str] = None) -> List[Dict[str, Any]]:
        scored: Dict[str, Tuple[float, RAGChunk]] = {}
        query_embeddings = [self.embedding_provider.embed(query) for query in queries if query.strip()]
        for chunk in self.chunks:
            if source_type and chunk.source_type != source_type:
                continue
            score = max((cosine_similarity(query_embedding, chunk.embedding) for query_embedding in query_embeddings), default=0.0)
            if score <= 0:
                continue
            current = scored.get(chunk.id)
            if current is None or score > current[0]:
                scored[chunk.id] = (score, chunk)
        return [
            {**chunk.to_json(), "score": score}
            for score, chunk in sorted(scored.values(), key=lambda item: item[0], reverse=True)[:top_k]
        ]

    def build_prompt_context(self, diff: str, top_k: int = 8, standards_k: int = 4) -> Dict[str, Any]:
        queries = build_review_queries(diff)
        historical = self.retrieve(queries, top_k=top_k)
        standards = self.retrieve(queries or ["repository coding standards CODEX AGENTS"], top_k=standards_k, source_type="coding_standard")
        if not standards:
            standards = [
                {**chunk.to_json(), "score": 0.0}
                for chunk in self.chunks
                if chunk.source_type == "coding_standard"
            ][:standards_k]
        return {
            "queries": queries,
            "historical_chunks": [chunk for chunk in historical if chunk.get("source_type") != "coding_standard"],
            "codex_chunks": standards,
        }


def collect_spec_documents(repo_root: str = ".") -> List[Dict[str, Any]]:
    """Collect CODEX/AGENTS standards documents from the repository."""
    documents: List[Dict[str, Any]] = []
    for filename in ("CODEX.md", "AGENTS.md"):
        path = Path(repo_root) / filename
        if path.exists():
            documents.append(
                {
                    "source_type": "coding_standard",
                    "title": filename,
                    "text": path.read_text(encoding="utf-8", errors="ignore"),
                    "metadata": {"path": filename},
                }
            )
    return documents


def format_chunks_for_prompt(chunks: Sequence[Dict[str, Any]], max_chars: int = 6000) -> str:
    """Render retrieved chunks compactly for LLM prompts."""
    rendered: List[str] = []
    used = 0
    for chunk in chunks:
        header = f"[{chunk.get('source_type', 'unknown')}] {chunk.get('title', 'Untitled')} (score={chunk.get('score', 0):.3f})"
        text = str(chunk.get("text", "")).strip()
        entry = f"{header}\n{text}"
        if used + len(entry) > max_chars:
            break
        rendered.append(entry)
        used += len(entry)
    return "\n\n---\n\n".join(rendered) if rendered else "(none retrieved)"
