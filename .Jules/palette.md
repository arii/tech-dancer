## 2024-05-24 - Missing aria-labels on icon buttons
**Learning:** Found multiple icon-only buttons (like the mobile menu trigger and close modal button) without aria-labels. This makes the interface inaccessible to screen readers, as they won't know the purpose of the buttons.
**Action:** Adding `aria-label` attributes to icon-only buttons across the site to improve accessibility.
