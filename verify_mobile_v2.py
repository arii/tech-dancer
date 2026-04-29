
import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 12 viewport
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        print("Navigating to http://localhost:3000")
        await page.goto('http://localhost:3000')
        await page.wait_for_timeout(2000)

        # Screenshot of the top viewport
        await page.screenshot(path='/home/jules/verification/screenshots/mobile_viewport_top.png')

        # Check if bottom nav is visible
        bottom_nav = page.locator('nav.fixed.bottom-0')
        is_visible = await bottom_nav.is_visible()
        print(f"Bottom navigation visible: {is_visible}")

        # Scroll down and check FilterBar stickiness (need to be on a page with FilterBar, e.g., Blog)
        print("Navigating to /blog")
        await page.goto('http://localhost:3000/blog')
        await page.wait_for_timeout(2000)

        await page.screenshot(path='/home/jules/verification/screenshots/blog_top.png')

        # Scroll down
        await page.evaluate("window.scrollTo(0, 500)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path='/home/jules/verification/screenshots/blog_scrolled.png')

        # Check if FilterBar is sticky
        # FilterBar has class 'sticky top-16' or similar
        filter_bar = page.locator('div.sticky')
        box = await filter_bar.bounding_box()
        if box:
            print(f"FilterBar Y position after scroll: {box['y']}")
            # Since it's sticky top-16 (64px), it should be around 64px from the top of the viewport
            # But bounding_box 'y' is relative to the viewport?
            # In Playwright, bounding_box 'y' is relative to the viewport.

        # Take a screenshot of the bottom navigation explicitly
        await page.evaluate("window.scrollTo(0, 0)")
        # Make sure we are at the bottom to see it? No, it's fixed.
        # Let's just capture the bottom part of the viewport
        await page.screenshot(path='/home/jules/verification/screenshots/mobile_viewport_with_nav.png')

        await browser.close()

if __name__ == "__main__":
    os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
    asyncio.run(verify())
