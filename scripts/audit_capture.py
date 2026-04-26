import asyncio
from playwright.async_api import async_playwright
import os
from scroll_helper import get_scroll_fn

# Configuration
BASE_URL = 'http://localhost:4173/tech-dancer'
OUTPUT_DIR = './design_audit'
PAGES = {
    "home": "/",
    "blog": "/blog",
    "research": "/research",
    "about": "/about"
}

async def capture_page(browser, name, path):
    page = await browser.new_page(viewport={'width': 1440, 'height': 900})
    await page.goto(f"{BASE_URL}{path}", wait_until="networkidle")

    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Scroll to bottom to trigger lazy loading
    await page.evaluate(get_scroll_fn())

    # Core captures for Impeccable Audit
    await page.screenshot(path=f"{OUTPUT_DIR}/{name}_full.png", full_page=True)
    await page.screenshot(path=f"{OUTPUT_DIR}/{name}_hero.png", clip={"x": 0, "y": 0, "width": 1440, "height": 600})

    grid = await page.query_selector(".grid, [class*='Grid'], .cards")
    if grid:
        await grid.screenshot(path=f"{OUTPUT_DIR}/{name}_grid.png")

    print(f"Captured {name}")
    await page.close()

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        await asyncio.gather(*[capture_page(browser, name, path) for name, path in PAGES.items()])
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
