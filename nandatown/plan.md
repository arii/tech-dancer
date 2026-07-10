# 📋 Implementation Plan: Latest Version Check API & Skill for NandaHack

This document outlines the step-by-step instructions to integrate the **Latest Version Check** API as a standalone feature inside the `tech-dancer` repository, ensuring that it coexists safely with the existing Vite SPA and fits the constraints of our repository.

---

## 1. Context and Goals
- **Goal**: Expose the live version-checking logic from our Python dev tools (`boomtick-pkg/cli/dev_tools/version_utils.py` and `verify_versions.py`) as a public HTTP API on `boomtick.blog/api/*` and host a `SKILL.md` file describing how AI agents can use this API to prevent version downgrade hallucinations.
- **Constraints**:
  - The API must be completely additive and hosted on Vercel as serverless functions with zero risk of breaking or altering the main client-side Vite SPA (`src/`).
  - Strict compliance with all rules in `AGENTS.md` (e.g. sorted imports, no `any` / strict types, proper `pnpm` usage).

---

## 2. File Placement & Mapping
The files currently in the `nandatown/` folder must be copied to their respective target paths in the repository root:

| Source File | Destination File | Description |
|---|---|---|
| `nandatown/latest-version.ts` | `api/latest-version.ts` | Serverless endpoint for getting the latest version of a dependency |
| `nandatown/compare-version.ts` | `api/compare-version.ts` | Serverless endpoint for comparing a candidate version against latest |
| `nandatown/versions.ts` | `api/_lib/versions.ts` | Shared TypeScript version fetching and parsing logic (ported from `version_utils.py`) |
| `nandatown/SKILL.md` | `public/skill.md` | Skill description file (served statically at `boomtick.blog/skill.md` to earn the Nanda Town reachability badge) |
| `nandatown/latest-version-check-blog-post.md` | `content/blog/2026-07-10-latest-version-check-skill.md` | Blog post announcement aligned with the repository's markdown structure and frontmatter standards |

---

## 3. Step-by-Step Execution Plan

### Step 3.1: Create Branch & Setup Environment
1. **Create Branch**: If run by an agent, use the Tier 1 MCP tool `repo.create_branch` or Tier 2 `td-cli` command:
   ```bash
   td-cli gh checkout-branch --branch feature/latest-version-skill  # Or use MCP repo.create_branch
   ```
   *(Note: Direct git pushes are blocked for agents in this sandbox environment. Submissions must go through the proper workflow tools).*
2. **Install Dev Dependency**: Add `@vercel/node` to the root `package.json` for serverless function types. Make sure to use `pnpm` exclusively:
   ```bash
   pnpm add -D @vercel/node
   ```
3. **Run Install**: Ensure all node modules are up-to-date:
   ```bash
   pnpm install
   ```

### Step 3.2: Copy and Move Files
Create the necessary directories and copy the files according to the mapping in Section 2:
```bash
mkdir -p api/_lib
cp nandatown/latest-version.ts api/latest-version.ts
cp nandatown/compare-version.ts api/compare-version.ts
cp nandatown/versions.ts api/_lib/versions.ts
cp nandatown/SKILL.md public/skill.md
cp nandatown/latest-version-check-blog-post.md content/blog/2026-07-10-latest-version-check-skill.md
```

### Step 3.3: Verify Build & Lint Isolation
1. **TypeScript check**: Confirm that the Vite React SPA build is not affected by `/api`. The root `tsconfig.app.json` has `"include": ["src"]` which excludes `api/` by default.
2. **ESLint check**: Run the linter to verify that the new endpoints do not violate any style rules or typescript rules (such as Rule 5 "No any"):
   ```bash
   pnpm run lint
   ```
   *(Note: ESLint lints `**/*.{ts,tsx}` in the workspace, so the new files will be scanned. Having `@vercel/node` in `devDependencies` ensures type imports resolve successfully during lint).*

### Step 3.4: Local Sanity Check
Test both the React SPA and the Serverless Functions locally under the same dev server using Vercel CLI:
```bash
npx vercel dev
```
Verify the endpoints return expected payloads:
```bash
curl "http://localhost:3000/api/latest-version?ecosystem=node"
curl "http://localhost:3000/api/latest-version?ecosystem=npm&name=pnpm"
curl "http://localhost:3000/api/latest-version?ecosystem=gh-action&name=actions/checkout"
curl "http://localhost:3000/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4"
```

### Step 3.5: Configure Environment Variables
Before deploying, set the `GITHUB_TOKEN` variable in the Vercel Dashboard (`Settings → Environment Variables`) for **both** Preview and Production scopes. This prevents API rate limiting when searching GitHub releases for `gh-action` lookups.

### Step 3.6: Push, Preview, and Merge
1. Commit the changes and open a pull request using the project's workflow tools.
2. Verify that Vercel successfully compiles a Preview deployment.
3. Test the curl commands against the public Vercel Preview URL:
   ```bash
   curl "https://<preview-url>/api/latest-version?ecosystem=node"
   ```
4. Merge the PR once the CI checks pass and preview endpoints are confirmed.

---

## 4. Nanda Town Submission Form Reference
When submitting on the Nanda Town skills page:
- **Skill Name**: `Latest Version Check`
- **One-line Description**: `Live latest-version lookups so agents stop "correcting" unfamiliar-but-current versions back to stale ones.`
- **Hosted SKILL.md Link**: `https://boomtick.blog/skill.md` (or the raw GitHub link once merged)
- **Endpoints**:
  ```http
  GET https://boomtick.blog/api/latest-version?ecosystem={npm|node|gh-action}&name={name}
  GET https://boomtick.blog/api/compare-version?ecosystem={npm|node|gh-action}&name={name}&candidate={version}
  ```
- **Tags**: `versions, ci, dependencies, hallucination-mitigation`
