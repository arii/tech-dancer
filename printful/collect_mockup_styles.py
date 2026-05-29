import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"

PRODUCT_IDS = [823, 411, 665, 163, 511]

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json"
}

def main():
    mockup_styles_data = {}
    
    for prod_id in PRODUCT_IDS:
        print(f"Querying mockup styles for Product ID: {prod_id}...")
        
        # Call v2 catalog-products mockup-styles endpoint
        url = f"{BASE_URL}/v2/catalog-products/{prod_id}/mockup-styles"
        res = requests.get(url, headers=headers, timeout=30)
        
        if res.status_code == 200:
            styles = res.json().get("data", [])
            mockup_styles_data[prod_id] = styles
            print(f"  Successfully retrieved {len(styles)} style placements/variations.")
        else:
            print(f"  Failed to retrieve mockup styles for {prod_id}. Response: {res.text}")
            
    # Save mockup styles to mockup_styles_specifications.json
    output_path = "/home/ari/tech-dancer/printful/mockup_styles_specifications.json"
    with open(output_path, "w") as f:
        json.dump(mockup_styles_data, f, indent=2)
        
    print(f"\nSaved mockup style specifications to {output_path}")

if __name__ == "__main__":
    main()
