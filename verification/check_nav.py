from playwright.sync_api import sync_playwright, expect
import time

def test_nav(page):
    page.set_viewport_size({"width": 375, "height": 667})
    page.goto("http://localhost:4173/tech-dancer/")
    page.wait_for_load_state("networkidle")
    time.sleep(2)
    nav = page.locator("nav.fixed.bottom-0")
    print(f"Nav visible: {nav.is_visible()}")
    page.screenshot(path="verification/nav_check.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        import subprocess
        process = subprocess.Popen(["pnpm", "run", "preview"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        try:
            time.sleep(5)
            test_nav(page)
        finally:
            process.terminate()
            browser.close()
