import os
import subprocess
from pathlib import Path
from typing import Iterator, Set

from dev_tools.services.vector_store import VectorStore
from dev_tools.utils import list_tracked_files

def chunk_file(filepath: str, content: str, chunk_size: int = 1000):
    """Simple chunking by character count (approximate)."""
    chunks = []
    for i in range(0, len(content), chunk_size):
        chunks.append(content[i:i + chunk_size])
    return chunks

def get_files_to_index(extensions: Set[str], exclude_dirs: Set[str]) -> Iterator[str]:
    """
    Yields file paths to index.
    Prioritizes 'git ls-files' to ignore untracked scratchpad files.
    Falls back to 'os.walk' if git is unavailable.
    """
    ext_list = list(extensions)
    tracked_files = list_tracked_files(".", extensions=ext_list)
    for filepath in tracked_files:
        # Standardize on forward slashes for checking exclusions
        parts = filepath.split('/')
        if any(p in exclude_dirs for p in parts):
            continue
        yield filepath

def index_codebase():
    print("🚀 Indexing codebase...")
    store = VectorStore()
    if not store.is_available():
        print("⚠️ ChromaDB or dependencies not available. Skipping indexing.")
        return
    store.reset()

    extensions = {'.ts', '.tsx', '.py', '.md'}
    exclude_dirs = {'.git', 'node_modules', 'dist', 'artifacts', 'build', '.venv'}

    documents = []
    metadatas = []
    ids = []

    for filepath in get_files_to_index(extensions, exclude_dirs):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
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
