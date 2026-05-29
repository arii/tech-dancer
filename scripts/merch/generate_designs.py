try:
    import cairocffi as cairo
except ImportError:
    import cairo
import cairosvg
import io
import os

# --- CENTRALIZED CONFIGURATION ---
WIDTH, HEIGHT = 1200, 1200
NEON_YELLOW = (0.88, 0.96, 0.0)

def load_svg_to_surface(svg_path, target_width, target_height):
    """Converts an SVG file to a Cairo PNG surface scaled to target dimensions."""
    try:
        png_data = cairosvg.svg2png(url=svg_path, output_width=target_width, output_height=target_height)
        return cairo.ImageSurface.create_from_png(io.BytesIO(png_data))
    except Exception as e:
        print(f"Error loading {svg_path}: {e}")
        return cairo.ImageSurface(cairo.FORMAT_ARGB32, target_width, target_height)

def draw_svg_as_image(ctx, svg_path, x, y, width, height):
    """Renders any SVG file as an image onto the Cairo context."""
    svg_surface = load_svg_to_surface(svg_path, width, height)
    ctx.set_source_surface(svg_surface, x, y)
    ctx.paint()

def draw_text_with_stroke(ctx, text, x, y, font_size, font_face="Cooper Black"):
    """Draws white text with a thick black outline matching the Cooper style.
       NOTE: This requires the font to be registered with the system fontconfig cache.
    """
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

def generate_front_design(output_path, heart_svg):
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, WIDTH, HEIGHT)
    ctx = cairo.Context(surface)

    ctx.set_source_rgb(*NEON_YELLOW)
    ctx.paint()

    # Render "L O E"
    draw_text_with_stroke(ctx, "L", 280, 660, 240)
    draw_text_with_stroke(ctx, "O", 420, 660, 240)
    draw_text_with_stroke(ctx, "E", 780, 660, 240)

    # Render rainbow heart as the "V"
    draw_svg_as_image(ctx, heart_svg, 590, 480, 180, 180)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_back_design(output_path, check_svg):
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, WIDTH, HEIGHT)
    ctx = cairo.Context(surface)

    ctx.set_source_rgb(*NEON_YELLOW)
    ctx.paint()

    start_y = 460
    line_spacing = 170
    text_font_size = 120
    check_size = 110
    check_offset_x = 320
    text_offset_x = 460
    items = ["Lead", "Follow", "Switch"]

    for i, item in enumerate(items):
        current_y = start_y + (i * line_spacing)
        draw_svg_as_image(ctx, check_svg, check_offset_x, current_y - (text_font_size * 0.78), check_size, check_size)
        draw_text_with_stroke(ctx, item, text_offset_x, current_y, text_font_size)

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

def generate_shapes_sheet(output_path, assets):
    SIZE = 1200
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, SIZE, SIZE)
    ctx = cairo.Context(surface)

    # Off-white modern grid background
    ctx.set_source_rgb(0.97, 0.97, 0.98)
    ctx.paint()

    # Draw soft layout dividers
    ctx.set_source_rgb(0.90, 0.90, 0.92)
    ctx.set_line_width(4)
    ctx.move_to(600, 40)
    ctx.line_to(600, 1160)
    ctx.move_to(40, 600)
    ctx.line_to(1160, 600)
    ctx.stroke()

    for i, asset in enumerate(assets):
        tx = (i % 2) * 600
        ty = (i // 2) * 600
        ctx.save()
        ctx.translate(tx, ty)
        draw_svg_as_image(ctx, asset['path'], 60, 60, 480, 480)

        # Label
        ctx.select_font_face("Sans", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
        ctx.set_font_size(24)
        ctx.set_source_rgb(0.2, 0.2, 0.25)
        x_bearing, y_bearing, width, height, x_advance, y_advance = ctx.text_extents(asset['label'])
        ctx.move_to(300 - width/2, 550)
        ctx.show_text(asset['label'])
        ctx.restore()

    surface.write_to_png(output_path)
    print(f"✓ Generated {output_path}")

if __name__ == "__main__":
    assets_dir = "scripts/merch/assets"
    output_dir = "public/assets/merch"
    os.makedirs(output_dir, exist_ok=True)

    generate_front_design(f"{output_dir}/shirt_front.png", f"{assets_dir}/rainbow_heart.svg")
    generate_back_design(f"{output_dir}/shirt_back.png", f"{assets_dir}/rainbow_check.svg")

    shapes_assets = [
        {'path': f"{assets_dir}/rainbow_check.svg", 'label': "Rainbow Check"},
        {'path': f"{assets_dir}/rainbow_heart.svg", 'label': "Rainbow Heart"},
        {'path': f"{assets_dir}/rainbow_star.svg", 'label': "Rainbow Star"},
        {'path': f"{assets_dir}/rainbow_sparkle.svg", 'label': "Rainbow Sparkle"},
    ]
    generate_shapes_sheet(f"{output_dir}/rainbow_shapes_sheet.png", shapes_assets)
