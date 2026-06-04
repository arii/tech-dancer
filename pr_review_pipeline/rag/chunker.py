import re
from typing import List, Dict

class MarkdownChunker:
    def __init__(self, chunk_size: int = 800, overlap: int = 100):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk(self, text: str, source_path: str) -> List[Dict]:
        # Simple heading-based splitting or fixed-size splitting
        # For v1, let's do simple line-based chunking that respects headings
        lines = text.split("\n")
        chunks = []
        current_chunk = []
        current_size = 0

        section = "root"

        for line in lines:
            if line.startswith("#"):
                # Potential section start
                section = line.strip("# ").strip()

            line_size = len(line.split()) # Rough token estimate

            if current_size + line_size > self.chunk_size and current_chunk:
                content = "\n".join(current_chunk)
                chunks.append({
                    "content": content,
                    "metadata": {
                        "source_path": source_path,
                        "section": section,
                        "chunk_index": len(chunks)
                    }
                })
                # Keep some lines for overlap
                overlap_lines = current_chunk[-3:] if len(current_chunk) > 3 else current_chunk
                current_chunk = overlap_lines + [line]
                current_size = sum(len(l.split()) for l in current_chunk)
            else:
                current_chunk.append(line)
                current_size += line_size

        if current_chunk:
            chunks.append({
                "content": "\n".join(current_chunk),
                "metadata": {
                    "source_path": source_path,
                    "section": section,
                    "chunk_index": len(chunks)
                }
            })

        return chunks
