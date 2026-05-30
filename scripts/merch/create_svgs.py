import os

SVG_TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <clipPath id="rainbow-clip">
      <path d="{path_d}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#rainbow-clip)">
    {stripes}
  </g>
  <path d="{path_d}" fill="none" stroke="#000" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""

RAINBOW_HEX = [
    "#e21b18",
    "#ef7614",
    "#efc106",
    "#5eaa37",
    "#3583c2",
    "#8247a5",
]

# Exact paths from source/reference to ensure 100% fidelity
HEART_PATH = "M300 200c0-100-200-100-200 50s200 250 200 300c0-50 200-150 200-300s-200-150-200-50z"
CHECK_PATH = "M100 350q75 150 150 150c100 0 200-200 300-400-100 150-200 300-300 300-50 0-100-50-150-100z"

# Retro puffy star
STAR_PATH = "M300 80q25 109 69 144q108-4 140 40q-91 36-120 76q37 100-18 140q-71-60-142 0q-55-40-18-140q-29-40-120-76q32-44 140-40q44-35 69-144z"

# Retro puffy sparkle
SPARKLE_PATH = "M300 75c0 110 115 225 225 225-110 0-225 115-225 225 0-110-115-225-225-225 110 0 225-115 225-225z"

def generate_stripes(x_start, width):
    stripe_width = width / 6
    stripes = []
    for i, color in enumerate(RAINBOW_HEX):
        x = x_start + i * stripe_width
        stripes.append(f'<rect x="{x:.2f}" y="0" width="{stripe_width:.2f}" height="600" fill="{color}"/>')
    return "\n    ".join(stripes)

def save_svg(filename, path_d, x_start, width):
    stripes = generate_stripes(x_start, width)
    with open(filename, "w") as f:
        f.write(SVG_TEMPLATE.format(path_d=path_d, stripes=stripes))
    print(f"✓ Created {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/generated"
    os.makedirs(output_dir, exist_ok=True)

    # Heart: x goes from 100 to 500, width = 400
    save_svg(f"{output_dir}/rainbow_heart.svg", HEART_PATH, 100, 400)

    # Checkmark: x goes from 100 to 550, width = 450
    save_svg(f"{output_dir}/rainbow_check.svg", CHECK_PATH, 100, 450)

    # Star: x goes from ~90 to ~510, width = ~420
    save_svg(f"{output_dir}/rainbow_star.svg", STAR_PATH, 90, 420)

    # Sparkle: x goes from 75 to 525, width = 450
    save_svg(f"{output_dir}/rainbow_sparkle.svg", SPARKLE_PATH, 75, 450)
