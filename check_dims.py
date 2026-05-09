from playwright.sync_api import sync_playwright
import os

def check_dim(url):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        try:
            page.goto(url)
            page.wait_for_load_state("networkidle")
            page.evaluate("() => document.fonts.ready")
            # Wait for main to be visible
            page.wait_for_selector("main")

            # Scroll to bottom and back to settle
            page.evaluate("""async () => {
                const scrollable = document.querySelector('main') || document.documentElement;
                scrollable.scrollTo(0, scrollable.scrollHeight);
                await new Promise(requestAnimationFrame);
                await new Promise(resolve => setTimeout(resolve, 500));
                scrollable.scrollTo(0, 0);
            }""")

            height = page.evaluate("() => document.documentElement.scrollHeight")
            print(f"{url}: {height}")
        except Exception as e:
            print(f"Error checking {url}: {e}")
        finally:
            browser.close()

base_url = "http://localhost:4173/tech-dancer"
check_dim(f"{base_url}/research")
check_dim(f"{base_url}/preview")
