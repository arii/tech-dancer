# Merch Design Generation

This directory contains logic for generating repeatable, high-resolution merch assets for the Booomtick store.

## Prerequisites

1.  **Cairo & CairoSVG**: The generation scripts require Cairo and its Python bindings.
    ```bash
    sudo apt-get install libcairo2-dev
    pip install cairocffi
    ```

2.  **Verification Dependencies**: The verification script requires Pillow.
    ```bash
    pip install Pillow
    ```

3.  **Cooper Black Font**:
    To maintain the retro typography style, the "Cooper Black" font must be installed on your system.
    - Obtain a licensed copy of `CooperBlack.ttf`.
    - Place it in `scripts/merch/fonts/`.
    - Run the setup script to register it:
      ```bash
      bash scripts/merch/setup_env.sh
      ```
    - The generator will fail loudly if the font is not found.

## Project Structure

- `generate_designs.py`: The main design engine. It draws brand icons (Heart, Check, Star, Sparkle) directly using Cairo paths to ensure perfect alignment and 6-color brand compliance. It handles:
  - High-resolution print assets (4500x5400px, transparent).
  - Low-resolution previews (1200x1200px, neon-yellow background).
  - Optical centering and balanced composition for front ("LOVE") and back ("Lead/Follow/Switch") designs.
- `verify_assets.py`: Automated QA script to check dimensions and color modes.
- `fonts/`: Directory for the Cooper Black font file (git-ignored).

## Usage

1.  **Generate PNGs**:
    ```bash
    python3 scripts/merch/generate_designs.py
    ```

2.  **Verify Assets**:
    ```bash
    python3 scripts/merch/verify_assets.py
    ```

## Output

Generated assets are saved to `public/assets/merch/`:
- `print/`: Transparent PNGs ready for Printful upload.
- `previews/`: Preview images for the website or manual QA.

## Visual QA Checklist

- [ ] **Reference Matching**: Does the heart in `LOVE` match the reference retro "puffy" heart?
- [ ] **Palette**: Are the colors exact (`#e21b18`, `#ef7614`, `#efc106`, `#5eaa37`, `#3583c2`, `#8247a5`)?
- [ ] **Composition**: Is the "LOVE" group optically centered? Does the heart read as a "V"?
- [ ] **Back Design**: Are the checks and text consistently aligned and centered?
- [ ] **Resolution**: Are print assets 4500x5400px?
- [ ] **Transparency**: Do print assets have a transparent background (RGBA)?
