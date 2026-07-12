# pylint: disable=f-string-without-interpolation,invalid-name,missing-docstring,too-many-locals,too-many-nested-blocks,unused-argument
import os

from dev_tools.services.vector_store import VectorStore


def chunk_file(filepath: str, content: str, chunk_size: int = 1000):
    """Simple chunking by character count (approximate)."""
    chunks = []
    for i in range(0, len(content), chunk_size):
        chunks.append(content[i : i + chunk_size])
    return chunks


def index_codebase():
    print("🚀 Indexing codebase...")
    store = VectorStore()
    if not store.is_available():
        print("⚠️ ChromaDB or dependencies not available. Skipping indexing.")
        return
    store.reset()

    extensions = {".ts", ".tsx", ".py", ".md"}
    exclude_dirs = {".git", "node_modules", "dist", "artifacts", "build", ".venv"}

    documents = []
    metadatas = []
    ids = []

    for root, dirs, files in os.walk("."):
        # Prune excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in extensions:
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()

                    if not content.strip():
                        continue

                    file_chunks = chunk_file(filepath, content)
                    for i, chunk in enumerate(file_chunks):
                        documents.append(chunk)
                        metadatas.append({"path": filepath, "chunk": i})
                        ids.append(f"{filepath}_{i}")

                        # Batch add every 100 documents
                        if len(documents) >= 100:
                            store.add_documents(documents, metadatas, ids)
                            documents = []
                            metadatas = []
                            ids = []
                            print(f"Indexed 100 chunks...")
                except Exception as e:
                    print(f"⚠️ Error reading {filepath}: {e}")

    # Final batch
    if documents:
        store.add_documents(documents, metadatas, ids)

    print("✅ Indexing complete!")


if __name__ == "__main__":
    index_codebase()
