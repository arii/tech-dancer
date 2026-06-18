
import sys
import os
sys.path.append('dev-tools')
from utils import call_github_models

try:
    call_github_models("test")
except Exception as e:
    print(f"Caught exception: {type(e).__name__}: {e}")
