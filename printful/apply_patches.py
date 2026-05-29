#!/usr/bin/env python3
import json
from pathlib import Path

JSON_PATH = Path("printful_template_agent_packet.json")

# Manually extract the exact copy patches from the new review.md to ensure absolute correctness:
patches = {
    102861895: {
        "final_title": "Rainbow Phoenix - Pride Back Print Organic Oversized Tee (Black)",
        "final_short_description": "A soaring rainbow statement for the back of the room. Bold, oversized, and unapologetically proud.",
        "final_description": (
            "The front is clean. The back is everything. This oversized organic tee features a bold, soaring "
            "rainbow phoenix back print on deep black - a statement piece built for people who don't need to "
            "say a word to fill a room.\n\n"
            "The boxy, high-neck oversized silhouette is intentional streetwear - wear it loose over a sports bra "
            "at a festival, throw it on after a late-night dance social, or pair it with anything that can handle "
            "a little competition from the back print. Organic cotton construction keeps it soft and breathable "
            "through long days and longer nights.\n\n"
            "Made for: SF Pride, queer spaces and community events, LGBTQ+ festival season, inclusive social "
            "dance communities (West Coast Swing, Lindy Hop, salsa, bachata, fusion, blues), and everyday wear "
            "for people who don't do invisible."
        ),
        "seo_keywords": (
            "rainbow phoenix shirt, pride back print tee, LGBTQ pride oversized shirt, rainbow bird pride shirt, "
            "organic pride tee black, queer fashion oversized, SF Pride shirt, pride festival outfit, rainbow graphic "
            "back print, gender neutral pride shirt, inclusive community tee, oversized organic black tee, queer "
            "streetwear, pride apparel back print, dance community pride shirt"
        ),
        "add_to_boomtick_store": "maybe",
        "priority": "low",
        "collection": "Rainbow Pride Collection",
        "audience": "LGBTQ+ pride community, festival-goers, inclusive community, streetwear fashion"
    },
    102774864: {
        "final_title": "Ask Me to Switch - LOVE Neon Performance Tee | Partner Dance Shirt",
        "final_short_description": "Both roles. No rules. The floor is yours from every angle.",
        "final_description": (
            "Switchers are the most versatile dancers in the room - fluid, adaptable, and endlessly fun to "
            "share a floor with. This tee is for the dancers who lead one song and follow the next, who trade "
            "roles mid-dance, who never felt like one lane was the whole story.\n\n"
            "Switching isn't indecision. It's mastery. Whether you're a seasoned switcher in the West Coast Swing "
            "community, a fusion dancer who reads the connection and responds, or a Lindy Hopper who learned "
            "both sides because why wouldn't you - this shirt is your announcement.\n\n"
            "Performance fabric keeps you moving through every song. Safety Yellow keeps you visible from across "
            "the room. The rainbow LOVE graphic signals you're in a space where roles belong to the dancer, not "
            "to assumptions - queer-friendly, body-positive, and open to everyone on the floor.\n\n"
            "For switchers in: West Coast Swing, Lindy Hop, salsa, bachata, Argentine tango, fusion, blues, "
            "kizomba, zouk, ballroom, and every dance where connection matters more than convention."
        ),
        "seo_keywords": (
            "switch dance shirt, dance switcher shirt, partner dance shirt, lead follow switch shirt, "
            "West Coast Swing switch shirt, social dance apparel, LGBTQ dance shirt, gender neutral dance shirt, "
            "dance role shirt, neon dance shirt, queer dance community, fusion dance shirt, Lindy Hop switch shirt, "
            "salsa dance shirt, bachata apparel, ask me to switch tee, both roles dance shirt, dance event outfit, "
            "performance dance tee, inclusive dance community shirt"
        ),
        "add_to_boomtick_store": "yes",
        "priority": "medium",
        "collection": "Dance Community Collection",
        "audience": "West Coast Swing, Lindy Hop, salsa, bachata, Argentine tango, fusion, blues, ballroom partner dancers"
    },
    102760851: {
        "final_title": "Lead . Follow . Switch - Partner Dance Role Tee | Social Dance Community",
        "final_short_description": "Check all three. The dancer who does it all - this is your shirt.",
        "final_description": (
            "Lead. Follow. Switch. Three checkboxes, one shirt, infinite dances. This neon performance tee is "
            "for the partner dancer who doesn't limit themselves to one role - and wants the whole room to know it.\n\n"
            "Whether you show up to a social dance ready to lead, follow, or read the connection and do both in the "
            "same song, this is your announcement. Wear it to a West Coast Swing weekend, a Lindy Hop exchange, "
            "a bachata social, a fusion event, or anywhere the dance floor is a conversation and you've got "
            "a lot to say.\n\n"
            "The Safety Yellow colorway keeps you impossible to miss under any dance floor light. Performance fabric "
            "means you're comfortable from the first song to the last. And the checklist speaks for itself.\n\n"
            "Queer-inclusive. Role-positive. Any body, any role, any dance."
        ),
        "seo_keywords": (
            "lead follow switch shirt, partner dance shirt, dance role shirt, West Coast Swing shirt, social dance "
            "apparel, Lindy Hop shirt, switcher dance tee, gender neutral dance shirt, LGBTQ dance community shirt, "
            "salsa bachata shirt, fusion dance shirt, blues dance apparel, neon dance shirt, performance dance tee, "
            "dance event outfit, queer dance shirt, inclusive dance community, all roles dance shirt, social dancer "
            "shirt, checklist dance shirt"
        ),
        "add_to_boomtick_store": "yes",
        "priority": "medium",
        "collection": "Dance Community Collection",
        "audience": "West Coast Swing, Lindy Hop, salsa, bachata, Argentine tango, fusion, blues, ballroom partner dancers"
    }
}

def main():
    if not JSON_PATH.exists():
        print(f"Error: {JSON_PATH} not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    for t in data["templates"]:
        tid = t["template_id"]
        if tid in patches:
            p = patches[tid]
            print(f"Applying patch to template {tid}...")
            t["agent_fields"].update({
                "add_to_boomtick_store": p["add_to_boomtick_store"],
                "final_title": p["final_title"],
                "final_description": p["final_description"],
                "final_short_description": p["final_short_description"],
                "final_selected_colors": ", ".join(t["suggested_colors"]),
                "final_selected_sizes": ", ".join(t["sizes"]),
                "seo_keywords": p["seo_keywords"],
                "collection": p["collection"],
                "audience": p["audience"],
                "notes": "Hold/verify sizes" if p["add_to_boomtick_store"] == "maybe" else "",
                "priority": p["priority"]
            })

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print("Successfully patched templates 4, 6, and 8 in JSON.")

if __name__ == "__main__":
    main()
