# VersionTruth Demo Generator

This package provides a programmatic way to generate clean, high-resolution screen recordings (and screenshots) of the VersionTruth API functionality for use in promotional or demo videos.

By using Playwright, the script guarantees reproducible, perfect takes without the need for manual screen recording. It separates the recording into distinct "shots" as outlined in the video script, saving them all to the `demo-assets/` folder.

## Prerequisites

1.  Ensure you have dependencies installed:
    ```bash
    pnpm install
    ```
2.  Start the local development server (in a separate terminal or the background):
    ```bash
    pnpm run dev
    ```

## Running the Generator

You can run the generator via the provided python script. It will automatically connect to your local dev server and record the required workflows.

```bash
python scripts/record-versiontruth-demo.py
```

### Alternatively, using npm

```bash
pnpm run demo:generate
```

## Outputs

The script will generate `.webm` videos and `.png` screenshots in the `demo-assets/` directory at the root of the project.

- `shot1_problem.webm` - The confidently incorrect blog post.
- `shot2_fix.webm` - The `SKILL.md` file.
- `shot3_live_demo.webm` - The fake terminal executing `curl` and `jq` commands.
- `shot4_agent_usage.webm` - Scrolled view of `SKILL.md` instructions and rules.
- `shot5_safety.webm` - The terminal showing rate limit headers.
- `shot6_close.webm` - The VersionTruth product page.

These raw files can then be imported into your preferred video editor (Premiere, Final Cut, DaVinci, etc.) to stitch together with your voiceover and captions.
