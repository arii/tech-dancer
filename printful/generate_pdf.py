#!/usr/bin/env python3
import json
import os
from pathlib import Path
from fpdf import FPDF
from PIL import Image

JSON_PATH = Path("printful_template_agent_packet.json")
OUTPUT_PDF = Path("printful_template_review.pdf")
TEMP_DIR = Path("temp_pdf_images")

class PDFReport(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 10, "BoomTick Printful Product Review Plan", border=0, ln=1, align="R")
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f"Page {self.page_no()}", border=0, ln=0, align="C")

def clean_text(text):
    if not text:
        return ""
    replacements = {
        "—": "-",    # em dash
        "–": "-",    # en dash
        "’": "'",    # curly single quote
        "‘": "'",    # curly single quote open
        "”": '"',    # curly double quote close
        "“": '"',    # curly double quote open
        "\u2013": "-",
        "\u2014": "-",
        "\u2019": "'",
        "\u2018": "'",
        "\u201C": '"',
        "\u201D": '"',
    }
    for orig, rep in replacements.items():
        text = text.replace(orig, rep)
    return text

def convert_webp_to_png(webp_path):
    if not webp_path.exists():
        return None
    TEMP_DIR.mkdir(exist_ok=True)
    png_path = TEMP_DIR / f"{webp_path.stem}.png"
    try:
        with Image.open(webp_path) as img:
            img.save(png_path, "PNG")
        return png_path
    except Exception as e:
        print(f"Error converting {webp_path}: {e}")
        return None

def main():
    if not JSON_PATH.exists():
        print(f"Error: {JSON_PATH} not found.")
        return

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    pdf = PDFReport()
    pdf.set_auto_page_break(auto=True, margin=15)

    # ------------------ COVER PAGE ------------------
    pdf.add_page()
    pdf.set_y(50)
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(33, 33, 33)
    pdf.cell(0, 15, "BoomTick Store Merchandising", ln=True, align="C")

    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(100, 110, 120)
    pdf.cell(0, 15, "Printful Product Template Review & SEO Plan", ln=True, align="C")

    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(120, 120, 120)
    pdf.cell(0, 10, f"Generated on: {data.get('generated_at')[:10]}", ln=True, align="C")
    pdf.ln(20)

    # Rules Summary Box
    pdf.set_fill_color(245, 247, 250)
    pdf.rect(15, pdf.get_y(), 180, 55, "F")
    pdf.set_y(pdf.get_y() + 5)
    pdf.set_x(20)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(40, 50, 60)
    pdf.cell(0, 8, "Core Objectives & Rules:", ln=True)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(60, 60, 60)
    rules = [
        "- Maximize search visibility for NorCal pride & California lifestyle.",
        "- Restrict options to 2-4 premium/contrasting colors per product.",
        "- Write engaging descriptions without inventing fake scarcity or reviews.",
        "- Flag mockup issues and hold templates with limited size availability."
    ]
    for r in rules:
        pdf.set_x(22)
        pdf.cell(0, 6, r, ln=True)

    # ------------------ TEMPLATES ------------------
    for idx, t in enumerate(data["templates"], 1):
        af = t["agent_fields"]

        pdf.add_page()

        # Product Header Title
        title_clean = clean_text(f"{idx}. {af['final_title']}")
        pdf.set_font("Helvetica", "B", 14)
        pdf.set_text_color(33, 150, 243)
        pdf.cell(0, 10, title_clean, ln=True)
        pdf.ln(2)

        # Priority Badge & Add Status
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(255, 255, 255)

        if af["add_to_boomtick_store"] == "yes":
            pdf.set_fill_color(76, 175, 80) # Green
            pdf.cell(40, 6, "  ADD TO STORE: YES  ", fill=True, ln=0, align="C")
        elif af["add_to_boomtick_store"] == "maybe":
            pdf.set_fill_color(255, 152, 0) # Orange
            pdf.cell(40, 6, "  ADD TO STORE: HOLD  ", fill=True, ln=0, align="C")
        else:
            pdf.set_fill_color(244, 67, 54) # Red
            pdf.cell(40, 6, "  ADD TO STORE: NO  ", fill=True, ln=0, align="C")

        pdf.cell(5) # Spacing

        if af["priority"] == "high":
            pdf.set_fill_color(244, 67, 54) # Red
            pdf.cell(35, 6, "  PRIORITY: HIGH  ", fill=True, ln=1, align="C")
        elif af["priority"] == "medium":
            pdf.set_fill_color(33, 150, 243) # Blue
            pdf.cell(35, 6, "  PRIORITY: MEDIUM  ", fill=True, ln=1, align="C")
        else:
            pdf.set_fill_color(158, 158, 158) # Grey
            pdf.cell(35, 6, "  PRIORITY: LOW  ", fill=True, ln=1, align="C")

        pdf.ln(5)

        # Image Placement - left column (image), right column (info)
        start_y = pdf.get_y()

        # Get downloaded mockups list
        mockups = t.get("downloaded_mockups", [])
        if not mockups and t.get("local_image_path"):
            mockups = [t["local_image_path"]]

        primary_mockup = mockups[0] if mockups else None

        if primary_mockup:
            png_path = convert_webp_to_png(Path(primary_mockup))
            if png_path and png_path.exists():
                try:
                    pdf.image(str(png_path), x=15, y=start_y, w=70)
                except Exception as e:
                    pdf.set_font("Helvetica", "I", 10)
                    pdf.set_text_color(150, 150, 150)
                    pdf.text(x=20, y=start_y + 30, txt="[Error rendering image]")
            else:
                pdf.set_font("Helvetica", "I", 10)
                pdf.set_text_color(150, 150, 150)
                pdf.text(x=20, y=start_y + 30, txt="[No Mockup Available]")
        else:
            pdf.set_font("Helvetica", "I", 10)
            pdf.set_text_color(150, 150, 150)
            pdf.text(x=20, y=start_y + 30, txt="[No Mockup Available]")

        right_x = 90
        pdf.set_left_margin(right_x)
        pdf.set_y(start_y)

        # 1. Colors
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.write(5, "Selected Colors: ")
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(80, 80, 80)
        pdf.write(5, f"{clean_text(af['final_selected_colors'])}\n\n")

        # 2. Sizes
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.write(5, "Selected Sizes: ")
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(80, 80, 80)
        pdf.write(5, f"{clean_text(af['final_selected_sizes'])}\n\n")

        # 3. Collection
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.write(5, "Store Collection: ")
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(80, 80, 80)
        pdf.write(5, f"{clean_text(af['collection'])}\n\n")

        # 4. Audience
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.write(5, "Target Audience: ")
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(80, 80, 80)
        pdf.write(5, f"{clean_text(af['audience'])}\n\n")

        # Reset margin to full page width for descriptions below
        pdf.set_left_margin(15)
        pdf.set_y(start_y + 75)

        # 5. Short Description
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.cell(0, 5, "Short Description / Card Copy:", ln=True)
        pdf.set_font("Helvetica", "I", 10)
        pdf.set_text_color(80, 80, 80)
        pdf.multi_cell(0, 5, clean_text(af["final_short_description"]))
        pdf.ln(4)

        # 6. Full Description
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.cell(0, 5, "SEO Product Description:", ln=True)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(80, 80, 80)
        pdf.multi_cell(0, 5, clean_text(af["final_description"]))
        pdf.ln(4)

        # 7. SEO Keywords
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(40, 50, 60)
        pdf.cell(0, 5, "SEO Tags & Keywords:", ln=True)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(110, 110, 110)
        pdf.multi_cell(0, 5, clean_text(af["seo_keywords"]))

        # Notes if any
        if af.get("notes"):
            pdf.ln(4)
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(244, 67, 54)
            pdf.cell(0, 5, "Review Notes:", ln=True)
            pdf.set_font("Helvetica", "I", 9.5)
            pdf.set_text_color(120, 50, 50)
            pdf.multi_cell(0, 5, clean_text(af["notes"]))

        # 8. Render alternative mockup thumbnails side-by-side at the bottom
        if len(mockups) > 1:
            pdf.ln(6)
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(40, 50, 60)
            pdf.cell(0, 5, "Alternative Placements & Views:", ln=True)
            pdf.ln(2)

            img_x = 15
            img_y = pdf.get_y()
            thumb_w = 40
            for idx2, m_path in enumerate(mockups[1:]):
                m_png = convert_webp_to_png(Path(m_path))
                if m_png and m_png.exists():
                    try:
                        pdf.image(str(m_png), x=img_x, y=img_y, w=thumb_w)
                        img_x += thumb_w + 5
                        if img_x > 165: # wrap row if needed
                            img_x = 15
                            img_y += thumb_w + 5
                            pdf.ln(thumb_w + 5)
                    except Exception:
                        pass

    pdf.output(str(OUTPUT_PDF))
    print(f"PDF generated: {OUTPUT_PDF}")

    if TEMP_DIR.exists():
        for f in TEMP_DIR.glob("*"):
            try:
                f.unlink()
            except Exception:
                pass
        try:
            TEMP_DIR.rmdir()
        except Exception:
            pass

if __name__ == "__main__":
    main()
