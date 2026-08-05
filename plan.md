1. **Scope Discovery**: Generate the total count of files in the repository to maintain `drift-audit-status.md` and complete a 24-hour modified files list.
2. **Remove Defensive Error Handling**: Remove `catch (e) { throw new Error(...) }` blocks in TypeScript and `except Exception: raise` blocks in Python.
3. **Fix Eager ML Imports**: Modify `boomtick-pkg/lib/geminiUtils.ts` to lazily import `@langchain/google-genai` and `@langchain/core/messages` instead of at the top level.
4. **Create Drift Checklist**: Generate `drift-audit-status.md` logging all 588 files as `Verified Clean` or modified based on the steps above.
5. **Run tests & complete pre commit steps**: Run `td doctor`, `pnpm lint`, `pnpm test`, and `td repo run-playwright` and complete pre commit steps to ensure proper testing, verification, review, and reflection are done.
6. **Submit**: Use the `submit` tool to finalize the code.
