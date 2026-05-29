import os
import sys
import time
import requests

PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"
STORE_ID = 18249113

if not PRINTFUL_TOKEN:
    print("ERROR: PRINTFUL_TOKEN is not set.")
    sys.exit(1)

headers = {
    "Authorization": f"Bearer {PRINTFUL_TOKEN}",
    "Content-Type": "application/json",
    "X-PF-Store-ID": str(STORE_ID)
}

def main():
    print("Polling store for new product (waiting up to 60 seconds)...")
    for i in range(12):
        res = requests.get(f"{BASE_URL}/sync/products", headers=headers, timeout=30)
        if res.status_code == 200:
            products = res.json().get("result", [])
            names = [p["name"] for p in products]
            print(f"Current products in store: {names}")
            for p in products:
                # If we see a product containing "new_template" or a new product name
                if "new_template" in p["name"].lower() or p["id"] != 435430635:
                    print(f"\nFOUND IT! Product: {p['name']} | ID: {p['id']}")

                    # Fetch variant details
                    d_res = requests.get(f"{BASE_URL}/sync/products/{p['id']}", headers=headers, timeout=30)
                    if d_res.status_code == 200:
                        detail = d_res.json().get("result", {})
                        variants = detail.get("sync_variants", [])
                        print(f"Found {len(variants)} sync variants.")
                        if variants:
                            print(f"Sample variant ID: {variants[0]['id']}")
                    return
        else:
            print("Error polling:", res.text)
        time.sleep(5)
    print("\nTimeout: Product not found yet. Please make sure to add the template to the store in the Printful Dashboard.")

if __name__ == "__main__":
    main()
