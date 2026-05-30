# Affiliate Tooling Documentation

The Affiliate Tooling (Blog Drafter extension) automates the creation of Amazon affiliate items, ensuring consistent URLs, image validation, and seamless PR creation.

## Usage

You can use the tool via `pnpm drafter` or `pnpm affiliate:add`.

### Commands

#### Adding an Amazon Affiliate Item

```bash
pnpm drafter \
  --amazon-url "https://www.amazon.com/dp/B0D3V61JC8" \
  --title "Loop Quiet 2 Ear Plugs" \
  --image-url "https://m.media-amazon.com/images/I/61N+V+0l1YL.jpg" \
  --category gear \
  --target-content "content/resources/gear-guide.md" \
  --create-pr
```

### Options

- `--amazon-url`: (Required) The Amazon product URL.
- `--title`: (Required) The product title.
- `--image-url`: (Optional) Direct URL to the product image for download.
- `--category`: (Optional) Item category (e.g., `gear`, `travel`, `shoes`). Defaults to `gear`.
- `--description`: (Optional) Short product description.
- `--id`: (Optional) Override the auto-generated slug ID.
- `--target-content`: (Optional) Path to a markdown file to update with the new affiliate ID.
- `--tag`: (Optional) Affiliate tracking tag. Defaults to `AMAZON_AFFILIATE_TAG` env var or `onasafari04-20`.
- `--create-pr`: (Optional) Automatically create a branch, commit changes, and open a PR.
- `--dry-run`: (Optional) Print planned changes without executing them.
- `--force`: (Optional) Overwrite existing images if they have the same name.

## Features

1. **URL Normalization**: Strips session noise and adds the configured tracking tag to Amazon URLs.
2. **Image Validation**: Checks `content-type` and `content-length` via a HEAD request before downloading.
3. **Smart Slugification**: Generates clean, URL-friendly IDs from the product title.
4. **Content Integration**: Automatically updates `affiliateIds` in the frontmatter of target markdown files.
5. **PR Automation**: Handles branch creation, commits assets, and opens a GitHub PR with a checklist.

## Configuration

The tool uses the following environment variables if available:

- `AMAZON_AFFILIATE_TAG`: The default Amazon tracking ID to use.

## Image Storage

- Amazon images: `public/images/gear/amazon/`
- General gear assets: `public/assets/gear/`
