try:
    import cairocffi as cairo
except ImportError:
    import cairo
import cairosvg
import io
import os
import sys
import subprocess

# --- ASSET PATHS ---
GENERATED_DIR = "scripts/merch/generated"
FONTS_DIR = "scripts/merch/fonts"
PUBLIC_ASSETS_DIR = "public/assets/merch"

HEART_SVG = f"{GENERATED_DIR}/rainbow_heart.svg"
CHECK_SVG = f"{GENERATED_DIR}/rainbow_check.svg"
STAR_SVG = f"{GENERATED_DIR}/rainbow_star.svg"
SPARKLE_SVG = f"{GENERATED_DIR}/rainbow_sparkle.svg"

# --- CONSTANTS ---
PRINT_WIDTH = 4500
PRINT_HEIGHT = 5400
PREVIEW_WIDTH = 1200
PREVIEW_HEIGHT = 1200

# Design coordinate system (will be scaled to PRINT or PREVIEW)
DESIGN_WIDTH = 1200
DESIGN_HEIGHT = 1200

NEON_YELLOW_HEX = "#e0f500"
FONT_NAME = "Cooper Black"

# Front Design Constants
FRONT_FONT_SIZE = 240
FRONT_GAP = 16
# The heart path in the 600x600 SVG is approx 450 units tall.
# We want the heart itself to be ~85% of cap height.
# cap_height = 240 * 0.7 = 168
# target_heart_height = 168 * 0.85 = 142.8
# SVG_VIEWPORT_SIZE = 600
# FRONT_HEART_SIZE = (target_heart_height / 450) * 600 = (142.8 / 450) * 600 = 190.4
FRONT_HEART_SIZE = 190
FRONT_BASE_Y = 660
FRONT_CAP_HEIGHT_RATIO = 0.7

# Back Design Constants
BACK_ITEMS = ["Lead", "Follow", "Switch"]
BACK_FONT_SIZE = 124
BACK_CHECK_SIZE = 128
BACK_CHECK_GAP = 32
BACK_LINE_SPACING = 165
BACK_Y_OFFSET = 50
BACK_CAP_HEIGHT_RATIO = 0.7

# Shapes Sheet Constants
SHEET_SIZE = 1200
SHEET_DIVIDER_WIDTH = 4
SHEET_LABEL_FONT_SIZE = 24

def hex_to_rgb(hex_str):
    """Converts hex color string to RGB tuple (0-1)."""
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4))

NEON_YELLOW_RGB = hex_to_rgb(NEON_YELLOW_HEX)

def get_scale(target_width, target_height):
    """Calculates scaling factor from design coordinates to target resolution."""
    return target_width / DESIGN_WIDTH

def load_svg_to_surface(svg_path, width, height):
    """Converts an SVG file to a Cairo PNG surface scaled to target dimensions."""
    try:
        png_data = cairosvg.svg2png(url=svg_path, output_width=int(width), output_height=int(height))
        return cairo.ImageSurface.create_from_png(io.BytesIO(png_data))
    except Exception as e:
        print(f"Error loading {svg_path}: {e}")
        # Return empty surface as fallback
        return cairo.ImageSurface(cairo.FORMAT_ARGB32, int(width), int(height))

def draw_svg_as_image(ctx, svg_path, x, y, width, height, current_scale=1.0):
    """Renders any SVG file as an image onto the Cairo context, ensuring high-res scaling."""
    # Scale width and height to target resolution for cairosvg to render high-res PNG
    svg_surface = load_svg_to_surface(svg_path, width * current_scale, height * current_scale)

    ctx.save()
    # Move to the design coordinates
    ctx.translate(x, y)
    # Scale down the context so the high-res surface fits the design-scale coordinate system
    ctx.scale(1.0 / current_scale, 1.0 / current_scale)
    ctx.set_source_surface(svg_surface, 0, 0)
    ctx.paint()
    ctx.restore()

def get_text_extents(ctx, text):
    """Helper to handle both cairocffi (tuple) and pycairo (object) extents."""
    ext = ctx.text_extents(text)
    if isinstance(ext, tuple):
        # (x_bearing, y_bearing, width, height, x_advance, y_advance)
        class Extents:
            def __init__(self, t):
                self.x_bearing = t[0]
                self.y_bearing = t[1]
                self.width = t[2]
                self.height = t[3]
                self.x_advance = t[4]
                self.y_advance = t[5]
        return Extents(ext)
    return ext

def check_font_availability(font_name):
    """Checks if a font is available in the system via fc-match."""
    try:
        # Using fc-match is more reliable for checking how Cairo will resolve the font
        output = subprocess.check_output(["fc-match", font_name], stderr=subprocess.STDOUT).decode()
        # If it returns a different font (e.g. DejaVu Sans), it means it didn't find the match
        if font_name.lower().replace(" ", "") not in output.lower().replace(" ", ""):
            return False
        return True
    except Exception:
        return False

def draw_text_with_stroke(ctx, text, x, y, font_size, font_face=FONT_NAME):
    """Draws white text with a thick black outline matching the Cooper style."""
    ctx.select_font_face(font_face, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(font_size)

    ctx.move_to(x, y)
    ctx.text_path(text)

    # Outer black stroke
    ctx.set_source_rgb(0, 0, 0)
    ctx.set_line_width(font_size * 0.12)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.stroke_preserve()

    # Inner white fill
    ctx.set_source_rgb(1, 1, 1)
    ctx.fill()

def generate_front_design(output_path, is_preview=False):
    """Generates the 'LOVE' front shirt design."""
    target_w = PREVIEW_WIDTH if is_preview else PRINT_WIDTH
    target_h = PREVIEW_HEIGHT if is_preview else PRINT_HEIGHT
    scale = get_scale(target_w, target_h)

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, target_w, target_h)
    ctx = cairo.Context(surface)
    ctx.scale(scale, scale)

    if is_preview:
        ctx.set_source_rgb(*NEON_YELLOW_RGB)
        ctx.paint()

    # Layout for LOVE
    ctx.select_font_face(FONT_NAME, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(FRONT_FONT_SIZE)

    extents_L = get_text_extents(ctx, "L")
    extents_O = get_text_extents(ctx, "O")
    extents_E = get_text_extents(ctx, "E")

    total_width = (extents_L.x_advance + FRONT_GAP +
                   extents_O.x_advance + FRONT_GAP +
                   FRONT_HEART_SIZE + FRONT_GAP +
                   extents_E.x_advance)

    start_x = (DESIGN_WIDTH - total_width) / 2

    # L
    draw_text_with_stroke(ctx, "L", start_x, FRONT_BASE_Y, FRONT_FONT_SIZE)
    curr_x = start_x + extents_L.x_advance + FRONT_GAP

    # O
    draw_text_with_stroke(ctx, "O", curr_x, FRONT_BASE_Y, FRONT_FONT_SIZE)
    curr_x += extents_O.x_advance + FRONT_GAP

    # Heart (V)
    heart_x = curr_x
    cap_height = FRONT_FONT_SIZE * FRONT_CAP_HEIGHT_RATIO
    # Center the heart vertically relative to the cap height
    heart_y = (FRONT_BASE_Y - cap_height / 2) - (FRONT_HEART_SIZE / 2) + 5
    draw_svg_as_image(ctx, HEART_SVG, heart_x, heart_y, FRONT_HEART_SIZE, FRONT_HEART_SIZE, scale)
    curr_x += FRONT_HEART_SIZE + FRONT_GAP

    # E
    draw_text_with_stroke(ctx, "E", curr_x, FRONT_BASE_Y, FRONT_FONT_SIZE)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_back_design(output_path, is_preview=False):
    """Generates the 'Lead/Follow/Switch' back shirt design."""
    target_w = PREVIEW_WIDTH if is_preview else PRINT_WIDTH
    target_h = PREVIEW_HEIGHT if is_preview else PRINT_HEIGHT
    scale = get_scale(target_w, target_h)

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, target_w, target_h)
    ctx = cairo.Context(surface)
    ctx.scale(scale, scale)

    if is_preview:
        ctx.set_source_rgb(*NEON_YELLOW_RGB)
        ctx.paint()

    # Measure to center
    ctx.select_font_face(FONT_NAME, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(BACK_FONT_SIZE)

    max_text_w = 0
    for item in BACK_ITEMS:
        ext = get_text_extents(ctx, item)
        max_text_w = max(max_text_w, ext.x_advance)

    cap_height = BACK_FONT_SIZE * BACK_CAP_HEIGHT_RATIO

    group_w = BACK_CHECK_SIZE + BACK_CHECK_GAP + max_text_w
    group_h = (len(BACK_ITEMS) - 1) * BACK_LINE_SPACING + cap_height
    start_x = (DESIGN_WIDTH - group_w) / 2
    start_y = (DESIGN_HEIGHT - group_h) / 2 + BACK_Y_OFFSET

    for i, item in enumerate(BACK_ITEMS):
        curr_y = start_y + (i * BACK_LINE_SPACING) + cap_height

        # Check visual center alignment:
        # SVG visual center is 0.5 * check_size
        # Text visual center is curr_y - cap_height / 2
        check_y = (curr_y - cap_height / 2) - (0.5 * BACK_CHECK_SIZE)

        draw_svg_as_image(ctx, CHECK_SVG, start_x, check_y, BACK_CHECK_SIZE, BACK_CHECK_SIZE, scale)
        draw_text_with_stroke(ctx, item, start_x + BACK_CHECK_SIZE + BACK_CHECK_GAP, curr_y, BACK_FONT_SIZE)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_shapes_sheet(output_path):
    """Generates a preview sheet showing all rainbow shapes."""
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, SHEET_SIZE, SHEET_SIZE)
    ctx = cairo.Context(surface)

    # Off-white background
    ctx.set_source_rgb(0.97, 0.97, 0.98)
    ctx.paint()

    # Dividers
    ctx.set_source_rgb(0.90, 0.90, 0.92)
    ctx.set_line_width(SHEET_DIVIDER_WIDTH)
    ctx.move_to(600, 40); ctx.line_to(600, 1160)
    ctx.move_to(40, 600); ctx.line_to(1160, 600)
    ctx.stroke()

    shapes = [
        {'path': CHECK_SVG, 'label': "Rainbow Check"},
        {'path': HEART_SVG, 'label': "Rainbow Heart"},
        {'path': STAR_SVG, 'label': "Rainbow Star"},
        {'path': SPARKLE_SVG, 'label': "Rainbow Sparkle"},
    ]

    for i, asset in enumerate(shapes):
        tx = (i % 2) * 600
        ty = (i // 2) * 600
        ctx.save()
        ctx.translate(tx, ty)
        draw_svg_as_image(ctx, asset['path'], 60, 60, 480, 480, 1.0) # 1:1 scale for sheet

        # Label
        ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        ctx.set_font_size(SHEET_LABEL_FONT_SIZE)
        ctx.set_source_rgb(0.2, 0.2, 0.25)
        ext = get_text_extents(ctx, asset['label'])
        ctx.move_to(300 - ext.width/2, 550)
        ctx.show_text(asset['label'])
        ctx.restore()

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

if __name__ == "__main__":
    if not check_font_availability(FONT_NAME):
        print(f"CRITICAL ERROR: Font '{FONT_NAME}' not found in system font cache.", file=sys.stderr)
        print(f"\nTroubleshooting steps:", file=sys.stderr)
        print(f"1. Ensure 'Cooper Black' font file (e.g., .ttf or .otf) is in {FONTS_DIR}", file=sys.stderr)
        print(f"2. Run 'scripts/merch/setup_env.sh' to register the font and refresh the cache.", file=sys.stderr)
        print(f"3. Verify manual installation with 'fc-list | grep \"Cooper Black\"'", file=sys.stderr)
        sys.exit(1)

    previews_dir = f"{PUBLIC_ASSETS_DIR}/previews"
    print_dir = f"{PUBLIC_ASSETS_DIR}/print"
    os.makedirs(previews_dir, exist_ok=True)
    os.makedirs(print_dir, exist_ok=True)

    # Previews (Neon Yellow)
    generate_front_design(f"{previews_dir}/shirt_front_preview.png", is_preview=True)
    generate_back_design(f"{previews_dir}/shirt_back_preview.png", is_preview=True)
    generate_shapes_sheet(f"{previews_dir}/rainbow_shapes_sheet.png")

    # Print Assets (Transparent)
    generate_front_design(f"{print_dir}/shirt_front_print.png", is_preview=False)
    generate_back_design(f"{print_dir}/shirt_back_print.png", is_preview=False)
