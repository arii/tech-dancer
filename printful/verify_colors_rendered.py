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

    print(f"{'Template ID':<13} | {'Title':<45} | {'Mockups Found':<15} | {'File Exists?':<12}")
    print("-" * 95)
    
    missing_files = []
    
    for t in data["templates"]:
        tid = t["template_id"]
        af = t["agent_fields"]
        title = af["final_title"] or t["original_title"]
        mockups = t.get("downloaded_mockups", [])
        
        all_exist = "YES"
        exists_list = []
        for m in mockups:
            p = Path(m)
            if p.exists():
                exists_list.append(True)
            else:
                exists_list.append(False)
                all_exist = "NO"
                missing_files.append(m)
                
        print(f"{tid:<13} | {title[:45]:<45} | {len(mockups):<15} | {all_exist:<12}")

    if missing_files:
        print("\nWARNING: Some mockup files are missing:")
        for m in missing_files:
            print(f"- {m}")
    else:
        print("\nAll colorway mockups are fully verified and present on the filesystem.")

if __name__ == "__main__":
    main()
