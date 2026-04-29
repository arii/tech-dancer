---
description: systematically review and test UI/UX changes interactively using playwright-cli
---

# Review UX Changes

0. **Prerequisites**:
Ensure `playwright-cli` is installed and its skills are available. This tool provides token-efficient browser control for coding agents.
```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills
```

1. **Pre-flight validation**:
Run the automated UI anti-pattern audit first to ensure baseline compliance before visual review:
```bash
pnpm run audit
```

2. **Start the Application**:
Start the development server in the background:
```bash
pnpm run dev &
```

3. **Open Playwright CLI**:
Launch the browser in headed mode to observe the changes, and navigate to the local application.
```bash
playwright-cli open http://localhost:3000/ --headed
```

4. **Navigate and Inspect**:
Use `playwright-cli` commands to discover elements, navigate, and verify the UX state.
```bash
# Capture the page snapshot with element references
playwright-cli snapshot

# Interact with the UI using references or selectors
playwright-cli click e15
playwright-cli click "role=button[name=Submit]"
playwright-cli type "test query"
```

5. **Capture Visual Evidence**:
Take screenshots for scenarios that need manual review or attachment to pull requests.
```bash
playwright-cli screenshot --filename=review-success.png
playwright-cli pdf
```

6. **Cleanup**:
When finished, close the browser sessions and kill the development server.
```bash
playwright-cli close-all
kill $(lsof -t -i :3000) 2>/dev/null || true
```
