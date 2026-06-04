import re

from pr_review_pipeline.schemas import RequirementFinding, SatisfiedRequirement, SpecReport

REQUIREMENTS = [
    ("Summary", [r"summary", r"what changed"]),
    ("Test plan", [r"test plan", r"testing", r"tests?\s*:"]),
    ("Issue reference", [r"fixes\s+#\d+", r"closes\s+#\d+", r"issue\s+#?\d+"]),
    ("Risk or rollback notes", [r"risk", r"rollback"]),
]


def _has_any(text: str, patterns: list[str]) -> bool:
    return any(re.search(pattern, text, flags=re.IGNORECASE) for pattern in patterns)


def validate_spec(pr_number: int, pr_title: str, pr_description: str, changed_files: list[str], repo_context: list[dict[str, object]] | None = None) -> SpecReport:
    text = f"{pr_title}\n\n{pr_description}"
    missing: list[RequirementFinding] = []
    satisfied: list[SatisfiedRequirement] = []

    for requirement, patterns in REQUIREMENTS:
        if _has_any(text, patterns):
            satisfied.append(SatisfiedRequirement(requirement=requirement, evidence=f"PR text includes {requirement.lower()} evidence."))
        else:
            severity = "blocking" if requirement == "Test plan" else "warning"
            missing.append(
                RequirementFinding(
                    requirement=requirement,
                    severity=severity,
                    suggested_fix=f"Add a {requirement.lower()} section to the PR description.",
                )
            )

    ui_changed = any(file.endswith((".tsx", ".css", ".scss")) for file in changed_files)
    if ui_changed:
        if _has_any(text, [r"screenshot", r"screen shot", r"image"]):
            satisfied.append(SatisfiedRequirement(requirement="Screenshots for UI changes", evidence="PR text mentions screenshots."))
        else:
            missing.append(
                RequirementFinding(
                    requirement="Screenshots for UI changes",
                    severity="blocking",
                    suggested_fix="Attach screenshots or explain why the UI change is not visible.",
                )
            )
        if _has_any(text, [r"accessibility", r"a11y", r"keyboard", r"screen reader"]):
            satisfied.append(SatisfiedRequirement(requirement="Accessibility notes for UI changes", evidence="PR text includes accessibility notes."))
        else:
            missing.append(
                RequirementFinding(
                    requirement="Accessibility notes for UI changes",
                    severity="warning",
                    suggested_fix="Add accessibility notes for the UI changes.",
                )
            )

    blocking_count = sum(1 for finding in missing if finding.severity == "blocking")
    warning_count = sum(1 for finding in missing if finding.severity == "warning")
    status = "fail" if blocking_count else "warning" if warning_count else "pass"
    score = max(0, 100 - blocking_count * 30 - warning_count * 10)
    return SpecReport(
        pr_number=pr_number,
        status=status,
        score=score,
        missing_requirements=missing,
        satisfied_requirements=satisfied,
        needs_human_review=bool(missing),
    )
