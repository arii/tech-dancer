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

    count = 0
    for t in data["templates"]:
        af = t["agent_fields"]

        # Check title
        if "phoenix" in af["final_title"].lower():
            af["final_title"] = af["final_title"].replace("Phoenix", "War Eagle")
            count += 1

        # Check description
        if "phoenix" in af["final_description"].lower():
            af["final_description"] = af["final_description"].replace("phoenix", "war eagle")

        # Check short description
        if "phoenix" in af["final_short_description"].lower():
            af["final_short_description"] = af["final_short_description"].replace("phoenix", "war eagle")

        # Check keywords
        if "phoenix" in af["seo_keywords"].lower():
            af["seo_keywords"] = af["seo_keywords"].replace("phoenix", "war eagle")

    if count > 0:
        with open(JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Successfully renamed {count} templates from Phoenix to War Eagle in JSON.")
    else:
        print("No templates found with 'Phoenix' in the title.")

if __name__ == "__main__":
    main()
