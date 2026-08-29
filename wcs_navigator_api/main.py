from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from wcs_navigator_api.config import MissingGeminiAPIKeyError, settings
from wcs_navigator_api.routes.discover import router as discover_router
from wcs_navigator_api.routes.generate import router as generate_router

app = FastAPI(
    title="WCS Navigator API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(discover_router)
app.include_router(generate_router)


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
