"""Prompts package for WCS Navigator API."""

from wcs_navigator_api.prompts.discovery_prompt import DISCOVERY_SYSTEM_PROMPT
from wcs_navigator_api.prompts.generation_prompt import (
    GENERATION_SYSTEM_PROMPT,
    build_generation_prompt,
)

__all__ = [
    "DISCOVERY_SYSTEM_PROMPT",
    "GENERATION_SYSTEM_PROMPT",
    "build_generation_prompt",
]
