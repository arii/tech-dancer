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

def request_printful(path):
    url = f"{BASE_URL}{path}"
    print(f"GET {url}")
    res = requests.get(url, headers=headers, timeout=30)
    print(f"Status: {res.status_code}")
    if res.status_code >= 400:
        print(res.text)
        return None
    return res.json()

def main():
    # 1. Let's query template 102861895 details
    print("=== TEMPLATE 102861895 ===")
    template_data = request_printful("/product-templates/102861895")
    if template_data:
        # Save to temp debug file
        with open("template_102861895.json", "w") as f:
            json.dump(template_data, f, indent=2)
        result = template_data.get("result", {})
        print(f"Title: {result.get('title')}")
        print(f"Product ID: {result.get('product_id')}")
        print(f"Sizes listed: {result.get('sizes')}")
        print(f"Colors: {[c.get('color_name') for c in result.get('colors', [])]}")
        print(f"Variants count: {len(result.get('available_variant_ids', []))}")

        product_id = result.get('product_id')
        if product_id:
            # Let's query catalog details for this product ID to see if more sizes/colors exist!
            print(f"\n=== CATALOG PRODUCT {product_id} ===")
            catalog_data = request_printful(f"/products/{product_id}")
            if catalog_data:
                with open(f"catalog_product_{product_id}.json", "w") as f:
                    json.dump(catalog_data, f, indent=2)
                cat_result = catalog_data.get("result", {})
                product_info = cat_result.get("product", {})
                print(f"Catalog Product Name: {product_info.get('title')}")

                variants = cat_result.get("variants", [])
                print(f"Total Catalog Variants: {len(variants)}")

                sizes = sorted(list(set(v.get("size") for v in variants if v.get("size"))))
                colors = sorted(list(set(v.get("color") for v in variants if v.get("color"))))
                print(f"Available sizes in catalog: {sizes}")
                print(f"Available colors in catalog: {colors}")

if __name__ == "__main__":
    main()
