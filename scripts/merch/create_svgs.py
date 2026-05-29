try:
    import cairocffi as cairo
except ImportError:
    import cairo
import math
import os
import subprocess

# --- CENTRALIZED CONFIGURATION ---
WIDTH, HEIGHT = 1200, 1200
NEON_YELLOW = (0.88, 0.96, 0.0)
DEFAULT_LINE_WIDTH = 16

RAINBOW_COLORS = [
    (0.89, 0.10, 0.11),  # Red
    (0.96, 0.49, 0.00),  # Orange
    (0.98, 0.81, 0.00),  # Yellow
    (0.31, 0.65, 0.26),  # Green
    (0.17, 0.47, 0.76),  # Blue
    (0.52, 0.28, 0.63)   # Purple
]

def draw_outline(ctx, line_width=DEFAULT_LINE_WIDTH):
    """Draws a bold, rounded black outline around the current path."""
    ctx.set_source_rgb(0, 0, 0)
    ctx.set_line_width(line_width)
    ctx.set_line_join(cairo.LINE_JOIN_ROUND)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.stroke()

def draw_star_path(ctx):
    """Draws a custom, organic, chubby 5-point star.

    This function generates a star shape using 10 vertices (5 tips and 5 valleys).
    To achieve an 'organic' look, segments between vertices are drawn as cubic
    Bezier curves. The curves are calculated by creating a virtual control point
    between each pair of vertices and converting the resulting quadratic Bezier
    to its cubic equivalent for Cairo.
    """
    center_x, center_y = 300, 300
    r_outer = 210  # Radius for the star tips
    r_inner = 95   # Radius for the star valleys

    # 1. Generate the 10 core vertices of the star
    points = []
    for i in range(5):
        angle_out = -math.pi / 2 + i * (2 * math.pi / 5)
        angle_in = angle_out + math.pi / 5
        points.append((center_x + r_outer * math.cos(angle_out), center_y + r_outer * math.sin(angle_out)))
        points.append((center_x + r_inner * math.cos(angle_in), center_y + r_inner * math.sin(angle_in)))

    # 2. Draw curved segments between vertices
    ctx.move_to(points[0][0], points[0][1])
    for i in range(10):
        next_idx = (i + 1) % 10
        P0_x, P0_y = ctx.get_current_point()
        next_pt_x, next_pt_y = points[next_idx]

        # Calculate a virtual quadratic control point (P1) that 'puffs' the segment
        mid_angle = -math.pi/2 + (i + 0.5) * (math.pi / 5)
        # r_ctrl factor > 1.0 makes legs bulge; < 1.0 makes them pinched
        r_ctrl = (r_outer + r_inner) / 2 * (1.15 if i % 2 == 0 else 0.85)
        ctrl_x = center_x + r_ctrl * math.cos(mid_angle)
        ctrl_y = center_y + r_ctrl * math.sin(mid_angle)

        # Convert quadratic Bezier (P0, P1, next_pt) to cubic (P0, CP1, CP2, next_pt)
        # Formula: CP1 = P0 + 2/3(P1-P0), CP2 = next_pt + 2/3(P1-next_pt)
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

def draw_heart_path(ctx):
    """Draws a premium, chubby heart shape."""
    ctx.move_to(300, 200)
    ctx.curve_to(300, 100, 100, 100, 100, 250)
    ctx.curve_to(100, 400, 300, 500, 300, 550)
    ctx.curve_to(300, 500, 500, 400, 500, 250)
    ctx.curve_to(500, 100, 300, 100, 300, 200)
    ctx.close_path()

def draw_check_path(ctx):
    """Draws a stylish, organic rainbow checkmark."""
    ctx.move_to(100, 350)
    ctx.curve_to(150, 450, 200, 500, 250, 500)
    ctx.curve_to(350, 500, 450, 300, 550, 100)
    ctx.curve_to(450, 250, 350, 400, 250, 400)
    ctx.curve_to(200, 400, 150, 350, 100, 300)
    ctx.close_path()

def render_path_to_svg(filename, draw_func, canvas_size=600, line_width=DEFAULT_LINE_WIDTH):
    """Renders a path drawing function to an SVG file with rainbow stripes and outline.
    Optimized to minimize redundant clipPath definitions.
    """
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

    print(f"✓ Created and Optimized {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/assets"
    os.makedirs(output_dir, exist_ok=True)

    render_path_to_svg(f"{output_dir}/rainbow_star.svg", draw_star_path)
    render_path_to_svg(f"{output_dir}/rainbow_sparkle.svg", draw_sparkle_path)
    render_path_to_svg(f"{output_dir}/rainbow_heart.svg", draw_heart_path)
    render_path_to_svg(f"{output_dir}/rainbow_check.svg", draw_check_path)
