import os
import sys
import json
import argparse
from datetime import datetime

# Add the current directory to sys.path so we can import from lib
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from lib.api import PrintfulClient
from lib.config_validation import validate_config
from lib.planning import build_update_plan
from lib.logging import save_audit_log

def main():
    parser = argparse.ArgumentParser(description="Batch update Printful sync variants.")
    parser.add_argument("--dry-run", action="store_true", default=True, help="Only print planned changes (default)")
    parser.add_argument("--apply", action="store_false", dest="dry_run", help="Actually apply changes to the store")
    parser.add_argument("--store-id", help="Printful Store ID")
    parser.add_argument("--confirm-store", help="Confirm store name or ID to allow --apply")
    parser.add_argument("--product-id", action="append", help="Limit to specific sync product ID(s)")
    parser.add_argument("--variant-id", action="append", help="Limit to specific sync variant ID(s)")
    parser.add_argument("--color", action="append", help="Limit to specific color(s)")
    parser.add_argument("--max-variants", type=int, help="Limit total number of variants to update")
    parser.add_argument("--config", default="printful/config/product_metadata_map.json", help="Path to config file")
    parser.add_argument("--catalog-specs", default="printful/config/catalog_specifications.json", help="Path to catalog specifications")

    args = parser.parse_args()

    # Environment fallbacks
    token = os.getenv("PRINTFUL_TOKEN")
    store_id = args.store_id or os.getenv("PRINTFUL_STORE_ID")

    if not token:
        print("ERROR: PRINTFUL_TOKEN is not set.")
        sys.exit(1)

    if not store_id:
        print("ERROR: --store-id or PRINTFUL_STORE_ID is required.")
        sys.exit(1)

    client = PrintfulClient(token, store_id)

    # Fetch store info to get name and for verification
    store_name = "Unknown"
    try:
        store_info = client.get_store_info()
        store_name = store_info.get("name", "Unknown")
    except Exception as e:
        print(f"WARNING: Could not fetch store info: {e}")

    # Safety checks for --apply
    if not args.dry_run:
        if not args.confirm_store:
            print("ERROR: --apply requires --confirm-store <name-or-id>.")
            sys.exit(1)
        # Check against both ID and name
        if args.confirm_store != str(store_id) and args.confirm_store.lower() != store_name.lower():
            print(f"ERROR: --confirm-store '{args.confirm_store}' does not match store ID '{store_id}' or name '{store_name}'.")
            sys.exit(1)
        if not args.product_id and not args.variant_id:
            print("ERROR: --apply requires --product-id or --variant-id. Refusing to update all store variants.")
            sys.exit(1)

    # Load and validate config
    try:
        with open(args.config, "r") as f:
            config = json.load(f)
        validate_config(config)
    except Exception as e:
        print(f"ERROR: Config validation failed: {e}")
        sys.exit(1)

    # Load catalog specs if available
    catalog_specs = None
    if os.path.exists(args.catalog_specs):
        try:
            with open(args.catalog_specs, "r") as f:
                catalog_specs = json.load(f)
        except Exception as e:
            print(f"WARNING: Could not load catalog specs: {e}")

    print(f"FETCHING data for store {store_name} ({store_id})...")
    try:
        if args.product_id:
            raw_products = []
            for pid in args.product_id:
                raw_products.append(client.get_sync_product(pid))
        else:
            raw_products_list = client.list_sync_products()
            raw_products = []
            for p in raw_products_list:
                raw_products.append(client.get_sync_product(p["id"]))
    except Exception as e:
        print(f"ERROR: Failed to fetch data from Printful: {e}")
        sys.exit(1)

    # 2. Build plan
    try:
        plan = build_update_plan(
            raw_products,
            config,
            product_ids=args.product_id,
            variant_ids=args.variant_id,
            colors=args.color,
            max_variants=args.max_variants,
            catalog_specs=catalog_specs
        )
    except ValueError as e:
        print(f"ERROR: Planning failed: {e}")
        sys.exit(1)

    # 3. Print plan
    print("\n" + "="*40)
    if args.dry_run:
        print("DRY RUN — no live changes will be made")
    else:
        print("LIVE APPLY MODE")
    print("="*40)
    print(f"Store: {store_name} / {store_id}")
    print(f"Products selected: {plan['products_selected']}")
    print(f"Variants selected: {plan['variants_selected']}")
    
    for prod_plan in plan["updates"]:
        print(f"\nProduct: {prod_plan['product_name']}")
        print(f"Sync product ID: {prod_plan['product_id']}")
        if prod_plan['allowed_colors']:
            print(f"Allowed colors: {', '.join(prod_plan['allowed_colors'])}")
        for v in prod_plan["variants"]:
            print(f"  Variant {v['variant_id']}")
            print(f"    Color: {v['color']}, Size: {v['size']}")
            print(f"    Current price: {v['current_price']}")
            print(f"    New price: {v['new_price']}")
            print(f"    Files: {', '.join([f'{f['type']}: {f['id']}' for f in v['files']])}")

    print("\nSummary:")
    print(f"  Products scanned: {plan['products_scanned']}")
    print(f"  Products selected: {plan['products_selected']}")
    print(f"  Variants selected: {plan['variants_selected']}")
    print(f"  Variants skipped by color: {plan['variants_skipped_by_color']}")
    print(f"  Variants skipped by missing config: {plan['variants_skipped_by_missing_config']}")

    if args.dry_run:
        print("  API writes: 0")
        return

    # 4. Apply changes
    print("\nApplying updates...")
    audit_log = {
        "timestamp": datetime.now().isoformat(),
        "store_id": store_id,
        "store_name": store_name,
        "dry_run": False,
        "plan_summary": {
            "products_selected": plan['products_selected'],
            "variants_selected": plan['variants_selected']
        },
        "updates_attempted": [],
        "updates_succeeded": [],
        "updates_failed": []
    }

    for prod_plan in plan["updates"]:
        for v in prod_plan["variants"]:
            v_id = v["variant_id"]
            payload = {
                "retail_price": v["new_price"],
                "files": v["files"]
            }
            audit_entry = {"variant_id": v_id, "payload": payload}
            audit_log["updates_attempted"].append(audit_entry)
            
            try:
                print(f"  Updating variant {v_id}...", end=" ", flush=True)
                client.update_sync_variant(v_id, payload)
                print("OK")
                audit_log["updates_succeeded"].append(v_id)
            except Exception as e:
                print(f"FAILED: {e}")
                audit_log["updates_failed"].append({"variant_id": v_id, "error": str(e)})

    log_path = save_audit_log(audit_log)
    print(f"\nAudit log saved to: {log_path}")

if __name__ == "__main__":
    main()
