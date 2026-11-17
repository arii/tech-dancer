# BoomTick design system

Status: approved by Ari, 2026-11-17. Every UI PR is judged against this page. Changing it needs its own PR.

## Why this exists
| Root cause found in the audit | Rule in this spec |
|---|---|
| D1 (#4880) had no written system and no definition of done, so each round fixed one element by eye | One spec (this page) and a definition of done (below) |
| 4 web fonts load on `main`, but `index.html:37` forces `system-ui` on `body`, so live text is mostly the OS font | 2 typefaces; no font rules outside the tokens |
| 13 text sizes, 6 weights, 5 font roles, 104 raw `font-*` classes, nothing enforced in CI | 6 sizes, 2 weights, 6 text roles; CI fails anything else |
| Template decoration: kicker labels, "01 / SECTION" counters, uppercase mono micro-labels | No decorative labels; one plain label style |
| #4878, #4879 and #4887 edited the same home page on different bases | One UI PR at a time, on one base |

## Typography
**Typefaces (2)**
- **Headings:** Playfair Display.
- **Everything else** (body, nav, buttons, dates, labels, pills): Albert Sans.
- Code blocks only: the system monospace stack (no web font).
- Removed: Space Mono and Bricolage Grotesque as web fonts.
- **Logo:** the current Bricolage "boomtick.blog" lettering stays, as a fixed SVG with the letters converted to outlines. It is an image, not a font, and does not count toward the 2 typefaces.

**Type scale (6 steps)**
| Token | Size | Line height | Used for |
|---|---|---|---|
| `text-xs` | 12px (0.75rem) | 1.4 | meta, label |
| `text-sm` | 14px (0.875rem) | 1.5 | small UI text: buttons, nav, footer |
| `text-base` | 18px (1.125rem) | 1.65 | body |
| `text-lg` | 24px (1.5rem) | 1.25 | card title |
| `text-xl` | 32px (2rem) | 1.15 | section title |
| `text-2xl` | 36px on phones, 48px from 768px | 1.1 | page title |

Nothing smaller than 12px. No other sizes, no arbitrary `text-[...]` values and no `fluid-*` sizes.

**Weights (2):** 400 for body and UI, 700 for headings and labels. No 300, 500, 600, 800 or 900.

**Letter case and spacing:** sentence case everywhere. Uppercase and wide tracking only on the `label` role.

## Text roles (one style per element type)
Components choose a role, never a font, size or weight.

| Role | Face | Size | Weight | Where |
|---|---|---|---|---|
| `page-title` | Playfair | `text-2xl` | 700 | the one `h1` per page, including post titles |
| `section-title` | Playfair | `text-xl` | 700 | `h2`: home sections, post headings |
| `card-title` | Playfair | `text-lg` | 700 | post, gear and related-guide cards; `h3` |
| `body` | Albert Sans | `text-base` | 400 | paragraphs, lists, post text |
| `meta` | Albert Sans | `text-xs` | 400 | date, read time, author, caption |
| `label` | Albert Sans | `text-xs`, uppercase | 700 | tag pills, status badges, form labels |

- `h4` and below in posts use `card-title`.
- `Text` takes only `role`, `color` and `as`. The `variant`, `size`, `weight`, `tracking` and `leading` props go away.

## Spacing, colour and components
- **Spacing:** 6 steps: 4, 8, 16, 24, 48 and 96px. No fractional props like `padding={3.5}`, so the runtime safelist can be deleted.
- **Colour:** 8 tokens: `bg`, `surface`, `line`, `text`, `text-dim`, `accent`, `success` and `error`. Dark only.
- **Components:** Box, Stack, Grid, Text, Heading, Link, Button and Card. Props describe meaning (role, tone), not raw values.
- **Not allowed:** kicker or eyebrow labels over titles, counters on headings, "TAGS:"-style prefixes, glyph badges, and "lab / terminal / system / PROJECT //" framing in reader-facing UI.

## Writing rules
- **UI copy:** no em dashes. Use a period, comma, colon or parentheses. 23 to fix.
- **UI copy:** don't use "curated", "exclusive", "handpicked", "level up" or "robust". 10 to fix.
- **Posts:** no em dashes (41 to fix), and don't use "ultimate" (12 uses). Replace each with a specific word, or drop it.
- **Voice:** first person and plain. No "whether you're…", "not X but Y" or padding.
- The rewrites go in their own PR.

## Prevention (in CI)
1. **Pattern-audit check.** Extend `scripts/detect-antipatterns.mjs`, which is already a required check, to fail on:
   - raw `font-mono`, `font-serif`, `font-display` and `font-sans` classes;
   - weights other than `font-normal` and `font-bold`;
   - `text-*` sizes outside the 6 steps, and arbitrary `text-[...]` values;
   - raw `tracking-*` classes;
   - new `!important` rules;
   - inline `font-family` in `index.html` or `src/index.css` outside the token block.
2. **Browser test.** A Playwright test opens `/`, `/blog`, one post, `/gear` and `/about` at 390px and 1280px. It reads the computed style of every visible text node and fails on:
   - more than 2 font families (code blocks excluded);
   - any weight other than 400 or 700;
   - any size off the scale.
3. **One PR at a time, on one base.** Each UI PR starts from current `main` after the previous one lands, and includes before/after screenshots at 390px and 1280px from that same base.

## Definition of done for any UI PR
- Both CI checks above pass.
- No new tokens, sizes, weights or roles. Changing this page needs its own PR, approved by Ari.
- Before/after screenshots at 390px and 1280px, on the same base.
- The biased-judge audit is posted on the PR.

## Decisions (Ari, 2026-11-17)
1. **Logo:** keep the Bricolage lettering as a fixed image, not a live font.
2. **Em dashes in posts:** strip them too, same as UI copy.
3. **#4887:** closed once this page lands; it is superseded by this spec.

## Order of work
One PR at a time, each on current `main` after the previous one merges.
1. This page.
2. The CI pattern check and the browser test, in ratchet mode: they fail on anything new and on any count going up, and the baseline shrinks as later PRs land.
3. Logo to a fixed SVG; fix `index.html:37`; load only Playfair Display and Albert Sans.
4. Collapse the type tokens and move `Text` to roles, one component group per PR.
5. Remove decoration (kickers, counters, "TAGS:", glyph badges, lab/terminal framing).
6. Collapse spacing and colour, then delete the safelist.
7. The writing PR.

#4878 and #4879 stay open until the step that covers their changes replaces them.
