# VersionTruth

**What it does:** Tells an agent the *actual current* version of an npm package, Node.js, or a GitHub Action — fetched live from the registry, not recalled from training data. Use it before pinning or "correcting" any version string in `package.json`, `.nvmrc`, `.node-version`, or a `.github/workflows/*.yml` `uses:` line.

**Why this exists:** Coding agents are frequently *confidently wrong* about "the latest version" of a dependency, because their training data has a cutoff and newer releases don't exist in it yet. A common failure mode: the agent sees `actions/checkout@v6` in a real, correct workflow file, doesn't recognize `v6` because it only ever saw up to `v4` during training, assumes the human made a typo or hallucinated it, and "helpfully" downgrades it to `v4` — breaking CI. This is a classic out-of-distribution error, not a real bug in the code. VersionTruth gives the agent a live ground-truth check so it stops treating "unfamiliar" as "wrong."

**Base URL:** `https://boomtick.blog/api`

## Endpoints

### `GET /api/skill.md`
Returns this `SKILL.md` file dynamically as raw Markdown, allowing self-discovery of these endpoints at runtime.

```
GET /api/skill.md
→ (Returns the Markdown contents of this file)
```

### `GET /api/health`
Lightweight health check endpoint returning service status.

```
GET /api/health
→ { "status": "ok", "service": "VersionTruth", "checkedAt": "..." }
```

### `GET /api/latest-version`
Returns the current latest version for a package, runtime, or action.

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` for gh-action |

```
GET /api/latest-version?ecosystem=gh-action&name=actions/checkout
→ { "ecosystem": "gh-action", "name": "actions/checkout", "latest": "v6.0.1", "checkedAt": "..." }

GET /api/latest-version?ecosystem=node
→ { "ecosystem": "node", "name": "node", "latest": "24.16.0", "checkedAt": "..." }
```

### `GET /api/compare-version`
Tells you whether a candidate version is outdated, current, or ahead of the real latest, including npm deprecation and Node EOL warnings.

| param | required | values |
|---|---|---|
| `ecosystem` | yes | `npm` \| `node` \| `gh-action` |
| `name` | required unless `ecosystem=node` | npm package name, or `owner/repo` |
| `candidate` | yes | the version string the agent is about to use |

```
GET /api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4
→ { "ecosystem": "gh-action", "name": "actions/checkout", "candidate": "v4",
    "latest": "v6.0.1", "isOutdated": true, "isCurrent": false, "isAheadOfLatest": false,
    "isDeprecated": false }
```

### `POST /api/batch-compare`
Allows querying comparison results for multiple dependencies concurrently.

```
POST /api/batch-compare
Body: [
  { "ecosystem": "npm", "name": "pnpm", "candidate": "9.0.0" },
  { "ecosystem": "gh-action", "name": "actions/checkout", "candidate": "v6" }
]
→ [
    { "ecosystem": "npm", "name": "pnpm", "candidate": "9.0.0", "latest": "10.28.2", "isOutdated": true, ... },
    { "ecosystem": "gh-action", "name": "actions/checkout", "candidate": "v6", "latest": "v6.0.1", "isOutdated": false, ... }
  ]
```

## How an agent should use this

1. Before editing a version pin anywhere in the repo (dependency, runtime, or Action), call `GET /api/compare-version` or `POST /api/batch-compare`.
2. If `isOutdated` is `true` or `isDeprecated`/`isEOL` is `true` — evaluate carefully. If you were about to lower the version that's already in the file, stop.
3. If you don't recognize a version string (e.g. `v6` looks unfamiliar), that is a signal to check VersionTruth, not a signal that the code is wrong.
4. If the endpoint is unreachable, don't guess — leave the version untouched and flag it for human review instead.
