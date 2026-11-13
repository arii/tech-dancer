# D4 · SEO post batch — topic proposal (10 topics)

Proposed 2026-11-13 for orchestrator review before the full batch is written
(OD-13 spec art_MkQbRYFn, deliverable D4). Each topic targets a search-query
cluster in the West Coast Swing niche, uses only the consumed `Post` fields
with simple frontmatter (custom parser: flat keys, block lists, quoted
strings), carries `seoTitle`/`seoDescription`/`imageAlt`, and references 2–4
affiliate IDs that exist in `src/data/affiliates.json` (verified 2026-11-13).

Hero images: one generated WebP per post at `/assets/posts/<slug>.webp`
(existing `/assets/posts/` directory, webp convention).

| # | Cluster | Title | Slug | Category | affiliateIds |
|---|---------|-------|------|----------|--------------|
| 1 | Event prep | What to Pack for Your First West Coast Swing Event | `2026-11-13-what-to-pack-first-wcs-event` | Travel | compression-cubes, travel-bottles, loop-quiet, portable-charger |
| 2 | Event prep | Your First Jack & Jill: A WCS Competition Survival Guide | `2026-11-13-first-jack-and-jill-competition-guide` | WCS | liquid-iv, mints, listerine-tabs |
| 3 | Event prep | The Dancer's Recovery Routine: Bouncing Back After a Dance Weekend | `2026-11-13-recovery-routine-after-dance-weekend` | Health | epsom-salt, foam-roller, hypervolt, pedialyte |
| 4 | Gear guide | The Best Dance Sneakers for West Coast Swing (and How to Break Them In) | `2026-11-13-best-dance-sneakers-west-coast-swing` | Gear | bloch-grecian, dance-socks, shoe-dryer |
| 5 | Gear guide | Staying Cool on the Social Floor: Fans and Cooling Gear for Dancers | `2026-11-13-stay-cool-social-dance-floor` | Gear | neck-fan, rave-fan, electric-fan, microfiber-towel |
| 6 | Gear guide | Hearing Protection for Dancers: Why I Never Hit the Floor Without Earplugs | `2026-11-13-hearing-protection-dancers-earplugs` | Gear | loop-quiet, loop-experience |
| 7 | Technique | How to Film Your Own West Coast Swing Practice (and Actually Improve) | `2026-11-13-film-your-own-wcs-practice` | Practice | tripod, portable-speaker, stick-on-mirrors |
| 8 | Technique | WCS Timing Explained: the Slot, the Anchor, and the '&'-Count | `2026-11-13-wcs-timing-explained-slot-anchor` | WCS | portable-speaker, loop-quiet |
| 9 | Community | Pride on the Dance Floor: Queer Joy in Modern West Coast Swing | `2026-11-13-pride-west-coast-swing-community` | Community | norcal-pride-gate-shirt, rainbow-earrings, pride-sunglasses, rainbow-fan |
| 10 | Community | The West Coast Swing Gift Guide: 12 Gifts Dancers Actually Want | `2026-11-13-gift-guide-west-coast-swing-dancer` | Gear | dance-bag, love-neon-follow-shirt, bling-keychain-pill-case, jbl-flip-6 |

Query targets (representative): "what to pack for a dance weekend",
"first jack and jill tips", "dancer recovery after competition", "best dance
sneakers for west coast swing", "dance fans for social dancing", "earplugs for
dancers", "how to film your dance practice", "west coast swing timing anchor",
"LGBTQ+ west coast swing", "gifts for west coast swing dancers".

Interlinking plan: each post links to 2–3 existing posts (survival guide,
make-shoe-dance, wsdc-points, home-practice-space) and to sibling posts in its
cluster, mirroring the internal-link style of the existing catalog. In-body
monetization uses `<notice type="affiliate" id="…"></notice>` like the current
posts, plus frontmatter `affiliateIds` for the sidebar.
