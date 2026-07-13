1.  **Analyze CI failures**
    *   The `lint` job failed because of unused `fs` and `path` imports in the `boomtick-pkg/scripts/impact-*.ts` files.
2.  **Fix `impact-gemini-code-review.ts`**
    *   Remove unused `fs` and `path` imports.
3.  **Fix `impact-gemini-review.ts`**
    *   Remove unused `fs` and `path` imports.
4.  **Fix `impact-github-models-code-review.ts`**
    *   Remove unused `fs` and `path` imports.
5.  **Fix `impact-github-models-review.ts`**
    *   Remove unused `fs` and `path` imports.
6.  **Run tests and linters**
    *   Run `pnpm run lint:eslint` to verify the fixes.
7.  **Submit the change**
    *   Submit the change with a descriptive commit message.
