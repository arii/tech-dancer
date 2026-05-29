import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"

# The product IDs from our 15 template configurations
PRODUCT_IDS = {
    823: "Stanley/Stella SATU020 | Blaster 2.0 Unisex Oversized T-Shirt",
    411: "Cotton Heritage M2480 | Unisex Premium Sweatshirt",
    665: "Bella + Canvas 3001CVC | Unisex CVC T-Shirt",
    163: "Next Level 6733 | Women's Racerback Tank",
    357: "Bella + Canvas 7502 | Women's Crop Hoodie",
    652: "Bella + Canvas 6400 | Women's Relaxed Tee",
    511: "Gildan 5000 | Unisex Classic Tee",
    311: "Bella + Canvas 3413 | Unisex Triblend Tee",
    244: "Sport-Tek ST350 | Competitor Performance Tee",
    603: "Stanley/Stella STTU169 | Unisex Oversized High Neck Tee (EU)"
}

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json"
}

def main():
    catalog_specs = {}
    
    for prod_id, prod_name in PRODUCT_IDS.items():
        print(f"Querying specification for: {prod_name} (ID: {prod_id})...")
        
        # Call v2 catalog-products endpoint
        url = f"{BASE_URL}/v2/catalog-products/{prod_id}"
        res = requests.get(url, headers=headers, timeout=30)
        
        if res.status_code == 200:
            data = res.json().get("data", {})
            
            # Extract basic catalog info, techniques, and placements
            specs = {
                "product_id": prod_id,
                "name": data.get("name") or data.get("title"),
                "brand": data.get("brand"),
                "model": data.get("model"),
                "techniques": data.get("techniques", []),
                "placements": []
            }
            
            # Extract placements metadata
            for pl in data.get("placements", []):
                specs["placements"].append({
                    "placement": pl.get("placement"),
                    "technique": pl.get("technique"),
                    "print_area_width": pl.get("print_area_width"),
                    "print_area_height": pl.get("print_area_height")
                })
                
            catalog_specs[prod_id] = specs
            print(f"  Successfully retrieved specs. Techniques: {[t['key'] for t in specs['techniques']]}")
        else:
            print(f"  Failed to retrieve specs for {prod_id}. Response: {res.text}")
            
    # Save specs to catalog_specifications.json
    output_path = "/home/ari/tech-dancer/printful/catalog_specifications.json"
    with open(output_path, "w") as f:
        json.dump(catalog_specs, f, indent=2)
        
    print(f"\nSaved all catalog specifications to {output_path}")

if __name__ == "__main__":
    main()
