from pydantic import BaseModel
from typing import Literal, Optional

class RequirementFinding(BaseModel):
    requirement: str
    severity: Literal["blocking", "warning", "info"]
    evidence: Optional[str] = None
    suggested_fix: Optional[str] = None

class SatisfiedRequirement(BaseModel):
    requirement: str
    evidence: str

class SpecReport(BaseModel):
    pr_number: int
    status: Literal["pass", "fail", "warning"]
    score: int
    missing_requirements: list[RequirementFinding]
    satisfied_requirements: list[SatisfiedRequirement]
    needs_human_review: bool
