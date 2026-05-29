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

    # 1. Update Product 6 (102774864) notes
    t6 = next(t for t in data["templates"] if t["template_id"] == 102774864)
    t6["agent_fields"]["notes"] = (
        "Mockup mismatch: The template mockup currently displays the 'Follow' design. "
        "Remember to swap the mockup image in Printful to the actual 'Switch' design when publishing."
    )
    print("Updated Product 6 notes.")

    # 2. Update Product 12 (102753916) description opener
    t12 = next(t for t in data["templates"] if t["template_id"] == 102753916)
    desc = t12["agent_fields"]["final_description"]
    
    # Replace the opener "Same bold rainbow war eagle back print..." with "Deep navy, bold rainbow. The Rainbow War Eagle back print hits even harder against a rich French Navy base..."
    old_opener = "Same bold rainbow war eagle back print, now in a deep French Navy that makes the rainbow colors pop even harder."
    new_description = desc.replace(
        "Same bold rainbow war eagle back print, now in a deep French Navy that makes the rainbow colors pop even harder.",
        "Deep navy, bold rainbow. The Rainbow War Eagle back print hits even harder against a rich French Navy base."
    )
    
    # Fallback if case mismatch
    if new_description == desc:
        # Try a substring replace or direct rewrite
        new_description = (
            "Deep navy, bold rainbow. The Rainbow War Eagle back print hits even harder against a rich French Navy base. "
            "The contrast between the rich navy base and the vibrant rainbow design gives this one a more versatile, wearable feel - "
            "pride event ready but equally at home at a rooftop party or a night out in the Castro.\n\n"
            "Organic oversized construction. Roomy through the shoulders for real movement on a dance floor. A conversation starter wherever it goes.\n\n"
            "Perfect for: pride events, queer dance nights, partner dance socials, bachata and salsa festivals, West Coast Swing events, Lindy Hop exchanges, fusion socials, or just living your most colorful life."
        )
        
    t12["agent_fields"]["final_description"] = new_description
    print("Updated Product 12 description.")

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Successfully patched JSON with final tweaks.")

if __name__ == "__main__":
    main()
