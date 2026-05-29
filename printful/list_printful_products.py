#!/usr/bin/env python3

import os
import sys
from typing import Any, Dict, List, Optional

import requests


PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def request_json(
    method: str,
    path: str,
    *,
    store_id: Optional[int] = None,
    params: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    if not PRINTFUL_TOKEN:
        fail("PRINTFUL_TOKEN is not set. Run: export PRINTFUL_TOKEN='your_token_here'")

    headers = {
        "Authorization": f"Bearer {PRINTFUL_TOKEN}",
        "Content-Type": "application/json",
    }

    # Only use this for store-specific endpoints like /sync/products.
    # Do NOT use this for account-level product templates.
    if store_id is not None:
        headers["X-PF-Store-ID"] = str(store_id)

    url = f"{BASE_URL}{path}"

    response = requests.request(
        method,
        url,
        headers=headers,
        params=params,
        timeout=30,
    )

    if response.status_code == 401:
        fail("Printful returned 401 Unauthorized. Check PRINTFUL_TOKEN permissions/scopes.")

    if response.status_code >= 400:
        fail(f"{method} {url} failed: {response.status_code}\n{response.text}")

    return response.json()


def get_items(payload: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Printful v1 usually returns: { "result": [...] }
    Printful v2 usually returns: { "data": [...] }
    """
    if isinstance(payload.get("data"), list):
        return payload["data"]

    if isinstance(payload.get("result"), list):
        return payload["result"]

    return []


def list_stores() -> List[Dict[str, Any]]:
    payload = request_json(
        "GET",
        "/v2/stores",
        params={"limit": 100},
    )
    return get_items(payload)


def list_sync_products(store_id: int) -> List[Dict[str, Any]]:
    """
    Store-specific products that are actually synced/listed in a store.
    """
    products: List[Dict[str, Any]] = []
    offset = 0
    limit = 100

    while True:
        payload = request_json(
            "GET",
            "/sync/products",
            store_id=store_id,
            params={"limit": limit, "offset": offset},
        )

        page = get_items(payload)
        products.extend(page)

        if len(page) < limit:
            break

        offset += limit

    return products


def list_product_templates() -> List[Dict[str, Any]]:
    """
    Account-level product templates from the Printful dashboard.

    Important:
    Do not pass X-PF-Store-ID here. Product templates in the dashboard
    may not be tied to one specific store.
    """
    templates: List[Dict[str, Any]] = []
    offset = 0
    limit = 100

    while True:
        payload = request_json(
            "GET",
            "/product-templates",
            params={"limit": limit, "offset": offset},
        )

        page = get_items(payload)
        templates.extend(page)

        if len(page) < limit:
            break

        offset += limit

    return templates


def print_store_products(store: Dict[str, Any]) -> None:
    store_id = int(store["id"])
    store_name = store.get("name", "(unnamed)")
    store_type = store.get("type", "")

    print("=" * 80)
    print(f"Store: {store_name} | id={store_id} | type={store_type}")
    print("=" * 80)

    products = list_sync_products(store_id)
    print(f"\nSync products: {len(products)}\n")

    for product in products:
        print(f"- {product.get('name')}")
        print(f"  sync_product_id: {product.get('id')}")
        print(f"  external_id: {product.get('external_id')}")
        print(f"  thumbnail: {product.get('thumbnail_url') or product.get('thumbnail')}")
        print()


def print_product_templates() -> None:
    print("=" * 80)
    print("Account-level product templates")
    print("=" * 80)

    templates = list_product_templates()
    print(f"\nProduct templates: {len(templates)}\n")

    for template in templates:
        print(f"- {template.get('name')}")
        print(f"  product_template_id: {template.get('id')}")
        print(f"  product_id: {template.get('product_id')}")
        print(f"  variant_id: {template.get('variant_id')}")
        print(
            "  thumbnail: "
            f"{template.get('thumbnail_url') or template.get('image_url') or template.get('thumbnail')}"
        )
        print()


def main() -> None:
    stores = list_stores()

    if not stores:
        fail("No Printful stores returned for this token.")

    print(f"Found {len(stores)} stores:\n")

    for store in stores:
        print_store_products(store)

    print_product_templates()


if __name__ == "__main__":
    main()
