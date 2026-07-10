# 📋 Implementation Plan: VersionTruth API & Skill for NandaHack

This document outlines the step-by-step instructions to integrate the **VersionTruth** API as a standalone feature inside the `tech-dancer` repository, ensuring that it coexists safely with the existing Vite SPA and fits the constraints of our repository.

---

## 1. Context and Goals
- **Goal**: Expose the live version-checking logic from our Python dev tools (`boomtick-pkg/cli/dev_tools/version_utils.py` and `verify_versions.py`) as a public HTTP API on `boomtick.blog/api/*` and host a `SKILL.md` file describing how AI agents can use this API to prevent version downgrade hallucinations.
- **Rebranding**: Rebrand from "Latest Version Check" to **VersionTruth** ("The antidote to version hallucinations: real-time ground-truth for npm, Node, and GitHub Actions") to highlight its value proposition.
- **Additional Roadmap Features**:
  - Expose `/api/skill.md` returning the raw `SKILL.md` file content.
  - Expose `/api/health` status check.
  - Support POST `/api/batch-compare` to validate multiple packages in a single call.
  - Fetch deprecation information from npm registry and LTS EOL information from `endoflife.date`.
  - Expose a dedicated `/versiontruth` landing page on the client-side SPA.

---

## 2. File Placement & Mapping

| Source File | Destination File | Description |
|---|---|---|
| `nandatown/latest-version.ts` | `api/latest-version.ts` | Endpoint for fetching the latest version |
| `nandatown/compare-version.ts` | `api/compare-version.ts` | Endpoint for comparing a candidate version, extended with EOL/deprecation checks |
| `nandatown/versions.ts` | `api/_lib/versions.ts` | Version lookups and comparison helpers, extended with fetch logic for npm deprecation and Node EOL |
| - | `api/skill.md.ts` | Serverless function that reads and returns `public/skill.md` as raw markdown |
| - | `api/health.ts` | Serverless function returning service health status |
| - | `api/batch-compare.ts` | POST endpoint to execute multiple comparisons in parallel |
| `nandatown/SKILL.md` | `public/skill.md` | Skill description file (served statically at `boomtick.blog/skill.md` and dynamically at `/api/skill.md`) |
| `nandatown/latest-version-check-blog-post.md` | `content/blog/2026-07-10-latest-version-check-skill.md` | Rebranded blog post announcement |
| - | `src/pages/VersionTruth.tsx` | Main SPA landing page showing descriptions and interactive examples |
| - | `src/components/ui/EndpointCard.tsx` | Reusable sub-component displaying endpoints and toggleable example payloads (keeps page under 150 lines) |

---

## 3. Step-by-Step Execution Plan

### Step 3.1: Setup Environment & Workspace Root
1. **Branch Checkout**: Verify that you are working on the branch `feature/latest-version-skill`.
2. **Install Dev Dependency**: Ensure `@vercel/node` is installed in `devDependencies` at the workspace root:
   ```bash
   pnpm add -D @vercel/node -w
   ```
3. **Run Install**: Ensure all node modules are up-to-date:
   ```bash
   pnpm install
   ```

### Step 3.2: Copy and Create Files
Move and place the source files into their target directories, and create the new serverless/SPA files.

### Step 3.3: Verify Build & Lint Isolation
1. **TypeScript check**: Run compiler check over the new `/api` and client files:
   ```bash
   pnpm run type-check
   ```
2. **ESLint check**: Run the linter to verify that the new endpoints and SPA components do not violate any style/types rules:
   ```bash
   pnpm run lint
   ```

### Step 3.4: Local Sanity Check
Test both the React SPA and the Serverless Functions locally under the same dev server using Vercel CLI:
```bash
npx vercel dev
```
Verify the endpoints return expected payloads:
```bash
curl "http://localhost:3000/api/latest-version?ecosystem=node"
curl "http://localhost:3000/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4"
curl "http://localhost:3000/api/health"
curl "http://localhost:3000/api/skill.md"
curl -X POST "http://localhost:3000/api/batch-compare" -H "Content-Type: application/json" -d '[{"ecosystem":"node","candidate":"18"},{"ecosystem":"npm","name":"pnpm","candidate":"10.28.2"}]'
```

### Step 3.5: Configure Environment Variables
Set the `GITHUB_TOKEN` variable in the Vercel Dashboard for both Preview and Production scopes.

### Step 3.6: Push, Preview, and Merge
1. Push branch modifications.
2. Verify Preview deployment compiles on Vercel.
3. Merge the PR once CI checks pass.
