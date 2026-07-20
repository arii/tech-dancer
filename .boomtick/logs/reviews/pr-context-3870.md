# PR Context: #3870 — Fix ERR_MODULE_NOT_FOUND for check-visual-changes.ts
**Author:** @google-labs-jules[bot]

## Description
Resolves the ERR_MODULE_NOT_FOUND error under Node 24.x when running check-visual-changes.ts in the impact-analysis workflow by resolving paths using realpath and robust fallback lookups.

Fixes #3864

---
*PR created automatically by Jules for task [12513668987210738882](https://jules.google.com/task/12513668987210738882) started by @arii*

## CI Status
- ⏳ **build**: completed (skipped)
- ⏳ **deploy**: completed (skipped)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed

## Diffs