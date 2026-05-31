try:
    import cairocffi as cairo
except ImportError:
    import cairo
import io
import os
import sys
import subprocess

# --- ASSET PATHS ---
FONTS_DIR = "scripts/merch/fonts"
PUBLIC_ASSETS_DIR = "public/assets/merch"

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

# Reference Palette (from PR feedback)
RAINBOW_HEX = [
    "#e21b18", # Red
    "#ef7614", # Orange
    "#efc106", # Yellow
    "#5eaa37", # Green
    "#3583c2", # Blue
    "#8247a5", # Purple
]

# Front Design Constants
FRONT_FONT_SIZE = 240
FRONT_GAP = 16
# Optimal heart size for 'V' visual weight (94% of cap height)
FRONT_HEART_SIZE = 210
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

RAINBOW_COLORS = [hex_to_rgb(h) for h in RAINBOW_HEX]
NEON_YELLOW_RGB = hex_to_rgb(NEON_YELLOW_HEX)

# --- SHAPE PATHS ---

def draw_heart_path(ctx):
    """High-fidelity 'puffy' heart path based on reference proportions."""
    ctx.move_to(300, 200)
    ctx.curve_to(300, 100, 100, 100, 100, 250)
    ctx.curve_to(100, 400, 300, 500, 300, 550)
    ctx.curve_to(300, 500, 500, 400, 500, 250)
    ctx.curve_to(500, 100, 300, 100, 300, 200)
    ctx.close_path()

def draw_check_path(ctx):
    """High-fidelity checkmark path matching the reference swoop."""
    ctx.move_to(100, 350)
    # Quadratic approximation: (100,350) Q(175,500) (250,500)
    ctx.curve_to(150, 450, 200, 500, 250, 500)
    ctx.curve_to(350, 500, 450, 300, 550, 100)
    ctx.curve_to(450, 250, 350, 400, 250, 400)
    ctx.curve_to(200, 400, 150, 350, 100, 300)
    ctx.close_path()

def draw_star_path(ctx):
    """Polished, puffy 5-point star path."""
    ctx.move_to(300, 80)
    ctx.curve_to(316.67, 152.67, 346, 203.33, 369, 224)
    ctx.curve_to(441, 221.33, 492.33, 236, 509, 264)
    ctx.curve_to(448.33, 288, 409, 314.67, 389, 340)
    ctx.curve_to(413.67, 406.67, 395.33, 453.33, 371, 480)
    ctx.curve_to(323.67, 440, 276.33, 440, 229, 480)
    ctx.curve_to(204.67, 453.33, 186.33, 406.67, 211, 340)
    ctx.curve_to(191, 314.67, 151.67, 288, 91, 264)
    ctx.curve_to(112.33, 234.67, 163.67, 221.33, 231, 224)
    ctx.curve_to(260.33, 200.67, 283.33, 152.67, 300, 80)
    ctx.close_path()

def draw_sparkle_path(ctx):
    """Puffy 4-point sparkle path."""
    ctx.move_to(300, 75)
    ctx.curve_to(300, 185, 415, 300, 525, 300)
    ctx.curve_to(415, 300, 300, 415, 300, 525)
    ctx.curve_to(300, 415, 185, 300, 75, 300)
    ctx.curve_to(185, 300, 300, 185, 300, 75)
    ctx.close_path()

def draw_rainbow_shape(ctx, draw_func, x, y, size):
    """Renders a shape with 6 aligned rainbow stripes and a black outline."""
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(size / 600.0, size / 600.0)

    # Calculate bounding box of the path to align stripes
    ctx.new_path()
    draw_func(ctx)
    x1, y1, x2, y2 = ctx.path_extents()

    # 1. Clip and paint stripes
    ctx.save()
    ctx.clip()

    shape_w = x2 - x1
    if shape_w == 0: shape_w = 600.0
    stripe_w = shape_w / 6.0

    for i, color in enumerate(RAINBOW_COLORS):
        ctx.set_source_rgb(*color)
        ctx.rectangle(x1 + i * stripe_w, y1, stripe_w + 0.5, y2 - y1)
        ctx.fill()
    ctx.restore()

    # 2. Draw black outline
    draw_func(ctx)
    ctx.set_source_rgb(0, 0, 0)
    ctx.set_line_width(16) # DEFAULT_LINE_WIDTH from create_svgs
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.stroke()

    ctx.restore()

# --- LAYOUT HELPERS ---

def get_scale(target_width, target_height):
    """Calculates scaling factor from design coordinates to target resolution."""
    return target_width / DESIGN_WIDTH

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
        output = subprocess.check_output(["fc-match", font_name], stderr=subprocess.STDOUT).decode()
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
    draw_rainbow_shape(ctx, draw_heart_path, heart_x, heart_y, FRONT_HEART_SIZE)
    curr_x += FRONT_HEART_SIZE + FRONT_GAP

    # E
    draw_text_with_stroke(ctx, "E", curr_x, FRONT_BASE_Y, FRONT_FONT_SIZE)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_back_design(output_path, checked_roles=None, is_preview=False):
    """Generates the 'Lead/Follow/Switch' back shirt design."""
    if checked_roles is None:
        checked_roles = BACK_ITEMS

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
        check_y = (curr_y - cap_height / 2) - (0.5 * BACK_CHECK_SIZE)

        if item in checked_roles:
            draw_rainbow_shape(ctx, draw_check_path, start_x, check_y, BACK_CHECK_SIZE)
        else:
            # Draw empty checkbox outline (retro circle style)
            ctx.set_source_rgb(0, 0, 0)
            ctx.set_line_width(BACK_CHECK_SIZE * 0.12)
            ctx.arc(start_x + BACK_CHECK_SIZE/2, check_y + BACK_CHECK_SIZE/2, BACK_CHECK_SIZE/3, 0, 2*3.14159)
            ctx.stroke_preserve()
            ctx.set_source_rgb(1, 1, 1)
            ctx.fill()

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
        {'func': draw_check_path, 'label': "Rainbow Check"},
        {'func': draw_heart_path, 'label': "Rainbow Heart"},
        {'func': draw_star_path, 'label': "Rainbow Star"},
        {'func': draw_sparkle_path, 'label': "Rainbow Sparkle"},
    ]

    for i, asset in enumerate(shapes):
        tx = (i % 2) * 600
        ty = (i // 2) * 600
        draw_rainbow_shape(ctx, asset['func'], tx + 60, ty + 60, 480)

        # Label
        ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        ctx.set_font_size(SHEET_LABEL_FONT_SIZE)
        ctx.set_source_rgb(0.2, 0.2, 0.25)
        ext = get_text_extents(ctx, asset['label'])
        ctx.move_to(tx + 300 - ext.width/2, ty + 550)
        ctx.show_text(asset['label'])

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

if __name__ == "__main__":
    if not check_font_availability(FONT_NAME):
        print(f"CRITICAL ERROR: Font '{FONT_NAME}' not found in system font cache.", file=sys.stderr)
        sys.exit(1)

    previews_dir = f"{PUBLIC_ASSETS_DIR}/previews"
    print_dir = f"{PUBLIC_ASSETS_DIR}/print"
    os.makedirs(previews_dir, exist_ok=True)
    os.makedirs(print_dir, exist_ok=True)

    # 1. Front (Always same)
    generate_front_design(f"{previews_dir}/shirt_front_preview.png", is_preview=True)
    generate_front_design(f"{print_dir}/shirt_front_print.png", is_preview=False)

    # 2. Back variations
    variations = [
        ("lead", ["Lead"]),
        ("follow", ["Follow"]),
        ("all", ["Lead", "Follow", "Switch"])
    ]

    for suffix, roles in variations:
        generate_back_design(f"{previews_dir}/shirt_back_{suffix}_preview.png", checked_roles=roles, is_preview=True)
        generate_back_design(f"{print_dir}/shirt_back_{suffix}_print.png", checked_roles=roles, is_preview=False)

    # 3. Reference sheet
    generate_shapes_sheet(f"{previews_dir}/rainbow_shapes_sheet.png")
