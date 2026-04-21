1. **Add `firebase` dependency**
   - Run `npm install firebase` to install the required dependency.
2. **Add `playwright` dependency for `ux-capture.js` tool (if not present)**
   - Check if `playwright` is installed. The script uses `const { chromium } = require('playwright');`.
3. **Create the UX Auditor Page**
   - Add `src/pages/UXAuditor.tsx` representing the page, wrapped in the layout primitives (`Box`, `Grid`, `Stack`, `Text`) and adhering to `AGENTS.md` guidelines.
   - We will need to adapt the provided React code which uses raw Tailwind (`bg-white p-6 rounded-2xl` etc) to use layout primitives (`<Box className="bg-surface rounded-xl shadow-sm border border-line p-6">`).
   - Move complex logic/hooks into a `src/features/ux-auditor/useUXAuditor.ts` file if necessary, or keep it in the component if it's small, though separating logic is usually better (`AGENTS.md` rule 6).
4. **Update Routing Configuration**
   - Edit `src/config/routes.ts` to include `{ path: '/ux-auditor', label: 'UX Auditor' }`.
   - Ensure the new route is lazy-loaded in `src/App.tsx`.
   - Update `src/components/Navigation.tsx` to include an icon for `/ux-auditor` (e.g. `Eye` or `Camera`).
5. **Add `ux-capture.js`**
   - Place `ux-capture.js` in a `scripts/` directory at the project root.
6. **Pre-commit and Tests**
   - Call `pre_commit_instructions` to ensure we cover all required checks.
