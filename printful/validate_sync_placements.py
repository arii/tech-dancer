#!/usr/bin/env python3
import os
import sys
import json
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
STORE_ID = 18249113
BASE_URL = "https://api.printful.com"

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "X-PF-Store-ID": str(STORE_ID)
}

def get_sync_products():
    res = requests.get(f"{BASE_URL}/sync/products", headers=headers)
    return res.json().get("result", [])

def get_sync_product_details(product_id):
    res = requests.get(f"{BASE_URL}/sync/products/{product_id}", headers=headers)
    return res.json().get("result", {})

def validate():
    if not PRINTFUL_TOKEN:
        print("ERROR: PRINTFUL_TOKEN not set.")
        return

    products = get_sync_products()

    # We are looking for Product 6 (Switch) and Product 12 (French Navy)
    # Based on the packet, these might have specific names or IDs.

    print("Auditing products for placement mismatches...")

    for p in products:
        name = p.get("name", "")
        p_id = p.get("id")

        if "switch" in name.lower() or "follow" in name.lower() or "lead" in name.lower():
            print(f"\nChecking potential Product 6 candidate: {name} (ID: {p_id})")
            details = get_sync_product_details(p_id)
            for variant in details.get("sync_variants", []):
                files = variant.get("files", [])
                placements = [f.get("type") for f in files if f.get("type") != "preview"]
                print(f"  Variant {variant['id']} placements: {placements}")
                # Check for "switch" design keyword in filename/URL if possible
                for f in files:
                    if f.get("type") != "preview":
                        print(f"    File: {f.get('filename')} (ID: {f.get('id')})")

        if "french navy" in name.lower() or "oversized" in name.lower():
            print(f"\nChecking potential Product 12 candidate: {name} (ID: {p_id})")
            details = get_sync_product_details(p_id)
            for variant in details.get("sync_variants", []):
                # Check if it is actually French Navy
                # This info might be in the variant name or fetched from catalog variant
                files = variant.get("files", [])
                placements = [f.get("type") for f in files if f.get("type") != "preview"]
                print(f"  Variant {variant['id']} placements: {placements}")
                for f in files:
                    if f.get("type") != "preview":
                        print(f"    File: {f.get('filename')} (ID: {f.get('id')})")

if __name__ == "__main__":
    validate()
