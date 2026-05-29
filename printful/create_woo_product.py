#!/usr/bin/env python3
import os
import sys
import json
import time
import argparse
import requests
from requests.auth import HTTPBasicAuth

WOO_KEY = os.getenv("WOO_CONSUMER_KEY")
WOO_SECRET = os.getenv("WOO_CONSUMER_SECRET")
WOO_URL = os.getenv("WOO_STORE_URL", "https://boomtick.blog")
PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
PRINTFUL_STORE_ID = 18249113

def create_woo_product(name, description, price, categories=None, attributes=None):
    url = f"{WOO_URL}/wp-json/wc/v3/products"
    payload = {
        "name": name,
        "type": "variable",
        "description": description,
        "short_description": description[:100],
        "regular_price": price,
        "categories": [{"id": c} for c in categories] if categories else [],
        "attributes": attributes or []
    }

    print(f"Creating WooCommerce product: {name}...")
    res = requests.post(url, auth=HTTPBasicAuth(WOO_KEY, WOO_SECRET), json=payload, timeout=30)
    if res.status_code not in [200, 201]:
        print(f"Failed to create WooCommerce product: {res.text}")
        sys.exit(1)

    product_data = res.json()
    print(f"WooCommerce product created! ID: {product_data['id']}")
    return product_data

def poll_printful_sync(woo_product_id):
    print(f"Waiting for Printful to sync WooCommerce product {woo_product_id}...")
    headers = {
        "Authorization": f"Bearer {PRINTFUL_TOKEN}",
        "X-PF-Store-ID": str(PRINTFUL_STORE_ID)
    }

    for _ in range(60): # Poll for 10 minutes
        res = requests.get(f"https://api.printful.com/sync/products", headers=headers, timeout=30)
        if res.status_code == 200:
            products = res.json().get("result", [])
            # Printful usually uses the WooCommerce product ID as external_id or in the name/description
            # This depends on how the integration is set up.
            # Often external_id in Printful matches WooCommerce product ID.
            for p in products:
                if str(p.get("external_id")) == str(woo_product_id):
                    print(f"Printful sync detected! Sync Product ID: {p['id']}")
                    return p['id']

        time.sleep(10)

    print("Timed out waiting for Printful sync.")
    return None

def main():
    parser = argparse.ArgumentParser(description="Create a WooCommerce product and link it to Printful.")
    parser.add_argument("--name", required=True)
    parser.add_argument("--description", default="BoomTick Merch")
    parser.add_argument("--price", default="29.99")
    parser.add_argument("--catalog-id", type=int, required=True)
    parser.add_argument("--front-design", help="Front design keyword")
    parser.add_argument("--back-design", help="Back design keyword")
    parser.add_argument("--colors", help="Comma-separated colors")

    args = parser.parse_args()

    if not all([WOO_KEY, WOO_SECRET, PRINTFUL_TOKEN]):
        print("ERROR: WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET, and PRINTFUL_TOKEN must be set.")
        sys.exit(1)

    # 1. Create WooCommerce Shell
    woo_product = create_woo_product(args.name, args.description, args.price)
    woo_id = woo_product["id"]

    # 2. Wait for Printful to detect it
    sync_id = poll_printful_sync(woo_id)

    if sync_id:
        # 3. Trigger sync_new_product logic (imported or called via subprocess)
        print(f"Triggering sync logic for Printful ID {sync_id}...")
        import subprocess
        cmd = [
            "python3", "printful/sync_new_product.py",
            "--name", args.name,
            "--catalog-id", str(args.catalog_id),
            "--sync-product-id", str(sync_id),
            "--price", args.price
        ]
        if args.front_design: cmd += ["--front-design", args.front_design]
        if args.back_design: cmd += ["--back-design", args.back_design]
        if args.colors: cmd += ["--colors", args.colors]

        subprocess.run(cmd)

if __name__ == "__main__":
    main()
