# Visual Regression Testing

This project uses Playwright for visual regression testing. The setup is consolidated to ensure consistent viewport coverage, predictable naming, and stable snapshots across both desktop and mobile environments.

## Configuration

Visual regression is configured in `tests/visual-config.ts`. This file defines:
- **Viewports**: Standardized sizes for `desktop-1280` (1280x800) and `mobile-390` (390x844).
- **Routes**: The list of application paths to capture.
- **Stability**: Route-specific `waitFor` selectors to ensure the page is fully loaded and settled before taking a snapshot.
- **Masks**: Common elements like dates, timestamps, and pulse animations that are masked to prevent flakiness.

## Running Tests

To run visual regression tests locally:

```bash
# Run all visual tests
npx playwright test tests/visual.spec.ts

# Run only desktop visual tests
npx playwright test tests/visual.spec.ts --project=desktop

# Run only mobile visual tests
npx playwright test tests/visual.spec.ts --project=mobile
```

## Updating Snapshots

If you have intentionally changed the UI and need to update the baseline snapshots:

```bash
npx playwright test tests/visual.spec.ts --update-snapshots
```

## Naming Convention

Snapshots follow a strict naming convention:
`{route-slug}__{viewport-name}__page.png`

Example:
- `home__desktop-1280__page.png`
- `home__mobile-390__page.png`

## Best Practices for Stability

- **Wait for Fonts**: The test runner automatically waits for `document.fonts.ready`.
- **Disable Animations**: Animations and transitions are disabled via a global style tag in `tests/fixtures/visual.ts`.
- **Scroll to Settle**: The runner performs a scroll-to-bottom and back to top to trigger lazy loading and ensure layout settlement.
- **Masking**: Use the `commonMasks` in `visual-config.ts` or route-specific masks to hide dynamic content.
- **Section-level Snapshots**: While most tests use `fullPage: true`, you can target specific locators in `visual-config.ts` to reduce artifact size.
