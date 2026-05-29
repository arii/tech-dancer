#!/usr/bin/env python3
import json
from pathlib import Path

# Paths
JSON_PATH = Path("printful_template_agent_packet.json")
MD_PATH = Path("printful_template_agent_packet_updated.md")

def get_filled_agent_fields(template_id, original_title, suggested_clean_title, all_colors, suggested_colors, sizes, product_type):
    # Default fields
    fields = {
        "add_to_boomtick_store": "yes",
        "final_title": suggested_clean_title,
        "final_description": "",
        "final_short_description": "",
        "final_selected_colors": ", ".join(suggested_colors),
        "final_selected_sizes": ", ".join(sizes),
        "seo_keywords": "",
        "collection": "NorCal Pride & Dance Apparel",
        "audience": "NorCal locals, Bay Area locals, pride supporters, West Coast Swing & social dancers",
        "notes": "",
        "needs_design_fix": "no",
        "needs_mockup_fix": "no",
        "priority": "medium"
    }

    title_lower = original_title.lower()

    # Apply details based on design type
    if "goldengate" in title_lower or "golden gate" in title_lower or "norcal" in title_lower or "nor cal" in title_lower:
        fields["priority"] = "high"
        
        # Titles
        if "sweatshirt" in title_lower:
            fields["final_title"] = "Golden Gate Nor Cal Best Cal Pride Sweatshirt"
            fields["final_short_description"] = "Bold NorCal pride for Bay Area days, pride events, and dance weekends."
        elif "t shirt" in title_lower or "t-shirt" in title_lower:
            fields["final_title"] = "Golden Gate Nor Cal Best Cal Pride T-Shirt"
            fields["final_short_description"] = "A colorful Golden Gate-inspired design for NorCal locals and allies."
        elif "tank" in title_lower:
            fields["final_title"] = "Nor Cal Best Cal Pride Racerback Tank"
            fields["final_short_description"] = "Rainbow California energy for pride events, festivals, and everyday wear."
        elif "crop top" in title_lower:
            fields["final_title"] = "Nor Cal Bear Pride Crop Top"
            fields["final_short_description"] = "Rainbow California energy for pride events, festivals, and everyday wear."
            fields["final_selected_colors"] = "Black, White, Mineral"
        elif "hoodie" in title_lower:
            fields["final_title"] = "Nor Cal Best Cal Crop Hoodie"
            fields["final_short_description"] = "NorCal Best Cal, made loud, colorful, and community-ready."
            fields["final_selected_colors"] = "Black, Storm, Military Green"
        else:
            fields["final_title"] = f"{suggested_clean_title} Pride Edition"
            fields["final_short_description"] = "A clean pride-forward piece for Northern California people and dance friends."

        fields["final_description"] = (
            "Show your NorCal pride with a bold, colorful design made for Bay Area days, California weekends, "
            "pride events, dance events, and everyday community wear. This piece is for Northern California locals, "
            "Golden Gate fans, LGBTQ+ pride celebrations, social dancers, and anyone who knows NorCal really is best cal."
        )
        fields["seo_keywords"] = (
            "NorCal shirt, Northern California shirt, Bay Area shirt, Golden Gate shirt, "
            "California pride shirt, NorCal pride apparel, Bay Area pride, rainbow California shirt, "
            "NorCal Best Cal, California graphic tee"
        )
        
    elif "love neon" in title_lower or "ask me to" in title_lower:
        fields["priority"] = "medium"
        fields["audience"] = "West Coast Swing dancers, partner dancers, social dance community"
        fields["seo_keywords"] = (
            "West Coast Swing shirt, social dance shirt, partner dance apparel, lead follow dance shirt, "
            "dance event outfit, gender neutral dance roles, dance community shirt"
        )
        if "lead" in title_lower:
            fields["final_title"] = "Ask Me to Lead LOVE Performance T-Shirt"
            fields["final_short_description"] = "A gender-neutral social dance lead shirt featuring vibrant neon details."
            fields["final_description"] = (
                "Make it official on the social dance floor. This Ask Me to Lead performance tee combines modern "
                "comfort with clear readability, designed for partner dance events, West Coast Swing workshops, "
                "and social dance nights. Perfect for dancers who love to drive the dance floor."
            )
        elif "follow" in title_lower:
            fields["final_title"] = "Ask Me to Follow LOVE Performance T-Shirt"
            fields["final_short_description"] = "A gender-neutral social dance follow shirt featuring vibrant neon details."
            fields["final_description"] = (
                "Make it official on the social dance floor. This Ask Me to Follow performance tee combines modern "
                "comfort with clear readability, designed for partner dance events, West Coast Swing workshops, "
                "and social dance nights. Perfect for dancers who love to follow the connection."
            )
        else:
            fields["final_title"] = "LOVE Rainbow Lead / Follow Dance Shirt"
            fields["final_short_description"] = "A vibrant partner dance shirt celebrating inclusive community roles."
            fields["final_description"] = (
                "Spread love and connection on the social dance floor. A clean, premium-weight tee for WCS, "
                "social dance events, and dance workshops."
            )
            
    elif "rainbow bird" in title_lower or "blaster 2.0" in title_lower or "oversized" in title_lower:
        # Check size limitations
        if len(sizes) <= 1:
            fields["add_to_boomtick_store"] = "maybe"
            fields["priority"] = "low"
            fields["notes"] = "Sizing is extremely limited (S only). Hold/verify options before publishing."
        
        fields["final_title"] = "Rainbow Bird Pride Back Print T-Shirt"
        fields["final_short_description"] = "A bold rainbow statement back print for inclusive community wear."
        fields["final_description"] = (
            "Wear your colors proudly. Featuring a vibrant back-print design, this oversized organic tee "
            "is perfect for festivals, pride events, and casual street wear. Designed for maximum comfort "
            "and visibility."
        )
        fields["seo_keywords"] = "pride shirt, rainbow shirt, LGBTQ pride apparel, pride festival outfit, inclusive apparel, rainbow graphic tee"
        fields["audience"] = "Pride event attendees, festival goers, LGBTQ+ allies, inclusive community"

    else:
        # Generic t-shirt (usually Golden Gate / NorCal based on the design context of the store templates)
        fields["priority"] = "medium"
        fields["final_title"] = f"Golden Gate Nor Cal Classic {product_type.title()}"
        fields["final_description"] = (
            "A clean, classic design showcasing NorCal pride. Made for Bay Area days, festival weekends, "
            "and everyday community wear. Crisp, durable, and comfortable."
        )
        fields["final_short_description"] = "A clean pride-forward piece for Northern California people."
        fields["seo_keywords"] = "NorCal shirt, Northern California shirt, Bay Area shirt, California lifestyle"
        
    return fields

def main():
    if not JSON_PATH.exists():
        print(f"Error: {JSON_PATH} not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_templates = []
    for t in data["templates"]:
        template_id = t["template_id"]
        original_title = t["original_title"]
        suggested_clean_title = t["suggested_clean_title"]
        all_colors = t["all_colors"]
        suggested_colors = t["suggested_colors"]
        sizes = t["sizes"]
        product_type = t["product_type_guess"]
        
        # Populate agent fields
        t["agent_fields"] = get_filled_agent_fields(
            template_id, original_title, suggested_clean_title, all_colors, suggested_colors, sizes, product_type
        )
        updated_templates.append(t)

    # Save JSON back
    data["templates"] = updated_templates
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Successfully updated {JSON_PATH}")

    # Regenerate markdown file (agent_packet_updated.md) containing fields
    lines = []
    lines.append("# Printful Product Template Agent Review Packet (UPDATED)")
    lines.append("")
    lines.append(f"Generated/Updated: {data.get('generated_at')}")
    lines.append("")
    lines.append("## Goal")
    lines.append("")
    lines.append("Review Printful product templates and decide which products should be added to the BoomTick store.")
    lines.append("")
    lines.append("## Summary Table")
    lines.append("")
    lines.append("| Template ID | Image | Title | Priority | Add? | Selected Colors |")
    lines.append("|---:|---|---|---|---|---|")

    for r in updated_templates:
        image_cell = f"![]({r['local_image_path']})" if r.get("local_image_path") else ""
        af = r["agent_fields"]
        lines.append(
            f"| {r['template_id']} | {image_cell} | {af['final_title']} | {af['priority'].upper()} | {af['add_to_boomtick_store']} | {af['final_selected_colors']} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")

    for idx, r in enumerate(updated_templates, start=1):
        af = r["agent_fields"]
        lines.append(f"## {idx}. {af['final_title']}")
        lines.append("")
        if r.get("local_image_path"):
            lines.append(f"![{af['final_title']}]({r['local_image_path']})")
            lines.append("")
        lines.append(f"**Template ID:** `{r['template_id']}` | **Product ID:** `{r['product_id']}` | **Priority:** `{af['priority']}`  ")
        lines.append(f"**Add to Store:** `{af['add_to_boomtick_store']}`  ")
        lines.append(f"**Selected Colors:** `{af['final_selected_colors']}`  ")
        lines.append(f"**Selected Sizes:** `{af['final_selected_sizes']}`  ")
        lines.append("")
        lines.append("### Merchandising Details")
        lines.append("")
        lines.append(f"**Short Description:**\n> {af['final_short_description']}\n")
        lines.append(f"**Description:**\n> {af['final_description']}\n")
        lines.append(f"**SEO Keywords:**\n> {af['seo_keywords']}\n")
        lines.append(f"**Target Audience:**\n> {af['audience']}\n")
        lines.append(f"**Collection:**\n> {af['collection']}\n")
        if af["notes"]:
            lines.append(f"**Notes/Issues:**\n> {af['notes']}\n")
        lines.append("---")
        lines.append("")

    with open(MD_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"Successfully generated {MD_PATH}")

if __name__ == "__main__":
    main()
