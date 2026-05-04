import os
import pytest
import json
import importlib.util
import sys

# Handle the hyphen in 'dev-tools'
spec = importlib.util.spec_from_file_location("error_rag", "dev-tools/error_rag.py")
error_rag = importlib.util.module_from_spec(spec)
sys.modules["error_rag"] = error_rag
spec.loader.exec_module(error_rag)

from error_rag import SignatureExtractor, ASTContextualizer, RAGPipeline

def test_signature_extractor_eslint():
    log = "/app/src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]"
    extracted = SignatureExtractor.extract(log)
    assert extracted["file"] == "/app/src/App.tsx"
    assert extracted["line"] == 10
    assert extracted["col"] == 5
    assert extracted["signature"] == "eslint/no-unused-vars"

def test_signature_extractor_ts():
    log = "src/App.tsx:10:5 - error TS2322: Type 'string' is not assignable to type 'number'."
    extracted = SignatureExtractor.extract(log)
    assert extracted["file"] == "src/App.tsx"
    assert extracted["line"] == 10
    assert extracted["signature"] == "ts/2322"

def test_signature_extractor_ts_alt():
    log = "src/App.tsx(10,5): error TS2322: Type 'string' is not assignable to type 'number'."
    extracted = SignatureExtractor.extract(log)
    assert extracted["file"] == "src/App.tsx"
    assert extracted["line"] == 10
    assert extracted["signature"] == "ts/2322"

def test_ast_contextualizer_basic(tmp_path):
    f = tmp_path / "test.tsx"
    content = """
function Test() {
    const x = 1;
    return <div>{x}</div>;
}
"""
    f.write_text(content)
    context = ASTContextualizer.extract_context(str(f), 3)
    assert "const x = 1;" in context
    assert "function Test()" in context
    assert "return <div>{x}</div>;" in context

def test_rag_pipeline(tmp_path):
    kb_file = tmp_path / "errors.json"
    kb_data = {
        "eslint/no-unused-vars": {
            "strategy": "Remove it.",
            "examples": [{"before": "const x = 1;", "after": "// gone"}]
        }
    }
    kb_file.write_text(json.dumps(kb_data))

    pipeline = RAGPipeline(knowledge_base_path=str(kb_file))
    log = "src/App.tsx:10:5: 'unused' is defined but never used. [no-unused-vars]"

    prompt = pipeline.generate_prompt(log)
    assert "eslint/no-unused-vars" in prompt
    assert "Remove it." in prompt
    assert "const x = 1;" in prompt
