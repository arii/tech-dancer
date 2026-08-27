"""Routes package for WCS Navigator API."""

from wcs_navigator_api.routes.discover import router as discover_router
from wcs_navigator_api.routes.generate import router as generate_router

__all__ = ["discover_router", "generate_router"]
