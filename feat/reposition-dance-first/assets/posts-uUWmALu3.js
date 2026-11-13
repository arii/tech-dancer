import{A as T}from"./constants-DGgkjo3X.js";/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/function W(e){return e.startsWith(`\r
`)?2:e.startsWith(`
`)?1:0}function j(e){const a={},d=e.split(/\r?\n/),n=[{indent:-1,obj:a}];for(let r=0;r<d.length;r++){const h=d[r],t=h.trim();if(!t||t.startsWith("#"))continue;const s=h.search(/\S/);for(;n.length>1&&n[n.length-1].indent>=s;)n.pop();const g=n[n.length-1].obj;if(t.startsWith("- ")){const p=t.slice(2).trim(),c=p.indexOf(":");if(c!==-1){let o=p.slice(0,c).trim();(o.startsWith('"')&&o.endsWith('"')||o.startsWith("'")&&o.endsWith("'"))&&(o=o.slice(1,-1));const l=p.slice(c+1).trim();if(o!=="__proto__"&&o!=="constructor"&&o!=="prototype"){const v={};let f=l;l.startsWith('"')&&l.endsWith('"')||l.startsWith("'")&&l.endsWith("'")?f=l.slice(1,-1):l==="true"?f=!0:l==="false"?f=!1:!isNaN(Number(l))&&l!==""&&(f=Number(l)),v[o]=f,Array.isArray(g)&&g.push(v),n.push({indent:s+2,obj:v})}}else{let o=p;typeof o=="string"&&(o.startsWith('"')&&o.endsWith('"')||o.startsWith("'")&&o.endsWith("'"))&&(o=o.slice(1,-1)),Array.isArray(g)&&g.push(o)}continue}const b=t.indexOf(":");if(b===-1)continue;let u=t.slice(0,b).trim();if((u.startsWith('"')&&u.endsWith('"')||u.startsWith("'")&&u.endsWith("'"))&&(u=u.slice(1,-1)),u==="__proto__"||u==="constructor"||u==="prototype")continue;const i=t.slice(b+1).trim();if(!i){let p=!1;for(let o=r+1;o<d.length;o++){const l=d[o].trim();if(l&&!l.startsWith("#")){l.startsWith("- ")&&(p=!0);break}}const c=p?[]:{};Array.isArray(g)||(g[u]=c),n.push({indent:s,obj:c,key:u});continue}let m=i;i.startsWith("[")&&i.endsWith("]")?m=i.slice(1,-1).split(",").map(p=>{let c=p.trim();return(c.startsWith('"')&&c.endsWith('"')||c.startsWith("'")&&c.endsWith("'"))&&(c=c.slice(1,-1)),c}).filter(Boolean):i==="true"?m=!0:i==="false"?m=!1:!isNaN(Number(i))&&i!==""&&!i.includes("-")&&!i.includes(":")?m=Number(i):(i.startsWith('"')&&i.endsWith('"')||i.startsWith("'")&&i.endsWith("'"))&&(m=i.slice(1,-1)),Array.isArray(g)||(g[u]=m)}return a}function x(e){if(!e||typeof e!="string"||!e.startsWith("---"))return{data:{},content:e||""};const a=W(e.slice(3));if(a===0)return{data:{},content:e};const d=3+a,n=e.slice(d).match(/(?:^|\r?\n)---(?:\r?\n|$)/);if(!n||n.index===void 0)return{data:{},content:e};const r=d+n.index,h=e.slice(d,r).trim(),t=e.slice(r+n[0].length);try{const s=j(h);return{data:s&&typeof s=="object"?s:{},content:t}}catch(s){return console.error("Error parsing frontmatter:",s),{data:{},content:t}}}/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/function B(e){if(typeof e!="string")return;const a=e.toLowerCase();return["published","draft","planned"].includes(a)?a:void 0}function C(e){if(!(e===""||e===void 0||e===null))return typeof e!="string"?e:e.startsWith("/")&&!e.startsWith(T)?`${T}${e}`:e}/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/function M(e){if(typeof e=="number")return e;if(typeof e=="string"){const a=parseInt(e.replace(/[^\d]/g,""),10);return isNaN(a)?void 0:a}}function on(e,a){if(e&&e.trim().length>0){const n=e.split(/\s+/).length,r=e.match(/!\[.*?\]\(.*?\)/g),h=e.match(/<img\b[^>]*>/gi),s=((r?r.length:0)+(h?h.length:0))*.2;return Math.max(1,Math.ceil(n/200+s))}const d=a?.split(/\s+/).length??0;return Math.max(1,Math.ceil(d/20))}const I=`---
type: post
draft: true
status: draft
title: "Coming Soon: WCS Competition Data Scraper"
date: "2026-04-18"
author: "Ariel Anders"
category: "Tech"
excerpt: "Announcing a new tool for a clearer way to look at West Coast Swing competition results."
image: "/assets/posts/competition-data-thumb.svg"
tags:
  - competition
  - metrics
  - data-science
  - wcs
---

<Notice type="info">
**Technical Notes: Data Research**
A careful, respectful way to use public scoring data to analyze progression and judging consistency.
</Notice>

## A Clearer Look at a Subjective Sport

In West Coast Swing, we are judged by humans. Humans are great, but results can vary from heat to heat. While one event result only tells part of the story, looking at scores across multiple events can reveal helpful patterns about how you're progressing and how different panels see your dancing.

I'm building the **WCS Competition Data Scraper**, a tool that makes competition results easier to understand.

### Core Philosophy

The goal of this project isn't to rank dancers, but to provide tools for self-improvement and to understand how competition scoring works.

- **Anonymous data collection:** The tool focuses on trends and overall patterns. No individual dancer names are stored in our public datasets.
- **Respectful approach:** We use public competition data that has already been published. Our tool is built to be a good citizen of the web.
- **Privacy focus:** All raw data is processed securely and we discard individual records once we've extracted the big picture.

### What the tool will show

Once launched, the lab will feature:

#### How judging can differ across panels

This helps you see how consistent judging is across different events. It can help you understand which aspects of your dance resonate with different judging styles.

#### Compare your results to the field

Instead of just looking at your final placement, we look at how you did compared to the middle of the pack. This helps you see how you performed relative to the overall strength of the heat.

_Stay tuned for the official release in the DevAI Portfolio._
`,z=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),O=`---
type: post
draft: true
status: draft
title: "Comprehensive Financial Strategy Guide for Dancers"
date: "2026-04-18"
author: "Ariel Anders"
category: "Travel"
excerpt: "Financial literacy for dancers: maximizing travel perks while maintaining a responsible lifestyle."
image: ""
tags:
  - financial-literacy
  - travel-hacking
  - wcs
---

<Notice type="info">
**Technical Notes: Financial Planning**
Drafting a practical travel-hacking strategy specifically for WCS dancers to make the lifestyle sustainable.
</Notice>

## The Problem: WCS Travel is Expensive

Attending West Coast Swing events is one of the most rewarding parts of the dance lifestyle, but it can also be a significant financial burden. Between event passes, flights, hotels, and workshops, the costs add up quickly.

I am currently drafting a **Comprehensive Financial Strategy Guide** specifically tailored for the active WCS dancer.

### What's Coming

This guide will move beyond basic "saving tips" and look at the dance journey as a logistics challenge.

#### Budget Planning

How to forecast your yearly dance expenses and set aside a “Dance Fund” that protects your long-term financial health.

#### Credit Card Strategy

How I stack status with travel cards. I'll explain why I use the Amex Platinum and Hyatt cards to secure late checkouts and airport lounge access.

#### Cost Saving Tips

Strategies for finding the best flight deals, managing group housing, and making the most of early-bird registration windows.

### Timeline for Release

The full guide is undergoing final review and will be available in the coming weeks. My goal is to help you build a sustainable financial foundation that allows for more dancing and less stress.

<Notice type="info">
Staying in the game is how your dancing improves. Financial stability is the foundation of that longevity.
</Notice>
`,D=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),F=`---
type: post
draft: true
title: "How I used GitHub Actions to power this site"
date: "2026-04-18"
author: "Ariel Anders"
category: "Tech"
excerpt: "Automated deployments and CI/CD pipelines for a tech-forward dance blog."
image: ""
tags:
  - automation
  - cicd
  - github
---

<Notice type="warning">
**Technical Notes: Dev-Ops**
Automating the "Impeccable" audit gate and bundle size checks to maintain high design standards and performance.
</Notice>

## Reliable Deployments for BoomTick.blog

Building a "living portfolio" requires a way to handle the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform. This ensures that every update, from a new gear review to a research study, is verified before it goes live.

### The CI/CD Setup

My process is split into three primary stages: **Verification**, **Audit**, and **Deployment**.

#### 1. Verification (Lint & Test)

This stage ensures code quality and functional correctness.

\`\`\`yaml
name: CI
on: [push, pull_request]

jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
      - run: pnpm run type-check
      - run: pnpm test
\`\`\`

#### 2. Anti-Pattern Audit

To maintain the "Impeccable" design standards of this site, I've integrated a custom audit script.

\`\`\`yaml
audit:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: pnpm install
    - name: UI Anti-Pattern Audit
      run: |
        node boomtick-pkg/scripts/detect-antipatterns.mjs || true
        td-cli audit-gate
\`\`\`

#### 3. Build & E2E Testing

I run end-to-end (E2E) tests before deployment.

\`\`\`yaml
test-build:
  needs: lint-typecheck
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: pnpm install
    - name: Build App
      run: pnpm run build
    - name: Run Playwright Smoke Test
      run: pnpm run test:e2e
\`\`\`

### Troubleshooting Common Issues

Even the best pipelines fail. Here are the most common issues:

- **Stale Lockfile:** If CI fails on the \`Verify lockfile integrity\` step, run \`pnpm install\` locally.
- **Visual Regression Failure:** If UI changes are intentional, run \`pnpm test:e2e --update-snapshots\`.
- **Node Engine Mismatch:** The project pins Node.js to version 22. Use \`nvm use\` or check \`.node-version\`.

Automating the boring parts allows me to focus on what matters: analyzing dance data and sharing insights with the WCS community.
`,H=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"})),E=`---
type: post
title: "Halloween costumes you can dance in"
date: "2026-04-18"
author: "Ariel Anders"
category: "Costumes"
excerpt: "Easiest DIY pumpkin costume: orange outfit + pumpkin headband + stick-on jack-o’-lantern face. No sewing, no felt cutting, still cute enough for Halloween dancing."
image: "/images/gear/sketches/assembly-guide.webp"
imageAlt: "A dancer's guide to a DIY pumpkin costume, showing an orange outfit base, a pumpkin headband, and adhesive felt face stickers."
tags:
  - fashion
  - halloween
  - wcs
affiliateIds:
  - "pumpkin-headbands"
  - "pumpkin-stickers"
imageFit: contain
---

## Functional Theming for Halloween Social Dancing

This DIY pumpkin costume goes on in two minutes, moves with you, and breathes on a crowded floor. This DIY pumpkin costume formula assembles in two minutes. Just an orange base, a headband, and stickers. It's lightweight, breathable, and lets you focus on social dancing while looking festive.

### The 2-Minute Costume Formula

<grid cols="{{ base: 1, md: 3 }}" gap="{6}">

<stack gap="{4}" padding="{4}">

**1. Orange Base (BYO)**

![A bright orange, moisture-wicking athletic jumpsuit that provides full range of motion and breathability for crowded social dance floors.](/images/gear/sketches/assembly-guide.webp)

Start with a comfortable orange dress, shirt, jumpsuit, or matching athletic set. Choose a breathable fabric like cotton or moisture-wicking tech wear that handles sweat well on the social floor.

</stack>

<stack gap="{4}" padding="{4}">

**2. Pumpkin Headband**

![A lightweight, plush pumpkin hat headband with a green stem and a friendly jack-o'-lantern face, designed to stay secure and comfortable during high-energy spins.](/images/gear/sketches/pumpkin-headbands.webp)

A lightweight headband or small pumpkin hat gives you the pumpkin silhouette instantly. Secure it with bobby pins to keep it in place during high-speed spins and double turns.

</stack>

<stack gap="{4}" padding="{4}">

**3. Felt Face Stickers**

![A set of pre-cut, matte black felt adhesive stickers in various geometric eye, nose, and mouth shapes to create a custom jack-o'-lantern face.](/images/gear/sketches/pumpkin-stickers.webp)

Use large, pre-cut adhesive felt stickers to assemble a jack-o’-lantern face on your torso in seconds. Start with the eyes, add the nose, and place the mouth last.

</stack>

</grid>

### How to Assemble:
1. **Put on your orange outfit first** to avoid stretching or distorting the face placement.
2. **Add the pumpkin headband**, securing it with bobby pins if you plan on fast spins or double turns.
3. **Apply the adhesive felt stickers** directly to your torso to create the jack-o'-lantern face. Keep the face large and centered so it reads clearly in photos. For rib-knit or heavily textured fabrics, a tiny dab of fabric glue can provide extra insurance.

### Dance-Friendly Costume Checklist

* **Breathable Fabric:** Choose an orange base that handles sweat well, like cotton or moisture-wicking tech wear.
* **Secure Headband:** Use bobby pins if necessary to keep the hat/headband in place during high-speed spins.
* **Sticker Security:** Press firmly on the felt stickers.
* **Unrestricted Frame:** Ensure you can raise your arms into a dance frame without the outfit pulling or the stickers popping off.
* **Clear Visibility:** Keeping the "face" on your torso ensures you don't have anything obstructing your vision while navigating a crowded social dance floor.


<notice type='affiliate' id='pumpkin-headbands'></notice>
<notice type='affiliate' id='pumpkin-stickers'></notice>

Disclosure: As an Amazon Associate, I may earn from qualifying purchases.

`,R=Object.freeze(Object.defineProperty({__proto__:null,default:E},Symbol.toStringTag,{value:"Module"})),N=`---
type: post
title: "Make Any Shoe a Dance Shoe"
date: "2026-04-18"
author: "Ariel Anders"
category: "Gear"
excerpt: "Turn your favorite sneakers or flats into dance shoes with adhesive suede. A DIY modification that improves spins, reduces joint strain, and survives long social dance weekends."
image: "/images/gear/diy/hero.webp"
affiliateIds:
  - suede-sheets
tags:
  - diy
  - wcs
---

## Why I Modify My Own Dance Shoes

Dedicated dance shoes are often expensive and lack the ergonomic support of modern athletic footwear. If you're looking for the best sneakers for West Coast Swing, my preferred solution is to build them yourself. Upgrading high-comfort athletic shoes with industrial-strength adhesive suede gives you control over comfort, aesthetics, and floor feel.

The key to a successful conversion is understanding floor friction. Standard athletic soles grip the wood, which can wreak havoc on your knees during multiple spins. By applying chrome leather—the industry standard for dance suede—directly to the pivot points of your sneakers, you get the perfect balance of slip and grip. Proper sole prep is crucial here. Rough up the rubber surface and use an industrial adhesive like contact cement, or the suede peels off halfway through your first Jack & Jill.

Predictable traction is the foundation of safe social dancing. The goal is not maximum grip, but a controlled balance between friction and glide. If you're dancing indoors, you need a shoe that allows controlled rotation. Too much grip can be just as dangerous as too little, especially during spins and turns.

## The Problem With Ballroom Floors

### Inconsistent Traction Is Hard on Your Joints

Hotel ballroom floors, convention centers, and social dance venues rarely offer a consistent dancing surface. Floors range from slippery "slip-and-slides" to sticky surfaces that feel like flypaper. When the floor conditions change unexpectedly, your knees and ankles absorb the cost.

<Notice type="info">
**Technical Takeaway:**
- **Peak Torque Capping:** Suede acts as a mechanical fuse, limiting the maximum rotational force transmitted to your knees.
- **Surface Normalization:** The fibrous nap of the suede adapts to varying floor textures, creating a uniform movement profile.
- **Glide-to-Grip Ratio:** Optimized for the low-friction transitions required in West Coast Swing and Ballroom.
</Notice>

## Why Suede Works: The Physics of Traction

Ballroom and social dance shoes have used suede soles for decades because they provide a consistent balance between grip and glide. Athletic rubber grips aggressively and strains joints during spins; suede creates controlled slip for predictable rotation and reduced torque on your knees.

## Why I Skip Spot Stickers

### The Problem With Ball-Only Traction Patches

While "ball-of-foot" stickers or Bloch-style stickers are popular, I advise against them for high-intensity social dancing. Inconsistent friction profiles—where the ball glides but the rubber heel catches—create a "tripping" hazard during rolling footwork. Furthermore, localized patches are prone to peeling under the high shear forces of torque during a long weekend.

## My Preferred Solution: Full-Sole Suede Coverage

Choosing the right pattern is critical for your safety and long-term movement quality.

### Coverage Option Comparison

![Suede Coverage Comparison](/images/gear/diy/suede-coverage-comparison.svg)

| Option | Pros | Cons |
| :--- | :--- | :--- |
| **Ball Only** | Maximum spin speed; minimal material. | Limited braking control; unstable on sticky floors; peeling under torque. |
| **Split Coverage** | Better stopping power; some rotational assistance. | Can catch during rolling footwork; creates multiple friction zones. |
| **Full Coverage (Recommended)** | Uniform traction profile; predictable movement; best long-term durability; most comfortable. | Requires precision trimming and slightly more material. |

Full coverage has proven the most reliable option during long convention weekends and all-night social dances.

## Required Gear

| Item | Purpose |
| :--- | :--- |
| **[Adhesive suede sheets](/gear/2026-04-12-suede-shoe-diy)** | Creates dance sole |
| **Isopropyl alcohol** | Surface preparation |
| **Scissors or X-Acto knife** | Cutting |
| **Marker or pen** | Tracing |
| **Optional suede brush** | Maintenance |

## Step-by-Step Tutorial

### 1. Clean the Sole
Remove dirt and oils from the rubber sole. Use isopropyl alcohol and let it dry completely. Chemical preparation is essential for a long-lasting bond.

![Cleaning shoe sole](/images/gear/diy/step1-clean.svg)

### 2. Trace the Shoe
Place the shoe sole-down on the backing paper of the suede sheet. Trace the outline carefully.

![Tracing suede outline](/images/gear/diy/step2-trace.svg)

### 3. Cut Inside the Line
Cut the suede sheet. **Important:** Cut approximately 1–2 mm inside the traced outline.

<Notice type="warning">
**Technical Note:** Trimming the suede slightly smaller than the sole prevents the exposed edges from catching on the floor—the primary cause of peeling and adhesive failure.
</Notice>

![Cutting suede sheet](/images/gear/diy/step3-cut.svg)

### 4. Apply the Suede
Peel the backing paper gradually. Apply from toe to heel, pushing out air bubbles and pressing firmly as you go.

![Applying suede](/images/gear/diy/step4-apply.svg)

### 5. Let It Cure
Wait 24 hours for the adhesive to fully bond. Avoid testing the shoes early, as this can weaken the initial cure.

![Curing process](/images/gear/diy/step5-cure.svg)

## Long-Term Performance: Real-World Results

I tested this modification extensively in high-demand environments. In my experience:
- **Survived Major Conventions:** Successfully navigated 4-day events with continuous dancing.
- **8+ Hour Socials:** Maintained consistent traction without edge lifting during all-night sets.
- **Multiple Years of Use:** With occasional maintenance, a single application can last through several seasons of regular dancing.
- **Consistent Traction:** Provides a predictable movement profile across various floor conditions, from hotel ballrooms to studio wood.

## Maintenance and Repairs

### Restoring Traction
Over time, dust and floor wax can compress the suede fibers. Use a [dance shoe suede sole brush](/gear/2026-04-12-suede-shoe-diy) to raise the nap and refresh the glide characteristics after long weekends or heavy use. To keep your dance shoes fresh across multi-day events, see our guide on how to [combat dance shoe odor with electric dryers](/blog/2026-06-01-shoe-care-modification).

### Repairing Minor Peeling
Instead of replacing the entire sheet, apply a drop of Shoe Goo or superglue to any lifted edges and clamp until cured.

## Final Verdict

If you already own a comfortable pair of sneakers or flats, adding adhesive suede is often a better solution than purchasing dedicated dance shoes. The modification is inexpensive, durable, and provides a predictable friction profile across a wide range of ballroom and social dance floors.

## Frequently Asked Questions

### How durable are adhesive suede sheets?
Suede sheets typically last for several months of regular dancing, depending on the floor type. They perform best on smooth wooden or dedicated dance floors. Save suede for the dance floor — concrete, wet floors, and anything outside the ballroom destroy it. Change out of your dance shoes before using the restroom or taking the elevator (you never know what is on the floor).

### How do I remove them?
If you need to replace the sheets or return the shoes to everyday use, peel them off slowly. Rubbing alcohol or an adhesive remover like Goo Gone removes any residual adhesive.

### What is the best material for DIY dance shoe soles?
Chrome leather, also known as industrial-strength adhesive suede, is the industry standard for dance shoe modification. It provides the ideal balance of slip and grip on wooden ballroom floors to protect your joints during spins.

### What kind of glue is used for dance shoe soles?
For DIY conversions, use industrial contact cement or high-grade adhesive backing that comes pre-applied to suede sheets. Sand and rough up the rubber sole first so the adhesive bonds permanently.

<Notice type="related">
Breaking in a new pair for your next convention? The [Ultimate West Coast Swing Event Survival Guide](/blog/2026-06-15-ultimate-wcs-event-survival-guide) covers everything else on your packing list.
</Notice>
`,G=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"})),L=`---
type: post
draft: false
status: published
title: "Why the Tier System Decides WCS Finals"
date: "2026-04-18"
author: "Ariel Anders"
category: "WCS"
excerpt: "A data-driven look at the WSDC points system, the 'Tier 3 Sweet Spot', and why survival math is the hardest part of West Coast Swing."
image: "/assets/posts/competition-data-thumb.svg"
imageAlt: "A technical visualization showing the WSDC Tier structure and round requirements, illustrating why the jump from Tier 3 to Tier 4 is the biggest hurdle for competitive dancers."
imageFit: "contain"
tags:
  - research
  - wcs
  - competition
---

## The Reality of WCS Finals

In West Coast Swing, the margin between making a final and being the "first alternate" is razor-thin. But it's not just about how you dance; it's about the **math of the Tier system**.

The World Swing Dance Council (WSDC) defines Tiers based on the number of unique competitors. These Tiers determine both the points awarded and the number of rounds you must survive.

### The Competition Funnel: Survive the Rounds

As the number of competitors grows, so does the complexity of the tournament. The "survival math" changes dramatically once you hit Tier 4.

\`\`\`mermaid
graph TD
    subgraph "Tier 3 (20-39 Dancers)"
        T3A[Prelims] --> T3B[Finals: 10-12 Dancers]
        style T3B fill:#00cfff,stroke:#00cfff,color:#000
    end

    subgraph "Tier 4 (40-79 Dancers)"
        T4A[Prelims] --> T4B[Semifinals]
        T4B --> T4C[Finals: 12-15 Dancers]
        style T4C fill:#00cfff,stroke:#00cfff,color:#000
    end
\`\`\`

In a Tier 3 event, you only have to beat roughly 50-60% of the field once to make finals. In Tier 4, you have to beat the field in Prelims, and then beat a *filtered* field of semi-finalists just to get a chance to place.

### The "Tier 3 Sweet Spot"

For many dancers, Tier 3 is the "Sweet Spot." It offers the best ratio of points-potential to effort.

| Tier | Competitors | Rounds | Points for 1st | Points for 5th | Points for 10th |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Tier 1 | 5-10 | 1 | 3 | 0 | 0 |
| Tier 2 | 11-19 | 1-2 | 6 | 1 | 0 |
| **Tier 3** | **20-39** | **2** | **10** | **2** | **1** |
| Tier 4 | 40-79 | 3 | 15 | 6 | 1 |
| Tier 5 | 80-129 | 3-4 | 20 | 10 | 2 |

**Why Tier 3 is better than Tier 4 for progress:**
1. **Fewer Rounds:** You only need to be "on" for two dances (Prelims and Finals). Tier 4 requires a Semifinal round, which adds fatigue and another opportunity for a bad draw or a single mistake to knock you out.
2. **Probability:** In Tier 3, with 20 dancers, 10 make finals. Your odds are 50%. In Tier 4, with 79 dancers, only 12-15 make finals. Your odds drop to ~18%.
3. **The Bubble:** Because the field is smaller, the "noise" of judging has less impact.

### Strategic Event Selection

If you are hunting for points to move up a division, bigger isn't always better. A massive Tier 5 event like *The Open* or *Wild Wild West* is a "grind" where even elite dancers can get stuck in the "Semis Bubble."

\`\`\`mermaid
graph LR
    A[Small Local Event] --> B{Strategy?}
    B -->|Tier 2| C[Low Points / Easy Final]
    B -->|Tier 3| D[The Sweet Spot: 10pts / 2 Rounds]
    B -->|Tier 4+| E[High Variance / The Grind]
    style D fill:#00cfff,stroke:#00cfff,color:#000
\`\`\`

### Looking at the Big Picture

I'm building tools in the [DevAI Portfolio](/research) to normalize these results. By tracking whether you are consistently making Semis in Tier 4 or placing in Tier 3, we can see a much more reliable picture of your improvement than a single "No Recall" at a major event.

Let the math inform your expectations. If you made the Semis at a Tier 4 event, you are likely an "above-average" dancer who just got caught in the survival math.
`,U=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),J=`---
type: post
title: "The WCS Travel Pack"
date: "2026-04-19"
updated: "2026-06-24"
excerpt: "A practical packing checklist for West Coast Swing weekends, covering shoes, earplugs, layers, recovery, hygiene, and travel tech."
category: "Travel"
tags: ["guide", "travel", "gear"]
image: "/assets/home/wcs-travel-pack.webp"
imageAlt: "A flat-lay of WCS travel essentials including dance shoes, earplugs, and a travel steamer."
imageFit: contain
author: "Ariel Anders"
affiliateIds:
  - "loop-experience"
  - "portable-steamer"
  - "jbl-flip-6"
  - "portable-charger"
---

> Here is a practical packing checklist for a smoother West Coast Swing weekend, based on common dancer pain points: sore feet, loud ballrooms, sweaty workshops, cold hotel spaces, and late-night social dancing.

For organization strategy once the bag is packed — bundle methods, wrinkle-free outfits, travel-sized essentials — see [Event Travel & Packing](/blog/2026-06-01-event-travel-packing).

### Footwear & Shoe Care
- **At least two pairs of dance shoes:** Rotating your shoes once or twice a day gives your feet a "change of scenery" and prevents intense soreness from pressure points. Suede-soled shoes (like Latin practice heels or practice sandals) are standard.
- **Suede shoe brush:** Helpful for cleaning off dirt and restoring grip if the ballroom floor gets slick or dusty.
- **Shoe glue:** For emergency repairs if a sole starts peeling mid-event.
- **Friction protection:** Blister care pads, athletic tape, or friction-reducing sticks. If you wear open-toed dance sandals, bringing sock-length nylons can prevent strap friction and blisters.
- **Baking soda or baby powder:** To dry out damp shoes and eliminate odor after hours of dancing.

![A portable electric shoe dryer with two heating arms extending upwards, designed to fit into dance shoes to remove moisture and odor after a long social dancing session.](/images/gear/sketches/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.webp)

<notice type="affiliate" id="shoe-dryer"></notice>

### Apparel (The Sweat & Temperature Strategy)
- **10 to 15 shirts:** Many dancers find they sweat much more than expected. Plan on bringing extra t-shirts for classes and workshops, and changing into fresh, nice shirts for social dancing. Darker or busy patterned shirts are often helpful because they hide underarm sweat patches.
- **Synthetic pants/trousers:** Stretchy slacks or synthetic dress pants drape nicely, free your leg movement, and pack easily. Avoid heavy denim jeans—they can trap heat, restrict motion, and take too long to dry if you need to wash them.
- **A warm hoodie or light jacket:** Ballrooms are often heavily air-conditioned and can be cold during workshops, competitions, or whenever you are sitting still.
- **Double your socks and underwear:** Plan on showering and changing 2 to 3 times a day (after daytime workshops, before evening social dancing, etc.).
- **Travel laundry detergent sheets:** Synthetic activewear can easily be washed in your hotel sink and will dry overnight if you run low on clean clothes.

![A set of three grey compression packing cubes of varying sizes, shown partially filled with folded dance apparel to demonstrate space-saving efficiency for event travel.](/images/gear/sketches/compression-cubes.webp)

<notice type="affiliate" id="compression-cubes"></notice>
<notice type="affiliate" id="portable-steamer"></notice>

### Ballroom Bag (On-the-Floor Essentials)
Keep a small backpack or messenger bag with you in the ballroom to keep essentials within reach:
- **A small sweat towel:** Useful for wiping down your face and arms between dances.
- **A handheld fan:** A battery-powered fan or a manual folding fan is helpful for cooling down on the sidelines.
- **High-fidelity earplugs:** Ballroom sound systems can be loud. Dampening earplugs (like Loop Experience 2) protect your hearing while still letting you hear the music and talk to your partners.
<notice type="affiliate" id="loop-experience"></notice>
- **Reusable water bottle & electrolyte packets:** Powdered mixes (like Liquid I.V.) help prevent muscle cramps and dehydration from hours of active sweating.

![A slim, black bounce-free running belt with a zippered expandable pouch, designed to discreetly hold a phone, keys, and cash under a dance shirt.](/images/gear/sketches/fanny-pack.webp)

<notice type="affiliate" id="running-belt"></notice>

### Hygiene & Close-Connection Etiquette
- **Deodorant / Antiperspirant:** WCS is an intimate, close-proximity partner dance. Use a strong combination of both and reapply often.
- **Breath mints or gum:** Keep your breath fresh throughout long nights.
- **Hand sanitizer:** Keep a travel-sized bottle in your bag and sanitize your hands every few dances to avoid getting sick.

### Recovery & Downtime
- **A swimsuit:** Early morning hot tub/jacuzzi hangouts are a common social tradition at swing events and can be a great way to soothe aching muscles.
- **A lacrosse ball or hollow foam roller:** Useful for rolling out tight arches, calves, and lower back muscles.
- **Pain relievers:** Standard over-the-counter anti-inflammatories (like ibuprofen or paracetamol) for sore joints and sleep-deprivation headaches.
- **Protein bars & quick snacks:** Keep nuts, fruit, or protein bars in your room and bag. You may get hungry at 3:00 AM when hotel restaurants are closed.

![A high-density black foam roller with a textured surface, positioned as a critical tool for rolling out tight calves and arches after 12+ hours on the dance floor.](/images/gear/sketches/foam-roller.webp)

<notice type="affiliate" id="foam-roller"></notice>

### Daytime Sleep Gear (Circadian Sleep)
Because social dancing often runs until 4:00 AM or 5:00 AM, many dancers find they need to sleep while the sun is up:
- **A contoured sleep mask:** Often helpful to block out bright morning sunlight.
- **Silencing earplugs:** To block out daytime hotel hallway noise and roommates moving around.
- **Clothes pins or binder clips:** A great travel hack to clamp the hotel's blackout curtains completely shut and block annoying light leaks.

### Miscellaneous Tech & Tools
- **High-capacity power bank:** Your phone battery can drain quickly from recording workshop recaps, taking videos of friends, and looking up late-night songs.
- **Emergency utility kit:** Pack a few safety pins, a travel sewing kit, and spare earring back stoppers in case of a wardrobe malfunction.

![A three-in-one USB charging cable with USB-C, Lightning, and Micro-USB connectors, featuring a durable braided nylon jacket and reinforced stress points.](/images/gear/sketches/short-multi-charging-cable-3a-3pack-multiple-usb-fast-charger-cable-fo.webp)

<notice type="affiliate" id="charging-cables"></notice>
<notice type="affiliate" id="jbl-flip-6"></notice>
<notice type="affiliate" id="portable-charger"></notice>
`,q=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"})),Y=`---
type: post
draft: true
title: "BoomTick and B\\\\: Rhythmic Architecture of WCS"
date: "2026-05-06"
author: "Ariel Anders"
category: "WCS"
excerpt: "Exploring the legacy of Skippy Blair, the Universal Unit System, and why the B\\\\ logo represents the soul of syncopated movement."
image: "/assets/posts/boomtick-and-b-thumb.svg"
---

## Welcome to BoomTick.blog: The Pulse of the Music

In music, they call it the backbeat. In West Coast Swing, we call it home.

To understand the fundamental rhythm of this dance, you must look beyond doubles and triple steps. It’s about how we inhabit the space between the notes. That’s the foundation of BoomTick.blog.

## The Anatomy of the Rhythm

To understand the dance, you have to understand the pulse:

- The "Boom": This is the downbeat (1, 3, 5, 7). It’s the bass drum, the floor, and the foundation. In our dance, the "Boom" is where we find our grounding. It’s the "hook" in the handhold and the "pin" in the connection. It’s the moment we drop our level to give our partner a "tell" that something big is coming.
- The "Tick": This is the upbeat (2, 4, 6, 8). It’s the snare, the "high" sound, and the finish line. It’s where we strike our triples and hit our anchors. The "Tick" is the exclamation point at the end of the pattern.

## The Logo: B\\

The logo is a piece of rhythmic shorthand derived from Blair’s [Universal Unit System (UUS)](https://www.worldsdc.com/special-recognition/skippy-blair/).

### The Dot (•) Decoded

In UUS notation, symbols dictate the distribution of weight. While a forward slash (/) represents a non-weight change (a touch, tap, or hold), the dot (•) signifies a full weight change (a step). It is the visual representation of committing your weight into the floor.

### B\\ — The Boom-Step

The B\\ stands for the 'Boom-Step.' It represents that specific moment where the music hits a heavy 'Boom' (Beat 1), and you decisively take that first step, committing your weight and initiating the momentum of the pattern.

It symbolizes the three pillars of modern WCS:

1. Choice: Intentionality over habit.
2. Connection: Committing weight to create a grounded partnership.
3. Momentum: The physical drive to move through the music.

## Visual Rhythmic Aids

To better visualize how the Universal Unit System maps to our fundamental patterns, here is a representation of the notation for common 6-beat and 8-beat structures:

**6-Beat Pattern (e.g., Sugar Push, Left Side Pass)**

\`\`\`text
Beat: | 1 | 2 | 3 & 4 | 5 & 6 |
UUS:  | • | • | •   • | •   • |
\`\`\`

_(Note: In UUS, a smaller dot would be used for the '&' count between beats, but standard dots represent the weight changes here for simplicity.)_

**8-Beat Pattern (e.g., Whip)**

\`\`\`text
Beat: | 1 | 2 | 3 & 4 | 5 | 6 | 7 & 8 |
UUS:  | • | • | •   • | • | • | •   • |
\`\`\`

These simple dots (•) and slashes (/)—if we were to substitute a touch for a step—give dancers a clear, visual map of weight transfer that reads at a glance.

This intersection of technical structure and creative expression is why I dance. Learn more about [author Ariel Anders' dance and engineering background](/about), or browse our [West Coast Swing apparel and gear collection](/gear).

## Visual Identity: The Accessible Victorian

The aesthetic of BoomTick.blog is as intentional as a well-timed anchor. We’ve developed the **"Accessible Victorian"** design language—a blend of San Francisco’s architectural heritage and modern accessibility standards.

This design uses a palette of high-contrast teals, corals, and plums, ensuring that every insight is easy to read regardless of your device. Professional-grade research should be accurate, beautiful, and inclusive.

## Sources

- [World Swing Dance Council - Skippy Blair](https://www.worldsdc.com/special-recognition/skippy-blair/)
- [Wikipedia - Skippy Blair](https://en.wikipedia.org/wiki/Skippy_Blair)
- [Universal Unit System Overview](https://www.eijkhout.net/ftb/Music/unit.html)
- [West Coast Swing Foundation Patterns - Skippy Blair (YouTube)](https://www.youtube.com/watch?v=QzGuTBoUamE&t=335)
`,V=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"})),K=`---
type: post
title: "Event Travel & Packing"
date: "2026-06-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "Build your ultimate convention packing checklist with these organizers and garment care essentials for out-of-town West Coast Swing events."
image: "/images/gear/sketches/compression-cubes.webp"
imageAlt: "A set of navy blue compression packing cubes with mesh tops and double-zipper systems, shown compressing stacked clothing to minimize suitcase volume."
imageFit: "contain"
affiliateIds:
  - "compression-cubes"
  - "travel-bottles"
  - "portable-steamer"
tags:
  - "travel"
  - "packing"
  - "organization"
---

## The Convention Packing Checklist

Travel conventions can be stressful, but an organized bag makes a world of difference. These packing essentials help you maximize suitcase space and keep your dance clothes looking their best. Before heading to the airport, browse our [curated gear essentials](/gear).

## Smart Packing Strategies

Navigating a hotel weekend means packing for multiple scenarios: daytime workshop schedules, evening competitions, and late-night socials. To minimize suitcase volume, prioritize wrinkle-resistant fabrics. For your competition attire, a compact travel garment bag keeps your lines crisp. Pack the invisible essentials: hydration multipliers for your water bottle and high-fidelity earplugs for late-night jam circles — the full item checklist is [The WCS Travel Pack](/blog/2026-04-19-practical-tools-essentials).

### Space-Saving Organization
Standard folding often leaves gaps in your luggage. Instead, try the "bundle" method or use high-quality compression cubes. These cubes allow you to group outfits by day or performance type, making it easy to find exactly what you need while keeping the rest packed. If you are preparing footwear for event ballrooms, see our [DIY suede dance shoe modification guide](/blog/2026-04-18-make-shoe-dance).

<notice type="affiliate" id="compression-cubes"></notice>

### Travel-Sized Essentials
Decant into leak-proof silicone containers that meet TSA regulations. Labeling each bottle ensures you won't mix up your hair gel with your face wash during a quick costume change. Learn how to [combat dance shoe odor with electric dryers](/blog/2026-06-01-shoe-care-modification) during multi-day weekend events.

![Four multi-colored, leak-proof silicone travel bottles with labeled flip-top caps, designed for TSA-compliant storage of liquids.](/images/gear/sketches/leak-proof-refillable-silicone-travel-bottles-3oz-travel-size-containe.webp)

<notice type="affiliate" id="travel-bottles"></notice>

## Maintaining Your Performance Gear

### Wrinkle-Free Outfits
A portable garment steamer fits in your bag and freshens shirts and dresses in minutes — arrive wrinkle-free.

![A lightweight, handheld white garment steamer with an ergonomic handle and a visible water reservoir, used for refreshing dance competition attire.](/images/gear/sketches/travel-steamer.webp)

<notice type="affiliate" id="portable-steamer"></notice>

### Steaming vs. Folding
| Care Method | Best For | Considerations |
| :--- | :--- | :--- |
| **Steaming** | Delicate fabrics, competition wear | Requires bringing a portable steamer |
| **Folding** | Practice wear, casual outfits | Use compression cubes to minimize wrinkles |

<Notice type="related">
For the full weekend playbook beyond packing, see the [Ultimate West Coast Swing Event Survival Guide](/blog/2026-06-15-ultimate-wcs-event-survival-guide).
</Notice>
`,$=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"})),Q=`---
type: post
title: "General Health & Home Care for Dancers"
date: "2026-06-01"
author: "Ariel Anders"
category: "Health"
excerpt: "Master your post-event recovery routine with targeted foam-rolling techniques, muscle maintenance, and self-care strategies for the active West Coast Swing dancer."
image: "/images/gear/sketches/foam-roller.webp"
imageAlt: "A technical sketch of a high-density foam roller used for dancer recovery."
imageFit: "contain"
tags:
  - "health"
  - "recovery"
  - "maintenance"
  - "foam-rolling"
  - "self-care"
affiliateIds:
  - "foam-roller"
  - "liquid-iv"
  - "epsom-salt"
  - "hypervolt"
  - "pedialyte"
---

## Post-Event Recovery & Maintenance

Recovery is just as important as practice. After a long weekend of dancing on hard ballroom floors, your muscles need targeted attention to prevent injury, reduce soreness, and maintain the flexibility required for high-level West Coast Swing.

### Muscle Recovery & Myofascial Release

Dancing for three days straight puts immense strain on your lower body, increasing the risk of repetitive stress issues like plantar fasciitis. To ease post-dance soreness and maintain calf mobility, integrate dynamic stretching before your daytime heats. Back in the hotel room, use a dense massage ball on your arches and a travel-friendly foam roller to release tension in your IT band, quads, and hamstrings before you go to sleep.

A high-density foam roller is an essential tool for any dancer's home recovery kit. It uses your own body weight to perform deep tissue massage, easing post-dance soreness and helping tired tissues recover.

#### Targeted Foam-Rolling Techniques

For West Coast Swing dancers, the primary focus should be on the posterior chain and the muscles responsible for stabilization and explosive movement.

#### 1. Calves (Gastrocnemius & Soleus)

\`\`\`mermaid
graph TD
    subgraph Form Guide: Calves
    S[Start: Seated, hands behind for support] --> R[Place roller under ankles]
    R --> L[Lift hips to apply weight]
    L --> M[Roll slowly ankle to below knee]
    M --> P[Pause on tight spots 30s]
    end
\`\`\`

Dancers spend significant time on their toes. Place the roller under your ankles and slowly roll up toward the knee. To increase pressure, cross one leg over the other.

#### 2. IT Band

\`\`\`mermaid
graph TD
    subgraph Form Guide: IT Band
    S[Start: Lie on side, bottom elbow support] --> R[Place roller just below hip]
    R --> T[Top leg crossed in front for balance]
    T --> M[Roll hip to just above knee]
    M --> P[Maintain core tension]
    end
\`\`\`

The Iliotibial band runs along the outside of the thigh. This is often a sensitive area for dancers due to the lateral movements in WCS. Lie on your side with the roller just below the hip and roll down to just above the knee.

#### 3. Quads

\`\`\`mermaid
graph TD
    subgraph Form Guide: Quads
    S[Start: Lie face down, forearms support] --> R[Place roller under mid-thighs]
    R --> M[Roll from hip to above knee]
    M --> C[Keep back flat, core engaged]
    C --> P[Hold trigger points 20s]
    end
\`\`\`

Lie face down with the roller under your thighs. Roll from the hips down to the tops of the knees. Focus on any "trigger points" or particularly tight spots by holding the position for 20-30 seconds.

<notice type="affiliate" id="foam-roller"></notice>

#### Percussive Therapy

While foam rolling is excellent for large muscle groups, percussive therapy offers a more targeted approach. A massage gun like the Hypervolt uses rapid, concentrated pulses to reach deep into muscle tissue, improving range of motion and accelerating recovery after intense social dancing.

<notice type="affiliate" id="hypervolt"></notice>

### The Post-Event Recovery Workflow

Consistency is key to effective recovery. Following a structured workflow after a social dance or a full event weekend can significantly reduce your post-event fatigue.

\`\`\`mermaid
graph LR
    A[End of Social] --> B[Hydrate]
    B --> C[Cool Down Stretch]
    C --> D[Foam Roll]
    D --> E[Epsom Salt]
    E --> F[Sleep]
\`\`\`

### Chemical Recovery: Hydration & Nutrition

During a convention, it's easy to fall into a cycle of caffeine and adrenaline. To recover properly, you must replenish electrolytes.

<notice type="affiliate" id="liquid-iv"></notice>

I recommend using a hydration multiplier like Liquid I.V. before bed and immediately upon waking. This helps combat the dehydration that leads to muscle cramping and the "swung over" feeling many dancers experience on Monday morning.

#### Hydration & Electrolytes

Water alone isn't always enough to recover from hours on the dance floor. Rehydration packets like Pedialyte are formulated with a precise balance of sugar and electrolytes to help you rehydrate faster than sports drinks or water alone, making them an essential part of your "Monday morning" recovery kit.

<notice type="affiliate" id="pedialyte"></notice>

### Soothing the Inflammation

End with a warm soak. Magnesium absorption through the skin can help relax muscles and improve sleep quality.

<notice type="affiliate" id="epsom-salt"></notice>

Add a generous amount of Epsom salts to a warm bath. The magnesium sulfate helps pull toxins from the muscles and reduces swelling in the feet and ankles—the true heroes of every dance weekend.

## Frequently Asked Questions

### How should dancers recover after a multi-day convention?
Dancers should implement a targeted recovery routine: dynamic stretching to ease post-dance soreness, plus massage-ball and foam-roller work on the arches, IT band, quads, and hamstrings before sleep.

### How do you prevent foot pain from social dancing?
Prevent foot pain by wearing ergonomic footwear, utilizing shock-absorbing insoles, and prioritizing myofascial release. Rolling your arches on a massage ball before sleep reduces the risk of repetitive stress issues like plantar fasciitis.

<Notice type="related">
Want the full convention playbook to go with your recovery routine? See the [Ultimate West Coast Swing Event Survival Guide](/blog/2026-06-15-ultimate-wcs-event-survival-guide).
</Notice>
`,X=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"})),Z=`---
type: post
title: "Outdoor Dancing Gear"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "Gear specifically suited for outdoor events, festivals, or warm-weather dancing."
image: "/images/gear/sketches/fanny-pack.webp"
imageAlt: "Minimalist ink-style sketch of a slim, low-profile fanny pack, emphasizing its lightweight and non-intrusive design for active use."
imageFit: "contain"
affiliateIds:
  - "running-belt"
  - "sunscreen"
  - "visor"
tags:
  - "outdoor"
  - "summer"
  - "gear"
  - "travel"
---

Dancing outdoors brings its own set of challenges, from sun exposure to keeping your valuables secure while you're active. Here’s the essential gear for your next outdoor festival or warm-weather social.

### Keep Your Valuables Safe

A slim fanny pack or running belt keeps your phone, keys, and cash secure and stays out of your way while you dance.

![Ultra-light, bounce-free slim running belt designed for keys and phone, featuring a low-profile silhouette that stays secure on the social floor and fits discreetly under clothing.](/images/gear/amazon/ushake-slim-running-belt-ultra-light-bounce-free-waist-pouch-fitness-w.jpg)

<notice type="affiliate" id="running-belt"></notice>

### Sun Protection is Non-Negotiable

If you're dancing under the sun, SPF 50 sunscreen and a good visor are essential to prevent burns and keep the sun out of your eyes so you can focus on your partner.

![Ergonomic performance visor providing sun protection while maintaining visibility and breathability for outdoor social dancing.](/images/gear/sketches/visor.webp)

<notice type="affiliate" id="sunscreen"></notice>

<notice type="affiliate" id="visor"></notice>
`,ee=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"})),te=`---
type: post
title: "Power & Charging Essentials"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "On-the-go backup power sources for phones, speakers, and event accessories."
image: "/images/gear/sketches/short-multi-charging-cable-3a-3pack-multiple-usb-fast-charger-cable-fo.webp"
affiliateIds:
  - "portable-charger"
  - "charging-cables"
tags:
  - "tech"
  - "travel"
  - "power"
---

Long days at conventions mean your devices will likely run out of juice before the social dancing even starts. Keep your phone and speakers powered up with these charging essentials.

### Stay Charged All Weekend
A high-capacity portable power bank from Anker keeps you going when you're away from a wall outlet for 12+ hours.


### Fast and Flexible Charging
Multi-charging cables allow you to charge multiple devices at once with high-speed 3A charging, reducing the number of cords you need to pack.

<notice type="affiliate" id="charging-cables" />

### Choosing the Right Capacity
When selecting a power bank, a higher mAh capacity (e.g., 20,000mAh) is ideal for weekend-long events where wall outlets are scarce, providing multiple full charges for your phone and accessories.
`,ne=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"})),oe=`---
type: post
title: "Practice & Review Tech"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "Electronics and tools for listening to music, rehearsing, or recording practice runs."
image: "/images/gear/sketches/ue-wonderboom.webp"
affiliateIds:
  - "portable-speaker"
  - "tripod"
tags:
  - "tech"
  - "practice"
---

Improving your dance requires consistent practice and review. These tech tools make it easier to rehearse anywhere and analyze your movement.

### Music on the Go
A reliable, portable Bluetooth speaker is essential for hotel room practices or outdoor meetups. The UE Wonderboom 4 offers great sound in a compact, durable package.




### Record Your Progress
Record your sessions so you can see what to fix. A compact travel tripod allows you to easily film your practice sessions or competition heats for later review.

<notice type="affiliate" id="tripod" />

### Recommended Setup
For the best recording angle, place your tripod at chest height and position it near a corner of the floor. This minimizes obstruction while capturing the full scope of your movement.
`,ae=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"})),re=`---
type: post
title: "Practice & Social Dance Apparel"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "Functional dance wear, breathable layers, and styling basics for your next West Coast Swing practice or social."
image: "/images/gear/sketches/mesh-fishnet-top.webp"
imageFit: "contain"

affiliateIds:
  - "sports-crop-tops"
  - "fishnet-tights"
  - "mesh-fishnet-top"
  - "reflective-crop-tops"
tags:
  - "fashion"
  - "apparel"
  - "practice"
---

## Building Your Social Dance Wardrobe

Functional dance wear should be comfortable, breathable, and stylish. If you're figuring out what to wear to your first WCS social, these non-merch basics are perfect for layering and creating your own unique look on the floor. Explore our full [curated social dance apparel and gear](/gear) catalog or check out our [lead and follow switch dynamics](/gear/2024-06-01-love-neon-switch-shirt) collection.

![Crop Top](/images/gear/amazon/floerns-women-s-casual-reflective-short-sleeve-round-neck-crop-tops-t.jpg)

### Breathable Basics
Crop tops are a favorite for a reason—they're lightweight and keep you cool during intense workshops.

<notice type="affiliate" id="reflective-crop-tops" />

### Layering with Style
Mesh and fishnet tops add texture to your outfit while letting heat escape, while fishnet tights provide a classic dance look.

<notice type="affiliate" id="mesh-fishnet-top" />
<notice type="affiliate" id="fishnet-tights" />

> Convention ballrooms are notoriously temperature-variable. Always start with a breathable base layer (like a crop top) and bring a light, easily removable over-layer (like a mesh top or light jacket) to adjust as you warm up.
`,ie=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"})),se=`---
type: post
title: "How to Combat Smelly Dance Shoes"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "Stop masking odors and start eliminating them. Why an electric shoe dryer has proven to be the most effective tool in my gear bag."
image: "/images/gear/sketches/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.webp"
imageAlt: "A minimalist sketch of an electric shoe dryer with a timer control unit, highlighting its portability for dance travel."
imageFit: "contain"
affiliateIds: ["shoe-dryer"]
tags:
  - "shoes"
  - "maintenance"
  - "hygiene"
---

## Eliminating Dance Shoe Odor

Your shoes are your most important piece of equipment, but they are also the most prone to developing that dreaded funk. For years, I tried almost every remedy in the book: foot powders, deodorizing sprays, and even stuffing dryer sheets into my shoes after a long night of social dancing.

While some of these provided temporary relief, none addressed the root cause: deep-seated moisture buildup in the footbed. When sweat gets trapped inside your shoes during a multi-day event, it creates the perfect environment for microbial growth. An electric shoe dryer forces warm air through the material, stopping that growth before it starts. Pair this daily drying routine with proper suede brushing to keep the soles clean, and wear sweat-wicking socks to protect the interior lining.


### The Science of the Stink
The odor is the bacteria that thrive in the warm, damp environment inside your shoes — not the sweat itself. When you dance for hours, your shoes become a petri dish. Dry them completely before the next session — the bacteria keep multiplying in trapped moisture, and the smell gets harder to manage.

![A pair of black strappy ballroom dance shoes, which can trap moisture and bacteria during long social dancing sessions.](/images/gear/amazon/hxyoo-ballroom-dance-shoes-boots-for-women-salsa-latin-wedding-party-2.jpg)
<Text variant="mono" size="micro" color="dim" uppercase textAlign="center" display="block" marginTop={-6} marginBottom={12}>Equipment Hygiene</Text>

### Why the Electric Shoe Dryer is My Top Choice
After experimenting with many different methods, an electric shoe dryer and deodorizer worked best. Passive drying can take days (especially in humid hotel rooms); an electric dryer uses gentle heat and airflow to pull moisture out of the deep foam and fabric layers of your dance shoes.

![Portable electric shoe dryer showing the two heating elements and the wired timer control unit.](/images/gear/amazon/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.jpg)
<Text variant="mono" size="micro" color="dim" uppercase textAlign="center" display="block" marginTop={-6} marginBottom={12}>Portable Maintenance Gear</Text>

In my experience, using a dryer for just 30-60 minutes after a dance session makes a world of difference:

- **Complete Moisture Removal:** It reaches areas air-drying misses, ensuring the shoes are bone-dry by morning.
- **Bacterial Prevention:** By eliminating the damp environment, you address the root cause of the odor before it can start.
- **Preserving Your Investment:** Constant moisture breaks down the materials of your shoes faster. Keeping them dry significantly extends their lifespan.
- **Freshness for Multi-Day Events:** A dryer ensures every day starts with a fresh pair.


If you are looking for a reliable way to maintain your gear and your hygiene during long dance weekends, these have been the best investments I've made for my gear bag. Check out our [curated West Coast Swing gear directory](/gear) for more recommendations.

For additional footwear maintenance, use a [dance shoe suede sole brush](/gear/2026-04-12-suede-shoe-diy) to restore traction on compressed nap, or review our [custom adhesive suede shoe modification](/blog/2026-04-18-make-shoe-dance) tutorial. For complete event preparation, see our [WCS competition travel checklist](/blog/2026-06-01-event-travel-packing).

<notice type="affiliate" id="shoe-dryer"></notice>

## Frequently Asked Questions

### How do you get the smell out of dance shoes?
The most effective method is using a portable electric shoe dryer immediately after dancing. This eliminates the deep-seated moisture in the footbed and stops microbial growth before it starts, rather than just masking the odor with powders or sprays.

### Can you wash suede sole dance shoes?
Keep suede soles out of water. To clean them, use a wire suede brush to remove dirt and restore the nap of the leather. Keep moisture restricted to the interior lining.
`,le=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"})),ce=`---
type: post
title: "Theme Wear, Costumes & Accessories"
date: "2026-06-01"
author: "Ariel Anders"
category: "Costumes"
excerpt: "Accessories and props curated for themed social dance nights (e.g., Space/Alien, Glow)."
image: "/images/gear/sketches/glow_suspenders.webp"
imageAlt: "Vibrant neon LED suspenders pulsing with electric blue light on a dark dance floor."
seoTitle: "WCS Theme Wear & Costume Guide | BoomTick"
seoDescription: "Stand out at your next West Coast Swing convention with curated theme wear and accessories. From holographic aliens to electric LED accents."
affiliateIds:
  - "alien-mask"
  - "green-bodysuit"
  - "light-up-suspenders"
tags:
  - "fashion"
  - "costumes"
  - "themes"
imageFit: contain
---

<Notice type="info">

**Creative Styling Concept:** Focus on materials that react to event lighting. Holographic finishes, reflective fabrics, and LED accents ensure your movement is visible and dynamic during late-night social sets.

</Notice>

Theme nights are a staple of West Coast Swing conventions. From "Galactic" to "Glow Night," having the right accessories makes your outfit stand out on a budget.

### Galactic & Space Themes

<Box marginY={10}>
<Grid cols={{ base: 1, md: 2 }} gap={8}>

<Stack gap={3}>

![Electric neon green bodysuit with a high-shine holographic finish that shifts color under rhythmic dance floor lighting.](/images/gear/sketches/green-bodysuit.webp)

<Text variant="mono" size="micro" color="dim" align="center" uppercase tracking="widest">Holographic Bodysuit</Text>

</Stack>

<Stack gap={3}>

![Hyper-realistic silver metallic alien mask featuring oversized obsidian-gloss eyes that catch every laser flash.](/images/gear/sketches/alien-mask.webp)

<Text variant="mono" size="micro" color="dim" align="center" uppercase tracking="widest">Metallic Alien Mask</Text>

</Stack>

</Grid>
</Box>

Commit to the alien look with a full-body spandex suit and a latex mask.

<notice type="affiliate" id="green-bodysuit" />
<notice type="affiliate" id="alien-mask" />


### Glow Nights

![Vibrant neon LED suspenders that pulse with electric blue light, perfect for cutting through the darkness of a late-night social dance.](/images/gear/sketches/glow_suspenders.webp)

Light up the dance floor with LED suspenders. These are a favorite for late-night social dancing when the main lights go down.

<notice type="affiliate" id="light-up-suspenders" />
`,de=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"})),he=`---
type: post
title: "WCS Essentials (Local & Travel)"
date: "2026-06-01"
author: "Ariel Anders"
category: "Gear"
excerpt: "High-priority essentials to bring to any West Coast Swing event, whether local or out-of-town."
image: "/images/gear/sketches/loop-earplugs.webp"
imageAlt: "A hand-drawn sketch of a pair of blue Loop earplugs on a sketchbook page, showing their circular design and silicone tips."
affiliateIds:
  - "rave-fan"
  - "loop-experience"
tags:
  - "essentials"
  - "gear"
  - "wcs"
---

Whether you're heading to a local social or traveling across the country for a convention, these items are high-priority essentials for any West Coast Swing dancer. Browse our [essential West Coast Swing gear collection](/gear).

![A hand-drawn sketch of a large holographic rave fan with black bamboo ribs, shown both folded and fully open with a vibrant rainbow pattern, alongside its blue carrying pouch.](/images/gear/sketches/zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine.webp)

### Stay Cool on the Floor
Crowded dance floors can get incredibly hot. A large folding fan cools you down (and your partners) between songs.

<notice type="affiliate" id="rave-fan" />

### Protect Your Hearing
Ballroom sound systems are often cranked up to high volumes. High-fidelity earplugs let you enjoy the music at full volume and wake up without ringing ears. They lower the decibels while preserving the clarity of the music and conversation.

<notice type="affiliate" id="loop-experience" />

### Last Minute Checklist
* Extra socks
* Blister kit / bandaids
* Mints or gum
* Deodorant
* Refillable water bottle

For a full breakdown of out-of-town preparation, read our [WCS competition travel checklist](/blog/2026-06-01-event-travel-packing) and our [DIY suede dance shoe modification guide](/blog/2026-04-18-make-shoe-dance).
`,ue=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"})),ge=`---
type: post
title: "The Ultimate West Coast Swing Event Survival Guide"
seoTitle: "The Ultimate West Coast Swing Event Survival Guide | West Coast Swing Guide | BoomTick"
date: "2026-06-15"
unlisted: true
author: "Ariel Anders"
category: "Travel"
excerpt: "Your hub for mastering West Coast Swing conventions: from packing essentials and DIY dance shoes to recovery routines and understanding WSDC points calculation."
image: "/assets/home/wcs-travel-pack.webp"
tags:
  - travel
  - wcs
  - events
  - guide
---

Multi-day West Coast Swing events are a marathon. Between daytime workshops, Jack & Jill competitions, and social dancing until 4 AM, you need stamina, preparation, and the right gear. Whether you're heading to Boogie by the Bay or Capital Swing, here are the core resources to help you survive the weekend.

### 1. The WCS Travel Pack

A well-packed bag is the foundation of a successful event.

→ **[The WCS Travel Pack](/blog/2026-04-19-practical-tools-essentials)** covers shoes, earplugs, layers, recovery tools, and travel tech.

### 2. Upgrading Your Footwear

You will be spending hours on your feet. If you want the comfort of your favorite sneakers with the performance of dedicated dance shoes, a DIY modification is often the best path.

→ **[Make Any Shoe a Dance Shoe (DIY Suede Tutorial)](/blog/2026-04-18-make-shoe-dance)**

### 3. Post-Event Recovery

Dancing all night takes a toll. You need a targeted recovery strategy to survive a weekend event (and the days that follow).

→ **[General Health & Home Care for Dancers](/blog/2026-06-01-general-health-home-care)**

### 4. WSDC Points and Scoring

If you are competing, understanding how the World Swing Dance Council points system works is crucial for tracking your progress.

→ **[WSDC Points Tier Calculation Explained](/blog/2026-06-16-wsdc-points-tier-calculation)**
`,pe=Object.freeze(Object.defineProperty({__proto__:null,default:ge},Symbol.toStringTag,{value:"Module"})),me=`---
type: post
title: "WSDC Points Tier Calculation & Scoring Explained"
date: "2026-06-16"
unlisted: true
author: "Ariel Anders"
category: "WCS"
excerpt: "Learn how WSDC scoring works, how WSDC points tier calculations are done, and strategies for making Novice WCS finals."
image: "/assets/home/wcs-travel-pack.webp"
tags:
  - wcs
  - competition
  - scoring
  - wsdc
---

For competitive West Coast Swing dancers, understanding the World Swing Dance Council (WSDC) points system is a crucial part of navigating Jack & Jill competitions.

The WSDC system awards points to dancers who make the finals of registered Jack & Jill competitions. The number of points awarded is calculated based on your final placement and the tier size (total number of competitors) in your specific division.

### How Scoring Works in Prelims

Before you can earn points, you have to make the finals. In preliminary rounds, judges use a callback system evaluating timing, technique, and teamwork. Instead of assigning a numerical score, judges vote "Yes", "Alternate", or "No" for each competitor. Earn enough "Yes" votes, and you move on to the next round.

### Navigating the Novice Division

The Novice division is often the largest heat of the weekend, making it fiercely competitive. Flashy moves won't save poor timing. Solid fundamentals, clear partner connection, and dancing cleanly to the music are the most important criteria for judges trying to narrow down a massive field of dancers.

### Calculating Your Points & Leveling Up

Once you make the finals, the judges rank the competitors using a system called relative placement. Your final standing, combined with the event's tier size, determines the exact number of points added to your WSDC registry ID.
Accumulating these points is how you level up. If you feel you are consistently outperforming your current division but haven't hit the automatic advancement threshold, you can look into petitioning the chief judge at your next event. Keep in mind that points earned in Strictly Swing or Pro-Am divisions are tracked separately and do not count toward your Jack & Jill advancement.

## Frequently Asked Questions

### How are WSDC points calculated?
Your finals placement plus the event's tier size determine your points — see the breakdown above.

### Do Strictly Swing points count toward Jack & Jill advancement?
No — they don't count toward Jack & Jill advancement.

<Notice type="related">
Chasing points at your next event? Read the [Ultimate West Coast Swing Event Survival Guide](/blog/2026-06-15-ultimate-wcs-event-survival-guide) before you go.
</Notice>
`,fe=Object.freeze(Object.defineProperty({__proto__:null,default:me},Symbol.toStringTag,{value:"Module"})),ye=`---
type: post
title: "Building the Ultimate Renter-Friendly West Coast Swing Practice Space"
seoTitle: "Home Practice Space | West Coast Swing Guide | BoomTick"
date: "2026-06-20"
author: "Ariel Anders"
category: "Practice"
excerpt: "Learn how to build a renter-friendly WCS practice space at home using drywall-safe, stick-on mirrors to easily drill basics and check styling."
image: "/assets/blog/wcs-practice-space-mirrors.jpeg"
imageAlt: "Illustrated drawing of Ariel in a West Coast Swing home practice space with stick-on wall mirrors"
imageFit: "cover"
imagePosition: "top"
affiliateIds:
  - "stick-on-mirrors"
tags:
  - practice
  - wcs
  - home studio
---

Practicing West Coast Swing at home usually means dodging furniture and guessing what your footwork actually looks like. I finally decided to upgrade my home office and workout space into a proper practice area, and the secret turned out to be surprisingly simple: stick-on mirrors.

I picked up a pack of 20 mirror panels from Amazon ([you can find the exact ones here](/gear/2026-06-20-stick-on-mirrors)), and they completely transformed the room. For drilling basics or checking styling, these beat an expensive studio mirror.

![West Coast Swing Practice in front of Stick-On Mirrors](/assets/blog/practice_mirror.gif)

### Why These Mirrors Work for Home Studios

The biggest hurdle with installing large mirrors is usually the mounting process, especially if you want to protect your drywall. These panels bypass that completely. They are incredibly lightweight and mount with adhesive alone — no drilling, no anchors, no holes in your drywall. The installation and removal process is fast and entirely drywall-safe, making it a solid setup for any home practice space.

![Stick-on Mirrors Architectural Sketch and Installation](/images/gear/sketches/stick-on-mirrors.jpeg)

### Shatterproof and Versatile

Shatterproof, so you can practice right next to your desk and dumbbell rack — an accidental collision is a bump, not a disaster. The pack of 20 panels gave me plenty of coverage to see my full body for dance drills, and I even had a few left over that I used to line the inside of my cabinet.

Having a dedicated visual feedback setup makes a clear difference in how efficiently you can practice away from the studio.
`,be=Object.freeze(Object.defineProperty({__proto__:null,default:ye},Symbol.toStringTag,{value:"Module"})),ve=`---
type: post
title: "My Favorite Credit Cards for Hyatt-Hosted West Coast Swing Events"
seoTitle: "Best Credit Cards for Hyatt Dance Weekends | BoomTick"
seoDescription: "How two Chase cards — one $95, one $795 — cover hotel bills at Hyatt-hosted West Coast Swing dance weekends."
date: "2026-10-22"
author: "Ariel Anders"
category: "Travel"
excerpt: "How two Chase cards — one $95, one $795 — cover the hotel bill at Hyatt-hosted dance weekends."
image: "/assets/blog/hyatt-regency-orange-county.jpg"
imageAlt: "Hyatt Regency Orange County at dusk — the Jack & Jill O'Rama event hotel in Garden Grove"
imageFit: "cover"
imagePosition: "center"
tags:
  - "travel"
  - "credit-cards"
  - "hyatt"
  - "wcs"
  - "hotel-rewards"
---

This post is about one cost: the hotel at Hyatt-hosted West Coast Swing events. The event pass is rarely the expensive part of a dance weekend. The three or four hotel nights are — and you want to be in the event hotel, not driving across town at 3 a.m. after social dancing. Two cards cover the Hyatt nights:

- **World of Hyatt Credit Card ($95/year).** An anniversary free night at a Category 1–4 Hyatt, every year. Used at an event hotel, that night is usually worth more than the fee.
- **Chase Sapphire Reserve ($795/year).** The premium card that earns flexible points which transfer 1:1 to World of Hyatt.

## WCS Events Hosted at Hyatts

Hyatt hotels currently host these WCS events:

| Event | Event hotel | Where |
| --- | --- | --- |
| Jack & Jill O'Rama (JJorama) | Hyatt Regency Orange County | Garden Grove, CA |
| Boogie by the Bay | Hyatt Regency San Francisco Airport | Burlingame, CA |
| Swingtacular: The Galactic Open | Hyatt Regency San Francisco Airport | Burlingame, CA |
| Swing City Chicago | Hyatt Regency Schaumburg | Schaumburg, IL |
| MADjam | Hyatt Regency Reston | Reston, VA |
| Easter Swing | Hyatt Regency Bellevue | Bellevue, WA |

Always confirm the current hotel on the event's own page before counting on points or a certificate there.

## World of Hyatt Card ($95/yr)

![World of Hyatt Credit Card and Chase Sapphire Reserve](/assets/blog/hyatt-and-sapphire-reserve-cards.jpg)

*The World of Hyatt Credit Card and Chase Sapphire Reserve.*

- **Annual fee:** $95.
- **Anniversary free night:** one free night a year at any Category 1–4 Hyatt.
- **A second free night** after spending $15,000 on the card in a calendar year.
- **Status:** automatic Discoverist status while the card is open, plus 5 tier-qualifying night credits a year — and 2 more per $5,000 spent.
- **Earning at Hyatt:** up to 9 points per $1 — 4 bonus points from the card on top of member base points — plus bonus categories like dining and transit.
- **No foreign transaction fees.**

**How I use it:** Hyatt stays go on this card, and I time the anniversary night to an event weekend. Line up an event for the certificate before it expires.

**[World of Hyatt Credit Card — Official Application & Terms](https://creditcards.chase.com/travel-credit-cards/world-of-hyatt-credit-card)**

## Chase Sapphire Reserve ($795/yr)

The Reserve's standard annual fee is $795. I keep it for Hyatt, because its points transfer 1:1 to the World of Hyatt program.

- **$300 annual travel credit**, applied automatically to a broad range of travel purchases — no portal booking, no activation. Event travel triggers it on its own.
- **Earning:** 10 points per $1 on hotels and car rentals purchased through Chase Travel, 3 per $1 on other travel and dining — the categories a dance weekend actually runs through.
- **Flexibility:** the same points transfer 1:1 to World of Hyatt and airline partners.

**[Earn bonus points with Sapphire Reserve® or Sapphire Preferred® — apply here](https://www.referyourchasecard.com/19y/K7GDL8QMKO)** — I can be rewarded if you apply here and are approved for either card.

## Booking Strategy & Tips

- **Book on points when cash rates spike.** Event weekends compress demand into one property, so cash rates jump — exactly when a category-based award chart favors you.
- **Anchor with the free night.** Use the Hyatt card's anniversary certificate for one night and points for the rest; a four-night weekend can drop to a fraction of its cash price.
- **Pay cash costs with the right card.** Paid Hyatt stays go on the Hyatt card for its bonus earning; flights, dining, and other travel go on the Reserve, earning the points that become next event's Hyatt points.
- **Events move.** The Hyatt advantage lasts only while your events stay in Hyatts. Verify the venue each year; spend points on hotels your events still use.
- **Award space isn't guaranteed.** Certificates cover Category 1–4 only, and event blocks sell out. Book early.
- *Coming next: Is Hyatt Globalist status actually worth it? I held Globalist for a few years, initially qualifying through a work promotion that granted it for 20 nights. The follow-up post runs the real numbers to see if it's worth it for dancers.*

*Disclosure: This post contains credit card referral links. If you apply through these links, I may earn bonus points or a referral credit at no extra cost to you. Card terms, fees, welcome offers, and transfer rates change frequently; confirm current details directly with Chase and Hyatt before applying. This article reflects the author's personal use and terms; it is not financial advice.*
`,we=Object.freeze(Object.defineProperty({__proto__:null,default:ve},Symbol.toStringTag,{value:"Module"})),ke=`---
type: post
title: "The Heart Rate Monitor Behind My Remote Workouts"
seoTitle: "Heart Rate Monitor for Remote Training | BoomTick"
date: "2026-11-04"
author: "Ariel Anders"
category: "Gear"
excerpt: "I train over Zoom with a personal trainer, and he can't see my effort through the camera — so I stream my heart rate to him live. Here's the chest strap that makes it work."
image: "/assets/blog/hrm-dashboard-hero.png"
imageAlt: "HRM dashboard showing live heart rate zones during a remote workout"
imageFit: "cover"
imagePosition: "top"
affiliateIds:
  - "magene-h64"
tags:
  - gear
  - fitness
---

I do my workouts over Zoom with a personal trainer. He can't see my effort through the camera, so I built a dashboard that streams my heart rate to him in real time: [arii.github.io/hrm](https://arii.github.io/hrm/).

The hardware side is a chest strap. I use the Magene H64 — it speaks the standard Bluetooth Heart Rate Profile, which is all the dashboard needs. Any compliant monitor works (Polar, Garmin, Wahoo), but the Magene costs a fraction of those.

<notice type="affiliate" id="magene-h64" />

The project started in 2020, when gyms closed and training moved online. I wanted my trainer to see my heart rate zones live, the way he'd read my face in person. The current version pairs the strap through Web Bluetooth, runs a Tabata timer synced to Spotify, and shows a trainer dashboard with everyone's zones.

![Pairing a Bluetooth heart rate monitor through the browser](/assets/blog/hrm-pairing.webp)

The full architecture is here: [arii.github.io/devai/hrm-architecture](https://arii.github.io/devai/hrm-architecture/).

I open-sourced the dashboard — it's at [arii.github.io/hrm](https://arii.github.io/hrm/), and it works with any Bluetooth heart rate strap.
`,_e=Object.freeze(Object.defineProperty({__proto__:null,default:ke},Symbol.toStringTag,{value:"Module"})),Se=`---
type: blog
title: "The Story Behind the Merch: From Jack & Jill Orama to NorCal Pride"
date: "2026-06-14"
author: "Ariel Anders"
category: "Community"
excerpt: "How a last-minute scramble to get shirts printed for Jack & Jill Orama turned into a fun side project making dance tees."
image: "/assets/events/jjo-hero.svg"
imageAlt: "Dancers at Jack & Jill Orama wearing event t-shirts."
tags: ["merch", "community", "NorCal", "WCS"]
affiliateIds:
  - "norcal-bestcal-tshirt"
  - "norcal-pride-gate-shirt"
  - "love-neon-switch-shirt"
---
The idea for these shirts started while getting ready for Jack & Jill Orama.

## The Origin Story: Jack & Jill Orama

Jack & Jill Orama (JJO) features the Orama Cup, where different regions go head-to-head in a friendly team competition.

We wanted matching shirts for our NorCal group, but we completely missed the deadline to get them printed in time.

![Jack & Jill Orama Hero](/assets/events/jjo-hero.svg)

Rather than showing up without anything, I looked into print-on-demand as a fast alternative so we’d actually have shirts in hand for the weekend.

Here's the original T-shirt design with the colorful NorCal Best Cal bear graphic:

![Original Shirt](/assets/posts/original_shirt.jpg)

## NorCal Pride: The Orama Cup & "Best Cal" Backstory

The Orama Regional Cup brings together teams from different regions across the swing community for a high-energy team competition. 

As part of the NorCal crew, we wanted our shirts to represent our corner of the West Coast swing scene while celebrating SF Pride with vibrant rainbow colors. The "Nor Cal Best Cal" design brought that spirit together, featuring the California bear and the Golden Gate Bridge layered over rainbow stripes.

Setting up the print-on-demand store was surprisingly fun, and since the setup was already done, I ended up designing a few more dance ideas—like the switch-friendly shirts—and adding them in too.

<Grid cols={{ base: 2, md: 2 }} gap={4} marginY={6}>
  <img src="/assets/posts/mewearing_new_norcal_shirt.jpg" alt="Me wearing new NorCal shirt (black)" />
  <img src="/assets/posts/me_wearing_new_norcalshirt.jpg" alt="Me wearing new NorCal shirt (pink)" />
</Grid>

<notice type="affiliate" id="norcal-bestcal-tshirt" />

What started as a single "NorCal BestCal" tee quickly expanded. We added rainbow pride versions, cropped hoodies for those foggy San Francisco nights, and tanks for the summer workshop season.

<notice type="affiliate" id="norcal-pride-gate-shirt" />

## Evolution of Designs: Celebrating Every Dancer

As the community grew, so did our vision. We realized that WCS is more than just a location; it's a culture of inclusion and versatility. This led to the expansion of our "Lead, Follow, Switch" collection.

We wanted to move away from traditional gendered roles and celebrate the fact that many of us do it all on the floor. The neon "LOVE" series was designed to be bold, high-visibility, and role-positive.

<notice type="affiliate" id="love-neon-switch-shirt" />

From the intricate "War Eagle" back prints to the minimalist role checklists, every design is a conversation starter. We aim to create apparel that you don't just wear to the ballroom, but that you're proud to wear to the airport or the coffee shop.

## Check Out the Collection

And then I went on to create more BoomTick style merchandise like the slot era mug.

![Boomtick Merch](/assets/posts/booomtick_merch.jpg)

The store is a living project. We’re constantly adding new designs based on community feedback and the latest events. Whether you're a NorCal local, a dedicated switch dancer, or just someone who loves a good graphic tee, there’s something for you.

**[Browse the full collection on our Merch page](/merch)**

Support the community, represent your role, and we'll see you on the dance floor!
`,Te=Object.freeze(Object.defineProperty({__proto__:null,default:Se},Symbol.toStringTag,{value:"Module"})),Ce=`---
type: resource
title: "Loop Experience 2 Earplugs"
label: "Earplugs"
category: "Gear"
author: "Ariel Anders"
date: "2023-10-01"
price: "$35.00"
image: "/images/gear/sketches/loop-earplugs.jpg"
affiliateIds: ["loop-experience", "loop-quiet"]
affiliateProvider: "amazon"
featured: true
verdict: "Best High-Fidelity Earplugs for Social Dancers"
description: "Loop Experience 2 earplugs reduce noise by 17-18 decibels while keeping music clear and speech legible. Perfect for social dancing in loud ballrooms."
specs:
  "Attenuation": "17-18 dB SNR"
  "Acoustic Channel": "Flat-Frequency Response"
  "Ear Tip Sizes": "XS, S, M, L Included"
  "Weight": "0.1 oz (3 g)"
  "Carry Case": "Keychain-Mountable Hard Case"
---

## Hearing protection engineered for the dance floor

Convention ballrooms regularly operate at volume levels exceeding 95 to 100 dB. Over a four-day West Coast Swing event featuring late-night social dancing until 5:00 AM, exposed ears suffer permanent high-frequency fatigue. Standard foam earplugs muffle treble and bass unevenly, turning crisp acoustic guitar tracks and bass drops into muddy noise while making partner conversation nearly impossible.

Loop Experience 2 earplugs solve this problem with high-fidelity acoustic filtering. By combining a patented square acoustic channel with an engineered mesh membrane, they reduce overall volume by 17 to 18 decibels without distorting music tonal balance or cutting off voice frequencies.

### Loop Experience 1 vs. Loop Experience 2 improvements

The upgraded Experience 2 introduces meaningful ergonomic and acoustic refinements over the original first-generation model:

* **Redesigned acoustic channel:** A restructured internal sound nozzle provides flatter frequency attenuation, eliminating the high-end treble muffling present in generation one.
* **Refined nozzle geometry:** The nozzle angle and depth have been tweaked for a more natural seal inside smaller and narrower ear canals.
* **Softer silicone tip formulation:** The redesigned ear tips distribute pressure evenly across the ear canal walls, preventing soreness during extended wear.

### Dance floor comfort and stability

When leading or following dynamic whip combinations, triple spins, and sharp directional changes, earplug stability is paramount. In live dance testing, the Experience 2 demonstrated superior retention:

* **Spin and turn security:** The low-profile ring design nestles flush inside the outer ear concha, preventing centrifugal forces from dislodging the plug during multi-rotation spins.
* **Long-wear comfort:** At under 3 grams per earplug, the soft silicone tips eliminate cartillaginous pressure points. You can comfortably wear them continuously across 3- to 4-hour social dance sessions without needing to adjust them.
* **Sweat resistance:** Silicone materials resist moisture build-up during intense dance sets, retaining a consistent acoustic seal even on warm, crowded floors.

### Occlusion and conversation clarity

Traditional earplugs suffer from heavy bone-conduction occlusion—the booming internal echo you hear when speaking, breathing, or counting timing aloud.

While any ear canal seal generates minor occlusion, Loop Experience 2 minimizes this effect significantly. Partner chatter, floor calls, and verbal rhythm counting ("1, 2, 3 and 4...") sound natural rather than muffled underwater. You can effortlessly converse with partners on the dance floor between songs without removing your ear protection.

### Included accessories and customization

Every pair of Loop Experience 2 earplugs includes a comprehensive accessory package:

* **Four ear tip sizes (XS, S, M, L):** Allows dancers to customize left and right ear fits independently for an optimal seal.
* **Redesigned keychain carry case:** A compact, twist-lock hard capsule that attaches securely to your ballroom bag or house keys, ensuring protection is always within reach when stepping into the hall.
* **Loop Mute accessory compatibility:** Optional silicone insert rings can be snapped into the center loop to provide an additional 3 dB of noise attenuation for extraordinarily loud main-stage finals or live band performances.

### Technical specifications

| Feature | Specification |
| --- | --- |
| Noise Reduction Rating | 17–18 dB SNR (Flat Frequency Response) |
| Core Technology | Acoustic Channel & Mesh Filter Membrane |
| Ear Tip Material | Medical-Grade Hypoallergenic Silicone |
| Included Tip Sizes | Extra Small (XS), Small (S), Medium (M), Large (L) |
| Carrying Solution | Compact Twist-Lock Keychain Capsule |
| Optional Mute Insert | Adds +3 dB Additional Sound Reduction |

### Loop Quiet for rest and recovery

For sleeping at events in noisy convention hotels, consider the Loop Quiet version. They are made of soft silicone for comfort and provide even more decibel reduction to help you rest and recover.
`,Ae=Object.freeze(Object.defineProperty({__proto__:null,default:Ce},Symbol.toStringTag,{value:"Module"})),Pe=`---
type: resource
title: "Travel Steamer Pro"
date: "2023-11-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "Compact, efficient, and dual-voltage. Keep your competition shirts and skirts wrinkle-free on the road."
image: "/images/gear/sketches/travel-steamer.webp"
affiliateIds: ["portable-steamer"]
tags: ["competition"]
verdict: "Essential for Competitors"
updatedDate: "Nov 2023"
affiliateProvider: "amazon"
specs:
  "Heat-Up Time": "30 Seconds"
  "Voltage": "Dual-Voltage (110V - 240V)"
  "Tank Capacity": "120 ml (4.0 oz)"
  "Weight": "1.1 lbs (500 g)"
  "Continuous Steam": "8-10 Minutes"
---

## Competition ready, anywhere

Wrinkles ruin your competition outfits before you even step onto the floor. When you pull a tailored shirt or floor-length satin skirt out of a carry-on after six hours of travel, hotel irons present a terrifying risk: one wrong temperature setting can scorch delicate fabrics, melt synthetic mesh, or leave shiny press marks across dark cotton collars. A compact garment steamer eliminates those risks by relaxing fibers with safe, even heat.

For complete out-of-town event preparation, check out our [WCS competition travel checklist](/blog/2026-06-01-event-travel-packing) and browse our [full dance gear directory](/gear).

### Performance on delicate dance fabrics

Dance garments feature high-maintenance materials that rarely survive standard hotel iron soles. In testing across common West Coast Swing performance apparel, the steamer delivered consistent results:

* **Chiffon & Mesh:** Sheer sleeves and floating skirts smooth out almost instantly without water spotting or fiber heat distortion.
* **Satin & Silk Blends:** Relaxes heavy packing creases in flowy skirts without creating press shine or watermark stains.
* **Spandex & Synthetic Stretch:** Safely removes deep wrinkles from form-fitting tops and pants where direct metal contact risks melting elastic fibers.
* **Structured Cotton Collars:** Provides enough continuous steam flow to restore crispness to woven competition button-downs, keeping lines sharp under ballroom lighting.

### Packing and travel logistics

At just 1.1 pounds, the steamer adds minimal weight to carry-on luggage while taking up less space than a pair of dance shoes. Key logistical features include:

* **Dual-voltage compatibility:** Automatic 110V/240V switching allows global use at international swing events across Europe and Asia with only a plug adapter.
* **Spill-proof angle testing:** The internal baffle system prevents hot water spitting during horizontal touch-ups on flat surfaces or low hanging angles.
* **Tank capacity vs. weight:** The 120 ml reservoir yields 8 to 10 minutes of continuous steam—enough to press a full competition outfit (shirt, trousers, and vest or dress) on a single fill without adding bulk to your bag.

### Practical hotel hacks

When prepping in cramped hotel rooms between workshop tracks and prelims, efficiency is crucial:

1. **The bathroom door hook setup:** Hang your garment on a sturdy wooden hanger attached to the bathroom door hook. The vertical elevation gives you full 360-degree access to steam sleeves and skirts evenly.
2. **Post-shower humidity boost:** Hang tricky satin pieces inside the bathroom while taking a hot shower before applying direct steam. The ambient moisture softens deep creases, cutting your steaming time in half.
3. **Distilled water tip:** Use bottled water from hotel pantries in hard-water cities to prevent mineral buildup in the steam nozzle during long convention weekends.
`,We=Object.freeze(Object.defineProperty({__proto__:null,default:Pe},Symbol.toStringTag,{value:"Module"})),je=`---
type: resource
title: "Portable Bluetooth Speaker (UE Wonderboom 4)"
date: "2024-01-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Rugged, waterproof, and surprisingly loud. Perfect for hotel practice sessions or outdoor social gatherings."
image: "/images/gear/sketches/ue-wonderboom.webp"
affiliateIds: ["portable-speaker"]
tags: ["practice", "music", "travel"]
verdict: "Best for Travel"
updatedDate: "Jan 2024"
affiliateProvider: "amazon"
bestFor: ["Travel"]
---

## Practice Anywhere

The UE Wonderboom 4 is the gold standard for portable practice. It's loud enough for a small studio space and rugged enough to survive being tossed in a dance bag.
`,xe=Object.freeze(Object.defineProperty({__proto__:null,default:je},Symbol.toStringTag,{value:"Module"})),Be=`---
type: resource
title: "Alien Latex Mask"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Commit to the Galactic theme with a high-quality alien mask."
image: "/images/gear/sketches/alien-mask.webp"
affiliateIds: ["alien-mask"]
tags: ["costume", "galactic", "theme"]
verdict: "Thematic commitment"
bestFor: ["Theme Nights", "Galactic Open"]
affiliateProvider: "amazon"
---

## Out of This World

Take your Swingtacular outfit to the next level. (Pro tip: use for photos/grand entrances, as masks can be hot for social dancing).
`,Me=Object.freeze(Object.defineProperty({__proto__:null,default:Be},Symbol.toStringTag,{value:"Module"})),Ie=`---
type: resource
title: "Multi-Charging Cables (USB 3A Fast Charge)"
date: "2024-06-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "Fast-charging USB cables for keeping your devices powered during multi-day conventions."
image: "/images/gear/sketches/short-multi-charging-cable-3a-3pack-multiple-usb-fast-charger-cable-fo.webp"
affiliateIds: ["charging-cables"]
tags: ["travel", "electronics", "essentials"]
verdict: "Essential for travel"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
---

3-pack of fast-charging USB cables perfect for convention weekends. Having backups means you're never without power.
`,ze=Object.freeze(Object.defineProperty({__proto__:null,default:Ie},Symbol.toStringTag,{value:"Module"})),Oe=`---
type: resource
title: "Compression Packing Cubes"
date: "2024-06-01"
author: "Ariel Anders"
category: "Travel Gear"
excerpt: "Maximize luggage space and keep your dance outfits organized and wrinkle-free."
image: "/images/gear/sketches/compression-cubes.webp"
affiliateIds: ["compression-cubes"]
tags: ["travel", "organization", "packing"]
verdict: "Essential for air travel"
bestFor: ["Air Travel", "Organization"]
affiliateProvider: "amazon"
---

## Pack More, Stress Less

Compression cubes are a game-changer for dancers flying to events. They allow you to fit more outfits into a carry-on while keeping everything organized.
`,De=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"})),Fe=`---
type: resource
title: "Sports Crop Tank Tops"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Comfortable and stylish crop tops for dancing."
image: "/images/gear/sketches/porvike-3-pack-sports-crop-tank-tops-women-s-cotton-racerback-yoga-gym.webp"
affiliateIds: ["sports-crop-tops"]
tags: ["fashion", "clothing"]
verdict: "Best for social dancing"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Social dancing"]
---

Great for staying cool and comfortable on the dance floor.
`,He=Object.freeze(Object.defineProperty({__proto__:null,default:Fe},Symbol.toStringTag,{value:"Module"})),Ee=`---
type: resource
title: "Fishnet Lace Tights"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Six-pack of fishnet lace tights for elegant leg coverage and style."
image: "/images/gear/sketches/isadora-paccini-women-s-6-pack-fishnet-lace-pantyhose-tights-queen-bla.webp"
affiliateIds: ["fishnet-tights"]
tags: ["fashion", "footwear", "elegance"]
verdict: "Best for elegance"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Elegance"]
---

Quality fishnet tights that complement both casual and formal dancewear. Durable and affordable when buying in bulk.
`,Re=Object.freeze(Object.defineProperty({__proto__:null,default:Ee},Symbol.toStringTag,{value:"Module"})),Ne=`---
type: resource
title: "High-Density Foam Roller"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "A high-density solid foam roller that is excellent for post-dance muscle recovery at home or local socials."
image: "/images/gear/sketches/foam-roller.webp"
affiliateIds: ["foam-roller"]
tags: ["recovery", "health", "fitness"]
verdict: "Essential for recovery"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Post-event", "Home Recovery"]
---

## Deep Tissue Recovery

Don't let muscle tightness ruin your weekly routine. While this solid-core foam roller is not hollow and is less convenient for packing in flight luggage, it is a high-density recovery essential to use at home or after your local weekly social dances to relieve sore calves, quads, and back muscles.
`,Ge=Object.freeze(Object.defineProperty({__proto__:null,default:Ne},Symbol.toStringTag,{value:"Module"})),Le=`---
type: resource
title: "Green Full-Body Spandex Suit"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "The ultimate 'Dress to Impress' base for Galactic-themed events."
image: "/images/gear/sketches/green-bodysuit.webp"
affiliateIds: ["green-bodysuit"]
tags: ["costume", "galactic", "theme"]
verdict: "Galactic Essential"
bestFor: ["Dress to Impress Night", "Alien Themes"]
affiliateProvider: "amazon"
---

## Alien Aesthetic

A breathable, full-body spandex suit is the perfect foundation for an alien look at Swingtacular.
`,Ue=Object.freeze(Object.defineProperty({__proto__:null,default:Le},Symbol.toStringTag,{value:"Module"})),Je=`---
type: resource
title: "Light Up Suspenders"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Battery-operated LED light up suspenders to glow on the social dance floor."
image: "/images/gear/sketches/glow_suspenders.webp"
affiliateIds: ["light-up-suspenders"]
tags: ["costume", "glow", "theme"]
verdict: "Perfect for Glow theme nights"
bestFor: ["Glow Parties", "Theme Nights"]
affiliateProvider: "amazon"
---

## Light Up the Night

Stand out on the dance floor with these battery-operated LED light up suspenders. They feature multiple flashing modes and are a fun addition to any glow-themed dance event.
`,qe=Object.freeze(Object.defineProperty({__proto__:null,default:Je},Symbol.toStringTag,{value:"Module"})),Ye=`---
type: resource
title: "LOVE neon tshirt - ask me to follow"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Express your style and your role on the floor with this neon-inspired follow shirt."
image: "/assets/gear/love-neon-tshirt-ask-me-to-follow-front.webp"
imageBack: "/assets/gear/love-neon-tshirt-ask-me-to-follow-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Stylish & Social"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-follow
displayMode: "pair"
featuredSide: "back"
internalSku: love-neon-follow
fulfillmentType: "print-on-demand"
provider: "printful"
---

The LOVE neon tshirt is part of the NorCal BestCal collection, designed for dancers who want to make a statement. This version is perfect for followers who want to clearly communicate their role while sporting a vibrant, Pride-inspired aesthetic.
`,Ve=Object.freeze(Object.defineProperty({__proto__:null,default:Ye},Symbol.toStringTag,{value:"Module"})),Ke=`---
type: resource
title: "Love neon tshirt - ask me to lead"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Express your style and your role on the floor with this neon-inspired lead shirt."
image: "/assets/gear/love-neon-tshirt-ask-me-to-lead-front.webp"
imageBack: "/assets/gear/love-neon-tshirt-ask-me-to-lead-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Stylish & Social"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/love-neon-tshirt-ask-me-to-lead
displayMode: "pair"
featuredSide: "back"
internalSku: love-neon-lead
fulfillmentType: "print-on-demand"
provider: "printful"
---

The LOVE neon tshirt is part of the NorCal BestCal collection, designed for dancers who want to make a statement. This version is perfect for leaders who want to clearly communicate their role while sporting a vibrant, Pride-inspired aesthetic.
`,$e=Object.freeze(Object.defineProperty({__proto__:null,default:Ke},Symbol.toStringTag,{value:"Module"})),Qe=`---
type: resource
title: "Lead follow or switch LOVE shirt in Neon"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Show your versatility on the dance floor with this neon 'Lead, Follow, or Switch' LOVE shirt."
image: "/assets/gear/lead-follow-or-switch-love-shirt-in-neon-front.webp"
imageBack: "/assets/gear/lead-follow-or-switch-love-shirt-in-neon-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Versatile & Vibrant"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/lead-follow-or-switch-love-shirt-in-neon
displayMode: "pair"
featuredSide: "back"
internalSku: lead-follow-switch-love-neon
fulfillmentType: "print-on-demand"
provider: "printful"
---

Perfect for the multi-role dancer, this neon shirt expresses the inclusive spirit of West Coast Swing.
`,Xe=Object.freeze(Object.defineProperty({__proto__:null,default:Qe},Symbol.toStringTag,{value:"Module"})),Ze=`---
type: resource
title: "LOVE Lead Follow or Switch Unisex shirt"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Unisex 'Lead, Follow, or Switch' LOVE shirt."
image: "/assets/gear/unisex-t-shirt-front.webp"
imageBack: "/assets/gear/unisex-t-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Classic & Inclusive"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/unisex-t-shirt
displayMode: "pair"
featuredSide: "back"
internalSku: love-lead-follow-switch-unisex
fulfillmentType: "print-on-demand"
provider: "printful"
---

A classic unisex fit for everyone in the community who loves to do it all on the floor.
`,et=Object.freeze(Object.defineProperty({__proto__:null,default:Ze},Symbol.toStringTag,{value:"Module"})),tt=`---
type: resource
title: "Mesh Fishnet Top"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Sheer mesh fishnet top for layering and statement styling on the dance floor."
image: "/images/gear/sketches/mesh-fishnet-top.webp"
affiliateIds: ["mesh-fishnet-top"]
tags: ["fashion", "style", "layering"]
verdict: "Best for layering"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Layering"]
---

Versatile mesh fishnet top that works over dance tanks or as a statement piece for social dancing.
`,nt=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"})),ot=`---
type: resource
title: "Nerd Hat, Socks, Bowtie & Suspenders Set"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "A complete nerd accessory kit featuring a nerdy hat, socks, bowtie, and suspenders for Nerd Night."
image: "/images/gear/sketches/suspenders.webp"
affiliateIds: ["nerd-set"]
tags: ["costume", "nerd-night", "theme"]
verdict: "Nerd Night essential"
bestFor: ["Nerd Night", "Themed Events"]
affiliateProvider: "amazon"
---

## Nerd Night Ready

This complete nerd costume accessory kit comes with a nerdy hat, socks, bowtie, and suspenders—everything you need to stand out on Nerd Night.
`,at=Object.freeze(Object.defineProperty({__proto__:null,default:ot},Symbol.toStringTag,{value:"Module"})),rt=`---
type: resource
title: "Men's Bear Tank Nor Cal Best Cal"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Comfortable men's tank top with the NorCal Best Cal bear design."
image: "/assets/gear/norcal-bear-tank-front.webp"
imageBack: "/assets/gear/norcal-bear-tank-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Cool & Casual"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/mens-bear-tank-nor-cal-best-cal
internalSku: mens-bear-tank-norcal
fulfillmentType: "print-on-demand"
provider: "printful"
---

Stay cool in the SoCal heat with this NorCal Best Cal bear tank top, a social dancing essential.
`,it=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"})),st=`---
type: resource
title: "NorCal BestCal"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "The original NorCal BestCal t-shirt."
image: "/assets/gear/norcal-bestcal-front.webp"
imageBack: "/assets/gear/norcal-bestcal-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Essential Merch"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/norcal-bestcal
internalSku: norcal-bestcal-classic
fulfillmentType: "print-on-demand"
provider: "printful"
---

The core piece of the NorCal BestCal collection. Simple, bold, and indispensable for Team NorCal.
`,lt=Object.freeze(Object.defineProperty({__proto__:null,default:st},Symbol.toStringTag,{value:"Module"})),ct=`---
type: resource
title: "NorCal Best Cal Cropped top"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Stylish cropped top for NorCal dancers."
image: "/assets/gear/norcal-crop-top-front.webp"
imageBack: "/assets/gear/norcal-crop-top-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Trendy & Airy"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/norcal-best-cal-cropped-top
internalSku: norcal-bestcal-cropped-top
fulfillmentType: "print-on-demand"
provider: "printful"
---

A stylish crop top designed for movement and regional pride.
`,dt=Object.freeze(Object.defineProperty({__proto__:null,default:ct},Symbol.toStringTag,{value:"Module"})),ht=`---
type: resource
title: "NorCal BestCal Golden Gate Crop Hoodie"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Cozy crop hoodie with the Golden Gate bridge design."
image: "/assets/gear/norcal-gate-crop-hoodie.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Cozy & Regional"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/norcal-bestcal-golden-gate-crop-hoodie
internalSku: norcal-bestcal-golden-gate-hoodie
fulfillmentType: "print-on-demand"
provider: "printful"
---

The perfect layer for those early morning workshops or chilly ballroom social sets.
`,ut=Object.freeze(Object.defineProperty({__proto__:null,default:ht},Symbol.toStringTag,{value:"Module"})),gt=`---
type: resource
title: "NorCal Best Cal Pride California Bear Apparel"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "The iconic California bear, redesigned with Pride colors for the West Coast Swing community."
image: "/assets/gear/norcal-best-cal-pride-california-bear-apparel-front.webp"
imageBack: "/assets/gear/norcal-best-cal-pride-california-bear-apparel-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "California Classic"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/norcal-best-cal-pride-california-bear-apparel
internalSku: norcal-bestcal-pride-bear
fulfillmentType: "print-on-demand"
provider: "printful"
---

The NorCal Best Cal Pride California Bear shirt combines the state's iconic symbol with the rainbow flag. High-quality fabric and a comfortable fit make it perfect for long workshop days and late-night social dancing.
`,pt=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"})),mt=`---
type: resource
title: "NorCal BestCal Golden Gate Rainbow Pride Shirt"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Classic Golden Gate bridge design with a vibrant rainbow twist for NorCal dancers."
image: "/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp"
imageBack: "/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Regional Pride"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/norcal-bestcal-golden-gate-rainbow-pride-shirt
internalSku: norcal-bestcal-golden-gate-pride
fulfillmentType: "print-on-demand"
provider: "printful"
---

Celebrate your Northern California roots and Pride month with this custom Golden Gate bridge design. It's a favorite for Team NorCal BestCal members at flagship events like Jack & Jill O'Rama.
`,ft=Object.freeze(Object.defineProperty({__proto__:null,default:mt},Symbol.toStringTag,{value:"Module"})),yt=`---
type: resource
draft: true
title: "Anker Portable Power Bank"
date: "2024-06-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "High-capacity charger to keep your phone alive during long event days."
image: "/images/gear/amazon/anker-20000mah-power-bank.jpg"
affiliateIds: ["portable-charger"]
tags: ["travel", "electronics"]
verdict: "Essential for travel"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
---

Don't let your phone die during workshops.
`,bt=Object.freeze(Object.defineProperty({__proto__:null,default:yt},Symbol.toStringTag,{value:"Module"})),vt=`---
type: resource
title: "Halloween Pumpkin Headbands"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Cute pumpkin headbands for themed social dancing without sacrificing movement."
image: "/images/gear/sketches/pumpkin-headbands.webp"
affiliateIds: ["pumpkin-headbands"]
tags: ["fashion", "halloween", "accessories"]
verdict: "Best for theming"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Theming"]
---

Perfect for Halloween-themed social dances. Lightweight and won't interfere with dancing.
`,wt=Object.freeze(Object.defineProperty({__proto__:null,default:vt},Symbol.toStringTag,{value:"Module"})),kt=`---
type: resource
title: "Halloween Adhesive Felt Stickers"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Adhesive felt pumpkin stickers for easy costume assembly."
image: "/images/gear/sketches/pumpkin-stickers.webp"
affiliateIds: ["pumpkin-stickers"]
tags: ["fashion", "halloween", "diy"]
verdict: "Best for easy DIY"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Easy DIY"]
---

Adhesive felt jack-o'-lantern face stickers. These are easier than cutting felt by hand, and you can test the layout before committing.
`,_t=Object.freeze(Object.defineProperty({__proto__:null,default:kt},Symbol.toStringTag,{value:"Module"})),St=`---
type: resource
title: "Large Rave Folding Fan"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Stay cool while adding a touch of flair to your performance."
image: "/images/gear/sketches/zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine.webp"
affiliateIds: ["rave-fan"]
tags: ["fashion", "accessory"]
verdict: "Best for staying cool"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Staying cool"]
---

A must-have for the social dance floor.
`,Tt=Object.freeze(Object.defineProperty({__proto__:null,default:St},Symbol.toStringTag,{value:"Module"})),Ct=`---
type: resource
title: "Reflective Crop Tops"
date: "2024-06-01"
author: "Ariel Anders"
category: "Fashion"
excerpt: "Reflective casual crop tops for visibility and style on and off the dance floor."
image: "/images/gear/sketches/floerns-women-s-casual-reflective-short-sleeve-round-neck-crop-tops-t.webp"
affiliateIds: ["reflective-crop-tops"]
tags: ["fashion", "visibility"]
verdict: "Great for visibility"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
---

Comfortable reflective crop tops perfect for social dancing and visibility during evening events.
`,At=Object.freeze(Object.defineProperty({__proto__:null,default:Ct},Symbol.toStringTag,{value:"Module"})),Pt=`---
type: resource
title: "Slim Fanny Pack"
date: "2024-06-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "Ultra-light bounce-free waist perfect for outdoor dancing at Lindy in the Park."
image: "/images/gear/sketches/fanny-pack.webp"
affiliateIds: ["running-belt"]
tags: ["travel", "packing", "storage"]
verdict: "Best for carry-on"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Carry-on"]
---

Discreet waist belt that holds essentials without the bounce. Essentially a low-profile fanny pack, it's particularly great for social dancing and high-energy styles like Lindy Hop, allowing you to carry your ID, cash, or phone safely without it getting in the way.
`,Wt=Object.freeze(Object.defineProperty({__proto__:null,default:Pt},Symbol.toStringTag,{value:"Module"})),jt=`---
type: resource
title: "Electric Shoe Dryer and Deodorizer"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Fast shoe dryer-- the best way to handle stinky shoes."
image: "/images/gear/sketches/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.webp"
affiliateIds: ["shoe-dryer"]
tags: ["gear", "shoes", "maintenance"]
verdict: "Essential maintenance"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
---

Keeps your dance shoes dry and fresh between events. The timer makes it perfect for overnight drying without damage.
`,xt=Object.freeze(Object.defineProperty({__proto__:null,default:jt},Symbol.toStringTag,{value:"Module"})),Bt=`---
type: resource
title: "Coppertone Glow Shimmering Sunscreen Spray SPF 50, 5 OZ"
date: "2024-06-01"
author: "Ariel Anders"
category: "Self Care"
excerpt: "Stay protected during outdoor social events and pool parties with this shimmering sunscreen spray."
image: ""
affiliateIds: ["sunscreen"]
tags: ["safety", "outdoor", "pool"]
verdict: "Summer Essential"
bestFor: ["Pool Parties", "Outdoor Events"]
affiliateProvider: "amazon"
---

## Sun Protection

Essential for events with outdoor components or pool parties.
`,Mt=Object.freeze(Object.defineProperty({__proto__:null,default:Bt},Symbol.toStringTag,{value:"Module"})),It=`---
type: resource
title: "Silicone Travel Bottles"
date: "2024-06-01"
author: "Ariel Anders"
category: "Travel"
excerpt: "Leak-proof refillable containers for TSA-approved liquids."
image: "/images/gear/sketches/leak-proof-refillable-silicone-travel-bottles-3oz-travel-size-containe.webp"
affiliateIds: ["travel-bottles"]
tags: ["travel", "packing"]
verdict: "Best for carry-on"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Carry-on"]
---

Perfect for shampoo, conditioner, and body wash.
`,zt=Object.freeze(Object.defineProperty({__proto__:null,default:It},Symbol.toStringTag,{value:"Module"})),Ot=`---
type: resource
title: "Compact Travel Tripod"
date: "2024-06-01"
author: "Ariel Anders"
category: "Tech Gear"
excerpt: "Perfect for filming your competition heats and practice sessions."
image: ""
affiliateIds: ["tripod"]
tags: ["tech", "video", "practice"]
verdict: "Essential for self-review"
bestFor: ["Competition Video", "Practice Sessions"]
affiliateProvider: "amazon"
---

## Capture Every Moment

A tripod is a dancer's best friend for improvement. Whether you're filming your Jack & Jill heats or a hotel room practice session, having a stable shot is key. This compact travel tripod fits easily in a dance bag and sets up in seconds.
`,Dt=Object.freeze(Object.defineProperty({__proto__:null,default:Ot},Symbol.toStringTag,{value:"Module"})),Ft=`---
type: resource
title: "Sport Visor / Sun Hat"
date: "2024-06-01"
author: "Ariel Anders"
category: "Dance Gear"
excerpt: "Keep the sun out of your eyes during daytime outdoor sets."
image: "/images/gear/sketches/visor.webp"
affiliateIds: ["visor"]
tags: ["outdoor", "summer"]
verdict: "Outdoor Essential"
bestFor: ["Pool Parties", "Outdoor Events"]
affiliateProvider: "amazon"
---

## Stay Cool and Shaded

A lightweight visor is perfect for outdoor dancing.
`,Ht=Object.freeze(Object.defineProperty({__proto__:null,default:Ft},Symbol.toStringTag,{value:"Module"})),Et=`---
type: resource
title: "War Eagle oversized high neck t-shirt"
date: "2024-06-01"
author: "Ariel Anders"
category: "fashion"
excerpt: "Oversized high-neck t-shirt featuring the War Eagle design."
image: "/assets/gear/war-eagle-oversized-high-neck-t-shirt-front.webp"
imageBack: "/assets/gear/war-eagle-oversized-high-neck-t-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Oversized & Comfortable"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/product/war-eagle-oversized-high-neck-t-shirt
displayMode: "pair"
featuredSide: "back"
internalSku: war-eagle-oversized
fulfillmentType: "print-on-demand"
provider: "printful"
---

The War Eagle oversized t-shirt offers a modern high-neck silhouette and maximum comfort for long dance weekends.
`,Rt=Object.freeze(Object.defineProperty({__proto__:null,default:Et},Symbol.toStringTag,{value:"Module"})),Nt=`---
type: resource
title: "Adhesive Suede Sheets for DIY Dance Shoes"
date: '2026-04-12'
author: Ariel Anders
category: Dance Gear
excerpt: "Recommended materials for converting your favorite sneakers into high-performance dance shoes."
image: /images/gear/amazon/suede-stick-on-sheets.jpg
affiliateIds:
- suede-sheets
tags:
- footwear
- shoes
- diy
- dance
updatedDate: Mar 2024
affiliateProvider: amazon
---

## Recommended Materials

If you are looking to convert your own shoes for ballroom or social dancing, these are the specific adhesive suede sheets I use and recommend.

### Product Overview

- **Material:** Industrial-strength adhesive-backed suede.
- **Purpose:** Creates a consistent "grip and glide" surface on rubber-soled shoes.
- **Durability:** Convention-tested for 8+ hour social sets.

## Looking for the full tutorial?

For detailed step-by-step instructions, coverage analysis, and maintenance tips, read my authoritative guide:

→ **[Make Any Shoe a Dance Shoe](/blog/2026-04-18-make-shoe-dance)**

This guide covers:
- Surface preparation
- Cutting patterns
- Full-coverage vs. ball-only placement
- Long-term maintenance
- Convention-tested durability

### Maintenance Supplies

To keep your suede soles in top condition, I also recommend:
- **[Dance shoe suede sole brush](/gear/2026-04-12-suede-shoe-diy):** Essential for restoring the nap after the suede becomes compressed.
- **Shoe Goo:** Useful for repairing minor edge peeling over time.

Explore our full [curated West Coast Swing gear catalog](/gear) for additional footwear care and dance travel items.

_Affiliate disclosure: Links in this guide may earn a commission at no cost to you._
`,Gt=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"})),Lt=`---
type: resource
title: "Stick-on Mirrors for Home Studios"
date: '2026-06-20'
author: Ariel Anders
category: Dance Gear
excerpt: "Renter-friendly, shatterproof mirror panels perfect for building a West Coast Swing home practice space."
image: /images/gear/sketches/stick-on-mirrors.jpeg
affiliateIds:
- stick-on-mirrors
tags:
- practice
- home studio
- diy
updatedDate: Jun 2026
affiliateProvider: amazon
---

## Product Overview

If you are building a home practice space for West Coast Swing, these renter-friendly mirror panels are the perfect solution for checking your basics and styling.

![Product Overview](/images/gear/sketches/stick-on-mirrors.jpeg)

### Key Features
- **Shatterproof Material:** Made from durable, flexible acrylic that won't break if bumped.
- **Renter-Friendly:** Requires zero drilling or heavy lifting. The adhesive backing mounts safely to compatible surfaces.
- **Versatile:** Great for practice spaces, home gyms, or anywhere you need visual feedback.

![Acrylic Material](/assets/blog/wcs-practice-space-mirrors-acrylic.jpg)

### Installation Guide

These mirror panels can be safely applied to smooth surfaces such as flat marble, smooth tile, glass, flat board, or flat metal. Avoid installing on uneven walls, loose paint, wallpaper, or rough cement, as the adhesive may not stick correctly or could damage fragile surfaces upon removal.

![Applicable Surfaces](/assets/blog/wcs-practice-space-mirrors-surfaces.jpg)
`,Ut=Object.freeze(Object.defineProperty({__proto__:null,default:Lt},Symbol.toStringTag,{value:"Module"})),Jt=`---
type: resource
title: "Magene H64 Heart Rate Monitor"
label: "Heart Rate Monitor"
category: "Gear"
author: "Ariel Anders"
date: "2026-11-04"
affiliateIds: ["magene-h64"]
affiliateProvider: "amazon"
tags: ["health", "practice"]
image: "/images/gear/amazon/magene-h64-heart-rate-monitor.jpg"
verdict: "Affordable Chest-Strap Heart Rate Monitor"
description: "Magene H64 chest-strap heart rate monitor with Bluetooth and ANT+. Speaks the standard Bluetooth Heart Rate Profile, so it pairs with the HRM dashboard and any compliant app."
specs:
  "Type": "Chest strap"
  "Connectivity": "Bluetooth + ANT+"
---

## The strap behind the HRM dashboard

The [HRM dashboard](https://arii.github.io/hrm/) connects to any monitor speaking the standard Bluetooth Heart Rate Profile (GATT \`0x180D\`). The Magene H64 is the one I use — a chest strap, so it reads the heart's electrical signal directly and holds steady through an entire workout.

It pairs over Bluetooth with a phone or browser, and over ANT+ with bike computers and gym equipment.
`,qt=Object.freeze(Object.defineProperty({__proto__:null,default:Jt},Symbol.toStringTag,{value:"Module"})),Yt=`---
type: resource
id: "relavel-travel-bag"
title: "Relavel Travel Hanging Toiletry Bag"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "Travel"
excerpt: "An absolute must-have travel bag for dance conventions. Waterproof, spacious, and hangs in hotel bathrooms for instant organization."
image: "/images/gear/sketches/relavel-travel-bag.webp"
url: "https://www.amazon.com/dp/B07TBCXCJH?tag=onasafari0a-20"
affiliateIds: ["relavel-travel-bag"]
tags: ["travel", "packing", "organization", "toiletry"]
verdict: "Essential for Travel"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
featured: false
---

An absolute MUST-HAVE travel bag. The Relavel Travel Hanging Toiletry Bag is an essential item for anyone who travels frequently. It's waterproof, spacious, and features multiple compartments to keep your makeup and shaving gear organized. Hang it in the bathroom for easy access to all your toiletries.
`,Vt=Object.freeze(Object.defineProperty({__proto__:null,default:Yt},Symbol.toStringTag,{value:"Module"})),Kt=`---
type: resource
id: "slot-era-mug"
title: "Slot Era Black Ceramic Mug"
category: "Accessories"
badge: "Merch"
price: "$16.50"
image: "/assets/slot_era_mug.webp"
shopUrl: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-mug"
author: "Ariel Anders"
date: "2024-06-01"
tags: ["merch", "slot-era", "accessories", "mug"]
featured: false
excerpt: "11oz black ceramic coffee mug featuring the colorful Slot Era BoomTick branding. A funny gift for WCS dancers for birthdays and holidays to power your dance event mornings and late-night competition reviews."
description: "11oz black ceramic coffee mug featuring the colorful Slot Era BoomTick branding. A funny gift for WCS dancers for birthdays and holidays to power your dance event mornings and late-night competition reviews."
---

Dishwasher and microwave safe black ceramic mug to power your dance event mornings and late-night competition reviews.

## Highlights & Features
- **High-Gloss Ceramic**: Premium glossy black ceramic finish with scratch-resistant rainbow Slot Era graphic print.
- **Microwave & Dishwasher Safe**: Durable build safe for daily dishwashers and microwave heating.
- **Comfortable C-Handle**: Ergonomic handle designed for a sturdy, comfortable grip.

`,$t=Object.freeze(Object.defineProperty({__proto__:null,default:Kt},Symbol.toStringTag,{value:"Module"})),Qt=`---
type: resource
id: "slot-era-tank-top"
title: "Slot Era WCS Women's Racerback Tank Top"
category: "Apparel"
badge: "Merch"
price: "$16.50"
image: "/assets/slot_era_racerback.webp"
shopUrl: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-womens-fitted-racerback-tank-top"
author: "Ariel Anders"
date: "2024-06-01"
tags: ["merch", "slot-era", "apparel", "dance"]
featured: true
excerpt: "Fitted racerback tank top featuring the vibrant retro Slot Era design and BoomTick branding. A funny gift for WCS dancers for birthdays, holidays, and summer events."
description: "Fitted racerback tank top featuring the vibrant retro Slot Era design and BoomTick branding. A funny gift for WCS dancers for birthdays, holidays, and summer events."
---

Features soft, breathable fabric and a flattering racerback cut built for long social dancing nights and intense workshop weekends. 

## Why You'll Love It
- **Dance-Floor Ready**: Lightweight, breathable blend (60% combed ring-spun cotton, 40% polyester) keeps you cool during high-energy sets.
- **Racerback Cut**: Provides full range of shoulder and arm movement for turns, spins, and expressive styling.
- **Signature Slot Era Artwork**: High-definition print that stays vibrant through countless wash and dance cycles.
- **Direct Fulfillment**: Printed on demand and shipped directly to your door by Printful.

`,Xt=Object.freeze(Object.defineProperty({__proto__:null,default:Qt},Symbol.toStringTag,{value:"Module"})),Zt=`---
type: resource
id: "slot-era-tote-bag"
title: "Slot Era WCS Tote Bag - Canvas West Coast Swing Dance Bag, Black 15x15"
category: "Accessories"
badge: "Merch"
price: "$27.00"
image: "/assets/slot_era_tote.webp"
shopUrl: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-tote-bag"
author: "Ariel Anders"
date: "2024-06-01"
tags: ["merch", "slot-era", "accessories", "tote"]
featured: true
excerpt: "Show off your West Coast Swing pride with this durable 15\\" x 15\\" black canvas tote bag, featuring the signature Slot Era dancer graphic and BoomTick branding. Made from 100% spun polyester canvas, it's sturdy enough for dance shoes, water bottles, and convention gear — perfect for WCS dancers heading to socials, workshops, or weekend dance events. Makes a funny gift for WCS dancers for birthdays or holidays."
description: "Show off your West Coast Swing pride with this durable 15\\" x 15\\" black canvas tote bag, featuring the signature Slot Era dancer graphic and BoomTick branding. Made from 100% spun polyester canvas, it's sturdy enough for dance shoes, water bottles, and convention gear — perfect for WCS dancers heading to socials, workshops, or weekend dance events. Makes a funny gift for WCS dancers for birthdays or holidays."
---

Spacious and durable spun polyester canvas tote designed to carry dance shoes, shoe brushes, water bottles, and event essentials between workshop ballrooms.

## Highlights & Features
- **Heavy-Duty Construction**: 100% spun polyester canvas with reinforced stitching holds up to dance shoes, extra shirts, and electronics.
- **Spacious 15" x 15" Capacity**: Large enough for multiple pairs of dance shoes plus toiletries and personal accessories.
- **Dual Handles**: Comfortable black cotton webbing handles for shoulder or hand carry.

`,en=Object.freeze(Object.defineProperty({__proto__:null,default:Zt},Symbol.toStringTag,{value:"Module"})),w={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":z,"/content/posts/2026-04-18-financial-literacy-dancers.md":D,"/content/posts/2026-04-18-github-actions.md":H,"/content/posts/2026-04-18-halloween-costumes.md":R,"/content/posts/2026-04-18-make-shoe-dance.md":G,"/content/posts/2026-04-18-why-finals-are-hard.md":U,"/content/posts/2026-04-19-practical-tools-essentials.md":q,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":V,"/content/posts/2026-06-01-event-travel-packing.md":$,"/content/posts/2026-06-01-general-health-home-care.md":X,"/content/posts/2026-06-01-outdoor-dancing.md":ee,"/content/posts/2026-06-01-power-charging.md":ne,"/content/posts/2026-06-01-practice-review-tech.md":ae,"/content/posts/2026-06-01-practice-social-dance-apparel.md":ie,"/content/posts/2026-06-01-shoe-care-modification.md":le,"/content/posts/2026-06-01-theme-wear-costumes-accessories.md":de,"/content/posts/2026-06-01-wcs-essentials.md":ue,"/content/posts/2026-06-15-ultimate-wcs-event-survival-guide.md":pe,"/content/posts/2026-06-16-wsdc-points-tier-calculation.md":fe,"/content/posts/2026-06-20-ultimate-wcs-home-practice-space.md":be,"/content/posts/2026-10-22-my-favorite-credit-cards-for-hyatt-hosted-west-coast-swing-events.md":we,"/content/posts/2026-11-04-the-heart-rate-monitor-behind-my-remote-workouts.md":_e}),blogs:Object.assign({"/content/blog/2026-06-14-the-story-behind-the-merch-page.md":Te}),resources:Object.assign({"/content/resources/2023-10-01-loop-earplugs.md":Ae,"/content/resources/2023-11-01-travel-steamer.md":We,"/content/resources/2024-01-01-portable-speaker.md":xe,"/content/resources/2024-06-01-alien-mask.md":Me,"/content/resources/2024-06-01-charging-cables.md":ze,"/content/resources/2024-06-01-compression-cubes.md":De,"/content/resources/2024-06-01-crop-tops.md":He,"/content/resources/2024-06-01-fishnet-tights.md":Re,"/content/resources/2024-06-01-foam-roller.md":Ge,"/content/resources/2024-06-01-green-bodysuit.md":Ue,"/content/resources/2024-06-01-light-up-suspenders.md":qe,"/content/resources/2024-06-01-love-neon-follow-shirt.md":Ve,"/content/resources/2024-06-01-love-neon-lead-shirt.md":$e,"/content/resources/2024-06-01-love-neon-switch-shirt.md":Xe,"/content/resources/2024-06-01-love-unisex-shirt.md":et,"/content/resources/2024-06-01-mesh-fishnet-top.md":nt,"/content/resources/2024-06-01-nerd-set.md":at,"/content/resources/2024-06-01-norcal-bear-tank.md":it,"/content/resources/2024-06-01-norcal-bestcal-tshirt.md":lt,"/content/resources/2024-06-01-norcal-crop-top.md":dt,"/content/resources/2024-06-01-norcal-gate-crop-hoodie.md":ut,"/content/resources/2024-06-01-norcal-pride-bear-shirt.md":pt,"/content/resources/2024-06-01-norcal-pride-gate-shirt.md":ft,"/content/resources/2024-06-01-portable-charger.md":bt,"/content/resources/2024-06-01-pumpkin-headbands.md":wt,"/content/resources/2024-06-01-pumpkin-stickers.md":_t,"/content/resources/2024-06-01-rave-fan.md":Tt,"/content/resources/2024-06-01-reflective-crop-tops.md":At,"/content/resources/2024-06-01-running-belt.md":Wt,"/content/resources/2024-06-01-shoe-dryer.md":xt,"/content/resources/2024-06-01-sunscreen.md":Mt,"/content/resources/2024-06-01-travel-bottles.md":zt,"/content/resources/2024-06-01-tripod.md":Dt,"/content/resources/2024-06-01-visor.md":Ht,"/content/resources/2024-06-01-war-eagle-shirt.md":Rt,"/content/resources/2026-04-12-suede-shoe-diy.md":Gt,"/content/resources/2026-06-20-stick-on-mirrors.md":Ut,"/content/resources/2026-11-04-magene-h64-heart-rate-monitor.md":qt,"/content/resources/relavel-travel-bag.md":Vt,"/content/resources/slot-era-mug.md":$t,"/content/resources/slot-era-tank-top.md":Xt,"/content/resources/slot-era-tote-bag.md":en})},tn=e=>e.split("/").pop()?.replace(".md","")||"";function A(e,a){const d=n=>Array.isArray(n)?n:[];return Object.entries(e).map(([n,r])=>{const h=typeof r=="string"?r:r.default,{data:t,content:s}=x(h),y=t.type||a;return t.image=C(t.image),t.imageBack=C(t.imageBack),{...t,type:y,title:String(t.title||"Untitled"),category:String(t.category||"General"),excerpt:String(t.excerpt||t.description||""),date:String(t.date||""),author:String(t.author||"Ariel Anders").replace(/,?\s*PhD/i,"").trim(),tags:d(t.tags),affiliateIds:d(t.affiliateIds),seoTitle:t.seoTitle?String(t.seoTitle):void 0,seoDescription:t.seoDescription?String(t.seoDescription):void 0,imageAlt:t.imageAlt?String(t.imageAlt):void 0,imageFit:t.imageFit==="cover"||t.imageFit==="contain"?t.imageFit:void 0,imagePosition:t.imagePosition==="top"||t.imagePosition==="bottom"||t.imagePosition==="center"?t.imagePosition:void 0,unlisted:!!t.unlisted,status:B(t.status),readTime:M(t.readTime),content:s||"",slug:tn(n)}}).filter(n=>!(typeof n=="object"&&n!==null&&"unlisted"in n&&n.unlisted===!0||typeof n=="object"&&n!==null&&"draft"in n&&n.draft===!0)).sort((n,r)=>{const h=n.date?new Date(n.date).getTime():0,t=r.date?new Date(r.date).getTime():0,s=Number.isNaN(h)?0:h;return(Number.isNaN(t)?0:t)-s})}let k=null,_=null;function S(){return k||(k={posts:A({...w.posts,...w.blogs},"post"),resources:A(w.resources,"resource")}),k}function P(){if(!_){const e=S();_={posts:new Map(e.posts.map(a=>[a.slug,a])),resources:new Map(e.resources.map(a=>[a.slug,a]))}}return _}const an=()=>S().posts,rn=e=>P().posts.get(e),sn=()=>S().resources,ln=e=>P().resources.get(e);export{rn as a,sn as b,ln as c,an as g,C as n,on as r};
