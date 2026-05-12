# Mass PR Audit Tracking - 2026-05-12

| PR # | Title                                         | CI Status | Outcome  | Recommendation | Overlap Notes                         |
| :--- | :-------------------------------------------- | :-------- | :------- | :------------- | :------------------------------------ |
| 1197 | CI Optimization: Custom Docker image          | 🟢 SUCCESS| 🔴 FAIL   | **BLOCK**      | Slop: 35 unrelated files changed.     |
| 1200 | Standardize UI patterns and enhance Text      | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | Design: Phase 1 & 2.                  |
| 1195 | Icon Normalization Helper                     | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | Design: Phase 3.                      |
| 1194 | Design System Compliance Audit and Fix        | ⏳ PEND   | ✅ PASS   | **WAIT**       | Compliance: CI in progress.           |
| 1203 | Enhance Footer with App Version and Hash      | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | UX: Versioning in footer.             |
| 1202 | Integrate useEventDetail into EventGuide      | 🔴 FAIL   | ✅ PASS   | **BLOCK**      | Feature: Lint/Type errors detected.   |
| 1199 | Optimize HeroParticleCanvas Performance       | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | Perf: Throttling animation.           |
| 1198 | [Content] Enrich Event Resource Guides        | 🔴 FAIL   | ✅ PASS   | **BLOCK**      | Content: E2E failure.                 |
| 1192 | Extend Event Interface in content.ts          | ⏳ PEND   | ✅ PASS   | **WAIT**       | Infra: CI in progress.                |
| 1178 | ci: fix actionlint execution                  | 🔴 FAIL   | ✅ PASS   | **BLOCK**      | CI: Finds errors in ci.yml.           |
| 1155 | Implement Parquet Lazy Loading                | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | Perf: Data Lab optimization.          |
| 1150 | Optimize Visual Snapshots                     | ⏳ PEND   | ✅ PASS   | **WAIT**       | QA: CI in progress.                   |
| 1112 | Add workflow validation in CI                 | 🔴 FAIL   | ✅ PASS   | **BLOCK**      | CI: Expected failure (fixed by 1178). |
| 1109 | [FE] Text Primitive API Enhancements          | 🟢 SUCCESS| ✅ PASS   | **APPROVE**    | Design: Responsive typography.        |

## Merge Strategy Recommendation (READY TO SUBMIT)

The following PRs have passed all CI checks and are ready for merge:

1. **Design**: #1200, #1195, #1109
2. **Features/UX**: #1203, #1199, #1155

## Pending Stabilization

The following PRs are blocked by CI failures or are in progress:

- **Blocked**: #1197 (Kitchen Sink: 35 unrelated files), #1178 (Lints ci.yml error), #1202 (Type errors), #1198 (E2E failure), #1112 (Requires #1178 fix).
- **In Progress**: #1194, #1192, #1150.
- **Reject**: #1193.

## Skipped PRs

(None)
