## SEO + content migration checklist

- [x] Unnecessary file renames were reverted.
- [ ] Confirm no public URLs changed.
- [ ] If any public URL changed, add redirect map.
- [ ] Confirm sitemap output only includes canonical URLs.
- [ ] Confirm internal links do not point to removed paths.
- [ ] Run SEO audit / redirect validation if available.
- [x] No empty Community Reviews sections.
- [x] No fake reviews, ratings, shipping claims, or return-policy claims.
- [x] Event guides preserve specific themes instead of generic summaries.
- [x] JJO restored as Rainbow / NorCal BestCal.
- [x] Swingtacular restored as Alien / Galactic.
- [x] Product IDs all exist in `src/data/affiliates.json`.
- [x] `pnpm typecheck` passes.
- [x] `pnpm test` passes.
- [x] `pnpm build` passes.
