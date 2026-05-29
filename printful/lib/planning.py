try:
    from lib.config_validation import validate_placement_against_catalog
except ImportError:
    from .config_validation import validate_placement_against_catalog

def build_update_plan(products, config, product_ids=None, variant_ids=None, colors=None, max_variants=None, catalog_specs=None):
    """
    Builds a list of planned updates based on products and config.
    """
    plan = {
        "products_scanned": len(products),
        "products_selected": 0,
        "variants_selected": 0,
        "variants_skipped_by_color": 0,
        "variants_skipped_by_missing_config": 0,
        "updates": []
    }

    for full_prod in products:
        sync_prod = full_prod.get("sync_product", {})
        sync_variants = full_prod.get("sync_variants", [])

        prod_id = str(sync_prod.get("id"))
        catalog_product_id = sync_prod.get("product_id") # This is the catalog product ID

        if product_ids and prod_id not in product_ids:
            continue

        metadata = config.get(prod_id)
        if not metadata:
            plan["variants_skipped_by_missing_config"] += len(sync_variants)
            continue

        plan["products_selected"] += 1

        product_updates = {
            "product_id": prod_id,
            "product_name": sync_prod.get("name"),
            "allowed_colors": metadata.get("allowed_colors", []),
            "variants": []
        }

        # Pre-validate placements for this product
        placements_to_use = []
        if "placements" in metadata:
            placements_to_use = metadata["placements"]
        elif "design_file_id" in metadata and "placement" in metadata:
            placements_to_use = [{"type": metadata["placement"], "id": metadata["design_file_id"]}]

        for p in placements_to_use:
            p_type = p.get("type") or p.get("placement") # handle both 'type' and 'placement' keys
            if catalog_specs and catalog_product_id:
                if not validate_placement_against_catalog(catalog_product_id, p_type, catalog_specs):
                    raise ValueError(f"placement \"{p_type}\" is not listed for product {catalog_product_id} in catalog_specifications.json.")

        for v in sync_variants:
            v_id = str(v["id"])
            if variant_ids and v_id not in variant_ids:
                continue

            v_color = v.get("color")
            if colors and v_color not in colors:
                plan["variants_skipped_by_color"] += 1
                continue

            allowed_colors = metadata.get("allowed_colors")
            if allowed_colors and v_color not in allowed_colors:
                plan["variants_skipped_by_color"] += 1
                continue

            if max_variants and plan["variants_selected"] >= max_variants:
                break

            update = {
                "variant_id": v_id,
                "color": v_color,
                "size": v.get("size"),
                "current_price": v.get("retail_price"),
                "new_price": metadata.get("retail_price"),
                "files": []
            }

            for p in placements_to_use:
                 update["files"].append({
                    "type": p.get("type") or p.get("placement"),
                    "id": p.get("file_id") or p.get("id")
                })

            product_updates["variants"].append(update)
            plan["variants_selected"] += 1

        if product_updates["variants"]:
            plan["updates"].append(product_updates)

    return plan
