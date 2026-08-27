from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from wcs_navigator_api.config import MissingGeminiAPIKeyError, settings

app = FastAPI(
    title="WCS Navigator API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(MissingGeminiAPIKeyError)
async def missing_gemini_api_key_handler(
    request: Request, exc: MissingGeminiAPIKeyError
) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={
            "detail": str(exc),
            "error_code": "MISSING_GEMINI_API_KEY",
            "action": "Please set the GEMINI_API_KEY environment variable in your .env or shell context.",
        },
    )


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "wcs-navigator-api",
        "version": "1.0.0",
    }
