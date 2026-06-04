from typing import Literal

from pydantic import BaseModel, Field


class RequirementFinding(BaseModel):
    requirement: str
    severity: Literal["blocking", "warning", "info"]
    evidence: str | None = None
    suggested_fix: str | None = None


class SatisfiedRequirement(BaseModel):
    requirement: str
    evidence: str


class SpecReport(BaseModel):
    pr_number: int
    status: Literal["pass", "fail", "warning"]
    score: int = Field(ge=0, le=100)
    missing_requirements: list[RequirementFinding]
    satisfied_requirements: list[SatisfiedRequirement]
    needs_human_review: bool
