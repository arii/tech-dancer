# TSX File System Checklist (For Coding Agents)

These are **Rules for writing clean .tsx files** to ensure every `.tsx` file adheres to your design system, architecture, and modern frontend best practices.

## 🧠 Core Principle

> **A `.tsx` file should Build UI using standard pieces**

## 1. ❌ No Raw Tailwind in App/Feature Layers
- No arbitrary values (`text-[11px]`, `tracking-[3px]`, `shadow-[...]`)
- No direct layout classes (`flex`, `grid`, `items-center`)
- No direct spacing (`px-*`, `py-*`)
- No color classes (`bg-*`, `text-*`) outside tokens

## 2. ✅ Only Use Approved Styling Sources
- Design tokens (`spacing`, `radius`, `typography`, `motion`)
- CVA variants
- Primitives (`Box`, `Stack`, `Text`, `Grid`)
- Composed components (e.g. `Button`, `Card`)

## 3. 🧱 Primitives Must Be Used for Layout
- Layout uses `Stack`, `Grid`, `Box`, etc.
- No manual flex/grid usage
- Responsive behavior handled via primitive props (not className)

## 4. 🎨 Typography Must Be Tokenized
- No raw `text-*` classes
- All text uses `<Text />` or equivalent abstraction

## 5. 🎛 Variants Must Be Standardized
- Variant names match global system (e.g. `default`, `accent`, `ghost`)

## 6. ⚙️ No Business Logic in UI Components
- Logic extracted into hooks (`useX`)
- No DOM querying (`querySelector`, `getElementById`)

## 7. 🧩 Components Must Be Declarative
- UI is predictable and compositional

## 8. 📦 Feature Isolation Required
- Features belong in `features/<feature-name>/`

## 9. 🧭 Routing Is Declarative
- Navigation uses route config (not hardcoded)
- Do NOT use `HashRouter`.

## 23. 🤝 Collaborative GitHub Workflows

The `dev-tools/gh_collab.py` script handles all PR review interactions. Auth is automatic via `gh auth token` — no manual `GITHUB_TOKEN` export needed.

**Submitting a Code Review (preferred — one step):**
```bash
python3 dev-tools/gh_collab.py review <PR_NUMBER> --file review_payload.json
```

The `review_payload.json` must contain:
```json
{
  "body": "Overall review summary",
  "comments": [
    { "path": "src/foo.tsx", "line": 42, "body": "Inline comment text" }
  ]
}
```

**Acquiring PR diff to write a review:**
```bash
# Fetch changed files + patches
python3 - <<'EOF'
import subprocess, os, requests, json
def get_token():
    try: return subprocess.check_output(['env','-u','GITHUB_TOKEN','gh','auth','token'], stderr=subprocess.DEVNULL, text=True).strip()
    except: pass
    return os.getenv("GITHUB_TOKEN","")
token = get_token()
headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github.v3+json"}
pr = 123  # <-- set PR number
files = requests.get(f"https://api.github.com/repos/arii/tech-dancer/pulls/{pr}/files", headers=headers).json()
for f in files:
    print(f"\n[{f['status']}] {f['filename']} +{f['additions']}/-{f['deletions']}")
    if f.get('patch'): print(f['patch'][:600])
EOF
```

**Other commands:**
- `python3 dev-tools/gh_collab.py create <PR> --file payload.json` — create pending review without submitting
- `python3 dev-tools/gh_collab.py submit <PR> COMMENT|APPROVE|REQUEST_CHANGES` — submit existing pending review
- `python3 dev-tools/gh_collab.py plan --pr-info ... --inline ... --general ... --reviews ... --output PR_Plan.md`
- Add `--dry-run` flag to any command to simulate without hitting the API.

**Code Review Standards (anti-bloat):**
When reviewing, evaluate EVERY changed file against these criteria:
1. **Dead abstractions** — Is a new class/context/hook solving a problem that a simpler primitive already handles?
2. **Unnecessary indirection** — Does this add a layer where a direct call would do?
3. **Responsibility creep** — Is a component taking on logic that belongs in a hook or a parent?
4. **Import bloat** — Are `React` default imports added unnecessarily (not needed in React 17+)?
5. **Token compliance** — Are design tokens used, or is raw Tailwind/inline style leaking in?
6. Post an inline comment on the most critical line of each file changed.


## 10. 🎞 Motion Must Use Tokens
- Motion values come from `motionTokens`

## 11. 🧼 No Inline Styles or Magic Numbers
- No inline `style` usage
- Everything mapped to tokens

## 12. 🧱 Composition Over Configuration
- Repeated patterns extracted into specialized components

## 13. 🔌 No Direct DOM Access
- Controlled inputs used

## 14. 🧪 Hooks Are Reusable & Pure
- Side effects properly isolated

## 15. 🧭 App Layer = Composition Only
- App.tsx only composes layout, routes, and global UI.

## 16. 🧩 Avoid “God Components”
- Components are small and focused

## 18. 📐 Responsive Design via System
- Responsive handled via props

## 20. 🚫 No System Bypass via `className`
- `className` should NOT introduce new design decisions

## 21. 🏗 Modular Architecture
- Layout primitives (`Box`, `Grid`, `Stack`) MUST reside in `src/layouts/`
- Page-level compositors MUST reside in `src/pages/`
- Component imports MUST use the `@/layouts/` or `@/pages/` alias

## 22. 🛤 Code Splitting & SPA Routing
- Application routes MUST be code-split using `React.lazy()` or equivalent dynamic imports to keep bundles small.
- Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries.
- Ensure the application maintains single-page application (SPA) characteristics with environment-agnostic routing (e.g., handling base URLs cleanly for GitHub Pages).

### 🤖 Isolated Development Environments (`vdev`)
When asked to work on a new feature, bugfix, or isolated task while preserving the current workspace state, use the `vdev` CLI tool:
* **Isolate:** Run `vdev setup <branch-name>` to create an isolated Docker/Worktree environment automatically.
* **Execute:** Run tests, builds, or scripts inside that isolated environment using `vdev exec "<command>" --branch <branch-name>`.
* **Cleanup:** Once the PR is submitted or the environment is no longer needed, clean it up using `vdev cleanup <branch-name>`.
