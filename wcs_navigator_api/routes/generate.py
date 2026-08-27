"""Stage 2 Generation Pass router for WCS Navigator API."""

import json
from typing import Any, Dict, Optional
from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from google.genai import types

from wcs_navigator_api.config import get_genai_client, settings
from wcs_navigator_api.models.logistics import (
    AgentDecisionTrace,
    AuditSession,
    BufferCalculationResult,
    PackingItem,
    SubTask,
    ThemeDressCode,
)
from wcs_navigator_api.models.payloads import GenerateResponse, GenerateUrlRequest
from wcs_navigator_api.prompts.generation_prompt import (
    GENERATION_SYSTEM_PROMPT,
    build_generation_prompt,
)
from wcs_navigator_api.services.buffer_engine import calculate_flight_buffer
from wcs_navigator_api.services.pdf_service import (
    create_genai_pdf_part,
    extract_pdf_bytes_from_upload,
    fetch_pdf_bytes_from_url,
)

router = APIRouter(tags=["generate"])


def ensure_flight_deadline_in_ics(
    ics_content: str, buffer_result: BufferCalculationResult
) -> str:
    """Ensure the flight landing deadline event exists in the RFC 5545 calendar text."""
    if "Target Flight Landing Deadline" in ics_content or "✈️" in ics_content:
        return ics_content

    dt_str = buffer_result.latest_flight_arrival_deadline.replace("-", "").replace(":", "")
    if "+" in dt_str:
        dt_str = dt_str.split("+")[0]

    vevent = (
        "BEGIN:VEVENT\r\n"
        "SUMMARY:✈️ Target Flight Landing Deadline\r\n"
        f"DTSTART:{dt_str}\r\n"
        f"DTEND:{dt_str}\r\n"
        f"DESCRIPTION:Target flight touchdown deadline computed by WCS Navigator ({buffer_result.formula_summary}).\r\n"
        "END:VEVENT\r\n"
    )

    if "END:VCALENDAR" in ics_content:
        return ics_content.replace("END:VCALENDAR", f"{vevent}END:VCALENDAR")
    return f"BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//WCS Navigator//EN\r\n{vevent}END:VCALENDAR"


def parse_questionnaire_dict(raw: Any) -> Dict[str, Any]:
    """Parse questionnaire responses from dict or JSON string."""
    if isinstance(raw, dict):
        return raw
    if isinstance(raw, str) and raw.strip():
        try:
            return json.loads(raw)
        except Exception as err:
            raise HTTPException(
                status_code=400, detail="Invalid questionnaire_responses JSON string"
            ) from err
    return {}


@router.post("/generate-calendar/generate", response_model=GenerateResponse)
@router.post("/api/v1/generate", response_model=GenerateResponse)
@router.post("/generate", response_model=GenerateResponse)
async def generate_calendar(
    request: Request,
    file: Optional[UploadFile] = File(None),
    questionnaire_responses: Optional[str] = Form(None),
) -> GenerateResponse:
    """Stage 2 Generation Pass: fuse PDF schedule and questionnaire answers into an RFC 5545 calendar and decision trace."""
    content_type = request.headers.get("content-type", "").lower()
    pdf_bytes: bytes = b""
    responses_dict: Dict[str, Any] = {}

    if "application/json" in content_type:
        try:
            body_json = await request.json()
            url_req = GenerateUrlRequest(**body_json)
            responses_dict = url_req.questionnaire_responses
            pdf_bytes = fetch_pdf_bytes_from_url(str(url_req.url))
        except HTTPException:
            raise
        except Exception as err:
            raise HTTPException(
                status_code=400, detail=f"Invalid JSON request body: {str(err)}"
            ) from err
    elif file is not None:
        pdf_bytes = await extract_pdf_bytes_from_upload(file)
        responses_dict = parse_questionnaire_dict(questionnaire_responses)
    else:
        # Try reading form data or json fallback
        try:
            form = await request.form()
            uploaded_file = form.get("file")
            raw_q = form.get("questionnaire_responses")
            if isinstance(uploaded_file, UploadFile):
                pdf_bytes = await extract_pdf_bytes_from_upload(uploaded_file)
                responses_dict = parse_questionnaire_dict(raw_q)
            else:
                body_json = await request.json()
                url_req = GenerateUrlRequest(**body_json)
                responses_dict = url_req.questionnaire_responses
                pdf_bytes = fetch_pdf_bytes_from_url(str(url_req.url))
        except HTTPException:
            raise
        except Exception as err:
            raise HTTPException(
                status_code=400,
                detail="Request must provide either a multipart PDF file or a JSON payload with a valid schedule URL.",
            ) from err

    # Calculate travel buffer
    earliest_call = responses_dict.get(
        "earliest_call_time_iso",
        responses_dict.get("earliest_staging_time", "2026-10-09T17:15:00-07:00"),
    )
    transit_mins = int(responses_dict.get("transit_minutes", 30))
    hotel_settle_h = float(responses_dict.get("hotel_settle_hours", 1.5))
    warmup_h = float(responses_dict.get("warmup_buffer_hours", 1.0))

    buffer_result = calculate_flight_buffer(
        earliest_call_iso=earliest_call,
        transit_mins=transit_mins,
        hotel_settle_hours=hotel_settle_h,
        warmup_buffer_hours=warmup_h,
    )

    client = get_genai_client()
    pdf_part = create_genai_pdf_part(pdf_bytes)
    prompt_text = build_generation_prompt(
        questionnaire_responses=responses_dict,
        buffer_timeline_json=buffer_result.model_dump_json(by_alias=True),
    )

    model_name = getattr(settings, "GEMINI_MODEL", "gemini-2.5-flash")

    try:
        response = client.models.generate_content(
            model=model_name,
            contents=[pdf_part, prompt_text],
            config=types.GenerateContentConfig(
                system_instruction=GENERATION_SYSTEM_PROMPT,
                response_mime_type="application/json",
            ),
        )
        response_data = json.loads(response.text)
    except Exception as err:
        raise HTTPException(
            status_code=500, detail=f"Gemini generation pass failed: {str(err)}"
        ) from err

    # Extract decision_trace data or top level fields
    raw_trace = response_data.get("decisionTrace", response_data.get("decision_trace", response_data))

    # Parse and validate decision trace components
    sub_tasks = [
        SubTask(**st)
        for st in raw_trace.get("subTasks", raw_trace.get("sub_tasks", []))
    ] if raw_trace.get("subTasks") or raw_trace.get("sub_tasks") else [
        SubTask(id="1", label="Parsed schedule & matched preferences", status="completed", detail="Processed schedule against user profile"),
        SubTask(id="2", label="Calculated travel buffer", status="completed", detail=buffer_result.formula_summary),
        SubTask(id="3", label="Filtered workshops & assembled calendar", status="completed", detail="Tailored schedule generated"),
    ]

    sessions = [
        AuditSession(**s)
        for s in raw_trace.get("sessions", [])
    ]

    theme_dress_codes = [
        ThemeDressCode(**t)
        for t in raw_trace.get("themeDressCodes", raw_trace.get("theme_dress_codes", []))
    ] if raw_trace.get("themeDressCodes") or raw_trace.get("theme_dress_codes") else None

    packing_manifest = [
        PackingItem(**p)
        for p in raw_trace.get("packingManifest", raw_trace.get("packing_manifest", []))
    ] if raw_trace.get("packingManifest") or raw_trace.get("packing_manifest") else None

    raw_ics = raw_trace.get("icsContent", raw_trace.get("ics_content", response_data.get("icsContent", response_data.get("ics_content", ""))))
    ics_content = ensure_flight_deadline_in_ics(raw_ics, buffer_result)

    decision_trace = AgentDecisionTrace(
        subTasks=sub_tasks,
        bufferTimeline=buffer_result,
        sessions=sessions,
        themeDressCodes=theme_dress_codes,
        packingManifest=packing_manifest,
        icsContent=ics_content,
    )

    return GenerateResponse(
        decisionTrace=decision_trace,
        icsContent=ics_content,
    )
