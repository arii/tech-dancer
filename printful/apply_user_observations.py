#!/usr/bin/env python3
import json
from pathlib import Path

JSON_PATH = Path("printful_template_agent_packet.json")

def main():
    if not JSON_PATH.exists():
        print("Error: JSON file not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for t in data["templates"]:
        tid = t["template_id"]
        af = t["agent_fields"]
        
        # 1. Product 3 (102951453) - collection and audience fix
        if tid == 102951453:
            af["collection"] = "NorCal Pride & Bay Area Collection"
            af["audience"] = "Bay Area locals, SF locals, California pride supporters, festival-goers, WCS & social dancers"
            af["notes"] = "Note: Sizing only goes up to XL. Verify if Printful offers 2XL+ options for this garment style to support size inclusivity."
            print("Updated Product 3 collection, audience, and notes.")

        # 2. Product 12 (102753916) - mockup mismatch warning
        elif tid == 102753916:
            af["notes"] = (
                "Mockup mismatch: Mockup shows the NorCal BestCal script logo on the front instead of the Rainbow War Eagle back print. "
                "Verify and re-link the correct template print files in Printful before publishing."
            )
            print("Updated Product 12 mockup mismatch notes.")

        # 3. Product 5, 6, 8 (Safety Yellow single color risk)
        elif tid in [102774868, 102774864, 102760851]:
            current_notes = af.get("notes", "")
            prefix = current_notes + " | " if current_notes else ""
            af["notes"] = prefix + "SEO Suggestion: Consider offering Black as a second color option to appeal to buyers who want the LOVE design but prefer a dark, low-visibility shirt."
            print(f"Added dark color option suggestion to Product {tid}.")

        # 4. Product 14 (102679922 - script logo visually too similar to 13)
        elif tid == 102679922:
            af["notes"] = (
                "Storefront Optimization: Both Product 13 and 14 are in Black Heather. "
                "Consider adding a Navy or Burgundy colorway to Product 14 (Script Logo) to visually distinguish the two designs on the storefront."
            )
            print("Added colorway distinction suggestion to Product 14.")

        # 5. Product 7 & 12 (Rainbow War Eagle color suggestions)
        elif tid in [102762977, 102753916]:
            current_notes = af.get("notes", "")
            prefix = current_notes + " | " if current_notes else ""
            af["notes"] = prefix + "Design expansion: The Rainbow War Eagle series has strong back print appeal. Consider adding a third colorway like Olive, Burgundy, or Rust."
            print(f"Added third colorway suggestion to Product {tid}.")

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Successfully synchronized user observations into template packet JSON.")

if __name__ == "__main__":
    main()
