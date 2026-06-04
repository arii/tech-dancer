## Summary

- Fixed duplicate `notice` and `Notice` keys in `MarkdownRenderer.tsx` which caused `lint:eslint` failure.
- Fixed a missing closing bracket `}` in `src/index.css` which caused the Vite build to fail when parsing `@layer utilities`.
- Regenerated screenshots modified by earlier changes.

## Self-Review Completed

- Reviewed diff against `main`
- Fixed issues found during self-review
- Confirmed change scope is focused
- Removed dead/debug code
- Checked UI behavior where applicable
- Checked accessibility basics where applicable

## Validation

- [x] `pnpm lint`
- [x] `pnpm typecheck`
- [x] `pnpm test`
- [x] `pnpm build`
- [x] Manual UI review

## Notes

None.
