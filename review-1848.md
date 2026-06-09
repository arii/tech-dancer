This PR adds a local, CPU-friendly RAG pipeline for reviewing GitHub PRs using specialized agents, Ollama, and ChromaDB.

**Feedback:**
- **What is working well:** The implementation of a local RAG pipeline is an excellent addition, particularly the use of `.gitignore` for `.chroma` and `outputs` directories which aligns with memory directives to prevent artifact leakage. Adding environment configurations for local models (`qwen2.5-coder:3b`) also correctly follows project guidelines.
- **Issues to fix:** The `deploy` CI job is failing. The diff shows that `.env.example` was completely overwritten (lines 1-10 removed, replaced by lines 1-15). This removed Vercel and frontend app configs (`VITE_APP_URL`, `VERCEL_TOKEN`, etc.) and replaced them exclusively with the new RAG configuration. This breaks the expected `.env.example` structure for other services.
- **Actionable instructions:** Restore the existing variables in `.env.example` (`VITE_APP_URL`, `VERCEL_TOKEN`, etc.) and *append* your new RAG variables instead of replacing the entire file. Investigate the `deploy` CI failure.

**CI Status:** ❌ Failing tests (`deploy` job).
