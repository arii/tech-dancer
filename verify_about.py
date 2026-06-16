import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch()

        # Desktop verification
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        await page.goto("http://localhost:3000/about")
        # Wait for content to reveal
        await page.wait_for_timeout(2000)

        os.makedirs("/home/jules/verification", exist_ok=True)
        await page.screenshot(path="/home/jules/verification/about_desktop.png", full_page=True)
        print("Desktop screenshot saved.")

        # Mobile verification
        mobile_page = await browser.new_page(viewport={"width": 375, "height": 812})
        await mobile_page.goto("http://localhost:3000/about")
        await mobile_page.wait_for_timeout(2000)

        await mobile_page.screenshot(path="/home/jules/verification/about_mobile.png", full_page=True)
        print("Mobile screenshot saved.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
