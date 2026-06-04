import typer
from rich.console import Console
from rich.table import Table
import json
from typing import Optional, Dict, Any
from pathlib import Path

from pr_review_pipeline.config import settings
from pr_review_pipeline.github_client import GitHubClient
from pr_review_pipeline.ollama_client import OllamaClient
from pr_review_pipeline.rag.store import VectorStore
from pr_review_pipeline.rag.retriever import Retriever
from pr_review_pipeline.rag.chunker import MarkdownChunker
from pr_review_pipeline.agents.spec_validator import SpecValidator
from pr_review_pipeline.agents.code_reviewer import CodeReviewer
from pr_review_pipeline.agents.issue_generator import IssueGenerator

app = typer.Typer()
console = Console()

def run_pipeline(
    pr_number: int,
    pr_details: Dict[str, Any],
    diff: str,
    output_dir: Path,
    mode: str = "dry-run",
    repo: Optional[str] = None
):
    ollama = OllamaClient()
    store = VectorStore()
    retriever = Retriever(store)
    gh = GitHubClient(repo=repo)

    # 2. Spec Validation
    with console.status("Validating PR specification..."):
        context = retriever.get_context("PR description requirements and template")
        validator = SpecValidator(ollama)
        spec_report = validator.validate(pr_details, context)
        spec_report.pr_number = pr_number

    with open(output_dir / "spec_report.json", "w") as f:
        f.write(spec_report.model_dump_json(indent=2))

    # 3. Code Review
    with console.status("Reviewing code changes..."):
        context = retriever.get_context("Coding standards and anti-patterns")
        reviewer = CodeReviewer(ollama)
        review_report = reviewer.review(diff, spec_report, context)
        review_report.pr_number = pr_number

    with open(output_dir / "review_report.json", "w") as f:
        f.write(review_report.model_dump_json(indent=2))

    # 4. Issue Generation
    with console.status("Generating issue drafts for blockers..."):
        gen = IssueGenerator(ollama)
        issue_plan = gen.generate_plan(review_report)
        issue_plan.pr_number = pr_number

    with open(output_dir / "blocking_issues.json", "w") as f:
        f.write(issue_plan.model_dump_json(indent=2))

    # Generate human-readable summary
    summary_md = f"# PR #{pr_number} Review Summary\n\n"
    summary_md += f"**Spec Status:** {spec_report.status.upper()} (Score: {spec_report.score})\n"
    summary_md += f"**Review Status:** {review_report.overall_status.upper()}\n\n"
    summary_md += f"## Review Summary\n{review_report.summary}\n\n"
    summary_md += "## Findings\n"
    for f in review_report.findings:
        summary_md += f"- [{f.severity}] {f.title}: {f.description}\n"

    with open(output_dir / "review_summary.md", "w") as f:
        f.write(summary_md)

    # 5. Output Results
    console.print(f"\n[bold]Review for PR #{pr_number} Complete[/bold]")

    table = Table(show_header=True, header_style="bold magenta")
    table.add_column("Agent")
    table.add_column("Status")
    table.add_column("Details")

    table.add_row("Spec Validator", spec_report.status, f"Score: {spec_report.score}")
    table.add_row("Code Reviewer", review_report.overall_status, f"{len(review_report.findings)} findings")
    table.add_row("Issue Gen", "Complete", f"{len(issue_plan.issues)} issues drafted")

    console.print(table)

    if mode == "create" and issue_plan.issues:
        console.print("\n[bold yellow]Creating GitHub issues...[/bold yellow]")
        for issue in issue_plan.issues:
            try:
                issue_num = gh.create_issue(issue.title, issue.body, issue.labels)
                console.print(f"  Created issue: {issue_num}")
            except Exception as e:
                console.print(f"  [bold red]Failed to create issue: {e}[/bold red]")
    else:
        console.print(f"\n[bold blue]Artifacts saved to {output_dir}[/bold blue]")

@app.command()
def index(repo_path: str = "."):
    """Index repository guidance files (CODEX.md, README.md, etc.)"""
    console.print(f"Indexing {repo_path}...")
    store = VectorStore()
    chunker = MarkdownChunker()

    docs = ["CODEX.md", "README.md", "CONTRIBUTING.md", ".github/pull_request_template.md"]
    for doc_name in docs:
        doc_path = Path(repo_path) / doc_name
        if doc_path.exists():
            console.print(f"  Indexing {doc_name}...")
            content = doc_path.read_text()
            chunks = chunker.chunk(content, doc_name)
            store.add_chunks(chunks)

    console.print("[bold green]Indexing complete![/bold green]")

@app.command()
def retrieve(query: str):
    """Retrieve relevant repository context for a query"""
    store = VectorStore()
    retriever = Retriever(store)
    context = retriever.get_context(query)
    console.print(context)

@app.command()
def review_pr(
    pr: int,
    repo: str = settings.github_repo,
    mode: str = settings.default_mode
):
    """Review a GitHub Pull Request"""
    console.print(f"Starting review for PR #{pr} in {repo} (mode: {mode})")

    gh = GitHubClient(repo=repo)

    # 1. Fetch PR Data
    with console.status("Fetching PR details and diff..."):
        try:
            pr_details = gh.get_pr_details(pr)
            diff = gh.get_pr_diff(pr)
        except Exception as e:
            console.print(f"[bold red]Error fetching PR details: {e}[/bold red]")
            console.print("Falling back to dummy data for demonstration.")
            pr_details = {"title": "Dummy PR", "body": "This is a dummy PR body", "number": pr}
            diff = "diff --git a/file.txt b/file.txt\nindex 0000000..e69de29\n--- a/file.txt\n+++ b/file.txt\n@@ -0,0 +1 @@\n+Dummy change"

    # Create output directory
    out_dir = Path(settings.output_dir) / f"pr-{pr}"
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(out_dir / "raw_pr.json", "w") as f:
        json.dump(pr_details, f, indent=2)
    with open(out_dir / "raw_diff.patch", "w") as f:
        f.write(diff)

    run_pipeline(pr, pr_details, diff, out_dir, mode, repo)

@app.command()
def review_fixture(
    description_file: str,
    diff_file: str,
    mode: str = "dry-run"
):
    """Review a PR based on local fixture files"""
    console.print(f"Starting review for fixture (mode: {mode})")

    pr_body = Path(description_file).read_text()
    diff = Path(diff_file).read_text()
    pr_details = {"title": "Fixture PR", "body": pr_body, "number": 0}

    # Create output directory
    out_dir = Path(settings.output_dir) / "fixture-review"
    out_dir.mkdir(parents=True, exist_ok=True)

    run_pipeline(0, pr_details, diff, out_dir, mode)

if __name__ == "__main__":
    app()
