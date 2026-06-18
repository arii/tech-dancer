
import unittest
from unittest.mock import patch, MagicMock
import urllib.error
import json
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))
from utils import _call_api_with_retry

class TestAIRetries(unittest.TestCase):
    @patch('urllib.request.urlopen')
    def test_success_on_first_try(self, mock_urlopen):
        # Mock successful response
        mock_response = MagicMock()
        mock_response.read.return_value = json.dumps({"choices": [{"message": {"content": "Hello"}}]}).encode('utf-8')
        mock_response.__enter__.return_value = mock_response
        mock_urlopen.return_value = mock_response

        req = MagicMock()
        res = _call_api_with_retry(req, max_retries=3)

        self.assertEqual(res["choices"][0]["message"]["content"], "Hello")
        self.assertEqual(mock_urlopen.call_count, 1)

    @patch('urllib.request.urlopen')
    @patch('time.sleep', return_value=None)
    def test_retry_on_500(self, mock_sleep, mock_urlopen):
        # Mock failure then success
        mock_err = urllib.error.HTTPError('url', 500, 'Internal Server Error', {}, None)

        mock_success = MagicMock()
        mock_success.read.return_value = json.dumps({"response": "ok"}).encode('utf-8')
        mock_success.__enter__.return_value = mock_success

        mock_urlopen.side_effect = [mock_err, mock_err, mock_success]

        req = MagicMock()
        res = _call_api_with_retry(req, max_retries=3)

        self.assertEqual(res["response"], "ok")
        self.assertEqual(mock_urlopen.call_count, 3)
        self.assertEqual(mock_sleep.call_count, 2)

    @patch('urllib.request.urlopen')
    def test_no_retry_on_401(self, mock_urlopen):
        mock_err = urllib.error.HTTPError('url', 401, 'Unauthorized', {}, None)
        mock_urlopen.side_effect = mock_err

        req = MagicMock()
        res = _call_api_with_retry(req, max_retries=3)

        self.assertIsNone(res)
        self.assertEqual(mock_urlopen.call_count, 1)

if __name__ == '__main__':
    unittest.main()
