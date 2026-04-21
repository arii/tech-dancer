import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        # Use the correct base path for the preview server
        await page.goto('http://localhost:4173/tech-dancer/')

        # Wait for content to load
        await page.wait_for_selector('h1')

        # Capture Hero and Recent Posts
        await page.screenshot(path='home_redesign_1.png', full_page=False)

        # Scroll down to see more of the blog posts
        await page.evaluate('window.scrollTo(0, 1000)')
        await asyncio.sleep(1) # Wait for any animations
        await page.screenshot(path='home_redesign_2.png', full_page=False)

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
