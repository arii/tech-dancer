import os
import requests

BASE_DIR = "boomtick_image_agent_input_pack/01_REAL_REFERENCES_READY"

for filename in os.listdir(BASE_DIR):
    if filename.endswith(".reference-url.txt"):
        item_id = filename.replace(".reference-url.txt", "")
        img_path = os.path.join(BASE_DIR, f"{item_id}.jpg")

        if os.path.exists(img_path):
            print(f"Skipping {item_id}, already exists.")
            continue

        url = None
        with open(os.path.join(BASE_DIR, filename), "r") as f:
            for line in f:
                if line.startswith("DIRECT IMAGE URL:"):
                    url = line.split("DIRECT IMAGE URL:")[1].strip()
                    break

        if url:
            print(f"Downloading {item_id} from {url}")
            try:
                headers = {'User-Agent': 'Mozilla/5.0'}
                r = requests.get(url, headers=headers, timeout=10)
                if r.status_code == 200:
                    with open(img_path, "wb") as img_f:
                        img_f.write(r.content)
                    print(f"Saved {item_id}.jpg")
                else:
                    print(f"Failed to download {item_id}: Status {r.status_code}")
            except Exception as e:
                print(f"Error downloading {item_id}: {e}")
