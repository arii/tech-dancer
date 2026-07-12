# pylint: disable=missing-docstring,redefined-outer-name
from unittest.mock import patch

import pytest
from dev_tools.services.jules import JulesClient


@pytest.fixture
def client(monkeypatch):
    monkeypatch.setenv("JULES_API_KEY", "fake-key")
    return JulesClient()


def test_discover_source_id_success(client):
    sources = [
        {"name": "sources/123", "githubRepo": {"owner": "other", "repo": "repo"}},
        {"name": "sources/456", "githubRepo": {"owner": "arii", "repo": "tech-dancer"}},
    ]
    with patch.object(client, "list_sources", return_value=sources):
        assert client.discover_source_id("arii/tech-dancer") == "456"


def test_discover_source_id_mismatch(client):
    sources = [{"name": "sources/123", "githubRepo": {"owner": "arii", "repo": "other"}}]
    with patch.object(client, "list_sources", return_value=sources):
        assert client.discover_source_id("arii/tech-dancer") is None


def test_discover_source_id_display_name_fallback(client):
    sources = [{"name": "sources/789", "displayName": "arii/tech-dancer repo"}]
    with patch.object(client, "list_sources", return_value=sources):
        assert client.discover_source_id("arii/tech-dancer") == "789"
