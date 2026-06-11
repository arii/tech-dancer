## Problem

The repository contains blog post drafts that read like AI-generated placeholder content or "vaporware" announcements for tools/guides that do not currently exist in the repository or have substantive implementation details.

## Location

- File: `content/posts/2026-04-18-competition-metrics.md`
- File: `content/posts/2026-04-18-financial-literacy-dancers.md`

## Evidence

**From `2026-04-18-competition-metrics.md`:**
> "I am excited to announce the development of the WCS Competition Data Scraper... Stay tuned for the official release in the DevAI Portfolio."

**From `2026-04-18-financial-literacy-dancers.md`:**
> "I am currently drafting a Comprehensive Financial Strategy Guide... The full guide is undergoing final review and will be available in the coming weeks."

## Why this is a problem

Publishing placeholder content that overpromises features not found in the repository creates a poor user experience, undermines the credibility of the blog, and acts as "SEO filler" rather than delivering actual value to the reader.

## Recommended action

- Move to draft mode until rewritten (note: they currently have `draft: true` but the content itself needs fixing before it can be published).
- Rewrite with specific examples.
- Add implementation details from the actual repo.

## Rewrite guidance

- For the `competition-metrics` post, include actual data, diagrams, or links to the scraper code once it exists. If it's a theoretical piece, frame it as research rather than an impending product launch.
- For the `financial-literacy` post, remove the "coming soon" language and either publish the actual advice/guide or keep it unpublished until the content is fully written and actionable.

## Acceptance criteria

- [ ] Content no longer overpromises upcoming features without substance.
- [ ] Unsupported claims are removed or sourced.
- [ ] Draft-quality content remains in draft mode until the missing pieces (tools, guides) are actually completed.
- [ ] Public content gives concrete user value.