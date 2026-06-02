# Affiliate Tooling Documentation

The Affiliate Tooling (Blog Drafter extension) automates the creation of Amazon affiliate items, ensuring consistent URLs, image validation, and seamless PR creation.

## 🧠 Safety First: Dry-Run by Default

For safety, the tool defaults to **dry-run mode**. It will not modify any files or create branches unless you explicitly provide the `--apply` flag.

## Usage

You can use the tool via `pnpm drafter` or `pnpm affiliate:add`.

### Commands

#### Adding an Amazon Affiliate Item

```bash
# 1. Preview changes (Dry Run)
pnpm drafter \
  --amazon-url "https://www.amazon.com/dp/B0D3V61JC8" \
  --title "Loop Quiet 2 Ear Plugs" \
  --image-url "https://m.media-amazon.com/images/I/61N+V+0l1YL.jpg" \
  --category gear \
  --target-content "content/resources/gear-guide.md"

# 2. Apply changes
pnpm drafter ... --apply

# 3. Apply and create PR
pnpm drafter ... --apply --create-pr
```

### Options

- `--amazon-url`: (Required) The Amazon product URL.
- `--title`: (Required) The product title.
- `--image-url`: (Optional) Direct URL to the product image for download.
- `--category`: (Optional) Item category (e.g., `gear`, `travel`, `shoes`). Defaults to `gear`.
- `--description`: (Optional) Short product description.
- `--id`: (Optional) Override the auto-generated slug ID.
- `--target-content`: (Optional) Path to a markdown file to update with the new affiliate ID. Must be within `content/` or `src/content/`.
- `--apply`: (Required for mutation) Execute changes. Without this, the tool runs in dry-run mode.
- `--create-pr`: (Optional) Automatically create a branch, commit changes, and open a PR. Requires `--apply`.
- `--force`: (Optional) Overwrite existing images or proceed with Amazon URLs that lack a clear ASIN.
- `--force-branch`: (Optional) Use `--force` when pushing the new branch to origin.
- `--tag`: (Optional) Affiliate tracking tag. Defaults to `AMAZON_AFFILIATE_TAG` env var or `onasafari04-20`.

## Features

1. **URL Normalization**: Strips session noise and adds the configured tracking tag to Amazon URLs.
2. **Image Validation**: Checks `content-type` and `content-length` via a HEAD request before downloading.
3. **Smart Slugification**: Generates clean, URL-friendly IDs from the product title.
4. **Content Integration**: Automatically updates `affiliateIds` in the frontmatter of target markdown files.
5. **PR Automation**: Handles branch creation, commits assets, and opens a GitHub PR with a structured checklist.

## ⚠️ Amazon Compliance & Policy

- **Asset Sourcing**: Prefer approved Amazon PA-API or SiteStripe-compliant assets where possible. Direct image URL capture is provided as a staging/dev helper.
- **Review Policy**: New items default to `draft: true`. They must be manually reviewed and marked for publication.
- **Disclosures**: All affiliate links must be accompanied by the standard project affiliate disclosure.

## Configuration

The tool uses the following environment variables if available:

- `AMAZON_AFFILIATE_TAG`: The default Amazon tracking ID to use.

## Image Storage

- Amazon images: `public/images/gear/amazon/`
- General gear assets: `public/assets/gear/`
