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

        const container = document.querySelector('main') || document.body;
        const scrollHeight = container.scrollHeight;
        let totalHeight = 0;
        const scrollDist = ${distance};

        while (totalHeight < scrollHeight) {
            if (container === document.body) {
                window.scrollBy(0, scrollDist);
            } else {
                container.scrollTop += scrollDist;
            }
            totalHeight += scrollDist;
            await delay(${delayMs});
        }

        if (container === document.body) {
            window.scrollTo(0, 0);
        } else {
            container.scrollTop = 0;
        }

        await delay(${waitMs});
    }`;
}

module.exports = { getScrollFn };
