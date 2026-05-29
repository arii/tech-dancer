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

def get_catalog_info(product_id):
    url = f"{BASE_URL}/products/{product_id}"
    res = requests.get(url, headers=headers, timeout=30)
    if res.status_code == 200:
        data = res.json().get("result", {})
        variants = data.get("variants", [])
        sizes = sorted(list(set(v.get("size") for v in variants if v.get("size"))))
        colors = sorted(list(set(v.get("color") for v in variants if v.get("color"))))
        return sizes, colors
    return [], []

def main():
    with open("printful_template_agent_packet.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"{'Template ID':<13} | {'Template Title':<50} | {'Template Sizes':<20} | {'Catalog Sizes':<20} | {'Match?':<6}")
    print("-" * 120)

    for t in data["templates"]:
        template_id = t["template_id"]
        title = t["original_title"]
        product_id = t["product_id"]
        temp_sizes = t["sizes"]
        
        cat_sizes, cat_colors = get_catalog_info(product_id)
        
        # Check if template sizes match catalog sizes
        mismatch = set(cat_sizes) - set(temp_sizes)
        match_str = "YES" if not mismatch else "NO"
        
        print(f"{template_id:<13} | {title[:50]:<50} | {str(temp_sizes):<20} | {str(cat_sizes):<20} | {match_str:<6}")

if __name__ == "__main__":
    main()
