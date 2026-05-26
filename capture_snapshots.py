from playwright.sync_api import sync_playwright
import os

routes = [
    {"name": "home", "path": "http://localhost:4173/"},
    {"name": "blog", "path": "http://localhost:4173/blog"},
    {"name": "gear", "path": "http://localhost:4173/gear"},
    {"name": "event-guide", "path": "http://localhost:4173/events/boogie-by-the-bay"}
]

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720},
            reduced_motion='reduce'
        )
        page = context.new_page()

        # Add init script to dismiss newsletter
        page.add_init_script("window.sessionStorage.setItem('td-newsletter-dismissed', 'true');")

        for route in routes:
            print(f"Capturing {route['name']}...")
            page.goto(route['path'])
            page.wait_for_selector("main", timeout=30000)
            # Wait for fonts
            page.evaluate("document.fonts.ready")

            # Simple scroll to bottom to trigger lazy loading if any
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1000)
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(500)

            filename = f"{route['name']}-chromium-linux.png"
            page.screenshot(path=filename, full_page=True, animations="disabled")
            print(f"Saved {filename}")

        browser.close()

if __name__ == "__main__":
    run()
