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
    # 1. Fetch all sync products
    print("Fetching sync products...")
    url = f"{BASE_URL}/sync/products?limit=100"
    res = requests.get(url, headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get sync products:", res.text)
        return

    products = res.json().get("result", [])
    print(f"Found {len(products)} products.")

    file_map = {}
    product_files = {}

    for prod in products:
        prod_id = prod["id"]
        prod_name = prod["name"]
        print(f"Querying product: {prod_name} ({prod_id})...")

        detail_url = f"{BASE_URL}/sync/products/{prod_id}"
        detail_res = requests.get(detail_url, headers=headers, timeout=30)
        if detail_res.status_code != 200:
            print(f"  Failed to get details for {prod_id}")
            continue

        detail = detail_res.json().get("result", {})
        sync_variants = detail.get("sync_variants", [])

        product_files[prod_name] = []

        for variant in sync_variants:
            files = variant.get("files", [])
            for file_info in files:
                file_type = file_info.get("type", "default")
                # We only care about default, front, back, etc. print files (exclude preview/mockup files)
                if file_type == "preview":
                    continue

                f_id = file_info.get("id")
                f_hash = file_info.get("hash")
                f_name = file_info.get("filename")
                f_preview = file_info.get("preview_url")

                if f_id and f_id not in file_map:
                    file_map[f_id] = {
                        "filename": f_name,
                        "hash": f_hash,
                        "type": file_type,
                        "preview_url": f_preview
                    }
                    print(f"  [New File] ID: {f_id} | Name: {f_name} | Type: {file_type}")

                if f_id and f_id not in product_files[prod_name]:
                    product_files[prod_name].append(f_id)

    # Output results
    output = {
        "unique_files": file_map,
        "product_design_mapping": product_files
    }

    with open("collected_design_files.json", "w") as f:
        json.dump(output, f, indent=2)

    print("\nSaved design files mapping to collected_design_files.json")
    print(f"Total unique print files found in store: {len(file_map)}")

if __name__ == "__main__":
    main()
