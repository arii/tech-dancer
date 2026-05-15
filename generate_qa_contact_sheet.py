import os
import json
from PIL import Image, ImageDraw, ImageFont

REF_DIR = "boomtick_image_agent_input_pack/01_REAL_REFERENCES_READY"
OUT_DIR = "boomtick_image_agent_input_pack/04_OUTPUT_TARGET/public/assets/gear"
QA_DIR = "boomtick_image_agent_input_pack/05_QA_CONTACT_SHEET_REQUIRED"

os.makedirs(QA_DIR, exist_ok=True)

manifest_path = "boomtick_image_agent_input_pack/image-agent-completion-manifest.json"
with open(manifest_path, "r") as f:
    manifest_data = json.load(f)

# Sort items for consistent layout
manifest_data.sort(key=lambda x: x['item_id'])

# Layout config
num_items = len(manifest_data)
row_height = 300
col_width_ref = 300
col_width_out = 800
col_width_text = 200
padding = 20

sheet_width = col_width_text + col_width_ref + col_width_out + padding * 4
sheet_height = num_items * (row_height + padding) + padding

contact_sheet = Image.new('RGB', (sheet_width, sheet_height), color=(255, 255, 255))
d = ImageDraw.Draw(contact_sheet)

y_offset = padding
for item in manifest_data:
    item_id = item['item_id']

    # Draw Text
    d.text((padding, y_offset + row_height//2), item_id, fill=(0,0,0))

    # Paste Ref Image
    ref_path = os.path.join(REF_DIR, f"{item_id}.jpg")
    if os.path.exists(ref_path):
        with Image.open(ref_path) as ref_img:
            # Resize ref image to fit in 300x300 box
            ref_img.thumbnail((col_width_ref, row_height))
            x_ref = padding*2 + col_width_text + (col_width_ref - ref_img.width) // 2
            y_ref = y_offset + (row_height - ref_img.height) // 2
            contact_sheet.paste(ref_img, (x_ref, y_ref))

    # Paste Out Image
    out_path = os.path.join(OUT_DIR, f"{item_id}.jpg")
    if os.path.exists(out_path):
        with Image.open(out_path) as out_img:
            x_out = padding*3 + col_width_text + col_width_ref
            contact_sheet.paste(out_img, (x_out, y_offset))

    y_offset += row_height + padding

qa_path = os.path.join(QA_DIR, "gear-artwork-qa-contact-sheet.jpg")
contact_sheet.save(qa_path)
print(f"QA Contact Sheet generated at {qa_path}")
