import pytest
from unittest.mock import MagicMock, patch
from tdw_services.services.version_service import VersionService

@pytest.fixture
def service():
    # Clear caches before each test
    VersionService._NPM_CACHE = {}
    VersionService._GITHUB_CACHE = {}
    return VersionService()

def test_compare_versions(service):
    assert service.compare_versions("1.0.0", "1.0.0") == 0
    assert service.compare_versions("1.0.1", "1.0.0") == 1
    assert service.compare_versions("0.9.9", "1.0.0") == -1
    assert service.compare_versions("v1.2.3", "1.2.2") == 1
    assert service.compare_versions("24.x", "24.16.0") == -1 # 24.0.0 < 24.16.0

@patch("requests.get")
def test_fetch_latest_npm(mock_get, service):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"version": "10.0.0"}
    mock_get.return_value = mock_response

    assert service.fetch_latest_npm("pnpm") == "10.0.0"
    assert "pnpm" in service._NPM_CACHE

    # Test caching
    service.fetch_latest_npm("pnpm")
    assert mock_get.call_count == 1

@patch("requests.get")
def test_fetch_latest_node(mock_get, service):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = [{"version": "v22.0.0"}]
    mock_get.return_value = mock_response

    assert service.fetch_latest_node() == "22.0.0"
    assert "node" in service._NPM_CACHE

def test_parse_diff(service):
    diff = """--- a/package.json
+++ b/package.json
@@ -10,1 +10,1 @@
-    "pnpm": "10.0.0"
+    "pnpm": "10.1.0"
"""
    changes = service.parse_diff(diff)
    assert len(changes) == 1
    assert changes[0]["name"] == "pnpm"
    assert changes[0]["new"] == "10.1.0"

def test_verify_changes_downgrade(service):
    changes = [{
        "file": "package.json",
        "name": "pnpm",
        "new": "9.0.0",
        "old": "10.0.0",
        "type": "dependency"
    }]

    with patch.object(service, "get_stack_versions", return_value={"pnpm": "10.0.0"}):
        with patch.object(service, "fetch_latest_npm", return_value="10.0.0"):
            findings = service.verify_changes(changes)
            # Should have downgrade error, and outdated warning if new < latest
            assert any(f["severity"] == "error" and "downgrade" in f["message"].lower() for f in findings)
