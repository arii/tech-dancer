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
---

## Instructions
1. Before pinning, editing, or correcting any dependency or runtime version pin in `package.json`, `.nvmrc`, `.node-version`, or a `.github/workflows/*.yml` `uses:` line, identify the candidate version string you intend to write.
2. Query `GET https://boomtick.blog/api/compare-version?ecosystem={ecosystem}&name={name}&candidate={candidate}` or use the `POST https://boomtick.blog/api/batch-compare` endpoint to validate multiple candidates at once.
3. Inspect the comparison results: verify `isOutdated`, `isCurrent`, and `isDeprecated` statuses (for npm this indicates deprecation; for Node this indicates End-of-Life).
4. If a version is outdated, deprecated, or EOL, evaluate upgrading to the returned `latest` version instead.

## Rules
* Never downgrade an existing version string in the repo simply because it is unfamiliar or not recognized from your training data cutoff.
* Treat unfamiliar version strings as a signal to check VersionTruth, not as evidence of a typo or error.
* Keep version changes minimal and additive, validating each proposal against live registry data.
* Responses are cached for 30 minutes at the edge; do not hammer the endpoints with repeated requests for the same package/version within a single session.

## Error Handling
* If the API request fails or the endpoint is unreachable, do not guess or revert; leave the version pin unchanged and note in your execution logs that the check could not be completed.
* If a package name format or query parameter is invalid, report the validation error to the user immediately.

## API Specification

**Base URL**: `https://boomtick.blog/api`

### `GET /skill.md`
Returns this `SKILL.md` file dynamically as raw Markdown, allowing self-discovery of these endpoints at runtime.

### `GET /health`
Lightweight health check endpoint returning service status.

### `GET /latest-version`
Returns the current latest version for a package, runtime, or action.

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` for gh-action |

**Example request**:
```bash
curl -s "https://boomtick.blog/api/latest-version?ecosystem=gh-action&name=actions/checkout"
```

**Example response**:
```json
{
  "ecosystem": "gh-action",
  "name": "actions/checkout",
  "latest": "v4.2.2",
  "checkedAt": "2026-07-10T08:30:00.000Z"
}
```

---

### `GET /compare-version`
Tells you whether a candidate version is outdated, current, or ahead of the real latest, including npm deprecation and Node EOL warnings (exposed via `isDeprecated`).

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` |
| `candidate` | yes | the version string the agent is about to use |

**Example request**:
```bash
curl -s "https://boomtick.blog/api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4" | jq '.isOutdated'
```

**Example response**:
```json
{
  "ecosystem": "gh-action",
  "name": "actions/checkout",
  "candidate": "v4",
  "latest": "v4.2.2",
  "isOutdated": true,
  "isCurrent": false,
  "isAheadOfLatest": false,
  "isDeprecated": false,
  "checkedAt": "2026-07-10T08:30:00.000Z"
}
```

---

### `POST /batch-compare`
Allows querying comparison results for multiple dependencies concurrently.

**Example request**:
```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '[
    { "ecosystem": "npm", "name": "pnpm", "candidate": "9.0.0" },
    { "ecosystem": "gh-action", "name": "actions/checkout", "candidate": "v4" }
  ]' \
  "https://boomtick.blog/api/batch-compare"
```

**Example response**:
```json
[
  {
    "ecosystem": "npm",
    "name": "pnpm",
    "candidate": "9.0.0",
    "latest": "10.28.2",
    "isOutdated": true,
    "isCurrent": false,
    "isAheadOfLatest": false,
    "isDeprecated": false
  },
  {
    "ecosystem": "gh-action",
    "name": "actions/checkout",
    "candidate": "v4",
    "latest": "v4.2.2",
    "isOutdated": true,
    "isCurrent": false,
    "isAheadOfLatest": false,
    "isDeprecated": false
  }
]
```

## Changelog
### 1.1.0
* Introduced `/api/batch-compare` POST endpoint for concurrent checks.
* Exposed `/api/skill.md` for self-discovery.
* Added `/api/health` health verification route.
* Integrated IP-based rate limiting on all endpoints.
