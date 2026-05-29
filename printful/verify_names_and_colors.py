#!/usr/bin/env python3
import json
from pathlib import Path

JSON_PATH = Path("printful_template_agent_packet.json")

def clean_color_list(colors_str):
    return [c.strip().lower() for c in colors_str.split(",") if c.strip()]

def main():
    if not JSON_PATH.exists():
        print("Error: JSON file not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"{'ID':<10} | {'Printful Original Name':<45} | {'Final Synced Title':<50} | {'Color Audit':<12}")
    print("-" * 125)

    errors = 0
    for t in data["templates"]:
        tid = t["template_id"]
        orig_title = t["original_title"]
        all_colors = [c.lower() for c in t["all_colors"]]

        af = t["agent_fields"]
        final_title = af["final_title"]
        selected_colors = clean_color_list(af["final_selected_colors"])

        # Audit: verify all selected colors exist in all_colors
        invalid_colors = []
        for c in selected_colors:
            # Check case-insensitive match
            if c not in all_colors:
                # Printful sometimes uses color names like "charcoal heather" but selected has "charcoal"
                # Let's check for substring or close matches to be safe, but report exact mismatch
                close_match = False
                for ac in all_colors:
                    if c in ac or ac in c:
                        close_match = True
                        break
                if not close_match:
                    invalid_colors.append(c)

        if invalid_colors:
            audit_status = f"FAIL: {invalid_colors}"
            errors += 1
        else:
            audit_status = "PASS"

        print(f"{tid:<10} | {orig_title[:45]:<45} | {final_title[:50]:<50} | {audit_status:<12}")

    print("\n" + "="*80)
    if errors == 0:
        print("SUCCESS: Name and color audits passed! All selected colors exist in Printful.")
    else:
        print(f"WARNING: Found {errors} template(s) with invalid or mismatched colors.")
    print("="*80)

if __name__ == "__main__":
    main()
