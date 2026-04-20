import asyncio
from playwright.async_api import async_playwright
import time
import re

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("Navigating to http://localhost:5173")
        try:
            await page.goto("http://localhost:5173", wait_until="networkidle")
        except Exception as e:
            print(f"Error navigating: {e}")
            await browser.close()
            return

        # 1. Initial State
        print("Capturing initial state...")
        await page.screenshot(path="final_1_initial.png")

        # Check if email bar is present
        email_input = page.get_by_placeholder("Email Address")
        await email_input.wait_for(state="visible")
        print("Email input found.")

        # 2. Trigger Loading
        print("Entering email and submitting...")
        await email_input.fill("test@example.com")

        # The button might be intercepted by an overlay in the screenshot
        # but let's try to click the button by its type
        submit_button = page.locator('button[type="submit"]')

        # Click and immediately start polling for text changes
        await submit_button.click(force=True)

        print("Waiting for AUTHENTICATING...")
        start_time = time.time()
        found_loading = False
        while time.time() - start_time < 5:
            # Check for the specific text AUTHENTICATING...
            # Note: Playwright might need a locator to be sure
            loading_text = page.get_by_text("AUTHENTICATING...")
            if await loading_text.is_visible():
                found_loading = True
                print("Found AUTHENTICATING... text!")
                await page.screenshot(path="final_2_loading.png")
                break
            await asyncio.sleep(0.05)

        if not found_loading:
            print("FAILED: Could not find AUTHENTICATING...")
            await page.screenshot(path="final_error_loading.png")

        # 3. Wait for Success
        print("Waiting for ACCESS_GRANTED...")
        start_time = time.time()
        found_success = False
        while time.time() - start_time < 5:
            success_text = page.get_by_text("ACCESS_GRANTED")
            if await success_text.is_visible():
                found_success = True
                print("Found ACCESS_GRANTED text!")
                await page.screenshot(path="final_3_success.png")
                break
            await asyncio.sleep(0.05)

        if not found_success:
            print("FAILED: Could not find ACCESS_GRANTED")
            await page.screenshot(path="final_error_success.png")

        # 4. Wait for closure
        print("Waiting for bar to disappear...")
        await asyncio.sleep(3)
        await page.screenshot(path="final_4_closed.png")

        # Check if "Weekly Insights" is gone
        insights = page.get_by_text("Weekly Insights")
        if await insights.is_hidden():
            print("Bar successfully hidden.")
        else:
            print("Bar still visible after success timeout.")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
