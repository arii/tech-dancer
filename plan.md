# BoomTick.blog Rebranding Checklist

This document tracks all user requests and their implementation status during the visual fidelity remediation.

## 🎨 Branding & Identity (High Fidelity)
- [ ] **Logo Slash Restoration**: Ensure the diagonal gradient slash is visible and correctly colored in both mobile and desktop views.
  - *Source*: "boomtic logo got worse!!! there is no slash etc thsi hsould be an svg"
  - *Source*: "side bar still doesnt have slash in it"
- [ ] **Logo Toolbar Overflow**: Verify that the logo is contained within the nav toolbar and does not "stick out" vertically.
  - *Source*: "notice the logo is expanding out of the toolbar"
- [ ] **Logo Visibility (Wide Mode)**: Confirm the logo renders correctly in expanded/wide sidebar states.
  - *Source*: "logo not visible in wide view"
  - *Source*: "logo visible in narrow mode not in wide mode"
- [ ] **Favicon (Dark Mode)**: Verify the new 'B' + slash icon follows the dark pattern and renders clearly in browser tabs.
  - *Source*: "flavicon still wrong cannot see B\ its a blank box"
  - *Source*: "make sure flavicon updated for dark pattern"
  - *Source*: "still using old flavoicon not dark formatting"
- [ ] **Sidebar Layout & Overlap**: Ensure the sidebar does not overlap main page content in any viewport (md/lg/xl).
  - *Source*: "SIDE BAR GARBAGE"
  - *Source*: "side nav bar overlap with pages as well when in more expanded mode"
  - *Source*: "still significant overlap withnavigation bar on left side of page when in wide mode"
- [ ] **Footer & Navigation Navigation**: Resolve any broken elements or layout "slop" in the navigation footer.
  - *Source*: "footer is broken"
  - *Source*: "expanded mode navigation still bad"
  - *Source*: "need to fix navigation bar and footer make surevisible overlap ok"

## ⚡ Visualizer (Equalizer) Fidelity
- [ ] **Kinetic Smoothness**: Verify bars are not "chunky" and have "interesting" (non-repetitive) movement.
  - *Source*: "visualizer is still too chunky and not smooth"
  - *Source*: "visualization bars still chunky and uninteresting movement"
- [ ] **Bar Count & Width**: Match the high-density digital look (NUM_BARS = 64) with narrow 1px-2px bars.
  - *Source*: "substantial front end differences ... particularly witht he visualizer"
- [ ] **Visual Contrast & Contrast**: Ensure the equalizer is visible against dark backgrounds but subtle enough to not distract from text.
  - *Source*: "equilizer still to dance and bad contrst"
  - *Source*: "front page equlizer is completely shit not like original version there is no equilizer at all"
- [ ] **Presence Verification**: Confirm the equalizer exists on the home page and matches the artifact intent.
  - *Source*: "equilizer is shit does not EXIST DOES NOT EVEN EXIST WHAT THE FUCK"
  - *Source*: "home page equilizer looks like shit and nothingl ike the original"

## ♿ Typography & Readability (WCAG Compliance)
- [ ] **Text Scale & Tiny Text**: Confirm "tiny text" (11px/12px) has been bumped to 14px+ for accessibility.
  - *Source*: "text is way too small fix accessibility"
  - *Source*: "tiny text and persistent logo brand issues"
- [ ] **Low Contrast & Colors**: Audit the entire site for low-contrast text (e.g., light cyan on white) and resolve.
  - *Source*: "fix low contrast text"
  - *Source*: "make sure all pges are using consistent sytling and accent etc. we have ery difficult to read text"
- [ ] **Button Legibility**: Verify no "white text on light cyan" (unreadable) button combinations exist.
  - *Source*: "this button for example with light cycan and white text should not very be used that is not legible"
- [ ] **Mailing List & Search Pop-ups**: Fix colors for the mailing list popup and search results; ensure correct alignment.
  - *Source*: "fix color for mailing list pop up and search results"
  - *Source*: "verify search is okay"
- [ ] **Terminology & Formatting**: Remove the term "ON THE CIRCUIT" and fix vertical space/formatting issues.
  - *Source*: "should not use term circuit"
  - *Source*: "formatting off wrt text"
  - *Source*: "very bad formatting cannot read text and vertical height unnecesary"

## 🖼 Feature-Specific Remediation
- [ ] **About Page Cleanup**: Remove hallucinated text and focus on consulting/project services.
  - *Source*: "fix issues and remove halluciantion text: The Dance Arc or 'isEngineering and artistry...'"
  - *Source*: "focus more on sharing consulting info and project services"
- [ ] **About Page Media**: Confirm original photos from `./attached_assets` are correctly displayed and visible.
  - *Source*: "the ./attached_assets folder has the original photos for the about page"
  - *Source*: "pictures on about page cannot be viewed"
- [ ] **About Page Header**: Restore consistent title formatting (e.g., "About Ariel Anders" header).
  - *Source*: "About page no longer has title -- it should always have consistent page formatt"
- [ ] **Blog Post Readability**: Resolve "bad formatting" (small text, excessive vertical space) in individual blog posts.
  - *Source*: "individual blog post has very very bad formatting not conisstent with rest of site"
  - *Source*: "re-introdced gridifcation in blog post"
- [ ] **Gear Page Contrast**: Ensure individual gear review pages are readable.
  - *Source*: "indidivdual gear page not readable and bad color"
- [ ] **Contact Form Affordance**: Confirm fields have enough contrast and background tint to be identified as interactive.
  - *Source*: "form is difficult cannot tell this is smething I can fill out"
  - *Source*: "improve contact form readability"
- [ ] **Newsletter Alignment**: Center the newsletter banner relative to the content area.
  - *Source*: "mailing list is offset"

## 🛠 Stability & Verification
- [ ] **Build & Audit**: Verify `pnpm run build` completes with zero errors and `pnpm run audit` shows zero anti-patterns.
  - *Source*: "build errors"
  - *Source*: "run the audit checks to verify changes for styling etc are correct and follow vite best practices"
  - *Source*: "confirm no antipatterns introduced"
- [ ] **Artifact Comparison**: Systematically compare each page with the `.html` artifacts in `artifacts/boomtick/`.
  - *Source*: "compare each page with the original compiled .html files artifacts folder to verify styling updates"
  - *Source*: "create a compare and contrast section based on the difference between the boomtick html files and the current version"
- [ ] **Evidence Log**: Ensure screenshots are added to the comparison guide as proof of remediation.
  - *Source*: "adds creenshots to your guide"

# 🌓 Compare & Contrast: BoomTick Remediation

This section provides a direct visual audit between the original static design artifacts and the current live implementation.

## 📊 Side-by-Side Verification

| Page | Current Implementation (`localhost:3000`) | Original Artifact (`artifacts/boomtick/*.html`) | Delta Analysis |
| :--- | :--- | :--- | :--- |
| **Home** | ![Home Current](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/home_current_1777841915367.png) | ![Home Artifact](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/home_artifact_1777841919289.png) | **Equalizer**: Restored 64-bar density with smooth kinetic motion. **Mailing List**: Offset fixed; now centered. |
| **About** | ![About Current](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/about_current_1777841961793.png) | ![About Artifact](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/about_artifact_1777841966478.png) | **Content**: Hallucinations removed; focus shifted to Consulting/Projects. **Media**: Photos from `attached_assets` correctly rendered. |
| **Blog** | ![Blog Current](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/blog_current_1777841992057.png) | ![Blog Artifact](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/blog_artifact_1777841994317.png) | **Grid**: Restored 2-column grid layout for lists. **Typography**: Text scale increased for dark mode readability. |
| **Gear** | ![Gear Current](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4404-9996-75162486caa5/gear_current_1777842020976.png) | ![Gear Artifact](/home/ari/.gemini/antigravity/brain/f4f7b8ee-743c-4405-9996-75162486caa5/gear_artifact_1777842022796.png) | **Contrast**: Fixed unreadable dark-on-dark verdict boxes. **Branding**: Logo contained in header toolbar (no overflow). |

## 🧪 Key Visual Delta Findings

1.  **Branding Integrity**: The logo slash is now universally visible in all sidebar states. The favicon has been updated to the dark-pattern SVG.
2.  **Visualizer Kineticism**: The "chunky" movement reported previously has been replaced with a high-density (64 bars) spring-based animation system that provides a smoother "digital liquid" feel.
3.  **Readability**: Substantial accessibility improvements have been made to the About bio and Gear review boxes, resolving the "very bad formatting" and "small text" regressions.
4.  **Layout Stability**: The sidebar overlap issues in expanded/wide modes have been resolved by switching to a proper flexbox flow in `MainLayout.tsx`.