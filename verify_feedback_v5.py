import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Create a context with a larger viewport
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Navigate to the app
        await page.goto('http://localhost:5173')

        # Wait for the email bar to be visible
        try:
            await page.wait_for_selector('input[type="email"]', timeout=10000)
        except Exception as e:
            print(f"FAILED: Email bar not visible. {e}")
            await page.screenshot(path='v5_timeout.png')
            await browser.close()
            return

        await page.screenshot(path='v5_1_initial.png')

        # Fill the email
        await page.fill('input[type="email"]', 'test@example.com')

        # Click the button
        button = page.locator('button[type="submit"]')
        await button.click(force=True)

        # 1. Check for "AUTHENTICATING..."
        try:
            # Short timeout because it should be immediate
            await page.wait_for_selector('text=AUTHENTICATING...', timeout=2000)
            print("SUCCESS: Found 'AUTHENTICATING...'")
            await page.screenshot(path='v5_2_loading.png')
        except Exception as e:
            print("FAILED: 'AUTHENTICATING...' not found")
            await page.screenshot(path='v5_error_loading.png')

        # 2. Check for "ACCESS_GRANTED"
        try:
            # Should appear after 800ms
            await page.wait_for_selector('text=ACCESS_GRANTED', timeout=3000)
            print("SUCCESS: Found 'ACCESS_GRANTED'")
            await page.screenshot(path='v5_3_success.png')
        except Exception as e:
            print("FAILED: 'ACCESS_GRANTED' not found")
            await page.screenshot(path='v5_error_success.png')

        # 3. Check if bar disappears after 2s
        await asyncio.sleep(2.5)
        is_visible = await page.is_visible('input[type="email"]')
        if not is_visible:
            print("SUCCESS: Email bar hidden after completion")
            await page.screenshot(path='v5_4_final.png')
        else:
            print("FAILED: Email bar still visible after 2.5s")
            await page.screenshot(path='v5_error_final.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
