from pathlib import Path

GUIDANCE_GLOBS = [
    "CODEX.md",
    "README.md",
    "CONTRIBUTING.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/pull_request_template.md",
    ".github/workflows/*.yml",
    "docs/**/*.md",
]


def discover_guidance_files(repo: Path) -> list[Path]:
    files: list[Path] = []
    for pattern in GUIDANCE_GLOBS:
        for path in repo.glob(pattern):
            if path.is_file() and path not in files:
                files.append(path)
    return sorted(files)


def read_guidance(paths: list[Path], repo: Path) -> list[dict[str, str]]:
    docs = []
    for path in paths:
        try:
            docs.append({"source_path": str(path.relative_to(repo)), "content": path.read_text(encoding="utf-8")})
        except UnicodeDecodeError:
            continue
    return docs
