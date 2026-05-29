#!/usr/bin/env python3
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
    # Fetch files library
    url = f"{BASE_URL}/files"
    print("GET /files")
    res = requests.get(url, headers=headers, timeout=30)
    print("Status:", res.status_code)

    if res.status_code == 200:
        data = res.json()
        files = data.get("result", [])
        print(f"Found {len(files)} files in the library.")
        if files:
            print("\nSample file details:")
            print(json.dumps(files[0], indent=2))

            # Save files list
            with open("file_library.json", "w") as f:
                json.dump(data, f, indent=2)
    else:
        print("Error:", res.text)

if __name__ == "__main__":
    main()
