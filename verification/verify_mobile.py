from playwright.sync_api import sync_playwright, expect
import time

def test_mobile_layout(page):
    page.set_viewport_size({"width": 375, "height": 667})

    # 1. Verify Home & Bottom Nav
    page.goto("http://localhost:4173/tech-dancer/")
    page.wait_for_load_state("networkidle")
    bottom_nav = page.locator("nav.fixed.bottom-0")
    expect(bottom_nav).to_be_visible()
    page.screenshot(path="verification/mobile_home.png")

    # 2. Verify Detail Layout (Reordering: Content should be before sidebar)
    # Navigating directly to a known gear item
    page.goto("http://localhost:4173/tech-dancer/gear/loop-experience")
    page.wait_for_load_state("networkidle")

    # Verify primary content (article) comes before sidebar (aside) in DOM order or visual order?
    # The requirement said: "use CSS order classes so content displays BEFORE the sidebar on mobile devices"
    # Sidebar usually has order-2 and content order-1 on mobile.

    page.screenshot(path="verification/mobile_detail_top.png")
    # Scroll down to see ScoreGrid
    page.evaluate("window.scrollTo(0, 1000)")
    time.sleep(1)
    page.screenshot(path="verification/mobile_detail_scores.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 375, "height": 667})
        page = context.new_page()

        import subprocess
        process = subprocess.Popen(["pnpm", "run", "preview"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        try:
            time.sleep(5)
            test_mobile_layout(page)
        finally:
            process.terminate()
            browser.close()
