#!/usr/bin/env python3
import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
STORE_ID = os.getenv("PRINTFUL_STORE_ID")
BASE_URL = "https://api.printful.com"

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json"
}

if STORE_ID:
    headers["X-PF-Store-ID"] = str(STORE_ID)

def get_sync_products():
    res = requests.get(f"{BASE_URL}/sync/products", headers=headers)
    if res.status_code != 200:
        print(f"Error fetching products: {res.text}")
        return []
    return res.json().get("result", [])

def get_sync_product_details(product_id):
    res = requests.get(f"{BASE_URL}/sync/products/{product_id}", headers=headers)
    if res.status_code != 200:
        print(f"Error fetching details for {product_id}: {res.text}")
        return {}
    return res.json().get("result", {})

def validate():
    if not PRINTFUL_TOKEN:
        print("ERROR: PRINTFUL_TOKEN not set.")
        return

    if not STORE_ID:
        print("ERROR: PRINTFUL_STORE_ID not set.")
        return

    products = get_sync_products()

    print(f"Auditing {len(products)} products for placement mismatches...")

    for p in products:
        name = p.get("name", "")
        p_id = p.get("id")

        # Checking for Product 6 and Product 12 candidates
        is_p6 = any(kw in name.lower() for kw in ["switch", "follow", "lead"])
        is_p12 = any(kw in name.lower() for kw in ["french navy", "oversized"])

        if is_p6 or is_p12:
            label = "Product 6" if is_p6 else "Product 12"
            print(f"\nChecking potential {label} candidate: {name} (ID: {p_id})")
            details = get_sync_product_details(p_id)
            for variant in details.get("sync_variants", []):
                files = variant.get("files", [])
                placements = [f.get("type") for f in files if f.get("type") != "preview"]
                print(f"  Variant {variant['id']} placements: {placements}")
                for f in files:
                    if f.get("type") != "preview":
                        print(f"    File: {f.get('filename')} (ID: {f.get('id')})")

if __name__ == "__main__":
    validate()
