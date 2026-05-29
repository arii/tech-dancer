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

# Design mapping
DESIGN_FILES = {
    "circular_norcal": 990303036,      # drawing-1.png
    "california_norcal": 990275069,    # drawing.png
    "rainbow_eagle": 990399734,        # rainbow_eagle.png
    "ask_to_lead": 990501278,          # ask_to_lead.png
    "ask_to_follow": 990501277,        # ask_to_follow.png
    "lead_follow_switch": 990379733,   # leadfollowswitch.png
    "wings_eagle": 992252789           # eagle.png
}

def determine_design_file(product_name):
    name = product_name.lower()
    if "sweatshirt" in name or "goldengate" in name or "norcal" in name or "best cal" in name:
        return DESIGN_FILES["circular_norcal"], "front"
    elif "follow" in name:
        return DESIGN_FILES["ask_to_follow"], "front"
    elif "lead" in name:
        return DESIGN_FILES["ask_to_lead"], "front"
    elif "switch" in name:
        # Switch checklist design
        return DESIGN_FILES["lead_follow_switch"], "front"
    elif "war eagle" in name or "eagle" in name or "new_template" in name:
        return DESIGN_FILES["rainbow_eagle"], "front"
    return None, None

def main():
    # 1. Fetch synced products in store
    print("Fetching synced products from store...")
    res = requests.get(f"{BASE_URL}/sync/products", headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to fetch products:", res.text)
        return
        
    products = res.json().get("result", [])
    print(f"Found {len(products)} products in store.")
    
    for prod in products:
        prod_id = prod["id"]
        prod_name = prod["name"]
        print(f"\nProcessing Product: {prod_name} (ID: {prod_id})")
        
        file_id, placement = determine_design_file(prod_name)
        if not file_id:
            print("  Could not automatically map design file for this product. Skipping.")
            continue
            
        print(f"  Mapped to File ID: {file_id} on placement: {placement}")
        
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
            v_name = v.get("name")
            v_color = v.get("color")
            v_size = v.get("size")
            
            # Determine retail price based on product type
            price = "29.99"
            if "sweatshirt" in prod_name.lower():
                price = "45.00"
            
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
                print(f"    [Updated] {v_color} / {v_size} -> Price: ${price}")
            else:
                print(f"    [Error] {v_color} / {v_size}: {v_res.text}")

if __name__ == "__main__":
    main()
