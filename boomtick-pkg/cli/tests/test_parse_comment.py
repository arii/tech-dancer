import pytest
from tdw_services.orchestrator import Orchestrator

@pytest.fixture
def orchestrator():
    return Orchestrator()

def test_parse_comment_conflict_resolve(orchestrator):
    res = orchestrator.parse_comment("@conflict-resolve please", "CONTRIBUTOR")
    assert res["conflict_resolve"] is True
    assert res["update_snapshots"] is False
    assert res["ai_chatops"] is False
    assert res["jules_fix_ci"] is False

def test_parse_comment_update_snapshots(orchestrator):
    res = orchestrator.parse_comment("Hey @update-snapshots", "CONTRIBUTOR")
    assert res["conflict_resolve"] is False
    assert res["update_snapshots"] is True
    assert res["ai_chatops"] is False
    assert res["jules_fix_ci"] is False

def test_parse_comment_ai_fix(orchestrator):
    res = orchestrator.parse_comment("/ai-fix this", "CONTRIBUTOR")
    assert res["conflict_resolve"] is False
    assert res["update_snapshots"] is False
    assert res["ai_chatops"] is True
    assert res["jules_fix_ci"] is False

def test_parse_comment_ai_review(orchestrator):
    res = orchestrator.parse_comment("/ai-review please", "CONTRIBUTOR")
    assert res["conflict_resolve"] is False
    assert res["update_snapshots"] is False
    assert res["ai_chatops"] is True
    assert res["jules_fix_ci"] is False

def test_parse_comment_jules_fix_ci_owner(orchestrator):
    res = orchestrator.parse_comment("@jules-fix-ci help", "OWNER")
    assert res["jules_fix_ci"] is True

def test_parse_comment_jules_fix_ci_member(orchestrator):
    res = orchestrator.parse_comment("@jules-fix-ci help", "MEMBER")
    assert res["jules_fix_ci"] is True

def test_parse_comment_jules_fix_ci_collaborator(orchestrator):
    res = orchestrator.parse_comment("@jules-fix-ci help", "COLLABORATOR")
    assert res["jules_fix_ci"] is True

def test_parse_comment_jules_fix_ci_none(orchestrator):
    res = orchestrator.parse_comment("@jules-fix-ci help", "CONTRIBUTOR")
    assert res["jules_fix_ci"] is False

def test_parse_comment_multiple(orchestrator):
    res = orchestrator.parse_comment("@conflict-resolve and @update-snapshots", "CONTRIBUTOR")
    assert res["conflict_resolve"] is True
    assert res["update_snapshots"] is True
    assert res["ai_chatops"] is False
    assert res["jules_fix_ci"] is False
