import{A as Qe}from"./index-D36dgn7N.js";const yn=`---
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
`,bn=Object.freeze(Object.defineProperty({__proto__:null,default:yn},Symbol.toStringTag,{value:"Module"})),wn=`---
type: post
draft: true
status: draft
title: "Comprehensive Financial Strategy Guide for Dancers"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Miscellaneous"
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
`,vn=Object.freeze(Object.defineProperty({__proto__:null,default:wn},Symbol.toStringTag,{value:"Module"})),kn=`---
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
        pnpm run audit || true
        python3 dev-tools/td_cli.py audit-gate
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
`,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:kn},Symbol.toStringTag,{value:"Module"})),_n=`---
type: post
title: "Halloween costumes you can dance in"
date: "2026-10-31"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Easiest DIY pumpkin costume: orange outfit + pumpkin headband + stick-on jack-o’-lantern face. No sewing, no felt cutting, still cute enough for Halloween dancing."
image: "/images/gear/sketches/assembly-guide.webp"
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

| Orange Base (BYO) | Pumpkin Headband | Felt Face Stickers |
| :--- | :--- | :--- |
| ![Orange Outfit](/images/gear/sketches/assembly-guide.webp) | ![Pumpkin Headband](/images/gear/sketches/pumpkin-headbands.webp) | ![Felt Stickers](/images/gear/sketches/pumpkin-stickers.webp) |
| **Bring Your Own Orange Base** <br><br> Start with a comfortable orange dress, shirt, jumpsuit, or matching athletic set. Choose a breathable fabric like cotton or moisture-wicking tech wear that handles sweat well on the social floor. | **Add Pumpkin Headband** <br><br> A lightweight headband or small pumpkin hat gives you the pumpkin silhouette instantly. Secure it with bobby pins to keep it in place during high-speed spins and double turns. | **Apply Jack-O'-Lantern Stickers** <br><br> Use large, pre-cut adhesive felt stickers to assemble a jack-o’-lantern face on your torso in seconds. Start with the eyes, add the nose, and place the mouth last. |

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


### Helpful Supplies

* **Pumpkin Headband**: A comfortable, lightweight headband that instantly gives you the pumpkin silhouette without a bulky costume.
* **Adhesive Pumpkin Face Stickers**: Large, pre-cut felt stickers that let you assemble a perfect jack-o’-lantern face in seconds.

Disclosure: As an Amazon Associate, I may earn from qualifying purchases.

[Check out the Gear specific review here](/gear)

`,Tn=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"})),An=`---
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
`,Cn=Object.freeze(Object.defineProperty({__proto__:null,default:An},Symbol.toStringTag,{value:"Module"})),In=`---
type: post
draft: true
status: draft
title: "Why Most Above-Average Dancers Don't Make Finals"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "WCS"
excerpt: "A closer look at competition results and how judging works, explaining why placement is a poor metric for progress."
image: ""
tags:
  - research
  - wcs
  - competition
---

## The Reality of WCS Finals

In most West Coast Swing competitions, the margin between making a final and being the "first alternate" is razor-thin. When we look at the raw scores from events like the Jack & Jill O'Rama or Mission City Swing, we see a grouping of "above average" dancers who are often separated by a single judge's mark.

### How Results Vary

If there are 40 dancers in a heat and only 10 make the final, the 11th through 15th dancers are basically tied in many cases. Differences in judging, split-second focus shifts, and partner pairings all play a role in the final results.

### Looking at the Big Picture

I'm building tools in the [DevAI Portfolio](/research) to look at these results across multiple events. By tracking performance over time rather than just looking at one rank, we can see a much more reliable picture of improvement.

Don't let a "no-recall" define your weekend. Look at your dance videos.
`,Dn=Object.freeze(Object.defineProperty({__proto__:null,default:In},Symbol.toStringTag,{value:"Module"})),On=`---
type: post
title: "The WCS Travel Pack"
date: "2026-04-19"
updated: "2026-05-29"
excerpt: "A practical packing checklist for West Coast Swing weekends, covering shoes, earplugs, layers, recovery, hygiene, and travel tech."
category: "Guide"
tags: ["guide", "travel", "gear"]
image: "/assets/home/wcs-travel-pack.webp"
imageAlt: "A flat-lay of WCS travel essentials including dance shoes, earplugs, and a travel steamer."
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

### Apparel (The Sweat & Temperature Strategy)
- **10 to 15 shirts:** Many dancers find they sweat much more than expected. Plan on bringing extra t-shirts for classes and workshops, and changing into fresh, nice shirts for social dancing. Darker or busy patterned shirts are often helpful because they hide underarm sweat patches.
- **Synthetic pants/trousers:** Stretchy slacks or synthetic dress pants drape nicely, don't restrict your leg movement, and pack easily. Avoid heavy denim jeans—they can trap heat, restrict motion, and take too long to dry if you need to wash them.
- **A warm hoodie or light jacket:** Ballrooms are often heavily air-conditioned and can be cold during workshops, competitions, or whenever you are sitting still.
- **Double your socks and underwear:** Plan on showering and changing 2 to 3 times a day (after daytime workshops, before evening social dancing, etc.).
- **Travel laundry detergent sheets:** Synthetic activewear can easily be washed in your hotel sink and will dry overnight if you run low on clean clothes.
<notice type="affiliate" id="portable-steamer" />

### Ballroom Bag (On-the-Floor Essentials)
Keep a small backpack or messenger bag with you in the ballroom so you don't have to keep walking back to your room for essentials:
- **A small sweat towel:** Useful for wiping down your face and arms between dances.
- **A handheld fan:** A battery-powered fan or a manual folding fan is helpful for cooling down on the sidelines.
- **High-fidelity earplugs:** Ballroom sound systems can be loud. Dampening earplugs (like Loop Experience 2) protect your hearing while still letting you hear the music and talk to your partners.
<notice type="affiliate" id="loop-experience" />
- **Reusable water bottle & electrolyte packets:** Powdered mixes (like Liquid I.V.) help prevent muscle cramps and dehydration from hours of active sweating.

### Hygiene & Close-Connection Etiquette
- **Deodorant / Antiperspirant:** WCS is an intimate, close-proximity partner dance. Use a strong combination of both and reapply often.
- **Breath mints or gum:** Keep your breath fresh throughout long nights.
- **Hand sanitizer:** Keep a travel-sized bottle in your bag and sanitize your hands every few dances to avoid getting sick.

### Recovery & Downtime
- **A swimsuit:** Early morning hot tub/jacuzzi hangouts are a common social tradition at swing events and can be a great way to soothe aching muscles.
- **A lacrosse ball or hollow foam roller:** Useful for rolling out tight arches, calves, and lower back muscles.
- **Pain relievers:** Standard over-the-counter anti-inflammatories (like ibuprofen or paracetamol) for sore joints and sleep-deprivation headaches.
- **Protein bars & quick snacks:** Keep nuts, fruit, or protein bars in your room and bag. You may get hungry at 3:00 AM when hotel restaurants are closed.

### Daytime Sleep Gear (Circadian Sleep)
Because social dancing often runs until 4:00 AM or 5:00 AM, many dancers find they need to sleep while the sun is up:
- **A contoured sleep mask:** Often helpful to block out bright morning sunlight.
- **Silencing earplugs:** To block out daytime hotel hallway noise and roommates moving around.
- **Clothes pins or binder clips:** A great travel hack to clamp the hotel's blackout curtains completely shut and block annoying light leaks.

### Miscellaneous Tech & Tools
- **High-capacity power bank:** Your phone battery can drain quickly from recording workshop recaps, taking videos of friends, and looking up late-night songs.
<notice type="affiliate" id="jbl-flip-6" />
<notice type="affiliate" id="portable-charger" />
- **Emergency utility kit:** Pack a few safety pins, a travel sewing kit, and spare earring back stoppers in case of a wardrobe malfunction.
`,Pn=Object.freeze(Object.defineProperty({__proto__:null,default:On},Symbol.toStringTag,{value:"Module"})),Nn=`---
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
`,En=Object.freeze(Object.defineProperty({__proto__:null,default:Nn},Symbol.toStringTag,{value:"Module"})),jn=`---
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
`,Bn=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Ln=`---
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
`,Mn=Object.freeze(Object.defineProperty({__proto__:null,default:Ln},Symbol.toStringTag,{value:"Module"})),Fn=`---
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
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:Fn},Symbol.toStringTag,{value:"Module"})),Rn=`---
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
`,Wn=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),$n=`---
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
`,Un=Object.freeze(Object.defineProperty({__proto__:null,default:$n},Symbol.toStringTag,{value:"Module"})),qn=`---
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
`,zn=Object.freeze(Object.defineProperty({__proto__:null,default:qn},Symbol.toStringTag,{value:"Module"})),Hn=`---
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
`,Kn=Object.freeze(Object.defineProperty({__proto__:null,default:Hn},Symbol.toStringTag,{value:"Module"})),Gn=`---
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
`,Jn=Object.freeze(Object.defineProperty({__proto__:null,default:Gn},Symbol.toStringTag,{value:"Module"})),Vn=`---
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
`,Yn=Object.freeze(Object.defineProperty({__proto__:null,default:Vn},Symbol.toStringTag,{value:"Module"})),Qn=`---
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
`,Xn=Object.freeze(Object.defineProperty({__proto__:null,default:Qn},Symbol.toStringTag,{value:"Module"})),Zn=`---
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
`,es=Object.freeze(Object.defineProperty({__proto__:null,default:Zn},Symbol.toStringTag,{value:"Module"})),ts=`---
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
`,ns=Object.freeze(Object.defineProperty({__proto__:null,default:ts},Symbol.toStringTag,{value:"Module"})),ss=`---
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
`,is=Object.freeze(Object.defineProperty({__proto__:null,default:ss},Symbol.toStringTag,{value:"Module"})),os=`---
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
`,as=Object.freeze(Object.defineProperty({__proto__:null,default:os},Symbol.toStringTag,{value:"Module"})),rs=`---
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
`,ls=Object.freeze(Object.defineProperty({__proto__:null,default:rs},Symbol.toStringTag,{value:"Module"})),cs=`---
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
`,hs=Object.freeze(Object.defineProperty({__proto__:null,default:cs},Symbol.toStringTag,{value:"Module"})),ds=`---
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
`,us=Object.freeze(Object.defineProperty({__proto__:null,default:ds},Symbol.toStringTag,{value:"Module"})),fs=`---
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
`,ps=Object.freeze(Object.defineProperty({__proto__:null,default:fs},Symbol.toStringTag,{value:"Module"})),gs=`---
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
`,ms=Object.freeze(Object.defineProperty({__proto__:null,default:gs},Symbol.toStringTag,{value:"Module"})),ys=`---
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
`,bs=Object.freeze(Object.defineProperty({__proto__:null,default:ys},Symbol.toStringTag,{value:"Module"})),ws=`---
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
`,vs=Object.freeze(Object.defineProperty({__proto__:null,default:ws},Symbol.toStringTag,{value:"Module"})),ks=`---
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
`,Ss=Object.freeze(Object.defineProperty({__proto__:null,default:ks},Symbol.toStringTag,{value:"Module"})),_s=`---
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
`,Ts=Object.freeze(Object.defineProperty({__proto__:null,default:_s},Symbol.toStringTag,{value:"Module"})),As=`---
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
`,Cs=Object.freeze(Object.defineProperty({__proto__:null,default:As},Symbol.toStringTag,{value:"Module"})),Is=`---
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
`,Ds=Object.freeze(Object.defineProperty({__proto__:null,default:Is},Symbol.toStringTag,{value:"Module"})),Os=`---
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
`,Ps=Object.freeze(Object.defineProperty({__proto__:null,default:Os},Symbol.toStringTag,{value:"Module"})),Ns=`---
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
`,Es=Object.freeze(Object.defineProperty({__proto__:null,default:Ns},Symbol.toStringTag,{value:"Module"})),js=`---
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
`,Bs=Object.freeze(Object.defineProperty({__proto__:null,default:js},Symbol.toStringTag,{value:"Module"})),Ls=`---
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
`,Ms=Object.freeze(Object.defineProperty({__proto__:null,default:Ls},Symbol.toStringTag,{value:"Module"})),Fs=`---
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
`,xs=Object.freeze(Object.defineProperty({__proto__:null,default:Fs},Symbol.toStringTag,{value:"Module"})),Rs=`---
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
`,Ws=Object.freeze(Object.defineProperty({__proto__:null,default:Rs},Symbol.toStringTag,{value:"Module"})),$s=`---
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
`,Us=Object.freeze(Object.defineProperty({__proto__:null,default:$s},Symbol.toStringTag,{value:"Module"})),qs=`---
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
`,zs=Object.freeze(Object.defineProperty({__proto__:null,default:qs},Symbol.toStringTag,{value:"Module"})),Hs=`---
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
`,Ks=Object.freeze(Object.defineProperty({__proto__:null,default:Hs},Symbol.toStringTag,{value:"Module"})),Gs=`---
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
`,Js=Object.freeze(Object.defineProperty({__proto__:null,default:Gs},Symbol.toStringTag,{value:"Module"})),Vs=`---
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
`,Ys=Object.freeze(Object.defineProperty({__proto__:null,default:Vs},Symbol.toStringTag,{value:"Module"})),Qs=`---
title: "Stop Asking the LLM to Review Everything"
date: "2024-05-10"
author: "Ariel Anders"
category: "DevAI"
tags: ["DevOps", "AI", "Ollama", "GitHub Actions", "Playwright"]
excerpt: "A practical local AI review pipeline using GitHub Actions, Ollama, and Playwright. Not a replacement for human review — a way to make first-pass review more repeatable."
readTime: 14
status: "published"
---

The first version of my AI review workflow made the classic mistake: I asked the model to do everything.

It had to understand the repo, inspect the diff, infer the design system, read CI logs, and decide what mattered. Sometimes it worked. Often it produced a confident wall of feedback that was hard to trust.

The better pattern was smaller and more boring: collect the important pull request context first, then ask the model to review that prepared packet.

This article walks through the local review pipeline I use for BoomTick.blog: GitHub Actions collects the context, Ollama reviews it, structured findings decide what blocks the PR, and Playwright screenshots catch UI changes that normal tests miss.

It is not a fully autonomous engineer. It is a review assistant made from scripts, prompts, CI glue, and a few hard safety boundaries.

## What you will build

By the end of this walkthrough, you will understand how to build a small local review assistant that can:

- collect pull request context before calling an LLM
- send a focused prompt to an Ollama model
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

  Packet --> Ollama[Send packet to Ollama]
  Ollama --> Findings[Return structured findings]

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
- **Experimental** means it exists, but still needs manual setup, review, or judgment.
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
# Generic example — adjust command names to match your repo
python dev-tools/aggregate_pr_context.py \\
  --target-branch main \\
  --output .devai/review-context.md
\`\`\`

> **Implemented:** \`dev-tools/td_cli.py gh audit-pr <PR_NUMBER> --fetch\` fetches PR diffs, CI logs, and linked issue context into a structured review packet. \`dev-tools/aggregate-prs.sh\` handles batch aggregation.

The point is not that my aggregation command is special. The point is that the model should receive a curated artifact instead of wandering through the repo.

---

## 2. Keep the Ollama call boring

The Ollama part should be the least interesting part of the system.

A local model call is just an HTTP request. The quality comes from everything around it: the context packet, the review rules, the output schema, and the script that decides what to do with the result.

\`\`\`python
import requests
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "qwen2.5-coder:7b"

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
    OLLAMA_URL,
    json={
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
    },
    timeout=120,
)

response.raise_for_status()
print(response.json()["response"])
\`\`\`

This is intentionally boring. If this part feels magical, the pipeline is probably too hard to debug.

The model should not be responsible for knowing your repo's entire history. It should receive a bounded task, produce bounded output, and leave the final decision to deterministic code.

> **Implemented:** \`dev-tools/ollama_reviewer.py\` wraps a similar pattern using a \`qwen2.5-coder\`-derived model running via Ollama.

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

> **Experimental:** \`dev-tools/td_cli.py ai repair\` can be triggered when CI fails. A GitHub Actions workflow (\`jules-fix-trigger.yml\`) exists to initiate repair sessions. Treat the output as a suggestion — always review before merge.

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

> **Pattern:** Playwright visual regression is the architecture this repo is moving toward. The test runner config exists. Baseline screenshot generation and CI comparison are not yet fully automated — that is the next step.

---

## The smallest useful version

You do not need the whole pipeline to get value from this pattern.

The smallest useful version is just two steps:

1. Create a review context file.
2. Ask a local model to review that file.

Everything else — GitHub comments, review states, CI repair, screenshot analysis — can come later.

\`\`\`text
.devai/
  review-context.md
  review-result.json

dev-tools/
  aggregate_pr_context.py
  ollama_review.py
\`\`\`

\`\`\`bash
# Generic example — file names are adaptable
python dev-tools/aggregate_pr_context.py > .devai/review-context.md
python dev-tools/ollama_review.py .devai/review-context.md > .devai/review-result.json
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

That is the pattern I would copy first: not the exact scripts, not the exact prompts, and not even the local model. Start by shrinking the job.
`,Xs=Object.freeze(Object.defineProperty({__proto__:null,default:Qs},Symbol.toStringTag,{value:"Module"})),Zs=`---
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
`,ei=Object.freeze(Object.defineProperty({__proto__:null,default:Zs},Symbol.toStringTag,{value:"Module"})),ti=`---
type: event
title: Boogie by the Bay
date: '2026-10-08'
startDate: '2026-10-08'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: Experience the premier West Coast Swing competition and social weekend at San Francisco's waterfront Hyatt Regency SFO.
location: Hyatt Regency SFO
city: Burlingame, CA
region: NorCal
schedule: October 8 - 11, 2026
url: https://boogiebythebay.com/
heroImage: '/assets/events/boogie-by-the-bay-hero.svg'
imageAlt: 'Logo for Boogie by the Bay featuring a stylized San Francisco skyline and Golden Gate Bridge motif'
description: Hosted by The Next Generation Swing Dance Club, Boogie by the Bay is a cornerstone of the West Coast Swing community, known for its high-level "California style" competition and stunning 10-story atrium social hub.
whyAttending: >
  The highlight of the NorCal West Coast Swing calendar. The level of competition is exceptionally high, and the Sunday night show is always a must-watch.
theme:
  name: "Classic San Francisco / Flagship Weekend"
  label: "Polished NorCal Theme"
  description: >
    Boogie by the Bay should feel polished, layered, and practical for a major
    NorCal airport-hotel weekend: strong social dancing, competition rounds,
    chilly Bay Area evenings, and long nights in the ballroom.
  outfitIds:
    - norcal-gate-crop-hoodie
    - norcal-bestcal-tshirt
    - love-unisex-shirt
    - swimsuit
  accessoryIds:
    - visor
    - sunscreen
    - rave-fan
gear:
  outfitIds:
    - norcal-gate-crop-hoodie
    - norcal-bestcal-tshirt
    - love-unisex-shirt
    - swimsuit
  outfitDescription: "Polished pieces for the ballroom and a swimsuit for the outdoor hot tub."
  accessoryIds:
    - visor
    - sunscreen
    - rave-fan
  accessoryDescription: "Sun protection for the hot tub and fans for the ballroom."
  shoeIds:
    - bloch-grecian
    - suede-sheets
  shoeDescription: "Reliable footwear for the fast Hyatt ballroom floor."
  essentialIds:
    - loop-experience
    - mints
    - hand-sanitizer
  essentialDescription: "Essentials for a high-intensity competition weekend."
  travelIds:
    - compression-cubes
    - portable-charger
    - hanging-toiletry-bag
  travelDescription: "Compression packs are essential for flying into SFO."

earlyBirdDate: "2026-07-01"
registrationDeadline: "2026-10-04"
hotelCutoffDate: "2026-09-15"
packingReminderDate: "2026-10-01"

relatedEvents:
- swingtacular-the-galactic-open
- mission-city-swing
- jack-and-jill-orama
---

## Flagship weekend packing strategy

Boogie is less about a costume theme and more about showing up prepared for a polished, high-energy NorCal weekend. Prioritize reliable dance shoes, backup shoe maintenance, a portable charger, earplugs, and layers for the SFO/Burlingame weather shift. Since the Hyatt has an outdoor hot tub, don't forget to pack a swimsuit, sunscreen, and a visor.

### Airport Logistics
The hotel is located right next to San Francisco International Airport (SFO), making it extremely convenient for those flying in.
- **Shuttle:** The Hyatt Regency offers a free 24-hour shuttle to and from all SFO terminals.
- **Packing:** Because most attendees fly in, we highly recommend using compression packing cubes to fit your dance wardrobe into a carry-on.

### Hotel Layout
The Hyatt is massive. The ballroom is located on the ground floor, while the atrium (and its famous glass elevators) serves as the social hub. Boogie shares this venue with [Swingtacular](/events/swingtacular-the-galactic-open), so if you've attended one, you'll know the layout. Pro tip: Rooms facing the atrium can be loud during social dancing hours—request an exterior-facing room if you're a light sleeper.

### Hyatt Rewards Strategy
If you plan on attending multiple Hyatt-based events (like Boogie or Swingtacular), consider getting the Hyatt credit card. You can often use the annual free nights for these weekends.
- **Award Nights:** Search for award night availability separately from the room block.
- **Booking:** Make a separate reservation for your award nights. Typically, you can ask the front desk at check-in to consolidate these into a single stay so you don't have to move rooms.

### Weather
October in the Bay Area is usually mild, but Burlingame can be foggy and chilly in the evenings due to its proximity to the water. Bring a light jacket for walks to nearby restaurants.

### Ballroom Pacing
The floor is legendary—large, fast, and often crowded. The spotlight finals and late-night social dancing are major highlights of the weekend.

### Nearby Food
While the hotel restaurant (3Sixty) is convenient, there are several great options within walking distance or a short Uber ride in downtown Burlingame. Max's of Burlingame is a dancer favorite for late-night or pre-comp meals.
`,ni=Object.freeze(Object.defineProperty({__proto__:null,default:ti},Symbol.toStringTag,{value:"Module"})),si=`---
type: event
title: "Halloween Swing Thing"
date: "2026-10-29"
startDate: "2026-10-29"
author: "Ariel Anders, PhD"
category: "WSDC Registry Event"
excerpt: "Experience the West Coast Swing community's most creative festival in Costa Mesa, blending West Coast Swing competition with immersive Halloween carnival themes."
location: "Hilton Orange County/Costa Mesa"
city: "Costa Mesa"
region: "SoCal"
schedule: "October 29 - November 1, 2026"
url: "https://halloweenswingthing.com"
heroImage: "/assets/events/halloween-hero.svg"
imageAlt: "Halloween-themed graphic with cosmic nebula background and jack-o'-lantern silhouette for Halloween Swing Thing"
description: "Halloween Swing Thing reimagines the West Coast Swing weekend as a Halloween carnival. Hosted in Costa Mesa, it's known for merging high-level Jack & Jill rounds with elaborate group costumes, trick-or-treating, and immersive themed socials."
whyAttending: >
  I come back for the creativity. No other West Coast Swing event lets you hit a high-level semi-final and then immediately join a hotel-wide trick-or-treat route with the same crowd. The ballroom feels like a festival, not just a comp floor.

theme:
  name: "Halloween Carnival"
  label: "Halloween Theme"
  description: >
    The ballroom runs as a spooky carnival all weekend. Plan costumes that prioritize movement and partner safety, but expect everything from DIY to pro-level cosplay on the floor.

gear:
  outfitIds:
    - pumpkin-headbands
    - pumpkin-stickers
  outfitDescription: "Low-profile themed accessories that survive social dancing."
  accessoryIds:
    - rave-fan
  accessoryDescription: "Essential for staying cool in layered costumes."
  shoeIds:
    - bloch-grecian
    - suede-sheets
  shoeDescription: "Reliable social shoes, plus backups if costume pieces interfere."
  essentialIds:
    - liquid-iv
    - loop-experience
    - mints
  essentialDescription: "Hydration and ear protection for long carnival nights."
  travelIds:
    - compression-cubes
    - portable-charger
  travelDescription: "Compression for costume volume, power for late-night photos."

earlyBirdDate: "2026-08-01"
registrationDeadline: "2026-10-25"
hotelCutoffDate: "2026-10-01"
packingReminderDate: "2026-10-20"

relatedEvents:
- jack-and-jill-orama
---

Halloween Swing Thing sets itself apart by treating the whole weekend like a festival. The registry points are real, but so is the hotel-wide trick-or-treating, the carnival games in the lobby, and the group themes that take months to plan.

## Event highlights

### Costume Contest
The Saturday night costume contest drives most of the weekend energy. Expect individual entries, couple concepts, and huge friend-group themes that have been planned for months. Past years have included swing-inspired mashups of movie characters, superheroes, and original concepts built for movement.

Many dancers bring two versions: a full contest build for photos and a simplified dance version for social sets. If you only watch, the contest is still one of the best spectator events in the West Coast Swing community.

### Group Themes & Performances
A core part of the culture is groups coordinating matching costumes and short choreographed pieces. If you're attending with friends, lock your theme early — the hotel lobby turns into an impromptu photo studio all weekend.

### Social Dancing
The floor runs late and the DJ sets lean festive. Because people rotate costumes, you'll see everything from formalwear to full cosplay in the same late-night social. Bring multiple outfits so you can jump into themed sets without overheating or risking fragile pieces.

## Carnival atmosphere
### Venue notes
The Hilton Orange County/Costa Mesa provides a central hub for the festival. It is known for its spacious lobby and courtyard, which the event transforms into a carnival midway. Pro tip: The hotel is close to the South Coast Plaza area, offering plenty of dining options within a short rideshare distance.

The venue is fully dressed for Halloween. Common fixtures include carnival games, photo backdrops, specialty treats, and community-run hotel room trick-or-treating. The event strikes a balance between WSDC registry weekend and Halloween festival.

## Costume strategy

This is the event where wardrobe planning matters more than any other on the calendar. Boogie is about polished NorCal comp prep; Halloween is about creative logistics.

**Movement test before you pack:**
- Jump, squat, and spin in full costume
- Check for capes, wings, or props that catch partners
- Test sitting in elevators and ballroom chairs

**Danceability tiers:**
1. **Contest/Photo version**: Full build, may be fragile or warm
2. **Social version**: Breathable base layers, adhesive details like felt stickers, nothing that drags

**Costume maintenance:** Pack fashion tape, safety pins, and dedicated storage bags for delicate props. Ballrooms run hot while hallways stay cold, so bring a light layer for transitions.

## Photo opportunities

Halloween Swing Thing is one of the most photographed West Coast Swing weekends. Plan for group photos with your costume crew, shots at carnival setups, and action on the social floor. Take photos early in the evening before costumes get rumpled from dancing.

## Community tips

The event pulls dancers from across regions, so it's a strong weekend to meet new people. Even if you skip the contest, watch it, cheer, and join themed activities. The more you engage with the carnival side, the more the weekend stands out from a standard registry event.

## Quick checklist

### Before the event
- [ ] Register and book travel before hotel cutoff
- [ ] Lock costume concepts and test movement
- [ ] Coordinate group themes
- [ ] Pack dance-version backup outfits
- [ ] Confirm lodging — the block sells out

### During the event
- [ ] Attend the Saturday costume contest
- [ ] Explore carnival activities and trick-or-treating
- [ ] Capture early-evening photos
- [ ] Stay hydrated through costume changes
- [ ] Dance with new people between themed sets

### Don't miss
- Saturday night costume contest
- Hotel-wide trick-or-treating
- Group choreographed pieces
- Late-night themed socials
- Lobby photo meetups
`,ii=Object.freeze(Object.defineProperty({__proto__:null,default:si},Symbol.toStringTag,{value:"Module"})),oi=`---
type: event
title: "Jack & Jill O'Rama"
date: "2026-06-04"
startDate: "2026-06-04"
author: "Ariel Anders, PhD"
category: "WSDC Registry Event"
excerpt: "Experience the West Coast Swing community's ultimate party weekend in Southern California, featuring creative competitions and Disneyland-area social magic."
location: "Hyatt Regency OC"
city: "Garden Grove, CA"
region: "SoCal"
schedule: "June 4 - 8, 2026"
url: "https://jackandjillorama.com"
heroImage: "/assets/events/jjo-hero.svg"
imageAlt: "Jack & Jill O'Rama logo with rainbow pride arc and sparkles"
description: >
  Organized by Ben Morris, Jack & Jill O'Rama is a high-energy highlight of the West Coast Swing community, famous for its innovative competition formats and proximity to the Disney parks.
whyAttending: >
  I keep coming back to Jack & Jill O'Rama because it feels like a full-spectrum dance weekend: high-stakes rounds, late-night social magic, and that warm SoCal community buzz in every hallway. Every year Team NorCal BestCal brings a Rainbow theme for Pride Month, and honestly that playful, bold energy is exactly the vibe I want to bring to every finals watch party and every 2 a.m. social set.
theme:
  name: Rainbow
  label: NorCal Pride Theme
  description: >
    JJO coincides with Pride Month, and NorCal dancers represent their region with a massive rainbow presence. We lean into bright, expressive colors for every session. Mix bold layers and statement accessories that stand out in the hallway photos and on the dance floor.
  colors:
  - '#E40303'
  - '#FF8C00'
  - '#FFED00'
  - '#008026'
  - '#004DFF'
  - '#750787'
  outfitIds:
    - norcal-pride-gate-shirt
    - norcal-pride-bear-shirt
    - love-neon-switch-shirt
    - love-neon-lead-shirt
    - love-neon-follow-shirt
    - norcal-crop-top
  accessoryIds:
    - rainbow-fan
    - tripod
gear:
  outfitIds:
    - norcal-pride-gate-shirt
    - norcal-pride-bear-shirt
    - love-neon-switch-shirt
    - love-neon-lead-shirt
    - love-neon-follow-shirt
    - norcal-crop-top
  outfitDescription: "Bright, expressive pieces for the legendary Rainbow theme nights and high-visibility Glow nights."
  accessoryIds:
    - rainbow-fan
    - tripod
  accessoryDescription: "Rainbow fans for the heat and a tripod for filming your competition videos."
  shoeIds:
    - "bloch-grecian"
    - "suede-sheets"
  shoeDescription: "Trusted shoes for long hours on the high-energy SoCal floor."
  essentialIds:
    - "loop-experience"
    - "liquid-iv"
    - "hand-sanitizer"
  essentialDescription: "Proactive recovery and hygiene to keep you moving through the late-night magic."
  travelIds:
    - "compression-cubes"
    - "travel-bottles"
    - "hanging-toiletry-bag"
    - "portable-charger"
    - "mints"
  travelDescription: "Packing gear for a busy weekend near Disneyland."

earlyBirdDate: "2026-04-15"
registrationDeadline: "2026-05-31"
hotelCutoffDate: "2026-05-15"
packingReminderDate: "2026-05-25"

relatedEvents:
- swingtacular-the-galactic-open
- boogie-by-the-bay
---

## NorCal Representation & Rainbow Packing

JJO is where NorCal dancers truly represent. Because the event falls during Pride Month, we prioritize bright, high-visibility outfits that work for both the massive "RAINBOW’Rama" energy and the "GLOW’Rama" blacklight moments.

For Glow night, visibility is key. The **Love Neon** t-shirts (Lead/Follow/Switch) are made with safety yellow fabric, making them highly visible under blacklight so your partner and the judges can clearly see your movement.

### Capture Your Progress
With the level of competition so high at JJO, you'll definitely want videos of your heats. We've added a **compact tripod** to the gear list—it's essential for getting stable, usable footage of your rounds for later review.

### Disneyland-Area Logistics
- **Airport:** John Wayne Airport (SNA) is the closest and most convenient. Long Beach (LGB) and LAX are also options but expect longer drives.
- **Disneyland:** Many dancers stay an extra day to visit the parks for Disney Dancer Day. The hotel offers a shuttle to the Disney parks for a small fee.

### First-Timer Strategy
If this is your first JJO, prepare for the scale. The competitions move fast and there are often multiple ballrooms in use.
- **The App:** Download the event's scoring app to track your heat times in real-time.
- **Orientation:** Attend the newcomer orientation if offered—it's a great way to meet people and get your bearings.

### Schedule Pacing
The JJO schedule is packed. Workshops run all day, and competitions often go late into the evening. Don't feel pressured to do everything. Pick 2-3 \\"must-attend\\" workshops and save your energy for social dancing and your heats.

## NorCal BestCal Merch Picks

Browse the full collection at [https://boomtick.printful.me/](https://boomtick.printful.me/) for more styles. Bonus: use the [Printful referral link](https://www.printful.com/give-5-get-5/GZB6C4) for  off your order.
`,ai=Object.freeze(Object.defineProperty({__proto__:null,default:oi},Symbol.toStringTag,{value:"Module"})),ri=`---
type: event
title: "Mission City Swing"
date: "2026-05-01"
startDate: "2026-05-01"
author: "Ariel Anders, PhD"
category: "Event"
excerpt: "Join the South Bay's weekly West Coast Swing hub for leveled classes and social dancing every Wednesday."
imageAlt: "Mission City Swing logo featuring San Jose city silhouette and community focus"
location: "San Jose, CA"
city: "San Jose"
region: "NorCal"
schedule: "Every Wednesday"
url: "https://missioncityswing.com"
heroImage: ""
description: "A cornerstone of the NorCal dance community, offering top-tier instruction and a welcoming social environment every Wednesday."

whyAttending: >
  Mission City Swing is the heartbeat of the South Bay West Coast Swing community. Whether you're a beginner or a seasoned pro, the welcoming atmosphere and consistent quality of instruction make it a weekly must-visit.
theme:
  name: "Community Social"
  label: "Weekly Style"
  description: "Casual and comfortable styles for weekly workshops and social dancing."
  outfitIds:
  - sequin-bomber-jacket
  accessoryIds:
  - hand-sanitizer
gear:
  outfitIds: []
  outfitDescription: "Breathable social attire that moves with you."
  accessoryIds: []
  accessoryDescription: "Simple essentials for a mid-week dance night."
  shoeIds:
    - "dance-socks"
    - "suede-sheets"
  shoeDescription: "Versatile shoes for the South Bay wood floor."
  essentialIds:
    - "mints"
    - "hand-sanitizer"
    - "foam-roller"
  essentialDescription: "Quick hygiene and focus tools for social dancing."
  travelIds:
    - "portable-charger"
  travelDescription: "Daily carry items for a consistent weekly routine."

earlyBirdDate: ""
registrationDeadline: ""
hotelCutoffDate: ""
packingReminderDate: ""

relatedEvents:
- boogie-by-the-bay
- swingtacular-the-galactic-open
---

## Attendance Frequency
Wednesdays: I drop in for the points class and stay for the social dance.

Sundays: I occasionally use the afternoon practice space to drill concepts at my own pace.

## Review: Mission City Swing
**Where My West Coast Swing Journey Began**

I started my West Coast Swing journey at Mission City Swing, and it remains the anchor of my weekly routine. I completed their entire core curriculum—spanning Levels 1 through 4—and even auditioned into the upper tiers as both a leader and a follower. These days, I skip the regular lessons, but I still pop into the beginner class to support the new dancers before jumping into the main event.

*   **Unmatched Frequency:** I rely on MCS for consistency. They host a high-quality venue every single Wednesday night, alongside dedicated Sunday afternoon practice sessions. Having this predictable schedule makes keeping my skills sharp effortless.
*   **Genuine Community:** This non-profit, community-run space focuses entirely on dancer growth and inclusion. I built my foundational dance network here. The welcoming atmosphere creates a zero-ego space where local regulars and visiting dancers actually focus on the connection.
*   **Inspirational Music:** The DJs consistently deliver. They spin a brilliant mix of contemporary tracks, deep blues, and structural rhythm changes. This music actually drives creative expression and solid connection, rather than just repeating predictable radio hits.

**The Advanced Track**
For dancers looking to push their technique, MCS brings in champion instructors like Melissa Rutz to teach the specialized "Points Class." You need at least one WSDC point to attend, which keeps the room high-density, fast-paced, and filled with solid social dancers.

Whether you are stepping into your first leveled series or looking to train with top-tier pros, MCS delivers the gold standard for weekly West Coast Swing in the Bay Area.

## Pro Tips

- **Arrival Time:** Lessons start promptly. Arriving 10 minutes early gives you time to change your shoes and catch up with friends.
- **Social Dancing:** The floor is usually busiest right after the lessons. If you prefer more space, stay for the later sets.
- **Community:** Don't be afraid to ask people to dance! It's one of the friendliest venues in the Bay Area.
`,li=Object.freeze(Object.defineProperty({__proto__:null,default:ri},Symbol.toStringTag,{value:"Module"})),ci=`---
type: event
title: Phoenix 4th of July
date: '2026-07-02'
startDate: '2026-07-02'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: Experience a high-energy summer tradition in Scottsdale, featuring legendary resort pool parties and top-tier West Coast Swing.
location: JW Marriott Scottsdale Camelback Inn Resort & Spa
city: Scottsdale, AZ
region: Southwest
schedule: July 2 - 5, 2026
url: https://phx4th.com/
heroImage: '/assets/events/phoenix-4th-of-july-hero.svg'
imageAlt: 'Phoenix 4th of July logo with patriotic colors and resort theme'
description: A summer highlight famous for legendary resort pool parties and top-tier West Coast Swing competition in Scottsdale.
whyAttending: >
  The combination of a world-class resort and world-class dancing is unbeatable. The pool parties are a unique West Coast Swing experience that you have to see to believe.
theme:
  name: "Red, White & Blue / Resort Weekend"
  label: "Patriotic Pool + Ballroom Theme"
  description: >
    Keep this guide focused on Phoenix heat, resort walking, pool-party prep,
    fireworks, and lightweight dance outfits. Think Americana, stars, and stripes
    with high-performance, breathable fabrics.
  outfitIds:
    - norcal-bear-tank
    - love-unisex-shirt
    - sports-crop-tops
  accessoryIds:
    - rave-fan
    - neck-fan
    - pride-sunglasses
gear:
  outfitIds:
    - norcal-bear-tank
    - love-unisex-shirt
    - sports-crop-tops
  outfitDescription: "Lightweight, vacation-ready styles for the desert heat."
  accessoryIds:
    - rave-fan
    - neck-fan
    - pride-sunglasses
  accessoryDescription: "Essential cooling and sun protection for the legendary pool party."
  shoeIds:
    - bloch-grecian
  shoeDescription: "Reliable soles for the ballroom floors."
  essentialIds:
    - liquid-iv
    - dry-shampoo
    - loop-experience
  essentialDescription: "Heat-management and hydration essentials for Phoenix in July."
  travelIds:
    - travel-bottles
    - hanging-toiletry-bag
    - portable-charger
  travelDescription: "Pool-side and resort travel gear."

earlyBirdDate: "2026-04-01"
registrationDeadline: "2026-06-25"
hotelCutoffDate: "2026-06-01"
packingReminderDate: "2026-06-28"

relatedEvents:
- jack-and-jill-orama
---

## Heat and resort logistics

This is Phoenix in July—temperatures will be well over 100°F. The guide here is practical: stay on top of your hydration, keep sunscreen ready for the pool parties, and have a plan for walking around the massive resort grounds. You can easily spend the entire weekend without leaving the AC if you choose, but the pool-party fireworks are a highlight.

Consider electrolyte packets, a portable fan, and high-utility travel gear for the pool and resort parts of the weekend.

### Resort Layout
The resort is expansive. Give yourself 10-15 minutes to walk from your room to the ballroom. The pool area is central, making it easy to pop back and forth between a swim and a workshop.

### Pool Party Packing
- **Water-safe gear:** Bring swimsuits that stay put.
- **Cover-ups:** For walking through the resort lobby to/from the pool.
- **Dry Bag:** To keep your phone and room key safe while you're near the water.

### Hydration & Nutrition
The resort has several high-end restaurants, but they can be pricey. There is a Starbucks on-site for your caffeine fix, and many dancers order grocery delivery for snacks and water to keep in their rooms.
`,hi=Object.freeze(Object.defineProperty({__proto__:null,default:ci},Symbol.toStringTag,{value:"Module"})),di=`---
type: event
draft: true
title: Sample Event Guide
imageAlt: "Sample event guide hero placeholder"
date: '2026-10-01'
startDate: '2026-10-01'
author: Jules Agent
category: Verification Event
excerpt: "Experience a fully populated sample event for schema and rendering verification."
location: Test Arena
city: San Francisco, CA
region: NorCal
schedule: October 1 - 4, 2026
url: https://example.com/sample-event
heroImage: '/assets/events/jjo-hero.svg'
description: This description field maps to the Travel & Venue Notes section.
whyAttending: >
  This whyAttending field provides the main descriptive copy for the event hero. It highlights the unique value of attending this specific event.
theme:
  name: Rainbow Paradise
  label: Rainbow Theme
  description: Vibrant colors and pride vibes for the big weekend.
  colors:
  - '#FF0000'
  - '#FF7F00'
  - '#FFFF00'
  - '#00FF00'
  - '#0000FF'
  - '#4B0082'
  - '#8B00FF'
  outfitIds:
    - "rainbow-bustle"
    - "rainbow-sequin-bomber-jacket"
  accessoryIds:
  - rainbow-earrings
  - pride-sunglasses
  - rainbow-bob-wig
  - led-scrunchies
gear:
  outfitIds:
    - "rainbow-bustle"
    - "rainbow-sequin-bomber-jacket"
  outfitDescription: "Statement pieces for the main event and social dancing."
  accessoryIds:
  - holographic-rave-fan
  accessoryDescription: Pop of color and functional flair to keep you cool.
  shoeIds:
  - bloch-grecian
  - dance-socks
  shoeDescription: Trusted footwear for long hours on the floor.
  essentialIds:
  - loop-experience
  - loop-quiet
  essentialDescription: Protect your hearing without missing the music.
  travelIds:
  - compression-cubes
  - travel-bottles
  - portable-steamer
  travelDescription: Packing essentials to keep your gear organized and fresh.
earlyBirdDate: '2026-08-15'
registrationDeadline: '2026-09-20'
hotelCutoffDate: '2026-09-10'
packingReminderDate: '2026-09-25'
relatedEvents: []
---

# Sample Event Notes

This is the markdown body content which renders in the Notes section of the event guide.

## Subheading

- Bullet point 1
- Bullet point 2
`,ui=Object.freeze(Object.defineProperty({__proto__:null,default:di},Symbol.toStringTag,{value:"Module"})),fi=`---
type: event
title: SOswing
date: '2026-05-14'
startDate: '2026-05-14'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: Experience the West Coast Swing community's most welcoming, community-first weekend in the heart of Southern Oregon's beautiful Ashland.
location: Ashland Hills Hotel & Suites
city: Ashland, OR
region: Pacific Northwest
schedule: May 14 - 17, 2026
url: https://soswing.com
heroImage: '/assets/events/soswing-hero.svg'
imageAlt: 'SOSwing logo featuring Ashland scenery and retro-chic styling'
bestFor: ["Intimate settings", "First-time competitors", "Road-trip vibe"]
description: Known for its warm "Westie" hospitality, SOswing provides an intimate Pacific Northwest setting for leveled workshops and social dancing at the retro-chic Ashland Hills Hotel.
whyAttending: >
  SOswing has the most welcoming, community-first atmosphere in the Pacific Northwest. It's a perfect event to focus on dancing without the pressure of a huge field.
theme:
  name: "PNW Community Weekend"
  label: "Ashland / Road Trip Theme"
  description: >
    SOswing should feel less like a costume weekend and more like a warm,
    community-focused Oregon dance trip: comfortable layers, practical packing,
    and travel gear for a smaller regional event.
  outfitIds:
    - love-unisex-shirt
    - norcal-bestcal-tshirt
    - womens-long-zip-hoodie
  accessoryIds:
    - rave-fan
    - neck-fan
gear:
  outfitIds:
    - love-unisex-shirt
    - norcal-bestcal-tshirt
    - womens-long-zip-hoodie
  outfitDescription: "Comfortable and expressive pieces for a community-focused weekend."
  accessoryIds:
    - rave-fan
    - neck-fan
  accessoryDescription: "Low-profile cooling for the intimate hotel ballroom."
  shoeIds:
    - bloch-grecian
  shoeDescription: "Reliable footwear for workshops and community sets."
  essentialIds:
    - loop-experience
    - mints
    - hand-sanitizer
  essentialDescription: "Standard recovery and hygiene for the relaxed Pacific Northwest pace."
  travelIds:
    - compression-cubes
    - travel-pillow
    - portable-charger
    - hanging-toiletry-bag
  travelDescription: "Road-trip or regional flight essentials for Southern Oregon."

earlyBirdDate: "2026-03-01"
registrationDeadline: "2026-05-10"
hotelCutoffDate: "2026-04-20"
packingReminderDate: "2026-05-07"

relatedEvents:
- jack-and-jill-orama
- swingtacular-the-galactic-open
- boogie-by-the-bay
---

SOswing is Southern Oregon's boutique West Coast Swing weekend, built around community hospitality and a relaxed Pacific Northwest pace.

## Ashland travel notes

Ashland is beautiful, small, and surprisingly walkable from the hotel. The Ashland Hills Hotel & Suites has a retro-chic vibe that fits the community feel perfectly. Book early; the room block is limited and often sells out months in advance.

This is a regional trip guide, so prioritize practical travel: Medford (MFR) airport planning, rental cars for exploring Southern Oregon, and compact packing for a smaller venue. The event feels more intimate than the huge ballroom weekends, so the product picks focus on comfort and high-utility travel gear.

### Venue & Travel
- **Venue:** Ashland Hills Hotel & Suites. It’s slightly outside the main downtown area, but very comfortable with a great pool.
- **Flying in:** Medford (MFR) is the closest airport (about 20 mins away). Rental cars are recommended if you want to explore downtown Ashland.
- **Driving:** A beautiful drive from Portland (5 hrs) or San Francisco (6 hrs).

### Pro Tips
- **Groceries:** The **Ashland Co-op** is highly recommended and has great groceries. There is also a **Safeway** within a 10-minute walk of the hotel, which is very convenient for snacks and supplies.
- **Transport Tip:** If you are traveling back to the airport for a very early flight and cannot get a Lyft or Uber (service is not as supported in Ashland), **use a taxi**. Arrange this in advance.
- **Late Night:** The social dancing goes late, and the atmosphere is very intimate. It's a great place to get dances with people you might usually be intimidated by at larger events.
- **Food:** There are great restaurants in downtown Ashland, but the hotel restaurant is also solid for a quick bite between workshops.
`,pi=Object.freeze(Object.defineProperty({__proto__:null,default:fi},Symbol.toStringTag,{value:"Module"})),gi=`---
type: event
title: "Swingtacular: The Galactic Open"
date: '2026-08-06'
startDate: '2026-08-06'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: Experience the West Coast Swing community's premier sci-fi themed adventure in the San Francisco Bay Area, featuring high production values and immersive storytelling.
location: Hyatt Regency SFO
city: Burlingame, CA
region: NorCal
schedule: August 6 - 9, 2026
url: https://swingtacular.com/
heroImage: '/assets/events/swingtacular-hero.svg'
imageAlt: 'Swingtacular Galactic Open logo with space and sci-fi motifs'
description: Known for its "Galactic" theme and world-class production, Swingtacular blends top-tier West Coast Swing competition with a unique, story-driven atmosphere at the Hyatt Regency SFO.
whyAttending: >
  There is no other event like Swingtacular. The sci-fi theme is fully embraced, and the energy in the ballroom is truly "out of this world." The event is known for leaning hard into production, lighting, and theme.
theme:
  name: "Alien / Galactic / Nerd"
  label: "Space & Nerd Themes"
  description: >
    Swingtacular's themes should lean metallic, neon, futuristic, and 'nerdy.'
    Prioritize items that read well in a dark ballroom without restricting movement.
  outfitIds:
    - green-bodysuit
    - nerd-set
    - reflective-crop-tops
    - sequin-bomber-jacket
  accessoryIds:
    - alien-mask
    - rave-fan
gear:
  outfitIds:
    - green-bodysuit
    - nerd-set
    - reflective-crop-tops
    - sequin-bomber-jacket
  outfitDescription: "Alien bodysuits for 'Dress to Impress', nerd sets for Nerd Night, and reflective pieces for the ballroom."
  accessoryIds:
    - alien-mask
    - rave-fan
  accessoryDescription: "Alien masks for grand entrances and futuristic fans for cooling."
  shoeIds:
    - bloch-grecian
  shoeDescription: "Reliable footwear for the slick Hyatt Regency SFO ballroom floor."
  essentialIds:
    - loop-experience
    - mints
    - listerine-tabs
  essentialDescription: "Essentials for a high-intensity weekend in the Bay Area."
  travelIds:
    - compression-cubes
    - portable-steamer
    - portable-charger
  travelDescription: "Organized packing for your galactic mission."

earlyBirdDate: "2026-05-01"
registrationDeadline: "2026-08-02"
hotelCutoffDate: "2026-07-15"
packingReminderDate: "2026-08-01"

relatedEvents:
- boogie-by-the-bay
- jack-and-jill-orama
- phoenix-4th-of-july
---

## Galactic & Nerd Theme notes

This is the event where metallics, neons, and futuristic accessories make sense.
- **Nerd Night:** A classic Swingtacular tradition. Pack a **nerd set** with glasses and suspenders for a quick and easy costume that doesn't restrict your dancing.
- **Dress to Impress / Alien Theme:** For the big theme night, a **green bodysuit** or metallic reflective gear is the way to go. If you're going all out, an **alien mask** makes for a great grand entrance or hallway photo (just remember to swap it for something more breathable before hitting the social floor!).

Keep all costume pieces dance-safe: no sharp edges, no loose LED strands, and nothing that restricts connection or floorcraft.

## What to pack for the Hyatt Regency SFO

Swingtacular is an airport-hotel event, so the useful gear is practical: a portable charger for long days, packing cubes to keep theme outfits organized, and a steamer for those metallic fabrics. High-quality earplugs are a must; the event is known for its high-production sound and lighting.

### Production & Show Notes
The Saturday night shows are high-production events with professional lighting, sound, and staging. Get to the ballroom early to secure a good seat—it's often standing room only for the showcase.

### Burlingame/SFO Logistics
- **Transport:** Use the free Hyatt SFO shuttle if flying in.
- **Food:** Downtown Burlingame is a short Uber ride away and offers fantastic dining options (Max's is a dancer favorite).
- **Hotel Hub:** The atrium is the place to be for late-night social energy and catching up with friends between workshops.
`,mi=Object.freeze(Object.defineProperty({__proto__:null,default:gi},Symbol.toStringTag,{value:"Module"})),yi=`---
type: event
title: "Weekly Classes & Local Dances"
imageAlt: "Stylized map and calendar icons representing local West Coast Swing dance communities"
date: "2024-01-01"
startDate: "2024-01-01"
author: "Ariel Anders, PhD"
category: "Dance"
excerpt: "Find local weekly classes, socials, and practice spaces in your area to build consistency."
location: "Local Venues"
city: "Various Cities"
region: "Global"
schedule: "Weekly / Leveled Series"
url: ""
heroImage: ""
description: "Build consistency and rhythm by finding local weekly classes, socials, and practice spaces in your area."

whyAttending: >
  Weekly classes are the foundation of any dancer's growth, offering a consistent environment to hone your skills, learn new concepts, and connect with your local community.
theme:
  name: "Casual Style"
  label: "Weekly Social"
  description: "Casual and comfortable styles for weekly classes and social dancing."
  outfitIds:
  - sequin-bomber-jacket
  accessoryIds:
  - hand-sanitizer
gear:
  outfitIds: []
  outfitDescription: "Comfortable, breathable social attire suitable for class and social dancing."
  accessoryIds: []
  accessoryDescription: "Compact social essentials for weekly dance nights."
  shoeIds:
    - "dance-socks"
    - "suede-sheets"
  shoeDescription: "Comfortable shoes with suede soles or dance socks for wood floors."
  essentialIds:
    - "mints"
    - "hand-sanitizer"
    - "foam-roller"
  essentialDescription: "Standard hygiene, focus, and hydration for local weekly socials."
  travelIds:
    - "portable-charger"
  travelDescription: "Commuter-friendly organization for weekly dance nights."

relatedEvents:
- boogie-by-the-bay
- mission-city-swing
---

While this list is incomplete, it serves as a great starting point for tracking down local communities, practices, and events across different regions. Here are some of the best regional West Coast Swing event lists and calendars to help you get out on the floor:

## Pacific Northwest (PNW)
*   **[Seattle West Coast Swing Calendar](https://seattleswingdanceclub.com/seattlewcscalendar):** Run by the Seattle Swing Dance Club, this tracks major weekenders and local dances across Washington, Oregon, and Idaho.
*   **Portland West Coast Swing Events:** Frequently updated community tracking for social dances in the Portland area.

## Northeast & Mid-Atlantic
*   **[NYCWest Coast Swing Comprehensive Calendar](https://www.nycwcs.com/):** An all-inclusive dashboard for local practices, pop-ups, and regional workshops in the New York City tri-state area.
*   **[Jersey Westies Calendar](https://jerseywesties.com/):** A dedicated calendar tracking weekly lessons, pop-up parties, and social events across New Jersey.
*   **[UniversityCity Swing Local List](https://www.ucswing.com/philadelphia-west-coast-swing-events):** The go-to resource for Philadelphia and surrounding driving-distance weekenders.

## Midwest
*   **[Madison West Coast Swing Club Directory](https://mwcsc.org/dance-events/dance-conventions/):** Centralizes convention tracking, weekenders, and local dances across Wisconsin, Minnesota, and Illinois.
*   **[West Coast Swing Chicago](https://www.westcoastswingonline.com/west-coast-swing-chicago/):** The primary aggregator group used to track regional events, guest intensives, and weekly schedules across the Chicagoland area.

## Southern California (SoCal)
*   **[West Coast Swing San Diego](https://westcoastswingsandiego.com/):** A dedicated local aggregator tracking regional parties and workshops. The scene features regular intensives and weekly social dances driven heavily by champion dancers like Parker Dearborn. You can also connect directly via the [Swing with Parker Facebook Group](https://www.facebook.com/groups/775454775799778/) to track his specific weekly classes, Project Swing socials, and OGSD pop-ups. [1, 2, 3, 4, 5, 6]

## Global & National Directories
If you are traveling outside these pockets or looking for major multi-day weekenders, use these broader aggregators:

*   **[Your Dance Buddy Calendar](https://www.yourdancebuddy.com/):** An interactive global database focused strictly on West Coast Swing that allows you to filter by social-only events versus WSDC Registry Competitions.
*   **[Dance Place Event Directory](https://www.westcoastswingonline.com/west-coast-swing-events/):** A highly searchable worldwide event platform featuring regional filters and travel apps.
*   **[World Swing Dance Council Event List](https://www.worldsdc.com/events/):** The official global standard list for registry events if you are planning travel around official Jack & Jill points.

---
[1] [https://westcoastswingsandiego.com](https://westcoastswingsandiego.com/calendar/105/)
[2] [https://sdwestie.com](https://sdwestie.com/community/)
[3] [https://csdhof.com](https://csdhof.com/hof-inductees/parker-dearborn-2)
[4] [https://www.facebook.com](https://www.facebook.com/groups/wcssandiego/posts/10163898404101999/)
[5] [https://www.facebook.com](https://www.facebook.com/groups/775454775799778/)
[6] [https://www.facebook.com](https://www.facebook.com/groups/168408877185/)
[7] [https://www.facebook.com](https://www.facebook.com/westcoastswingsandiego/)
[8] https://westcoastswingsandiego.com
`,bi=Object.freeze(Object.defineProperty({__proto__:null,default:yi},Symbol.toStringTag,{value:"Module"})),wi=`---
deprecated: true
type: event
imageAlt: "Wild Wild Westie logo featuring Texas-inspired graphics and high-energy competition theme"
title: Wild Wild Westie
date: '2026-07-02'
startDate: '2026-07-02'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: "Experience the West Coast Swing community's most competitive 4th of July weekend at the Hyatt Regency DFW, featuring legendary late-night socials."
location: Hyatt Regency DFW
city: Dallas, TX
region: South
schedule: July 2 - 5, 2026
url: https://wildwildwestie.com/
heroImage: '/assets/events/wild-wild-westie-hero.svg'
description: Wild Wild Westie (WWW) is one of the most competitive and high-energy events in the West Coast Swing community. Held over the 4th of July weekend, it attracts top dancers from across the globe for intense competitions and legendary late-night social dancing.
whyAttending: >
  If you love competition, WWW is the place to be. The energy in the ballroom is electric, and the level of talent in the Jack & Jills is incredible.
theme:
  name: "Texas Spirit / Wild West"
  label: "Wild West Theme"
  description: >
    Keep the styling Western-inspired but danceable: denim, bold layers,
    breathable tops, and accessories that will not interfere with partner
    connection.
  outfitIds:
    - war-eagle-shirt
    - love-unisex-shirt
  accessoryIds:
    - rave-fan
    - electric-fan
gear:
  outfitIds:
    - war-eagle-shirt
    - love-unisex-shirt
  outfitDescription: "Breathable pieces that handle the high-energy Texas vibe."
  accessoryIds:
    - rave-fan
    - electric-fan
  accessoryDescription: "High-power cooling for the high-energy ballroom floor."
  shoeIds:
    - bloch-grecian
    - suede-sheets
  shoeDescription: "The Hyatt Regency DFW ballroom floor is fantastic but can be fast."
  essentialIds:
    - liquid-iv
    - loop-experience
    - mints
  essentialDescription: "Recovery and maintenance for an intense competition weekend."
  travelIds:
    - compression-cubes
    - travel-bottles
    - portable-charger
  travelDescription: "Travel gear for a major convention weekend."

earlyBirdDate: "2026-03-15"
registrationDeadline: "2026-06-28"
hotelCutoffDate: "2026-06-10"
packingReminderDate: "2026-06-25"

relatedEvents:
- phoenix-4th-of-july
- swingtacular-the-galactic-open
- jack-and-jill-orama
banner: "This event is not running in 2026. See related events below."
---

## Western theme notes

While our current product selection doesn't include specialized Western dance apparel, this is the perfect weekend to break out your own Western-inspired pieces like denim, bandanas, or boots for hallway photos. For the social floor, stick to breathable pieces that handle the high-energy Texas vibe. Keep Western boots for photos and use proper dance shoes for social dancing to ensure safety and floor compliance.

### Dallas Airport Logistics
- **DFW Airport:** About 25-30 minutes away. This is the primary hub for American Airlines and offers the most flight options.
- **Dallas Love Field (DAL):** About 15 minutes away. This is the primary hub for Southwest Airlines.
- **Transport:** Both airports are easily accessible via Uber/Lyft. DART Orange Line runs to DFW Airport Station; use hotel shuttle or rideshare from there.

### Hotel-Room-Block Urgency
The WWW room block at the Hyatt Regency DFW is notorious for selling out within minutes of being released. Follow the event's social media closely and be ready to book the second the link goes live.

### Summer Heat Notes
Texas in July is brutally hot. Luckily, the Hyatt is large and fully climate-controlled. You can easily spend the entire weekend without leaving the AC. If you do go outside, be prepared for intense humidity. Even though you're indoors, the Dallas summer heat and intense dancing mean it is useful to pack hydration support and portable fans.

### Comp/Social Energy
The competition field at WWW is deep. Jack & Jill heats can have many couples in certain divisions. The social dancing energy is equally intense, peaking around 2:00 AM and often continuing until the sun comes up over the Dallas skyline.
`,vi=Object.freeze(Object.defineProperty({__proto__:null,default:wi},Symbol.toStringTag,{value:"Module"})),it=Symbol.for("yaml.alias"),Xe=Symbol.for("yaml.document"),H=Symbol.for("yaml.map"),Et=Symbol.for("yaml.pair"),R=Symbol.for("yaml.scalar"),ae=Symbol.for("yaml.seq"),M=Symbol.for("yaml.node.type"),re=n=>!!n&&typeof n=="object"&&n[M]===it,Le=n=>!!n&&typeof n=="object"&&n[M]===Xe,be=n=>!!n&&typeof n=="object"&&n[M]===H,O=n=>!!n&&typeof n=="object"&&n[M]===Et,C=n=>!!n&&typeof n=="object"&&n[M]===R,we=n=>!!n&&typeof n=="object"&&n[M]===ae;function I(n){if(n&&typeof n=="object")switch(n[M]){case H:case ae:return!0}return!1}function D(n){if(n&&typeof n=="object")switch(n[M]){case it:case H:case R:case ae:return!0}return!1}const jt=n=>(C(n)||I(n))&&!!n.anchor,K=Symbol("break visit"),ki=Symbol("skip children"),pe=Symbol("remove node");function le(n,e){const t=Si(e);Le(n)?Z(null,n.contents,t,Object.freeze([n]))===pe&&(n.contents=null):Z(null,n,t,Object.freeze([]))}le.BREAK=K;le.SKIP=ki;le.REMOVE=pe;function Z(n,e,t,s){const i=_i(n,e,t,s);if(D(i)||O(i))return Ti(n,s,i),Z(n,i,t,s);if(typeof i!="symbol"){if(I(e)){s=Object.freeze(s.concat(e));for(let a=0;a<e.items.length;++a){const o=Z(a,e.items[a],t,s);if(typeof o=="number")a=o-1;else{if(o===K)return K;o===pe&&(e.items.splice(a,1),a-=1)}}}else if(O(e)){s=Object.freeze(s.concat(e));const a=Z("key",e.key,t,s);if(a===K)return K;a===pe&&(e.key=null);const o=Z("value",e.value,t,s);if(o===K)return K;o===pe&&(e.value=null)}}return i}function Si(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function _i(n,e,t,s){if(typeof t=="function")return t(n,e,s);if(be(e))return t.Map?.(n,e,s);if(we(e))return t.Seq?.(n,e,s);if(O(e))return t.Pair?.(n,e,s);if(C(e))return t.Scalar?.(n,e,s);if(re(e))return t.Alias?.(n,e,s)}function Ti(n,e,t){const s=e[e.length-1];if(I(s))s.items[n]=t;else if(O(s))n==="key"?s.key=t:s.value=t;else if(Le(s))s.contents=t;else{const i=re(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Ai={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Ci=n=>n.replace(/[!,[\]{}]/g,e=>Ai[e]);class E{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},E.defaultYaml,e),this.tags=Object.assign({},E.defaultTags,t)}clone(){const e=new E(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new E(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:E.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},E.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:E.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},E.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[a,o]=s;return this.tags[a]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=s;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const o=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const a=this.tags[s];if(a)try{return a+decodeURIComponent(i)}catch(o){return t(String(o)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Ci(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&D(e.contents)){const a={};le(e.contents,(o,r)=>{D(r)&&r.tag&&(a[r.tag]=!0)}),i=Object.keys(a)}else i=[];for(const[a,o]of s)a==="!!"&&o==="tag:yaml.org,2002:"||(!e||i.some(r=>r.startsWith(o)))&&t.push(`%TAG ${a} ${o}`);return t.join(`
`)}}E.defaultYaml={explicit:!1,version:"1.2"};E.defaultTags={"!!":"tag:yaml.org,2002:"};function Bt(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Lt(n){const e=new Set;return le(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Mt(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Ii(n,e){const t=[],s=new Map;let i=null;return{onAnchor:a=>{t.push(a),i??(i=Lt(n));const o=Mt(e,i);return i.add(o),o},setAnchors:()=>{for(const a of t){const o=s.get(a);if(typeof o=="object"&&o.anchor&&(C(o.node)||I(o.node)))o.node.anchor=o.anchor;else{const r=new Error("Failed to resolve repeated object (this should not happen)");throw r.source=a,r}}},sourceObjects:s}}function ee(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,a=s.length;i<a;++i){const o=s[i],r=ee(n,s,String(i),o);r===void 0?delete s[i]:r!==o&&(s[i]=r)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const a=s.get(i),o=ee(n,s,i,a);o===void 0?s.delete(i):o!==a&&s.set(i,o)}else if(s instanceof Set)for(const i of Array.from(s)){const a=ee(n,s,i,i);a===void 0?s.delete(i):a!==i&&(s.delete(i),s.add(a))}else for(const[i,a]of Object.entries(s)){const o=ee(n,s,i,a);o===void 0?delete s[i]:o!==a&&(s[i]=o)}return n.call(e,t,s)}function L(n,e,t){if(Array.isArray(n))return n.map((s,i)=>L(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!jt(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=a=>{s.res=a,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}class ot{constructor(e){Object.defineProperty(this,M,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:a}={}){if(!Le(e))throw new TypeError("A document argument is required");const o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},r=L(this,"",o);if(typeof i=="function")for(const{count:l,res:c}of o.anchors.values())i(c,l);return typeof a=="function"?ee(a,{"":r},"",r):r}}class at extends ot{constructor(e){super(it),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError("Alias resolution is disabled");let s;t?.aliasResolveCache?s=t.aliasResolveCache:(s=[],le(e,{Node:(a,o)=>{(re(o)||jt(o))&&s.push(o)}}),t&&(t.aliasResolveCache=s));let i;for(const a of s){if(a===this)break;a.anchor===this.source&&(i=a)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:a}=t,o=this.resolve(i,t);if(!o){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let r=s.get(o);if(r||(L(o,null,t),r=s.get(o)),r?.res===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(a>=0&&(r.count+=1,r.aliasCount===0&&(r.aliasCount=Oe(i,o,s)),r.count*r.aliasCount>a)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return r.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Bt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${i} `}return i}}function Oe(n,e,t){if(re(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(I(e)){let s=0;for(const i of e.items){const a=Oe(n,i,t);a>s&&(s=a)}return s}else if(O(e)){const s=Oe(n,e.key,t),i=Oe(n,e.value,t);return Math.max(s,i)}return 1}const Ft=n=>!n||typeof n!="function"&&typeof n!="object";class _ extends ot{constructor(e){super(R),this.value=e}toJSON(e,t){return t?.keep?this.value:L(this.value,e,t)}toString(){return String(this.value)}}_.BLOCK_FOLDED="BLOCK_FOLDED";_.BLOCK_LITERAL="BLOCK_LITERAL";_.PLAIN="PLAIN";_.QUOTE_DOUBLE="QUOTE_DOUBLE";_.QUOTE_SINGLE="QUOTE_SINGLE";const Di="tag:yaml.org,2002:";function Oi(n,e,t){if(e){const s=t.filter(a=>a.tag===e),i=s.find(a=>!a.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>s.identify?.(n)&&!s.format)}function me(n,e,t){if(Le(n)&&(n=n.contents),D(n))return n;if(O(n)){const h=t.schema[H].createNode?.(t.schema,null,t);return h.items.push(n),h}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:a,schema:o,sourceObjects:r}=t;let l;if(s&&n&&typeof n=="object"){if(l=r.get(n),l)return l.anchor??(l.anchor=i(n)),new at(l.anchor);l={anchor:null,node:null},r.set(n,l)}e?.startsWith("!!")&&(e=Di+e.slice(2));let c=Oi(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const h=new _(n);return l&&(l.node=h),h}c=n instanceof Map?o[H]:Symbol.iterator in Object(n)?o[ae]:o[H]}a&&(a(c),delete t.onTagObj);const f=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new _(n);return e?f.tag=e:c.default||(f.tag=c.tag),l&&(l.node=f),f}function Ee(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const a=e[i];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const o=[];o[a]=s,s=o}else s=new Map([[a,s]])}return me(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const ue=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class xt extends ot{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>D(s)||O(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(ue(e))this.add(t);else{const[s,...i]=e,a=this.get(s,!0);if(I(a))a.addIn(i,t);else if(a===void 0&&this.schema)this.set(s,Ee(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(I(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,a=this.get(s,!0);return i.length===0?!t&&C(a)?a.value:a:I(a)?a.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!O(t))return!1;const s=t.value;return s==null||e&&C(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return I(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const a=this.get(s,!0);if(I(a))a.setIn(i,t);else if(a===void 0&&this.schema)this.set(s,Ee(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Pi=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function W(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const G=(n,e,t)=>n.endsWith(`
`)?W(t,e):t.includes(`
`)?`
`+W(t,e):(n.endsWith(" ")?"":" ")+t,Rt="flow",Ze="block",Pe="quoted";function Me(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:a=20,onFold:o,onOverflow:r}={}){if(!i||i<0)return n;i<a&&(a=0);const l=Math.max(1+a,1+i-e.length);if(n.length<=l)return n;const c=[],f={};let h=i-e.length;typeof s=="number"&&(s>i-Math.max(2,a)?c.push(0):h=i-s);let d,g,y=!1,u=-1,p=-1,b=-1;t===Ze&&(u=kt(n,u,e.length),u!==-1&&(h=u+l));for(let v;v=n[u+=1];){if(t===Pe&&v==="\\"){switch(p=u,n[u+1]){case"x":u+=3;break;case"u":u+=5;break;case"U":u+=9;break;default:u+=1}b=u}if(v===`
`)t===Ze&&(u=kt(n,u,e.length)),h=u+e.length+l,d=void 0;else{if(v===" "&&g&&g!==" "&&g!==`
`&&g!=="	"){const k=n[u+1];k&&k!==" "&&k!==`
`&&k!=="	"&&(d=u)}if(u>=h)if(d)c.push(d),h=d+l,d=void 0;else if(t===Pe){for(;g===" "||g==="	";)g=v,v=n[u+=1],y=!0;const k=u>b+1?u-2:p-1;if(f[k])return n;c.push(k),f[k]=!0,h=k+l,d=void 0}else y=!0}g=v}if(y&&r&&r(),c.length===0)return n;o&&o();let m=n.slice(0,c[0]);for(let v=0;v<c.length;++v){const k=c[v],S=c[v+1]||n.length;k===0?m=`
${e}${n.slice(0,S)}`:(t===Pe&&f[k]&&(m+=`${n[k]}\\`),m+=`
${e}${n.slice(k+1,S)}`)}return m}function kt(n,e,t){let s=e,i=e+1,a=n[i];for(;a===" "||a==="	";)if(e<i+t)a=n[++e];else{do a=n[++e];while(a&&a!==`
`);s=e,i=e+1,a=n[i]}return s}const Fe=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),xe=n=>/^(%|---|\.\.\.)/m.test(n);function Ni(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let a=0,o=0;a<i;++a)if(n[a]===`
`){if(a-o>s)return!0;if(o=a+1,i-o<=s)return!1}return!0}function ge(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(xe(n)?"  ":"");let o="",r=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(r,l)+"\\ ",l+=1,r=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(r,l);const f=t.substr(l+2,4);switch(f){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:f.substr(0,2)==="00"?o+="\\x"+f.substr(2):o+=t.substr(l,6)}l+=5,r=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(o+=t.slice(r,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=a,t[l+2]===" "&&(o+="\\"),l+=1,r=l+1}break;default:l+=1}return o=r?o+t.slice(r):t,s?o:Me(o,a,Pe,Fe(e,!1))}function et(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ge(n,e);const t=e.indent||(xe(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Me(s,t,Rt,Fe(e,!1))}function te(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ge;else{const i=n.includes('"'),a=n.includes("'");i&&!a?s=et:a&&!i?s=ge:s=t?et:ge}return s(n,e)}let tt;try{tt=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{tt=/\n+(?!\n|$)/g}function Ne({comment:n,type:e,value:t},s,i,a){const{blockQuote:o,commentString:r,lineWidth:l}=s.options;if(!o||/\n[\t ]+$/.test(t))return te(t,s);const c=s.indent||(s.forceBlockIndent||xe(t)?"  ":""),f=o==="literal"?!0:o==="folded"||e===_.BLOCK_FOLDED?!1:e===_.BLOCK_LITERAL?!0:!Ni(t,l,c.length);if(!t)return f?`|
`:`>
`;let h,d;for(d=t.length;d>0;--d){const S=t[d-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let g=t.substring(d);const y=g.indexOf(`
`);y===-1?h="-":t===g||y!==g.length-1?(h="+",a&&a()):h="",g&&(t=t.slice(0,-g.length),g[g.length-1]===`
`&&(g=g.slice(0,-1)),g=g.replace(tt,`$&${c}`));let u=!1,p,b=-1;for(p=0;p<t.length;++p){const S=t[p];if(S===" ")u=!0;else if(S===`
`)b=p;else break}let m=t.substring(0,b<p?b+1:p);m&&(t=t.substring(m.length),m=m.replace(/\n+/g,`$&${c}`));let k=(u?c?"2":"1":"")+h;if(n&&(k+=" "+r(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!f){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let T=!1;const A=Fe(s,!0);o!=="folded"&&e!==_.BLOCK_FOLDED&&(A.onOverflow=()=>{T=!0});const w=Me(`${m}${S}${g}`,c,Ze,A);if(!T)return`>${k}
${c}${w}`}return t=t.replace(/\n+/g,`$&${c}`),`|${k}
${c}${m}${t}${g}`}function Ei(n,e,t,s){const{type:i,value:a}=n,{actualString:o,implicitKey:r,indent:l,indentStep:c,inFlow:f}=e;if(r&&a.includes(`
`)||f&&/[[\]{},]/.test(a))return te(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return r||f||!a.includes(`
`)?te(a,e):Ne(n,e,t,s);if(!r&&!f&&i!==_.PLAIN&&a.includes(`
`))return Ne(n,e,t,s);if(xe(a)){if(l==="")return e.forceBlockIndent=!0,Ne(n,e,t,s);if(r&&l===c)return te(a,e)}const h=a.replace(/\n+/g,`$&
${l}`);if(o){const d=u=>u.default&&u.tag!=="tag:yaml.org,2002:str"&&u.test?.test(h),{compat:g,tags:y}=e.doc.schema;if(y.some(d)||g?.some(d))return te(a,e)}return r?h:Me(h,l,Rt,Fe(e,!1))}function rt(n,e,t,s){const{implicitKey:i,inFlow:a}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:r}=n;r!==_.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(r=_.QUOTE_DOUBLE);const l=f=>{switch(f){case _.BLOCK_FOLDED:case _.BLOCK_LITERAL:return i||a?te(o.value,e):Ne(o,e,t,s);case _.QUOTE_DOUBLE:return ge(o.value,e);case _.QUOTE_SINGLE:return et(o.value,e);case _.PLAIN:return Ei(o,e,t,s);default:return null}};let c=l(r);if(c===null){const{defaultKeyType:f,defaultStringType:h}=e.options,d=i&&f||h;if(c=l(d),c===null)throw new Error(`Unsupported default string type ${d}`)}return c}function Wt(n,e){const t=Object.assign({blockQuote:!0,commentString:Pi,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function ji(n,e){if(e.tag){const i=n.filter(a=>a.tag===e.tag);if(i.length>0)return i.find(a=>a.format===e.format)??i[0]}let t,s;if(C(e)){s=e.value;let i=n.filter(a=>a.identify?.(s));if(i.length>1){const a=i.filter(o=>o.test);a.length>0&&(i=a)}t=i.find(a=>a.format===e.format)??i.find(a=>!a.format)}else s=e,t=n.find(i=>i.nodeClass&&s instanceof i.nodeClass);if(!t){const i=s?.constructor?.name??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${i} value`)}return t}function Bi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],a=(C(n)||I(n))&&n.anchor;a&&Bt(a)&&(t.add(a),i.push(`&${a}`));const o=n.tag??(e.default?null:e.tag);return o&&i.push(s.directives.tagString(o)),i.join(" ")}function ie(n,e,t,s){if(O(n))return n.toString(e,t,s);if(re(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const a=D(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=ji(e.doc.schema.tags,a));const o=Bi(a,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);const r=typeof i.stringify=="function"?i.stringify(a,e,t,s):C(a)?rt(a,e,t,s):a.toString(e,t,s);return o?C(a)||r[0]==="{"||r[0]==="["?`${o} ${r}`:`${o}
${e.indent}${r}`:r}function Li({key:n,value:e},t,s,i){const{allNullValues:a,doc:o,indent:r,indentStep:l,options:{commentString:c,indentSeq:f,simpleKeys:h}}=t;let d=D(n)&&n.comment||null;if(h){if(d)throw new Error("With simple keys, key nodes cannot have comments");if(I(n)||!D(n)&&typeof n=="object"){const A="With simple keys, collection cannot be used as a key value";throw new Error(A)}}let g=!h&&(!n||d&&e==null&&!t.inFlow||I(n)||(C(n)?n.type===_.BLOCK_FOLDED||n.type===_.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!g&&(h||!a),indent:r+l});let y=!1,u=!1,p=ie(n,t,()=>y=!0,()=>u=!0);if(!g&&!t.inFlow&&p.length>1024){if(h)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");g=!0}if(t.inFlow){if(a||e==null)return y&&s&&s(),p===""?"?":g?`? ${p}`:p}else if(a&&!h||e==null&&g)return p=`? ${p}`,d&&!y?p+=G(p,t.indent,c(d)):u&&i&&i(),p;y&&(d=null),g?(d&&(p+=G(p,t.indent,c(d))),p=`? ${p}
${r}:`):(p=`${p}:`,d&&(p+=G(p,t.indent,c(d))));let b,m,v;D(e)?(b=!!e.spaceBefore,m=e.commentBefore,v=e.comment):(b=!1,m=null,v=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!g&&!d&&C(e)&&(t.indentAtStart=p.length+1),u=!1,!f&&l.length>=2&&!t.inFlow&&!g&&we(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let k=!1;const S=ie(e,t,()=>k=!0,()=>u=!0);let T=" ";if(d||b||m){if(T=b?`
`:"",m){const A=c(m);T+=`
${W(A,t.indent)}`}S===""&&!t.inFlow?T===`
`&&v&&(T=`

`):T+=`
${t.indent}`}else if(!g&&I(e)){const A=S[0],w=S.indexOf(`
`),P=w!==-1,U=t.inFlow??e.flow??e.items.length===0;if(P||!U){let Y=!1;if(P&&(A==="&"||A==="!")){let N=S.indexOf(" ");A==="&"&&N!==-1&&N<w&&S[N+1]==="!"&&(N=S.indexOf(" ",N+1)),(N===-1||w<N)&&(Y=!0)}Y||(T=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(T="");return p+=T+S,t.inFlow?k&&s&&s():v&&!k?p+=G(p,t.indent,c(v)):u&&i&&i(),p}function $t(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Se="<<",$={identify:n=>n===Se||typeof n=="symbol"&&n.description===Se,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new _(Symbol(Se)),{addToJSMap:Ut}),stringify:()=>Se},Mi=(n,e)=>($.identify(e)||C(e)&&(!e.type||e.type===_.PLAIN)&&$.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===$.tag&&t.default);function Ut(n,e,t){const s=qt(n,t);if(we(s))for(const i of s.items)He(n,e,i);else if(Array.isArray(s))for(const i of s)He(n,e,i);else He(n,e,s)}function He(n,e,t){const s=qt(n,t);if(!be(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[a,o]of i)e instanceof Map?e.has(a)||e.set(a,o):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function qt(n,e){return n&&re(e)?e.resolve(n.doc,n):e}function zt(n,e,{key:t,value:s}){if(D(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Mi(n,t))Ut(n,e,s);else{const i=L(t,"",n);if(e instanceof Map)e.set(i,L(s,i,n));else if(e instanceof Set)e.add(i);else{const a=Fi(t,i,n),o=L(s,a,n);a in e?Object.defineProperty(e,a,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[a]=o}}return e}function Fi(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(D(n)&&t?.doc){const s=Wt(t.doc,{});s.anchors=new Set;for(const a of t.anchors.keys())s.anchors.add(a.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let a=JSON.stringify(i);a.length>40&&(a=a.substring(0,36)+'..."'),$t(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function lt(n,e,t){const s=me(n,void 0,t),i=me(e,void 0,t);return new j(s,i)}class j{constructor(e,t=null){Object.defineProperty(this,M,{value:Et}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return D(t)&&(t=t.clone(e)),D(s)&&(s=s.clone(e)),new j(t,s)}toJSON(e,t){const s=t?.mapAsMap?new Map:{};return zt(t,s,this)}toString(e,t,s){return e?.doc?Li(this,e,t,s):JSON.stringify(this)}}function Ht(n,e,t){return(e.inFlow??n.flow?Ri:xi)(n,e,t)}function xi({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:a,onChompKeep:o,onComment:r}){const{indent:l,options:{commentString:c}}=t,f=Object.assign({},t,{indent:a,type:null});let h=!1;const d=[];for(let y=0;y<e.length;++y){const u=e[y];let p=null;if(D(u))!h&&u.spaceBefore&&d.push(""),je(t,d,u.commentBefore,h),u.comment&&(p=u.comment);else if(O(u)){const m=D(u.key)?u.key:null;m&&(!h&&m.spaceBefore&&d.push(""),je(t,d,m.commentBefore,h))}h=!1;let b=ie(u,f,()=>p=null,()=>h=!0);p&&(b+=G(b,a,c(p))),h&&p&&(h=!1),d.push(s+b)}let g;if(d.length===0)g=i.start+i.end;else{g=d[0];for(let y=1;y<d.length;++y){const u=d[y];g+=u?`
${l}${u}`:`
`}}return n?(g+=`
`+W(c(n),l),r&&r()):h&&o&&o(),g}function Ri({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:a,flowCollectionPadding:o,options:{commentString:r}}=e;s+=a;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,f=0;const h=[];for(let y=0;y<n.length;++y){const u=n[y];let p=null;if(D(u))u.spaceBefore&&h.push(""),je(e,h,u.commentBefore,!1),u.comment&&(p=u.comment);else if(O(u)){const m=D(u.key)?u.key:null;m&&(m.spaceBefore&&h.push(""),je(e,h,m.commentBefore,!1),m.comment&&(c=!0));const v=D(u.value)?u.value:null;v?(v.comment&&(p=v.comment),v.commentBefore&&(c=!0)):u.value==null&&m?.comment&&(p=m.comment)}p&&(c=!0);let b=ie(u,l,()=>p=null);c||(c=h.length>f||b.includes(`
`)),y<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=h.reduce((m,v)=>m+v.length+2,2)+(b.length+2)>e.options.lineWidth)),c&&(b+=",")),p&&(b+=G(b,s,r(p))),h.push(b),f=h.length}const{start:d,end:g}=t;if(h.length===0)return d+g;if(!c){const y=h.reduce((u,p)=>u+p.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=d;for(const u of h)y+=u?`
${a}${i}${u}`:`
`;return`${y}
${i}${g}`}else return`${d}${o}${h.join(" ")}${o}${g}`}function je({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const a=W(e(s),n);t.push(a.trimStart())}}function J(n,e){const t=C(e)?e.value:e;for(const s of n)if(O(s)&&(s.key===e||s.key===t||C(s.key)&&s.key.value===t))return s}class B extends xt{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(H,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:a}=s,o=new this(e),r=(l,c)=>{if(typeof a=="function")c=a.call(t,l,c);else if(Array.isArray(a)&&!a.includes(l))return;(c!==void 0||i)&&o.items.push(lt(l,c,s))};if(t instanceof Map)for(const[l,c]of t)r(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))r(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let s;O(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new j(e,e?.value):s=new j(e.key,e.value);const i=J(this.items,s.key),a=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);C(i.value)&&Ft(s.value)?i.value.value=s.value:i.value=s.value}else if(a){const o=this.items.findIndex(r=>a(s,r)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=J(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const i=J(this.items,e)?.value;return(!t&&C(i)?i.value:i)??void 0}has(e){return!!J(this.items,e)}set(e,t){this.add(new j(e,t),!0)}toJSON(e,t,s){const i=s?new s:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(const a of this.items)zt(t,i,a);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!O(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Ht(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const ce={collection:"map",default:!0,nodeClass:B,tag:"tag:yaml.org,2002:map",resolve(n,e){return be(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>B.from(n,e,t)};class V extends xt{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(ae,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=_e(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=_e(e);if(typeof s!="number")return;const i=this.items[s];return!t&&C(i)?i.value:i}has(e){const t=_e(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=_e(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];C(i)&&Ft(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t?.onCreate&&t.onCreate(s);let i=0;for(const a of this.items)s.push(L(a,String(i++),t));return s}toString(e,t,s){return e?Ht(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let r of t){if(typeof i=="function"){const l=t instanceof Set?r:String(o++);r=i.call(t,l,r)}a.items.push(me(r,void 0,s))}}return a}}function _e(n){let e=C(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const he={collection:"seq",default:!0,nodeClass:V,tag:"tag:yaml.org,2002:seq",resolve(n,e){return we(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>V.from(n,e,t)},Re={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),rt(n,e,t,s)}},We={identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new _(null),stringify:({source:n},e)=>typeof n=="string"&&We.test.test(n)?n:e.options.nullStr},ct={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new _(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ct.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function x({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let a=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(a)&&!a.includes("e")){let o=a.indexOf(".");o<0&&(o=a.length,a+=".");let r=e-(a.length-o-1);for(;r-- >0;)a+="0"}return a}const Kt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:x},Gt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():x(n)}},Jt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new _(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:x},$e=n=>typeof n=="bigint"||Number.isInteger(n),ht=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Vt(n,e,t){const{value:s}=n;return $e(s)&&s>=0?t+s.toString(e):x(n)}const Yt={identify:n=>$e(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ht(n,2,8,t),stringify:n=>Vt(n,8,"0o")},Qt={identify:$e,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ht(n,0,10,t),stringify:x},Xt={identify:n=>$e(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ht(n,2,16,t),stringify:n=>Vt(n,16,"0x")},Wi=[ce,he,Re,We,ct,Yt,Qt,Xt,Kt,Gt,Jt];function St(n){return typeof n=="bigint"||Number.isInteger(n)}const Te=({value:n})=>JSON.stringify(n),$i=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Te},{identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Te},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Te},{identify:St,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>St(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Te}],Ui={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},qi=[ce,he].concat($i,Ui),dt={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,a){if(!t)return"";const o=t;let r;if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);r=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=_.BLOCK_LITERAL),e!==_.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(r.length/l),f=new Array(c);for(let h=0,d=0;h<c;++h,d+=l)f[h]=r.substr(d,l);r=f.join(e===_.BLOCK_LITERAL?`
`:" ")}return rt({comment:n,type:e,value:r},s,i,a)}};function Zt(n,e){if(we(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!O(s)){if(be(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new j(new _(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const a=i.value??i.key;a.comment=a.comment?`${s.comment}
${a.comment}`:s.comment}s=i}n.items[t]=O(s)?s:new j(s)}}else e("Expected a sequence for this tag");return n}function en(n,e,t){const{replacer:s}=t,i=new V(n);i.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof s=="function"&&(o=s.call(e,String(a++),o));let r,l;if(Array.isArray(o))if(o.length===2)r=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){const c=Object.keys(o);if(c.length===1)r=c[0],l=o[r];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else r=o;i.items.push(lt(r,l,t))}return i}const ut={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Zt,createNode:en};class ne extends V{constructor(){super(),this.add=B.prototype.add.bind(this),this.delete=B.prototype.delete.bind(this),this.get=B.prototype.get.bind(this),this.has=B.prototype.has.bind(this),this.set=B.prototype.set.bind(this),this.tag=ne.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t?.onCreate&&t.onCreate(s);for(const i of this.items){let a,o;if(O(i)?(a=L(i.key,"",t),o=L(i.value,a,t)):a=L(i,"",t),s.has(a))throw new Error("Ordered maps must not include duplicate keys");s.set(a,o)}return s}static from(e,t,s){const i=en(e,t,s),a=new this;return a.items=i.items,a}}ne.tag="tag:yaml.org,2002:omap";const ft={collection:"seq",identify:n=>n instanceof Map,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Zt(n,e),s=[];for(const{key:i}of t.items)C(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new ne,t)},createNode:(n,e,t)=>ne.from(n,e,t)};function tn({value:n,source:e},t){return e&&(n?nn:sn).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const nn={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new _(!0),stringify:tn},sn={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new _(!1),stringify:tn},zi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:x},Hi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():x(n)}},Ki={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new _(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:x},ve=n=>typeof n=="bigint"||Number.isInteger(n);function Ue(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const o=BigInt(n);return i==="-"?BigInt(-1)*o:o}const a=parseInt(n,t);return i==="-"?-1*a:a}function pt(n,e,t){const{value:s}=n;if(ve(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return x(n)}const Gi={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Ue(n,2,2,t),stringify:n=>pt(n,2,"0b")},Ji={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Ue(n,1,8,t),stringify:n=>pt(n,8,"0")},Vi={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Ue(n,0,10,t),stringify:x},Yi={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Ue(n,2,16,t),stringify:n=>pt(n,16,"0x")};class se extends B{constructor(e){super(e),this.tag=se.tag}add(e){let t;O(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new j(e.key,null):t=new j(e,null),J(this.items,t.key)||this.items.push(t)}get(e,t){const s=J(this.items,e);return!t&&O(s)?C(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=J(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new j(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i=="function"&&(o=i.call(t,o,o)),a.items.push(lt(o,null,s));return a}}se.tag="tag:yaml.org,2002:set";const gt={collection:"map",identify:n=>n instanceof Set,nodeClass:se,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>se.from(n,e,t),resolve(n,e){if(be(n)){if(n.hasAllNullValues(!0))return Object.assign(new se,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function mt(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=o=>e?BigInt(o):Number(o),a=s.replace(/_/g,"").split(":").reduce((o,r)=>o*i(60)+i(r),i(0));return t==="-"?i(-1)*a:a}function on(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return x(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),a=[e%i];return e<60?a.unshift(0):(e=(e-a[0])/i,a.unshift(e%i),e>=60&&(e=(e-a[0])/i,a.unshift(e))),s+a.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const an={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>mt(n,t),stringify:on},rn={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>mt(n,!1),stringify:on},qe={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(qe.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,a,o,r]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,a||0,o||0,r||0,l);const f=e[8];if(f&&f!=="Z"){let h=mt(f,!1);Math.abs(h)<30&&(h*=60),c-=6e4*h}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},_t=[ce,he,Re,We,nn,sn,Gi,Ji,Vi,Yi,zi,Hi,Ki,dt,$,ft,ut,gt,an,rn,qe],Tt=new Map([["core",Wi],["failsafe",[ce,he,Re]],["json",qi],["yaml11",_t],["yaml-1.1",_t]]),At={binary:dt,bool:ct,float:Jt,floatExp:Gt,floatNaN:Kt,floatTime:rn,int:Qt,intHex:Xt,intOct:Yt,intTime:an,map:ce,merge:$,null:We,omap:ft,pairs:ut,seq:he,set:gt,timestamp:qe},Qi={"tag:yaml.org,2002:binary":dt,"tag:yaml.org,2002:merge":$,"tag:yaml.org,2002:omap":ft,"tag:yaml.org,2002:pairs":ut,"tag:yaml.org,2002:set":gt,"tag:yaml.org,2002:timestamp":qe};function Ke(n,e,t){const s=Tt.get(e);if(s&&!n)return t&&!s.includes($)?s.concat($):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const a=Array.from(Tt.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(n))for(const a of n)i=i.concat(a);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat($)),i.reduce((a,o)=>{const r=typeof o=="string"?At[o]:o;if(!r){const l=JSON.stringify(o),c=Object.keys(At).map(f=>JSON.stringify(f)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return a.includes(r)||a.push(r),a},[])}const Xi=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class yt{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:a,sortMapEntries:o,toStringDefaults:r}){this.compat=Array.isArray(e)?Ke(e,"compat"):e?Ke(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=i?Qi:{},this.tags=Ke(t,this.name,s),this.toStringOptions=r??null,Object.defineProperty(this,H,{value:ce}),Object.defineProperty(this,R,{value:Re}),Object.defineProperty(this,ae,{value:he}),this.sortMapEntries=typeof o=="function"?o:o===!0?Xi:null}clone(){const e=Object.create(yt.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Zi(n,e){const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Wt(n,e),{commentString:a}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=a(n.commentBefore);t.unshift(W(l,""))}let o=!1,r=null;if(n.contents){if(D(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=a(n.contents.commentBefore);t.push(W(f,""))}i.forceBlockIndent=!!n.comment,r=n.contents.comment}const l=r?void 0:()=>o=!0;let c=ie(n.contents,i,()=>r=null,l);r&&(c+=G(c,"",a(r))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ie(n.contents,i));if(n.directives?.docEnd)if(n.comment){const l=a(n.comment);l.includes(`
`)?(t.push("..."),t.push(W(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||r)&&t[t.length-1]!==""&&t.push(""),t.push(W(a(l),"")))}return t.join(`
`)+`
`}class ze{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,M,{value:Xe});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=a;let{version:o}=a;s?._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new E({version:o}),this.setSchema(o,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(ze.prototype,{[M]:{value:Xe}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=D(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Q(this.contents)&&this.contents.add(e)}addIn(e,t){Q(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Lt(this);e.anchor=!t||s.has(t)?Mt(t||"a",s):t}return new at(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const p=m=>typeof m=="number"||m instanceof String||m instanceof Number,b=t.filter(p).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:o,flow:r,keepUndefined:l,onTagObj:c,tag:f}=s??{},{onAnchor:h,setAnchors:d,sourceObjects:g}=Ii(this,o||"a"),y={aliasDuplicateObjects:a??!0,keepUndefined:l??!1,onAnchor:h,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:g},u=me(e,f,y);return r&&I(u)&&(u.flow=!0),d(),u}createPair(e,t,s={}){const i=this.createNode(e,null,s),a=this.createNode(t,null,s);return new j(i,a)}delete(e){return Q(this.contents)?this.contents.delete(e):!1}deleteIn(e){return ue(e)?this.contents==null?!1:(this.contents=null,!0):Q(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return I(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return ue(e)?!t&&C(this.contents)?this.contents.value:this.contents:I(this.contents)?this.contents.getIn(e,t):void 0}has(e){return I(this.contents)?this.contents.has(e):!1}hasIn(e){return ue(e)?this.contents!==void 0:I(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ee(this.schema,[e],t):Q(this.contents)&&this.contents.set(e,t)}setIn(e,t){ue(e)?this.contents=t:this.contents==null?this.contents=Ee(this.schema,Array.from(e),t):Q(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new E({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new E({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new yt(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:a,reviver:o}={}){const r={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=L(this.contents,t??"",r);if(typeof a=="function")for(const{count:c,res:f}of r.anchors.values())a(f,c);return typeof o=="function"?ee(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Zi(this,e)}}function Q(n){if(I(n))return!0;throw new Error("Expected a YAML collection as document contents")}class ln extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class fe extends ln{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class eo extends ln{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Ct=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(r=>e.linePos(r));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let a=i-1,o=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(a>=60&&o.length>80){const r=Math.min(a-39,o.length-79);o="…"+o.substring(r),a-=r-1}if(o.length>80&&(o=o.substring(0,79)+"…"),s>1&&/^ *$/.test(o.substring(0,a))){let r=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);r.length>80&&(r=r.substring(0,79)+`…
`),o=r+o}if(/[^ ]/.test(o)){let r=1;const l=t.linePos[1];l?.line===s&&l.col>i&&(r=Math.max(1,Math.min(l.col-i,80-a)));const c=" ".repeat(a)+"^".repeat(r);t.message+=`:

${o}
${c}
`}};function oe(n,{flow:e,indicator:t,next:s,offset:i,onError:a,parentIndent:o,startOnNewline:r}){let l=!1,c=r,f=r,h="",d="",g=!1,y=!1,u=null,p=null,b=null,m=null,v=null,k=null,S=null;for(const w of n)switch(y&&(w.type!=="space"&&w.type!=="newline"&&w.type!=="comma"&&a(w.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),u&&(c&&w.type!=="comment"&&w.type!=="newline"&&a(u,"TAB_AS_INDENT","Tabs are not allowed as indentation"),u=null),w.type){case"space":!e&&(t!=="doc-start"||s?.type!=="flow-collection")&&w.source.includes("	")&&(u=w),f=!0;break;case"comment":{f||a(w,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const P=w.source.substring(1)||" ";h?h+=d+P:h=P,d="",c=!1;break}case"newline":c?h?h+=w.source:(!k||t!=="seq-item-ind")&&(l=!0):d+=w.source,c=!0,g=!0,(p||b)&&(m=w),f=!0;break;case"anchor":p&&a(w,"MULTIPLE_ANCHORS","A node can have at most one anchor"),w.source.endsWith(":")&&a(w.offset+w.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),p=w,S??(S=w.offset),c=!1,f=!1,y=!0;break;case"tag":{b&&a(w,"MULTIPLE_TAGS","A node can have at most one tag"),b=w,S??(S=w.offset),c=!1,f=!1,y=!0;break}case t:(p||b)&&a(w,"BAD_PROP_ORDER",`Anchors and tags must be after the ${w.source} indicator`),k&&a(w,"UNEXPECTED_TOKEN",`Unexpected ${w.source} in ${e??"collection"}`),k=w,c=t==="seq-item-ind"||t==="explicit-key-ind",f=!1;break;case"comma":if(e){v&&a(w,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),v=w,c=!1,f=!1;break}default:a(w,"UNEXPECTED_TOKEN",`Unexpected ${w.type} token`),c=!1,f=!1}const T=n[n.length-1],A=T?T.offset+T.source.length:i;return y&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&a(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),u&&(c&&u.indent<=o||s?.type==="block-map"||s?.type==="block-seq")&&a(u,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:v,found:k,spaceBefore:l,comment:h,hasNewline:g,anchor:p,tag:b,newlineAfterProp:m,end:A,start:S??A}}function ye(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ye(e.key)||ye(e.value))return!0}return!1;default:return!0}}function nt(n,e,t){if(e?.type==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ye(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function cn(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(a,o)=>a===o||C(a)&&C(o)&&a.value===o.value;return e.some(a=>i(a.key,t))}const It="All mapping items must start at the same column";function to({composeNode:n,composeEmptyNode:e},t,s,i,a){const o=a?.nodeClass??B,r=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:h,key:d,sep:g,value:y}=f,u=oe(h,{indicator:"explicit-key-ind",next:d??g?.[0],offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),p=!u.found;if(p){if(d&&(d.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==s.indent&&i(l,"BAD_INDENT",It)),!u.anchor&&!u.tag&&!g){c=u.end,u.comment&&(r.comment?r.comment+=`
`+u.comment:r.comment=u.comment);continue}(u.newlineAfterProp||ye(d))&&i(d??h[h.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else u.found?.indent!==s.indent&&i(l,"BAD_INDENT",It);t.atKey=!0;const b=u.end,m=d?n(t,d,u,i):e(t,b,h,null,u,i);t.schema.compat&&nt(s.indent,d,i),t.atKey=!1,cn(t,r.items,m)&&i(b,"DUPLICATE_KEY","Map keys must be unique");const v=oe(g??[],{indicator:"map-value-ind",next:y,offset:m.range[2],onError:i,parentIndent:s.indent,startOnNewline:!d||d.type==="block-scalar"});if(l=v.end,v.found){p&&(y?.type==="block-map"&&!v.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&u.start<v.found.offset-1024&&i(m.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const k=y?n(t,y,v,i):e(t,l,g,null,v,i);t.schema.compat&&nt(s.indent,y,i),l=k.range[2];const S=new j(m,k);t.options.keepSourceTokens&&(S.srcToken=f),r.items.push(S)}else{p&&i(m.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),v.comment&&(m.comment?m.comment+=`
`+v.comment:m.comment=v.comment);const k=new j(m);t.options.keepSourceTokens&&(k.srcToken=f),r.items.push(k)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),r.range=[s.offset,l,c??l],r}function no({composeNode:n,composeEmptyNode:e},t,s,i,a){const o=a?.nodeClass??V,r=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:f,value:h}of s.items){const d=oe(f,{indicator:"seq-item-ind",next:h,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||h)h?.type==="block-seq"?i(d.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=d.end,d.comment&&(r.comment=d.comment);continue}const g=h?n(t,h,d,i):e(t,d.end,f,null,d,i);t.schema.compat&&nt(s.indent,h,i),l=g.range[2],r.items.push(g)}return r.range=[s.offset,l,c??l],r}function ke(n,e,t,s){let i="";if(n){let a=!1,o="";for(const r of n){const{source:l,type:c}=r;switch(c){case"space":a=!0;break;case"comment":{t&&!a&&s(r,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const f=l.substring(1)||" ";i?i+=o+f:i=f,o="";break}case"newline":i&&(o+=l),a=!0;break;default:s(r,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Ge="Block collections are not allowed within flow collections",Je=n=>n&&(n.type==="block-map"||n.type==="block-seq");function so({composeNode:n,composeEmptyNode:e},t,s,i,a){const o=s.start.source==="{",r=o?"flow map":"flow sequence",l=a?.nodeClass??(o?B:V),c=new l(t.schema);c.flow=!0;const f=t.atRoot;f&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let h=s.offset+s.start.source.length;for(let p=0;p<s.items.length;++p){const b=s.items[p],{start:m,key:v,sep:k,value:S}=b,T=oe(m,{flow:r,indicator:"explicit-key-ind",next:v??k?.[0],offset:h,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!T.found){if(!T.anchor&&!T.tag&&!k&&!S){p===0&&T.comma?i(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`):p<s.items.length-1&&i(T.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${r}`),T.comment&&(c.comment?c.comment+=`
`+T.comment:c.comment=T.comment),h=T.end;continue}!o&&t.options.strict&&ye(v)&&i(v,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(p===0)T.comma&&i(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`);else if(T.comma||i(T.start,"MISSING_CHAR",`Missing , between ${r} items`),T.comment){let A="";e:for(const w of m)switch(w.type){case"comma":case"space":break;case"comment":A=w.source.substring(1);break e;default:break e}if(A){let w=c.items[c.items.length-1];O(w)&&(w=w.value??w.key),w.comment?w.comment+=`
`+A:w.comment=A,T.comment=T.comment.substring(A.length+1)}}if(!o&&!k&&!T.found){const A=S?n(t,S,T,i):e(t,T.end,k,null,T,i);c.items.push(A),h=A.range[2],Je(S)&&i(A.range,"BLOCK_IN_FLOW",Ge)}else{t.atKey=!0;const A=T.end,w=v?n(t,v,T,i):e(t,A,m,null,T,i);Je(v)&&i(w.range,"BLOCK_IN_FLOW",Ge),t.atKey=!1;const P=oe(k??[],{flow:r,indicator:"map-value-ind",next:S,offset:w.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(P.found){if(!o&&!T.found&&t.options.strict){if(k)for(const N of k){if(N===P.found)break;if(N.type==="newline"){i(N,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}T.start<P.found.offset-1024&&i(P.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&S.source?.[0]===":"?i(S,"MISSING_CHAR",`Missing space after : in ${r}`):i(P.start,"MISSING_CHAR",`Missing , or : between ${r} items`));const U=S?n(t,S,P,i):P.found?e(t,P.end,k,null,P,i):null;U?Je(S)&&i(U.range,"BLOCK_IN_FLOW",Ge):P.comment&&(w.comment?w.comment+=`
`+P.comment:w.comment=P.comment);const Y=new j(w,U);if(t.options.keepSourceTokens&&(Y.srcToken=b),o){const N=c;cn(t,N.items,w)&&i(A,"DUPLICATE_KEY","Map keys must be unique"),N.items.push(Y)}else{const N=new B(t.schema);N.flow=!0,N.items.push(Y);const vt=(U??w).range;N.range=[w.range[0],vt[1],vt[2]],c.items.push(N)}h=U?U.range[2]:P.end}}const d=o?"}":"]",[g,...y]=s.end;let u=h;if(g?.source===d)u=g.offset+g.source.length;else{const p=r[0].toUpperCase()+r.substring(1),b=f?`${p} must end with a ${d}`:`${p} in block collection must be sufficiently indented and end with a ${d}`;i(h,f?"MISSING_CHAR":"BAD_INDENT",b),g&&g.source.length!==1&&y.unshift(g)}if(y.length>0){const p=ke(y,u,t.options.strict,i);p.comment&&(c.comment?c.comment+=`
`+p.comment:c.comment=p.comment),c.range=[s.offset,u,p.offset]}else c.range=[s.offset,u,u];return c}function Ve(n,e,t,s,i,a){const o=t.type==="block-map"?to(n,e,t,s,a):t.type==="block-seq"?no(n,e,t,s,a):so(n,e,t,s,a),r=o.constructor;return i==="!"||i===r.tagName?(o.tag=r.tagName,o):(i&&(o.tag=i),o)}function io(n,e,t,s,i){const a=s.tag,o=a?e.directives.tagName(a.source,d=>i(a,"TAG_RESOLVE_FAILED",d)):null;if(t.type==="block-seq"){const{anchor:d,newlineAfterProp:g}=s,y=d&&a?d.offset>a.offset?d:a:d??a;y&&(!g||g.offset<y.offset)&&i(y,"MISSING_CHAR","Missing newline after block sequence props")}const r=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!o||o==="!"||o===B.tagName&&r==="map"||o===V.tagName&&r==="seq")return Ve(n,e,t,i,o);let l=e.schema.tags.find(d=>d.tag===o&&d.collection===r);if(!l){const d=e.schema.knownTags[o];if(d?.collection===r)e.schema.tags.push(Object.assign({},d,{default:!1})),l=d;else return d?i(a,"BAD_COLLECTION_TYPE",`${d.tag} used for ${r} collection, but expects ${d.collection??"scalar"}`,!0):i(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),Ve(n,e,t,i,o)}const c=Ve(n,e,t,i,o,l),f=l.resolve?.(c,d=>i(a,"TAG_RESOLVE_FAILED",d),e.options)??c,h=D(f)?f:new _(f);return h.range=c.range,h.tag=o,l?.format&&(h.format=l.format),h}function oo(n,e,t){const s=e.offset,i=ao(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const a=i.mode===">"?_.BLOCK_FOLDED:_.BLOCK_LITERAL,o=e.source?ro(e.source):[];let r=o.length;for(let u=o.length-1;u>=0;--u){const p=o[u][1];if(p===""||p==="\r")r=u;else break}if(r===0){const u=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"";let p=s+i.length;return e.source&&(p+=e.source.length),{value:u,type:a,comment:i.comment,range:[s,p,p]}}let l=e.indent+i.indent,c=e.offset+i.length,f=0;for(let u=0;u<r;++u){const[p,b]=o[u];if(b===""||b==="\r")i.indent===0&&p.length>l&&(l=p.length);else{p.length<l&&t(c+p.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=p.length),f=u,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=p.length+b.length+1}for(let u=o.length-1;u>=r;--u)o[u][0].length>l&&(r=u+1);let h="",d="",g=!1;for(let u=0;u<f;++u)h+=o[u][0].slice(l)+`
`;for(let u=f;u<r;++u){let[p,b]=o[u];c+=p.length+b.length+1;const m=b[b.length-1]==="\r";if(m&&(b=b.slice(0,-1)),b&&p.length<l){const k=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-b.length-(m?2:1),"BAD_INDENT",k),p=""}a===_.BLOCK_LITERAL?(h+=d+p.slice(l)+b,d=`
`):p.length>l||b[0]==="	"?(d===" "?d=`
`:!g&&d===`
`&&(d=`

`),h+=d+p.slice(l)+b,d=`
`,g=!0):b===""?d===`
`?h+=`
`:d=`
`:(h+=d+b,d=" ",g=!1)}switch(i.chomp){case"-":break;case"+":for(let u=r;u<o.length;++u)h+=`
`+o[u][0].slice(l);h[h.length-1]!==`
`&&(h+=`
`);break;default:h+=`
`}const y=s+i.length+e.source.length;return{value:h,type:a,comment:i.comment,range:[s,y,y]}}function ao({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],a=i[0];let o=0,r="",l=-1;for(let d=1;d<i.length;++d){const g=i[d];if(!r&&(g==="-"||g==="+"))r=g;else{const y=Number(g);!o&&y?o=y:l===-1&&(l=n+d)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,f="",h=i.length;for(let d=1;d<e.length;++d){const g=e[d];switch(g.type){case"space":c=!0;case"newline":h+=g.source.length;break;case"comment":t&&!c&&s(g,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),h+=g.source.length,f=g.source.substring(1);break;case"error":s(g,"UNEXPECTED_TOKEN",g.message),h+=g.source.length;break;default:{const y=`Unexpected token in block scalar header: ${g.type}`;s(g,"UNEXPECTED_TOKEN",y);const u=g.source;u&&typeof u=="string"&&(h+=u.length)}}}return{mode:a,indent:o,chomp:r,comment:f,length:h}}function ro(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),a=[s?.[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)a.push([e[o],e[o+1]]);return a}function lo(n,e,t){const{offset:s,type:i,source:a,end:o}=n;let r,l;const c=(d,g,y)=>t(s+d,g,y);switch(i){case"scalar":r=_.PLAIN,l=co(a,c);break;case"single-quoted-scalar":r=_.QUOTE_SINGLE,l=ho(a,c);break;case"double-quoted-scalar":r=_.QUOTE_DOUBLE,l=uo(a,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+a.length,s+a.length]}}const f=s+a.length,h=ke(o,f,e,t);return{value:l,type:r,comment:h.comment,range:[s,f,h.offset]}}function co(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),hn(n)}function ho(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),hn(n.slice(1,-1)).replace(/''/g,"'")}function hn(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],a=" ",o=e.lastIndex;for(t.lastIndex=o;s=t.exec(n);)s[1]===""?a===`
`?i+=a:a=`
`:(i+=a+s[1],a=" "),o=t.lastIndex;const r=/[ \t]*(.*)/sy;return r.lastIndex=o,s=r.exec(n),i+a+(s?.[1]??"")}function uo(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:a,offset:o}=fo(n,s);t+=a,s=o}else if(i==="\\"){let a=n[++s];const o=po[a];if(o)t+=o;else if(a===`
`)for(a=n[s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="\r"&&n[s+1]===`
`)for(a=n[++s+1];a===" "||a==="	";)a=n[++s+1];else if(a==="x"||a==="u"||a==="U"){const r=a==="x"?2:a==="u"?4:8;t+=go(n,s+1,r,e),s+=r}else{const r=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),t+=r}}else if(i===" "||i==="	"){const a=s;let o=n[s+1];for(;o===" "||o==="	";)o=n[++s+1];o!==`
`&&!(o==="\r"&&n[s+2]===`
`)&&(t+=s>a?n.slice(a,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function fo(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const po={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function go(n,e,t,s){const i=n.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(o)}catch{const r=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),r}}function dn(n,e,t,s){const{value:i,type:a,comment:o,range:r}=e.type==="block-scalar"?oo(n,e,s):lo(e,n.options.strict,s),l=t?n.directives.tagName(t.source,h=>s(t,"TAG_RESOLVE_FAILED",h)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[R]:l?c=mo(n.schema,i,l,t,s):e.type==="scalar"?c=yo(n,i,e,s):c=n.schema[R];let f;try{const h=c.resolve(i,d=>s(t??e,"TAG_RESOLVE_FAILED",d),n.options);f=C(h)?h:new _(h)}catch(h){const d=h instanceof Error?h.message:String(h);s(t??e,"TAG_RESOLVE_FAILED",d),f=new _(i)}return f.range=r,f.source=i,a&&(f.type=a),l&&(f.tag=l),c.format&&(f.format=c.format),o&&(f.comment=o),f}function mo(n,e,t,s,i){if(t==="!")return n[R];const a=[];for(const r of n.tags)if(!r.collection&&r.tag===t)if(r.default&&r.test)a.push(r);else return r;for(const r of a)if(r.test?.test(e))return r;const o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[R])}function yo({atKey:n,directives:e,schema:t},s,i,a){const o=t.tags.find(r=>(r.default===!0||n&&r.default==="key")&&r.test?.test(s))||t[R];if(t.compat){const r=t.compat.find(l=>l.default&&l.test?.test(s))??t[R];if(o.tag!==r.tag){const l=e.tagString(o.tag),c=e.tagString(r.tag),f=`Value may be parsed as either ${l} or ${c}`;a(i,"TAG_RESOLVE_FAILED",f,!0)}}return o}function bo(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];i?.type==="space";)n+=i.source.length,i=e[++s];break}}return n}const wo={composeNode:un,composeEmptyNode:bt};function un(n,e,t,s){const i=n.atKey,{spaceBefore:a,comment:o,anchor:r,tag:l}=t;let c,f=!0;switch(e.type){case"alias":c=vo(n,e,s),(r||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=dn(n,e,l,s),r&&(c.anchor=r.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=io(wo,n,e,t,s),r&&(c.anchor=r.source.substring(1))}catch(h){const d=h instanceof Error?h.message:String(h);s(e,"RESOURCE_EXHAUSTION",d)}break;default:{const h=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",h),f=!1}}return c??(c=bt(n,e.offset,void 0,null,t,s)),r&&c.anchor===""&&s(r,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!C(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(c.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?c.comment=o:c.commentBefore=o),n.options.keepSourceTokens&&f&&(c.srcToken=e),c}function bt(n,e,t,s,{spaceBefore:i,comment:a,anchor:o,tag:r,end:l},c){const f={type:"scalar",offset:bo(e,t,s),indent:-1,source:""},h=dn(n,f,r,c);return o&&(h.anchor=o.source.substring(1),h.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(h.spaceBefore=!0),a&&(h.comment=a,h.range[2]=l),h}function vo({options:n},{offset:e,source:t,end:s},i){const a=new at(t.substring(1));a.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const o=e+t.length,r=ke(s,o,n.strict,i);return a.range=[e,o,r.offset],r.comment&&(a.comment=r.comment),a}function ko(n,e,{offset:t,start:s,value:i,end:a},o){const r=Object.assign({_directives:e},n),l=new ze(void 0,r),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},f=oe(s,{indicator:"doc-start",next:i??a?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});f.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!f.hasNewline&&o(f.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?un(c,i,f,o):bt(c,f.end,s,null,f,o);const h=l.contents.range[2],d=ke(a,h,!1,o);return d.comment&&(l.comment=d.comment),l.range=[t,h,d.offset],l}function de(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Dt(n){let e="",t=!1,s=!1;for(let i=0;i<n.length;++i){const a=n[i];switch(a[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(a.substring(1)||" "),t=!0,s=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class So{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,a)=>{const o=de(t);a?this.warnings.push(new eo(o,s,i)):this.errors.push(new fe(o,s,i))},this.directives=new E({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Dt(this.prelude);if(s){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!a)e.commentBefore=s;else if(I(a)&&!a.flow&&a.items.length>0){let o=a.items[0];O(o)&&(o=o.key);const r=o.commentBefore;o.commentBefore=r?`${s}
${r}`:s}else{const o=a.commentBefore;a.commentBefore=o?`${s}
${o}`:s}}if(t){for(let a=0;a<this.errors.length;++a)e.errors.push(this.errors[a]);for(let a=0;a<this.warnings.length;++a)e.warnings.push(this.warnings[a])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Dt(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const a=de(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=ko(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new fe(de(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new fe(de(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=ke(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new fe(de(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new ze(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const fn="\uFEFF",pn="",gn="",st="";function _o(n){switch(n){case fn:return"byte-order-mark";case pn:return"doc-mode";case gn:return"flow-error-end";case st:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function F(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Ot=new Set("0123456789ABCDEFabcdef"),To=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ae=new Set(",[]{}"),Ao=new Set(` ,[]{}
\r	`),Ye=n=>!n||Ao.has(n);class Co{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&F(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===fn&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const a=e[s-1];if(a===" "||a==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield pn,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&F(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!F(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&F(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Ye),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&F(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield gn,yield*this.parseLineStart();let a=0;for(;i[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),i[a]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Ye),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const o=this.charAt(1);if(this.flowKey||F(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const a=this.continueScalar(i+1);if(a===-1)break;i=s.indexOf(`
`,a)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>F(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let a=this.pos;s=this.buffer[a];++a)switch(s){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const o=this.buffer[a+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let a=e-1,o=this.buffer[a];o==="\r"&&(o=this.buffer[--a]);const r=a;for(;o===" ";)o=this.buffer[--a];if(o===`
`&&a>=this.pos&&a+1+t>r)e=a;else break}while(!0);return yield st,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const a=this.buffer[s+1];if(F(a)||e&&Ae.has(a))break;t=s}else if(F(i)){let a=this.buffer[s+1];if(i==="\r"&&(a===`
`?(s+=1,i=`
`,a=this.buffer[s+1]):t=s),a==="#"||e&&Ae.has(a))break;if(i===`
`){const o=this.continueScalar(s+1);if(o===-1)break;s=Math.max(s,o-2)}}else{if(e&&Ae.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield st,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(Ye),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,s=this.charAt(1);if(F(s)||t&&Ae.has(s)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!F(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(To.has(t))t=this.buffer[++e];else if(t==="%"&&Ot.has(this.buffer[e+1])&&Ot.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Io{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const a=t+s>>1;this.lineStarts[a]<e?t=a+1:s=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function q(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Pt(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function mn(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ce(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function X(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function Be(n,e){if(e.length<1e5)Array.prototype.push.apply(n,e);else for(let t=0;t<e.length;++t)n.push(e[t])}function Nt(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!q(e.start,"explicit-key-ind")&&!q(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,mn(e.value)?e.value.end?Be(e.value.end,e.sep):e.value.end=e.sep:Be(e.start,e.sep),delete e.sep)}class Do{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Co,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=_o(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Nt(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Pt(i.start)===-1&&(t.indent===0||i.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Pt(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Ce(this.peek(2)),s=X(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Be(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,i=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let a=[];if(i&&t.sep&&!t.value){const o=[];for(let r=0;r<t.sep.length;++r){const l=t.sep[r];switch(l.type){case"newline":o.push(r);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(a=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(a.push(this.sourceToken),e.items.push({start:a}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(a.push(this.sourceToken),e.items.push({start:a,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(q(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:a,key:null,sep:[this.sourceToken]}]});else if(mn(t.key)&&!q(t.sep,"newline")){const o=X(t.start),r=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:r,sep:l}]})}else a.length>0?t.sep=t.sep.concat(a,this.sourceToken):t.sep.push(this.sourceToken);else if(q(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=X(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:a,key:null,sep:[this.sourceToken]}):q(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);i||t.value?(e.items.push({start:a,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!q(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:a});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Be(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||q(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while(s?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Ce(s),a=X(i);Nt(e);const o=e.end.splice(1,e.end.length);o.push(this.sourceToken);const r={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Ce(e),s=X(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Ce(e),s=X(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Oo(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Io||null,prettyErrors:e}}function Po(n,e={}){const{lineCounter:t,prettyErrors:s}=Oo(e),i=new Do(t?.addNewLine),a=new So(e);let o=null;for(const r of a.compose(i.parse(n),!0,n.length))if(!o)o=r;else if(o.options.logLevel!=="silent"){o.errors.push(new fe(r.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(o.errors.forEach(Ct(n,t)),o.warnings.forEach(Ct(n,t))),o}function No(n,e,t){let s;const i=Po(n,t);if(!i)return null;if(i.warnings.forEach(a=>$t(i.options.logLevel,a)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}function Eo(n){const e=n.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!e)return{data:Object.create(null),content:n};const t=e[1],s=e[2];try{const i=No(t),a=Object.create(null);return i&&typeof i=="object"&&Object.assign(a,i),{data:a,content:s}}catch(i){return console.error("Error parsing frontmatter:",i),{data:Object.create(null),content:s}}}const Ie={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":bn,"/content/posts/2026-04-18-financial-literacy-dancers.md":vn,"/content/posts/2026-04-18-github-actions.md":Sn,"/content/posts/2026-04-18-halloween-costumes.md":Tn,"/content/posts/2026-04-18-make-shoe-dance.md":Cn,"/content/posts/2026-04-18-why-finals-are-hard.md":Dn,"/content/posts/2026-04-19-gear-essentials.md":Pn,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":En}),resources:Object.assign({"/content/resources/2023-10-01-loop-earplugs.md":Bn,"/content/resources/2023-11-01-travel-steamer.md":Mn,"/content/resources/2024-01-01-portable-speaker.md":xn,"/content/resources/2024-06-01-alien-mask.md":Wn,"/content/resources/2024-06-01-charging-cables.md":Un,"/content/resources/2024-06-01-compression-cubes.md":zn,"/content/resources/2024-06-01-crop-tops.md":Kn,"/content/resources/2024-06-01-fishnet-tights.md":Jn,"/content/resources/2024-06-01-foam-roller.md":Yn,"/content/resources/2024-06-01-green-bodysuit.md":Xn,"/content/resources/2024-06-01-light-up-suspenders.md":es,"/content/resources/2024-06-01-love-neon-follow-shirt.md":ns,"/content/resources/2024-06-01-love-neon-lead-shirt.md":is,"/content/resources/2024-06-01-love-neon-switch-shirt.md":as,"/content/resources/2024-06-01-love-unisex-shirt.md":ls,"/content/resources/2024-06-01-mesh-fishnet-top.md":hs,"/content/resources/2024-06-01-nerd-set.md":us,"/content/resources/2024-06-01-norcal-bear-tank.md":ps,"/content/resources/2024-06-01-norcal-bestcal-tshirt.md":ms,"/content/resources/2024-06-01-norcal-crop-top.md":bs,"/content/resources/2024-06-01-norcal-gate-crop-hoodie.md":vs,"/content/resources/2024-06-01-norcal-pride-bear-shirt.md":Ss,"/content/resources/2024-06-01-norcal-pride-gate-shirt.md":Ts,"/content/resources/2024-06-01-portable-charger.md":Cs,"/content/resources/2024-06-01-pumpkin-headbands.md":Ds,"/content/resources/2024-06-01-pumpkin-stickers.md":Ps,"/content/resources/2024-06-01-rave-fan.md":Es,"/content/resources/2024-06-01-reflective-crop-tops.md":Bs,"/content/resources/2024-06-01-running-belt.md":Ms,"/content/resources/2024-06-01-shoe-dryer.md":xs,"/content/resources/2024-06-01-sunscreen.md":Ws,"/content/resources/2024-06-01-travel-bottles.md":Us,"/content/resources/2024-06-01-tripod.md":zs,"/content/resources/2024-06-01-visor.md":Ks,"/content/resources/2024-06-01-war-eagle-shirt.md":Js,"/content/resources/2026-04-12-suede-shoe-diy.md":Ys}),studies:Object.assign({"/content/studies/ai-devops-pipeline.md":Xs,"/content/studies/wcs-scraper-initial-sync.md":ei}),events:Object.assign({"/content/events/boogie-by-the-bay.md":ni,"/content/events/halloween-swing-thing.md":ii,"/content/events/jack-and-jill-orama.md":ai,"/content/events/mission-city-swing.md":li,"/content/events/phoenix-4th-of-july.md":hi,"/content/events/sample-event.md":ui,"/content/events/soswing.md":pi,"/content/events/swingtacular-the-galactic-open.md":mi,"/content/events/weekly.md":bi,"/content/events/wild-wild-westie.md":vi})},jo=n=>n.split("/").pop()?.replace(".md","")||"";function Bo(n){if(typeof n!="string")return;const e=n.toLowerCase();return["published","draft","planned"].includes(e)?e:void 0}function Lo(n){if(typeof n=="number")return n;if(typeof n=="string"){const e=parseInt(n.replace(/[^\d]/g,""),10);return isNaN(e)?void 0:e}}function Fo(n){if(!(n===""||n===void 0||n===null))return typeof n!="string"?n:n.startsWith("/")&&!n.startsWith(Qe)?`${Qe}${n}`:n}function De(n,e){const t=s=>Array.isArray(s)?s:[];return Object.entries(n).map(([s,i])=>{const a=typeof i=="string"?i:i.default,{data:o,content:r}=Eo(a),l=o.type||e,c=d=>{if(d!=="")return typeof d=="string"&&d.startsWith("/")?`${Qe}${d}`:d};o.image=c(o.image),o.imageBack=c(o.imageBack),o.heroImage=c(o.heroImage);const f=["NorCal","SoCal","Southwest","Pacific Northwest","South","International","Other"],h={...o,type:l,title:String(o.title||"Untitled"),category:String(o.category||"General"),region:o.region&&f.includes(String(o.region))?String(o.region):void 0,excerpt:String(o.excerpt||""),date:String(o.date||""),author:String(o.author||""),startDate:o.startDate?String(o.startDate):void 0,earlyBirdDate:o.earlyBirdDate?String(o.earlyBirdDate):void 0,registrationDeadline:o.registrationDeadline?String(o.registrationDeadline):void 0,hotelCutoffDate:o.hotelCutoffDate?String(o.hotelCutoffDate):void 0,packingReminderDate:o.packingReminderDate?String(o.packingReminderDate):void 0,tags:t(o.tags),affiliateIds:t(o.affiliateIds),internalSku:o.internalSku?String(o.internalSku):o.sku?String(o.sku):void 0,priceCategory:o.priceCategory?String(o.priceCategory):void 0,seoTitle:o.seoTitle?String(o.seoTitle):void 0,seoDescription:o.seoDescription?String(o.seoDescription):void 0,imageAlt:o.imageAlt?String(o.imageAlt):void 0,productType:o.productType?String(o.productType):void 0,fulfillmentType:o.fulfillmentType?String(o.fulfillmentType):void 0,provider:o.provider?String(o.provider):void 0,shippingPolicySummary:o.shippingPolicySummary?String(o.shippingPolicySummary):void 0,returnPolicySummary:o.returnPolicySummary?String(o.returnPolicySummary):void 0,affiliateProvider:o.affiliateProvider?String(o.affiliateProvider):void 0,affiliateDisclosure:o.affiliateDisclosure?String(o.affiliateDisclosure):void 0,priceDisplayPolicy:o.priceDisplayPolicy?String(o.priceDisplayPolicy):void 0,availabilityDisplayPolicy:o.availabilityDisplayPolicy?String(o.availabilityDisplayPolicy):void 0,recommendedFor:t(o.recommendedFor),eventUseCase:o.eventUseCase?String(o.eventUseCase):void 0,printfulProductId:o.printfulProductId?String(o.printfulProductId):void 0,printfulVariantIds:t(o.printfulVariantIds),status:Bo(o.status),readTime:Lo(o.readTime),content:r||"",slug:jo(s)};if(o.type==="event"){const g=o.themeName||o.themeLabel||o.themeDescription||o.themeColors||o.themeOutfitIds||o.themeAccessoryIds?{name:String(o.themeName||""),label:o.themeLabel?String(o.themeLabel):void 0,description:o.themeDescription?String(o.themeDescription):void 0,colors:t(o.themeColors),outfitIds:t(o.themeOutfitIds),accessoryIds:t(o.themeAccessoryIds)}:void 0,u=o.gearOutfitIds||o.gearOutfitDescription||o.gearAccessoryIds||o.gearAccessoryDescription||o.gearShoeIds||o.gearShoeDescription||o.gearEssentialIds||o.gearEssentialDescription||o.gearTravelIds||o.gearTravelDescription?{outfitIds:t(o.gearOutfitIds),outfitDescription:o.gearOutfitDescription?String(o.gearOutfitDescription):void 0,accessoryIds:t(o.gearAccessoryIds),accessoryDescription:o.gearAccessoryDescription?String(o.gearAccessoryDescription):void 0,shoeIds:t(o.gearShoeIds),shoeDescription:o.gearShoeDescription?String(o.gearShoeDescription):void 0,essentialIds:t(o.gearEssentialIds),essentialDescription:o.gearEssentialDescription?String(o.gearEssentialDescription):void 0,travelIds:t(o.gearTravelIds),travelDescription:o.gearTravelDescription?String(o.gearTravelDescription):void 0}:void 0,p=o.theme,b=p?{name:String(p.name||""),label:p.label?String(p.label):void 0,description:p.description?String(p.description):void 0,colors:t(p.colors),outfitIds:t(p.outfitIds),accessoryIds:t(p.accessoryIds)}:void 0,m=o.gear,v=m?{outfitIds:t(m.outfitIds),outfitDescription:m.outfitDescription?String(m.outfitDescription):void 0,accessoryIds:t(m.accessoryIds),accessoryDescription:m.accessoryDescription?String(m.accessoryDescription):void 0,shoeIds:t(m.shoeIds),shoeDescription:m.shoeDescription?String(m.shoeDescription):void 0,essentialIds:t(m.essentialIds),essentialDescription:m.essentialDescription?String(m.essentialDescription):void 0,travelIds:t(m.travelIds),travelDescription:m.travelDescription?String(m.travelDescription):void 0}:void 0;h.theme=b??g,h.gear=v??u,h.relatedEvents=t(o.relatedEvents)}return h}).filter(s=>s.draft?s.type==="study"&&(s.status==="planned"||s.status==="draft"):!0).sort((s,i)=>{const a=s.date?new Date(s.date).getTime():0,o=i.date?new Date(i.date).getTime():0,r=Number.isNaN(a)?0:a;return(Number.isNaN(o)?0:o)-r})}const z={posts:De(Ie.posts,"post"),resources:De(Ie.resources,"resource"),studies:De(Ie.studies,"study"),events:De(Ie.events,"event")},wt={posts:new Map(z.posts.map(n=>[n.slug,n])),resources:new Map(z.resources.map(n=>[n.slug,n])),studies:new Map(z.studies.map(n=>[n.slug,n])),events:new Map(z.events.map(n=>[n.slug,n]))},xo=()=>z.posts,Ro=()=>z.resources,Wo=()=>z.studies,$o=()=>z.events,Uo=n=>wt.posts.get(n),qo=n=>wt.resources.get(n),zo=n=>wt.events.get(n),Ho=(n,e)=>{if(n&&n.trim().length>0)return Math.max(1,Math.round(n.split(/\s+/).length/200));const t=e?.split(/\s+/).length??0;return Math.max(1,Math.round(t/20))};export{xo as a,Uo as b,Ro as c,qo as d,zo as e,Wo as f,$o as g,Fo as n,Ho as r};
