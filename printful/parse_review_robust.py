#!/usr/bin/env python3
import json
import re
from pathlib import Path

REVIEW_PATH = Path("review.md")
JSON_PATH = Path("printful_template_agent_packet.json")
MD_PATH = Path("printful_template_agent_packet_updated.md")

def parse_section(sect_text):
    # Find template ID
    id_match = re.search(r"Template ID:\s*(\d+)", sect_text)
    if not id_match:
        return None, None
    template_id = int(id_match.group(1))

    # Priority
    priority_match = re.search(r"Priority:\s*(\w+)", sect_text, re.IGNORECASE)
    priority = priority_match.group(1).lower() if priority_match else "medium"

    # Add status
    add_status = "yes"
    if "(HOLD)" in sect_text or "status: hold" in sect_text.lower() or "do not publish" in sect_text.lower():
        add_status = "maybe"
        priority = "low"

    lines = [line.strip() for line in sect_text.split("\n")]

    title = ""
    short_desc = ""
    full_desc_lines = []
    tags = ""

    state = None # "title", "short", "desc", "tags"

    for line in lines:
        if not line:
            continue

        # Check transitions
        if "recommended product title" in line.lower():
            state = "title"
            continue
        elif "short description" in line.lower():
            state = "short"
            continue
        elif "full seo description" in line.lower() or "seo description idea" in line.lower():
            state = "desc"
            full_desc_lines = []
            continue
        elif "seo tags / keywords" in line.lower():
            state = "tags"
            continue
        elif line.startswith("###") or line.startswith("---") or "color note:" in line.lower() or "suggested additional colors" in line.lower() or "status: hold" in line.lower():
            state = None
            continue

        # Handle states
        if state == "title":
            title = line.lstrip("> ").strip().strip('"').strip("'")
            state = None
        elif state == "short":
            short_desc = line.lstrip("> ").strip().strip('"').strip("'")
            state = None
        elif state == "desc":
            if line.startswith(">"):
                full_desc_lines.append(line.lstrip("> ").strip())
            else:
                # If it doesn't start with > and we already have lines, stop collecting description
                if full_desc_lines:
                    state = None
        elif state == "tags":
            tags = line.lstrip("> ").strip().strip('"').strip("'")
            state = None

    full_desc = "\n".join(full_desc_lines)

    # Collection and audience logic
    if "lead" in sect_text.lower() or "follow" in sect_text.lower():
        audience = "West Coast Swing, Lindy Hop, salsa, bachata, Argentine tango, fusion, blues, ballroom partner dancers"
        collection = "Dance Community Collection"
    elif "rainbow phoenix" in title.lower() or "rainbow bird" in sect_text.lower():
        audience = "LGBTQ+ pride community, festival-goers, inclusive community, streetwear fashion"
        collection = "Rainbow Pride Collection"
    else:
        audience = "Bay Area locals, SF locals, California pride supporters, festival-goers"
        collection = "NorCal Pride & Bay Area Collection"

    # Fix white t-shirt collection mismatch (should be NorCal Pride & Bay Area Collection)
    if template_id == 102652643: # White Tee
        collection = "NorCal Pride & Bay Area Collection"
        audience = "Bay Area locals, SF locals, California pride supporters, festival-goers"

    # Fix navy phoenix collection
    if template_id == 102753916:
        collection = "Rainbow Pride Collection"
        audience = "LGBTQ+ pride community, festival-goers, inclusive community, streetwear fashion"

    return template_id, {
        "title": title,
        "short_description": short_desc,
        "description": full_desc,
        "tags": tags,
        "priority": priority,
        "add_status": add_status,
        "audience": audience,
        "collection": collection
    }

def main():
    if not REVIEW_PATH.exists():
        print(f"Error: {REVIEW_PATH} not found.")
        return

    with open(REVIEW_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    sections = re.split(r"### \d+\.", content)
    parsed = {}
    for sect in sections[1:]:
        tid, data = parse_section(sect)
        if tid:
            parsed[tid] = data

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        json_data = json.load(f)

    updated_templates = []
    for t in json_data["templates"]:
        tid = t["template_id"]
        if tid in parsed:
            p = parsed[tid]

            t["agent_fields"] = {
                "add_to_boomtick_store": p["add_status"],
                "final_title": p["title"],
                "final_description": p["description"],
                "final_short_description": p["short_description"],
                "final_selected_colors": ", ".join(t["suggested_colors"]),
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
            print(f"Warning: Template {tid} not found in parsed data.")
        updated_templates.append(t)

    json_data["templates"] = updated_templates
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2)
    print(f"Successfully synchronized {JSON_PATH} (robust)")

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
    print(f"Successfully generated {MD_PATH} (robust)")

if __name__ == "__main__":
    main()
