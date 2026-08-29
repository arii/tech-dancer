"""Stage 2 Generation Pass router for WCS Navigator API."""

import json
from datetime import datetime, timezone
from typing import Any, Dict, Optional
from fastapi import APIRouter, File, Form, HTTPException, Request, UploadFile
from google.genai import types

from wcs_navigator_api.config import get_genai_client, settings
from wcs_navigator_api.models.logistics import (
    AgentDecisionTrace,
    AuditSession,
    BufferCalculationResult,
    SubTask,
    ThemeDressCode,
)
from wcs_navigator_api.models.payloads import GenerateResponse, GenerateUrlRequest
from wcs_navigator_api.prompts.generation_prompt import (
    GENERATION_SYSTEM_PROMPT,
    build_generation_prompt,
)
from wcs_navigator_api.services.buffer_engine import calculate_flight_buffer
from wcs_navigator_api.services.cache_service import get_cache_key, get_cached_response, set_cached_response
from wcs_navigator_api.services.pdf_service import (
    create_genai_pdf_part,
    extract_pdf_bytes_from_upload,
    fetch_pdf_bytes_from_url,
)
from wcs_navigator_api.tools import AGENT_TOOLS

router = APIRouter(tags=["generate"])


def format_iso_to_utc_ics(iso_str: str) -> str:
    """Convert an ISO datetime string into a strict RFC 5545 UTC timestamp (YYYYMMDDTHHMMSSZ)."""
    try:
        dt = datetime.fromisoformat(iso_str)
        if dt.tzinfo is not None:
            dt_utc = dt.astimezone(timezone.utc)
        else:
            dt_utc = dt
        return dt_utc.strftime("%Y%m%dT%H%M%SZ")
    except Exception:
        clean_str = iso_str.replace("-", "").replace(":", "")
        if "+" in clean_str:
            clean_str = clean_str.split("+")[0]
        if not clean_str.endswith("Z"):
            clean_str += "Z"
        return clean_str


def ensure_flight_deadline_in_ics(
    ics_content: str, buffer_result: BufferCalculationResult
) -> str:
    """Ensure the flight landing deadline event exists in the RFC 5545 calendar text with strict UTC formatting."""
    if "Target Flight Landing Deadline" in ics_content or "✈️" in ics_content:
        return ics_content

    dt_str = format_iso_to_utc_ics(buffer_result.latest_flight_arrival_deadline)

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

    cache_key = get_cache_key(pdf_bytes, responses_dict)
    cached_data = get_cached_response(cache_key)
    if cached_data:
        return GenerateResponse.model_validate(cached_data)

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

    model_name = getattr(settings, "GEMINI_MODEL", "gemini-3.5-flash")

    try:
        chat = client.chats.create(
            model=model_name,
            config=types.GenerateContentConfig(
                system_instruction=GENERATION_SYSTEM_PROMPT,
                response_mime_type="application/json",
                response_schema=GenerateResponse,
                tools=AGENT_TOOLS,
                temperature=0.2,
            ),
        )
        response = chat.send_message([pdf_part, prompt_text])

        generate_res: Optional[GenerateResponse] = None
        response_data: Dict[str, Any] = {}

        if hasattr(response, "parsed") and isinstance(response.parsed, GenerateResponse):
            generate_res = response.parsed
        elif hasattr(response, "parsed") and response.parsed is not None:
            if isinstance(response.parsed, dict):
                generate_res = GenerateResponse.model_validate(response.parsed)
            else:
                response_data = dict(response.parsed)
        elif hasattr(response, "text") and response.text:
            response_data = json.loads(response.text)
            try:
                generate_res = GenerateResponse.model_validate(response_data)
            except Exception:
                generate_res = None
        else:
            raise ValueError("Empty response received from Gemini agent chat session.")
    except Exception as err:
        raise HTTPException(
            status_code=500, detail=f"Agent workflow orchestration failed: {str(err)}"
        ) from err

    if generate_res is not None:
        ics_content = ensure_flight_deadline_in_ics(generate_res.ics_content, buffer_result)
        decision_trace = generate_res.decision_trace.model_copy(
            update={
                "ics_content": ics_content,
                "buffer_timeline": buffer_result,
            }
        )
        generate_res = generate_res.model_copy(
            update={
                "decision_trace": decision_trace,
                "ics_content": ics_content,
            }
        )
    else:
        # Extract decision_trace data or top level fields
        raw_trace = response_data.get("decisionTrace", response_data.get("decision_trace", response_data))

        # Parse and validate decision trace components
        sub_tasks = [
            SubTask(**st)
            for st in raw_trace.get("subTasks", raw_trace.get("sub_tasks", []))
        ] if raw_trace.get("subTasks") or raw_trace.get("sub_tasks") else [
            SubTask(id="1", label="[🟢 DISCOVERY]", status="completed", detail="Parsed schedule & matched preferences"),
            SubTask(id="2", label="[🟢 FILTERING]", status="completed", detail="Processed schedule against user profile"),
            SubTask(id="3", label="[🟢 CALCULATING BUFFER MATH]", status="completed", detail=buffer_result.formula_summary),
            SubTask(id="4", label="[🟢 PACKAGING]", status="completed", detail="Tailored schedule generated"),
        ]

        sessions = [
            AuditSession(**s)
            for s in raw_trace.get("sessions", [])
        ]

        theme_dress_codes = [
            ThemeDressCode(**t)
            for t in raw_trace.get("themeDressCodes", raw_trace.get("theme_dress_codes", []))
        ] if raw_trace.get("themeDressCodes") or raw_trace.get("theme_dress_codes") else None

        raw_ics = raw_trace.get("icsContent", raw_trace.get("ics_content", response_data.get("icsContent", response_data.get("ics_content", ""))))
        ics_content = ensure_flight_deadline_in_ics(raw_ics, buffer_result)

        visual_schedule_markdown = response_data.get("visualScheduleMarkdown", response_data.get("visual_schedule_markdown", ""))

        decision_trace = AgentDecisionTrace(
            subTasks=sub_tasks,
            bufferTimeline=buffer_result,
            sessions=sessions,
            themeDressCodes=theme_dress_codes,
            icsContent=ics_content,
        )

        generate_res = GenerateResponse(
            decisionTrace=decision_trace,
            icsContent=ics_content,
            visualScheduleMarkdown=visual_schedule_markdown,
        )

    set_cached_response(cache_key, generate_res.model_dump(by_alias=True))
    return generate_res
