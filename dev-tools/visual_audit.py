import asyncio
from playwright.async_api import async_playwright
import os

# Configuration
# Default to port 3000 (Vite) but allow override via VITE_URL or BASE_URL env vars
BASE_URL = os.environ.get('VITE_URL') or os.environ.get('BASE_URL') or 'http://localhost:3000/tech-dancer/'
OUTPUT_DIR = './design_audit'
PAGES = {
    "home": "/",
    "blog": "/blog",
    "research": "/research",
    "about": "/about",
    "gear": "/gear",
    "contact": "/contact"
}

async def capture_page(browser, name, path):
    page = await browser.new_page(viewport={'width': 1440, 'height': 900})
    # Handle base path if necessary - but localhost usually is root
    url = f"{BASE_URL.rstrip('/')}{path}"
    print(f"Capturing {url}...")
    try:
        await page.goto(url)

        # Wait for hydration/animations
        await page.wait_for_load_state("networkidle")
        await asyncio.sleep(2) # Extra buffer for animations

        # 1. Full Page for context
        await page.screenshot(path=f"{OUTPUT_DIR}/{name}_full.png", full_page=True)

        # 2. Hero Section (Anti-pattern: "Purple Gradient Hero" / "Generic Metric Layout")
        await page.screenshot(path=f"{OUTPUT_DIR}/{name}_hero.png", clip={"x": 0, "y": 0, "width": 1440, "height": 600})

        # 3. Card Grids (Anti-pattern: "Cardocalypse" / "Identical Grids")
        # Tries to find the first grid-like element
        grid = await page.query_selector(".grid, [class*='Grid'], .cards")
        if grid:
            await grid.screenshot(path=f"{OUTPUT_DIR}/{name}_grid.png")

        print(f"✅ Captured {name}")
    except Exception as e:
        print(f"❌ Failed to capture {name}: {e}")
    finally:
        await page.close()

async def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, path in PAGES.items():
            await capture_page(browser, name, path)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
