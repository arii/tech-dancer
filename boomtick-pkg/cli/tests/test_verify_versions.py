import pytest
import os
from verify_versions import verify_file_content, fix_content

def test_verify_file_content_node_downgrade():
    filepath = ".nvmrc"
    # Current is 24.16.0
    content = "22.10.0\n"
    findings = verify_file_content(filepath, content)
    assert any(f["type"] == "downgrade" and f["name"] == "node" for f in findings)

def test_verify_file_content_node_with_v_prefix():
    filepath = ".node-version"
    content = "v22.10.0\n"
    findings = verify_file_content(filepath, content)
    assert any(f["type"] == "downgrade" and f["name"] == "node" for f in findings)

def test_fix_content_node_downgrade():
    filepath = ".nvmrc"
    content = "22.10.0"
    findings = verify_file_content(filepath, content)
    fixed = fix_content(filepath, content, findings)
    assert fixed == "24.16.0"

def test_verify_file_content_pnpm_downgrade():
    filepath = "package.json"
    content = '{"packageManager": "pnpm@9.0.0"}'
    findings = verify_file_content(filepath, content)
    assert any(f["type"] == "downgrade" and f["name"] == "pnpm" for f in findings)

def test_fix_content_pnpm_downgrade():
    filepath = "package.json"
    content = '{"packageManager": "pnpm@9.0.0"}'
    findings = verify_file_content(filepath, content)
    fixed = fix_content(filepath, content, findings)
    assert "pnpm@10.28.2" in fixed

def test_node_hard_block():
    filepath = ".nvmrc"
    content = "24.18.0" # Different but not downgrade
    # We need to mock head_version to test this properly if we aren't at 24.18.0
    # But current HEAD in tests seems to be 24.16.0
    findings = verify_file_content(filepath, content)
    assert any(f["type"] == "hard_block" for f in findings)

def test_allow_node_version_change():
    os.environ["ALLOW_NODE_VERSION_CHANGE"] = "true"
    try:
        filepath = ".nvmrc"
        content = "24.18.0"
        findings = verify_file_content(filepath, content)
        assert not any(f["type"] == "hard_block" for f in findings)
    finally:
        del os.environ["ALLOW_NODE_VERSION_CHANGE"]
