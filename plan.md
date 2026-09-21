The CI failed on the `lint:ox` step.
Annotations show:
  [WARNING] File: tests/blog-post.spec.ts, Line: 1
    Message: Identifier 'expect' is imported but never used.
  [WARNING] File: tests/blog-post-mobile.spec.ts, Line: 1
    Message: Identifier 'expect' is imported but never used.

My previous changes to these files removed `expect` but didn't clean up the imports:

In `tests/blog-post-mobile.spec.ts`:
```typescript
import { test, expect, devices } from '@playwright/test';
// ...
```
In `tests/blog-post.spec.ts`:
```typescript
import { test, expect } from './fixtures/visual';
// ...
```

I need to remove `expect` from the import statements in both files, run `pnpm run lint:ox` to verify, and then submit the changes.

1. **Remove unused `expect` imports in `tests/blog-post.spec.ts` and `tests/blog-post-mobile.spec.ts`**.
2. **Run `pnpm run lint:ox` locally** to make sure the fix is complete.
3. Complete pre commit steps to ensure proper testing, verification, review, and reflection are done.
4. **Submit the fix.**
