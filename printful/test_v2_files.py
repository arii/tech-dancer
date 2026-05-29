import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    # Fetch files library using v2 endpoint
    url = f"{BASE_URL}/v2/files"
    print("GET /v2/files")
    res = requests.get(url, headers=headers, timeout=30)
    print("Status:", res.status_code)

    try:
        data = res.json()
        print(json.dumps(data, indent=2)[:1000])
    except Exception as e:
        print("Raw response:", res.text)

if __name__ == "__main__":
    main()
