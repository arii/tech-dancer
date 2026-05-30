import os

SVG_TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <clipPath id="rainbow-clip">
      <path d="{path_d}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#rainbow-clip)">
    <rect x="0" y="0" width="100" height="600" fill="#e21b18"/>
    <rect x="100" y="0" width="100" height="600" fill="#ef7614"/>
    <rect x="200" y="0" width="100" height="600" fill="#efc106"/>
    <rect x="300" y="0" width="100" height="600" fill="#5eaa37"/>
    <rect x="400" y="0" width="100" height="600" fill="#3583c2"/>
    <rect x="500" y="0" width="100" height="600" fill="#8247a5"/>
  </g>
  <path d="{path_d}" fill="none" stroke="#000" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""

# Retro puffy star
STAR_PATH = "M300 80q25 109 69 144q108-4 140 40q-91 36-120 76q37 100-18 140q-71-60-142 0q-55-40-18-140q-29-40-120-76q32-44 140-40q44-35 69-144z"

# Retro puffy sparkle
SPARKLE_PATH = "M300 75c0 110 115 225 225 225-110 0-225 115-225 225 0-110-115-225-225-225 110 0 225-115 225-225z"

def save_svg(filename, path_d):
    with open(filename, "w") as f:
        f.write(SVG_TEMPLATE.format(path_d=path_d))
    print(f"✓ Created {filename}")

if __name__ == "__main__":
    output_dir = "scripts/merch/generated"
    os.makedirs(output_dir, exist_ok=True)

    save_svg(f"{output_dir}/rainbow_star.svg", STAR_PATH)
    save_svg(f"{output_dir}/rainbow_sparkle.svg", SPARKLE_PATH)
