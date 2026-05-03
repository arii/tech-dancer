import asyncio
import os
import sys
from playwright.async_api import async_playwright

async def run_audit():
    # Setup design_audit directory
    output_dir = "design_audit"
    os.makedirs(output_dir, exist_ok=True)
    print(f"Saving screenshots to {output_dir}/")

    routes = ["", "about", "blog", "gear", "research"]
    base_url = "http://localhost:3000"

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Desktop context
        desktop_context = await browser.new_context(viewport={'width': 1440, 'height': 900})
        desktop_page = await desktop_context.new_page()

        # Mobile context
        mobile_context = await browser.new_context(viewport={'width': 390, 'height': 844})
        mobile_page = await mobile_context.new_page()

        for route in routes:
            url = f"{base_url}/{route}"
            name = route if route else "home"
            print(f"Auditing /{name}...")

            try:
                # Desktop
                await desktop_page.goto(url)
                # Wait for network idle or reasonable timeout
                await desktop_page.wait_for_load_state("networkidle", timeout=10000)
                await desktop_page.screenshot(path=os.path.join(output_dir, f"desktop-{name}.png"), full_page=True)

                # Mobile
                await mobile_page.goto(url)
                await mobile_page.wait_for_load_state("networkidle", timeout=10000)
                await mobile_page.screenshot(path=os.path.join(output_dir, f"mobile-{name}.png"), full_page=True)
            except Exception as e:
                print(f"Warning: Failed to capture {name}: {e}")

        # Search modal
        print("Auditing /search-modal...")
        try:
            await desktop_page.goto(f"{base_url}/")
            await desktop_page.wait_for_load_state("networkidle", timeout=10000)

            # The user interacts with the search box.
            # Using evaluate to avoid click interception from overlapping UI as mentioned in Memory:
            # "Using locator.evaluate(node => (node as HTMLElement).click()) ensures the click event triggers correctly regardless of animation states."
            # The search button has text "Search" inside.
            search_btn_desktop = desktop_page.locator("button:has-text('Search')").first
            if await search_btn_desktop.count() > 0:
                await search_btn_desktop.evaluate("node => node.click()")
            else:
                 await desktop_page.keyboard.press('Meta+k')
            await desktop_page.wait_for_timeout(1000)
            await desktop_page.screenshot(path=os.path.join(output_dir, f"desktop-search-modal.png"), full_page=True)


            await mobile_page.goto(f"{base_url}/")
            await mobile_page.wait_for_load_state("networkidle", timeout=10000)

            # On mobile, we might need to open the hamburger menu first, then click Search
            mobile_menu_btn = mobile_page.locator("button[aria-label='Open menu']").first
            if await mobile_menu_btn.count() > 0:
                await mobile_menu_btn.evaluate("node => node.click()")
                await mobile_page.wait_for_timeout(500)

            search_btn_mobile = mobile_page.locator("button:has-text('Search')").first
            if await search_btn_mobile.count() > 0:
                await search_btn_mobile.evaluate("node => node.click()")
            else:
                 await mobile_page.keyboard.press('Meta+k')

            await mobile_page.wait_for_timeout(1000)
            await mobile_page.screenshot(path=os.path.join(output_dir, f"mobile-search-modal.png"), full_page=True)

        except Exception as e:
             print(f"Warning: Failed to capture search modal: {e}")

        await browser.close()
        print("Visual audit complete.")

if __name__ == "__main__":
    asyncio.run(run_audit())
