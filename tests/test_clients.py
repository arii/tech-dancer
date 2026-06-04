from pr_review_pipeline.ollama_client import OllamaClient
from unittest.mock import patch, MagicMock

def test_ollama_client_mock_fallback():
    client = OllamaClient(base_url="http://invalid")
    response = client.generate("test prompt", format="json")
    assert response.get("mock") is True

@patch("requests.post")
def test_ollama_client_success(mock_post):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"response": '{"status": "pass"}'}
    mock_post.return_value = mock_response

    client = OllamaClient()
    response = client.generate("test prompt", format="json")
    assert response["status"] == "pass"
