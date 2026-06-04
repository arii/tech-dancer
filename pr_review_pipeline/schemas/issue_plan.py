from pydantic import BaseModel

class IssueDraft(BaseModel):
    title: str
    labels: list[str]
    body: str
    source_finding_id: str

class IssuePlan(BaseModel):
    pr_number: int
    issues: list[IssueDraft]
