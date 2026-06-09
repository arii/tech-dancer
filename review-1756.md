This PR adds the "Ecommerce Automation Experiments" section to the research portfolio, implementing new content and UI components.

**Feedback:**
- **What is working well:** The PR description clearly specifies that it addresses SEO safety guidelines regarding pricing/stock and integrates well with the design tokens.
- **Issues to fix:** The PR state is currently marked as `CONFLICTING` with the base branch. Additionally, the `deploy` CI job is failing. The diff snippet shows the addition of a new post `content/studies/ai-devops-pipeline.md`, which seems misaligned with the PR title focused on "Ecommerce Automation".
- **Actionable instructions:** Rebase the branch onto `main` to resolve merge conflicts. Review the added content (`ai-devops-pipeline.md`) to ensure it actually matches the stated goal of adding "Ecommerce Automation" experiments. If the content is incorrect, update it. Once resolved, investigate the `deploy` job failure.

**CI Status:** ❌ PR has merge conflicts and `deploy` job failed.
