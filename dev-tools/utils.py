import sys
import os

from dev_tools_sdk.utils.common import (
    CLIError,
    run_command,
    get_repo_name,
    GHAConfigManager,
    get_gha_variable,
    set_gha_variable
)
from dev_tools_sdk.utils.auth import (
    get_github_token,
    get_github_client,
    AuthError
)
from dev_tools_sdk.utils.logs import (
    extract_failing_info,
    clean_gha_logs
)
from dev_tools_sdk.utils.ollama import (
    APIConnectionError,
    get_ollama_url,
    get_ollama_model,
    get_ollama_review_model,
    get_ollama_synthesis_model,
    is_ollama_available,
    call_ollama,
    clean_llm_output,
    to_standard_schema
)

import json
import time
import urllib.request
import urllib.error
import urllib.parse
import re
import random
import subprocess
from typing import Optional, Union, List

# To export for external usages
__all__ = [
    "CLIError", "APIConnectionError", "AuthError",
    "run_command", "get_repo_name", "GHAConfigManager", "get_gha_variable", "set_gha_variable",
    "get_github_token", "get_github_client",
    "extract_failing_info", "clean_gha_logs",
    "get_ollama_url", "get_ollama_model", "get_ollama_review_model", "get_ollama_synthesis_model",
    "is_ollama_available", "call_ollama", "clean_llm_output", "to_standard_schema"
]
