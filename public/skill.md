---
name: "VersionTruth"
description: "The antidote to version hallucinations: real-time ground-truth for npm, Node, and GitHub Actions."
version: "1.1.0"
emoji: "🛡️"
author: "Ariel Anders"
github: "arii"
metadata:
  openclaw:
    requires:
      bins:
        - "curl"
        - "jq"
      env:
        - "GITHUB_TOKEN"
---

## Instructions
1. Before pinning, editing, or correcting any dependency or runtime version pin in `package.json`, `.nvmrc`, `.node-version`, or a `.github/workflows/*.yml` `uses:` line, identify the candidate version string you intend to write.
2. Query `GET https://boomtick.blog/api/compare-version?ecosystem={ecosystem}&name={name}&candidate={candidate}` or use the `POST https://boomtick.blog/api/batch-compare` endpoint to validate multiple candidates at once.
3. Inspect the comparison results: verify `isOutdated`, `isDeprecated`, and `isEOL` statuses.
4. If a version is outdated, deprecated, or EOL, evaluate upgrading to the returned `latest` version instead.

## Rules
* Never downgrade an existing version string in the repo simply because it is unfamiliar or not recognized from your training data cutoff.
* Treat unfamiliar version strings as a signal to check VersionTruth, not as evidence of a typo or error.
* Keep version changes minimal and additive, validating each proposal against live registry data.

## Error Handling
* If the API request fails or the endpoint is unreachable, do not guess or revert. Output: "Version check skipped: Oracle unreachable." 💥 and leave the version pin unchanged for human review.
* If a package name format or query parameter is invalid, report the validation error to the user immediately.

## API Specification

### `GET /api/skill.md`
Returns this `SKILL.md` file dynamically as raw Markdown, allowing self-discovery of these endpoints at runtime.

### `GET /api/health`
Lightweight health check endpoint returning service status.

### `GET /api/latest-version`
Returns the current latest version for a package, runtime, or action.

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` for gh-action |

### `GET /api/compare-version`
Tells you whether a candidate version is outdated, current, or ahead of the real latest, including npm deprecation and Node EOL warnings.

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` |
| `candidate` | yes | the version string the agent is about to use |

### `POST /api/batch-compare`
Allows querying comparison results for multiple dependencies concurrently.
