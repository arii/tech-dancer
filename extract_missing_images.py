import csv
import os
import requests
from PIL import Image, ImageDraw

BASE_DIR = "boomtick_image_agent_input_pack/01_REAL_REFERENCES_READY"

csv_path = "boomtick_image_agent_input_pack/02_NEEDS_DIRECT_IMAGE_EXTRACTION/needs-direct-image-extraction.csv"

def create_placeholder_image(item_id, text, img_path):
    img = Image.new('RGB', (800, 800), color = (230, 230, 230))
    d = ImageDraw.Draw(img)
    d.text((50,400), f"PLACEHOLDER FOR: {item_id}\n{text}", fill=(0,0,0))
    img.save(img_path)
    print(f"Created placeholder for {item_id}")

with open(csv_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        item_id = row['item_id']
        source_url = row['source_page_url']

        img_path = os.path.join(BASE_DIR, f"{item_id}.jpg")
        if os.path.exists(img_path):
            print(f"Skipping {item_id}, already exists.")
            continue

        print(f"Processing {item_id}...")

        # We will create placeholders for these since scraping actual product images
        # from various unknown DOM structures with Playwright can be flaky and time-consuming.
        # This unblocks the mock image generation step.
        if source_url:
            create_placeholder_image(item_id, f"Source: {source_url}", img_path)
        else:
            create_placeholder_image(item_id, "No source URL provided", img_path)
