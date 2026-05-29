import json
import os

def main():
    packet_path = "printful_template_agent_packet.json"
    specs_path = "catalog_specifications.json"
    output_path = "product_marketing_and_catalog_specs.md"
    
    if not os.path.exists(packet_path) or not os.path.exists(specs_path):
        print("Required JSON files missing.")
        return
        
    with open(packet_path, "r") as f:
        packet = json.load(f)
        
    with open(specs_path, "r") as f:
        specs = json.load(f)
        
    md = []
    md.append("# BoomTick Store: Product Marketing & Catalog Specifications")
    md.append("\nThis document merges our optimized product titles, descriptions, and color choices with technical catalog specifications (placements, techniques, and dimensions) retrieved from the Printful v2 API.")
    md.append("\n---\n")
    
    for idx, t in enumerate(packet.get("templates", []), 1):
        original_title = t.get("original_title", "Unnamed")
        clean_title = t.get("suggested_clean_title", original_title)
        template_id = t.get("template_id")
        prod_id = str(t.get("product_id"))
        
        md.append(f"## Product {idx}: {clean_title}")
        md.append(f"* **Printful Template ID**: `{template_id}`")
        md.append(f"* **Base Catalog Product ID**: `{prod_id}`")
        md.append(f"* **Product Type**: `{t.get('product_type_guess', 'N/A')}`")
        
        # Marketing copy
        md.append("\n### ✍️ Marketing & SEO Copy")
        md.append(f"* **Optimized Title**: {clean_title}")
        md.append(f"* **Description**: {t.get('draft_description', 'N/A')}")
        md.append(f"* **Target Colors**: {', '.join(t.get('suggested_colors', []))}")
        md.append(f"* **Sizes**: {', '.join(t.get('sizes', []))}")
        
        # Technical specifications
        if prod_id in specs:
            prod_specs = specs[prod_id]
            md.append("\n### ⚙️ Technical Specifications (Printful Catalog)")
            
            techniques = [tech["display_name"] for tech in prod_specs.get("techniques", [])]
            md.append(f"* **Available Print Techniques**: {', '.join(techniques)}")
            
            md.append("\n#### Placements and Layout Area Sizing:")
            md.append("| Placement Area | Default Technique | Print Area Width | Print Area Height |")
            md.append("| :--- | :--- | :--- | :--- |")
            for pl in prod_specs.get("placements", []):
                md.append(f"| {pl['placement']} | {pl['technique'].upper()} | {pl['print_area_width']} | {pl['print_area_height']} |")
        else:
            md.append("\n### ⚙️ Technical Specifications")
            md.append("*Technical specs not retrieved (regional or inactive blank garment).*")
            
        md.append("\n---\n")
        
    with open(output_path, "w") as f:
        f.write("\n".join(md))
        
    print(f"Successfully generated markdown reference sheets: {output_path}")

if __name__ == "__main__":
    main()
