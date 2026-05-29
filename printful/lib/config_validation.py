def validate_config(config, catalog_specs=None):
    """
    Validates the product metadata configuration.
    """
    if not isinstance(config, dict):
        raise ValueError("Config must be a dictionary")

    for prod_id, metadata in config.items():
        if prod_id == "SYNC_PRODUCT_ID_PLACEHOLDER":
            continue

        if not isinstance(metadata, dict):
            raise ValueError(f"Metadata for product {prod_id} must be a dictionary")

        retail_price = metadata.get("retail_price")
        if not retail_price:
            raise ValueError(f"Missing retail_price for product {prod_id}")
        try:
            float(retail_price)
        except ValueError:
            raise ValueError(f"Invalid retail_price '{retail_price}' for product {prod_id}")

        placements = metadata.get("placements")
        if not placements:
            if "design_file_id" in metadata and "placement" in metadata:
                 # Support old format but internally it should be treated as a single placement list
                 placements = [{"type": metadata["placement"], "file_id": metadata["design_file_id"]}]
            else:
                raise ValueError(f"Missing placements for product {prod_id}")

        if not isinstance(placements, list) or len(placements) == 0:
            raise ValueError(f"Placements for product {prod_id} must be a non-empty list")

        for p in placements:
            p_type = p.get("type")
            if not p_type:
                raise ValueError(f"Missing type in placement for product {prod_id}")
            if "file_id" not in p:
                raise ValueError(f"Missing file_id in placement for product {prod_id}")
            if not isinstance(p["file_id"], (int, str)):
                raise ValueError(f"Invalid file_id in placement for product {prod_id}")

            # Optional catalog validation
            if catalog_specs:
                # We need the catalog product ID (which is usually part of sync_product detail, not the config prod_id)
                # But sometimes the config prod_id IS the catalog product ID if they are using it that way.
                # Actually, the user asked: ERROR: placement "front_large" is not listed for product 665 in catalog_specifications.json.
                # Product 665 is a catalog product ID in catalog_specifications.json.
                # However, the config key is a SYNC product ID.
                # To do this validation correctly, we either need the catalog product ID in config or we skip it here
                # and do it in the planning phase where we HAVE the sync_product detail (which contains the catalog product ID).
                pass

        allowed_colors = metadata.get("allowed_colors")
        if allowed_colors is not None:
            if not isinstance(allowed_colors, list) or len(allowed_colors) == 0:
                raise ValueError(f"allowed_colors for product {prod_id} must be a non-empty list if present")

    return True

def validate_placement_against_catalog(catalog_product_id, placement_type, catalog_specs):
    """
    Validates if a placement type is supported for a catalog product.
    """
    if not catalog_specs:
        return True

    prod_id_str = str(catalog_product_id)
    if prod_id_str not in catalog_specs:
        # If product not in catalog specs, we can't validate, so we skip
        return True

    valid_placements = [p["placement"] for p in catalog_specs[prod_id_str].get("placements", [])]
    if placement_type not in valid_placements:
        return False

    return True
