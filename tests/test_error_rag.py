import os
import pytest
import json
import importlib.util
import sys

# Handle the hyphen in 'dev-tools'
spec = importlib.util.spec_from_file_location("error_rag", "boomtick-pkg/cli/dev_tools/error_rag.py")
error_rag = importlib.util.module_from_spec(spec)
sys.modules["error_rag"] = error_rag
spec.loader.exec_module(error_rag)

from error_rag import SignatureExtractor, ASTContextualizer, RAGPipeline, resolve_file_path, strip_ansi

def test_strip_ansi():
    colored = "\x1b[31mError\x1b[0m: test"
    assert strip_ansi(colored) == "Error: test"

def test_signature_extractor_eslint():
    log = "/app/src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]"
    extracted = SignatureExtractor.extract(log)
    assert extracted["file"] == "/app/src/App.tsx"
    assert extracted["line"] == 10
    assert extracted["col"] == 5
    assert extracted["signature"] == "eslint/no-unused-vars"

def test_signature_extractor_colored():
    log = "\x1b[31m/app/src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]\x1b[0m"
    extracted = SignatureExtractor.extract(log)
    assert extracted["file"] == "/app/src/App.tsx"
    assert extracted["signature"] == "eslint/no-unused-vars"

def test_resolve_file_path(tmp_path):
    # Setup dummy project structure
    src = tmp_path / "src"
    src.mkdir()
    app_tsx = src / "App.tsx"
    app_tsx.write_text("content")

    os.chdir(tmp_path)

    # 1. Direct path
    assert resolve_file_path("src/App.tsx") == "src/App.tsx"

    # 2. Stripping absolute prefix
    assert resolve_file_path("/app/src/App.tsx") == "src/App.tsx"

    # 3. Basename fallback
    assert resolve_file_path("/some/random/path/App.tsx") == "src/App.tsx"

def test_ast_contextualizer_basic(tmp_path):
    f = tmp_path / "test.tsx"
    content = "\n".join([f"line {i}" for i in range(1, 101)])
    f.write_text(content)

    context = ASTContextualizer.extract_context(str(f), 50, window=5)
    # 0-indexed: line 50 is index 49. Window +/- 5 is 44 to 54.
    # lines[44:55] (exclusive end) -> line 45 to line 55
    assert "line 45" in context
    assert "line 55" in context
    assert "line 44" not in context
    assert "line 56" not in context

def test_rag_pipeline_robust(tmp_path):
    kb_file = tmp_path / "errors.json"
    kb_data = {
        "eslint/no-unused-vars": {
            "strategy": "Remove it.",
            "examples": [{"before": "const x = 1;", "after": "// gone"}]
        }
    }
    kb_file.write_text(json.dumps(kb_data))

    # Create the file being referred to
    src = tmp_path / "src"
    src.mkdir()
    app_tsx = src / "App.tsx"
    app_tsx.write_text("import React from 'react';\n\nconst x = 1;\n")

    os.chdir(tmp_path)

    pipeline = RAGPipeline(knowledge_base_path=str(kb_file))
    log = "/app/src/App.tsx:3:7: 'x' is assigned a value but never used. [no-unused-vars]"

    prompt = pipeline.generate_prompt(log)
    assert "eslint/no-unused-vars" in prompt
    assert "Remove it." in prompt
    assert "const x = 1;" in prompt
