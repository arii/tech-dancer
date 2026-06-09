# UX Audit Report
Generated on: 2026-06-09 14:59:29

## Summary
- Routes Audited: 5

## Key Findings
### Horizontal Overflow on `/` (mobile-375) causes janky scrolling and potential content cut-off.
- **Category:** Layout
- **Severity:** High
- **Evidence:** Detected 1 elements overflowing viewport.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-375.png`
- **Recommendation:** Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

### Horizontal Overflow on `/` (desktop-1280) causes janky scrolling and potential content cut-off.
- **Category:** Layout
- **Severity:** High
- **Evidence:** Detected 1 elements overflowing viewport.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-desktop-1280.png`
- **Recommendation:** Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

### Horizontal Overflow on `/` (mobile-390) causes janky scrolling and potential content cut-off.
- **Category:** Layout
- **Severity:** High
- **Evidence:** Detected 1 elements overflowing viewport.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-390.png`
- **Recommendation:** Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

### Horizontal Overflow on `/` (mobile-430) causes janky scrolling and potential content cut-off.
- **Category:** Layout
- **Severity:** High
- **Evidence:** Detected 3 elements overflowing viewport.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`
- **Recommendation:** Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

### Horizontal Overflow on `/` (desktop-1440) causes janky scrolling and potential content cut-off.
- **Category:** Layout
- **Severity:** High
- **Evidence:** Detected 1 elements overflowing viewport.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-desktop-1440.png`
- **Recommendation:** Replace raw HTML structural elements with our primitive `Stack` or `Grid` layouts. Make sure widths are token-driven (e.g., `maxWidth={{ base: "full", md: "2xl" }}`) and avoid fixed pixel widths. For long content blocks, apply `overflow="x-auto"` to the wrapping primitive to contain scrolling locally.

### Small Tap Targets on `/` (mobile-375) makes interactive elements difficult to tap on a phone, leading to user frustration.
- **Category:** Mobile UX
- **Severity:** Medium
- **Evidence:** Found 26 interactive elements smaller than 44x44px.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-375.png`
- **Recommendation:** Ensure all interactive elements (buttons, links) are either utilizing our primary `ActionButton` variants or are wrapped in primitive layout components with explicit `padding={{ base: 4, md: 2 }}` spacing tokens to ensure a minimum touch area of 44x44px on mobile.

### Oversized Images on `/` (mobile-375) increases page load time and consumes excessive bandwidth.
- **Category:** Performance
- **Severity:** Medium
- **Evidence:** Found 3 images where natural size is significantly larger than rendered size.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-375.png`
- **Recommendation:** Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

### Oversized Images on `/` (desktop-1280) increases page load time and consumes excessive bandwidth.
- **Category:** Performance
- **Severity:** Medium
- **Evidence:** Found 3 images where natural size is significantly larger than rendered size.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-desktop-1280.png`
- **Recommendation:** Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

### Small Tap Targets on `/` (mobile-390) makes interactive elements difficult to tap on a phone, leading to user frustration.
- **Category:** Mobile UX
- **Severity:** Medium
- **Evidence:** Found 26 interactive elements smaller than 44x44px.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-390.png`
- **Recommendation:** Ensure all interactive elements (buttons, links) are either utilizing our primary `ActionButton` variants or are wrapped in primitive layout components with explicit `padding={{ base: 4, md: 2 }}` spacing tokens to ensure a minimum touch area of 44x44px on mobile.

### Oversized Images on `/` (mobile-390) increases page load time and consumes excessive bandwidth.
- **Category:** Performance
- **Severity:** Medium
- **Evidence:** Found 3 images where natural size is significantly larger than rendered size.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-390.png`
- **Recommendation:** Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

### Small Tap Targets on `/` (mobile-430) makes interactive elements difficult to tap on a phone, leading to user frustration.
- **Category:** Mobile UX
- **Severity:** Medium
- **Evidence:** Found 26 interactive elements smaller than 44x44px.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`
- **Recommendation:** Ensure all interactive elements (buttons, links) are either utilizing our primary `ActionButton` variants or are wrapped in primitive layout components with explicit `padding={{ base: 4, md: 2 }}` spacing tokens to ensure a minimum touch area of 44x44px on mobile.

### Oversized Images on `/` (mobile-430) increases page load time and consumes excessive bandwidth.
- **Category:** Performance
- **Severity:** Medium
- **Evidence:** Found 3 images where natural size is significantly larger than rendered size.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-mobile-430.png`
- **Recommendation:** Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.

### Oversized Images on `/` (desktop-1440) increases page load time and consumes excessive bandwidth.
- **Category:** Performance
- **Severity:** Medium
- **Evidence:** Found 3 images where natural size is significantly larger than rendered size.
- **Screenshot:** `/app/artifacts/ux-audit/screenshots/home-desktop-1440.png`
- **Recommendation:** Refactor raw `<img>` tags to utilize responsive sizing. Alternatively, ensure the image asset is pre-optimized (WebP) and wrap it within an `AspectRatio` or `Box` primitive to enforce strict width constraints rather than relying on natural dimensions.
