# Affiliate URL Validation & Fixing

Scripts to verify that affiliate URLs lead to the correct Amazon products and that our product descriptions match what's actually being sold.

## Problem

Some affiliate items have:
- ❌ Wrong/broken Amazon links
- ❌ Product titles that don't match Amazon's listing
- ❌ Descriptions that are misleading or outdated
- ❌ Placeholder URLs (generic amazon.com)
- ⊘ Draft status but still appearing in public

Example:
```
We list: "running band" 
Reality: "Thin fanny pack great for Lindy in the park"
```

## Solution

Two-step validation and fixing process:

### Step 1: Validate All Affiliate URLs

Run the validation script to check all 100+ affiliate items:

```bash
pnpm tsx dev-tools/validate-affiliate-urls.ts
```

**What it does:**
1. Fetches each Amazon product page
2. Extracts actual title and description
3. Compares with what we've stored
4. Flags mismatches and issues
5. Generates detailed report

**Output:**
```
📊 Validation Summary
────────────────────────────────────────────────
✓ Valid:        87/103
⊘ Draft:        4
⚠ Placeholder:  8
✗ Mismatch:     2
✗ Invalid:      1
✗ Error:        1
────────────────────────────────────────────────

💡 Recommendations:
  - Remove 4 draft items from public product grids
  - Update 8 placeholder URLs with real Amazon ASINs
  - Review 2 title/description mismatches:
    - running-band: Consider updating our title to...
    - foam-roller: Review if our description matches...

📄 Full report saved to: dev-tools/affiliate-validation-report.json
```

### Step 2: Interactively Fix Issues

Review and fix flagged items:

```bash
pnpm tsx dev-tools/fix-affiliate-items.ts
```

**What it does:**
1. Shows each problem item
2. Displays Amazon's actual title
3. Lets you update names/descriptions
4. Lets you mark items as draft
5. Saves changes to `affiliates.json`

**Workflow:**
```
📦 Item: running-band
Current Name:        Running Band
URL:                 https://www.amazon.com/dp/B0...
Our Description:     Sport fanny pack
Status:              mismatch
Issue:               Title mismatch. Our: "Running Band" vs Amazon: "Thin Nylon Fanny Pack"

What would you like to do? (update-name/update-desc/mark-draft/skip): update-name
Enter new name: Thin Nylon Fanny Pack - Perfect for Lindy in the Park
✓ Name updated to: "Thin Nylon Fanny Pack - Perfect for Lindy in the Park"
```

## Integration: Draft Filtering

Once items are marked as `"draft": true`, they are automatically hidden from:

- Event guides (`src/features/events/EventGuide.tsx`)
- Gear pages (`src/pages/Gear.tsx`)
- Product grids (`src/features/events/components/EventProductGrid.tsx`)

Example:
```json
{
  "anker-power-bank": {
    "id": "anker-power-bank",
    "name": "Anker Portable Power Bank",
    "url": "https://amazon.com",
    "category": "travel",
    "draft": true,
    "description": "High-capacity charger (BROKEN LINK - needs affiliate ASIN)"
  }
}
```

This item will **not appear** in EventProductGrid or Gear pages.

## Workflow: Follow-up Items from followup.md

### 1. Handheld Mini Fan → Draft
- Issue: Stock photo, invalid link
- Action: Mark as `"draft": true`

```bash
# Run validate, select "mark-draft" for this item
pnpm tsx dev-tools/validate-affiliate-urls.ts
pnpm tsx dev-tools/fix-affiliate-items.ts
```

### 2. Altoids Mints → Fix Link
- Current: Points to wrong product
- Should: Point to pill case ASIN `B0CFB4ZGHV`
- URL: `https://www.amazon.com/dp/B0CFB4ZGHV?tag=onasafari04-20&linkCode=ll2`

Manually fix in `src/data/affiliates.json`:
```json
{
  "altoids-mints": {
    "id": "altoids-mints",
    "name": "Bling Rhinestone Portable Pill Case",
    "url": "https://www.amazon.com/dp/B0CFB4ZGHV?tag=onasafari04-20&linkCode=ll2&language=en_US&utm_source=boomtick-blog&utm_medium=portfolio",
    "description": "I use this for storing loop earplugs more securely than the keychain they come in."
  }
}
```

### 3. Anker Power Bank → Draft
- Issue: No affiliate link
- Action: Mark as `"draft": true`

### 4. Suede Shoe Brush → Draft
- Issue: No link
- Action: Mark as `"draft": true`

### 5. Gear Page Missing Reviews
- Reflective crop tops
- Crop tops  
- Mesh fishnet top
- Pumpkin headbands (should link to Halloween outfit blog)

**Action**: Check if these are in `src/data/affiliates.json` with valid links. If missing, add them or mark as draft.

## Complete Workflow

1. **Validate all items:**
   ```bash
   pnpm tsx dev-tools/validate-affiliate-urls.ts
   ```

2. **Fix issues interactively:**
   ```bash
   pnpm tsx dev-tools/fix-affiliate-items.ts
   ```

3. **Mark known problematic items as draft:**
   - Handheld Mini Fan
   - Anker Power Bank  
   - Suede Shoe Brush
   - (And any others)

4. **Update EventProductGrid to filter draft items:**
   ```tsx
   // In src/features/events/components/EventProductGrid.tsx
   const visibleProducts = products
     .filter(p => !p.draft) // <- Add this
     .slice(0, maxItems);
   ```

5. **Verify the page:**
   ```bash
   pnpm build
   pnpm test
   
   # Visit event guide and gear pages in browser
   # Confirm draft items don't appear
   ```

## Report Format

The validation report (`dev-tools/affiliate-validation-report.json`) contains:

```json
{
  "generatedAt": "2024-05-26T15:57:00Z",
  "totalItems": 103,
  "results": {
    "valid": 87,
    "invalid": 1,
    "mismatched": 2,
    "errors": 1,
    "drafted": 4,
    "placeholders": 8
  },
  "items": [
    {
      "id": "running-band",
      "name": "Running Band",
      "url": "https://www.amazon.com/dp/B0...",
      "status": "mismatch",
      "amazonTitle": "Thin Nylon Fanny Pack - Running",
      "issue": "Title mismatch...",
      "ourDescription": "Sport fanny pack"
    }
  ],
  "recommendations": [...]
}
```

## Troubleshooting

**Script hangs or times out:**
- Amazon may be rate-limiting
- Wait a few minutes and retry
- Run only a subset of items

**Can't extract product title:**
- Amazon changed their HTML structure
- Verify the ASIN is correct (https://amazon.com/dp/ASIN)
- Check if product still exists

**Title similarity too low:**
- We use Jaccard similarity (word overlap)
- If our description is contextual, mismatches are OK
- Example: We call it "earplug case", Amazon calls it "Pill storage box"

## Notes

- Scripts make HTTP requests to Amazon (use responsibly)
- Similarity threshold is 30% for titles, 20% for descriptions
- Draft items are hidden from all public product grids
- Changes are saved to `src/data/affiliates.json`
