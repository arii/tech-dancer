import pytest
from unittest.mock import MagicMock, patch
from dev_tools.services.jules import JulesClient

@pytest.fixture
def jules_client():
    with patch.dict("os.environ", {"JULES_API_KEY": "fake_key"}):
        return JulesClient()

def test_send_single_message(jules_client):
    with patch("requests.post") as mock_post:
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"status": "success"}
        mock_post.return_value = mock_response

        res = jules_client.send_message("session1", "hello")

        assert res["status"] == "success"
        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        assert args[0].endswith("/sessions/session1:sendMessage")
        assert kwargs["json"] == {"prompt": "hello"}

def test_send_batch_message_success(jules_client):
    with patch("requests.post") as mock_post:
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"status": "success"}
        mock_post.return_value = mock_response

        session_ids = ["session1", "session2", "session3"]
        res = jules_client.send_message(session_ids, "hello batch")

        assert res["status"] == "success"
        assert "3/3 successful" in res["message"]
        assert len(res["results"]) == 3
        assert mock_post.call_count == 3

def test_send_batch_message_partial_failure(jules_client):
    with patch("requests.post") as mock_post:
        def side_effect(url, **kwargs):
            mock_res = MagicMock()
            if "session2" in url:
                mock_res.status_code = 500
                mock_res.raise_for_status.side_effect = Exception("API Error")
                return mock_res
            mock_res.status_code = 200
            mock_res.json.return_value = {"status": "success"}
            return mock_res

        mock_post.side_effect = side_effect

        session_ids = ["session1", "session2"]
        res = jules_client.send_message(session_ids, "hello partial")

        assert res["status"] == "success" # At least one succeeded
        assert "1/2 successful" in res["message"]

        # Check results
        results_dict = {r["sessionId"]: r for r in res["results"]}
        assert results_dict["session1"]["status"] == "success"
        assert results_dict["session2"]["status"] == "error"
