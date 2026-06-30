# Final Merge Strategy

Based on the audits:
- **PR #3174**: Ready to be merged immediately.
- **PR #3173**: Needs CI fixes before it can be merged. It also overlaps significantly with PR #3168 in modifying github action files for CI performance. **PR #3168 is preferred** because it explicitly introduces caching for Playwright Browsers and pip, addressing the container bottlenecks fundamentally, while #3173 makes a broader sweep changing `td_cli.py` references to `td-cli` which is already handled perfectly by PR #3169.
- **PR #3172**: Needs CI fixes before it can be merged.
- **PR #3171**: Ready to be merged immediately. Overlaps slightly with #3167, likely #3171 and #3167 should be consolidated as they both introduce Schema-Driven Contract Pipeline changes. **PR #3171 is preferred** because it adds comprehensive Zod schemas and successfully updates tests handling the `file` parameter, whereas #3167 only updates the context builder.
- **PR #3170**: Ready to be merged immediately.
- **PR #3169**: Ready to be merged immediately.
- **PR #3168**: Needs CI fixes before it can be merged. Should be consolidated with #3173 (this PR is the better approach for container bottlenecks).
- **PR #3167**: Ready to be merged immediately. Should be consolidated with #3171 (PR #3171 is preferred).
