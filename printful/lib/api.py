import requests

class PrintfulClient:
    def __init__(self, token, store_id, base_url="https://api.printful.com"):
        self.token = token
        self.store_id = store_id
        self.base_url = base_url
        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
            "X-PF-Store-ID": str(self.store_id)
        }

    def get_store_info(self):
        """Fetch store information, including name."""
        url = f"{self.base_url}/stores/{self.store_id}"
        res = requests.get(url, headers=self.headers, timeout=30)
        res.raise_for_status()
        return res.json().get("result", {})

    def list_sync_products(self):
        url = f"{self.base_url}/sync/products"
        res = requests.get(url, headers=self.headers, timeout=30)
        res.raise_for_status()
        return res.json().get("result", [])

    def get_sync_product(self, sync_product_id):
        url = f"{self.base_url}/sync/products/{sync_product_id}"
        res = requests.get(url, headers=self.headers, timeout=30)
        res.raise_for_status()
        return res.json().get("result", {})

    def update_sync_variant(self, sync_variant_id, payload):
        url = f"{self.base_url}/sync/variant/{sync_variant_id}"
        res = requests.put(url, headers=self.headers, json=payload, timeout=30)
        res.raise_for_status()
        return res.json().get("result", {})
