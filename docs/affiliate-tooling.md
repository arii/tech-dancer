# Amazon Affiliate Tooling

This project includes a set of local-first tools for adding and auditing Amazon affiliate items.

## Commands

### Add/Update an Affiliate Item

Use `pnpm affiliate:add` to capture an Amazon product and add it to the affiliate dictionary.

```bash
pnpm affiliate:add \
  --amazon-url "https://www.amazon.com/dp/B0D3V61JC8" \
  --title "Loop Quiet 2 Ear Plugs" \
  --image-url "https://example.com/image.jpg" \
  --category gear \
  --target-content "content/resources/my-post.md"
```

**Options:**
- `--amazon-url`: The Amazon product URL (required).
- `--title`: The human-readable name of the product (required).
- `--id`: Optional custom ID/slug. Defaults to slugified title.
- `--image-url`: Optional URL to download a product image.
- `--category`: Category for the item (default: `gear`).
- `--description`: Optional description.
- `--target-content`: Optional path to a markdown file to update with the new affiliate ID.
- `--dry-run`: Show what would happen without making changes.
- `--force`: Overwrite existing images.
- `--tag`: Custom affiliate tag (defaults to `onasafari04-20`).

### Audit Affiliate Data

Use `pnpm affiliate:audit` to verify the integrity of the affiliate dictionary and content references.

```bash
pnpm affiliate:audit
```

**Features:**
- Validates Amazon URLs and ensures they contain the tracking tag.
- Checks that local image files exist and are not empty.
- Scans `content/` files for broken affiliate ID references.
- Reports unused affiliate items.

**Options:**
- `--fix-safe`: Automatically fix low-risk issues like missing tracking tags or unnormalized Amazon URLs.

### Manual Image Capture

Use `pnpm affiliate:image` for standalone image downloading (rarely needed directly).

```bash
pnpm affiliate:image --image-url "..." --slug "item-slug"
```

## Configuration

The tools use the following default paths:
- Affiliate Dictionary: `src/data/affiliates.json`
- Amazon Images: `public/images/gear/amazon/`
- Gear Assets: `public/assets/gear/`
- Default Tag: `onasafari04-20`
