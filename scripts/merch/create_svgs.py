try:
    import cairocffi as cairo
except ImportError:
    import cairo
import math
import os
import subprocess

# --- CENTRALIZED CONFIGURATION ---
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

def draw_outline(ctx, line_width=DEFAULT_LINE_WIDTH):
    """Draws a bold, rounded black outline around the current path."""
    ctx.set_source_rgb(0, 0, 0)
    ctx.set_line_width(line_width)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.stroke()

def draw_star_path(ctx):
    """Draws a custom, organic, chubby 5-point star."""
    center_x, center_y = 300, 300
    r_outer = 210  # Radius for the star tips
    r_inner = 95   # Radius for the star valleys

    points = []
    for i in range(5):
        angle_out = -math.pi / 2 + i * (2 * math.pi / 5)
        angle_in = angle_out + math.pi / 5
        points.append((center_x + r_outer * math.cos(angle_out), center_y + r_outer * math.sin(angle_out)))
        points.append((center_x + r_inner * math.cos(angle_in), center_y + r_inner * math.sin(angle_in)))

    ctx.move_to(points[0][0], points[0][1])
    for i in range(10):
        next_idx = (i + 1) % 10
        P0_x, P0_y = ctx.get_current_point()
        next_pt_x, next_pt_y = points[next_idx]
        mid_angle = -math.pi/2 + (i + 0.5) * (math.pi / 5)
        r_ctrl = (r_outer + r_inner) / 2 * (1.15 if i % 2 == 0 else 0.85)
        ctrl_x = center_x + r_ctrl * math.cos(mid_angle)
        ctrl_y = center_y + r_ctrl * math.sin(mid_angle)
        ctx.curve_to(P0_x + 2/3 * (ctrl_x - P0_x), P0_y + 2/3 * (ctrl_y - P0_y),
                     next_pt_x + 2/3 * (ctrl_x - next_pt_x), next_pt_y + 2/3 * (ctrl_y - next_pt_y),
                     next_pt_x, next_pt_y)
    ctx.close_path()

def draw_sparkle_path(ctx):
    """Draws a beautiful, puffy 4-pointed retro sparkle."""
    top = (300, 75)
    right = (525, 300)
    bottom = (300, 525)
    left = (75, 300)
    ctx.move_to(*top)
    ctx.curve_to(300, 185, 415, 300, *right)
    ctx.curve_to(415, 300, 300, 415, *bottom)
    ctx.curve_to(300, 415, 185, 300, *left)
    ctx.curve_to(185, 300, 300, 185, *top)
    ctx.close_path()

def render_path_to_svg(filename, draw_func, canvas_size=600, line_width=DEFAULT_LINE_WIDTH):
    """Renders a path drawing function to an SVG file with rainbow stripes and outline."""
    surface = cairo.SVGSurface(filename, canvas_size, canvas_size)
    ctx = cairo.Context(surface)

    ctx.save()
    draw_func(ctx)
    ctx.clip()

    num_colors = len(RAINBOW_COLORS)
    stripe_width = canvas_size / num_colors
    for i, color in enumerate(RAINBOW_COLORS):
        ctx.set_source_rgb(*color)
        ctx.rectangle(i * stripe_width, 0, stripe_width, canvas_size)
        ctx.fill()
    ctx.restore()

    # Draw the outline separately
    draw_func(ctx)
    draw_outline(ctx, line_width)

    surface.finish()

    # Run SVGO optimization if available
    try:
        subprocess.run(["pnpm", "svgo", filename, "--quiet"], check=False)
    except Exception:
        pass

    print(f"✓ Created {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/generated"
    os.makedirs(output_dir, exist_ok=True)

    render_path_to_svg(f"{output_dir}/rainbow_star.svg", draw_star_path)
    render_path_to_svg(f"{output_dir}/rainbow_sparkle.svg", draw_sparkle_path)
