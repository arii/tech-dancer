def get_scroll_fn(distance=100, delay_ms=20, wait_ms=500):
    """
    Generates a stringified JavaScript function to be executed via Playwright's `page.evaluate()`.
    This function scrolls the main content area (or the entire body) to trigger lazy-loaded elements.
    """
    return f"""async () => {{
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        let container = document.body;
        const main = document.querySelector('main');

        if (main && main.scrollHeight > main.clientHeight + 50) {{
            container = main;
        }}

        const scrollHeight = container.scrollHeight;
        let totalHeight = 0;
        const scrollDist = {distance};

        while (totalHeight < scrollHeight) {{
            if (container === document.body) {{
                window.scrollBy(0, scrollDist);
            }} else {{
                container.scrollTop += scrollDist;

                if (totalHeight === scrollDist && container.scrollTop === 0) {{
                    container = document.body;
                    window.scrollBy(0, scrollDist);
                }}
            }}
            totalHeight += scrollDist;
            await delay({delay_ms});
        }}

        if (container === document.body) {{
            window.scrollTo(0, 0);
        }} else {{
            container.scrollTop = 0;
            window.scrollTo(0, 0);
        }}

        await delay({wait_ms});
    }}"""
