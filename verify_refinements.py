from playwright.sync_api import sync_playwright
import os

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Assume server is already running from previous attempt or start it
        # To be safe, let's just use the build and start it again

        # Wait for server
        import time
        max_retries = 30
        connected = False
        url = "http://localhost:4173"
        for i in range(max_retries):
            try:
                page.goto(url)
                connected = True
                break
            except:
                time.sleep(1)

        if not connected:
            print("Could not connect to preview server")
            browser.close()
            return

        page.wait_for_timeout(2000)

        # Capture Dashboard and Logo
        page.goto(f"{url}/")
        page.wait_for_load_state("networkidle")

        # Take full page screenshot
        page.screenshot(path="/home/jules/verification/screenshots/dashboard_final.png", full_page=True)
        print("Captured final dashboard")

        # Try to find logo in the sidebar
        try:
            # Use a more specific selector for the sidebar logo
            logo = page.locator("nav[aria-label='Main Navigation'] svg").first
            logo.screenshot(path="/home/jules/verification/screenshots/logo_refined.png")
            print("Captured refined logo from sidebar")
        except Exception as e:
            print(f"Could not capture sidebar logo: {e}")
            # Fallback: capture whatever logo is visible
            page.locator("svg").first.screenshot(path="/home/jules/verification/screenshots/logo_fallback.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
