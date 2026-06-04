from pathlib import Path
from typing import Literal

import typer
from rich.console import Console
from rich.table import Table

from pr_review_pipeline.agents import generate_issue_plan, review_code, validate_spec
from pr_review_pipeline.config import load_settings
from pr_review_pipeline.diff_parser import changed_files
from pr_review_pipeline.github_client import create_issue, fetch_pr, fetch_pr_diff
from pr_review_pipeline.io import write_json
from pr_review_pipeline.rag.retriever import Retriever

app = typer.Typer(help="Local CPU-friendly RAG PR review pipeline.")
console = Console()
Mode = Literal["dry-run", "preview", "create"]


def _output_dir(base: Path, pr_number: int) -> Path:
    return base / f"pr-{pr_number}"


def _render_review_summary(spec_status: str, review_status: str, blockers: int, issues: int) -> str:
    return "\n".join(
        [
            "# PR Review Summary",
            "",
            f"Spec status: {spec_status}",
            f"Review status: {review_status}",
            f"Blocking findings: {blockers}",
            f"Issues drafted: {issues}",
        ]
    ) + "\n"


def _render_issue_preview(issue_plan) -> str:
    if not issue_plan.issues:
        return "# Issue Preview\n\nNo blocking issues drafted.\n"
    parts = ["# Issue Preview", ""]
    for issue in issue_plan.issues:
        parts.extend([
            f"## {issue.title}",
            "",
            f"Labels: {', '.join(issue.labels)}",
            "",
            issue.body,
            "",
            "---",
            "",
        ])
    return "\n".join(parts)


def _print_summary(pr_number: int, spec_status: str, review_status: str, blockers: int, issues: int, created: int) -> None:
    table = Table(title=f"PR #{pr_number} Review Complete")
    table.add_column("Metric")
    table.add_column("Value")
    table.add_row("Spec status", spec_status)
    table.add_row("Review status", review_status)
    table.add_row("Blocking findings", str(blockers))
    table.add_row("Issues drafted", str(issues))
    table.add_row("Issues created", str(created))
    console.print(table)


@app.command()
def index(repo: Path = typer.Option(Path("."), help="Repository root.")) -> None:
    retriever = Retriever(repo.resolve())
    console.print(f"Indexed {len(retriever.store._chunks)} guidance chunks.")


@app.command()
def retrieve(query: str, repo: Path = typer.Option(Path("."), help="Repository root."), limit: int = 5) -> None:
    retriever = Retriever(repo.resolve())
    for result in retriever.retrieve([query], limit=limit):
        metadata = result["metadata"]
        console.print(f"[{metadata['source_path']}#{metadata['chunk_index']}] {result['content'][:500]}")


@app.command("review-pr")
def review_pr(
    pr: int = typer.Option(..., help="GitHub pull request number."),
    repo: Path = typer.Option(Path("."), help="Repository root."),
    mode: Mode = typer.Option("dry-run", help="dry-run, preview, or create."),
) -> None:
    settings = load_settings(repo)
    out_dir = _output_dir(settings.output_dir, pr)
    pr_data = fetch_pr(pr, repo)
    diff_text = fetch_pr_diff(pr, repo)
    write_json(out_dir / "raw_pr.json", pr_data)
    (out_dir / "raw_diff.patch").write_text(diff_text, encoding="utf-8")
    _run_pipeline(pr, pr_data.get("title", ""), pr_data.get("body", ""), diff_text, repo, out_dir, mode)


@app.command("review-fixture")
def review_fixture(
    pr_description: Path = typer.Option(..., help="Markdown file containing a PR description."),
    diff: Path = typer.Option(..., help="Patch file to review."),
    codex: Path | None = typer.Option(None, help="Optional CODEX.md fixture to include in retrieval."),
    pr: int = typer.Option(0, help="Fixture PR number."),
    repo: Path = typer.Option(Path("."), help="Repository root."),
    mode: Mode = typer.Option("dry-run", help="dry-run, preview, or create."),
) -> None:
    settings = load_settings(repo)
    out_dir = _output_dir(settings.output_dir, pr)
    description_text = pr_description.read_text(encoding="utf-8")
    diff_text = diff.read_text(encoding="utf-8")
    write_json(out_dir / "raw_pr.json", {"title": pr_description.stem, "body": description_text, "files": []})
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "raw_diff.patch").write_text(diff_text, encoding="utf-8")
    _run_pipeline(pr, pr_description.stem, description_text, diff_text, repo, out_dir, mode, extra_docs=[codex] if codex else None)


def _run_pipeline(
    pr: int,
    title: object,
    body: object,
    diff_text: str,
    repo: Path,
    out_dir: Path,
    mode: Mode,
    extra_docs: list[Path] | None = None,
) -> None:
    retriever = Retriever(repo.resolve(), extra_docs=extra_docs)
    spec_context = retriever.retrieve(["PR description requirements", "test plan required", "pull request template"], limit=5)
    files = changed_files(diff_text)
    spec_report = validate_spec(pr, str(title), str(body), files, spec_context)
    write_json(out_dir / "spec_report.json", spec_report)

    review_context = retriever.retrieve(["code review requirements", "accessibility requirements", "testing requirements"], limit=5)
    review_report = review_code(pr, diff_text, spec_report, review_context)
    write_json(out_dir / "review_report.json", review_report)

    issue_plan = generate_issue_plan(pr, review_report)
    write_json(out_dir / "blocking_issues.json", issue_plan)
    preview = _render_issue_preview(issue_plan)
    (out_dir / "issue_preview.md").write_text(preview, encoding="utf-8")

    blockers = sum(finding.severity == "blocking" for finding in review_report.findings)
    summary = _render_review_summary(spec_report.status, review_report.overall_status, blockers, len(issue_plan.issues))
    (out_dir / "review_summary.md").write_text(summary, encoding="utf-8")

    created = 0
    if mode == "preview":
        console.print(preview)
    elif mode == "create":
        for index, issue in enumerate(issue_plan.issues, start=1):
            body_file = out_dir / f"issue-{index:03d}.md"
            body_file.write_text(issue.body, encoding="utf-8")
            create_issue(issue.title, body_file, issue.labels, repo)
            created += 1

    _print_summary(pr, spec_report.status, review_report.overall_status, blockers, len(issue_plan.issues), created)
