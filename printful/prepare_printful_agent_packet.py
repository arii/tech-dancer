#!/usr/bin/env python3

import os
import sys
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional
from urllib.parse import urlparse

import requests


PRINTFUL_TOKEN = os.getenv("PRINTFUL_TOKEN")
BASE_URL = "https://api.printful.com"

OUT_MD = "printful_template_agent_packet.md"
OUT_JSON = "printful_template_agent_packet.json"
IMAGE_DIR = Path("printful_template_images")


PREFERRED_COLOR_ORDER = [
    "Black",
    "White",
    "Navy",
    "Dark Grey Heather",
    "Charcoal",
    "Charcoal Heather",
    "Athletic Heather",
    "Forest Green",
    "Maroon",
    "Red",
    "Royal",
    "True Royal",
    "Heather Dust",
    "Natural",
    "Latte",
]

AVOID_COLOR_WORDS = [
    "neon",
    "yellow",
    "lime",
    "orange",
    "pink",
    "rose",
    "mint",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def request_json(
    method: str,
    path: str,
    *,
    store_id: Optional[int] = None,
    params: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    if not PRINTFUL_TOKEN:
        fail("PRINTFUL_TOKEN is not set. Run: export PRINTFUL_TOKEN='your_token_here'")

    headers = {
        "Authorization": f"Bearer {PRINTFUL_TOKEN}",
        "Content-Type": "application/json",
    }

    if store_id is not None:
        headers["X-PF-Store-ID"] = str(store_id)

    url = f"{BASE_URL}{path}"

    response = requests.request(
        method,
        url,
        headers=headers,
        params=params,
        timeout=30,
    )

    if response.status_code == 401:
        fail("Printful returned 401 Unauthorized. Check PRINTFUL_TOKEN permissions/scopes.")

    if response.status_code >= 400:
        fail(f"{method} {url} failed: {response.status_code}\n{response.text}")

    return response.json()


def extract_items(payload: Dict[str, Any]) -> List[Dict[str, Any]]:
    data = payload.get("data")
    if isinstance(data, list):
        return data

    result = payload.get("result")
    if isinstance(result, list):
        return result

    if isinstance(result, dict):
        items = result.get("items")
        if isinstance(items, list):
            return items

    items = payload.get("items")
    if isinstance(items, list):
        return items

    return []


def list_stores() -> List[Dict[str, Any]]:
    payload = request_json("GET", "/v2/stores", params={"limit": 100})
    return extract_items(payload)


def list_product_templates() -> List[Dict[str, Any]]:
    templates: List[Dict[str, Any]] = []
    offset = 0
    limit = 100

    while True:
        payload = request_json(
            "GET",
            "/product-templates",
            params={"limit": limit, "offset": offset},
        )

        page = extract_items(payload)
        templates.extend(page)

        if len(page) < limit:
            break

        offset += limit

    return templates


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-") or "untitled"


def clean_title(title: str) -> str:
    title = title.strip()
    title = re.sub(r"([a-z])([A-Z])", r"\1 \2", title)
    title = title.replace("NorCalBest", "NorCal Best")
    title = title.replace("GoldenGate", "Golden Gate")
    title = title.replace("cvc", "CVC")
    title = re.sub(r"\s+", " ", title)
    return title


def normalize_product_type(title: str) -> str:
    lower = title.lower()

    if "sweatshirt" in lower:
        return "sweatshirt"
    if "hoodie" in lower:
        return "hoodie"
    if "tank" in lower:
        return "tank top"
    if "shirt" in lower or "tee" in lower or "t-shirt" in lower:
        return "t-shirt"
    if "hat" in lower or "cap" in lower:
        return "hat"
    if "sticker" in lower:
        return "sticker"

    return "product"


def color_names(template: Dict[str, Any]) -> List[str]:
    colors = template.get("colors") or []
    names = []

    for color in colors:
        name = color.get("color_name")
        if name:
            names.append(name)

    return names


def recommend_colors(colors: List[str], max_colors: int = 4) -> List[str]:
    selected: List[str] = []

    for preferred in PREFERRED_COLOR_ORDER:
        for color in colors:
            if color.lower() == preferred.lower() and color not in selected:
                selected.append(color)

    for color in colors:
        lower = color.lower()
        if color in selected:
            continue
        if any(word in lower for word in AVOID_COLOR_WORDS):
            continue
        selected.append(color)

    if not selected:
        selected = colors[:max_colors]

    return selected[:max_colors]


def make_description_stub(cleaned_title: str, product_type: str) -> str:
    return (
        f"A clean BoomTick {product_type} for West Coast Swing dancers, social dancers, "
        "and NorCal dance friends. Designed for events, practice nights, workshops, "
        "and casual everyday wear."
    )


def guess_image_extension(url: str, content_type: Optional[str]) -> str:
    if content_type:
        content_type = content_type.lower()
        if "png" in content_type:
            return ".png"
        if "jpeg" in content_type or "jpg" in content_type:
            return ".jpg"
        if "webp" in content_type:
            return ".webp"

    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix.lower()
    if suffix in [".png", ".jpg", ".jpeg", ".webp"]:
        return suffix

    return ".jpg"


def download_image(url: Optional[str], template_id: Any, title: str) -> Optional[str]:
    if not url:
        return None

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    safe_title = slugify(title)[:80]
    temp_path = IMAGE_DIR / f"{template_id}-{safe_title}.download"

    try:
        response = requests.get(url, timeout=60, stream=True)
        response.raise_for_status()

        ext = guess_image_extension(url, response.headers.get("Content-Type"))
        final_path = IMAGE_DIR / f"{template_id}-{safe_title}{ext}"

        with open(temp_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024 * 128):
                if chunk:
                    f.write(chunk)

        temp_path.rename(final_path)
        return str(final_path)

    except Exception as exc:
        print(f"WARNING: failed to download image for template {template_id}: {exc}", file=sys.stderr)
        try:
            if temp_path.exists():
                temp_path.unlink()
        except Exception:
            pass
        return None


def make_agent_record(template: Dict[str, Any]) -> Dict[str, Any]:
    original_title = template.get("title") or template.get("name") or "Untitled template"
    cleaned = clean_title(original_title)
    ptype = normalize_product_type(cleaned)
    colors = color_names(template)
    suggested_colors = recommend_colors(colors)
    mockup_url = template.get("mockup_file_url")
    local_image_path = download_image(mockup_url, template.get("id"), cleaned)

    placements = template.get("placements") or []
    placement_summary = [
        {
            "placement": p.get("placement"),
            "display_name": p.get("display_name"),
            "technique": p.get("technique_display_name") or p.get("technique_key"),
        }
        for p in placements
    ]

    return {
        "template_id": template.get("id"),
        "product_id": template.get("product_id"),
        "external_product_id": template.get("external_product_id"),
        "original_title": original_title,
        "suggested_clean_title": cleaned,
        "product_type_guess": ptype,
        "sizes": template.get("sizes") or [],
        "all_colors": colors,
        "suggested_colors": suggested_colors,
        "available_variant_ids": template.get("available_variant_ids") or [],
        "variant_count": len(template.get("available_variant_ids") or []),
        "mockup_file_url": mockup_url,
        "local_image_path": local_image_path,
        "placements": placement_summary,
        "current_created_at": template.get("created_at"),
        "current_updated_at": template.get("updated_at"),
        "draft_description": make_description_stub(cleaned, ptype),
        "agent_fields": {
            "add_to_boomtick_store": "",
            "final_title": "",
            "final_description": "",
            "final_short_description": "",
            "final_selected_colors": "",
            "final_selected_sizes": "",
            "seo_keywords": "",
            "collection": "",
            "audience": "",
            "notes": "",
            "needs_design_fix": "",
            "needs_mockup_fix": "",
            "priority": "",
        },
    }


def write_json(records: List[Dict[str, Any]]) -> None:
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "image_directory": str(IMAGE_DIR),
        "purpose": "Agent worksheet for reviewing Printful product templates before adding selected products to the BoomTick store.",
        "rules": [
            "Do not add every color. Pick the strongest 2-4 colors unless the product truly needs more.",
            "Prefer readable design contrast over completeness.",
            "Improve titles for clarity, spacing, SEO, and normal human language.",
            "Descriptions should mention West Coast Swing, social dance, partner dance, NorCal, pride/rainbow, or event use only when relevant to the actual design.",
            "Do not invent reviews, ratings, shipping dates, return policy claims, or fake scarcity.",
            "Flag any product where the mockup/design placement looks weak before adding it to the store.",
        ],
        "templates": records,
    }

    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)


def write_markdown(records: List[Dict[str, Any]], stores: List[Dict[str, Any]]) -> None:
    lines: List[str] = []

    lines.append("# Printful Product Template Agent Review Packet")
    lines.append("")
    lines.append(f"Generated: {datetime.now(timezone.utc).isoformat()}")
    lines.append("")
    lines.append("## Goal")
    lines.append("")
    lines.append(
        "Review Printful product templates and decide which products should be added to the BoomTick store. "
        "For each approved product, improve the title, description, color selection, and merchandising notes before publishing."
    )
    lines.append("")
    lines.append("## Stores Found")
    lines.append("")

    for store in stores:
        lines.append(f"- `{store.get('name')}` — id `{store.get('id')}`, type `{store.get('type')}`")

    lines.append("")
    lines.append("## Agent Rules")
    lines.append("")
    lines.append("- Do **not** add every color. Pick the best 2–4 colors by default.")
    lines.append("- Prefer high-contrast mockups where the design is easy to read.")
    lines.append("- Use natural product language. Avoid awkward generated phrases.")
    lines.append("- Improve spacing/capitalization, especially names like `GoldenGate` or `NorCalBest`.")
    lines.append("- Do not invent reviews, ratings, fake SKUs, fake shipping dates, or return policy claims.")
    lines.append("- Use West Coast Swing / social dance / partner dance / NorCal / pride wording only when relevant.")
    lines.append("- Flag products with weak mockups, bad placement, or designs that are too small.")
    lines.append("")
    lines.append("## Downloaded Images")
    lines.append("")
    lines.append(f"Images are saved in: `{IMAGE_DIR}/`")
    lines.append("")
    lines.append("## Summary Table")
    lines.append("")
    lines.append("| Template ID | Image | Current Title | Product Type | Variant Count | Suggested Colors | Add? |")
    lines.append("|---:|---|---|---|---:|---|---|")

    for r in records:
        image_cell = f"![]({r['local_image_path']})" if r.get("local_image_path") else ""
        lines.append(
            f"| {r['template_id']} | {image_cell} | {r['original_title']} | {r['product_type_guess']} | "
            f"{r['variant_count']} | {', '.join(r['suggested_colors'])} |  |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")

    for idx, r in enumerate(records, start=1):
        lines.append(f"## {idx}. {r['original_title']}")
        lines.append("")

        if r.get("local_image_path"):
            lines.append(f"![{r['suggested_clean_title']}]({r['local_image_path']})")
            lines.append("")

        lines.append(f"**Template ID:** `{r['template_id']}`  ")
        lines.append(f"**Product ID:** `{r['product_id']}`  ")
        lines.append(f"**Product type guess:** `{r['product_type_guess']}`  ")
        lines.append(f"**Variant count:** `{r['variant_count']}`  ")
        lines.append(f"**Remote mockup:** {r['mockup_file_url'] or ''}  ")
        lines.append(f"**Local image:** `{r['local_image_path'] or ''}`")
        lines.append("")
        lines.append("### Current Template Data")
        lines.append("")
        lines.append(f"- Current title: `{r['original_title']}`")
        lines.append(f"- Suggested clean title: `{r['suggested_clean_title']}`")
        lines.append(f"- Sizes: {', '.join(r['sizes']) if r['sizes'] else 'None listed'}")
        lines.append(f"- All colors: {', '.join(r['all_colors']) if r['all_colors'] else 'None listed'}")
        lines.append(f"- Suggested reduced colors: {', '.join(r['suggested_colors']) if r['suggested_colors'] else 'None'}")
        lines.append("")
        lines.append("### Placements")
        lines.append("")

        if r["placements"]:
            for p in r["placements"]:
                lines.append(
                    f"- `{p.get('placement')}` — {p.get('display_name') or ''} — {p.get('technique') or ''}"
                )
        else:
            lines.append("- No placements listed.")

        lines.append("")
        lines.append("### Draft Starting Point")
        lines.append("")
        lines.append(f"**Draft title:** {r['suggested_clean_title']}")
        lines.append("")
        lines.append("**Draft description:**")
        lines.append("")
        lines.append(r["draft_description"])
        lines.append("")
        lines.append("### Agent Fill-In")
        lines.append("")
        lines.append("**Add to BoomTick store?** `yes / no / maybe`")
        lines.append("")
        lines.append("**Final title:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Final description:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Final short description / card copy:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Final selected colors:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Final selected sizes:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**SEO keywords:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Collection / category:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Audience:**")
        lines.append("")
        lines.append("> Example: West Coast Swing dancers, NorCal dancers, pride dance community, social dancers")
        lines.append("")
        lines.append("**Design/mockup issues to fix before publishing:**")
        lines.append("")
        lines.append("> ")
        lines.append("")
        lines.append("**Priority:** `high / medium / low`")
        lines.append("")
        lines.append("---")
        lines.append("")

    with open(OUT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def main() -> None:
    stores = list_stores()
    templates = list_product_templates()

    if not templates:
        fail("No product templates found. Check token scopes or Printful account.")

    print(f"Found {len(stores)} stores.")
    print(f"Found {len(templates)} product templates.")
    print(f"Downloading images into: {IMAGE_DIR}/")

    records = [make_agent_record(t) for t in templates]

    write_json(records)
    write_markdown(records, stores)

    downloaded_count = sum(1 for r in records if r.get("local_image_path"))

    print("")
    print(f"Downloaded images: {downloaded_count}/{len(records)}")
    print(f"Wrote: {OUT_MD}")
    print(f"Wrote: {OUT_JSON}")
    print(f"Wrote images to: {IMAGE_DIR}/")
    print("")
    print("Open the markdown packet:")
    print(f"  xdg-open {OUT_MD}  # Linux")
    print(f"  open {OUT_MD}      # macOS")


if __name__ == "__main__":
    main()
