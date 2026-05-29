import os
import sys
import json
import requests

# Operational parameters from environment variables
PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
STORE_ID = os.getenv("PRINTFUL_STORE_ID")
BASE_URL = "https://api.printful.com"
CONFIG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config", "product_metadata_map.json")

def fail(message):
    print(f"ERROR: {message}")
    sys.exit(1)

if not PRINTFUL_TOKEN:
    fail("PRINTFUL_TOKEN is not set.")

if not STORE_ID:
    fail("PRINTFUL_STORE_ID is not set.")

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def load_config():
    try:
        with open(CONFIG_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        fail(f"Could not load config from {CONFIG_PATH}: {e}")

def main():
    config = load_config()

    # 1. Fetch synced products in store
    print(f"Fetching synced products from store {STORE_ID}...")
    res = requests.get(f"{BASE_URL}/sync/products", headers=headers, timeout=30)
    if res.status_code != 200:
        print(f"Failed to fetch products: {res.text}")
        return
        
    products = res.json().get("result", [])
    print(f"Found {len(products)} products in store.")
    
    for prod in products:
        prod_id = str(prod["id"])
        prod_name = prod["name"]
        print(f"\nProcessing Product: {prod_name} (ID: {prod_id})")
        
        # Data-driven lookup using Printful Sync Product ID as required by audit
        metadata = config.get(prod_id)
        if not metadata:
            print(f"  Warning: No entry for sync_product_id {prod_id} in config. Skipping.")
            continue
            
        file_id = metadata.get("design_file_id")
        placement = metadata.get("placement")
        price = metadata.get("retail_price", "29.99")

        if not file_id or not placement:
            print(f"  Error: Missing design_file_id or placement in config for {prod_id}. Skipping.")
            continue

        print(f"  Mapped to File ID: {file_id} on placement: {placement}, Price: {price}")
        
        # 2. Get detailed product variants
        d_res = requests.get(f"{BASE_URL}/sync/products/{prod_id}", headers=headers, timeout=30)
        if d_res.status_code != 200:
            print(f"  Failed to fetch variants for {prod_name}")
            continue
            
        detail = d_res.json().get("result", {})
        sync_variants = detail.get("sync_variants", [])
        print(f"  Updating {len(sync_variants)} variants...")
        
        # 3. Batch update variants
        for v in sync_variants:
            v_id = v["id"]
            v_color = v.get("color", "N/A")
            v_size = v.get("size", "N/A")
            
            # Setup payload
            payload = {
                "retail_price": price,
                "files": [
                    {
                        "type": placement,
                        "id": file_id
                    }
                ]
            }
            
            # Call PUT /sync/variant/{id}
            url = f"{BASE_URL}/sync/variant/{v_id}"
            v_res = requests.put(url, headers=headers, json=payload, timeout=30)
            if v_res.status_code == 200:
                print(f"    [Updated] {v_color} / {v_size} -> Price: {price}")
            else:
                print(f"    [Error] {v_color} / {v_size}: {v_res.text}")

if __name__ == "__main__":
    main()
