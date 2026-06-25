import json
import sys

try:
    from ddgs import DDGS
except ImportError:
    print(json.dumps({"error": "ddgs package not found. Please install it using 'pip install ddgs' (preferably in a virtual environment)."}), file=sys.stderr)
    sys.exit(1)

try:
    query = sys.argv[1]
    max_results = int(sys.argv[2])
    results = DDGS().text(query, max_results=max_results)
    print(json.dumps(list(results)))
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
