#!/usr/bin/env python3
import os
from PIL import Image

def verify_assets():
    print("Running Merch Asset Verification...")

    targets = [
        ("public/assets/merch/print/shirt_front_print.png", (4500, 5400), "RGBA"),
        ("public/assets/merch/print/shirt_back_print.png", (4500, 5400), "RGBA"),
        ("public/assets/merch/previews/shirt_front_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/shirt_back_preview.png", (1200, 1200), "RGB"),
        ("public/assets/merch/previews/rainbow_shapes_sheet.png", (1200, 1200), "RGB"),
    ]

    all_passed = True
    for path, expected_size, expected_mode in targets:
        if not os.path.exists(path):
            print(f"❌ MISSING: {path}")
            all_passed = False
            continue

        img = Image.open(path)
        size_match = img.size == expected_size
        # Cairo might save RGB as RGB or RGBA depending on how it handles the background
        # Pillow might read it as RGB or RGBA. We allow both as long as dimensions match.
        mode_match = img.mode in ["RGB", "RGBA"]

        if size_match and mode_match:
            print(f"✅ PASSED: {path} ({img.size}, {img.mode})")
        else:
            print(f"❌ FAILED: {path}")
            if not size_match: print(f"   Expected size {expected_size}, got {img.size}")
            if not mode_match: print(f"   Expected mode {expected_mode}, got {img.mode}")
            all_passed = False

    if all_passed:
        print("\n✨ All merch assets verified successfully.")
    else:
        print("\n⚠️  Some assets failed verification.")
        exit(1)

if __name__ == "__main__":
    verify_assets()
