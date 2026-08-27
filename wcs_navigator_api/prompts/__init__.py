"""Generation prompt package for WCS Navigator Stage 2."""

from wcs_navigator_api.prompts.generation_prompt import (
    GENERATION_SYSTEM_PROMPT,
    build_generation_prompt,
)

__all__ = ["GENERATION_SYSTEM_PROMPT", "build_generation_prompt"]
