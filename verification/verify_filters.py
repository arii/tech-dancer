import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Events feed
        await page.goto("http://localhost:4173/events")
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.wait_for_selector("text=Upcoming Event Resource Guides")
        await page.screenshot(path="verification/screenshots/events_feed_filters.png")

        # Event guide - using the correct slug
        await page.goto("http://localhost:4173/events/swingtacular-the-galactic-open")
        await page.wait_for_selector("h1")
        await page.screenshot(path="verification/screenshots/event_guide_top.png")

        # Scroll down to see product grids
        await page.evaluate("window.scrollTo(0, 1500)")
        await asyncio.sleep(2)
        await page.screenshot(path="verification/screenshots/event_guide_products_1.png")

        await page.evaluate("window.scrollTo(0, 3000)")
        await asyncio.sleep(2)
        await page.screenshot(path="verification/screenshots/event_guide_products_2.png")

        # Mobile view
        mobile_context = await browser.new_context(viewport={"width": 375, "height": 667}, is_mobile=True)
        mobile_page = await mobile_context.new_page()
        await mobile_page.goto("http://localhost:4173/events/swingtacular-the-galactic-open")
        await mobile_page.wait_for_selector("h1")
        await mobile_page.screenshot(path="verification/screenshots/mobile_event_guide_top.png")

        await mobile_page.evaluate("window.scrollTo(0, 2000)")
        await asyncio.sleep(2)
        await mobile_page.screenshot(path="verification/screenshots/mobile_event_guide_products.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
