---
type: blog
title: "From Confidently Incorrect to Compulsively Verified: Building a Latest Version Check Skill"
date: "2026-07-10"
author: "Ariel Anders, PhD"
category: "DevAI"
excerpt: "A follow-up to the actions/checkout@v4 hallucination post — this time, shipping the fix as a live API and an OpenClaw SkillMD for NandaHack."
image: ""
imageAlt: ""
tags: ["automation", "ci", "dependencies", "ai"]
---

Last month I wrote about watching my own coding agent [confidently downgrade `actions/checkout@v6` back to `v4`](/blog/confidently-incorrect-the-latest-stable-major-version-is-v4) — not because `v6` was wrong, but because the agent had never seen it during training and treated "unfamiliar" as "hallucinated." Classic out-of-distribution error. Harmless-looking, expensive in CI minutes.

I said at the time I'd keep pushing dependabot rather than fight it. That's still mostly true. But NandaHack gave me a good excuse to actually close the loop: instead of just diagnosing the failure mode, ship something that prevents it.

## The shape of the problem

The pattern repeats across three surfaces in this repo:

- `package.json` dependency versions
- `.nvmrc` / `.node-version` / `engines.node`
- `.github/workflows/*.yml` `uses:` pins

In every case, the failure is the same: an agent's internal sense of "the latest version I know about" silently overrides what's actually true right now. My existing `verify_versions.py` / `version_utils.py` tooling already catches this *after the fact* — it diffs a PR, checks proposed versions against HEAD and against the real registries (npm, nodejs.org, GitHub Releases), and hard-blocks Node.js downgrades unless explicitly overridden. It's a good backstop.

What it isn't is something an agent can consult *before* it writes the bad edit in the first place.

## Latest Version Check

For NandaHack I packaged the same live-registry-lookup logic as a small public API and a `SKILL.md` that tells any OpenClaw-compatible agent how to use it:

```
GET /api/latest-version?ecosystem=gh-action&name=actions/checkout
→ { "ecosystem": "gh-action", "name": "actions/checkout", "latest": "v6.0.1", ... }

GET /api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4
→ { "candidate": "v4", "latest": "v6.0.1", "isOutdated": true, ... }
```

The instruction to the agent is deliberately blunt: if you don't recognize a version string, that's a reason to *check*, not a reason to *revert*. Unfamiliarity isn't evidence of error.

## Keeping it additive

The API lives at `boomtick.blog/api/*` as two small Vercel serverless functions sitting next to the existing Vite SPA — same domain, same deploy pipeline, zero changes to `src/`. That constraint mattered more to me than the feature itself: I wasn't willing to risk the blog's uptime over a hackathon entry. It shipped on a feature branch, got curl-tested against a Vercel preview URL, and merged only once the preview responses looked right.

The Python side (`dev_tools/verify_versions.py`) keeps doing what it already does — gating PR diffs in CI. The new API is a separate, narrower tool: a live oracle an agent can query mid-edit, not a replacement for the existing CI gate.

## What's next

Right now `compare-version` answers "is this a downgrade relative to the real latest," which covers the case from the original post. The natural extension is teaching it about *deprecation* too — flagging when a candidate version still resolves but is EOL, which is a related but distinct failure mode from the one that started this.

If you're building agent tooling and hitting the same "confidently wrong about recency" problem, the `SKILL.md` and both endpoints are public — feel free to point your own agents at them, or fork the idea.
