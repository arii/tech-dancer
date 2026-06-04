from dataclasses import dataclass
import os
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover - dependency is declared for normal use
    load_dotenv = None


@dataclass(frozen=True)
class Settings:
    ollama_base_url: str = "http://localhost:11434"
    local_llm_model: str = "qwen2.5-coder:3b"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    github_repo: str | None = None
    output_dir: Path = Path("outputs")
    default_mode: str = "dry-run"


def load_settings(repo: Path | None = None) -> Settings:
    if load_dotenv is not None:
        env_path = (repo or Path.cwd()) / ".env"
        load_dotenv(env_path if env_path.exists() else None)

    return Settings(
        ollama_base_url=os.getenv("OLLAMA_BASE_URL", Settings.ollama_base_url),
        local_llm_model=os.getenv("LOCAL_LLM_MODEL", Settings.local_llm_model),
        embedding_model=os.getenv("EMBEDDING_MODEL", Settings.embedding_model),
        github_repo=os.getenv("GITHUB_REPO"),
        output_dir=Path(os.getenv("OUTPUT_DIR", str(Settings.output_dir))),
        default_mode=os.getenv("DEFAULT_MODE", Settings.default_mode),
    )
