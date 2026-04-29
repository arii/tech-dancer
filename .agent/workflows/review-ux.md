---
description: Systematically review and test UI/UX changes interactively using playwright-cli
---

# Review UX Changes

0. **Prerequisites**:
Ensure project dependencies and `playwright-cli` are installed, and its skills are available.
```bash
pnpm install
npm install -g @playwright/cli@latest
playwright-cli install --skills
```

1. **Pre-flight validation**:
```bash
pnpm run audit
```

2. **Start the Application**:
```bash
pnpm run dev &
```

3. **Desktop Visual Audit (1440x900)**:
```bash
playwright-cli open http://localhost:3000/ --headed --viewport-size=1440,900
```
Verify the following routes and features:
- `/`
- `/about`
- `/blog`
- `/gear`
- `/research`
- Search modal
Verify: Design consistency, typography, Recharts rendering, and ContentCard/GearCard 16:9 aspect ratio.
```bash
playwright-cli snapshot
playwright-cli screenshot --filename=desktop-home.png
```

4. **Mobile Visual Audit (390x844)**:
```bash
playwright-cli open http://localhost:3000/ --headed --viewport-size=390,844
```
Verify the same routes and features, plus:
- Mobile navigation bar (`pb-[safe-area-inset-bottom]`)
- Mobile spacing and tap targets
- Search modal overlay and Z-index collisions (ensure no overlap with header/hamburger menu)
```bash
playwright-cli snapshot
playwright-cli screenshot --filename=mobile-home.png
```

5. **Cleanup**:
```bash
playwright-cli close-all
npx kill-port 3000
```