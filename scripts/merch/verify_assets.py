import os
from PIL import Image

def verify_png(filepath, expected_size, expected_mode="RGBA"):
    if not os.path.exists(filepath):
        print(f"❌ MISSING: {filepath}")
        return False

    img = Image.open(filepath)
    if img.size != expected_size:
        print(f"❌ SIZE MISMATCH: {filepath} (Expected {expected_size}, got {img.size})")
        return False

    if img.mode != expected_mode:
        # Previews might be RGB if background was painted
        if expected_mode == "RGBA" and img.mode == "RGB":
            print(f"❌ MODE MISMATCH: {filepath} (Expected RGBA, got RGB)")
            return False
        # Allow RGBA for previews even if RGB expected

    print(f"✅ PASSED: {filepath} ({img.size}, {img.mode})")
    return True

if __name__ == "__main__":
    print("Running Merch Asset Verification...")

    assets_to_verify = [
        # Print Assets (Transparent RGBA)
        ("public/assets/merch/print/shirt_front_print.png", (4500, 5400), "RGBA"),
        ("public/assets/merch/print/shirt_back_lead_print.png", (4500, 5400), "RGBA"),
        ("public/assets/merch/print/shirt_back_follow_print.png", (4500, 5400), "RGBA"),
        ("public/assets/merch/print/shirt_back_all_print.png", (4500, 5400), "RGBA"),

        # Previews (Painted background, usually RGB or RGBA)
        ("public/assets/merch/previews/shirt_front_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/shirt_back_lead_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/shirt_back_follow_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/shirt_back_all_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/rainbow_shapes_sheet.png", (1200, 1200), "RGB"),
    ]

    all_passed = True
    for path, size, mode in assets_to_verify:
        if not verify_png(path, size, mode):
            all_passed = False

    if all_passed:
        print("\n✨ All merch assets verified successfully.")
    else:
        print("\n⚠️ Some merch assets failed verification.")
        exit(1)
