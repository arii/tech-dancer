# Local Testing Plan: PR Review Pipeline

Follow these steps to verify the RAG-powered multi-agent PR review pipeline in your local environment.

## 1. Prerequisites Verification

Ensure the following tools are installed and accessible:

- **Python**: `python3 --version` (3.11+)
- **Git**: `git --version`
- **GitHub CLI**: `gh --version`
- **Ollama**: `ollama --version`

## 2. Automated Verification

The fastest way to verify the entire pipeline (indexing, retrieval, and multi-agent execution) is via the included verification script.

```bash
# From the repository root
chmod +x scripts/verify-rag-pipeline.sh
./scripts/verify-rag-pipeline.sh
```

**Success Criteria:**
- Script completes with `=== Verification Successful! ===`.
- Artifacts are generated in `outputs/fixture-review/`.

## 3. Manual Verification Steps

### Step A: Installation
```bash
pip install -e .
```

### Step B: RAG Indexing
```bash
# Index the tutorial fixtures
pr-review index --repo-path tests/fixtures/ --recursive
```

### Step C: RAG Retrieval
```bash
# Verify that the system can retrieve accessibility rules
pr-review retrieve "clickable div"
```
**Expectation:** Output should contain snippets from `tutorial_codex.md` or `sample_codex.md` mentioning clickable divs or interactive elements.

### Step D: Pipeline Execution (Fixture Mode)
Run a review against a "Bad PR" (missing test plan + accessibility issue).
```bash
pr-review review-fixture \
  --pr-description tests/fixtures/pr_bad.md \
  --diff tests/fixtures/inaccessible_diff.patch \
  --codex tests/fixtures/tutorial_codex.md \
  --mode dry-run
```

### Step E: Artifact Audit
Check the generated files in `outputs/fixture-review/`:
1. **`spec_report.json`**: Verify `status` is `fail` or `warning`.
2. **`review_report.json`**: Verify the presence of accessibility findings.
3. **`issue_preview.md`**: Verify that draft issues are well-formatted.

## 4. Unit Tests

Run the pytest suite to ensure schema and logic integrity.

```bash
PYTHONPATH=. pytest tests/test_pipeline.py
```

## 5. Mock vs. Real LLM

- **Mock Mode**: If Ollama is not running, the pipeline will gracefully fall back to mock data. This is useful for verifying the *orchestration* and *handoffs*.
- **Real Mode**: To verify the *intelligence* of the agents, ensure Ollama is running and the model is pulled (`ollama pull qwen2.5-coder:3b`).
