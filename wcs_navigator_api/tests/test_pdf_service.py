"""Unit tests for WCS Navigator PDF Service functions."""

import io
import pytest
import requests
from fastapi import HTTPException, UploadFile
from google.genai import types

from wcs_navigator_api.services.pdf_service import (
    create_genai_pdf_part,
    extract_pdf_bytes_from_upload,
    fetch_pdf_bytes_from_url,
)

VALID_PDF_BYTES = b"%PDF-1.4 sample PDF content line 1 line 2"
CORRUPT_BYTES = b"NOT_A_PDF_FILE_HEADER"


class MockAsyncUploadFile:
    """Mock UploadFile for async streaming tests."""

    def __init__(self, content: bytes, content_type: str = "application/pdf"):
        self.stream = io.BytesIO(content)
        self.content_type = content_type

    async def read(self, size: int = -1) -> bytes:
        return self.stream.read(size)


@pytest.mark.asyncio
async def test_extract_pdf_bytes_from_upload_success():
    upload_file = MockAsyncUploadFile(VALID_PDF_BYTES, content_type="application/pdf")
    res = await extract_pdf_bytes_from_upload(upload_file)  # type: ignore[arg-type]
    assert res == VALID_PDF_BYTES


@pytest.mark.asyncio
async def test_extract_pdf_bytes_from_upload_invalid_mime():
    upload_file = MockAsyncUploadFile(VALID_PDF_BYTES, content_type="image/png")
    with pytest.raises(HTTPException) as exc_info:
        await extract_pdf_bytes_from_upload(upload_file)  # type: ignore[arg-type]
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


@pytest.mark.asyncio
async def test_extract_pdf_bytes_from_upload_corrupt_bytes():
    upload_file = MockAsyncUploadFile(CORRUPT_BYTES, content_type="application/pdf")
    with pytest.raises(HTTPException) as exc_info:
        await extract_pdf_bytes_from_upload(upload_file)  # type: ignore[arg-type]
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


@pytest.mark.asyncio
async def test_extract_pdf_bytes_from_upload_exceeds_max_size():
    # 2MB byte payload tested with 1MB limit
    large_pdf_bytes = b"%PDF-1.4 " + (b"X" * (2 * 1024 * 1024))
    upload_file = MockAsyncUploadFile(large_pdf_bytes, content_type="application/pdf")
    with pytest.raises(HTTPException) as exc_info:
        await extract_pdf_bytes_from_upload(upload_file, max_size_mb=1)  # type: ignore[arg-type]
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


def test_fetch_pdf_bytes_from_url_success(mocker):
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.headers = {"content-type": "application/pdf"}
    mock_response.content = VALID_PDF_BYTES
    mocker.patch("requests.get", return_value=mock_response)

    res = fetch_pdf_bytes_from_url("https://example.com/schedule.pdf")
    assert res == VALID_PDF_BYTES
    requests.get.assert_called_once_with("https://example.com/schedule.pdf", stream=True, timeout=15)


def test_fetch_pdf_bytes_from_url_non_200(mocker):
    mock_response = mocker.Mock()
    mock_response.status_code = 404
    mocker.patch("requests.get", return_value=mock_response)

    with pytest.raises(HTTPException) as exc_info:
        fetch_pdf_bytes_from_url("https://example.com/schedule.pdf")
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


def test_fetch_pdf_bytes_from_url_corrupt_pdf(mocker):
    mock_response = mocker.Mock()
    mock_response.status_code = 200
    mock_response.headers = {"content-type": "text/html"}
    mock_response.content = b"<html>404 Not Found</html>"
    mocker.patch("requests.get", return_value=mock_response)

    with pytest.raises(HTTPException) as exc_info:
        fetch_pdf_bytes_from_url("https://example.com/schedule.pdf")
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


def test_fetch_pdf_bytes_from_url_request_exception(mocker):
    mocker.patch("requests.get", side_effect=requests.RequestException("Network Error"))

    with pytest.raises(HTTPException) as exc_info:
        fetch_pdf_bytes_from_url("https://example.com/schedule.pdf")
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Invalid PDF"


def test_create_genai_pdf_part():
    part = create_genai_pdf_part(VALID_PDF_BYTES)
    assert isinstance(part, types.Part)
    assert part.inline_data is not None
    assert part.inline_data.data == VALID_PDF_BYTES
    assert part.inline_data.mime_type == "application/pdf"
