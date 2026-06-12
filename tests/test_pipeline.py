from pr_review_pipeline.schemas.spec_report import SpecReport
from pr_review_pipeline.schemas.review_report import ReviewReport
from pr_review_pipeline.schemas.issue_plan import IssuePlan
from pr_review_pipeline.rag.chunker import MarkdownChunker
from typing import List, Dict

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

def test_schemas():
    SpecReport(pr_number=1, status="pass", score=100, missing_requirements=[], satisfied_requirements=[], needs_human_review=False)
    ReviewReport(pr_number=1, overall_status="approved", findings=[], summary="ok", recommended_tests=[])
    IssuePlan(pr_number=1, issues=[])

def test_rag_logic():
    chunker = MarkdownChunker(chunk_size=10)
    chunks = chunker.chunk("# Title\nContent line", "test.md")
    assert len(chunks) > 0

    store = InMemoryVectorStore()
    store.add_chunks(chunks)
    results = store.query("Title")
    assert len(results) > 0
