analyze_overlaps.sh: analyze pr overlaps
analyze_workflows.sh: analyze workflow overlaps
this can then be used in agent workflow to address incoming requests for resolving conflicts from many prs that touch similiar files.

for example
```
/review-pr see prs to workflow changes:


File: .github/workflows/deploy.yml
PRs: PR #739 files: PR #677 files:
---
File: .github/workflows/ci.yml
PRs: PR #746 files: PR #745 files: PR #739 files: PR #680 files:
---
File: .github/workflows/validate_issue.yml
PRs: PR #739 files: PR #725 files:
---

then create a single branch that will merge all of these files and create a pr for it. close the old prs your reviwed. 
```