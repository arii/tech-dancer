from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:4173/")
        page.wait_for_selector("main", timeout=30000)
        page.screenshot(path="verify-home.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
