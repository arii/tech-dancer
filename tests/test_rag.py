from pathlib import Path

from pr_review_pipeline.rag import Retriever, chunk_markdown


def test_markdown_chunking_preserves_source_metadata() -> None:
    chunks = chunk_markdown("CODEX.md", "# Pull Request Requirements\n\nTest plan required. " * 50, chunk_size=25, overlap=5)

    assert chunks
    assert chunks[0].metadata["source_path"] == "CODEX.md"
    assert "content_hash" in chunks[0].metadata


def test_retriever_returns_relevant_codex_chunks(tmp_path: Path) -> None:
    codex = tmp_path / "CODEX.md"
    codex.write_text("# Rules\n\nEvery PR needs a test plan and issue reference.", encoding="utf-8")

    retriever = Retriever(tmp_path)
    results = retriever.retrieve(["test plan required"], limit=1)

    assert results
    assert results[0]["metadata"]["source_path"] == "CODEX.md"
