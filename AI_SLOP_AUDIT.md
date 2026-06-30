# AI-Drift & Slop Audit Report

This report documents the findings of a systematic audit for AI-generated "slop," over-engineering, and hallucinated requirements within the codebase.

## 📋 Master Audit Checklist

### `src/` files
* [x] **`[x]` src/App.tsx — Verified Clean**
* [x] **`[x]` src/affiliate-tool.test.ts — Verified Clean**
* [x] **`[x]` src/components/ui/BaseCard.tsx — Verified Clean**
* [x] **`[x]` src/components/ui/MarkdownRenderer.tsx — Verified Clean**
* [x] **`[x]` src/config/routes.ts — Verified Clean**
* [ ] `-[ ]` src/main.tsx
* [ ] `-[ ]` src/hooks/useScrollManagement.ts
* [ ] `-[ ]` src/layouts/system-utils.ts
* [ ] `-[ ]` src/features/research/hooks/useWCSData.ts
* [x] **`[x]` src/pages/About.tsx — Verified Clean**
* [x] **`[x]` src/lib/content.ts — Verified Clean**
* [x] **`[x]` src/lib/utils.ts — Verified Clean**

### `etl/` files
* [x] **`[x]` etl/processor.py — Verified Clean**
* [x] **`[x]` etl/scraper.py — Verified Clean**
* [x] **`[x]` etl/query_ledger.py — Verified Clean**

### `scripts/` files
* [x] **`[x]` scripts/detect-antipatterns.mjs — Verified Clean**
* [x] **`[x]` scripts/ux-discover-routes.ts — Verified Clean**
* [ ] `-[ ]` scripts/lib/codeReviewOrchestrator.ts
* [ ] `-[ ]` scripts/lib/codeReviewUtils.ts

### `boomtick-pkg/` files
* [ ] `-[ ]` boomtick-pkg/cli/dev_tools/orchestrator.py
* [ ] `-[ ]` boomtick-pkg/cli/dev_tools/utils.py

---

## 🚩 Flagged Instances Breakdown

### 1. Hallucinated Backward-Compatibility & Ghost Requirements

* **Location:** `src/main.tsx` (Lines 44-77)
* **The Slop:** The `getBasename` function contains elaborate heuristic logic to detect and calculate subdirectory depths specifically for GitHub Pages branch previews. It includes a manual crawl of path segments against a hardcoded list of "standard routes" and "static paths".
* **Why it's likely AI Drift:** This handles a hypothetical deployment complexity (multi-segment branch names in subdirectories) that is already natively solved by Vite's `BASE_URL` and standard CI configuration. The code attempts to "outsmart" the environment with manual path arithmetic that shouldn't be necessary in a modern stack.
* **Remediation:**
```typescript
const getBasename = (): string => {
  return import.meta.env.BASE_URL || '/';
};
```

### 2. Over-Engineered Abstraction Cascades (AI Over-Architecting)

* **Location:** `src/layouts/system-utils.ts` (Lines 6-27)
* **The Slop:** The `getResponsiveClasses` function is a micro-modular abstraction that manually maps object-based props (e.g., `{ base: 4, md: 2 }`) to Tailwind responsive prefixes.
* **Why it's likely AI Drift:** This mirrors native Tailwind functionality that should be handled by utility classes or simple template literals. It adds a layer of runtime complexity and a proprietary schema for a static CSS generation problem. It represents a "Clean Code" rule (DRY) applied mindlessly to a context where native platform features are superior.
* **Remediation:** Remove the utility and use native Tailwind classes or simple conditional logic within components.

* **Location:** `scripts/lib/codeReviewOrchestrator.ts` (Lines 371-460)
* **The Slop:** The `reconcileVerdict` function implements a complex "defense" layer against LLM severities, including regex-based "hedge language" detection and cross-referencing findings against diff lines to catch hallucinations.
* **Why it's likely AI Drift:** While functional, this is an academic solution to a prompt engineering problem. It treats the symptoms of poor LLM output with elaborate TypeScript logic rather than fixing the root cause in the model configuration or system prompt.
* **Remediation:** Simplify the verdict logic to trust the parser or implement a simpler threshold; move "hedge detection" into the system prompt.

### 3. "AI Drift" and Cargo-Culting

* **Location:** `boomtick-pkg/cli/dev_tools/utils.py` (Line 203)
* **The Slop:** A call to a function `_call_api_with_retry` that is never defined in the file or imported.
* **Why it's likely AI Drift:** Multi-turn drift. The AI "remembered" writing a retry helper in a previous turn or assumed a standard utility existed and called it without ensuring its presence in the current context.
* **Remediation:**
```python
# Replace hallucinated helper with standard requests call
response = requests.request(method, url, json=data, timeout=30)
response.raise_for_status()
res = response.json()
```

### 4. Overly Defensive / Nonsensical Error Handling

* **Location:** `src/features/research/hooks/useWCSData.ts` (Lines 45-52)
* **The Slop:** A manual check of the first 4 bytes of a fetched Parquet file to verify the `'PAR1'` magic signature before passing it to the `hyparquet` library.
* **Why it's likely AI Drift:** "AI Over-Verification." The AI is adding defensive layers for structural constraints that are already strictly handled by the downstream consumer (`parquetReadObjects`). It's catching a failure that the library is designed to throw.
* **Remediation:** Remove the manual byte check; rely on the library's internal validation.

* **Location:** `boomtick-pkg/cli/dev_tools/orchestrator.py` (Lines 418-422)
* **The Slop:** Multiple `try/except` blocks catching `Exception` to log a generic error message and return `None` or an empty dict, obscuring the actual stack trace.
* **Why it's likely AI Drift:** Cargo-culting "safe" error handling patterns across every method in a God Object, resulting in a system that fails silently and makes debugging difficult.
* **Remediation:** Allow exceptions to propagate to the top-level handler to preserve tracebacks and meaningful exit codes.
