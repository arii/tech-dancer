# Content Templates

Use these templates to create new content for the Tech-Dancer platform.

## Template 1 — Blog Post (content/posts/)
Use for long-form editorial: technique breakdowns, travel stories, opinion pieces.

```markdown
---
type: post
title: "Your Post Title Here"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Engineering | Travel | Dance | Lifestyle"
excerpt: "One or two sentences that appear in the blog index card."
image: "https://picsum.photos/seed/your-seed-here/1200/600"
tags:
  - tag-one
  - tag-two
---

## The Hook
Open with a scene, a problem, or a bold claim.

## The Science / Story
Explain the idea. Use subheadings to break it up.

### Subheading Example
Your body copy here. Aim for 300–800 words per post.

## The "Bougie on a Budget" Takeaway
End with a practical action the reader can take immediately.

---
*Disclosure: This post may contain affiliate links. I only recommend gear I've personally tested for 8+ hour social dance durability.*
```

## Template 2 — Dance Resource / Gear Guide (content/resources/)
Use for gear reviews, travel hacks, DIY tutorials, and curated "stacks."

```markdown
---
type: resource
title: "Resource Title — e.g., How to Suede Your Own Dance Shoes for $15"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Gear | Travel | Recovery | Focus"
excerpt: "What the reader will learn or get from this guide."
affiliateIds:
  - suede-sheets
  - bloch-grecian
tags:
  - diy
  - footwear
  - budget
---

## What You Need
List all materials, products, or prerequisites here.

| Item | Why It Matters | Approx. Cost |
|---|---|---|
| Adhesive Suede Sheet | Controls friction coefficient | $12 |
| Isopropyl Alcohol | Surface prep — removes oils | $3 |

## Step-by-Step

### Step 1 — Surface Prep
Describe the step in detail.

### Step 2 — Application
Continue steps as needed.

### Step 3 — Cure & Test
Always include a "how to know it worked" check.

## Performance Notes
How did this hold up on the floor?

## Verdict
One paragraph summary. Would you recommend it? Who is it best for?

---
*Affiliate disclosure: Links in this guide may earn a commission at no cost to you.*
```

## Template 3 — Data Analysis Study (content/studies/)
Use for the research journal entries in the Dance Analytics section.

```markdown
---
type: study
title: "Study Title — e.g., Scoring Variance in Intermediate WCS: A 2026 Analysis"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Data | Competition | Robotics | Insights"
excerpt: "One sentence abstract for the studies index."
tags:
  - data
  - scoring
  - intermediate
---

## Abstract
One paragraph. State the question, the method, and the key finding.

## Background & Motivation
Why does this question matter to a working dancer?

## Methodology
Be explicit.

**Data Source:** [Where did the data come from?]
**Sample Size:** [e.g., 847 placements across 12 events]
**Tools Used:** [e.g., Python / pandas]
**Key Variables:**
- Variable 1: description
- Variable 2: description

## Results
State findings plainly before adding interpretation.

## Discussion
What do the results mean for a dancer?

## Limitations
Be honest about what the data can't tell us.

## Conclusion & Takeaway
One actionable sentence.

---
*Data sourced from publicly available competition results. No individual dancer data is published without consent.*
```
