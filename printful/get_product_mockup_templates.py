#!/usr/bin/env python3
import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
}

def check_endpoints(product_id):
    # Try endpoints
    endpoints = [
        f"/v2/catalog-products/{product_id}/mockup-styles",
        f"/v2/catalog-products/{product_id}/mockup-templates",
        f"/mockup-generator/templates/{product_id}"
    ]
    
    for path in endpoints:
        url = f"{BASE_URL}{path}"
        print(f"\nGET {url}")
        res = requests.get(url, headers=headers, timeout=30)
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            data = res.json()
            # save to a file
            filename = f"endpoint_{path.replace('/', '_')}.json"
            with open(filename, "w") as f:
                json.dump(data, f, indent=2)
            print(f"Saved response to {filename} (length: {len(str(data))})")
            
            # Print keys or summary
            if isinstance(data, dict):
                result = data.get("result", data.get("data", {}))
                if isinstance(result, list):
                    print(f"Items found: {len(result)}")
                    if len(result) > 0:
                        print("Sample item:", list(result[0].keys()) if isinstance(result[0], dict) else type(result[0]))
                else:
                    print("Keys:", list(result.keys()) if isinstance(result, dict) else type(result))
        else:
            print("Response:", res.text[:200])

if __name__ == "__main__":
    check_endpoints(823)
