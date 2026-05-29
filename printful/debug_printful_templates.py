#!/usr/bin/env python3

import os
import sys
import json
from typing import Any, Dict, Optional

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

    if store_id is not None:
        headers["X-PF-Store-ID"] = str(store_id)

    url = f"{BASE_URL}{path}"

    print(f"\nREQUEST: {method} {url}")
    if store_id is not None:
        print(f"HEADER: X-PF-Store-ID={store_id}")
    if params:
        print(f"PARAMS: {params}")

    response = requests.request(
        method,
        url,
        headers=headers,
        params=params,
        timeout=30,
    )

    print(f"STATUS: {response.status_code}")

    try:
        payload = response.json()
    except Exception:
        print(response.text)
        return {}

    print(json.dumps(payload, indent=2)[:4000])

    return payload


def extract_items(payload: Dict[str, Any]) -> list:
    if isinstance(payload.get("data"), list):
        return payload["data"]
    if isinstance(payload.get("result"), list):
        return payload["result"]
    if isinstance(payload.get("items"), list):
        return payload["items"]
    return []


def list_stores() -> list:
    payload = request_json("GET", "/v2/stores", params={"limit": 100})
    return extract_items(payload)


def try_token_scopes() -> None:
    print("\n" + "=" * 80)
    print("TRY 0: token scopes")
    print("=" * 80)

    request_json("GET", "/oauth/scopes")


def try_product_templates_account_level() -> None:
    print("\n" + "=" * 80)
    print("TRY 1: account-level /product-templates")
    print("=" * 80)

    payload = request_json(
        "GET",
        "/product-templates",
        params={"limit": 100, "offset": 0},
    )

    items = extract_items(payload)
    print(f"\nExtracted template count: {len(items)}")


def try_product_templates_per_store(stores: list) -> None:
    print("\n" + "=" * 80)
    print("TRY 2: store-scoped /product-templates")
    print("=" * 80)

    for store in stores:
        store_id = int(store["id"])
        store_name = store.get("name", "(unnamed)")

        print("\n" + "-" * 80)
        print(f"Store: {store_name} | id={store_id}")
        print("-" * 80)

        payload = request_json(
            "GET",
            "/product-templates",
            store_id=store_id,
            params={"limit": 100, "offset": 0},
        )

        items = extract_items(payload)
        print(f"\nExtracted template count for {store_name}: {len(items)}")


def try_sync_products_per_store(stores: list) -> None:
    print("\n" + "=" * 80)
    print("TRY 3: store sync products")
    print("=" * 80)

    for store in stores:
        store_id = int(store["id"])
        store_name = store.get("name", "(unnamed)")

        print("\n" + "-" * 80)
        print(f"Store: {store_name} | id={store_id}")
        print("-" * 80)

        payload = request_json(
            "GET",
            "/sync/products",
            store_id=store_id,
            params={"limit": 100, "offset": 0},
        )

        items = extract_items(payload)
        print(f"\nExtracted sync product count for {store_name}: {len(items)}")

        for product in items:
            print(f"- {product.get('name')}")
            print(f"  sync_product_id: {product.get('id')}")
            print(f"  external_id: {product.get('external_id')}")
            print(f"  thumbnail: {product.get('thumbnail_url') or product.get('thumbnail')}")


def main() -> None:
    try_token_scopes()

    stores = list_stores()

    print("\n" + "=" * 80)
    print(f"FOUND STORES: {len(stores)}")
    print("=" * 80)

    for store in stores:
        print(f"- {store.get('name')} | id={store.get('id')} | type={store.get('type')}")

    try_product_templates_account_level()
    try_product_templates_per_store(stores)
    try_sync_products_per_store(stores)


if __name__ == "__main__":
    main()
