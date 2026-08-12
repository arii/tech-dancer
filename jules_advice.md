### 1. PR #4197: Add Slot Era Merchandise Products
* **Status:** Draft
* **Checks:** All completed checks have passed (Impact Analysis is currently pending).
* **Why it's stuck:** The automated `gemini-code-review` bot left a `[STYLE]` review finding that recommends moving the `MerchItem` interface from `src/lib/affiliateManager.ts` to `src/types.ts`. However, Jules is designed to ignore other bots to prevent noise and will only act on instructions from the user who triggered the task.
* **How to unblock:** You need to explicitly tell Jules to address the feedback. Leave a comment on the PR like:
  > *"@jules please address the Style review and move the `MerchItem` interface to `src/types.ts`."*
  Alternatively, if you are happy with the code as-is, you can simply mark the PR as ready and merge it.

### 2. PR #4175: Render legible Mermaid diagrams in dark mode
* **Status:** Draft
* **Checks:** All checks have passed.
* **Why it's stuck:** The `gemini-code-review` bot gave a `PASS` verdict but left a minor `[ARCHITECTURE]` note regarding a redundant `btoa` polyfill (the `typeof window !== 'undefined' ? window.btoa(binary) : btoa(binary)` check). Since the overall verdict was a pass and it came from a bot, Jules is just waiting in Draft mode for your final review or instructions.
* **How to unblock:** If you want that minor optimization applied, leave a comment for Jules:
  > *"@jules please simplify the `btoa` call to remove the redundant window check as suggested."*
  If you are fine with the current implementation, you can just merge the PR.

**Summary:**
Jules is working as intended but is currently ignoring the AI bot reviews. To unblock these sessions, you simply need to review the AI suggestions and translate the ones you want implemented into a direct comment from your account (e.g., mentioning `@jules`).
