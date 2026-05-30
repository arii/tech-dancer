try:
    import cairocffi as cairo
except ImportError:
    import cairo
import cairosvg
import io
import os
import sys

# --- CONFIGURATION ---
PRINT_WIDTH = 4500
PRINT_HEIGHT = 5400
PREVIEW_WIDTH = 1200
PREVIEW_HEIGHT = 1200

# Design coordinate system (will be scaled to PRINT or PREVIEW)
DESIGN_WIDTH = 1200
DESIGN_HEIGHT = 1200

NEON_YELLOW = (0.88, 0.96, 0.0)
FONT_NAME = "Cooper Black"

# Assets
SOURCE_DIR = "scripts/merch/source"
GENERATED_DIR = "scripts/merch/generated"
HEART_SVG = f"{SOURCE_DIR}/rainbow_heart.svg"
CHECK_SVG = f"{SOURCE_DIR}/rainbow_check.svg"
STAR_SVG = f"{GENERATED_DIR}/rainbow_star.svg"
SPARKLE_SVG = f"{GENERATED_DIR}/rainbow_sparkle.svg"

def get_scale(target_width, target_height):
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

def draw_svg_as_image(ctx, svg_path, x, y, width, height):
    """Renders any SVG file as an image onto the Cairo context."""
    svg_surface = load_svg_to_surface(svg_path, width, height)
    ctx.set_source_surface(svg_surface, x, y)
    ctx.paint()

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
    """Checks if a font is available in the system via fc-list."""
    try:
        output = subprocess.check_output(["fc-list"], stderr=subprocess.STDOUT).decode()
        return font_name.lower() in output.lower()
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
    target_w = PREVIEW_WIDTH if is_preview else PRINT_WIDTH
    target_h = PREVIEW_HEIGHT if is_preview else PRINT_HEIGHT
    scale = get_scale(target_w, target_h)

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, target_w, target_h)
    ctx = cairo.Context(surface)
    ctx.scale(scale, scale)

    if is_preview:
        ctx.set_source_rgb(*NEON_YELLOW)
        ctx.paint()

    # Layout for LOVE
    font_size = 240
    ctx.select_font_face(FONT_NAME, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(font_size)

    extents_L = get_text_extents(ctx, "L")
    extents_O = get_text_extents(ctx, "O")
    extents_E = get_text_extents(ctx, "E")

    gap = 20
    heart_w = 230
    heart_h = 205

    total_width = extents_L.x_advance + gap + extents_O.x_advance + gap + heart_w + gap + extents_E.x_advance
    start_x = (DESIGN_WIDTH - total_width) / 2
    base_y = 660

    # L
    draw_text_with_stroke(ctx, "L", start_x, base_y, font_size)
    curr_x = start_x + extents_L.x_advance + gap

    # O
    draw_text_with_stroke(ctx, "O", curr_x, base_y, font_size)
    curr_x += extents_O.x_advance + gap

    # Heart (V)
    heart_x = curr_x
    heart_y = base_y - 205 + 20 # Tune visually
    draw_svg_as_image(ctx, HEART_SVG, heart_x, heart_y, heart_w, heart_h)
    curr_x += heart_w + gap

    # E
    draw_text_with_stroke(ctx, "E", curr_x, base_y, font_size)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_back_design(output_path, is_preview=False):
    target_w = PREVIEW_WIDTH if is_preview else PRINT_WIDTH
    target_h = PREVIEW_HEIGHT if is_preview else PRINT_HEIGHT
    scale = get_scale(target_w, target_h)

    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, target_w, target_h)
    ctx = cairo.Context(surface)
    ctx.scale(scale, scale)

    if is_preview:
        ctx.set_source_rgb(*NEON_YELLOW)
        ctx.paint()

    items = ["Lead", "Follow", "Switch"]
    text_font_size = 124
    check_size = 128
    check_gap = 32
    line_spacing = 165

    # Measure to center
    ctx.select_font_face(FONT_NAME, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(text_font_size)

    max_text_w = 0
    for item in items:
        ext = get_text_extents(ctx, item)
        max_text_w = max(max_text_w, ext.x_advance)

    group_w = check_size + check_gap + max_text_w
    group_h = (len(items) - 1) * line_spacing + text_font_size
    start_x = (DESIGN_WIDTH - group_w) / 2
    start_y = (DESIGN_HEIGHT - group_h) / 2 + 100 # Shift down slightly for back placement

    for i, item in enumerate(items):
        curr_y = start_y + (i * line_spacing)
        # Vertically center check with text cap height
        check_y = curr_y - (text_font_size * 0.75) + (text_font_size * 0.7 - check_size)/2
        draw_svg_as_image(ctx, CHECK_SVG, start_x, check_y, check_size, check_size)
        draw_text_with_stroke(ctx, item, start_x + check_size + check_gap, curr_y, text_font_size)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_shapes_sheet(output_path):
    SIZE = 1200
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, SIZE, SIZE)
    ctx = cairo.Context(surface)

    # Off-white background
    ctx.set_source_rgb(0.97, 0.97, 0.98)
    ctx.paint()

    # Dividers
    ctx.set_source_rgb(0.90, 0.90, 0.92)
    ctx.set_line_width(4)
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
        draw_svg_as_image(ctx, asset['path'], 60, 60, 480, 480)

        # Label
        ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        ctx.set_font_size(24)
        ctx.set_source_rgb(0.2, 0.2, 0.25)
        ext = get_text_extents(ctx, asset['label'])
        ctx.move_to(300 - ext.width/2, 550)
        ctx.show_text(asset['label'])
        ctx.restore()

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

import subprocess

if __name__ == "__main__":
    if not check_font_availability(FONT_NAME):
        print(f"CRITICAL ERROR: Font '{FONT_NAME}' not found in system font cache.", file=sys.stderr)
        print(f"Please place the font in scripts/merch/fonts/ and run scripts/merch/setup_env.sh", file=sys.stderr)
        sys.exit(1)

    public_dir = "public/assets/merch"
    previews_dir = f"{public_dir}/previews"
    print_dir = f"{public_dir}/print"
    os.makedirs(previews_dir, exist_ok=True)
    os.makedirs(print_dir, exist_ok=True)

    # Previews (Neon Yellow)
    generate_front_design(f"{previews_dir}/shirt_front_preview.png", is_preview=True)
    generate_back_design(f"{previews_dir}/shirt_back_preview.png", is_preview=True)
    generate_shapes_sheet(f"{previews_dir}/rainbow_shapes_sheet.png")

    # Print Assets (Transparent)
    generate_front_design(f"{print_dir}/shirt_front_print.png", is_preview=False)
    generate_back_design(f"{print_dir}/shirt_back_print.png", is_preview=False)
