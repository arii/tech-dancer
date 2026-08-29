import{bX as f}from"./vendor-BLdctGUO.js";import{A as u}from"./index-BbMC8Q-I.js";const y=`---
type: post
draft: true
status: draft
title: "Coming Soon: WCS Competition Data Scraper"
date: "2026-04-18"
author: "Ariel Anders, PhD"
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

I am excited to announce the development of the **WCS Competition Data Scraper**, a tool designed to make competition results easier to understand.

### Core Philosophy

The goal of this project isn't to rank dancers, but to provide tools for self-improvement and to understand how competition scoring works.

- **Anonymous data collection:** The tool focuses on trends and overall patterns. No individual dancer names are stored in our public datasets.
- **Respectful approach:** We only use public competition data that has already been published. Our tool is built to be a good citizen of the web.
- **Privacy focus:** All raw data is processed securely and we don't keep individual records after we've looked at the big picture.

### What the tool will show

Once launched, the lab will feature:

#### How judging can differ across panels

This helps you see how consistent judging is across different events. It can help you understand which aspects of your dance resonate with different judging styles.

#### Compare your results to the field

Instead of just looking at your final placement, we look at how you did compared to the middle of the pack. This helps you see how you performed relative to the overall strength of the heat.

_Stay tuned for the official release in the DevAI Portfolio._
`,b=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"})),v=`---
type: post
draft: true
status: draft
title: "Comprehensive Financial Strategy Guide for Dancers"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Travel"
excerpt: "A deep dive into financial literacy for dancers: maximizing travel perks while maintaining a responsible lifestyle."
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

How to forecast your yearly dance expenses and set aside a "Dance Fund" that doesn't compromise your long-term financial health.

#### Credit Card Strategy

A deep dive into status-stacking with travel cards. I'll explain why I use the Amex Platinum and Hyatt cards to secure late checkouts and airport lounge access.

#### Cost Saving Tips

Strategies for finding the best flight deals, managing group housing, and making the most of early-bird registration windows.

### Timeline for Release

The full guide is undergoing final review and will be available in the coming weeks. My goal is to help you build a sustainable financial foundation that allows for more dancing and less stress.

<Notice type="info">
**Sustainability is Key**
The best way to improve your dance is to stay in the game. Financial stability is the foundation of that longevity.
</Notice>
`,w=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),k=`---
type: post
draft: true
title: "How I used GitHub Actions to power this site"
date: "2026-04-18"
author: "Ariel Anders, PhD"
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

Building a "living portfolio" requires a way to handle the mundane tasks of deployment. I use **GitHub Actions** to automate the build, test, and release cycles of this platform. This ensures that every update, from a new gear review to a deep-dive research study, is verified before it goes live.

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

Before deployment, the application is subjected to end-to-end (E2E) tests.

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
`,_=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"})),S=`---
type: post
title: "Halloween costumes you can dance in"
date: "2026-04-18"
author: "Ariel Anders, PhD"
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

Need a Halloween costume in two minutes that won't restrict your movement or make you overheat on the dance floor? This DIY pumpkin costume formula is the ultimate quick-assembly solution. No bulky layers, no hot masks, and no sewing required. It's lightweight, breathable, and lets you focus on social dancing while looking festive.

### The 2-Minute Costume Formula

<grid cols="{{ base: 1, md: 3 }}" gap="{6}">

<stack gap="{4}" padding="{4}">

**1. Orange Base (BYO)**

![A bright orange, moisture-wicking athletic jumpsuit that provides full range of motion and breathability for crowded social dance floors.](/images/gear/sketches/assembly-guide.webp)

**Bring Your Own Orange Base**

Start with a comfortable orange dress, shirt, jumpsuit, or matching athletic set. Choose a breathable fabric like cotton or moisture-wicking tech wear that handles sweat well on the social floor.

</stack>

<stack gap="{4}" padding="{4}">

**2. Pumpkin Headband**

![A lightweight, plush pumpkin hat headband with a green stem and a friendly jack-o'-lantern face, designed to stay secure and comfortable during high-energy spins.](/images/gear/sketches/pumpkin-headbands.webp)

**Add Pumpkin Headband**

A lightweight headband or small pumpkin hat gives you the pumpkin silhouette instantly. Secure it with bobby pins to keep it in place during high-speed spins and double turns.

</stack>

<stack gap="{4}" padding="{4}">

**3. Felt Face Stickers**

![A set of pre-cut, matte black felt adhesive stickers in various geometric eye, nose, and mouth shapes to create a custom jack-o'-lantern face.](/images/gear/sketches/pumpkin-stickers.webp)

**Apply Jack-O'-Lantern Stickers**

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
* **Sticker Security:** Press firmly on the felt stickers. For rib-knit or heavily textured fabrics, a tiny dab of fabric glue can provide extra insurance.
* **Unrestricted Frame:** Ensure you can raise your arms into a dance frame without the outfit pulling or the stickers popping off.
* **Clear Visibility:** Keeping the "face" on your torso ensures you don't have anything obstructing your vision while navigating a crowded social dance floor.


<notice type='affiliate' id='pumpkin-headbands'></notice>
<notice type='affiliate' id='pumpkin-stickers'></notice>

Disclosure: As an Amazon Associate, I may earn from qualifying purchases.

`,T=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"})),A=`---
type: post
title: "Make Any Shoe a Dance Shoe"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Turn your favorite sneakers or flats into dance shoes with adhesive suede. A DIY modification that improves spins, reduces joint strain, and survives long social dance weekends."
image: "/images/gear/diy/hero.webp"
affiliateIds:
  - suede-sheets
tags:
  - diy
  - shoes
  - dance-shoes
  - footwear
  - wcs
---

## Why I Modify My Own Dance Shoes

Dedicated dance shoes are often expensive and lack the ergonomic support of modern athletic footwear. My preferred solution is to "upgrade" high-comfort sneakers or flats using industrial-strength adhesive suede.

![Finished shoe](/images/gear/diy/step5-finished.svg)

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

Ballroom and social dance shoes have used suede soles for decades because they provide a consistent balance between grip and glide.

- **Rubber grips too aggressively:** Most athletic shoes are designed for maximum traction, which can create excessive torque during pivots.
- **Suede creates controlled slip:** It allows for predictable movement and easier spins.
- **Reduced knee torque:** More predictable movement means less strain on your joints.

## Why I Don't Use Spot Stickers

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

This DIY modification has been tested extensively in high-demand environments. In my experience:
- **Survived Major Conventions:** Successfully navigated 4-day events with continuous dancing.
- **8+ Hour Socials:** Maintained consistent traction without edge lifting during all-night sets.
- **Multiple Years of Use:** With occasional maintenance, a single application can last through several seasons of regular dancing.
- **Consistent Traction:** Provides a predictable movement profile across various floor conditions, from hotel ballrooms to studio wood.

## Maintenance and Repairs

### Restoring Traction
Over time, dust and floor wax can compress the suede fibers. Use a suede brush to raise the nap and refresh the glide characteristics after long weekends or heavy use.

### Repairing Minor Peeling
Instead of replacing the entire sheet, apply a drop of Shoe Goo or superglue to any lifted edges and clamp until cured.

## Final Verdict

If you already own a comfortable pair of sneakers or flats, adding adhesive suede is often a better solution than purchasing dedicated dance shoes. The modification is inexpensive, durable, and provides a predictable friction profile across a wide range of ballroom and social dance floors.

### FAQs

**How durable are adhesive suede sheets?**
Suede sheets typically last for several months of regular dancing, depending on the floor type. They perform best on smooth wooden or dedicated dance floors. **Never** wear suede on concrete, wet floors, or outside the ballroom. It is highly recommended to change out of your dance shoes before using the restroom or taking the elevator (you never know what is on the floor!).

**How do I remove them?**
If you need to replace the sheets or return the shoes to everyday use, peel them off slowly. Any residual adhesive can usually be removed with rubbing alcohol or an adhesive remover like Goo Gone.
`,P=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),C=`---
type: post
draft: false
status: published
title: "Why Most Above-Average Dancers Don't Make Finals"
date: "2026-04-18"
author: "Ariel Anders, PhD"
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

Don't let the math discourage you—let it inform your expectations. If you made the Semis at a Tier 4 event, you are likely an "above-average" dancer who just got caught in the survival math.
`,I=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"})),x=`---
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
author: "Ariel Anders, PhD"
affiliateIds:
  - "loop-experience"
  - "portable-steamer"
  - "jbl-flip-6"
  - "portable-charger"
---

> Here is a practical packing checklist for a smoother West Coast Swing weekend, based on common dancer pain points: sore feet, loud ballrooms, sweaty workshops, cold hotel spaces, and late-night social dancing.

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
- **Synthetic pants/trousers:** Stretchy slacks or synthetic dress pants drape nicely, don't restrict your leg movement, and pack easily. Avoid heavy denim jeans—they can trap heat, restrict motion, and take too long to dry if you need to wash them.
- **A warm hoodie or light jacket:** Ballrooms are often heavily air-conditioned and can be cold during workshops, competitions, or whenever you are sitting still.
- **Double your socks and underwear:** Plan on showering and changing 2 to 3 times a day (after daytime workshops, before evening social dancing, etc.).
- **Travel laundry detergent sheets:** Synthetic activewear can easily be washed in your hotel sink and will dry overnight if you run low on clean clothes.

![A set of three grey compression packing cubes of varying sizes, shown partially filled with folded dance apparel to demonstrate space-saving efficiency for event travel.](/images/gear/sketches/compression-cubes.webp)

<notice type="affiliate" id="compression-cubes"></notice>
<notice type="affiliate" id="portable-steamer"></notice>

### Ballroom Bag (On-the-Floor Essentials)
Keep a small backpack or messenger bag with you in the ballroom so you don't have to keep walking back to your room for essentials:
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
`,D=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"})),j=`---
type: post
draft: true
title: "BoomTick and B\\\\: Rhythmic Architecture of WCS"
date: "2026-05-06"
author: "Ariel Anders, PhD"
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

These simple dots (•) and slashes (/)—if we were to substitute a touch for a step—give dancers a clear, visual map of weight transfer without needing to read complex musical sheet notation.

This intersection of technical structure and creative expression is why I dance, and it is the foundation of BoomTick.blog.

## Visual Identity: The Accessible Victorian

The aesthetic of BoomTick.blog is as intentional as a well-timed anchor. We’ve developed the **"Accessible Victorian"** design language—a blend of San Francisco’s architectural heritage and modern accessibility standards.

This design uses a palette of high-contrast teals, corals, and plums, ensuring that every insight is easy to read regardless of your device. We believe that professional-grade research shouldn’t just be accurate; it should be beautiful and inclusive.

## Sources

- [World Swing Dance Council - Skippy Blair](https://www.worldsdc.com/special-recognition/skippy-blair/)
- [Wikipedia - Skippy Blair](https://en.wikipedia.org/wiki/Skippy_Blair)
- [Universal Unit System Overview](https://www.eijkhout.net/ftb/Music/unit.html)
- [West Coast Swing Foundation Patterns - Skippy Blair (YouTube)](https://www.youtube.com/watch?v=QzGuTBoUamE&t=335)
`,O=Object.freeze(Object.defineProperty({__proto__:null,default:j},Symbol.toStringTag,{value:"Module"})),B=`---
type: post
title: "Event Travel & Packing"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Travel"
excerpt: "Packing organizers and garment care items for out-of-town events."
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

Travel conventions can be stressful, but being organized makes a world of difference. These packing essentials help you fit more in your bag and keep your dance clothes looking their best.

## Smart Packing Strategies

### Space-Saving Organization
Standard folding often leaves gaps in your luggage. Instead, try the "bundle" method or use high-quality compression cubes. These cubes allow you to group outfits by day or performance type, making it easy to find exactly what you need without unpacking your entire bag.

<notice type="affiliate" id="compression-cubes"></notice>

### Travel-Sized Essentials
Don't let bulky toiletries weigh you down. Opt for leak-proof silicone containers that meet TSA regulations. Labeling each bottle ensures you won't mix up your hair gel with your face wash during a quick costume change.

![Four multi-colored, leak-proof silicone travel bottles with labeled flip-top caps, designed for TSA-compliant storage of liquids.](/images/gear/sketches/leak-proof-refillable-silicone-travel-bottles-3oz-travel-size-containe.webp)

<notice type="affiliate" id="travel-bottles"></notice>

## Maintaining Your Performance Gear

### Wrinkle-Free Outfits
Don't let suitcase wrinkles ruin your competition look. A portable garment steamer is small enough to fit in your bag and powerful enough to freshen up your shirts and dresses in minutes.

![A lightweight, handheld white garment steamer with an ergonomic handle and a visible water reservoir, used for refreshing dance competition attire.](/images/gear/sketches/travel-steamer.webp)

<notice type="affiliate" id="portable-steamer"></notice>

### Steaming vs. Folding
| Care Method | Best For | Considerations |
| :--- | :--- | :--- |
| **Steaming** | Delicate fabrics, competition wear | Requires bringing a portable steamer |
| **Folding** | Practice wear, casual outfits | Use compression cubes to minimize wrinkles |
`,M=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"})),z=`---
type: post
title: "General Health & Home Care for Dancers"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Health"
excerpt: "Master your post-event recovery with targeted foam-rolling techniques, muscle maintenance, and professional self-care strategies designed for the active West Coast Swing dancer."
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

Recovery is just as important as practice. After a long weekend of dancing on hard ballroom floors, your muscles need targeted attention to prevent injury, reduce soreness, and maintain the flexibility required for high-level West Coast Swing.

### Muscle Recovery & Myofascial Release

A high-density foam roller is an essential tool for any dancer's home recovery kit. It uses your own body weight to perform deep tissue massage, breaking up adhesions in the fascia and increasing blood flow to tired tissues.

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

Finally, never underestimate the power of a warm soak. Magnesium absorption through the skin can help relax muscles and improve sleep quality.

<notice type="affiliate" id="epsom-salt"></notice>

Add a generous amount of Epsom salts to a warm bath. The magnesium sulfate helps pull toxins from the muscles and reduces swelling in the feet and ankles—the true heroes of every dance weekend.
`,E=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),F=`---
type: post
title: "Outdoor Dancing Gear"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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

A slim fanny pack or running belt is perfect for keeping your phone, keys, and cash secure without adding bulk or restricting your movement.

![Ultra-light, bounce-free slim running belt designed for keys and phone, featuring a low-profile silhouette that stays secure on the social floor and fits discreetly under clothing.](/images/gear/amazon/ushake-slim-running-belt-ultra-light-bounce-free-waist-pouch-fitness-w.jpg)

<notice type="affiliate" id="running-belt"></notice>

### Sun Protection is Non-Negotiable

If you're dancing under the sun, SPF 50 sunscreen and a good visor are essential to prevent burns and keep the sun out of your eyes so you can focus on your partner.

![Ergonomic performance visor providing sun protection while maintaining visibility and breathability for outdoor social dancing.](/images/gear/sketches/visor.webp)

<notice type="affiliate" id="sunscreen"></notice>

<notice type="affiliate" id="visor"></notice>
`,R=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"})),W=`---
type: post
title: "Power & Charging Essentials"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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

### Never Run Out of Battery
A high-capacity portable power bank from Anker is a lifesaver when you're away from a wall outlet for 12+ hours.


### Fast and Flexible Charging
Multi-charging cables allow you to charge multiple devices at once with high-speed 3A charging, reducing the number of cords you need to pack.

<notice type="affiliate" id="charging-cables" />

### Choosing the Right Capacity
When selecting a power bank, a higher mAh capacity (e.g., 20,000mAh) is ideal for weekend-long events where wall outlets are scarce, providing multiple full charges for your phone and accessories.
`,G=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"})),L=`---
type: post
title: "Practice & Review Tech"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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
You can't fix what you can't see. A compact travel tripod allows you to easily film your practice sessions or competition heats for later review.

<notice type="affiliate" id="tripod" />

### Recommended Setup
For the best recording angle, place your tripod at chest height and position it near a corner of the floor. This minimizes obstruction while capturing the full scope of your movement.
`,H=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),N=`---
type: post
title: "Practice & Social Dance Apparel"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Basic functional dance wear and layering accessories for your next practice or social."
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

Functional dance wear should be comfortable, breathable, and stylish. These non-merch basics are perfect for layering and creating your own unique look on the dance floor.

![Crop Top](/images/gear/amazon/floerns-women-s-casual-reflective-short-sleeve-round-neck-crop-tops-t.jpg)

### Breathable Basics
Crop tops are a favorite for a reason—they're lightweight and keep you cool during intense workshops.

<notice type="affiliate" id="reflective-crop-tops" />

### Layering with Style
Mesh and fishnet tops are great for adding texture to your outfit without adding heat, while fishnet tights provide a classic dance look.

<notice type="affiliate" id="mesh-fishnet-top" />
<notice type="affiliate" id="fishnet-tights" />

### Layering Logic
> **Layering Logic:** Convention ballrooms are notoriously temperature-variable. Always start with a breathable base layer (like a crop top) and bring a light, easily removable over-layer (like a mesh top or light jacket) to adjust as you warm up.
`,U=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"})),q=`---
type: post
title: "The Most Effective Way to Combat Smelly Dance Shoes"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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

Your shoes are your most important piece of equipment, but they are also the most prone to developing that dreaded "dance shoe smell." For years, I tried almost every remedy in the book: foot powders, deodorizing sprays, and even stuffing dryer sheets into my shoes after a long night of social dancing.

While some of these provided temporary relief, I found that none of them were a long-term solution. The powders created a messy paste when combined with sweat, the sprays often just added a floral scent to the funk, and the dryer sheets struggled against the deep-seated moisture that builds up during a multi-day event.


### The Science of the Stink
The odor isn't actually the sweat itself—it's the bacteria that thrive in the warm, damp environment inside your shoes. When you dance for hours, your shoes become a petri dish. If you don't remove that moisture completely before the next session, the bacteria continue to multiply, and the smell becomes increasingly difficult to manage.

![A pair of black strappy ballroom dance shoes, which can trap moisture and bacteria during long social dancing sessions.](/images/gear/amazon/hxyoo-ballroom-dance-shoes-boots-for-women-salsa-latin-wedding-party-2.jpg)
<Text variant="mono" size="micro" color="dim" uppercase textAlign="center" display="block" marginTop={-6} marginBottom={12}>Equipment Hygiene</Text>

### Why the Electric Shoe Dryer is My Top Choice
After experimenting with so many different methods, I found that an electric shoe dryer and deodorizer is the most effective way to combat this. Unlike passive drying, which can take days (especially in humid hotel rooms), an electric dryer uses gentle heat and airflow to pull moisture out of the deep foam and fabric layers of your dance shoes.

![Portable electric shoe dryer showing the two heating elements and the wired timer control unit.](/images/gear/amazon/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.jpg)
<Text variant="mono" size="micro" color="dim" uppercase textAlign="center" display="block" marginTop={-6} marginBottom={12}>Portable Maintenance Gear</Text>

In my experience, using a dryer for just 30-60 minutes after a dance session makes a world of difference:

- **Complete Moisture Removal:** It reaches the areas air-drying can't, ensuring the shoes are bone-dry by morning.
- **Bacterial Prevention:** By eliminating the damp environment, you address the root cause of the odor before it can start.
- **Preserving Your Investment:** Constant moisture breaks down the materials of your shoes faster. Keeping them dry significantly extends their lifespan.
- **Freshness for Multi-Day Events:** There is nothing worse than putting on damp, smelly shoes for a morning workshop. A dryer ensures every day starts with a fresh pair.


If you are looking for a reliable way to maintain your gear and your hygiene during long dance weekends, these have been the best investments I've made for my gear bag.

<notice type="affiliate" id="shoe-dryer"></notice>
`,V=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"})),J=`---
type: post
title: "Theme Wear, Costumes & Accessories"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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

Theme nights are a staple of West Coast Swing conventions. From "Galactic" to "Glow Night," having the right accessories can make your outfit stand out without breaking the bank.

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
`,Y=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"})),K=`---
type: post
title: "WCS Essentials (Local & Travel)"
date: "2026-06-01"
author: "Ariel Anders, PhD"
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

Whether you're heading to a local social or traveling across the country for a convention, these items are high-priority essentials for any West Coast Swing dancer.

![A hand-drawn sketch of a large holographic rave fan with black bamboo ribs, shown both folded and fully open with a vibrant rainbow pattern, alongside its blue carrying pouch.](/images/gear/sketches/zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine.webp)

### Stay Cool on the Floor
Crowded dance floors can get incredibly hot. A large folding fan is the most effective way to cool yourself down (and your partners!) between songs.

<notice type="affiliate" id="rave-fan" />

### Protect Your Hearing
Ballroom sound systems are often cranked up to high volumes. To enjoy the music without the ringing in your ears the next morning, high-fidelity earplugs are a must. They lower the decibels while preserving the clarity of the music and conversation.

<notice type="affiliate" id="loop-experience" />

### Last Minute Checklist
* Extra socks
* Blister kit / bandaids
* Mints or gum
* Deodorant
* Refillable water bottle
`,Q=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"})),$=`---
type: blog
title: "The Story Behind the Merch: From Jack & Jill Orama to NorCal Pride"
date: "2026-06-14"
author: "Ariel Anders, PhD"
category: "Community"
excerpt: "How a single T-shirt for a local event evolved into a full collection of West Coast Swing apparel celebrating NorCal roots and role-fluid energy."
image: "/assets/events/jjo-hero.svg"
imageAlt: "Dancers at Jack & Jill Orama wearing event t-shirts."
tags: ["merch", "community", "NorCal", "WCS"]
affiliateIds:
  - "norcal-bestcal-tshirt"
  - "norcal-pride-gate-shirt"
  - "love-neon-switch-shirt"
---
Every great project has a "Day Zero"—a moment where a specific problem needs a creative solution. For the BoomTick Merch page, that moment was **Jack & Jill Orama**.

## The Origin Story: Jack & Jill Orama

It started with a simple goal: we needed shirts for a specific event. Jack & Jill Orama (JJO) is a beloved local West Coast Swing event, and we wanted to create something that captured the fun, competitive, yet community-focused spirit of the weekend.

![Jack & Jill Orama Hero](/assets/events/jjo-hero.svg)

The initial designs were highly focused. We weren't thinking about a "store" or a "brand" yet. We just wanted the dancers at JJO to have a piece of the event they could take home. But the response was overwhelming. Dancers didn't just want event shirts; they wanted shirts that spoke to their identity as West Coast Swing dancers year-round.

Here's the original T-shirt that's the one with a colorful NorCal Best Cal and the bear only. We forgot to get them printed on time!

![Original Shirt](/assets/posts/original_shirt.jpg)

## NorCal vs. SoCal: The "Best Cal" Backstory

If you've spent any time in the California swing scene, you know there’s a friendly (and sometimes fierce) rivalry between Northern and Southern California.

Living in the Bay Area, we felt it was time to represent. The "Nor Cal Best Cal" designs were born out of that local pride. We wanted to celebrate the iconic Golden Gate Bridge, the California bear, and the unique energy of the NorCal WCS community.

So I created the print-on-demand options, which are the two items I'm wearing, plus a few other options we had for the event.

![Me wearing new NorCal shirt (black)](/assets/posts/mewearing_new_norcal_shirt.jpg)

![Me wearing new NorCal shirt (pink)](/assets/posts/me_wearing_new_norcalshirt.jpg)

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
`,X=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"})),Z=`---
type: study
title: "VersionTruth: The Antidote to Version Hallucinations"
date: "2026-07-10"
author: "Ariel Anders"
category: "DevAI"
tags: ["automation", "ci", "dependencies", "ai"]
excerpt: "A follow-up to the actions/checkout@v4 hallucination study — this time, shipping VersionTruth, a live API and skill that keeps coding agents grounded."
readTime: 3
status: "published"
---

Last month I wrote about watching my own coding agent [confidently downgrade \`actions/checkout@v6\` back to \`v4\`](/research/confidently-incorrect-v4) — not because \`v6\` was wrong, but because the agent had never seen it during training and treated "unfamiliar" as "hallucinated." Classic out-of-distribution error. Harmless-looking, expensive in CI minutes.

I said at the time I'd keep pushing dependabot rather than fight it. That's still mostly true. But NandaHack gave me a good excuse to actually close the loop: instead of just diagnosing the failure mode, ship something that prevents it.

## The shape of the problem

The pattern repeats across three surfaces in this repo:

- \`package.json\` dependency versions
- \`.nvmrc\` / \`.node-version\` / \`engines.node\`
- \`.github/workflows/*.yml\` \`uses:\` pins

In every case, the failure is the same: an agent's internal sense of "the latest version I know about" silently overrides what's actually true right now. My existing \`verify_versions.py\` / \`version_utils.py\` tooling already catches this *after the fact* — it diffs a PR, checks proposed versions against HEAD and against the real registries (npm, nodejs.org, GitHub Releases), and hard-blocks Node.js downgrades unless explicitly overridden. It's a good backstop.

What it isn't is something an agent can consult *before* it writes the bad edit in the first place.

## VersionTruth

For NandaHack I packaged the same live-registry-lookup logic as a small public API called VersionTruth, along with a hosted \`SKILL.md\` that tells any agent how to use it. You can interact with it directly; [https://boomtick.blog/versiontruth](https://boomtick.blog/versiontruth) is a live active tool!

![VersionTruth Solution](/images/studies/AI_Version_Hallucination_Solution.webp)

\`\`\`
GET /api/latest-version?ecosystem=gh-action&name=actions/checkout
→ { "ecosystem": "gh-action", "name": "actions/checkout", "latest": "v6.0.1", ... }

GET /api/compare-version?ecosystem=gh-action&name=actions/checkout&candidate=v4
→ { "candidate": "v4", "latest": "v6.0.1", "isOutdated": true, "isDeprecated": false, ... }
\`\`\`

The instruction to the agent is deliberately blunt: if you don't recognize a version string, that's a reason to *check*, not a reason to *revert*. Unfamiliarity isn't evidence of error.

## Keeping it additive

The API lives at \`boomtick.blog/api/*\` as serverless functions sitting next to the existing Vite SPA — same domain, same deploy pipeline, zero changes to \`src/\`. That constraint mattered more to me than the feature itself: I wasn't willing to risk the blog's uptime over a hackathon entry. It shipped on a feature branch, got curl-tested against a Vercel preview URL, and merged only once the preview responses looked right.

The Python side (\`dev_tools/verify_versions.py\`) keeps doing what it already does — gating PR diffs in CI. The new API is a separate, narrower tool: a live oracle an agent can query mid-edit, not a replacement for the existing CI gate.

## What's next

Right now \`compare-version\` answers "is this a downgrade relative to the real latest," which covers the case from the original post. The natural extension is teaching it about *deprecation* and *EOL* too — flagging when a candidate version still resolves but is EOL (like Node 18 or deprecated npm packages), which is a related but distinct failure mode from the one that started this.

If you're building agent tooling and hitting the same "confidently wrong about recency" problem, the \`SKILL.md\` and endpoints are public — feel free to point your own agents at them, or fork the idea.
`,ee=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"})),ne=`---
title: "Stop Asking the LLM to Review Everything"
date: "2024-05-10"
author: "Ariel Anders"
category: "DevAI"
tags: ["DevOps", "AI", "Gemini", "GitHub Models", "GitHub Actions", "Playwright"]
excerpt: "A practical hybrid AI review pipeline using GitHub Actions, Gemini, GitHub Models, and Playwright. Not a replacement for human review, but a way to make first-pass review more repeatable."
readTime: 14
status: "published"
---

The first version of my AI review workflow made the classic mistake: I asked the model to do everything.

It had to understand the repo, inspect the diff, infer the design system, read CI logs, and decide what mattered. Sometimes it worked. Often it produced a confident wall of feedback that was hard to trust.

The better pattern was smaller and more boring: collect the important pull request context first, then ask the model to review that prepared packet.

This article walks through the hybrid review pipeline I use for BoomTick.blog: GitHub Actions collects the context, Gemini and GitHub Models review it, structured findings decide what blocks the PR, and Playwright screenshots catch UI changes that normal tests miss.

It is not a fully autonomous engineer. It is a review assistant made from scripts, prompts, CI glue, and a few hard safety boundaries.

## What you will build

By the end of this walkthrough, you will understand how to build a small hybrid review assistant that can:

- collect pull request context and perform token budgeting before calling an LLM
- send a focused prompt to Gemini or GitHub Models
- request structured findings instead of vague prose
- map findings into GitHub review states
- optionally use CI logs and Playwright screenshots as review inputs

This is not a replacement for human review. It is a way to make first-pass review more repeatable.

---

## The shape of the pipeline

\`\`\`mermaid
flowchart TD
  PR[Pull request opened] --> Collect[Collect review context]
  Collect --> Packet[Create review-context.md]

  Packet --> Models[Send packet to AI Service]
  Models --> Findings[Return structured findings]

  Findings --> Decide{Any blocking issues?}
  Decide -->|Yes| Changes[Request changes]
  Decide -->|No| Summary[Post summary or approve]

  CI[CI logs] --> Collect
  Diff[PR diff] --> Collect
  Rules[Project review rules] --> Collect
\`\`\`

The important part is not the exact command name. It is the handoff.

The model does not start with a vague instruction like "review this PR." It starts with a prepared packet: the diff, failing logs, linked context, and the project rules that matter for this repo.

That one change makes the review easier to repeat, easier to debug, and easier to distrust when it gets something wrong.

---

## What is real in this repo?

This article mixes two things:

- the workflow I actually use in this repo
- the general pattern someone else could copy

I call that out because AI automation articles often blur the line between "this works today" and "this would be cool if finished."

For this article:

- **Implemented** means the script, command, or workflow exists in the repo.
- **Experimental** means it exists but still needs manual setup, review, or judgment.
- **Pattern** means it is the architecture I recommend, even if the exact command name in your repo would be different.

---

## Command naming note

This article uses two kinds of commands:

- **Generic example commands** show the shape of the pipeline and are meant to be adapted.
- **Repo-specific commands** are the actual commands used in this project.

When a command is repo-specific, I call that out explicitly. When a command is generic, treat it as pseudocode for your own repo.

---

## 1. Make the model review a packet, not the repo

The biggest improvement came from taking work away from the model.

A weak review prompt looks like this:

> Review this PR.

That sounds simple, but it hides too many jobs. The model has to discover what changed, infer which files matter, understand the project conventions, notice CI failures, and decide which issues are worth blocking.

A better prompt starts with a prepared context packet.

That packet can include:

- the PR title and description
- the changed files
- the relevant diff
- CI failure logs
- linked issue text
- project-specific review rules
- design-system constraints

Now the model has a narrower job: review the packet and produce findings.

\`\`\`bash
# Generic example: adjust command names to match your repo
python dev-tools/aggregate_pr_context.py \\
  --target-branch main \\
  --output .devai/review-context.md
\`\`\`

> **Implemented:** \`dev-tools/td-cli gh audit-pr <PR_NUMBER> --fetch\` fetches PR diffs, CI logs, and linked issue context into a structured review packet. \`dev-tools/aggregate-prs.sh\` handles batch aggregation.

The point is not that my aggregation command is special. The point is that the model should receive a curated artifact instead of wandering through the repo.

---

## 2. Orchestrate with Hybrid AI Services

The AI part should be the least interesting part of the system. We use a hybrid approach, prioritizing **GitHub Models** (via the Azure inference endpoint) and **Gemini** (via Google Generative AI) for production reliability, with local models as a fallback.

The quality comes from everything around it: the context packet, the review rules, the output schema, and the script that decides what to do with the result.

\`\`\`python
import os
import requests
from pathlib import Path

# GitHub Models (OpenAI-compatible)
GITHUB_MODELS_URL = "https://models.inference.ai.azure.com/chat/completions"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

context = Path(".devai/review-context.md").read_text()

prompt = f"""
You are reviewing a pull request.

Focus on:
1. correctness bugs
2. broken UI states
3. accessibility regressions
4. design-token violations
5. missing tests

Return:
- blocking issues
- non-blocking suggestions
- files to inspect manually

Context:
{context}
"""

response = requests.post(
    GITHUB_MODELS_URL,
    headers={
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    },
    json={
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
    },
    timeout=120,
)

response.raise_for_status()
print(response.json()["choices"][0]["message"]["content"])
\`\`\`

This is intentionally boring. If this part feels magical, the pipeline is probably too hard to debug. Using remote models provides higher consistency and allows us to use larger context windows when needed.

The model should not be responsible for knowing your repo's entire history. It should receive a bounded task, produce bounded output, and leave the final decision to deterministic code.

> **Implemented:** The AI orchestration logic (prioritizing GitHub Models and Gemini) is centralized in \`dev-tools/utils.py\`.

---

## 3. Ask for findings the code can understand

A paragraph of AI feedback is easy to read and hard to automate.

For a human-only workflow, prose is fine. For a CI workflow, prose is a problem. A script cannot reliably tell whether "this might be worth revisiting" should block a PR.

So I ask the model for structured findings.

\`\`\`json
{
  "blocking": [
    {
      "file": "src/components/Nav.tsx",
      "reason": "Mobile menu button has no accessible label",
      "suggestion": "Add aria-label=\\"Open navigation menu\\""
    }
  ],
  "non_blocking": [
    {
      "file": "src/styles/tokens.ts",
      "reason": "Spacing token could be reused here"
    }
  ],
  "summary": "One blocking accessibility issue found."
}
\`\`\`

The model can still be wrong. The schema does not make it truthful.

What the schema does is make the next step testable. A script can check whether \`blocking\` is empty. It can format comments consistently. It can refuse to request changes if the model returns malformed output.

---

## 4. Let scripts decide what blocks the PR

I do not want the model deciding whether a pull request is approved.

The model can describe findings. A deterministic script should decide how those findings map to GitHub review states.

That separation matters. It keeps the model from turning a stylistic opinion into a blocked PR, and it keeps a serious failure from being buried inside a friendly summary.

### Blocking

Use \`REQUEST_CHANGES\` when the finding should stop the merge: broken builds, accessibility regressions, missing required props, or known design-system violations.

### Non-blocking

Use \`COMMENT\` for feedback that may be useful but should not stop the PR: naming, refactors, minor cleanup, or subjective UI polish.

### Clean

Use \`APPROVE\` or a summary comment only when there are no blocking findings.

\`\`\`python
# dev-tools/submit_review.py
import json

with open(".devai/review-result.json") as f:
    findings = json.load(f)

event = "REQUEST_CHANGES" if findings["blocking"] else "APPROVE"

pr.create_review(
    body=findings["summary"],
    comments=findings["blocking"] + findings["non_blocking"],
    event=event,
)
\`\`\`

> **Implemented:** \`dev-tools/submit_review.py\` handles \`APPROVE\`, \`REQUEST_CHANGES\`, and \`COMMENT\` states.

The model proposes the facts. The script applies the policy.

---

## 5. Use CI failures as context, not permission to auto-merge

CI failures are useful because they are specific. They tell the agent where the pain is.

But a failing test should not give an agent permission to silently rewrite the project. The safer pattern is to treat the failure as context for a repair suggestion.

The workflow is:

1. CI fails.
2. A script extracts the relevant log section.
3. The repair agent receives the log, changed files, and recent diff.
4. The agent comments or proposes a patch.
5. A human reviews the result before merge.

\`\`\`mermaid
sequenceDiagram
  participant CI as GitHub Actions
  participant Script as Log extractor
  participant Agent as Repair agent
  participant PR as Pull request

  CI->>Script: Build or test failure
  Script->>Script: Extract relevant error block
  Script->>Agent: Send logs, diff, and affected files
  Agent->>PR: Comment or propose patch
  PR->>PR: Human reviews before merge
\`\`\`

That last step is not ceremony. It is the safety boundary.

> **Experimental:** \`dev-tools/td-cli ai repair\` can be triggered when CI fails. A GitHub Actions workflow (\`jules-fix-trigger.yml\`) exists to initiate repair sessions. Treat the output as a suggestion; always review before merge.

---

## 6. Use Playwright screenshots as a tripwire

For a UI-heavy site, "the tests pass" is not the same as "the page still looks right."

A layout can shift. A button can wrap. A mobile nav can cover the page. TypeScript will not care.

That is why I use Playwright screenshots as a tripwire. They do not decide whether a design change is good. They just tell me something changed.

\`\`\`ts
import { test, expect } from "@playwright/test";

test("home page visual smoke test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveScreenshot("home-page.png", {
    fullPage: true,
  });
});
\`\`\`

This works best for stable routes: home pages, article pages, navigation states, and important UI shells. It works poorly for pages with constantly changing content unless you mask or stabilize the dynamic areas.

> **Pattern:** Playwright visual regression is the architecture this repo is moving toward. The test runner config exists. Baseline screenshot generation and CI comparison are not yet fully automated; that is the next step.

---

## The smallest useful version

You do not need the whole pipeline to get value from this pattern.

The smallest useful version is just two steps:

1. Create a review context file.
2. Ask an AI model to review that file.

Everything else, including GitHub comments, review states, CI repair, and screenshot analysis, can come later.

\`\`\`text
.devai/
  review-context.md
  review-result.json

dev-tools/
  aggregate_pr_context.py
\`\`\`

\`\`\`bash
# Generic example: file names are adaptable
python dev-tools/aggregate_pr_context.py > .devai/review-context.md
python dev-tools/ai_review.py .devai/review-context.md > .devai/review-result.json
python dev-tools/submit_review.py .devai/review-result.json
\`\`\`

Even if you never post the result back to GitHub automatically, you still get something useful: a repeatable review artifact that can be inspected, improved, and rerun.

---

## What this does not solve

This pipeline makes review more repeatable. It does not make the model trustworthy.

Local models can still:

- hallucinate file paths
- miss subtle bugs
- over-focus on style
- misunderstand project conventions
- produce confident but invalid suggestions

That is why the model is boxed in on both sides.

Before the model, deterministic scripts collect the context. After the model, deterministic scripts decide how to handle the findings.

The model is useful, but it is not the source of truth.

---

## The lesson: shrink the model's job

The biggest improvement was not switching models. It was changing the shape of the task.

> Ask the model to inspect the repo, infer the architecture, find the diff, understand CI, and review the code.

That is the bad pattern. It produces feedback that is hard to trust and harder to automate.

> Give the model a prepared packet and ask it to perform one narrow review task.

That is the better pattern.

The more deterministic the pipeline is before and after the model call, the more useful the model becomes.

That is the pattern I would copy first: not the exact scripts, not the exact prompts, and not even the models. Start by shrinking the job.
`,te=Object.freeze(Object.defineProperty({__proto__:null,default:ne},Symbol.toStringTag,{value:"Module"})),ae=`---
type: study
title: "Confidently incorrect: The latest stable major version is @v4"
date: "2026-06-20"
author: "Ariel Anders"
category: "DevAI"
tags: ["AI", "GitHub Actions", "Agentic Workflows", "LLM"]
excerpt: "An exploration of AI's out-of-distribution data errors, where models confidently recommend outdated versions of software due to training data cutoffs."
readTime: 2
status: "published"
---

Like everyone else I have been playing around with agentic workflows and wanted to create a targeted code reviewer (read: lower token usage with a smaller model, essential code diffs, minimal external context, etc).

Both my agentic coder and reviewer suggested downgrading my github actions/checkout version to v4. For context v4.1.0 was released Sep 22, 2023 and v5.0.1 was released Nov 17, 2025.

![Screenshot of an AI code review finding titled 'Critical Issues' incorrectly flagging actions/checkout@v6 as invalid and suggesting a downgrade to @v4, stating there is no official v6.](/images/studies/ai-incorrect-v4-suggestion.png)

This is a classic out-of-distribution data error. It is illuminating to see how AI-generated outputs remain susceptible to providing dated results based on their training data cutoff. It wasn’t just my minimal reviewer (gpt-4o-mini released July 2024): Even recent larger reasoning models can provide similar responses; for instance, Gemini 3.1 Pro (released Feb 2026) also incorrectly identified v4 as the latest stable version during a brief check.

![Screenshot of the GitHub Releases page for actions/checkout showing version v7.0.0 released by aiqiaoy, confirming that versions well beyond v4 are available and stable.](/images/studies/github-checkout-v7-release.png)

That being said I’m still impressed and excited about AI assistant engineering to increase engineering velocity, but I would also recommend dependbot to keep your version up to date.
`,oe=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"})),ie=`---
type: study
title: "Technical Deep-Dive: Building the Deployment Impact Analyzer"
date: "2026-06-19"
author: "Ariel Anders, PhD"
category: "DevAI"
tags: ["Playwright", "Dependency Graph", "CI/CD", "Automation", "Visual Review"]
excerpt: "How we built a semantic visual impact analysis pipeline using dependency-cruiser, Playwright screenshot diffing, and automated severity scoring."
readTime: 12
status: "published"
---

A common challenge in modern web development is understanding the "blast radius" of a change. When you modify a shared utility or a global CSS variable, how do you know which pages across your entire application are affected?

Manual regression testing is slow and error-prone. Full end-to-end suites are expensive to run on every commit. Our solution is the **Deployment Impact Analyzer**: a CI/CD pipeline that semantically determines the scope of a change and performs targeted visual validation.

## The Architecture

The Deployment Impact Analyzer operates in four distinct phases:

1.  **Import Graph Parsing**: Identifying which files are affected by the PR.
2.  **Route Mapping**: Translating affected files into user-facing routes.
3.  **Visual Diffing**: Capturing and comparing screenshots using Playwright and pixelmatch.
4.  **Severity Scoring**: Calculating the impact and reporting findings to the PR.

\`\`\`mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true, 'primaryColor': '#1e293b', 'primaryTextColor': '#f1f5f9', 'primaryBorderColor': '#334155', 'lineColor': '#22d3ee' }, 'flowchart': { 'nodeSpacing': 50, 'rankSpacing': 50 }}}%%
flowchart TD
  PR[Pull Request] --> Diff[Identify Changed Files]
  Diff --> Graph[dependency-cruiser Graph Analysis]
  Graph --> Routes[Map to Affected Routes]
  Routes --> Playwright[Playwright Capture & Diff]
  Playwright --> Scoring[Severity Scoring Engine]
  Scoring --> Report[GitHub PR Comment]
\`\`\`

---

## 1. Import Graph Parsing with dependency-cruiser

We don't want to test every page if only the "About" section changed. To achieve targeted testing, we use \`dependency-cruiser\` to analyze the project's import graph.

When a file is modified, we trace its dependents up the tree until we reach an entry point (a route or a page component).

\`\`\`bash
# Example logic for finding dependents
npx depcruise --exclude "^node_modules" --output-type json src | \\
  jq '.modules[] | select(.dependencies[].resolved == "src/components/Button.tsx") | .source'
\`\`\`

By identifying the "semantic blast radius," we reduce the number of screenshots we need to capture by up to 90% in large-scale applications.

---

## 2. Automated Playwright Screenshot Diffing

Once we have a list of affected routes, we trigger a Playwright-based capture service.

The pipeline performs a "sandwich" comparison:
1.  **Baseline**: Capture screenshots of the affected routes on the \`main\` branch.
2.  **Current**: Capture screenshots of the same routes on the feature branch.
3.  **Diff**: Use \`pixelmatch\` to generate a pixel-level delta.

To improve the signal-to-noise ratio, we automatically crop the diff to the bounding box of the changed area. This helps reviewers focus on the specific UI shift rather than scanning a full-page screenshot.

---

## 3. Severity Scoring & Reporting

Not all pixel diffs are created equal. A 1px shift in a footer is different from a broken hero section.

Our scoring engine calculates a **Severity Score** based on:
- **Pixel Count**: The absolute number of changed pixels.
- **Percentage**: The ratio of changed pixels to the total area.
- **Layout Shift**: Detection of significant element movement.

If the score exceeds a configurable threshold, the pipeline marks the check as failed and requests a manual visual review.

---

## 4. GitHub Actions Integration

The entire system is orchestrated via GitHub Actions. We've optimized the workflow to use caching for the \`dependency-cruiser\` graph and parallelize Playwright workers to keep execution times under 5 minutes.

\`\`\`yaml
name: Deployment Impact Analysis
on: [pull_request]

jobs:
  impact:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - name: Run Impact Analysis
        run: pnpm run impact:analysis
      - name: Visual Diffing
        run: pnpm run impact:visual-diff
      - name: Post Report
        run: python scripts/send-jules-impact.py
\`\`\`

### Example Report Output

When a PR is opened, the analyzer posts a summary directly to the GitHub conversation. This allows developers to see the impact at a glance without leaving their workflow.

| Route | Visual Diff | Severity | Action |
| :--- | :--- | :--- | :--- |
| \`/blog/:slug\` | 12.4% | 🔴 HIGH | Manual Review Required |
| \`/about\` | 0.0% | 🟢 LOW | Auto-passed |
| \`/merch\` | 1.2% | 🟡 MEDIUM | Review Suggested |

> **Implemented:** We use the \`cropped\` diff artifacts to show exactly where the pixels changed, saving reviewers from playing "spot the difference" on full-page screenshots.

<Box paddingBottom={8}>
<Grid cols={{ base: 1, md: 3 }} gap={6}>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">Before</Text>
    ![Baseline](/assets/studies/deployment-impact-analyzer/before.png)
  </Stack>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">After</Text>
    ![Current](/assets/studies/deployment-impact-analyzer/after.png)
  </Stack>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">Diff</Text>
    ![Visual Delta](/assets/studies/deployment-impact-analyzer/diff.png)
  </Stack>
</Grid>
</Box>
*A "sandwich" comparison showing the baseline, the new state, and the highlighted pixel delta.*

### Real-World Finding: From 404 to Overflow Resolution

Visual regression testing is particularly effective for catching "cumulative" bugs—issues that only appear once multiple components are integrated. During the development of this tool, we encountered a three-stage regression that perfectly illustrated the system's value.

#### 1. The Initial State (Missing Route)
Initially, a routing configuration error caused the analyzer to hit a "Content Not Found" page. While the code for the tool existed, the dynamic route hadn't been registered in the main portfolio index.

#### 2. The Regression (Text Overflow)
After fixing the routing, the page rendered, but a new issue emerged on mobile viewports. Long file paths in the \`ArchitecturalAssetsList\` component were overflowing their containers, breaking the layout and pushing the "Category" labels off-screen. This is a classic "invisible" regression that passes unit tests and type-checks but fails the "eyeball test."

#### 3. The Resolution (Truncation & Wrapping)
We implemented a fix using Tailwind's \`truncate\` and \`flex-wrap\` utilities, ensuring that assets are readable even on the narrowest devices.

<Box paddingBottom={8}>
<Grid cols={{ base: 1, md: 3 }} gap={6}>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">1. Missing</Text>
    ![404 Error](/assets/studies/deployment-impact-analyzer/before-mobile.png)
  </Stack>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">2. Diff</Text>
    ![Regression Delta](/assets/studies/deployment-impact-analyzer/diff-mobile.png)
  </Stack>
  <Stack gap={3}>
    <Text variant="mono" size="micro" weight="font-bold" uppercase color="dim" align="center">3. Fixed</Text>
    ![Resolution](/assets/studies/deployment-impact-analyzer/after-mobile.png)
  </Stack>
</Grid>
</Box>
*The mobile resolution sequence: from a 404 state to an overflow regression, and finally the resolved responsive layout.*

## Lessons Learned

Building this tool taught us that **context is king**. An LLM can review code, but it struggles to "see" layout shifts. By combining deterministic graph analysis with visual regression, we create a "tripwire" that catches regressions before they reach production.

The next evolution of this tool involves agentic auto-resolution: using LLMs to analyze the visual diff and decide if a change is an intentional improvement or an accidental regression.

---

*This analyzer is part of the BoomTick.blog DevAI suite. Check out the [Engineering Portfolio](/research) for more tools.*
`,re=Object.freeze(Object.defineProperty({__proto__:null,default:ie},Symbol.toStringTag,{value:"Module"})),se=`---
type: study
title: "WCS Navigator Architecture Deep Dive"
date: "2026-08-28"
author: "Ariel Anders, PhD"
category: "DevAI"
tags: ["DevAI", "FastAPI", "Gemini", "React", "WCS", "Automation"]
excerpt: "Explore how WCS Navigator uses a search-first UI, pre-flight footprint analysis, auto-advancing card questionnaires, dynamic rule engines, taskmaker debug telemetry, and stateless in-memory calendar streaming to deliver personalized convention itineraries."
readTime: 8
status: "published"
---

## Building a Stateless Multi-Modal Agent

When designing the WCS Navigator API, the primary engineering constraint was straightforward but demanding: the **Stateless In-Memory Guarantee**. We required zero database dependencies (no PostgreSQL, no Redis, no Firestore) and zero disk writes (no \`/tmp\` scratch files or filesystem container mounts). Every byte of data—from raw multi-page convention PDF schedules and URL scrapings to the generated RFC 5545 \`.ics\` calendar files—is ingested, processed, and streamed entirely within memory via standard HTTP request/response lifecycles.

To achieve production reliability, dynamic arrival adaptations, transparent fallback capability, and zero friction UX, WCS Navigator operates across a modern multi-stage architecture:

![Search Omnibox & Custom Schedule Ingestion Dropzone](/assets/research/wcs-navigator/screenshot-wcs-navigator-hero.png)

---

## 1. Two-Pass Dual Gateway Architecture

WCS Navigator decouples schedule discovery from schedule optimization through a hybrid client/backend execution pipeline:

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant SPA as React SPA (Frontend)
    participant GW as Dual Gateway Services
    participant API as FastAPI / Gemini-2.5-Pro Backend
    participant Heuristic as Client Heuristic / Rule Engine

    Note over SPA,API: Stage 1 Schedule Discovery
    SPA->>GW: POST /api/v1/discover (PDF File / Event URL)
    alt Live Gateway Connected
        GW->>API: Ingest & Parse via Gemini-2.5-Pro / PyPDF
        API-->>SPA: DiscoveryResponse (Taxonomy & Footprint)
    else Live Gateway Offline / Unreachable
        GW->>Heuristic: Trigger Client Heuristic Extractor
        Heuristic-->>SPA: Fallback Discovery & Suggested Questions
        Note over SPA: GatewayFallbackBanner Notifies User
    end

    Note over SPA,API: Stage 2 Constraint Optimization & Itinerary Generation
    SPA->>GW: POST /api/v1/generate (Questionnaire Answers)
    alt Live Backend Optimization
        GW->>API: Constraint Optimization & Schedule Stream
        API-->>SPA: GenerateResponse (.ics & Decision Trace)
    else Offline Rule Engine
        GW->>Heuristic: Execute scheduleRuleEngine.ts
        Heuristic-->>SPA: Adapted Decision Trace & Local .ics Stream
    end
\`\`\`

### Key Architectural Characteristics
- **Stage 1 Discovery (\`/api/v1/discover\`)**: Fast timetable extraction utilizing Gemini-2.5-Pro, PyPDF, or client heuristic extractors to build the event footprint (audition bands, parallel track streams, headlining champions, and airport logistics).
- **Stage 2 Generation (\`/api/v1/generate\`)**: Constraint-optimized schedule synthesis, returning personalized RFC 5545 \`.ics\` streams and mobile Markdown (\`.md\`) itineraries.
- **Transparent Gateway Fallback**: If the live FastAPI backend is offline or unreachable, the application smoothly transitions using \`GatewayFallbackBanner\` to client-side heuristic extraction without disrupting user workflow.

---

## 2. Pre-Flight Footprint Analysis & Dynamic Questionnaire

Rather than presenting dancers with a generic survey, the agent evaluates the event timetable payload dynamically before generating interactive question steps:

\`\`\`typescript
export function analyzeEventFootprint(
  eventName: string,
  discovery?: DiscoveryResponse
): DynamicQuestionStep[] {
  // 1. Evaluate Audition Tiers & Division prerequisite gates
  // 2. Isolate Parallel Workshop Track themes
  // 3. Extract Headlining Champion Instructors scheduled for the weekend
  // 4. Determine Host Venue Airport Transit conditions & touchdown targets
  return [personaStep, trackStep, instructorStep, arrivalStep];
}
\`\`\`

![Dynamic Card Questionnaire with Tactile Selection](/assets/research/wcs-navigator/screenshot-wcs-navigator-questionnaire.png)

- **Audition Bands**: Events with audition requirements (e.g., *Boogie by the Bay Level 4/5*) ask for tier placement.
- **Parallel Tracks**: Classes are filtered by distinct workshop streams (e.g., *Footwork & Connection*, *Musicality*, *Momentum Flow*).
- **Fluid Auto-Advancing**: Selecting any option highlights the card with a cyan glow and automatically advances to the next step after 180ms. Dancers can also skip individual questions or click **"Skip All & Generate Itinerary"** to immediately inspect their schedule.

---

## 3. Dynamic Rule Engine & Arrival Buffer Mathematics

The schedule rule engine (\`scheduleRuleEngine.ts\`) deterministically computes travel buffers and adjusts flight deadlines based on dancer choices:

\`\`\`typescript
export function adaptTraceToUserPreferences(
  baseTrace: AgentDecisionTrace,
  answers: Record<string, QuestionAnswerValue>,
  eventName: string = 'WCS Event'
): AgentDecisionTrace {
  // Evaluates arrival target & intensive registrations
  if (isLocalCommute) {
    calculatedArrivalDeadline = 'Local Commute (Drive-In)';
    calculatedStagingTime = '5:15 PM Friday';
  } else if (hasIntensive) {
    calculatedArrivalDeadline = '12:00 PM Friday';
    calculatedStagingTime = '1:45 PM Friday';
  } else if (isEveningArrival) {
    calculatedArrivalDeadline = '6:30 PM Friday';
    calculatedStagingTime = '8:00 PM Friday';
  }
  // Recalculates backward staging buffer: Transit + Hotel Settle + Shoe Check & Warmup
  return updatedTrace;
}
\`\`\`

### Arrival Buffer Modes
1. **Local Commuter (\`arrival: "local"\`)**: Sets target to *Local Commute (Drive-In)* and buffer step to *Local Hotel / Venue Arrival Buffer (4:15 PM)*, eliminating unnecessary airport flight transit calculations.
2. **Pre-Convention Intensive Attendees (\`intensive: "yes"\`)**: Shifts safe flight touchdown target to **12:00 PM Friday** to accommodate 2:00 PM pre-convention masterclasses.
3. **Friday Evening Arrivals (\`arrival: "evening"\`)**: Adjusts flight landing target to **6:30 PM Friday** and staging call to **8:00 PM Friday**.
4. **Zero-Assumption Dance Role Contract**: Dance role (lead, follow, switch) remains strictly empty/unspecified unless explicitly chosen by the user, avoiding unconfirmed role assumptions.

---

## 4. Real-Time Taskmaker Debug Inspector (\`DecisionDebugInspector\`)

To ensure complete transparency and satisfy WCS Navigator's **Explainability First** requirement, the interface incorporates a four-tab real-time debug inspector:

![Real-Time Decision Logic & Taskmaker Debug Inspector](/assets/research/wcs-navigator/screenshot-wcs-navigator-debug-inspector.png)

### The 4-Tab Inspector Architecture
1. **🎯 Confirmed Inputs & Persona Extraction**: Displays extracted competitor divisions, explicit or universal dance roles, computed arrival targets, and raw questionnaire answer mappings.
2. **⚡ Gateway & Engine Telemetry (\`ServiceTelemetry\`)**: Tracks real-time service endpoints (e.g., \`/api/v1/discover\`, \`/api/v1/generate\`), execution latency (\`durationMs\`), HTTP response statuses (e.g., \`200 OK\`), active processing engine (\`FastAPI / Gemini-2.5-Pro\` vs. \`Client Rule Engine\`), and collapsible request/response payloads.
3. **🔍 Rule Engine Filtering Audit Matrix**: Step-by-step human-readable justification matrix listing every session evaluated, showing inclusion (\`✅ Included\`) or filtering (\`⛔ Filtered Out\`) status alongside specific rule reasons.
4. **📦 Raw JSON Schemas**: Interactive schema inspection and one-click clipboard export for \`DiscoveryResponse\`, \`AgentDecisionTrace\`, and \`FlightBuffer\` structures.

---

## 5. Event-Based Local Transit & Chronological Schedule Feed

Generic countdown math is paired with verified host venue logistics:

\`\`\`typescript
const EVENT_LOGISTICS_MAP = {
  'boogie-by-the-bay': {
    venueName: 'Hyatt Regency San Francisco Airport (Burlingame, CA)',
    primaryAirport: 'SFO — 5 mins away',
    transitTip: 'Complimentary 24/7 Hyatt Airport Shuttle departs every 15-20 mins. No rental car needed.',
    baggageAndCheckin: 'Complimentary bell desk luggage holding prior to 3:00 PM check-in; 3rd-floor atrium connects directly to Grand Ballroom.',
    travelBuffer: 'Target SFO landing by 2:30 PM Friday for zero-rush ballroom check-in before evening workshops.'
  }
};
\`\`\`

![Unified Chronological Schedule & Action Bar Export](/assets/research/wcs-navigator/screenshot-wcs-navigator-itinerary.png)

The schedule dashboard presents:
- **Scannable Session Cards**: Purely focused on Title, Time (\`Clock\`), Location (\`MapPin\`), and Category Badges (Workshops, Competitions, Socials).
- **Custom Schedule Persistence**: Dancers can toggle individual sessions on/off or reset back to the AI plan.
- **One-Click Exports**: Download \`.ics\` calendar files directly for Apple/Google Calendar or \`.md\` Markdown files for offline mobile viewing.

By pairing deterministic travel buffer mathematics with dynamic dual-gateway fallback execution and complete telemetry transparency, WCS Navigator delivers a sub-second, explainable schedule optimization platform.
`,le=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"})),ce=`---
title: "Automate WCS Event Data Scraping and Frontend Sync"
date: "2026-05-15"
author: "Ariel Anders"
category: "Data Engineering"
tags: ["Data Engineering", "Python", "React", "ETL", "GitHub Actions"]
excerpt: "How I built a serverless ETL pipeline to scrape WSDC data and sync it directly to the Tech-Dancer frontend."
readTime: 8
status: "published"
---

Manually updating WSDC event details is a bottleneck. To keep the Tech-Dancer platform automatically up to date, I built a serverless ETL pipeline using GitHub Actions that scrapes the data, validates it, and syncs it directly to the React frontend.

Here is the architecture of the pipeline.

## 1. The Scraper and Data Validation

Web scraping is inherently brittle. Instead of just dumping HTML into a dictionary, the script uses \`BeautifulSoup\` for parsing and \`pydantic\` for strict schema validation. This ensures no malformed data ever makes it to the frontend.

One major challenge was the lack of consistent WSDC registry links for all dancers. I implemented a fallback mechanism using robust temporary identifiers to ensure no competitor data was dropped during the sync.

\`\`\`python
# etl/scraper.py
import json
import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel, ValidationError, Field
from typing import List, Optional

class WCSEvent(BaseModel):
    name: str = Field(..., min_length=1)
    location: str
    date: str
    registry_id: Optional[str] = None # Handling missing WSDC registry links

def scrape_wcs_events() -> List[dict]:
    # Target WSDC-compliant event source
    url = "https://worldwestcoastswingcouncil.com/events/"
    headers = {"User-Agent": "BoomTick-Data-Bot/1.0"}

    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to fetch WSDC data: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    valid_events = []

    # Handle inconsistent HTML structures (e.g., H-Town Throwdown's custom tables)
    rows = soup.find_all('tr', class_='event-row') or soup.find_all('div', class_='event-item')

    for row in rows:
        try:
            # Extract and sanitize data
            name = row.find(['td', 'h3'], class_='name').text.strip()
            location = row.find(['td', 'span'], class_='location').text.strip()
            date = row.find(['td', 'time'], class_='date').text.strip()

            # Registry Link Resilience: Catch missing IDs and use fallbacks
            link_tag = row.find('a', href=True)
            registry_id = link_tag['href'].split('/')[-1] if link_tag else f"tmp_{hash(name)}"

            event = WCSEvent(
                name=name,
                location=location,
                date=date,
                registry_id=registry_id
            )
            valid_events.append(event.model_dump())
        except (AttributeError, ValidationError, TypeError) as e:
            print(f"Skipping malformed row: {e}")
            continue

    # Write directly to the frontend's public directory for Vite async fetch
    with open('public/data/event_queue.json', 'w') as f:
        json.dump(valid_events, f, indent=2)

if __name__ == "__main__":
    scrape_wcs_events()
\`\`\`

## 2. Serverless Scheduling with GitHub Actions

The scraper runs on a weekly cron job. To prevent littering the git history with empty commits when the WSDC schedule hasn't changed, the Action checks for a \`git diff\` before pushing.

\`\`\`yaml
# .github/workflows/wcs_etl.yml
name: WCS Data ETL

on:
  schedule:
    - cron: '0 0 * * 1' # Every Monday at midnight UTC
  workflow_dispatch:

jobs:
  run-etl:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: pip install beautifulsoup4 requests pydantic

      - name: Run Scraper
        run: python etl/scraper.py

      - name: Commit and Push Data
        run: |
          git config --global user.name "Data-Bot"
          git config --global user.email "bot@boomtick.blog"
          git add public/data/event_queue.json

          # Only commit if data has actually changed
          if git diff --staged --quiet; then
            echo "No changes in WSDC data. Skipping commit."
          else
            git commit -m "chore: Sync latest WSDC Event Data"
            git push
          fi
\`\`\`

## 3. The React Frontend Sync

Because the ETL pipeline writes the JSON directly into the \`public/data/\` directory, the Vite application can fetch it asynchronously without ballooning the initial JavaScript bundle size.

\`\`\`typescript
// src/features/research/useWCSData.ts
import { useState, useEffect } from 'react';

export interface WcsEvent {
  name: string;
  location: string;
  date: string;
  registry_id?: string;
}

export function useWCSData() {
  const [events, setEvents] = useState<WcsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch from public directory to avoid bundling overhead
        const response = await fetch('/data/event_queue.json');
        if (!response.ok) throw new Error('WCS data sync failed');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown data error'));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
}
\`\`\`
`,de=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"})),he=`---
type: resource
title: "Loop Experience Earplugs"
date: "2023-10-01"
author: "Ariel Anders, PhD"
category: "Dance Gear"
excerpt: "A must-have for protecting your hearing in loud ballroom and social dance settings without sacrificing sound quality."
image: "/images/gear/sketches/loop-earplugs.webp"
imageAlt: "A set of gold-colored Loop Experience earplugs on a dark background, showing the distinctive ring design."
affiliateIds: ["loop-experience"]
tags: ["safety", "ballroom", "music"]
verdict: "Highly Recommended"
updatedDate: "Oct 2023"
affiliateProvider: "amazon"
---

## Why Dancers Need Hearing Protection

BALLROOMS ARE LOUD. Loop Experience earplugs reduce noise by 18 decibels while keeping music and speech clear. Perfect for social dancing where the music volume is high but you still need to hear your partner.
`,ue=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"})),pe=`---
type: resource
title: "Travel Steamer Pro"
date: "2023-11-01"
author: "Ariel Anders, PhD"
category: "Travel"
excerpt: "Compact, efficient, and dual-voltage. Keep your competition shirts and skirts wrinkle-free on the road."
image: "/images/gear/sketches/travel-steamer.webp"
affiliateIds: ["portable-steamer"]
tags: ["travel", "clothing", "competition"]
verdict: "Essential for Competitors"
updatedDate: "Nov 2023"
affiliateProvider: "amazon"
---

## Competition Ready, Anywhere

Wrinkles ruin your comp outfit. This travel steamer heats up in 30 seconds and is powerful enough for cotton shirts and delicate dance fabrics.
`,ge=Object.freeze(Object.defineProperty({__proto__:null,default:pe},Symbol.toStringTag,{value:"Module"})),me=`---
type: resource
title: "Portable Bluetooth Speaker (UE Wonderboom 4)"
date: "2024-01-01"
author: "Ariel Anders, PhD"
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
`,fe=Object.freeze(Object.defineProperty({__proto__:null,default:me},Symbol.toStringTag,{value:"Module"})),ye=`---
type: resource
title: "Alien Latex Mask"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,be=Object.freeze(Object.defineProperty({__proto__:null,default:ye},Symbol.toStringTag,{value:"Module"})),ve=`---
type: resource
title: "Multi-Charging Cables (USB 3A Fast Charge)"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,we=Object.freeze(Object.defineProperty({__proto__:null,default:ve},Symbol.toStringTag,{value:"Module"})),ke=`---
type: resource
title: "Compression Packing Cubes"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,_e=Object.freeze(Object.defineProperty({__proto__:null,default:ke},Symbol.toStringTag,{value:"Module"})),Se=`---
type: resource
title: "Sports Crop Tank Tops"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Te=Object.freeze(Object.defineProperty({__proto__:null,default:Se},Symbol.toStringTag,{value:"Module"})),Ae=`---
type: resource
title: "Fishnet Lace Tights"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Pe=Object.freeze(Object.defineProperty({__proto__:null,default:Ae},Symbol.toStringTag,{value:"Module"})),Ce=`---
type: resource
title: "High-Density Foam Roller"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Ie=Object.freeze(Object.defineProperty({__proto__:null,default:Ce},Symbol.toStringTag,{value:"Module"})),xe=`---
type: resource
title: "Green Full-Body Spandex Suit"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,De=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"})),je=`---
type: resource
title: "Light Up Suspenders"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Oe=Object.freeze(Object.defineProperty({__proto__:null,default:je},Symbol.toStringTag,{value:"Module"})),Be=`---
type: resource
title: "LOVE neon tshirt - ask me to follow"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Express your style and your role on the floor with this neon-inspired follow shirt."
image: "/assets/gear/love-neon-tshirt-ask-me-to-follow-front.webp"
imageBack: "/assets/gear/love-neon-tshirt-ask-me-to-follow-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Stylish & Social"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/follow-love-shirt-neon
displayMode: "pair"
featuredSide: "back"
internalSku: love-neon-follow
fulfillmentType: "print-on-demand"
provider: "printful"
---

The LOVE neon tshirt is part of the NorCal BestCal collection, designed for dancers who want to make a statement. This version is perfect for followers who want to clearly communicate their role while sporting a vibrant, Pride-inspired aesthetic.
`,Me=Object.freeze(Object.defineProperty({__proto__:null,default:Be},Symbol.toStringTag,{value:"Module"})),ze=`---
type: resource
title: "Love neon tshirt - ask me to lead"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Express your style and your role on the floor with this neon-inspired lead shirt."
image: "/assets/gear/love-neon-tshirt-ask-me-to-lead-front.webp"
imageBack: "/assets/gear/love-neon-tshirt-ask-me-to-lead-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Stylish & Social"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/lead-love-shirt-neon
displayMode: "pair"
featuredSide: "back"
internalSku: love-neon-lead
fulfillmentType: "print-on-demand"
provider: "printful"
---

The LOVE neon tshirt is part of the NorCal BestCal collection, designed for dancers who want to make a statement. This version is perfect for leaders who want to clearly communicate their role while sporting a vibrant, Pride-inspired aesthetic.
`,Ee=Object.freeze(Object.defineProperty({__proto__:null,default:ze},Symbol.toStringTag,{value:"Module"})),Fe=`---
type: resource
title: "Lead follow or switch LOVE shirt in Neon"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Show your versatility on the dance floor with this neon 'Lead, Follow, or Switch' LOVE shirt."
image: "/assets/gear/lead-follow-or-switch-love-shirt-in-neon-front.webp"
imageBack: "/assets/gear/lead-follow-or-switch-love-shirt-in-neon-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Versatile & Vibrant"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/lead-follow-switch-love-shirt-neon
displayMode: "pair"
featuredSide: "back"
internalSku: lead-follow-switch-love-neon
fulfillmentType: "print-on-demand"
provider: "printful"
---

Perfect for the multi-role dancer, this neon shirt expresses the inclusive spirit of West Coast Swing.
`,Re=Object.freeze(Object.defineProperty({__proto__:null,default:Fe},Symbol.toStringTag,{value:"Module"})),We=`---
type: resource
title: "LOVE Lead Follow or Switch Unisex shirt"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Unisex 'Lead, Follow, or Switch' LOVE shirt."
image: "/assets/gear/unisex-t-shirt-front.webp"
imageBack: "/assets/gear/unisex-t-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Classic & Inclusive"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/love-unisex-shirt
displayMode: "pair"
featuredSide: "back"
internalSku: love-lead-follow-switch-unisex
fulfillmentType: "print-on-demand"
provider: "printful"
---

A classic unisex fit for everyone in the community who loves to do it all on the floor.
`,Ge=Object.freeze(Object.defineProperty({__proto__:null,default:We},Symbol.toStringTag,{value:"Module"})),Le=`---
type: resource
title: "Mesh Fishnet Top"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,He=Object.freeze(Object.defineProperty({__proto__:null,default:Le},Symbol.toStringTag,{value:"Module"})),Ne=`---
type: resource
title: "Nerd Hat, Socks, Bowtie & Suspenders Set"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Ue=Object.freeze(Object.defineProperty({__proto__:null,default:Ne},Symbol.toStringTag,{value:"Module"})),qe=`---
type: resource
title: "Men's Bear Tank Nor Cal Best Cal"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Comfortable men's tank top with the NorCal Best Cal bear design."
image: "/assets/gear/norcal-bear-tank-front.webp"
imageBack: "/assets/gear/norcal-bear-tank-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Cool & Casual"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/mens-bear-tank-nor-cal-best-cal
internalSku: mens-bear-tank-norcal
fulfillmentType: "print-on-demand"
provider: "printful"
---

Stay cool in the SoCal heat with this NorCal Best Cal bear tank top, a social dancing essential.
`,Ve=Object.freeze(Object.defineProperty({__proto__:null,default:qe},Symbol.toStringTag,{value:"Module"})),Je=`---
type: resource
title: "NorCal BestCal"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "The original NorCal BestCal t-shirt."
image: "/assets/gear/norcal-bestcal-front.webp"
imageBack: "/assets/gear/norcal-bestcal-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Essential Merch"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/norcal-bestcal-tshirt
internalSku: norcal-bestcal-classic
fulfillmentType: "print-on-demand"
provider: "printful"
---

The core piece of the NorCal BestCal collection. Simple, bold, and indispensable for Team NorCal.
`,Ye=Object.freeze(Object.defineProperty({__proto__:null,default:Je},Symbol.toStringTag,{value:"Module"})),Ke=`---
type: resource
title: "NorCal Best Cal Cropped top"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Stylish cropped top for NorCal dancers."
image: "/assets/gear/norcal-crop-top-front.webp"
imageBack: "/assets/gear/norcal-crop-top-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Trendy & Airy"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/norcal-crop-top
internalSku: norcal-bestcal-cropped-top
fulfillmentType: "print-on-demand"
provider: "printful"
---

A stylish crop top designed for movement and regional pride.
`,Qe=Object.freeze(Object.defineProperty({__proto__:null,default:Ke},Symbol.toStringTag,{value:"Module"})),$e=`---
type: resource
title: "NorCal BestCal Golden Gate Crop Hoodie"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Cozy crop hoodie with the Golden Gate bridge design."
image: "/assets/gear/norcal-gate-crop-hoodie.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Cozy & Regional"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/norcal-bestcal-golden-gate-crop-hoodie
internalSku: norcal-bestcal-golden-gate-hoodie
fulfillmentType: "print-on-demand"
provider: "printful"
---

The perfect layer for those early morning workshops or chilly ballroom social sets.
`,Xe=Object.freeze(Object.defineProperty({__proto__:null,default:$e},Symbol.toStringTag,{value:"Module"})),Ze=`---
type: resource
title: "NorCal Best Cal Pride California Bear Apparel"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "The iconic California bear, redesigned with Pride colors for the West Coast Swing community."
image: "/assets/gear/norcal-best-cal-pride-california-bear-apparel-front.webp"
imageBack: "/assets/gear/norcal-best-cal-pride-california-bear-apparel-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "California Classic"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/norcal-pride-bear-shirt
internalSku: norcal-bestcal-pride-bear
fulfillmentType: "print-on-demand"
provider: "printful"
---

The NorCal Best Cal Pride California Bear shirt combines the state's iconic symbol with the rainbow flag. High-quality fabric and a comfortable fit make it perfect for long workshop days and late-night social dancing.
`,en=Object.freeze(Object.defineProperty({__proto__:null,default:Ze},Symbol.toStringTag,{value:"Module"})),nn=`---
type: resource
title: "NorCal BestCal Golden Gate Rainbow Pride Shirt"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Classic Golden Gate bridge design with a vibrant rainbow twist for NorCal dancers."
image: "/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-front.webp"
imageBack: "/assets/gear/norcal-bestcal-golden-gate-rainbow-pride-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Regional Pride"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/norcal-pride-golden-gate-shirt
internalSku: norcal-bestcal-golden-gate-pride
fulfillmentType: "print-on-demand"
provider: "printful"
---

Celebrate your Northern California roots and Pride month with this custom Golden Gate bridge design. It's a favorite for Team NorCal BestCal members at flagship events like Jack & Jill O'Rama.
`,tn=Object.freeze(Object.defineProperty({__proto__:null,default:nn},Symbol.toStringTag,{value:"Module"})),an=`---
type: resource
draft: true
title: "Anker Portable Power Bank"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,on=Object.freeze(Object.defineProperty({__proto__:null,default:an},Symbol.toStringTag,{value:"Module"})),rn=`---
type: resource
title: "Halloween Pumpkin Headbands"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,sn=Object.freeze(Object.defineProperty({__proto__:null,default:rn},Symbol.toStringTag,{value:"Module"})),ln=`---
type: resource
title: "Halloween Adhesive Felt Stickers"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,cn=Object.freeze(Object.defineProperty({__proto__:null,default:ln},Symbol.toStringTag,{value:"Module"})),dn=`---
type: resource
title: "Large Rave Folding Fan"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,hn=Object.freeze(Object.defineProperty({__proto__:null,default:dn},Symbol.toStringTag,{value:"Module"})),un=`---
type: resource
title: "Reflective Crop Tops"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,pn=Object.freeze(Object.defineProperty({__proto__:null,default:un},Symbol.toStringTag,{value:"Module"})),gn=`---
type: resource
title: "Slim Fanny Pack"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,mn=Object.freeze(Object.defineProperty({__proto__:null,default:gn},Symbol.toStringTag,{value:"Module"})),fn=`---
type: resource
title: "Electric Shoe Dryer and Deodorizer"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,yn=Object.freeze(Object.defineProperty({__proto__:null,default:fn},Symbol.toStringTag,{value:"Module"})),bn=`---
type: resource
title: "Sunscreen & Lip Balm SPF 50"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "Self Care"
excerpt: "Stay protected during outdoor social events and pool parties."
image: ""
affiliateIds: ["sunscreen"]
tags: ["safety", "outdoor", "pool"]
verdict: "Summer Essential"
bestFor: ["Pool Parties", "Outdoor Events"]
affiliateProvider: "amazon"
---

## Sun Protection

Essential for events with outdoor components or pool parties.
`,vn=Object.freeze(Object.defineProperty({__proto__:null,default:bn},Symbol.toStringTag,{value:"Module"})),wn=`---
type: resource
title: "Silicone Travel Bottles"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,kn=Object.freeze(Object.defineProperty({__proto__:null,default:wn},Symbol.toStringTag,{value:"Module"})),_n=`---
type: resource
title: "Compact Travel Tripod"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"})),Tn=`---
type: resource
title: "Sport Visor / Sun Hat"
date: "2024-06-01"
author: "Ariel Anders, PhD"
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
`,An=Object.freeze(Object.defineProperty({__proto__:null,default:Tn},Symbol.toStringTag,{value:"Module"})),Pn=`---
type: resource
title: "War Eagle oversized high neck t-shirt"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "fashion"
excerpt: "Oversized high-neck t-shirt featuring the War Eagle design."
image: "/assets/gear/war-eagle-oversized-high-neck-t-shirt-front.webp"
imageBack: "/assets/gear/war-eagle-oversized-high-neck-t-shirt-back.webp"
tags: ["merch", "norcal", "rainbow", "pride"]
verdict: "Oversized & Comfortable"
updatedDate: "June 2024"
shopUrl: https://boomtick.printful.me/war-eagle-shirt
displayMode: "pair"
featuredSide: "back"
internalSku: war-eagle-oversized
fulfillmentType: "print-on-demand"
provider: "printful"
---

The War Eagle oversized t-shirt offers a modern high-neck silhouette and maximum comfort for long dance weekends.
`,Cn=Object.freeze(Object.defineProperty({__proto__:null,default:Pn},Symbol.toStringTag,{value:"Module"})),In=`---
type: resource
title: "Adhesive Suede Sheets for DIY Dance Shoes"
date: '2026-04-12'
author: Ariel Anders, PhD
category: Dance Gear
excerpt: "Recommended materials for converting your favorite sneakers into high-performance dance shoes."
image: /images/gear/amazon/suede-stick-on-sheets.jpg
affiliateIds:
- suede-sheets
tags:
- diy
- footwear
- budget
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
- **Suede Brush:** Essential for restoring the nap after the suede becomes compressed.
- **Shoe Goo:** Useful for repairing minor edge peeling over time.

_Affiliate disclosure: Links in this guide may earn a commission at no cost to you._
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:In},Symbol.toStringTag,{value:"Module"})),Dn=`---
id: "relavel-travel-bag"
title: "Relavel Travel Hanging Toiletry Bag"
category: "travel"
badge: "Recommended"
price: "$20.00"
image: "/images/gear/sketches/relavel-travel-bag.webp"
url: "https://www.amazon.com/dp/B07TBCXCJH?tag=onasafari04-20"
featured: false
description: "An absolute MUST-HAVE travel bag. The Relavel Travel Hanging Toiletry Bag is an essential item for anyone who travels frequently. It's waterproof, spacious, and features multiple compartments to keep your makeup and shaving gear organized. Hang it in the bathroom for easy access to all your toiletries."
---

An absolute MUST-HAVE travel bag. The Relavel Travel Hanging Toiletry Bag is an essential item for anyone who travels frequently. It's waterproof, spacious, and features multiple compartments to keep your makeup and shaving gear organized. Hang it in the bathroom for easy access to all your toiletries.
`,jn=Object.freeze(Object.defineProperty({__proto__:null,default:Dn},Symbol.toStringTag,{value:"Module"})),On=`---
id: "slot-era-mug"
title: "Slot Era Black Ceramic Mug"
category: "Accessories"
badge: "Merch"
price: "$18.00"
image: "/assets/slot_era_mug.webp"
url: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-black-glossy-mug"
featured: false
description: "11oz black ceramic coffee mug featuring the colorful Slot Era BoomTick insignia."
---

Dishwasher and microwave safe ceramic mug to start dance event mornings right.
`,Bn=Object.freeze(Object.defineProperty({__proto__:null,default:On},Symbol.toStringTag,{value:"Module"})),Mn=`---
id: "slot-era-tank-top"
title: "Slot Era WCS Women's Racerback Tank Top"
category: "Apparel"
badge: "Merch"
price: "$28.00"
image: "/assets/slot_era_racerback.webp"
url: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-womens-fitted-racerback-tank-top"
featured: true
description: "Fitted racerback tank top featuring the vibrant retro Slot Era design for West Coast Swing dancers."
---

Features soft fabric, flattering racerback cut, and durable rainbow 'Slot Era' print built for long social dancing nights.
`,zn=Object.freeze(Object.defineProperty({__proto__:null,default:Mn},Symbol.toStringTag,{value:"Module"})),En=`---
id: "slot-era-tote-bag"
title: "Slot Era WCS Tote Bag"
category: "Accessories"
badge: "Merch"
price: "$24.00"
image: "/assets/slot_era_tote.webp"
url: "https://boomtick.printful.me/product/boomtick-slot-era-west-coast-swing-dancer-tote-bag"
featured: true
description: "Durable black canvas tote bag printed with the signature Slot Era West Coast Swing dancer graphic."
---

Spacious canvas tote designed to carry dance shoes, water bottles, and event essentials between workshops.
`,Fn=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"}));function Rn(e){const a=e.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!a)return{data:{},content:e};const i=a[1],t=a[2];try{const o=f(i);return{data:o&&typeof o=="object"?o:{},content:t}}catch(o){return console.error("Error parsing frontmatter:",o),{data:{},content:t}}}const c={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":b,"/content/posts/2026-04-18-financial-literacy-dancers.md":w,"/content/posts/2026-04-18-github-actions.md":_,"/content/posts/2026-04-18-halloween-costumes.md":T,"/content/posts/2026-04-18-make-shoe-dance.md":P,"/content/posts/2026-04-18-why-finals-are-hard.md":I,"/content/posts/2026-04-19-practical-tools-essentials.md":D,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":O,"/content/posts/2026-06-01-event-travel-packing.md":M,"/content/posts/2026-06-01-general-health-home-care.md":E,"/content/posts/2026-06-01-outdoor-dancing.md":R,"/content/posts/2026-06-01-power-charging.md":G,"/content/posts/2026-06-01-practice-review-tech.md":H,"/content/posts/2026-06-01-practice-social-dance-apparel.md":U,"/content/posts/2026-06-01-shoe-care-modification.md":V,"/content/posts/2026-06-01-theme-wear-costumes-accessories.md":Y,"/content/posts/2026-06-01-wcs-essentials.md":Q}),blogs:Object.assign({"/content/blog/2026-06-14-the-story-behind-the-merch-page.md":X}),studies:Object.assign({"/content/studies/2026-07-10-latest-version-check-skill.md":ee,"/content/studies/ai-devops-pipeline.md":te,"/content/studies/confidently-incorrect-v4.md":oe,"/content/studies/deployment-impact-analyzer.md":re,"/content/studies/wcs-navigator-architecture.md":le,"/content/studies/wcs-scraper-initial-sync.md":de}),resources:Object.assign({"/content/resources/2023-10-01-loop-earplugs.md":ue,"/content/resources/2023-11-01-travel-steamer.md":ge,"/content/resources/2024-01-01-portable-speaker.md":fe,"/content/resources/2024-06-01-alien-mask.md":be,"/content/resources/2024-06-01-charging-cables.md":we,"/content/resources/2024-06-01-compression-cubes.md":_e,"/content/resources/2024-06-01-crop-tops.md":Te,"/content/resources/2024-06-01-fishnet-tights.md":Pe,"/content/resources/2024-06-01-foam-roller.md":Ie,"/content/resources/2024-06-01-green-bodysuit.md":De,"/content/resources/2024-06-01-light-up-suspenders.md":Oe,"/content/resources/2024-06-01-love-neon-follow-shirt.md":Me,"/content/resources/2024-06-01-love-neon-lead-shirt.md":Ee,"/content/resources/2024-06-01-love-neon-switch-shirt.md":Re,"/content/resources/2024-06-01-love-unisex-shirt.md":Ge,"/content/resources/2024-06-01-mesh-fishnet-top.md":He,"/content/resources/2024-06-01-nerd-set.md":Ue,"/content/resources/2024-06-01-norcal-bear-tank.md":Ve,"/content/resources/2024-06-01-norcal-bestcal-tshirt.md":Ye,"/content/resources/2024-06-01-norcal-crop-top.md":Qe,"/content/resources/2024-06-01-norcal-gate-crop-hoodie.md":Xe,"/content/resources/2024-06-01-norcal-pride-bear-shirt.md":en,"/content/resources/2024-06-01-norcal-pride-gate-shirt.md":tn,"/content/resources/2024-06-01-portable-charger.md":on,"/content/resources/2024-06-01-pumpkin-headbands.md":sn,"/content/resources/2024-06-01-pumpkin-stickers.md":cn,"/content/resources/2024-06-01-rave-fan.md":hn,"/content/resources/2024-06-01-reflective-crop-tops.md":pn,"/content/resources/2024-06-01-running-belt.md":mn,"/content/resources/2024-06-01-shoe-dryer.md":yn,"/content/resources/2024-06-01-sunscreen.md":vn,"/content/resources/2024-06-01-travel-bottles.md":kn,"/content/resources/2024-06-01-tripod.md":Sn,"/content/resources/2024-06-01-visor.md":An,"/content/resources/2024-06-01-war-eagle-shirt.md":Cn,"/content/resources/2026-04-12-suede-shoe-diy.md":xn,"/content/resources/relavel-travel-bag.md":jn,"/content/resources/slot-era-mug.md":Bn,"/content/resources/slot-era-tank-top.md":zn,"/content/resources/slot-era-tote-bag.md":Fn})},Wn=e=>e.split("/").pop()?.replace(".md","")||"";function Gn(e){if(typeof e!="string")return;const a=e.toLowerCase();return["published","draft","planned"].includes(a)?a:void 0}function Ln(e){if(typeof e=="number")return e;if(typeof e=="string"){const a=parseInt(e.replace(/[^\d]/g,""),10);return isNaN(a)?void 0:a}}function qn(e){if(!(e===""||e===void 0||e===null))return typeof e!="string"?e:e.startsWith("/")&&!e.startsWith(u)?`${u}${e}`:e}function h(e,a){const i=t=>Array.isArray(t)?t:[];return Object.entries(e).map(([t,o])=>{const l=typeof o=="string"?o:o.default,{data:n,content:d}=Rn(l),p=n.type||a,g=s=>{if(s!=="")return typeof s=="string"&&s.startsWith("/")?`${u}${s}`:s};return n.image=g(n.image),n.imageBack=g(n.imageBack),{...n,type:p,title:String(n.title||"Untitled"),category:String(n.category||"General"),excerpt:String(n.excerpt||""),date:String(n.date||""),author:String(n.author||""),tags:i(n.tags),affiliateIds:i(n.affiliateIds),seoTitle:n.seoTitle?String(n.seoTitle):void 0,seoDescription:n.seoDescription?String(n.seoDescription):void 0,imageAlt:n.imageAlt?String(n.imageAlt):void 0,imageFit:n.imageFit==="cover"||n.imageFit==="contain"?n.imageFit:void 0,status:Gn(n.status),readTime:Ln(n.readTime),content:d||"",slug:Wn(t)}}).filter(t=>t.draft?t.type==="study"&&(t.status==="planned"||t.status==="draft"):!0).sort((t,o)=>{const l=t.date?new Date(t.date).getTime():0,n=o.date?new Date(o.date).getTime():0,d=Number.isNaN(l)?0:l;return(Number.isNaN(n)?0:n)-d})}const r={posts:h({...c.posts,...c.blogs},"post"),studies:h(c.studies,"study"),resources:h(c.resources,"resource")},m={posts:new Map(r.posts.map(e=>[e.slug,e])),studies:new Map(r.studies.map(e=>[e.slug,e])),resources:new Map(r.resources.map(e=>[e.slug,e]))},Vn=()=>r.posts,Jn=()=>r.studies,Yn=e=>m.posts.get(e),Kn=()=>r.resources,Qn=e=>m.resources.get(e),$n=(e,a)=>{if(e&&e.trim().length>0)return Math.max(1,Math.round(e.split(/\s+/).length/200));const i=a?.split(/\s+/).length??0;return Math.max(1,Math.round(i/20))};export{Yn as a,Kn as b,Qn as c,Jn as d,Vn as g,qn as n,$n as r};
