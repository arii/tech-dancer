# VersionTruth Demo Asset Guide

This document maps the generated assets (both `.webm` video clips and `.png` screenshots) to the original demo video script prompt. It provides a quick reference for when you should use the animated video versus the static screenshot during editing.

---

### Shot 1: The Problem (Hook) (0:00–0:15)
- **Video:** `shot1_problem.webm`
- **Screenshot:** `shot1_problem.png`
- **What it shows:** The blog post "Confidently incorrect: the latest stable major version is @v4".
- **When to use:** Use the **video** (`shot1_problem.webm`) for the main hook to show natural motion (scrolling down the blog post) while you narrate the issue of agents downgrading versions. If you are doing a quick cut or need a static title card to overlay text on, use the **screenshot** (`shot1_problem.png`).

### Shot 2: The Fix (0:15–0:30)
- **Video:** `shot2_fix.webm`
- **Screenshot:** `shot2_fix.png`
- **What it shows:** The `SKILL.md` file open in the code viewer, focusing on the name and description.
- **When to use:** The **video** (`shot2_fix.webm`) adds a nice subtle scroll to show context. Use this during the transition statement ("VersionTruth is a live version-truth API..."). Use the **screenshot** (`shot2_fix.png`) if you just want to freeze on the SkillMD definition.

### Shot 3: Live Demo (0:30–1:15)
- **Video:** `shot3_live_demo.webm`
- **Screenshots:**
  - `shot3_demo_part1.png` (Shows the first `curl` command to get the latest version)
  - `shot3_demo_part2.png` (Shows the second `curl` command comparing candidate v4)
  - `shot3_demo_part3.png` (Shows the batch `curl` command checking multiple pins)
- **What it shows:** The core functionality executed in a simulated terminal environment.
- **When to use:** The **video** (`shot3_live_demo.webm`) is the heart of the demo. You should almost certainly use the full video here, as it simulates real-time typing and API responses for all three commands. The **screenshots** (`shot3_demo_part1.png`, etc.) are provided in case you want to create a fast-paced slideshow montage instead of waiting for the typing animation, or if you need to highlight specific JSON outputs statically.

### Shot 4: Agent Usage (1:15–1:35)
- **Video:** `shot4_agent_usage.webm`
- **Screenshot:** `shot4_agent_usage.png`
- **What it shows:** The "Instructions" and "Rules" sections of `SKILL.md`.
- **When to use:** Use the **video** (`shot4_agent_usage.webm`) to smoothly scroll through the rules while you explain that "not recognizing a version isn't evidence it's wrong." Use the **screenshot** (`shot4_agent_usage.png`) if you prefer to digitally highlight or draw boxes around specific lines of text during post-production.

### Shot 5: Safety (1:35–1:50)
- **Video:** `shot5_safety.webm`
- **Screenshot:** `shot5_safety.png`
- **What it shows:** The API directory context in the browser.
- **When to use:** The **video** (`shot5_safety.webm`) is best for demonstrating that this is part of a larger, living site. The **screenshot** (`shot5_safety.png`) can be used as a background layer while you talk about rate limiting and input validation.

### Shot 6: Close (1:50–2:00)
- **Video:** `shot6_close.webm`
- **Screenshot:** `shot6_close.png`
- **What it shows:** The main boomtick.blog homepage.
- **When to use:** The **video** (`shot6_close.webm`) provides a dynamic, polished sign-off. The **screenshot** (`shot6_close.png`) is perfect for the absolute final frame of the video, where you might want to overlay a persistent URL or "Thank You" text without the background moving.

---

### The Stitched Video
- **Asset:** `full_demo.webm`
- **What it is:** This is the concatenation of all 6 video clips in order (`shot1` through `shot6`).
- **When to use:** If you are doing a "Quick/no-frills" single-take voiceover, simply drop this single file into your editor, hit play, and narrate over it continuously.
