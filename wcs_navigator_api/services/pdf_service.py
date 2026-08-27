"""PDF streaming ingestion and external URL pre-scan service."""

import requests
from fastapi import HTTPException, UploadFile
from google.genai import types

PDF_MAGIC_BYTES = b"%PDF-"


async def extract_pdf_bytes_from_upload(file: UploadFile, max_size_mb: int = 25) -> bytes:
    """Extract and validate PDF bytes from an HTTP multipart upload in-memory."""
    if file.content_type and file.content_type.lower() != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid PDF")

    max_bytes = max_size_mb * 1024 * 1024
    buffer = bytearray()
    chunk_size = 64 * 1024

    try:
        while True:
            chunk = await file.read(chunk_size)
            if not chunk:
                break
            buffer.extend(chunk)
            if len(buffer) > max_bytes:
                raise HTTPException(status_code=400, detail="Invalid PDF")
    except HTTPException:
        raise
    except Exception as err:
        raise HTTPException(status_code=400, detail="Invalid PDF") from err

    pdf_bytes = bytes(buffer)
    if not pdf_bytes.startswith(PDF_MAGIC_BYTES):
        raise HTTPException(status_code=400, detail="Invalid PDF")

    return pdf_bytes


def fetch_pdf_bytes_from_url(url: str, timeout: int = 15) -> bytes:
    """Fetch raw schedule PDF bytes from an external URL strictly in-memory."""
    try:
        response = requests.get(url, stream=True, timeout=timeout)
    except requests.RequestException as err:
        raise HTTPException(status_code=400, detail="Invalid PDF") from err

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid PDF")

    content_type = response.headers.get("content-type", "").lower()
    pdf_bytes = response.content

    if not pdf_bytes.startswith(PDF_MAGIC_BYTES) and "application/pdf" not in content_type:
        raise HTTPException(status_code=400, detail="Invalid PDF")

    if not pdf_bytes.startswith(PDF_MAGIC_BYTES):
        raise HTTPException(status_code=400, detail="Invalid PDF")

    return pdf_bytes


def create_genai_pdf_part(pdf_bytes: bytes) -> types.Part:
    """Wrap PDF bytes into a Google GenAI SDK Part object."""
    return types.Part.from_bytes(data=pdf_bytes, mime_type="application/pdf")
