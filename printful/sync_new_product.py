#!/usr/bin/env python3
import os
import sys
import json
import time
import re
import argparse
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113

# File mapping from our design files library
DESIGN_FILES = {
    "rainbow_eagle": {"id": 990399734, "url": "https://files.cdn.printful.com/files/6bc/6bcb2338fc0fa3b9b4a7decc94feb1ff_preview.png"},
    "eagle": {"id": 992252789, "url": "https://files.cdn.printful.com/files/992/992252789_preview.png"},
    "ask_to_lead": {"id": 990501278, "url": "https://files.cdn.printful.com/files/990/990501278_preview.png"},
    "ask_to_follow": {"id": 990501277, "url": "https://files.cdn.printful.com/files/990/990501277_preview.png"},
    "lead_follow_switch": {"id": 990379733, "url": "https://files.cdn.printful.com/files/990/990379733_preview.png"},
    "love_check": {"id": 990381279, "url": "https://files.cdn.printful.com/files/990/990381279_preview.png"},
    "circular_norcal": {"id": 990303036, "url": "https://files.cdn.printful.com/files/d47/d47b12ba9699c4562158168013a5c0c5_preview.png"}
}

# Catalog Product placement position mappings
POSITION_MAPPING = {
    823: {
        "back": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964},
        "front": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964}
    },
    411: {
        "front": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964},
        "back": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964}
    },
    665: {
        "front": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964},
        "back": {"area_width": 3000, "area_height": 3000, "width": 1088, "height": 1449, "top": 316, "left": 964}
    }
}

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def post_with_rate_limit(url, payload):
    while True:
        res = requests.post(url, headers=headers, json=payload, timeout=30)
        if res.status_code in [200, 201]:
            return res
        elif res.status_code == 429:
            body = res.json()
            error_msg = body.get("result", "")
            wait_seconds = 60
            match = re.search(r"after (\d+) seconds", error_msg)
            if match:
                wait_seconds = int(match.group(1)) + 2
            print(f"Rate limited (429). Sleeping for {wait_seconds} seconds...")
            time.sleep(wait_seconds)
        else:
            print(f"Error {res.status_code}: {res.text}")
            sys.exit(1)

def get_lifestyle_mockup_styles(catalog_id):
    try:
        with open("printful/mockup_styles_specifications.json", "r") as f:
            specs = json.load(f)
            product_specs = specs.get(str(catalog_id), [])
            style_ids = []
            for placement_spec in product_specs:
                for style in placement_spec.get("mockup_styles", []):
                    cat_name = style.get("category_name", "")
                    if any(kw in cat_name for kw in ["Lifestyle", "Men's", "Women's", "Model"]):
                        style_ids.append(style["id"])
            return list(set(style_ids))
    except FileNotFoundError:
        return []

def main():
    parser = argparse.ArgumentParser(description="Create and Sync a new Printful product with correct artwork, prices, and mockups.")
    parser.add_argument("--name", required=True, help="Display Name of the product")
    parser.add_argument("--catalog-id", type=int, required=True, help="Base Catalog Product ID")
    parser.add_argument("--front-design", choices=DESIGN_FILES.keys(), help="Front design keyword")
    parser.add_argument("--back-design", choices=DESIGN_FILES.keys(), help="Back design keyword")
    parser.add_argument("--colors", help="Comma-separated target colors (e.g. 'black,white')")
    parser.add_argument("--technique", default="dtg", choices=["dtg", "embroidery", "dtfilm"], help="Printing technique")
    parser.add_argument("--price", default="29.99", help="Retail price")
    parser.add_argument("--sync-product-id", type=int, help="Existing Sync Product ID to update")
    
    args = parser.parse_args()
    
    if not PRINTFUL_TOKEN:
        print("ERROR: PRINTFUL_TOKEN environment variable not set.")
        sys.exit(1)
        
    placements = []
    if args.front_design:
        p_type = "front"
        if args.technique == "dtfilm": p_type = "front_dtf"
        elif args.technique == "embroidery": p_type = "embroidery_chest_center"
        placements.append({"type": p_type, "design": args.front_design})

    if args.back_design:
        p_type = "back"
        if args.technique == "dtfilm": p_type = "back_dtf"
        placements.append({"type": p_type, "design": args.back_design})

    if not placements:
        print("ERROR: At least one design (front or back) must be specified.")
        sys.exit(1)

    # 1. Fetch catalog variants
    print(f"Fetching catalog variants for product {args.catalog_id}...")
    res = requests.get(f"{BASE_URL}/products/{args.catalog_id}", headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get product catalog variants:", res.text)
        sys.exit(1)
        
    catalog_variants = res.json().get("result", {}).get("variants", [])
    
    target_colors = [c.strip().lower() for c in args.colors.split(",")] if args.colors else []
    
    sync_variants_payload = []
    for cv in catalog_variants:
        color = cv.get("color", "").lower()
        is_ignored = False
        if target_colors and color not in target_colors:
            is_ignored = True

        variant_files = []
        for p in placements:
            variant_files.append({
                "type": p["type"],
                "id": DESIGN_FILES[p["design"]]["id"]
            })

        sync_variants_payload.append({
            "variant_id": cv["id"],
            "retail_price": args.price,
            "is_ignored": is_ignored,
            "files": variant_files
        })

    if not target_colors:
        found_colors = []
        for cv in catalog_variants:
            c = cv.get("color", "").lower()
            if c and c not in found_colors:
                found_colors.append(c)
            if len(found_colors) >= 3:
                break
        
        for sv in sync_variants_payload:
            cv = next(c for c in catalog_variants if c["id"] == sv["variant_id"])
            if cv.get("color", "").lower() not in found_colors:
                sv["is_ignored"] = True

    sync_product_id = args.sync_product_id
    if not sync_product_id:
        print("\nCreating synced product shell...")
        product_payload = {
            "sync_product": {
                "name": args.name,
                "external_id": f"{int(time.time())}"
            },
            "sync_variants": sync_variants_payload
        }
        create_res = requests.post(f"{BASE_URL}/store/products", headers=headers, json=product_payload, timeout=30)
        if create_res.status_code != 200:
            print("Failed to create product shell:", create_res.text)
            sys.exit(1)
        sync_product_id = create_res.json().get("result", {}).get("id")
        print(f"Synced product created! ID: {sync_product_id}")
    else:
        print(f"\nUpdating existing synced product {sync_product_id}...")

    # 2. Mockup Generation
    lifestyle_style_ids = get_lifestyle_mockup_styles(args.catalog_id)
    
    mockup_files = []
    for p in placements:
        # Map back to simple front/back for position lookup if needed
        lookup_type = "front" if "front" in p["type"] else "back"
        pos = POSITION_MAPPING.get(args.catalog_id, {}).get(lookup_type, {
            "area_width": 1800, "area_height": 2400, "width": 1800, "height": 1800, "top": 300, "left": 0
        })
        mockup_files.append({
            "placement": p["type"],
            "image_url": DESIGN_FILES[p["design"]]["url"],
            "position": pos
        })

    variant_ids_for_mockup = [sv["variant_id"] for sv in sync_variants_payload if not sv["is_ignored"]]
    
    mockup_payload = {
        "variant_ids": variant_ids_for_mockup,
        "format": "jpg",
        "files": mockup_files
    }
    if lifestyle_style_ids:
        mockup_payload["mockup_style_ids"] = lifestyle_style_ids

    print(f"\nTriggering mockup generation task (technique: {args.technique})...")
    task_url = f"{BASE_URL}/mockup-generator/create-task/{args.catalog_id}"
    task_res = post_with_rate_limit(task_url, mockup_payload)
    task_key = task_res.json().get("result", {}).get("task_key")
    
    # 3. Poll Mockups
    mockup_urls = {}
    primary_mockup_url = None
    print("Waiting for mockups...")
    for _ in range(30):
        time.sleep(5)
        poll_res = requests.get(f"{BASE_URL}/mockup-generator/task?task_key={task_key}", headers=headers, timeout=30)
        if poll_res.status_code == 200:
            task_data = poll_res.json().get("result", {})
            if task_data.get("status") == "completed":
                mockups = task_data.get("mockups", [])
                for item in mockups:
                    v_ids = item.get("variant_ids", [])
                    url = item.get("mockup_url")
                    if not primary_mockup_url: primary_mockup_url = url
                    for v_id in v_ids:
                        mockup_urls[v_id] = url
                break
            elif task_data.get("status") == "failed":
                print("Mockup generation failed.")
                sys.exit(1)

    # 4. Update Sync Variants
    print("\nLinking assets to sync variants...")
    sync_details_res = requests.get(f"{BASE_URL}/sync/products/{sync_product_id}", headers=headers, timeout=30)
    created_sync_variants = sync_details_res.json().get("result", {}).get("sync_variants", [])
    
    for sv in created_sync_variants:
        sv_id = sv["id"]
        cat_v_id = sv["variant_id"]
        
        intended = next((v for v in sync_variants_payload if v["variant_id"] == cat_v_id), None)
        if not intended: continue

        new_files = []
        for p in placements:
            new_files.append({
                "type": p["type"],
                "id": DESIGN_FILES[p["design"]]["id"]
            })

        m_url = mockup_urls.get(cat_v_id)
        if m_url:
            new_files.append({"type": "preview", "url": m_url})
            
        update_payload = {
            "retail_price": intended["retail_price"],
            "is_ignored": intended["is_ignored"],
            "files": new_files
        }

        requests.put(f"{BASE_URL}/sync/variant/{sv_id}", headers=headers, json=update_payload, timeout=30)
        print(f"  Updated sync variant {sv_id} (ignored={intended['is_ignored']})")

    if primary_mockup_url:
        requests.put(f"{BASE_URL}/store/products/{sync_product_id}", headers=headers, json={
            "sync_product": {"thumbnail": primary_mockup_url}
        }, timeout=30)

    print(f"\nProduct setup complete! ID: {sync_product_id}")

if __name__ == "__main__":
    main()
