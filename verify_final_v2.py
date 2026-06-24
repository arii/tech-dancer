import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_row_page() if hasattr(browser, 'new_row_page') else await browser.new_page()

        # Site is served under /blog/ prefix
        await page.goto('http://localhost:4173/blog/2026-06-01-shoe-care-modification')
        await page.wait_for_load_state('networkidle')

        # Check for images
        images = page.locator('img')
        img_count = await images.count()
        print(f"Total images: {img_count}")

        for i in range(img_count):
            alt = await images.nth(i).get_attribute('alt')
            src = await images.nth(i).get_attribute('src')
            print(f"Image {i}: alt='{alt}', src='{src}'")

        # Check for affiliate cards
        all_affiliates = page.locator('[data-testid="affiliate-card"]')
        total_affiliates = await all_affiliates.count()
        print(f"Total affiliate cards: {total_affiliates}")

        # Check sidebar specifically (lg:order-2)
        sidebar = page.locator('.lg\:order-2')
        sidebar_count = await sidebar.count()
        print(f"Sidebar containers (.lg:order-2): {sidebar_count}")

        if sidebar_count > 0:
            sidebar_affiliates = sidebar.locator('[data-testid="affiliate-card"]')
            print(f"Affiliate cards in sidebar: {await sidebar_affiliates.count()}")

        # Check body specifically
        body = page.locator('.article-content-wrapper')
        body_affiliates = body.locator('[data-testid="affiliate-card"]')
        print(f"Affiliate cards in body: {await body_affiliates.count()}")

        # Take a screenshot of the sidebar area specifically if possible
        await page.set_viewport_size({"width": 1280, "height": 1000})
        await page.screenshot(path='/home/jules/verification/screenshots/sidebar_check.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
