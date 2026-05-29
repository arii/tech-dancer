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
    "Content-Type": "application/json"
}

def main():
    # 1. Fetch all product templates
    print("Fetching product templates...")
    url = f"{BASE_URL}/product-templates?limit=100"
    res = requests.get(url, headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get templates:", res.text)
        return

    templates = res.json().get("result", {}).get("items", []) or res.json().get("result", [])
    print(f"Found {len(templates)} templates.")

    for t in templates[:3]:
        t_id = t["id"]
        t_title = t.get("title") or t.get("name")
        print(f"\nTemplate: {t_title} ({t_id})")

        # Get details
        detail_url = f"{BASE_URL}/product-templates/{t_id}"
        detail_res = requests.get(detail_url, headers=headers, timeout=30)
        if detail_res.status_code == 200:
            detail = detail_res.json().get("result", {})
            print("Keys in detail:", list(detail.keys()))
            # Print placement or variant file details if any
            if "placements" in detail:
                print("Placements:", json.dumps(detail["placements"], indent=2))
            if "items" in detail:
                print("Items (first 1):", json.dumps(detail["items"][:1], indent=2))
            # Just print the whole json keys to see if there is any hidden structure
            print("Sample keys/values:")
            for k, v in detail.items():
                if k not in ["available_variant_ids", "option_data"]:
                    print(f"  {k}: {v}")
        else:
            print("  Failed to fetch detail:", detail_res.text)

if __name__ == "__main__":
    main()
