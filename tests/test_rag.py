from pr_review_pipeline.rag.chunker import MarkdownChunker
from pr_review_pipeline.rag.store import VectorStore
import os
import shutil

def test_chunking():
    chunker = MarkdownChunker(chunk_size=10)
    text = "# Title\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5"
    chunks = chunker.chunk(text, "test.md")
    assert len(chunks) > 1
    assert chunks[0]["metadata"]["source_path"] == "test.md"

def test_vector_store_and_retrieval():
    if os.path.exists(".chroma_test"):
        shutil.rmtree(".chroma_test")

    # Use a separate path for testing
    import chromadb
    client = chromadb.PersistentClient(path=".chroma_test")

    # We'll just test the logic here, assuming SentenceTransformer works
    from chromadb.utils import embedding_functions
    # Use a dummy embedding function to avoid downloading model in every test if possible
    # but store.py uses SentenceTransformer.

    store = VectorStore(collection_name="test_collection")
    chunks = [
        {"content": "PRs must have a test plan.", "metadata": {"source_path": "CODEX.md", "section": "PR", "chunk_index": 0}},
        {"content": "Accessibility is important.", "metadata": {"source_path": "CODEX.md", "section": "UI", "chunk_index": 1}}
    ]
    store.add_chunks(chunks)

    results = store.query("test plan")
    assert len(results) > 0
    assert "test plan" in results[0]["content"].lower()

    if os.path.exists(".chroma_test"):
        shutil.rmtree(".chroma_test")
