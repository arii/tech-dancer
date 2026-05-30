try:
    import cairocffi as cairo
except ImportError:
    import cairo
import math
import os

# --- CONFIGURATION ---
WIDTH, HEIGHT = 600, 600
DEFAULT_LINE_WIDTH = 16

# Reference Palette
RAINBOW_HEX = [
    "#e21b18",
    "#ef7614",
    "#efc106",
    "#5eaa37",
    "#3583c2",
    "#8247a5",
]

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4))

RAINBOW_COLORS = [hex_to_rgb(h) for h in RAINBOW_HEX]

def draw_heart_path(ctx):
    """High-fidelity heart path replicated from reference SVG."""
    ctx.move_to(300, 200)
    ctx.curve_to(300, 100, 100, 100, 100, 250)
    ctx.curve_to(100, 400, 300, 500, 300, 550)
    ctx.curve_to(300, 500, 500, 400, 500, 250)
    ctx.curve_to(500, 100, 300, 100, 300, 200)
    ctx.close_path()

def draw_check_path(ctx):
    """High-fidelity checkmark path replicated from reference SVG."""
    # Convert quadratic q75 150 150 150 to cubic
    ctx.move_to(100, 350)
    ctx.curve_to(150, 450, 200, 500, 250, 500)
    # Cubic segments
    ctx.curve_to(350, 500, 450, 300, 550, 100)
    ctx.curve_to(450, 250, 350, 400, 250, 400)
    ctx.curve_to(200, 400, 150, 350, 100, 300)
    ctx.close_path()

def draw_star_path(ctx):
    """Polished, puffy 5-point star path."""
    # M300 80q25 109 69 144q108-4 140 40q-91 36-120 76q37 100-18 140q-71-60-142 0q-55-40-18-140q-29-40-120-76q32-44 140-40q44-35 69-144z
    # Converting Qs to Cs
    ctx.move_to(300, 80)
    # q25 109 69 144
    ctx.curve_to(316.67, 152.67, 346, 203.33, 369, 224)
    # q108-4 140 40
    ctx.curve_to(441, 221.33, 492.33, 236, 509, 264)
    # q-91 36-120 76
    ctx.curve_to(448.33, 288, 409, 314.67, 389, 340)
    # q37 100-18 140
    ctx.curve_to(413.67, 406.67, 395.33, 453.33, 371, 480)
    # q-71-60-142 0
    ctx.curve_to(323.67, 440, 276.33, 440, 229, 480)
    # q-55-40-18-140
    ctx.curve_to(204.67, 453.33, 186.33, 406.67, 211, 340)
    # q-29-40-120-76
    ctx.curve_to(191, 314.67, 151.67, 288, 91, 264)
    # q32-44 140-40
    ctx.curve_to(112.33, 234.67, 163.67, 221.33, 231, 224)
    # q44-35 69-144
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

def render_path_to_svg(filename, draw_func, canvas_size=600):
    """Renders a Cairo path function to an SVG with rainbow stripes and outline."""
    surface = cairo.SVGSurface(filename, canvas_size, canvas_size)
    ctx = cairo.Context(surface)

    # 1. Clip and paint stripes
    ctx.save()
    draw_func(ctx)
    ctx.clip()
    stripe_width = canvas_size / 6
    for i, color in enumerate(RAINBOW_COLORS):
        ctx.set_source_rgb(*color)
        ctx.rectangle(i * stripe_width, 0, stripe_width, canvas_size)
        ctx.fill()
    ctx.restore()

    # 2. Draw black outline
    draw_func(ctx)
    ctx.set_source_rgb(0, 0, 0)
    ctx.set_line_width(DEFAULT_LINE_WIDTH)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.stroke()

    surface.finish()
    print(f"✓ Created {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/generated"
    os.makedirs(output_dir, exist_ok=True)

    render_path_to_svg(f"{output_dir}/rainbow_heart.svg", draw_heart_path)
    render_path_to_svg(f"{output_dir}/rainbow_check.svg", draw_check_path)
    render_path_to_svg(f"{output_dir}/rainbow_star.svg", draw_star_path)
    render_path_to_svg(f"{output_dir}/rainbow_sparkle.svg", draw_sparkle_path)
