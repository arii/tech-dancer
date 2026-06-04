from typing import Literal

from pydantic import BaseModel


class ReviewFinding(BaseModel):
    id: str
    severity: Literal["blocking", "non_blocking", "nit", "positive"]
    category: str
    file: str | None = None
    line: int | None = None
    title: str
    description: str
    evidence: str | None = None
    suggested_fix: str | None = None


class ReviewReport(BaseModel):
    pr_number: int
    overall_status: Literal["approved", "commented", "changes_requested"]
    findings: list[ReviewFinding]
    summary: str
    recommended_tests: list[str]
