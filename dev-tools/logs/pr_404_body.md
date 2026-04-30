This PR implements a comprehensive link integrity system as requested.

Key features:
1.  **Manual Link Validator Action**: The `.github/workflows/link-validator.yml` can be triggered manually via workflow dispatch to ensure link integrity.
2.  **Comprehensive Validation**: The `scripts/validate-links.ts` script:
    *   Extracts valid internal routes from content slugs and the directory map.
    *   Parses all Markdown files in `content/` for links and images (including frontmatter).
    *   Validates internal links against discovered routes.
    *   Validates external links and images via HTTP requests with a 10s timeout and retry logic.
3.  **Automated Reporting**: If broken links are detected, the workflow creates or updates a "Link Integrity Report" issue on GitHub with details.
4.  **Integration**: The system uses existing project utilities like `scripts/content-loader.ts` for route discovery.

The script has been verified locally and correctly identifies existing dead links and placeholders in the current codebase.

Fixes #398

---
*PR created automatically by Jules for task [4691993855369166304](https://jules.google.com/task/4691993855369166304) started by @arii*
