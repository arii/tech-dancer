try:
    import cairocffi as cairo
except ImportError:
    import cairo
import os

# --- CONFIGURATION ---
WIDTH, HEIGHT = 600, 600
DEFAULT_LINE_WIDTH = 16

# Reference Palette (from PR feedback)
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
    # Cairo SVG surfaces might not add newline at EOF, ensure it
    with open(filename, "a") as f:
        f.write("\n")
    print(f"✓ Created {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/generated"
    os.makedirs(output_dir, exist_ok=True)

    render_path_to_svg(f"{output_dir}/rainbow_star.svg", draw_star_path)
    render_path_to_svg(f"{output_dir}/rainbow_sparkle.svg", draw_sparkle_path)
