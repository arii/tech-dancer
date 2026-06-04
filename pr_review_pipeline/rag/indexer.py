from pathlib import Path

from pr_review_pipeline.repo_context import discover_guidance_files

from .chunker import Chunk, chunk_markdown
from .store import ChromaVectorStore, InMemoryVectorStore, chroma_path


def build_chunks(repo: Path, extra_docs: list[Path] | None = None) -> list[Chunk]:
    paths = discover_guidance_files(repo)
    if extra_docs:
        paths.extend(path for path in extra_docs if path not in paths)
    chunks: list[Chunk] = []
    for path in paths:
        if path.exists() and path.is_file():
            try:
                source_path = str(path.relative_to(repo)) if path.is_relative_to(repo) else path.name
                chunks.extend(chunk_markdown(source_path, path.read_text(encoding="utf-8")))
            except UnicodeDecodeError:
                continue
    return chunks


def build_memory_store(repo: Path, extra_docs: list[Path] | None = None) -> InMemoryVectorStore:
    return InMemoryVectorStore(build_chunks(repo, extra_docs))


def build_chroma_store(repo: Path, embedding_model: str, extra_docs: list[Path] | None = None) -> ChromaVectorStore:
    chunks = build_chunks(repo, extra_docs)
    store = ChromaVectorStore(chroma_path(repo), embedding_model)
    store.reset(chunks)
    return store
