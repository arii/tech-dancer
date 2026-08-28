"""Stage 1 Discovery Pass FastAPI router."""

from typing import Optional
from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from google.genai import types
from pydantic import ValidationError

from wcs_navigator_api.config import get_genai_client
from wcs_navigator_api.models.payloads import DiscoverUrlRequest, DiscoveryResponse
from wcs_navigator_api.prompts.discovery_prompt import DISCOVERY_SYSTEM_PROMPT
from wcs_navigator_api.services.cache_service import get_cache_key, get_cached_response, set_cached_response
from wcs_navigator_api.services.pdf_service import (
    create_genai_pdf_part,
    extract_pdf_bytes_from_upload,
    fetch_pdf_bytes_from_url,
)

router = APIRouter(tags=["discovery"])


@router.post(
    "/generate-calendar/discover",
    response_model=DiscoveryResponse,
    response_model_by_alias=True,
)
@router.post(
    "/api/v1/discover",
    response_model=DiscoveryResponse,
    response_model_by_alias=True,
)
async def discover_schedule(
    request: Request,
    file: Optional[UploadFile] = File(None),
) -> DiscoveryResponse:
    """Stage 1 Discovery Pass endpoint for PDF upload or URL pre-scan."""
    pdf_bytes: Optional[bytes] = None

    if file is not None and file.filename:
        pdf_bytes = await extract_pdf_bytes_from_upload(file)
    else:
        content_type = request.headers.get("content-type", "").lower()
        if "application/json" in content_type:
            try:
                body = await request.json()
                url_req = DiscoverUrlRequest.model_validate(body)
                pdf_bytes = fetch_pdf_bytes_from_url(str(url_req.url))
            except (ValidationError, ValueError) as err:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid DiscoverUrlRequest JSON payload.",
                ) from err
            except HTTPException:
                raise
            except Exception as err:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid PDF",
                ) from err

    if not pdf_bytes:
        raise HTTPException(
            status_code=400,
            detail="Either PDF file upload or valid URL JSON request body required.",
        )

    cache_key = get_cache_key(pdf_bytes)
    cached_data = get_cached_response(cache_key)
    if cached_data:
        return DiscoveryResponse.model_validate(cached_data)

    pdf_part = create_genai_pdf_part(pdf_bytes)

    try:
        client = get_genai_client()
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[pdf_part, DISCOVERY_SYSTEM_PROMPT],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=DiscoveryResponse,
            ),
        )
    except Exception as err:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini API discovery pass execution failed: {err}",
        ) from err

    discovery_res = None
    if hasattr(response, "parsed") and isinstance(response.parsed, DiscoveryResponse):
        discovery_res = response.parsed
    elif hasattr(response, "parsed") and response.parsed is not None:
        try:
            if isinstance(response.parsed, dict):
                discovery_res = DiscoveryResponse.model_validate(response.parsed)
        except Exception:
            pass
    elif hasattr(response, "text") and response.text:
        try:
            discovery_res = DiscoveryResponse.model_validate_json(response.text)
        except Exception as err:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to parse Gemini response as DiscoveryResponse: {err}",
            ) from err

    if discovery_res:
        set_cached_response(cache_key, discovery_res.model_dump(by_alias=True))
        return discovery_res

    raise HTTPException(
        status_code=500,
        detail="Gemini response contained no usable structured discovery payload.",
    )
