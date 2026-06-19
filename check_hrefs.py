import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:3000/research")

        # Wait for content
        await page.wait_for_selector("text=GitOps Code Review Agent")

        print("--- Flagship Tools ---")
        # Find all FlagshipCards
        flagship_cards = page.locator("article:has-text('Flagship'), article:has-text('Active dev')")
        count = await flagship_cards.count()
        for i in range(count):
            card = flagship_cards.nth(i)
            title_el = card.locator("span.font-display").first
            title = await title_el.inner_text()
            overlay_href = await card.locator("a.absolute.inset-0").get_attribute("href")

            # Check for Source link in header
            header_source_link = card.locator("div.relative.z-20 a:has-text('Source')")
            header_source_href = await header_source_link.get_attribute("href") if await header_source_link.count() > 0 else "N/A"

            # Check for Source Repo button at bottom
            source_btn = card.locator("a:has-text('Source Repo')")
            source_btn_href = await source_btn.get_attribute("href") if await source_btn.count() > 0 else "N/A"

            print(f"Title: {title}")
            print(f"  Overlay Href: {overlay_href}")
            print(f"  Header Source Href: {header_source_href}")
            print(f"  Bottom Source Href: {source_btn_href}")

        await browser.close()

asyncio.run(run())
