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

# File mapping from our design files library screenshot mapping
DESIGN_FILES = {
    "rainbow_eagle": {"id": 990399734, "url": "https://files.cdn.printful.com/files/6bc/6bcb2338fc0fa3b9b4a7decc94feb1ff_preview.png"},
    "eagle": {"id": 992252789, "url": "https://files.cdn.printful.com/files/992/992252789_preview.png"},
    "ask_to_lead": {"id": 990501278, "url": "https://files.cdn.printful.com/files/990/990501278_preview.png"},
    "ask_to_follow": {"id": 990501277, "url": "https://files.cdn.printful.com/files/990/990501277_preview.png"},
    "lead_follow_switch": {"id": 990379733, "url": "https://files.cdn.printful.com/files/990/990379733_preview.png"},
    "love_check": {"id": 990381279, "url": "https://files.cdn.printful.com/files/990/990381279_preview.png"},
    "circular_norcal": {"id": 990303036, "url": "https://files.cdn.printful.com/files/d47/d47b12ba9699c4562158168013a5c0c5_preview.png"}
}

# Catalog Product placement position mappings (front and back layout guidelines for SATU020)
POSITION_MAPPING = {
    823: {
        "back": {
            "area_width": 3000,
            "area_height": 3000,
            "width": 1088,
            "height": 1449,
            "top": 316,
            "left": 964
        },
        "front": {
            "area_width": 3000,
            "area_height": 3000,
            "width": 1088,
            "height": 1449,
            "top": 316,
            "left": 964
        }
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
        if res.status_code == 200:
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

def main():
    parser = argparse.ArgumentParser(description="Create and Sync a new Printful product with correct artwork, prices, and mockups.")
    parser.add_argument("--name", required=True, help="Display Name of the product")
    parser.add_argument("--catalog-id", type=int, required=True, help="Base Catalog Product ID (e.g. 823 for SATU020)")
    parser.add_argument("--design", choices=DESIGN_FILES.keys(), required=True, help="Design keyword (e.g. rainbow_eagle)")
    parser.add_argument("--placement", choices=["front", "back"], default="back", help="Fulfillment print placement (default: back)")
    parser.add_argument("--price", default="29.99", help="Retail price for variants (default: 29.99)")
    
    args = parser.parse_args()
    
    if not PRINTFUL_TOKEN:
        print("ERROR: PRINTFUL_TOKEN environment variable not set.")
        sys.exit(1)
        
    design_info = DESIGN_FILES[args.design]
    file_id = design_info["id"]
    design_url = design_info["url"]
    
    # 1. Fetch catalog variant IDs for the product
    print(f"Fetching catalog variant IDs for product {args.catalog_id}...")
    res = requests.get(f"{BASE_URL}/products/{args.catalog_id}", headers=headers, timeout=30)
    if res.status_code != 200:
        print("Failed to get product catalog variants:", res.text)
        sys.exit(1)
        
    catalog_variants = res.json().get("result", {}).get("variants", [])
    # Limit variants to Black for SATU020 as a default example
    target_variants = [v for v in catalog_variants if v.get("color", "").lower() == "black"]
    
    if not target_variants:
        # Fallback to first 5 variants if black not found
        target_variants = catalog_variants[:5]
        
    variant_ids = [v["id"] for v in target_variants]
    print(f"Targeting catalog variant IDs: {variant_ids}")
    
    # 2. Create the Sync Product
    sync_variants = []
    for v_id in variant_ids:
        sync_variants.append({
            "retail_price": args.price,
            "variant_id": v_id,
            "files": [
                {
                    "type": args.placement,
                    "id": file_id
                }
            ]
        })
        
    product_payload = {
        "sync_product": {
            "name": args.name,
            "external_id": f"{args.design}_{args.catalog_id}_{int(time.time())}"
        },
        "sync_variants": sync_variants
    }
    
    print("\nCreating synced product shell...")
    create_res = requests.post(f"{BASE_URL}/store/products", headers=headers, json=product_payload, timeout=30)
    if create_res.status_code != 200:
        print("Failed to create product shell:", create_res.text)
        sys.exit(1)
        
    product_data = create_res.json().get("result", {})
    sync_product_id = product_data.get("id")
    print(f"Synced product created successfully! ID: {sync_product_id}")
    
    # 3. Generate Mockups
    position = POSITION_MAPPING.get(args.catalog_id, {}).get(args.placement)
    if not position:
        # Fallback default position block
        position = {
            "area_width": 1800,
            "area_height": 2400,
            "width": 1800,
            "height": 1800,
            "top": 300,
            "left": 0
        }
        
    mockup_payload = {
        "variant_ids": variant_ids,
        "format": "jpg",
        "files": [
            {
                "placement": args.placement,
                "image_url": design_url,
                "position": position
            }
        ]
    }
    
    print(f"\nTriggering mockup generation task for catalog product {args.catalog_id}...")
    task_url = f"{BASE_URL}/mockup-generator/create-task/{args.catalog_id}"
    task_res = post_with_rate_limit(task_url, mockup_payload)
    task_key = task_res.json().get("result", {}).get("task_key")
    print(f"Mockup task started. Key: {task_key}")
    
    # 4. Poll Mockup Generator
    mockup_urls = {}
    print("Waiting for mockup generation to complete...")
    for _ in range(20):
        time.sleep(3)
        poll_res = requests.get(f"{BASE_URL}/mockup-generator/task?task_key={task_key}", headers=headers, timeout=30)
        if poll_res.status_code != 200:
            poll_res = requests.get(f"{BASE_URL}/mockup-generator/lookup-task?task_key={task_key}", headers=headers, timeout=30)
            
        if poll_res.status_code == 200:
            task_data = poll_res.json().get("result", {})
            status = task_data.get("status")
            print(f"  Status: {status}")
            
            if status == "completed":
                mockups = task_data.get("mockups", [])
                for item in mockups:
                    v_list = item.get("variant_ids", [])
                    extra_mockups = item.get("extra", []) or item.get("extra_mockups", [])
                    
                    # Find back mockup or fallback to primary mockup
                    back_mockup = next((m for m in extra_mockups if args.placement in m.get("title", "").lower()), None)
                    target_url = None
                    if back_mockup:
                        target_url = back_mockup.get("url")
                    elif extra_mockups:
                        target_url = extra_mockups[0].get("url")
                    else:
                        target_url = item.get("mockup_url")
                        
                    if target_url:
                        for v_id in v_list:
                            mockup_urls[v_id] = target_url
                break
            elif status == "failed":
                print("Mockup generation failed.")
                sys.exit(1)
                
    if not mockup_urls:
        print("Error: Could not retrieve mockup URLs.")
        sys.exit(1)
        
    # 5. Fetch newly created sync variant details to get their IDs
    sync_details_res = requests.get(f"{BASE_URL}/sync/products/{sync_product_id}", headers=headers, timeout=30)
    created_sync_variants = sync_details_res.json().get("result", {}).get("sync_variants", [])
    
    # 6. Apply mockups to each variant
    primary_mockup_url = None
    for sv in created_sync_variants:
        sv_id = sv["id"]
        cat_id = sv["variant_id"]
        sv_size = sv.get("size")
        
        mockup_url = mockup_urls.get(cat_id)
        if not mockup_url:
            continue
            
        if not primary_mockup_url:
            primary_mockup_url = mockup_url
            
        print(f"  Adding mockup to Sync Variant {sv_id} (Size {sv_size})...")
        update_payload = {
            "files": [
                {
                    "type": args.placement,
                    "id": file_id
                },
                {
                    "type": "preview",
                    "url": mockup_url
                }
            ]
        }
        requests.put(f"{BASE_URL}/sync/variant/{sv_id}", headers=headers, json=update_payload, timeout=30)

    # 7. Update main product thumbnail
    if primary_mockup_url:
        print(f"\nSetting main product thumbnail to generated mockup image...")
        thumbnail_payload = {
            "sync_product": {
                "thumbnail": primary_mockup_url
            }
        }
        requests.put(f"{BASE_URL}/store/products/{sync_product_id}", headers=headers, json=thumbnail_payload, timeout=30)
        print("Product setup is complete!")

if __name__ == "__main__":
    main()
