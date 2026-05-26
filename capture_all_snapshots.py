
import asyncio
import os
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})

        # Mapping of route to snapshot name
        targets = {
            "/": "home-chromium-linux.png",
            "/blog": "blog-chromium-linux.png",
            "/gear": "gear-chromium-linux.png",
            "/research": "research-chromium-linux.png",
            "/about": "about-chromium-linux.png",
            "/contact": "contact-chromium-linux.png",
            "/ux-auditor": "ux-auditor-chromium-linux.png",
            "/preview": "preview-chromium-linux.png",
            "/merch": "merch-chromium-linux.png",
            "/events/boogie-by-the-bay": "event-guide-chromium-linux.png",
            "/gear/test-gear-1": "gear-detail-chromium-linux.png" # Guessed path for gear-detail
        }

        for route, filename in targets.items():
            print(f"Capturing {route} -> {filename}...")
            try:
                await page.goto(f"http://localhost:3000{route}", wait_until="networkidle")
                # Wait for fonts and content
                await page.evaluate("document.fonts.ready")
                await asyncio.sleep(2)

                # Scroll to load everything
                await page.evaluate("""async () => {
                    const scrollable = document.querySelector('main') || document.documentElement;
                    scrollable.scrollTo(0, scrollable.scrollHeight);
                    await new Promise(r => setTimeout(r, 1000));
                    scrollable.scrollTo(0, 0);
                    await new Promise(r => setTimeout(r, 500));
                }""")

                await page.screenshot(path=filename, full_page=True)
            except Exception as e:
                print(f"Failed to capture {route}: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture())
