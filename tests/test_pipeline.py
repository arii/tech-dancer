from pr_review_pipeline.schemas.spec_report import SpecReport
from pr_review_pipeline.schemas.review_report import ReviewReport
from pr_review_pipeline.schemas.issue_plan import IssuePlan
from pr_review_pipeline.rag.chunker import MarkdownChunker
from pr_review_pipeline.rag.store import InMemoryVectorStore

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
