import cv2
import numpy as np
from PIL import Image, ImageOps, ImageEnhance, ImageChops, ImageDraw
import os
import json

REF_DIR = "boomtick_image_agent_input_pack/01_REAL_REFERENCES_READY"
OUT_DIR = "boomtick_image_agent_input_pack/04_OUTPUT_TARGET/public/assets/gear"

os.makedirs(OUT_DIR, exist_ok=True)
manifest_data = []

def generate_sketch(img_path, out_path):
    img = cv2.imread(img_path)
    if img is None:
        raise Exception(f"Could not load image at {img_path}")

    h, w = img.shape[:2]
    scale = 240.0 / h
    new_w, new_h = int(w * scale), int(h * scale)

    if new_w > 600:
        scale = 600.0 / w
        new_w, new_h = int(w * scale), int(h * scale)

    img_resized = cv2.resize(img, (new_w, new_h))

    gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    gray_inv = cv2.bitwise_not(gray)
    blurred = cv2.GaussianBlur(gray_inv, (21, 21), 0)
    sketch = cv2.divide(gray, 255 - blurred, scale=256)

    sketch_pil = Image.fromarray(sketch).convert("RGB")
    enhancer = ImageEnhance.Contrast(sketch_pil)
    sketch_pil = enhancer.enhance(1.5)

    color_pil = Image.fromarray(cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB))
    colored_sketch = ImageChops.multiply(sketch_pil, color_pil)

    brightener = ImageEnhance.Brightness(colored_sketch)
    colored_sketch = brightener.enhance(1.2)

    paper_np = np.ones((300, 800, 3), dtype=np.uint8) * 240
    noise = np.random.normal(0, 5, (300, 800, 3)).astype(np.int8)
    paper_np = np.clip(paper_np.astype(np.int16) + noise, 0, 255).astype(np.uint8)
    paper = Image.fromarray(paper_np)

    offset = ((800 - new_w) // 2, (300 - new_h) // 2)

    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.dilate(thresh, kernel, iterations=1)
    mask = cv2.GaussianBlur(mask, (5,5), 0)
    mask_pil = Image.fromarray(mask).convert("L")

    shadow_img = Image.new('RGBA', (800, 300), (0,0,0,0))
    d = ImageDraw.Draw(shadow_img)

    # Only draw shadow if there's actually an object (mask has content)
    if np.sum(mask) > 0:
        shadow_x = offset[0] + 20
        shadow_y = offset[1] + new_h - 10
        shadow_w = new_w - 40
        shadow_h = 20

        for i in range(shadow_y, shadow_y + shadow_h, 3):
            start_x = shadow_x + np.random.randint(-10, 10)
            end_x = shadow_x + shadow_w + np.random.randint(-10, 10)
            d.line([(start_x, i), (end_x, i)], fill=(150, 150, 160, 100), width=1)

    paper.paste(shadow_img, (0,0), shadow_img)
    paper.paste(colored_sketch, offset, mask_pil)
    paper.save(out_path)

items_to_process = []
for filename in os.listdir(REF_DIR):
    if filename.endswith(".jpg"):
        items_to_process.append(filename.replace(".jpg", ""))

for item_id in items_to_process:
    ref_path = os.path.join(REF_DIR, f"{item_id}.jpg")
    out_path = os.path.join(OUT_DIR, f"{item_id}.jpg")

    print(f"Generating artwork for {item_id}...")
    try:
        generate_sketch(ref_path, out_path)
        manifest_data.append({
            "item_id": item_id,
            "reference_image": f"references/{item_id}.jpg",
            "final_output": f"public/assets/gear/{item_id}.jpg",
            "status": "complete",
            "qa_notes": "Algorithmic sketch styling applied (OpenCV contouring, shadow hatching)."
        })
    except Exception as e:
        print(f"Failed to generate for {item_id}: {e}")

with open("boomtick_image_agent_input_pack/image-agent-completion-manifest.json", "w") as f:
    json.dump(manifest_data, f, indent=2)

print("Batch generation complete.")
