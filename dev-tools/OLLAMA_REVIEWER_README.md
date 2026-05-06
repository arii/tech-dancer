# Standalone Ollama Code Reviewer

This tool provides automated code reviews using a local Ollama instance and the `qwen2.5-coder:7b` model.

## Prerequisites

1. Install [Ollama](https://ollama.com/).
2. Ensure Ollama is running.

## Setup

Build the custom model using the provided Modelfile:

```bash
ollama create code-reviewer -f dev-tools/CodeReviewer.mf
```

## Usage

Run the Python script to review a specific file:

```bash
python3 dev-tools/ollama_reviewer.py <path_to_file>
```

Example:

```bash
python3 dev-tools/ollama_reviewer.py src/App.tsx
```

## Configuration

By default, the script connects to `http://localhost:11434`. You can override this by setting the `OLLAMA_URL` environment variable:

```bash
export OLLAMA_URL="http://your-ollama-host:11434/api/generate"
python3 dev-tools/ollama_reviewer.py <path_to_file>
```
