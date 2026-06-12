import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    ollama_base_url: str = "http://localhost:11434"
    local_llm_model: str = "qwen2.5-coder:3b"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    github_repo: str = "owner/repo"
    output_dir: str = "outputs"
    default_mode: str = "dry-run"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
