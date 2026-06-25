import json
import sys

import warnings
warnings.filterwarnings("ignore", category=RuntimeWarning, message=".*has been renamed to `ddgs`.*")

try:
    from duckduckgo_search import DDGS
except ImportError:
    print(json.dumps({"error": "duckduckgo_search package not found. Please install it using 'pip install duckduckgo-search' (preferably in a virtual environment)."}), file=sys.stderr)
    sys.exit(1)

try:
    query = sys.argv[1]
    max_results = int(sys.argv[2])
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", category=RuntimeWarning)
        results = DDGS().text(query, max_results=max_results)
    print(json.dumps(list(results)))
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
