import asyncio
from playwright.async_api import async_playwright
import os

# Configuration
BASE_URL = 'http://localhost:4173/tech-dancer' # Using preview server port and base path
OUTPUT_DIR = './design_audit'
PAGES = {
    "home": "/",
    "blog": "/blog",
    "research": "/research",
    "about": "/about"
}

async def capture_page(browser, name, path):
    page = await browser.new_page(viewport={'width': 1440, 'height': 900})
    await page.goto(f"{BASE_URL}{path}")

    # Wait for hydration/animations
    await page.wait_for_load_state("networkidle")
    await asyncio.sleep(2)  # Increased sleep for heavy animations

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
