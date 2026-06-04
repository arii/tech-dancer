from pydantic import BaseModel
from typing import Literal, Optional

class ReviewFinding(BaseModel):
    id: str
    severity: Literal["blocking", "non_blocking", "nit", "positive"]
    category: str
    file: Optional[str] = None
    line: Optional[int] = None
    title: str
    description: str
    evidence: Optional[str] = None
    suggested_fix: Optional[str] = None

class ReviewReport(BaseModel):
    pr_number: int
    overall_status: Literal["approved", "commented", "changes_requested"]
    findings: list[ReviewFinding]
    summary: str
    recommended_tests: list[str]
