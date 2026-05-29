#!/usr/bin/env python3
import json
import re
from pathlib import Path

REVIEW_PATH = Path("review.md")
JSON_PATH = Path("printful_template_agent_packet.json")
MD_PATH = Path("printful_template_agent_packet_updated.md")

def parse_review_md():
    if not REVIEW_PATH.exists():
        print(f"Error: {REVIEW_PATH} not found.")
        return {}

    with open(REVIEW_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by templates
    # E.g. "### 1. Golden Gate Nor Cal Best Cal Pride Sweatshirt\n`Template ID: 102951840` | Priority: HIGH"
    sections = re.split(r"### \d+\.", content)

    parsed = {}
    for sect in sections[1:]:
        # Extract template ID
        id_match = re.search(r"Template ID:\s*(\d+)", sect)
        if not id_match:
            continue
        template_id = int(id_match.group(1))

        # Extract priority
        priority_match = re.search(r"Priority:\s*(\w+)", sect, re.IGNORECASE)
        priority = priority_match.group(1).lower() if priority_match else "medium"

        # Check if Hold
        add_status = "yes"
        if "(HOLD)" in sect or "status: hold" in sect.lower() or "do not publish" in sect.lower():
            add_status = "maybe"
            priority = "low"

        # Recommended Title
        title = ""
        title_match = re.search(r"\*\*Recommended Product Title[^:]*\*\*:\s*\n?>\s*(.*?)\n", sect)
        if title_match:
            title = title_match.group(1).strip()
        else:
            # Try without quote block marker
            title_match2 = re.search(r"\*\*Recommended Product Title[^:]*\*\*:\s*\n?(.*?)\n", sect)
            if title_match2:
                title = title_match2.group(1).strip().strip("> ")

        # Short Description
        short_desc = ""
        short_match = re.search(r"\*\*Short Description[^:]*\*\*:\s*\n?>\s*(.*?)\n", sect)
        if short_match:
            short_desc = short_match.group(1).strip()
        else:
            short_match2 = re.search(r"\*\*Short Description[^:]*\*\*:\s*\n?(.*?)\n", sect)
            if short_match2:
                short_desc = short_match2.group(1).strip().strip("> ")

        # Full Description
        full_desc = ""
        desc_match = re.search(r"\*\*Full SEO Description\*\*:\s*\n?(.*?)\n\n\*\*", sect, re.DOTALL)
        if desc_match:
            full_desc = desc_match.group(1).strip()
            # Clean up the ">" block quotes
            full_desc = "\n".join(line.strip().lstrip("> ") for line in full_desc.split("\n"))
        else:
            # Try fallback to matching up to tags
            desc_match2 = re.search(r"\*\*Full SEO Description\*\*:\s*\n?(.*?)\n\n", sect, re.DOTALL)
            if desc_match2:
                full_desc = desc_match2.group(1).strip()
                full_desc = "\n".join(line.strip().lstrip("> ") for line in full_desc.split("\n"))

        # Tags
        tags = ""
        tags_match = re.search(r"\*\*SEO Tags / Keywords\*\*:\s*\n?>\s*(.*?)\n", sect)
        if tags_match:
            tags = tags_match.group(1).strip()
        else:
            tags_match2 = re.search(r"\*\*SEO Tags / Keywords\*\*:\s*\n?(.*?)\n", sect)
            if tags_match2:
                tags = tags_match2.group(1).strip().strip("> ")

        # Clean tags/keywords from trailing newlines/quotes
        tags = tags.strip().replace(">", "").strip()

        # Audience
        # Guess audience based on section category
        if "lead" in sect.lower() or "follow" in sect.lower():
            audience = "West Coast Swing, Lindy Hop, salsa, bachata, Argentine tango, fusion, blues, ballroom partner dancers"
            collection = "Dance Community Collection"
        elif "rainbow phoenix" in title.lower() or "rainbow bird" in sect.lower():
            audience = "LGBTQ+ pride community, festival-goers, inclusive community, streetwear fashion"
            collection = "Rainbow Pride Collection"
        else:
            audience = "Bay Area locals, SF locals, California pride supporters, festival-goers"
            collection = "NorCal Pride & Bay Area Collection"

        # Clean title quotes
        title = title.replace('"', "").replace("'", "")
        short_desc = short_desc.replace('"', "").replace("'", "")

        parsed[template_id] = {
            "title": title,
            "short_description": short_desc,
            "description": full_desc,
            "tags": tags,
            "priority": priority,
            "add_status": add_status,
            "audience": audience,
            "collection": collection
        }

    return parsed

def main():
    parsed = parse_review_md()
    if not parsed:
        print("Failed to parse review.md.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    updated_templates = []
    for t in data["templates"]:
        tid = t["template_id"]
        if tid in parsed:
            p = parsed[tid]

            # Map selected colors from suggested colors
            suggested_colors = t["suggested_colors"]

            # Special case color adjustments based on review.md notes:
            # crop top 102755431 has: Black, White, Mineral, Bubblegum
            # crop hoodie 102754648 has: Black, Military Green, Storm, Peach
            # 102861895 (hold) has S only, Black only

            t["agent_fields"] = {
                "add_to_boomtick_store": p["add_status"],
                "final_title": p["title"],
                "final_description": p["description"],
                "final_short_description": p["short_description"],
                "final_selected_colors": ", ".join(suggested_colors),
                "final_selected_sizes": ", ".join(t["sizes"]),
                "seo_keywords": p["tags"],
                "collection": p["collection"],
                "audience": p["audience"],
                "notes": "Hold/verify sizes" if p["add_status"] == "maybe" else "",
                "needs_design_fix": "no",
                "needs_mockup_fix": "no",
                "priority": p["priority"]
            }
        else:
            print(f"Warning: Template {tid} not found in review.md parser.")

        updated_templates.append(t)

    data["templates"] = updated_templates

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Successfully synchronized {JSON_PATH}")

    # Regenerate markdown file (agent_packet_updated.md)
    lines = []
    lines.append("# Printful Product Template Agent Review Packet (UPDATED FROM REVIEW.MD)")
    lines.append("")
    lines.append("## Summary Table")
    lines.append("")
    lines.append("| Template ID | Image | Title | Priority | Add? | Selected Colors | Collection |")
    lines.append("|---:|---|---|---|---|---|---|")

    for r in updated_templates:
        image_cell = f"![]({r['local_image_path']})" if r.get("local_image_path") else ""
        af = r["agent_fields"]
        lines.append(
            f"| {r['template_id']} | {image_cell} | {af['final_title']} | {af['priority'].upper()} | {af['add_to_boomtick_store']} | {af['final_selected_colors']} | {af['collection']} |"
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
