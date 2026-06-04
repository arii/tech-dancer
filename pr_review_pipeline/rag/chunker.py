from dataclasses import dataclass
from hashlib import sha256
import re


@dataclass(frozen=True)
class Chunk:
    content: str
    metadata: dict[str, str | int]


def _section_for(text: str, fallback: str) -> str:
    headings = re.findall(r"^#{1,6}\s+(.+)$", text, flags=re.MULTILINE)
    return headings[-1].strip() if headings else fallback


def chunk_markdown(source_path: str, content: str, chunk_size: int = 700, overlap: int = 100) -> list[Chunk]:
    words = content.split()
    if not words:
        return []

    chunks: list[Chunk] = []
    start = 0
    index = 0
    while start < len(words):
        end = min(start + chunk_size, len(words))
        chunk_text = " ".join(words[start:end])
        chunks.append(
            Chunk(
                content=chunk_text,
                metadata={
                    "source_path": source_path,
                    "section": _section_for(chunk_text, source_path),
                    "chunk_index": index,
                    "content_hash": sha256(chunk_text.encode("utf-8")).hexdigest()[:12],
                },
            )
        )
        if end == len(words):
            break
        start = max(end - overlap, start + 1)
        index += 1
    return chunks
