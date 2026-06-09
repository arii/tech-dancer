This PR fixes a lint/build error in `MarkdownRenderer` by dropping a large dependency (`mermaid`) and converting the diagram rendering to use the remote `mermaid.ink` service.

**Feedback:**
- **What is working well:** Removing a massive dependency like `mermaid.js` significantly improves bundle size and build speed, aligning with the project's goal of lightweight, static rendering. Generating `mermaid.ink` URLs directly from code is a smart workaround to preserve functionality while satisfying build constraints.
- **Issues to fix:** None. The tests pass and the changes effectively resolve the linter duplicate key warning by rewriting the component code map.
- **Actionable instructions:** Ready for merge.

**CI Status:** ✅ All CI checks are passing.
