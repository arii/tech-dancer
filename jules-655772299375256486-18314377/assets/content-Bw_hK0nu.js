import{A as Qe}from"./index-Cqf3_1g9.js";const mn=`---
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
`,yn=Object.freeze(Object.defineProperty({__proto__:null,default:mn},Symbol.toStringTag,{value:"Module"})),bn=`---
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
`,wn=Object.freeze(Object.defineProperty({__proto__:null,default:bn},Symbol.toStringTag,{value:"Module"})),kn=`---
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
`,vn=Object.freeze(Object.defineProperty({__proto__:null,default:kn},Symbol.toStringTag,{value:"Module"})),Sn=`---
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

`,Tn=Object.freeze(Object.defineProperty({__proto__:null,default:Sn},Symbol.toStringTag,{value:"Module"})),An=`---
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
`,_n=Object.freeze(Object.defineProperty({__proto__:null,default:An},Symbol.toStringTag,{value:"Module"})),In=`---
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
`,On=Object.freeze(Object.defineProperty({__proto__:null,default:In},Symbol.toStringTag,{value:"Module"})),Nn=`---
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
`,Cn=Object.freeze(Object.defineProperty({__proto__:null,default:Nn},Symbol.toStringTag,{value:"Module"})),En=`---
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
`,Dn=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"})),Pn=`---
type: post
title: "Event Travel & Packing"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Packing organizers and garment care items for out-of-town events."
image: "/images/gear/sketches/compression-cubes.webp"
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

![Event Travel & Packing](/images/gear/sketches/compression-cubes.webp)

### Space-Saving Organization
Compression packing cubes are a must for fitting multiple outfits into a carry-on. They keep your workshops clothes separate from your social wear and save a significant amount of space.

<notice type="affiliate" id="compression-cubes" />

### Travel-Sized Essentials
Silicone travel bottles are leak-proof and TSA-approved, making it easy to bring your favorite shampoos and lotions without worry.

<notice type="affiliate" id="travel-bottles" />

### Wrinkle-Free Outfits
Don't let suitcase wrinkles ruin your competition look. A portable garment steamer is small enough to fit in your bag and powerful enough to freshen up your shirts and dresses in minutes.

<notice type="affiliate" id="portable-steamer" />
`,Ln=Object.freeze(Object.defineProperty({__proto__:null,default:Pn},Symbol.toStringTag,{value:"Module"})),jn=`---
type: post
title: "General Health & Home Care for Dancers"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Self-care and body maintenance items primarily used at home for recovery."
image: "/images/gear/sketches/foam-roller.webp"
affiliateIds:
  - "foam-roller"
tags:
  - "health"
  - "recovery"
  - "maintenance"
---

Recovery is just as important as practice. After a long weekend of dancing, your muscles need some extra attention to prevent injury and soreness.

### Muscle Recovery
A high-density foam roller is an essential tool for any dancer's home recovery kit. It helps roll out tight calves, quads, and back muscles, ensuring you're ready for your next session.

<notice type="affiliate" id="foam-roller" />
`,Bn=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Mn=`---
type: post
title: "Outdoor Dancing Gear"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Gear specifically suited for outdoor events, festivals, or warm-weather dancing."
image: "/images/gear/sketches/fanny-pack.webp"
affiliateIds:
  - "running-belt"
  - "sunscreen"
  - "visor"
tags:
  - "outdoor"
  - "summer"
  - "gear"
---

Dancing outdoors brings its own set of challenges, from sun exposure to keeping your valuables secure while you're active. Here’s the essential gear for your next outdoor festival or warm-weather social.

### Keep Your Valuables Safe
A slim fanny pack or running belt is perfect for keeping your phone, keys, and cash secure without adding bulk or restricting your movement.

<notice type="affiliate" id="running-belt" />

### Sun Protection is Non-Negotiable
If you're dancing under the sun, SPF 50 sunscreen and a good visor are essential to prevent burns and keep the sun out of your eyes so you can focus on your partner.

<notice type="affiliate" id="sunscreen" />
<notice type="affiliate" id="visor" />
`,$n=Object.freeze(Object.defineProperty({__proto__:null,default:Mn},Symbol.toStringTag,{value:"Module"})),Rn=`---
type: post
title: "Power & Charging Essentials"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "On-the-go backup power sources for phones, speakers, and event accessories."
image: "/images/gear/amazon/anker-20000mah-power-bank.jpg"
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

<notice type="affiliate" id="portable-charger" />

### Fast and Flexible Charging
Multi-charging cables allow you to charge multiple devices at once with high-speed 3A charging, reducing the number of cords you need to pack.

<notice type="affiliate" id="charging-cables" />
`,Fn=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),Un=`---
type: post
title: "Practice & Review Tech"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Electronics and tools for listening to music, rehearsing, or recording practice runs."
image: "/images/gear/amazon/portable-speaker.jpg"
affiliateIds:
  - "portable-speaker"
  - "tripod"
tags:
  - "tech"
  - "practice"
  - "video"
---

Improving your dance requires consistent practice and review. These tech tools make it easier to rehearse anywhere and analyze your movement.

### Music on the Go
A reliable, portable Bluetooth speaker is essential for hotel room practices or outdoor meetups. The UE Wonderboom 4 offers great sound in a compact, durable package.

<notice type="affiliate" id="portable-speaker" />

### Record Your Progress
You can't fix what you can't see. A compact travel tripod allows you to easily film your practice sessions or competition heats for later review.

<notice type="affiliate" id="tripod" />
`,qn=Object.freeze(Object.defineProperty({__proto__:null,default:Un},Symbol.toStringTag,{value:"Module"})),Kn=`---
type: post
title: "Practice & Social Dance Apparel"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Basic functional dance wear and layering accessories for your next practice or social."
image: "/images/gear/sketches/mesh-fishnet-top.webp"
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

### Breathable Basics
Crop tops are a favorite for a reason—they're lightweight and keep you cool during intense workshops.

<notice type="affiliate" id="sports-crop-tops" />
<notice type="affiliate" id="reflective-crop-tops" />

### Layering with Style
Mesh and fishnet tops are great for adding texture to your outfit without adding heat, while fishnet tights provide a classic dance look.

<notice type="affiliate" id="mesh-fishnet-top" />
<notice type="affiliate" id="fishnet-tights" />
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:Kn},Symbol.toStringTag,{value:"Module"})),Wn=`---
type: post
title: "Shoe Care & Modification"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Products focused on modifying, drying, and preserving dance footwear."
image: "/images/gear/amazon/suede-stick-on-sheets.jpg"
affiliateIds:
  - "suede-sheets"
  - "shoe-dryer"
tags:
  - "shoes"
  - "diy"
  - "maintenance"
---

Your shoes are your most important piece of equipment. Taking care of them (and modifying them to fit your needs) can save you money and improve your dancing.

![Shoe Care & Modification](/images/gear/amazon/suede-stick-on-sheets.jpg)

### DIY Dance Shoes
Not every comfortable shoe comes with a dance-ready sole. Adhesive suede sheets allow you to turn your favorite sneakers into high-performance dance shoes with just a pair of scissors.

<notice type="affiliate" id="suede-sheets" />

### Fresh and Dry
Sweaty shoes are not only unpleasant but also deteriorate faster. An electric shoe dryer and deodorizer is a game-changer for multi-day events, ensuring your shoes are dry and fresh every morning.

<notice type="affiliate" id="shoe-dryer" />
`,Gn=Object.freeze(Object.defineProperty({__proto__:null,default:Wn},Symbol.toStringTag,{value:"Module"})),Hn=`---
type: post
title: "Theme Wear, Costumes & Accessories"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Accessories and props curated for themed social dance nights (e.g., Space/Alien, Glow, Nerd, Halloween)."
image: "/images/gear/sketches/glow_suspenders.webp"
affiliateIds:
  - "alien-mask"
  - "green-bodysuit"
  - "light-up-suspenders"
  - "nerd-set"
  - "pumpkin-headbands"
  - "pumpkin-stickers"
tags:
  - "fashion"
  - "costumes"
  - "themes"
---

Theme nights are a staple of West Coast Swing conventions. From "Galactic" to "Nerd Night," having the right accessories can make your outfit stand out without breaking the bank.

### Galactic & Space Themes
Commit to the alien look with a full-body spandex suit and a latex mask.

<notice type="affiliate" id="green-bodysuit" />
<notice type="affiliate" id="alien-mask" />

### Glow & Nerd Nights
Light up the dance floor with LED suspenders, or go for the classic nerd look with a pre-assembled set.

<notice type="affiliate" id="light-up-suspenders" />
<notice type="affiliate" id="nerd-set" />

### Halloween Fun
Quick and easy pumpkin costumes are perfect for social dancing. A headband and some adhesive felt stickers are all you need to be festive in seconds.

<notice type="affiliate" id="pumpkin-headbands" />
<notice type="affiliate" id="pumpkin-stickers" />
`,Vn=Object.freeze(Object.defineProperty({__proto__:null,default:Hn},Symbol.toStringTag,{value:"Module"})),zn=`---
type: post
title: "WCS Essentials (Local & Travel)"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "High-priority essentials to bring to any West Coast Swing event, whether local or out-of-town."
image: "/images/gear/amazon/loop-experience-ear-plugs.jpg"
affiliateIds:
  - "rave-fan"
  - "loop-experience"
tags:
  - "essentials"
  - "gear"
  - "wcs"
---

Whether you're heading to a local social or traveling across the country for a convention, these two items are high-priority essentials for any West Coast Swing dancer.

![Gear Essentials Layout](/images/gear/amazon/loop-experience-ear-plugs.jpg)

### Stay Cool on the Floor
Crowded dance floors can get incredibly hot. A large folding fan is the most effective way to cool yourself down (and your partners!) between songs.

<notice type="affiliate" id="rave-fan" />

### Protect Your Hearing
Ballroom sound systems are often cranked up to high volumes. To enjoy the music without the ringing in your ears the next morning, high-fidelity earplugs are a must. They lower the decibels while preserving the clarity of the music and conversation.

<notice type="affiliate" id="loop-experience" />
`,Yn=Object.freeze(Object.defineProperty({__proto__:null,default:zn},Symbol.toStringTag,{value:"Module"})),Jn=`---
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
`,Qn=Object.freeze(Object.defineProperty({__proto__:null,default:Jn},Symbol.toStringTag,{value:"Module"})),Xn=`---
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
`,Zn=Object.freeze(Object.defineProperty({__proto__:null,default:Xn},Symbol.toStringTag,{value:"Module"})),it=Symbol.for("yaml.alias"),Xe=Symbol.for("yaml.document"),W=Symbol.for("yaml.map"),Dt=Symbol.for("yaml.pair"),F=Symbol.for("yaml.scalar"),re=Symbol.for("yaml.seq"),M=Symbol.for("yaml.node.type"),ae=n=>!!n&&typeof n=="object"&&n[M]===it,Be=n=>!!n&&typeof n=="object"&&n[M]===Xe,be=n=>!!n&&typeof n=="object"&&n[M]===W,C=n=>!!n&&typeof n=="object"&&n[M]===Dt,I=n=>!!n&&typeof n=="object"&&n[M]===F,we=n=>!!n&&typeof n=="object"&&n[M]===re;function O(n){if(n&&typeof n=="object")switch(n[M]){case W:case re:return!0}return!1}function N(n){if(n&&typeof n=="object")switch(n[M]){case it:case W:case F:case re:return!0}return!1}const Pt=n=>(I(n)||O(n))&&!!n.anchor,G=Symbol("break visit"),es=Symbol("skip children"),pe=Symbol("remove node");function le(n,e){const t=ts(e);Be(n)?X(null,n.contents,t,Object.freeze([n]))===pe&&(n.contents=null):X(null,n,t,Object.freeze([]))}le.BREAK=G;le.SKIP=es;le.REMOVE=pe;function X(n,e,t,s){const i=ns(n,e,t,s);if(N(i)||C(i))return ss(n,s,i),X(n,i,t,s);if(typeof i!="symbol"){if(O(e)){s=Object.freeze(s.concat(e));for(let r=0;r<e.items.length;++r){const o=X(r,e.items[r],t,s);if(typeof o=="number")r=o-1;else{if(o===G)return G;o===pe&&(e.items.splice(r,1),r-=1)}}}else if(C(e)){s=Object.freeze(s.concat(e));const r=X("key",e.key,t,s);if(r===G)return G;r===pe&&(e.key=null);const o=X("value",e.value,t,s);if(o===G)return G;o===pe&&(e.value=null)}}return i}function ts(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function ns(n,e,t,s){if(typeof t=="function")return t(n,e,s);if(be(e))return t.Map?.(n,e,s);if(we(e))return t.Seq?.(n,e,s);if(C(e))return t.Pair?.(n,e,s);if(I(e))return t.Scalar?.(n,e,s);if(ae(e))return t.Alias?.(n,e,s)}function ss(n,e,t){const s=e[e.length-1];if(O(s))s.items[n]=t;else if(C(s))n==="key"?s.key=t:s.value=t;else if(Be(s))s.contents=t;else{const i=ae(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const is={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},os=n=>n.replace(/[!,[\]{}]/g,e=>is[e]);class P{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},P.defaultYaml,e),this.tags=Object.assign({},P.defaultTags,t)}clone(){const e=new P(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new P(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:P.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},P.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:P.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},P.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[r,o]=s;return this.tags[r]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[r]=s;if(r==="1.1"||r==="1.2")return this.yaml.version=r,!0;{const o=/^\d+\.\d+$/.test(r);return t(6,`Unsupported YAML version ${r}`,o),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const o=e.slice(2,-1);return o==="!"||o==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),o)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const r=this.tags[s];if(r)try{return r+decodeURIComponent(i)}catch(o){return t(String(o)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+os(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&N(e.contents)){const r={};le(e.contents,(o,a)=>{N(a)&&a.tag&&(r[a.tag]=!0)}),i=Object.keys(r)}else i=[];for(const[r,o]of s)r==="!!"&&o==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(o)))&&t.push(`%TAG ${r} ${o}`);return t.join(`
`)}}P.defaultYaml={explicit:!1,version:"1.2"};P.defaultTags={"!!":"tag:yaml.org,2002:"};function Lt(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function jt(n){const e=new Set;return le(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Bt(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function rs(n,e){const t=[],s=new Map;let i=null;return{onAnchor:r=>{t.push(r),i??(i=jt(n));const o=Bt(e,i);return i.add(o),o},setAnchors:()=>{for(const r of t){const o=s.get(r);if(typeof o=="object"&&o.anchor&&(I(o.node)||O(o.node)))o.node.anchor=o.anchor;else{const a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=r,a}}},sourceObjects:s}}function Z(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,r=s.length;i<r;++i){const o=s[i],a=Z(n,s,String(i),o);a===void 0?delete s[i]:a!==o&&(s[i]=a)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const r=s.get(i),o=Z(n,s,i,r);o===void 0?s.delete(i):o!==r&&s.set(i,o)}else if(s instanceof Set)for(const i of Array.from(s)){const r=Z(n,s,i,i);r===void 0?s.delete(i):r!==i&&(s.delete(i),s.add(r))}else for(const[i,r]of Object.entries(s)){const o=Z(n,s,i,r);o===void 0?delete s[i]:o!==r&&(s[i]=o)}return n.call(e,t,s)}function B(n,e,t){if(Array.isArray(n))return n.map((s,i)=>B(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Pt(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=r=>{s.res=r,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}class ot{constructor(e){Object.defineProperty(this,M,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:r}={}){if(!Be(e))throw new TypeError("A document argument is required");const o={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},a=B(this,"",o);if(typeof i=="function")for(const{count:l,res:c}of o.anchors.values())i(c,l);return typeof r=="function"?Z(r,{"":a},"",a):a}}class rt extends ot{constructor(e){super(it),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError("Alias resolution is disabled");let s;t?.aliasResolveCache?s=t.aliasResolveCache:(s=[],le(e,{Node:(r,o)=>{(ae(o)||Pt(o))&&s.push(o)}}),t&&(t.aliasResolveCache=s));let i;for(const r of s){if(r===this)break;r.anchor===this.source&&(i=r)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:r}=t,o=this.resolve(i,t);if(!o){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=s.get(o);if(a||(B(o,null,t),a=s.get(o)),a?.res===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(r>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Ce(i,o,s)),a.count*a.aliasCount>r)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(Lt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const r=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(r)}if(e.implicitKey)return`${i} `}return i}}function Ce(n,e,t){if(ae(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(O(e)){let s=0;for(const i of e.items){const r=Ce(n,i,t);r>s&&(s=r)}return s}else if(C(e)){const s=Ce(n,e.key,t),i=Ce(n,e.value,t);return Math.max(s,i)}return 1}const Mt=n=>!n||typeof n!="function"&&typeof n!="object";class T extends ot{constructor(e){super(F),this.value=e}toJSON(e,t){return t?.keep?this.value:B(this.value,e,t)}toString(){return String(this.value)}}T.BLOCK_FOLDED="BLOCK_FOLDED";T.BLOCK_LITERAL="BLOCK_LITERAL";T.PLAIN="PLAIN";T.QUOTE_DOUBLE="QUOTE_DOUBLE";T.QUOTE_SINGLE="QUOTE_SINGLE";const as="tag:yaml.org,2002:";function ls(n,e,t){if(e){const s=t.filter(r=>r.tag===e),i=s.find(r=>!r.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>s.identify?.(n)&&!s.format)}function me(n,e,t){if(Be(n)&&(n=n.contents),N(n))return n;if(C(n)){const u=t.schema[W].createNode?.(t.schema,null,t);return u.items.push(n),u}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:r,schema:o,sourceObjects:a}=t;let l;if(s&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor??(l.anchor=i(n)),new rt(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=as+e.slice(2));let c=ls(n,e,o.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const u=new T(n);return l&&(l.node=u),u}c=n instanceof Map?o[W]:Symbol.iterator in Object(n)?o[re]:o[W]}r&&(r(c),delete t.onTagObj);const d=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new T(n);return e?d.tag=e:c.default||(d.tag=c.tag),l&&(l.node=d),d}function Pe(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const r=e[i];if(typeof r=="number"&&Number.isInteger(r)&&r>=0){const o=[];o[r]=s,s=o}else s=new Map([[r,s]])}return me(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const he=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class $t extends ot{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>N(s)||C(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(he(e))this.add(t);else{const[s,...i]=e,r=this.get(s,!0);if(O(r))r.addIn(i,t);else if(r===void 0&&this.schema)this.set(s,Pe(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(O(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,r=this.get(s,!0);return i.length===0?!t&&I(r)?r.value:r:O(r)?r.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!C(t))return!1;const s=t.value;return s==null||e&&I(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return O(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const r=this.get(s,!0);if(O(r))r.setIn(i,t);else if(r===void 0&&this.schema)this.set(s,Pe(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const cs=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function U(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const H=(n,e,t)=>n.endsWith(`
`)?U(t,e):t.includes(`
`)?`
`+U(t,e):(n.endsWith(" ")?"":" ")+t,Rt="flow",Ze="block",Ee="quoted";function Me(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:r=20,onFold:o,onOverflow:a}={}){if(!i||i<0)return n;i<r&&(r=0);const l=Math.max(1+r,1+i-e.length);if(n.length<=l)return n;const c=[],d={};let u=i-e.length;typeof s=="number"&&(s>i-Math.max(2,r)?c.push(0):u=i-s);let f,g,y=!1,h=-1,p=-1,b=-1;t===Ze&&(h=kt(n,h,e.length),h!==-1&&(u=h+l));for(let k;k=n[h+=1];){if(t===Ee&&k==="\\"){switch(p=h,n[h+1]){case"x":h+=3;break;case"u":h+=5;break;case"U":h+=9;break;default:h+=1}b=h}if(k===`
`)t===Ze&&(h=kt(n,h,e.length)),u=h+e.length+l,f=void 0;else{if(k===" "&&g&&g!==" "&&g!==`
`&&g!=="	"){const v=n[h+1];v&&v!==" "&&v!==`
`&&v!=="	"&&(f=h)}if(h>=u)if(f)c.push(f),u=f+l,f=void 0;else if(t===Ee){for(;g===" "||g==="	";)g=k,k=n[h+=1],y=!0;const v=h>b+1?h-2:p-1;if(d[v])return n;c.push(v),d[v]=!0,u=v+l,f=void 0}else y=!0}g=k}if(y&&a&&a(),c.length===0)return n;o&&o();let m=n.slice(0,c[0]);for(let k=0;k<c.length;++k){const v=c[k],S=c[k+1]||n.length;v===0?m=`
${e}${n.slice(0,S)}`:(t===Ee&&d[v]&&(m+=`${n[v]}\\`),m+=`
${e}${n.slice(v+1,S)}`)}return m}function kt(n,e,t){let s=e,i=e+1,r=n[i];for(;r===" "||r==="	";)if(e<i+t)r=n[++e];else{do r=n[++e];while(r&&r!==`
`);s=e,i=e+1,r=n[i]}return s}const $e=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Re=n=>/^(%|---|\.\.\.)/m.test(n);function us(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let r=0,o=0;r<i;++r)if(n[r]===`
`){if(r-o>s)return!0;if(o=r+1,i-o<=s)return!1}return!0}function ge(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,r=e.indent||(Re(n)?"  ":"");let o="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(o+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{o+=t.slice(a,l);const d=t.substr(l+2,4);switch(d){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:d.substr(0,2)==="00"?o+="\\x"+d.substr(2):o+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(o+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)o+=`
`,l+=2;o+=r,t[l+2]===" "&&(o+="\\"),l+=1,a=l+1}break;default:l+=1}return o=a?o+t.slice(a):t,s?o:Me(o,r,Ee,$e(e,!1))}function et(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ge(n,e);const t=e.indent||(Re(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Me(s,t,Rt,$e(e,!1))}function ee(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ge;else{const i=n.includes('"'),r=n.includes("'");i&&!r?s=et:r&&!i?s=ge:s=t?et:ge}return s(n,e)}let tt;try{tt=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{tt=/\n+(?!\n|$)/g}function De({comment:n,type:e,value:t},s,i,r){const{blockQuote:o,commentString:a,lineWidth:l}=s.options;if(!o||/\n[\t ]+$/.test(t))return ee(t,s);const c=s.indent||(s.forceBlockIndent||Re(t)?"  ":""),d=o==="literal"?!0:o==="folded"||e===T.BLOCK_FOLDED?!1:e===T.BLOCK_LITERAL?!0:!us(t,l,c.length);if(!t)return d?`|
`:`>
`;let u,f;for(f=t.length;f>0;--f){const S=t[f-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let g=t.substring(f);const y=g.indexOf(`
`);y===-1?u="-":t===g||y!==g.length-1?(u="+",r&&r()):u="",g&&(t=t.slice(0,-g.length),g[g.length-1]===`
`&&(g=g.slice(0,-1)),g=g.replace(tt,`$&${c}`));let h=!1,p,b=-1;for(p=0;p<t.length;++p){const S=t[p];if(S===" ")h=!0;else if(S===`
`)b=p;else break}let m=t.substring(0,b<p?b+1:p);m&&(t=t.substring(m.length),m=m.replace(/\n+/g,`$&${c}`));let v=(h?c?"2":"1":"")+u;if(n&&(v+=" "+a(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!d){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let A=!1;const _=$e(s,!0);o!=="folded"&&e!==T.BLOCK_FOLDED&&(_.onOverflow=()=>{A=!0});const w=Me(`${m}${S}${g}`,c,Ze,_);if(!A)return`>${v}
${c}${w}`}return t=t.replace(/\n+/g,`$&${c}`),`|${v}
${c}${m}${t}${g}`}function fs(n,e,t,s){const{type:i,value:r}=n,{actualString:o,implicitKey:a,indent:l,indentStep:c,inFlow:d}=e;if(a&&r.includes(`
`)||d&&/[[\]{},]/.test(r))return ee(r,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))return a||d||!r.includes(`
`)?ee(r,e):De(n,e,t,s);if(!a&&!d&&i!==T.PLAIN&&r.includes(`
`))return De(n,e,t,s);if(Re(r)){if(l==="")return e.forceBlockIndent=!0,De(n,e,t,s);if(a&&l===c)return ee(r,e)}const u=r.replace(/\n+/g,`$&
${l}`);if(o){const f=h=>h.default&&h.tag!=="tag:yaml.org,2002:str"&&h.test?.test(u),{compat:g,tags:y}=e.doc.schema;if(y.some(f)||g?.some(f))return ee(r,e)}return a?u:Me(u,l,Rt,$e(e,!1))}function at(n,e,t,s){const{implicitKey:i,inFlow:r}=e,o=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:a}=n;a!==T.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(a=T.QUOTE_DOUBLE);const l=d=>{switch(d){case T.BLOCK_FOLDED:case T.BLOCK_LITERAL:return i||r?ee(o.value,e):De(o,e,t,s);case T.QUOTE_DOUBLE:return ge(o.value,e);case T.QUOTE_SINGLE:return et(o.value,e);case T.PLAIN:return fs(o,e,t,s);default:return null}};let c=l(a);if(c===null){const{defaultKeyType:d,defaultStringType:u}=e.options,f=i&&d||u;if(c=l(f),c===null)throw new Error(`Unsupported default string type ${f}`)}return c}function Ft(n,e){const t=Object.assign({blockQuote:!0,commentString:cs,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function hs(n,e){if(e.tag){const i=n.filter(r=>r.tag===e.tag);if(i.length>0)return i.find(r=>r.format===e.format)??i[0]}let t,s;if(I(e)){s=e.value;let i=n.filter(r=>r.identify?.(s));if(i.length>1){const r=i.filter(o=>o.test);r.length>0&&(i=r)}t=i.find(r=>r.format===e.format)??i.find(r=>!r.format)}else s=e,t=n.find(i=>i.nodeClass&&s instanceof i.nodeClass);if(!t){const i=s?.constructor?.name??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${i} value`)}return t}function ds(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],r=(I(n)||O(n))&&n.anchor;r&&Lt(r)&&(t.add(r),i.push(`&${r}`));const o=n.tag??(e.default?null:e.tag);return o&&i.push(s.directives.tagString(o)),i.join(" ")}function ie(n,e,t,s){if(C(n))return n.toString(e,t,s);if(ae(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const r=N(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=hs(e.doc.schema.tags,r));const o=ds(r,i,e);o.length>0&&(e.indentAtStart=(e.indentAtStart??0)+o.length+1);const a=typeof i.stringify=="function"?i.stringify(r,e,t,s):I(r)?at(r,e,t,s):r.toString(e,t,s);return o?I(r)||a[0]==="{"||a[0]==="["?`${o} ${a}`:`${o}
${e.indent}${a}`:a}function ps({key:n,value:e},t,s,i){const{allNullValues:r,doc:o,indent:a,indentStep:l,options:{commentString:c,indentSeq:d,simpleKeys:u}}=t;let f=N(n)&&n.comment||null;if(u){if(f)throw new Error("With simple keys, key nodes cannot have comments");if(O(n)||!N(n)&&typeof n=="object"){const _="With simple keys, collection cannot be used as a key value";throw new Error(_)}}let g=!u&&(!n||f&&e==null&&!t.inFlow||O(n)||(I(n)?n.type===T.BLOCK_FOLDED||n.type===T.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!g&&(u||!r),indent:a+l});let y=!1,h=!1,p=ie(n,t,()=>y=!0,()=>h=!0);if(!g&&!t.inFlow&&p.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");g=!0}if(t.inFlow){if(r||e==null)return y&&s&&s(),p===""?"?":g?`? ${p}`:p}else if(r&&!u||e==null&&g)return p=`? ${p}`,f&&!y?p+=H(p,t.indent,c(f)):h&&i&&i(),p;y&&(f=null),g?(f&&(p+=H(p,t.indent,c(f))),p=`? ${p}
${a}:`):(p=`${p}:`,f&&(p+=H(p,t.indent,c(f))));let b,m,k;N(e)?(b=!!e.spaceBefore,m=e.commentBefore,k=e.comment):(b=!1,m=null,k=null,e&&typeof e=="object"&&(e=o.createNode(e))),t.implicitKey=!1,!g&&!f&&I(e)&&(t.indentAtStart=p.length+1),h=!1,!d&&l.length>=2&&!t.inFlow&&!g&&we(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let v=!1;const S=ie(e,t,()=>v=!0,()=>h=!0);let A=" ";if(f||b||m){if(A=b?`
`:"",m){const _=c(m);A+=`
${U(_,t.indent)}`}S===""&&!t.inFlow?A===`
`&&k&&(A=`

`):A+=`
${t.indent}`}else if(!g&&O(e)){const _=S[0],w=S.indexOf(`
`),E=w!==-1,K=t.inFlow??e.flow??e.items.length===0;if(E||!K){let Y=!1;if(E&&(_==="&"||_==="!")){let D=S.indexOf(" ");_==="&"&&D!==-1&&D<w&&S[D+1]==="!"&&(D=S.indexOf(" ",D+1)),(D===-1||w<D)&&(Y=!0)}Y||(A=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(A="");return p+=A+S,t.inFlow?v&&s&&s():k&&!v?p+=H(p,t.indent,c(k)):h&&i&&i(),p}function Ut(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Se="<<",q={identify:n=>n===Se||typeof n=="symbol"&&n.description===Se,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new T(Symbol(Se)),{addToJSMap:qt}),stringify:()=>Se},gs=(n,e)=>(q.identify(e)||I(e)&&(!e.type||e.type===T.PLAIN)&&q.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===q.tag&&t.default);function qt(n,e,t){const s=Kt(n,t);if(we(s))for(const i of s.items)Ge(n,e,i);else if(Array.isArray(s))for(const i of s)Ge(n,e,i);else Ge(n,e,s)}function Ge(n,e,t){const s=Kt(n,t);if(!be(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[r,o]of i)e instanceof Map?e.has(r)||e.set(r,o):e instanceof Set?e.add(r):Object.prototype.hasOwnProperty.call(e,r)||Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0});return e}function Kt(n,e){return n&&ae(e)?e.resolve(n.doc,n):e}function xt(n,e,{key:t,value:s}){if(N(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(gs(n,t))qt(n,e,s);else{const i=B(t,"",n);if(e instanceof Map)e.set(i,B(s,i,n));else if(e instanceof Set)e.add(i);else{const r=ms(t,i,n),o=B(s,r,n);r in e?Object.defineProperty(e,r,{value:o,writable:!0,enumerable:!0,configurable:!0}):e[r]=o}}return e}function ms(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(N(n)&&t?.doc){const s=Ft(t.doc,{});s.anchors=new Set;for(const r of t.anchors.keys())s.anchors.add(r.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let r=JSON.stringify(i);r.length>40&&(r=r.substring(0,36)+'..."'),Ut(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function lt(n,e,t){const s=me(n,void 0,t),i=me(e,void 0,t);return new L(s,i)}class L{constructor(e,t=null){Object.defineProperty(this,M,{value:Dt}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return N(t)&&(t=t.clone(e)),N(s)&&(s=s.clone(e)),new L(t,s)}toJSON(e,t){const s=t?.mapAsMap?new Map:{};return xt(t,s,this)}toString(e,t,s){return e?.doc?ps(this,e,t,s):JSON.stringify(this)}}function Wt(n,e,t){return(e.inFlow??n.flow?bs:ys)(n,e,t)}function ys({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:r,onChompKeep:o,onComment:a}){const{indent:l,options:{commentString:c}}=t,d=Object.assign({},t,{indent:r,type:null});let u=!1;const f=[];for(let y=0;y<e.length;++y){const h=e[y];let p=null;if(N(h))!u&&h.spaceBefore&&f.push(""),Le(t,f,h.commentBefore,u),h.comment&&(p=h.comment);else if(C(h)){const m=N(h.key)?h.key:null;m&&(!u&&m.spaceBefore&&f.push(""),Le(t,f,m.commentBefore,u))}u=!1;let b=ie(h,d,()=>p=null,()=>u=!0);p&&(b+=H(b,r,c(p))),u&&p&&(u=!1),f.push(s+b)}let g;if(f.length===0)g=i.start+i.end;else{g=f[0];for(let y=1;y<f.length;++y){const h=f[y];g+=h?`
${l}${h}`:`
`}}return n?(g+=`
`+U(c(n),l),a&&a()):u&&o&&o(),g}function bs({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:r,flowCollectionPadding:o,options:{commentString:a}}=e;s+=r;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,d=0;const u=[];for(let y=0;y<n.length;++y){const h=n[y];let p=null;if(N(h))h.spaceBefore&&u.push(""),Le(e,u,h.commentBefore,!1),h.comment&&(p=h.comment);else if(C(h)){const m=N(h.key)?h.key:null;m&&(m.spaceBefore&&u.push(""),Le(e,u,m.commentBefore,!1),m.comment&&(c=!0));const k=N(h.value)?h.value:null;k?(k.comment&&(p=k.comment),k.commentBefore&&(c=!0)):h.value==null&&m?.comment&&(p=m.comment)}p&&(c=!0);let b=ie(h,l,()=>p=null);c||(c=u.length>d||b.includes(`
`)),y<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=u.reduce((m,k)=>m+k.length+2,2)+(b.length+2)>e.options.lineWidth)),c&&(b+=",")),p&&(b+=H(b,s,a(p))),u.push(b),d=u.length}const{start:f,end:g}=t;if(u.length===0)return f+g;if(!c){const y=u.reduce((h,p)=>h+p.length+2,2);c=e.options.lineWidth>0&&y>e.options.lineWidth}if(c){let y=f;for(const h of u)y+=h?`
${r}${i}${h}`:`
`;return`${y}
${i}${g}`}else return`${f}${o}${u.join(" ")}${o}${g}`}function Le({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const r=U(e(s),n);t.push(r.trimStart())}}function V(n,e){const t=I(e)?e.value:e;for(const s of n)if(C(s)&&(s.key===e||s.key===t||I(s.key)&&s.key.value===t))return s}class j extends $t{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(W,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:r}=s,o=new this(e),a=(l,c)=>{if(typeof r=="function")c=r.call(t,l,c);else if(Array.isArray(r)&&!r.includes(l))return;(c!==void 0||i)&&o.items.push(lt(l,c,s))};if(t instanceof Map)for(const[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&o.items.sort(e.sortMapEntries),o}add(e,t){let s;C(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new L(e,e?.value):s=new L(e.key,e.value);const i=V(this.items,s.key),r=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);I(i.value)&&Mt(s.value)?i.value.value=s.value:i.value=s.value}else if(r){const o=this.items.findIndex(a=>r(s,a)<0);o===-1?this.items.push(s):this.items.splice(o,0,s)}else this.items.push(s)}delete(e){const t=V(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const i=V(this.items,e)?.value;return(!t&&I(i)?i.value:i)??void 0}has(e){return!!V(this.items,e)}set(e,t){this.add(new L(e,t),!0)}toJSON(e,t,s){const i=s?new s:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(const r of this.items)xt(t,i,r);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!C(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Wt(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const ce={collection:"map",default:!0,nodeClass:j,tag:"tag:yaml.org,2002:map",resolve(n,e){return be(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>j.from(n,e,t)};class z extends $t{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(re,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Te(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Te(e);if(typeof s!="number")return;const i=this.items[s];return!t&&I(i)?i.value:i}has(e){const t=Te(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Te(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];I(i)&&Mt(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t?.onCreate&&t.onCreate(s);let i=0;for(const r of this.items)s.push(B(r,String(i++),t));return s}toString(e,t,s){return e?Wt(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,r=new this(e);if(t&&Symbol.iterator in Object(t)){let o=0;for(let a of t){if(typeof i=="function"){const l=t instanceof Set?a:String(o++);a=i.call(t,l,a)}r.items.push(me(a,void 0,s))}}return r}}function Te(n){let e=I(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ue={collection:"seq",default:!0,nodeClass:z,tag:"tag:yaml.org,2002:seq",resolve(n,e){return we(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>z.from(n,e,t)},Fe={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),at(n,e,t,s)}},Ue={identify:n=>n==null,createNode:()=>new T(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new T(null),stringify:({source:n},e)=>typeof n=="string"&&Ue.test.test(n)?n:e.options.nullStr},ct={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new T(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ct.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function R({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let r=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(r)&&!r.includes("e")){let o=r.indexOf(".");o<0&&(o=r.length,r+=".");let a=e-(r.length-o-1);for(;a-- >0;)r+="0"}return r}const Gt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:R},Ht={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():R(n)}},Vt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new T(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:R},qe=n=>typeof n=="bigint"||Number.isInteger(n),ut=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function zt(n,e,t){const{value:s}=n;return qe(s)&&s>=0?t+s.toString(e):R(n)}const Yt={identify:n=>qe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ut(n,2,8,t),stringify:n=>zt(n,8,"0o")},Jt={identify:qe,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ut(n,0,10,t),stringify:R},Qt={identify:n=>qe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ut(n,2,16,t),stringify:n=>zt(n,16,"0x")},ws=[ce,ue,Fe,Ue,ct,Yt,Jt,Qt,Gt,Ht,Vt];function vt(n){return typeof n=="bigint"||Number.isInteger(n)}const Ae=({value:n})=>JSON.stringify(n),ks=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Ae},{identify:n=>n==null,createNode:()=>new T(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Ae},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Ae},{identify:vt,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>vt(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Ae}],vs={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},Ss=[ce,ue].concat(ks,vs),ft={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,r){if(!t)return"";const o=t;let a;if(typeof btoa=="function"){let l="";for(let c=0;c<o.length;++c)l+=String.fromCharCode(o[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=T.BLOCK_LITERAL),e!==T.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(a.length/l),d=new Array(c);for(let u=0,f=0;u<c;++u,f+=l)d[u]=a.substr(f,l);a=d.join(e===T.BLOCK_LITERAL?`
`:" ")}return at({comment:n,type:e,value:a},s,i,r)}};function Xt(n,e){if(we(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!C(s)){if(be(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new L(new T(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const r=i.value??i.key;r.comment=r.comment?`${s.comment}
${r.comment}`:s.comment}s=i}n.items[t]=C(s)?s:new L(s)}}else e("Expected a sequence for this tag");return n}function Zt(n,e,t){const{replacer:s}=t,i=new z(n);i.tag="tag:yaml.org,2002:pairs";let r=0;if(e&&Symbol.iterator in Object(e))for(let o of e){typeof s=="function"&&(o=s.call(e,String(r++),o));let a,l;if(Array.isArray(o))if(o.length===2)a=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){const c=Object.keys(o);if(c.length===1)a=c[0],l=o[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=o;i.items.push(lt(a,l,t))}return i}const ht={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Xt,createNode:Zt};class ne extends z{constructor(){super(),this.add=j.prototype.add.bind(this),this.delete=j.prototype.delete.bind(this),this.get=j.prototype.get.bind(this),this.has=j.prototype.has.bind(this),this.set=j.prototype.set.bind(this),this.tag=ne.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t?.onCreate&&t.onCreate(s);for(const i of this.items){let r,o;if(C(i)?(r=B(i.key,"",t),o=B(i.value,r,t)):r=B(i,"",t),s.has(r))throw new Error("Ordered maps must not include duplicate keys");s.set(r,o)}return s}static from(e,t,s){const i=Zt(e,t,s),r=new this;return r.items=i.items,r}}ne.tag="tag:yaml.org,2002:omap";const dt={collection:"seq",identify:n=>n instanceof Map,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Xt(n,e),s=[];for(const{key:i}of t.items)I(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new ne,t)},createNode:(n,e,t)=>ne.from(n,e,t)};function en({value:n,source:e},t){return e&&(n?tn:nn).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const tn={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new T(!0),stringify:en},nn={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new T(!1),stringify:en},Ts={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:R},As={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():R(n)}},_s={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new T(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:R},ke=n=>typeof n=="bigint"||Number.isInteger(n);function Ke(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const o=BigInt(n);return i==="-"?BigInt(-1)*o:o}const r=parseInt(n,t);return i==="-"?-1*r:r}function pt(n,e,t){const{value:s}=n;if(ke(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return R(n)}const Is={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>Ke(n,2,2,t),stringify:n=>pt(n,2,"0b")},Os={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>Ke(n,1,8,t),stringify:n=>pt(n,8,"0")},Ns={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>Ke(n,0,10,t),stringify:R},Cs={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>Ke(n,2,16,t),stringify:n=>pt(n,16,"0x")};class se extends j{constructor(e){super(e),this.tag=se.tag}add(e){let t;C(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new L(e.key,null):t=new L(e,null),V(this.items,t.key)||this.items.push(t)}get(e,t){const s=V(this.items,e);return!t&&C(s)?I(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=V(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new L(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,r=new this(e);if(t&&Symbol.iterator in Object(t))for(let o of t)typeof i=="function"&&(o=i.call(t,o,o)),r.items.push(lt(o,null,s));return r}}se.tag="tag:yaml.org,2002:set";const gt={collection:"map",identify:n=>n instanceof Set,nodeClass:se,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>se.from(n,e,t),resolve(n,e){if(be(n)){if(n.hasAllNullValues(!0))return Object.assign(new se,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function mt(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=o=>e?BigInt(o):Number(o),r=s.replace(/_/g,"").split(":").reduce((o,a)=>o*i(60)+i(a),i(0));return t==="-"?i(-1)*r:r}function sn(n){let{value:e}=n,t=o=>o;if(typeof e=="bigint")t=o=>BigInt(o);else if(isNaN(e)||!isFinite(e))return R(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),r=[e%i];return e<60?r.unshift(0):(e=(e-r[0])/i,r.unshift(e%i),e>=60&&(e=(e-r[0])/i,r.unshift(e))),s+r.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const on={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>mt(n,t),stringify:sn},rn={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>mt(n,!1),stringify:sn},xe={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(xe.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,r,o,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,r||0,o||0,a||0,l);const d=e[8];if(d&&d!=="Z"){let u=mt(d,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},St=[ce,ue,Fe,Ue,tn,nn,Is,Os,Ns,Cs,Ts,As,_s,ft,q,dt,ht,gt,on,rn,xe],Tt=new Map([["core",ws],["failsafe",[ce,ue,Fe]],["json",Ss],["yaml11",St],["yaml-1.1",St]]),At={binary:ft,bool:ct,float:Vt,floatExp:Ht,floatNaN:Gt,floatTime:rn,int:Jt,intHex:Qt,intOct:Yt,intTime:on,map:ce,merge:q,null:Ue,omap:dt,pairs:ht,seq:ue,set:gt,timestamp:xe},Es={"tag:yaml.org,2002:binary":ft,"tag:yaml.org,2002:merge":q,"tag:yaml.org,2002:omap":dt,"tag:yaml.org,2002:pairs":ht,"tag:yaml.org,2002:set":gt,"tag:yaml.org,2002:timestamp":xe};function He(n,e,t){const s=Tt.get(e);if(s&&!n)return t&&!s.includes(q)?s.concat(q):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const r=Array.from(Tt.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`)}if(Array.isArray(n))for(const r of n)i=i.concat(r);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(q)),i.reduce((r,o)=>{const a=typeof o=="string"?At[o]:o;if(!a){const l=JSON.stringify(o),c=Object.keys(At).map(d=>JSON.stringify(d)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return r.includes(a)||r.push(a),r},[])}const Ds=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class yt{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:r,sortMapEntries:o,toStringDefaults:a}){this.compat=Array.isArray(e)?He(e,"compat"):e?He(null,e):null,this.name=typeof r=="string"&&r||"core",this.knownTags=i?Es:{},this.tags=He(t,this.name,s),this.toStringOptions=a??null,Object.defineProperty(this,W,{value:ce}),Object.defineProperty(this,F,{value:Fe}),Object.defineProperty(this,re,{value:ue}),this.sortMapEntries=typeof o=="function"?o:o===!0?Ds:null}clone(){const e=Object.create(yt.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Ps(n,e){const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ft(n,e),{commentString:r}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=r(n.commentBefore);t.unshift(U(l,""))}let o=!1,a=null;if(n.contents){if(N(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=r(n.contents.commentBefore);t.push(U(d,""))}i.forceBlockIndent=!!n.comment,a=n.contents.comment}const l=a?void 0:()=>o=!0;let c=ie(n.contents,i,()=>a=null,l);a&&(c+=H(c,"",r(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ie(n.contents,i));if(n.directives?.docEnd)if(n.comment){const l=r(n.comment);l.includes(`
`)?(t.push("..."),t.push(U(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&o&&(l=l.replace(/^\n+/,"")),l&&((!o||a)&&t[t.length-1]!==""&&t.push(""),t.push(U(r(l),"")))}return t.join(`
`)+`
`}class We{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,M,{value:Xe});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const r=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=r;let{version:o}=r;s?._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new P({version:o}),this.setSchema(o,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(We.prototype,{[M]:{value:Xe}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=N(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){J(this.contents)&&this.contents.add(e)}addIn(e,t){J(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=jt(this);e.anchor=!t||s.has(t)?Bt(t||"a",s):t}return new rt(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const p=m=>typeof m=="number"||m instanceof String||m instanceof Number,b=t.filter(p).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:r,anchorPrefix:o,flow:a,keepUndefined:l,onTagObj:c,tag:d}=s??{},{onAnchor:u,setAnchors:f,sourceObjects:g}=rs(this,o||"a"),y={aliasDuplicateObjects:r??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:g},h=me(e,d,y);return a&&O(h)&&(h.flow=!0),f(),h}createPair(e,t,s={}){const i=this.createNode(e,null,s),r=this.createNode(t,null,s);return new L(i,r)}delete(e){return J(this.contents)?this.contents.delete(e):!1}deleteIn(e){return he(e)?this.contents==null?!1:(this.contents=null,!0):J(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return O(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return he(e)?!t&&I(this.contents)?this.contents.value:this.contents:O(this.contents)?this.contents.getIn(e,t):void 0}has(e){return O(this.contents)?this.contents.has(e):!1}hasIn(e){return he(e)?this.contents!==void 0:O(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Pe(this.schema,[e],t):J(this.contents)&&this.contents.set(e,t)}setIn(e,t){he(e)?this.contents=t:this.contents==null?this.contents=Pe(this.schema,Array.from(e),t):J(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new P({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new P({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new yt(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:r,reviver:o}={}){const a={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=B(this.contents,t??"",a);if(typeof r=="function")for(const{count:c,res:d}of a.anchors.values())r(d,c);return typeof o=="function"?Z(o,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Ps(this,e)}}function J(n){if(O(n))return!0;throw new Error("Expected a YAML collection as document contents")}class an extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class de extends an{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Ls extends an{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const _t=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let r=i-1,o=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(r>=60&&o.length>80){const a=Math.min(r-39,o.length-79);o="…"+o.substring(a),r-=a-1}if(o.length>80&&(o=o.substring(0,79)+"…"),s>1&&/^ *$/.test(o.substring(0,r))){let a=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);a.length>80&&(a=a.substring(0,79)+`…
`),o=a+o}if(/[^ ]/.test(o)){let a=1;const l=t.linePos[1];l?.line===s&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-r)));const c=" ".repeat(r)+"^".repeat(a);t.message+=`:

${o}
${c}
`}};function oe(n,{flow:e,indicator:t,next:s,offset:i,onError:r,parentIndent:o,startOnNewline:a}){let l=!1,c=a,d=a,u="",f="",g=!1,y=!1,h=null,p=null,b=null,m=null,k=null,v=null,S=null;for(const w of n)switch(y&&(w.type!=="space"&&w.type!=="newline"&&w.type!=="comma"&&r(w.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),y=!1),h&&(c&&w.type!=="comment"&&w.type!=="newline"&&r(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),h=null),w.type){case"space":!e&&(t!=="doc-start"||s?.type!=="flow-collection")&&w.source.includes("	")&&(h=w),d=!0;break;case"comment":{d||r(w,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const E=w.source.substring(1)||" ";u?u+=f+E:u=E,f="",c=!1;break}case"newline":c?u?u+=w.source:(!v||t!=="seq-item-ind")&&(l=!0):f+=w.source,c=!0,g=!0,(p||b)&&(m=w),d=!0;break;case"anchor":p&&r(w,"MULTIPLE_ANCHORS","A node can have at most one anchor"),w.source.endsWith(":")&&r(w.offset+w.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),p=w,S??(S=w.offset),c=!1,d=!1,y=!0;break;case"tag":{b&&r(w,"MULTIPLE_TAGS","A node can have at most one tag"),b=w,S??(S=w.offset),c=!1,d=!1,y=!0;break}case t:(p||b)&&r(w,"BAD_PROP_ORDER",`Anchors and tags must be after the ${w.source} indicator`),v&&r(w,"UNEXPECTED_TOKEN",`Unexpected ${w.source} in ${e??"collection"}`),v=w,c=t==="seq-item-ind"||t==="explicit-key-ind",d=!1;break;case"comma":if(e){k&&r(w,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=w,c=!1,d=!1;break}default:r(w,"UNEXPECTED_TOKEN",`Unexpected ${w.type} token`),c=!1,d=!1}const A=n[n.length-1],_=A?A.offset+A.source.length:i;return y&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&r(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),h&&(c&&h.indent<=o||s?.type==="block-map"||s?.type==="block-seq")&&r(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:v,spaceBefore:l,comment:u,hasNewline:g,anchor:p,tag:b,newlineAfterProp:m,end:_,start:S??_}}function ye(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ye(e.key)||ye(e.value))return!0}return!1;default:return!0}}function nt(n,e,t){if(e?.type==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ye(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function ln(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(r,o)=>r===o||I(r)&&I(o)&&r.value===o.value;return e.some(r=>i(r.key,t))}const It="All mapping items must start at the same column";function js({composeNode:n,composeEmptyNode:e},t,s,i,r){const o=r?.nodeClass??j,a=new o(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const d of s.items){const{start:u,key:f,sep:g,value:y}=d,h=oe(u,{indicator:"explicit-key-ind",next:f??g?.[0],offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),p=!h.found;if(p){if(f&&(f.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in f&&f.indent!==s.indent&&i(l,"BAD_INDENT",It)),!h.anchor&&!h.tag&&!g){c=h.end,h.comment&&(a.comment?a.comment+=`
`+h.comment:a.comment=h.comment);continue}(h.newlineAfterProp||ye(f))&&i(f??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else h.found?.indent!==s.indent&&i(l,"BAD_INDENT",It);t.atKey=!0;const b=h.end,m=f?n(t,f,h,i):e(t,b,u,null,h,i);t.schema.compat&&nt(s.indent,f,i),t.atKey=!1,ln(t,a.items,m)&&i(b,"DUPLICATE_KEY","Map keys must be unique");const k=oe(g??[],{indicator:"map-value-ind",next:y,offset:m.range[2],onError:i,parentIndent:s.indent,startOnNewline:!f||f.type==="block-scalar"});if(l=k.end,k.found){p&&(y?.type==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&h.start<k.found.offset-1024&&i(m.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const v=y?n(t,y,k,i):e(t,l,g,null,k,i);t.schema.compat&&nt(s.indent,y,i),l=v.range[2];const S=new L(m,v);t.options.keepSourceTokens&&(S.srcToken=d),a.items.push(S)}else{p&&i(m.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(m.comment?m.comment+=`
`+k.comment:m.comment=k.comment);const v=new L(m);t.options.keepSourceTokens&&(v.srcToken=d),a.items.push(v)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[s.offset,l,c??l],a}function Bs({composeNode:n,composeEmptyNode:e},t,s,i,r){const o=r?.nodeClass??z,a=new o(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:d,value:u}of s.items){const f=oe(d,{indicator:"seq-item-ind",next:u,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!f.found)if(f.anchor||f.tag||u)u?.type==="block-seq"?i(f.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=f.end,f.comment&&(a.comment=f.comment);continue}const g=u?n(t,u,f,i):e(t,f.end,d,null,f,i);t.schema.compat&&nt(s.indent,u,i),l=g.range[2],a.items.push(g)}return a.range=[s.offset,l,c??l],a}function ve(n,e,t,s){let i="";if(n){let r=!1,o="";for(const a of n){const{source:l,type:c}=a;switch(c){case"space":r=!0;break;case"comment":{t&&!r&&s(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const d=l.substring(1)||" ";i?i+=o+d:i=d,o="";break}case"newline":i&&(o+=l),r=!0;break;default:s(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const Ve="Block collections are not allowed within flow collections",ze=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Ms({composeNode:n,composeEmptyNode:e},t,s,i,r){const o=s.start.source==="{",a=o?"flow map":"flow sequence",l=r?.nodeClass??(o?j:z),c=new l(t.schema);c.flow=!0;const d=t.atRoot;d&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=s.offset+s.start.source.length;for(let p=0;p<s.items.length;++p){const b=s.items[p],{start:m,key:k,sep:v,value:S}=b,A=oe(m,{flow:a,indicator:"explicit-key-ind",next:k??v?.[0],offset:u,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!A.found){if(!A.anchor&&!A.tag&&!v&&!S){p===0&&A.comma?i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):p<s.items.length-1&&i(A.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),A.comment&&(c.comment?c.comment+=`
`+A.comment:c.comment=A.comment),u=A.end;continue}!o&&t.options.strict&&ye(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(p===0)A.comma&&i(A.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(A.comma||i(A.start,"MISSING_CHAR",`Missing , between ${a} items`),A.comment){let _="";e:for(const w of m)switch(w.type){case"comma":case"space":break;case"comment":_=w.source.substring(1);break e;default:break e}if(_){let w=c.items[c.items.length-1];C(w)&&(w=w.value??w.key),w.comment?w.comment+=`
`+_:w.comment=_,A.comment=A.comment.substring(_.length+1)}}if(!o&&!v&&!A.found){const _=S?n(t,S,A,i):e(t,A.end,v,null,A,i);c.items.push(_),u=_.range[2],ze(S)&&i(_.range,"BLOCK_IN_FLOW",Ve)}else{t.atKey=!0;const _=A.end,w=k?n(t,k,A,i):e(t,_,m,null,A,i);ze(k)&&i(w.range,"BLOCK_IN_FLOW",Ve),t.atKey=!1;const E=oe(v??[],{flow:a,indicator:"map-value-ind",next:S,offset:w.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(E.found){if(!o&&!A.found&&t.options.strict){if(v)for(const D of v){if(D===E.found)break;if(D.type==="newline"){i(D,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}A.start<E.found.offset-1024&&i(E.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&S.source?.[0]===":"?i(S,"MISSING_CHAR",`Missing space after : in ${a}`):i(E.start,"MISSING_CHAR",`Missing , or : between ${a} items`));const K=S?n(t,S,E,i):E.found?e(t,E.end,v,null,E,i):null;K?ze(S)&&i(K.range,"BLOCK_IN_FLOW",Ve):E.comment&&(w.comment?w.comment+=`
`+E.comment:w.comment=E.comment);const Y=new L(w,K);if(t.options.keepSourceTokens&&(Y.srcToken=b),o){const D=c;ln(t,D.items,w)&&i(_,"DUPLICATE_KEY","Map keys must be unique"),D.items.push(Y)}else{const D=new j(t.schema);D.flow=!0,D.items.push(Y);const wt=(K??w).range;D.range=[w.range[0],wt[1],wt[2]],c.items.push(D)}u=K?K.range[2]:E.end}}const f=o?"}":"]",[g,...y]=s.end;let h=u;if(g?.source===f)h=g.offset+g.source.length;else{const p=a[0].toUpperCase()+a.substring(1),b=d?`${p} must end with a ${f}`:`${p} in block collection must be sufficiently indented and end with a ${f}`;i(u,d?"MISSING_CHAR":"BAD_INDENT",b),g&&g.source.length!==1&&y.unshift(g)}if(y.length>0){const p=ve(y,h,t.options.strict,i);p.comment&&(c.comment?c.comment+=`
`+p.comment:c.comment=p.comment),c.range=[s.offset,h,p.offset]}else c.range=[s.offset,h,h];return c}function Ye(n,e,t,s,i,r){const o=t.type==="block-map"?js(n,e,t,s,r):t.type==="block-seq"?Bs(n,e,t,s,r):Ms(n,e,t,s,r),a=o.constructor;return i==="!"||i===a.tagName?(o.tag=a.tagName,o):(i&&(o.tag=i),o)}function $s(n,e,t,s,i){const r=s.tag,o=r?e.directives.tagName(r.source,f=>i(r,"TAG_RESOLVE_FAILED",f)):null;if(t.type==="block-seq"){const{anchor:f,newlineAfterProp:g}=s,y=f&&r?f.offset>r.offset?f:r:f??r;y&&(!g||g.offset<y.offset)&&i(y,"MISSING_CHAR","Missing newline after block sequence props")}const a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!r||!o||o==="!"||o===j.tagName&&a==="map"||o===z.tagName&&a==="seq")return Ye(n,e,t,i,o);let l=e.schema.tags.find(f=>f.tag===o&&f.collection===a);if(!l){const f=e.schema.knownTags[o];if(f?.collection===a)e.schema.tags.push(Object.assign({},f,{default:!1})),l=f;else return f?i(r,"BAD_COLLECTION_TYPE",`${f.tag} used for ${a} collection, but expects ${f.collection??"scalar"}`,!0):i(r,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),Ye(n,e,t,i,o)}const c=Ye(n,e,t,i,o,l),d=l.resolve?.(c,f=>i(r,"TAG_RESOLVE_FAILED",f),e.options)??c,u=N(d)?d:new T(d);return u.range=c.range,u.tag=o,l?.format&&(u.format=l.format),u}function Rs(n,e,t){const s=e.offset,i=Fs(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const r=i.mode===">"?T.BLOCK_FOLDED:T.BLOCK_LITERAL,o=e.source?Us(e.source):[];let a=o.length;for(let h=o.length-1;h>=0;--h){const p=o[h][1];if(p===""||p==="\r")a=h;else break}if(a===0){const h=i.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"";let p=s+i.length;return e.source&&(p+=e.source.length),{value:h,type:r,comment:i.comment,range:[s,p,p]}}let l=e.indent+i.indent,c=e.offset+i.length,d=0;for(let h=0;h<a;++h){const[p,b]=o[h];if(b===""||b==="\r")i.indent===0&&p.length>l&&(l=p.length);else{p.length<l&&t(c+p.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=p.length),d=h,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=p.length+b.length+1}for(let h=o.length-1;h>=a;--h)o[h][0].length>l&&(a=h+1);let u="",f="",g=!1;for(let h=0;h<d;++h)u+=o[h][0].slice(l)+`
`;for(let h=d;h<a;++h){let[p,b]=o[h];c+=p.length+b.length+1;const m=b[b.length-1]==="\r";if(m&&(b=b.slice(0,-1)),b&&p.length<l){const v=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-b.length-(m?2:1),"BAD_INDENT",v),p=""}r===T.BLOCK_LITERAL?(u+=f+p.slice(l)+b,f=`
`):p.length>l||b[0]==="	"?(f===" "?f=`
`:!g&&f===`
`&&(f=`

`),u+=f+p.slice(l)+b,f=`
`,g=!0):b===""?f===`
`?u+=`
`:f=`
`:(u+=f+b,f=" ",g=!1)}switch(i.chomp){case"-":break;case"+":for(let h=a;h<o.length;++h)u+=`
`+o[h][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}const y=s+i.length+e.source.length;return{value:u,type:r,comment:i.comment,range:[s,y,y]}}function Fs({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],r=i[0];let o=0,a="",l=-1;for(let f=1;f<i.length;++f){const g=i[f];if(!a&&(g==="-"||g==="+"))a=g;else{const y=Number(g);!o&&y?o=y:l===-1&&(l=n+f)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,d="",u=i.length;for(let f=1;f<e.length;++f){const g=e[f];switch(g.type){case"space":c=!0;case"newline":u+=g.source.length;break;case"comment":t&&!c&&s(g,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=g.source.length,d=g.source.substring(1);break;case"error":s(g,"UNEXPECTED_TOKEN",g.message),u+=g.source.length;break;default:{const y=`Unexpected token in block scalar header: ${g.type}`;s(g,"UNEXPECTED_TOKEN",y);const h=g.source;h&&typeof h=="string"&&(u+=h.length)}}}return{mode:r,indent:o,chomp:a,comment:d,length:u}}function Us(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),r=[s?.[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let o=1;o<e.length;o+=2)r.push([e[o],e[o+1]]);return r}function qs(n,e,t){const{offset:s,type:i,source:r,end:o}=n;let a,l;const c=(f,g,y)=>t(s+f,g,y);switch(i){case"scalar":a=T.PLAIN,l=Ks(r,c);break;case"single-quoted-scalar":a=T.QUOTE_SINGLE,l=xs(r,c);break;case"double-quoted-scalar":a=T.QUOTE_DOUBLE,l=Ws(r,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+r.length,s+r.length]}}const d=s+r.length,u=ve(o,d,e,t);return{value:l,type:a,comment:u.comment,range:[s,d,u.offset]}}function Ks(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),cn(n)}function xs(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),cn(n.slice(1,-1)).replace(/''/g,"'")}function cn(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],r=" ",o=e.lastIndex;for(t.lastIndex=o;s=t.exec(n);)s[1]===""?r===`
`?i+=r:r=`
`:(i+=r+s[1],r=" "),o=t.lastIndex;const a=/[ \t]*(.*)/sy;return a.lastIndex=o,s=a.exec(n),i+r+(s?.[1]??"")}function Ws(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:r,offset:o}=Gs(n,s);t+=r,s=o}else if(i==="\\"){let r=n[++s];const o=Hs[r];if(o)t+=o;else if(r===`
`)for(r=n[s+1];r===" "||r==="	";)r=n[++s+1];else if(r==="\r"&&n[s+1]===`
`)for(r=n[++s+1];r===" "||r==="	";)r=n[++s+1];else if(r==="x"||r==="u"||r==="U"){const a=r==="x"?2:r==="u"?4:8;t+=Vs(n,s+1,a,e),s+=a}else{const a=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){const r=s;let o=n[s+1];for(;o===" "||o==="	";)o=n[++s+1];o!==`
`&&!(o==="\r"&&n[s+2]===`
`)&&(t+=s>r?n.slice(r,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Gs(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Hs={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function Vs(n,e,t,s){const i=n.substr(e,t),o=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(o)}catch{const a=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}}function un(n,e,t,s){const{value:i,type:r,comment:o,range:a}=e.type==="block-scalar"?Rs(n,e,s):qs(e,n.options.strict,s),l=t?n.directives.tagName(t.source,u=>s(t,"TAG_RESOLVE_FAILED",u)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[F]:l?c=zs(n.schema,i,l,t,s):e.type==="scalar"?c=Ys(n,i,e,s):c=n.schema[F];let d;try{const u=c.resolve(i,f=>s(t??e,"TAG_RESOLVE_FAILED",f),n.options);d=I(u)?u:new T(u)}catch(u){const f=u instanceof Error?u.message:String(u);s(t??e,"TAG_RESOLVE_FAILED",f),d=new T(i)}return d.range=a,d.source=i,r&&(d.type=r),l&&(d.tag=l),c.format&&(d.format=c.format),o&&(d.comment=o),d}function zs(n,e,t,s,i){if(t==="!")return n[F];const r=[];for(const a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)r.push(a);else return a;for(const a of r)if(a.test?.test(e))return a;const o=n.knownTags[t];return o&&!o.collection?(n.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[F])}function Ys({atKey:n,directives:e,schema:t},s,i,r){const o=t.tags.find(a=>(a.default===!0||n&&a.default==="key")&&a.test?.test(s))||t[F];if(t.compat){const a=t.compat.find(l=>l.default&&l.test?.test(s))??t[F];if(o.tag!==a.tag){const l=e.tagString(o.tag),c=e.tagString(a.tag),d=`Value may be parsed as either ${l} or ${c}`;r(i,"TAG_RESOLVE_FAILED",d,!0)}}return o}function Js(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];i?.type==="space";)n+=i.source.length,i=e[++s];break}}return n}const Qs={composeNode:fn,composeEmptyNode:bt};function fn(n,e,t,s){const i=n.atKey,{spaceBefore:r,comment:o,anchor:a,tag:l}=t;let c,d=!0;switch(e.type){case"alias":c=Xs(n,e,s),(a||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=un(n,e,l,s),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=$s(Qs,n,e,t,s),a&&(c.anchor=a.source.substring(1))}catch(u){const f=u instanceof Error?u.message:String(u);s(e,"RESOURCE_EXHAUSTION",f)}break;default:{const u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",u),d=!1}}return c??(c=bt(n,e.offset,void 0,null,t,s)),a&&c.anchor===""&&s(a,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!I(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),r&&(c.spaceBefore=!0),o&&(e.type==="scalar"&&e.source===""?c.comment=o:c.commentBefore=o),n.options.keepSourceTokens&&d&&(c.srcToken=e),c}function bt(n,e,t,s,{spaceBefore:i,comment:r,anchor:o,tag:a,end:l},c){const d={type:"scalar",offset:Js(e,t,s),indent:-1,source:""},u=un(n,d,a,c);return o&&(u.anchor=o.source.substring(1),u.anchor===""&&c(o,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),r&&(u.comment=r,u.range[2]=l),u}function Xs({options:n},{offset:e,source:t,end:s},i){const r=new rt(t.substring(1));r.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),r.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const o=e+t.length,a=ve(s,o,n.strict,i);return r.range=[e,o,a.offset],a.comment&&(r.comment=a.comment),r}function Zs(n,e,{offset:t,start:s,value:i,end:r},o){const a=Object.assign({_directives:e},n),l=new We(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},d=oe(s,{indicator:"doc-start",next:i??r?.[0],offset:t,onError:o,parentIndent:0,startOnNewline:!0});d.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!d.hasNewline&&o(d.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?fn(c,i,d,o):bt(c,d.end,s,null,d,o);const u=l.contents.range[2],f=ve(r,u,!1,o);return f.comment&&(l.comment=f.comment),l.range=[t,u,f.offset],l}function fe(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ot(n){let e="",t=!1,s=!1;for(let i=0;i<n.length;++i){const r=n[i];switch(r[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(r.substring(1)||" "),t=!0,s=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class ei{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,r)=>{const o=fe(t);r?this.warnings.push(new Ls(o,s,i)):this.errors.push(new de(o,s,i))},this.directives=new P({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ot(this.prelude);if(s){const r=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!r)e.commentBefore=s;else if(O(r)&&!r.flow&&r.items.length>0){let o=r.items[0];C(o)&&(o=o.key);const a=o.commentBefore;o.commentBefore=a?`${s}
${a}`:s}else{const o=r.commentBefore;r.commentBefore=o?`${s}
${o}`:s}}if(t){for(let r=0;r<this.errors.length;++r)e.errors.push(this.errors[r]);for(let r=0;r<this.warnings.length;++r)e.warnings.push(this.warnings[r])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ot(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const r=fe(e);r[0]+=t,this.onError(r,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=Zs(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new de(fe(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new de(fe(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=ve(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new de(fe(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new We(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const hn="\uFEFF",dn="",pn="",st="";function ti(n){switch(n){case hn:return"byte-order-mark";case dn:return"doc-mode";case pn:return"flow-error-end";case st:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function $(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Nt=new Set("0123456789ABCDEFabcdef"),ni=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),_e=new Set(",[]{}"),si=new Set(` ,[]{}
\r	`),Je=n=>!n||si.has(n);class ii{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&$(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===hn&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const r=e[s-1];if(r===" "||r==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const r=e[t-1];if(r===" "||r==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield dn,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&$(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!$(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&$(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Je),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&$(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield pn,yield*this.parseLineStart();let r=0;for(;i[r]===",";)r+=yield*this.pushCount(1),r+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(r+=yield*this.pushIndicators(),i[r]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-r),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Je),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const o=this.charAt(1);if(this.flowKey||$(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let r=0;for(;this.buffer[t-1-r]==="\\";)r+=1;if(r%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const r=this.continueScalar(i+1);if(r===-1)break;i=s.indexOf(`
`,r)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>$(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let r=this.pos;s=this.buffer[r];++r)switch(s){case" ":t+=1;break;case`
`:e=r,t=0;break;case"\r":{const o=this.buffer[r+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const r=this.continueScalar(e+1);if(r===-1)break;e=this.buffer.indexOf(`
`,r)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let r=e-1,o=this.buffer[r];o==="\r"&&(o=this.buffer[--r]);const a=r;for(;o===" ";)o=this.buffer[--r];if(o===`
`&&r>=this.pos&&r+1+t>a)e=r;else break}while(!0);return yield st,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const r=this.buffer[s+1];if($(r)||e&&_e.has(r))break;t=s}else if($(i)){let r=this.buffer[s+1];if(i==="\r"&&(r===`
`?(s+=1,i=`
`,r=this.buffer[s+1]):t=s),r==="#"||e&&_e.has(r))break;if(i===`
`){const o=this.continueScalar(s+1);if(o===-1)break;s=Math.max(s,o-2)}}else{if(e&&_e.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield st,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(Je),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,s=this.charAt(1);if($(s)||t&&_e.has(s)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!$(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(ni.has(t))t=this.buffer[++e];else if(t==="%"&&Nt.has(this.buffer[e+1])&&Nt.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class oi{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const r=t+s>>1;this.lineStarts[r]<e?t=r+1:s=r}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function x(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Ct(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function gn(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ie(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Q(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function je(n,e){if(e.length<1e5)Array.prototype.push.apply(n,e);else for(let t=0;t<e.length;++t)n.push(e[t])}function Et(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!x(e.start,"explicit-key-ind")&&!x(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,gn(e.value)?e.value.end?je(e.value.end,e.sep):e.value.end=e.sep:je(e.start,e.sep),delete e.sep)}class ri{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ii,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=ti(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Et(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Ct(i.start)===-1&&(t.indent===0||i.start.every(r=>r.type!=="comment"||r.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Ct(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Ie(this.peek(2)),s=Q(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const r={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){je(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,i=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let r=[];if(i&&t.sep&&!t.value){const o=[];for(let a=0;a<t.sep.length;++a){const l=t.sep[a];switch(l.type){case"newline":o.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(o.length=0);break;default:o.length=0}}o.length>=2&&(r=t.sep.splice(o[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(r.push(this.sourceToken),e.items.push({start:r}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(r.push(this.sourceToken),e.items.push({start:r,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(x(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]});else if(gn(t.key)&&!x(t.sep,"newline")){const o=Q(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:a,sep:l}]})}else r.length>0?t.sep=t.sep.concat(r,this.sourceToken):t.sep.push(this.sourceToken);else if(x(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const o=Q(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:r,key:null,sep:[this.sourceToken]}):x(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);i||t.value?(e.items.push({start:r,key:o,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(o):(Object.assign(t,{key:o,sep:[]}),this.onKeyLine=!0);return}default:{const o=this.startBlockValue(e);if(o){if(o.type==="block-seq"){if(!t.explicitKey&&t.sep&&!x(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:r});this.stack.push(o);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){je(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||x(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while(s?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Ie(s),r=Q(i);Et(e);const o=e.end.splice(1,e.end.length);o.push(this.sourceToken);const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:r,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Ie(e),s=Q(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Ie(e),s=Q(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function ai(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new oi||null,prettyErrors:e}}function li(n,e={}){const{lineCounter:t,prettyErrors:s}=ai(e),i=new ri(t?.addNewLine),r=new ei(e);let o=null;for(const a of r.compose(i.parse(n),!0,n.length))if(!o)o=a;else if(o.options.logLevel!=="silent"){o.errors.push(new de(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(o.errors.forEach(_t(n,t)),o.warnings.forEach(_t(n,t))),o}function ci(n,e,t){let s;const i=li(n,t);if(!i)return null;if(i.warnings.forEach(r=>Ut(i.options.logLevel,r)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}function ui(n){const e=n.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!e)return{data:Object.create(null),content:n};const t=e[1],s=e[2];try{const i=ci(t),r=Object.create(null);return i&&typeof i=="object"&&Object.assign(r,i),{data:r,content:s}}catch(i){return console.error("Error parsing frontmatter:",i),{data:Object.create(null),content:s}}}const Oe={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":yn,"/content/posts/2026-04-18-financial-literacy-dancers.md":wn,"/content/posts/2026-04-18-github-actions.md":vn,"/content/posts/2026-04-18-halloween-costumes.md":Tn,"/content/posts/2026-04-18-make-shoe-dance.md":_n,"/content/posts/2026-04-18-why-finals-are-hard.md":On,"/content/posts/2026-04-19-gear-essentials.md":Cn,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":Dn,"/content/posts/2026-06-01-event-travel-packing.md":Ln,"/content/posts/2026-06-01-general-health-home-care.md":Bn,"/content/posts/2026-06-01-outdoor-dancing.md":$n,"/content/posts/2026-06-01-power-charging.md":Fn,"/content/posts/2026-06-01-practice-review-tech.md":qn,"/content/posts/2026-06-01-practice-social-dance-apparel.md":xn,"/content/posts/2026-06-01-shoe-care-modification.md":Gn,"/content/posts/2026-06-01-theme-wear-costumes-accessories.md":Vn,"/content/posts/2026-06-01-wcs-essentials.md":Yn}),resources:Object.assign({}),studies:Object.assign({"/content/studies/ai-devops-pipeline.md":Qn,"/content/studies/wcs-scraper-initial-sync.md":Zn}),events:Object.assign({})},fi=n=>n.split("/").pop()?.replace(".md","")||"";function hi(n){if(typeof n!="string")return;const e=n.toLowerCase();return["published","draft","planned"].includes(e)?e:void 0}function di(n){if(typeof n=="number")return n;if(typeof n=="string"){const e=parseInt(n.replace(/[^\d]/g,""),10);return isNaN(e)?void 0:e}}function mi(n){if(!(n===""||n===void 0||n===null))return typeof n!="string"?n:n.startsWith("/")&&!n.startsWith(Qe)?`${Qe}${n}`:n}function Ne(n,e){const t=s=>Array.isArray(s)?s:[];return Object.entries(n).map(([s,i])=>{const r=typeof i=="string"?i:i.default,{data:o,content:a}=ui(r),l=o.type||e,c=f=>{if(f!=="")return typeof f=="string"&&f.startsWith("/")?`${Qe}${f}`:f};o.image=c(o.image),o.imageBack=c(o.imageBack),o.heroImage=c(o.heroImage);const d=["NorCal","SoCal","Southwest","Pacific Northwest","South","International","Other"],u={...o,type:l,title:String(o.title||"Untitled"),category:String(o.category||"General"),region:o.region&&d.includes(String(o.region))?String(o.region):void 0,excerpt:String(o.excerpt||""),date:String(o.date||""),author:String(o.author||""),startDate:o.startDate?String(o.startDate):void 0,earlyBirdDate:o.earlyBirdDate?String(o.earlyBirdDate):void 0,registrationDeadline:o.registrationDeadline?String(o.registrationDeadline):void 0,hotelCutoffDate:o.hotelCutoffDate?String(o.hotelCutoffDate):void 0,packingReminderDate:o.packingReminderDate?String(o.packingReminderDate):void 0,tags:t(o.tags),affiliateIds:t(o.affiliateIds),internalSku:o.internalSku?String(o.internalSku):o.sku?String(o.sku):void 0,priceCategory:o.priceCategory?String(o.priceCategory):void 0,seoTitle:o.seoTitle?String(o.seoTitle):void 0,seoDescription:o.seoDescription?String(o.seoDescription):void 0,imageAlt:o.imageAlt?String(o.imageAlt):void 0,productType:o.productType?String(o.productType):void 0,fulfillmentType:o.fulfillmentType?String(o.fulfillmentType):void 0,provider:o.provider?String(o.provider):void 0,shippingPolicySummary:o.shippingPolicySummary?String(o.shippingPolicySummary):void 0,returnPolicySummary:o.returnPolicySummary?String(o.returnPolicySummary):void 0,affiliateProvider:o.affiliateProvider?String(o.affiliateProvider):void 0,affiliateDisclosure:o.affiliateDisclosure?String(o.affiliateDisclosure):void 0,priceDisplayPolicy:o.priceDisplayPolicy?String(o.priceDisplayPolicy):void 0,availabilityDisplayPolicy:o.availabilityDisplayPolicy?String(o.availabilityDisplayPolicy):void 0,recommendedFor:t(o.recommendedFor),eventUseCase:o.eventUseCase?String(o.eventUseCase):void 0,printfulProductId:o.printfulProductId?String(o.printfulProductId):void 0,printfulVariantIds:t(o.printfulVariantIds),status:hi(o.status),readTime:di(o.readTime),content:a||"",slug:fi(s)};if(o.type==="event"){const g=o.themeName||o.themeLabel||o.themeDescription||o.themeColors||o.themeOutfitIds||o.themeAccessoryIds?{name:String(o.themeName||""),label:o.themeLabel?String(o.themeLabel):void 0,description:o.themeDescription?String(o.themeDescription):void 0,colors:t(o.themeColors),outfitIds:t(o.themeOutfitIds),accessoryIds:t(o.themeAccessoryIds)}:void 0,h=o.gearOutfitIds||o.gearOutfitDescription||o.gearAccessoryIds||o.gearAccessoryDescription||o.gearShoeIds||o.gearShoeDescription||o.gearEssentialIds||o.gearEssentialDescription||o.gearTravelIds||o.gearTravelDescription?{outfitIds:t(o.gearOutfitIds),outfitDescription:o.gearOutfitDescription?String(o.gearOutfitDescription):void 0,accessoryIds:t(o.gearAccessoryIds),accessoryDescription:o.gearAccessoryDescription?String(o.gearAccessoryDescription):void 0,shoeIds:t(o.gearShoeIds),shoeDescription:o.gearShoeDescription?String(o.gearShoeDescription):void 0,essentialIds:t(o.gearEssentialIds),essentialDescription:o.gearEssentialDescription?String(o.gearEssentialDescription):void 0,travelIds:t(o.gearTravelIds),travelDescription:o.gearTravelDescription?String(o.gearTravelDescription):void 0}:void 0,p=o.theme,b=p?{name:String(p.name||""),label:p.label?String(p.label):void 0,description:p.description?String(p.description):void 0,colors:t(p.colors),outfitIds:t(p.outfitIds),accessoryIds:t(p.accessoryIds)}:void 0,m=o.gear,k=m?{outfitIds:t(m.outfitIds),outfitDescription:m.outfitDescription?String(m.outfitDescription):void 0,accessoryIds:t(m.accessoryIds),accessoryDescription:m.accessoryDescription?String(m.accessoryDescription):void 0,shoeIds:t(m.shoeIds),shoeDescription:m.shoeDescription?String(m.shoeDescription):void 0,essentialIds:t(m.essentialIds),essentialDescription:m.essentialDescription?String(m.essentialDescription):void 0,travelIds:t(m.travelIds),travelDescription:m.travelDescription?String(m.travelDescription):void 0}:void 0;u.theme=b??g,u.gear=k??h,u.relatedEvents=t(o.relatedEvents)}return u}).filter(s=>s.draft?s.type==="study"&&(s.status==="planned"||s.status==="draft"):!0).sort((s,i)=>{const r=s.date?new Date(s.date).getTime():0,o=i.date?new Date(i.date).getTime():0,a=Number.isNaN(r)?0:r;return(Number.isNaN(o)?0:o)-a})}const te={posts:Ne(Oe.posts,"post"),resources:Ne(Oe.resources,"resource"),studies:Ne(Oe.studies,"study"),events:Ne(Oe.events,"event")},pi={posts:new Map(te.posts.map(n=>[n.slug,n])),resources:new Map(te.resources.map(n=>[n.slug,n])),studies:new Map(te.studies.map(n=>[n.slug,n])),events:new Map(te.events.map(n=>[n.slug,n]))},yi=()=>te.posts,bi=()=>te.studies,wi=n=>pi.posts.get(n),ki=(n,e)=>{if(n&&n.trim().length>0)return Math.max(1,Math.round(n.split(/\s+/).length/200));const t=e?.split(/\s+/).length??0;return Math.max(1,Math.round(t/20))};export{wi as a,bi as b,yi as g,mi as n,ki as r};
