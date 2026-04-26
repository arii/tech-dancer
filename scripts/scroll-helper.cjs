/**
 * Generates a stringified JavaScript function to be executed via Playwright's `page.evaluate()`.
 * This function scrolls the main content area (or the entire body) to trigger lazy-loaded elements.
 *
 * @param {number} distance - Pixels to scroll in each step (default: 100)
 * @param {number} delayMs - Delay between steps in milliseconds (default: 20)
 * @param {number} waitMs - Delay after returning to the top to wait for page stabilization (default: 500)
 * @returns {string} Stringified JavaScript function for `page.evaluate()`
 */
function getScrollFn(distance = 100, delayMs = 20, waitMs = 500) {
  return `async () => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

        // Find the actual scrollable container. We check if \`main\` is scrollable by looking at its style
        // or seeing if its scrollHeight is significantly larger than its clientHeight.
        let container = document.body;
        const main = document.querySelector('main');

        if (main && main.scrollHeight > main.clientHeight + 50) {
            container = main;
        }

        const scrollHeight = container.scrollHeight;
        let totalHeight = 0;
        const scrollDist = ${distance};

        while (totalHeight < scrollHeight) {
            if (container === document.body) {
                window.scrollBy(0, scrollDist);
            } else {
                container.scrollTop += scrollDist;

                // Safety fallback: if we try to scroll main but its scrollTop doesn't change,
                // it might not actually be the element with overflow. Fallback to body.
                // We check after the first scroll attempt.
                if (totalHeight === scrollDist && container.scrollTop === 0) {
                    container = document.body;
                    window.scrollBy(0, scrollDist);
                }
            }
            totalHeight += scrollDist;
            await delay(${delayMs});
        }

        // Reset scroll position
        if (container === document.body) {
            window.scrollTo(0, 0);
        } else {
            container.scrollTop = 0;
            window.scrollTo(0, 0); // Always reset window just in case
        }

        await delay(${waitMs});
    }`;
}

module.exports = { getScrollFn };
