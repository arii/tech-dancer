import{A as Qe}from"./index-Doo3aETg.js";const yn=`---
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
`,kn=Object.freeze(Object.defineProperty({__proto__:null,default:wn},Symbol.toStringTag,{value:"Module"})),vn=`---
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
`,Sn=Object.freeze(Object.defineProperty({__proto__:null,default:vn},Symbol.toStringTag,{value:"Module"})),_n=`---
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
`,On=Object.freeze(Object.defineProperty({__proto__:null,default:An},Symbol.toStringTag,{value:"Module"})),Cn=`---
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
`,In=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),Pn=`---
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
`,Nn=Object.freeze(Object.defineProperty({__proto__:null,default:Pn},Symbol.toStringTag,{value:"Module"})),En=`---
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
`,Dn=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"})),jn=`---
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
`,Ln=Object.freeze(Object.defineProperty({__proto__:null,default:jn},Symbol.toStringTag,{value:"Module"})),Bn=`---
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
`,Mn=Object.freeze(Object.defineProperty({__proto__:null,default:Bn},Symbol.toStringTag,{value:"Module"})),$n=`---
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
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:$n},Symbol.toStringTag,{value:"Module"})),Fn=`---
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
`,Rn=Object.freeze(Object.defineProperty({__proto__:null,default:Fn},Symbol.toStringTag,{value:"Module"})),Un=`---
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
`,zn=Object.freeze(Object.defineProperty({__proto__:null,default:Un},Symbol.toStringTag,{value:"Module"})),qn=`---
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
`,Kn=Object.freeze(Object.defineProperty({__proto__:null,default:qn},Symbol.toStringTag,{value:"Module"})),Wn=`---
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
`,Vn=Object.freeze(Object.defineProperty({__proto__:null,default:Hn},Symbol.toStringTag,{value:"Module"})),Jn=`---
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
`,Yn=Object.freeze(Object.defineProperty({__proto__:null,default:Jn},Symbol.toStringTag,{value:"Module"})),Qn=`---
type: blog
title: "The Story Behind the Merch: From Jack & Jill Orama to NorCal Pride"
date: "2026-06-14"
author: "Ariel Anders, PhD"
category: "Community"
excerpt: "How a single T-shirt for a local event evolved into a full collection of West Coast Swing apparel celebrating NorCal roots and role-fluid energy."
image: "/assets/events/jjo-hero.jpg"
imageAlt: "Dancers at Jack & Jill Orama wearing event t-shirts."
tags: ["merch", "community", "NorCal", "WCS"]
affiliateIds:
  - "norcal-bestcal-tshirt"
  - "norcal-pride-gate-shirt"
  - "love-neon-switch-shirt"
---
`,Xn=Object.freeze(Object.defineProperty({__proto__:null,default:Qn},Symbol.toStringTag,{value:"Module"})),Zn=`---
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
`,es=Object.freeze(Object.defineProperty({__proto__:null,default:Zn},Symbol.toStringTag,{value:"Module"})),ts=`---
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
`,ns=Object.freeze(Object.defineProperty({__proto__:null,default:ts},Symbol.toStringTag,{value:"Module"})),ss=`---
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
`,is=Object.freeze(Object.defineProperty({__proto__:null,default:ss},Symbol.toStringTag,{value:"Module"})),os=`---
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
`,rs=Object.freeze(Object.defineProperty({__proto__:null,default:os},Symbol.toStringTag,{value:"Module"})),as=`---
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
`,ls=Object.freeze(Object.defineProperty({__proto__:null,default:as},Symbol.toStringTag,{value:"Module"})),cs=`---
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
`,us=Object.freeze(Object.defineProperty({__proto__:null,default:cs},Symbol.toStringTag,{value:"Module"})),ds=`---
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
`,fs=Object.freeze(Object.defineProperty({__proto__:null,default:ds},Symbol.toStringTag,{value:"Module"})),hs=`---
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
`,ps=Object.freeze(Object.defineProperty({__proto__:null,default:hs},Symbol.toStringTag,{value:"Module"})),gs=`---
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
`,ms=Object.freeze(Object.defineProperty({__proto__:null,default:gs},Symbol.toStringTag,{value:"Module"})),ys=`---
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
`,bs=Object.freeze(Object.defineProperty({__proto__:null,default:ys},Symbol.toStringTag,{value:"Module"})),ws=`---
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
`,ks=Object.freeze(Object.defineProperty({__proto__:null,default:ws},Symbol.toStringTag,{value:"Module"})),vs=`---
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
`,Ss=Object.freeze(Object.defineProperty({__proto__:null,default:vs},Symbol.toStringTag,{value:"Module"})),_s=`---
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
`,Ts=Object.freeze(Object.defineProperty({__proto__:null,default:_s},Symbol.toStringTag,{value:"Module"})),As=`---
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
`,Os=Object.freeze(Object.defineProperty({__proto__:null,default:As},Symbol.toStringTag,{value:"Module"})),Cs=`---
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
`,Is=Object.freeze(Object.defineProperty({__proto__:null,default:Cs},Symbol.toStringTag,{value:"Module"})),Ps=`---
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
`,Ns=Object.freeze(Object.defineProperty({__proto__:null,default:Ps},Symbol.toStringTag,{value:"Module"})),Es=`---
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
`,Ds=Object.freeze(Object.defineProperty({__proto__:null,default:Es},Symbol.toStringTag,{value:"Module"})),js=`---
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
`,Ls=Object.freeze(Object.defineProperty({__proto__:null,default:js},Symbol.toStringTag,{value:"Module"})),Bs=`---
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
`,Ms=Object.freeze(Object.defineProperty({__proto__:null,default:Bs},Symbol.toStringTag,{value:"Module"})),$s=`---
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
`,xs=Object.freeze(Object.defineProperty({__proto__:null,default:$s},Symbol.toStringTag,{value:"Module"})),Fs=`---
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
`,Rs=Object.freeze(Object.defineProperty({__proto__:null,default:Fs},Symbol.toStringTag,{value:"Module"})),Us=`---
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
`,zs=Object.freeze(Object.defineProperty({__proto__:null,default:Us},Symbol.toStringTag,{value:"Module"})),qs=`---
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
`,Ks=Object.freeze(Object.defineProperty({__proto__:null,default:qs},Symbol.toStringTag,{value:"Module"})),Ws=`---
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
`,Gs=Object.freeze(Object.defineProperty({__proto__:null,default:Ws},Symbol.toStringTag,{value:"Module"})),Hs=`---
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
`,Vs=Object.freeze(Object.defineProperty({__proto__:null,default:Hs},Symbol.toStringTag,{value:"Module"})),Js=`---
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
`,Ys=Object.freeze(Object.defineProperty({__proto__:null,default:Js},Symbol.toStringTag,{value:"Module"})),Qs=`---
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
`,Xs=Object.freeze(Object.defineProperty({__proto__:null,default:Qs},Symbol.toStringTag,{value:"Module"})),Zs=`---
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
`,ei=Object.freeze(Object.defineProperty({__proto__:null,default:Zs},Symbol.toStringTag,{value:"Module"})),ti=`---
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
`,ni=Object.freeze(Object.defineProperty({__proto__:null,default:ti},Symbol.toStringTag,{value:"Module"})),si=`---
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
`,ii=Object.freeze(Object.defineProperty({__proto__:null,default:si},Symbol.toStringTag,{value:"Module"})),oi=`---
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
`,ri=Object.freeze(Object.defineProperty({__proto__:null,default:oi},Symbol.toStringTag,{value:"Module"})),ai=`---
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
`,li=Object.freeze(Object.defineProperty({__proto__:null,default:ai},Symbol.toStringTag,{value:"Module"})),ci=`---
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
`,ui=Object.freeze(Object.defineProperty({__proto__:null,default:ci},Symbol.toStringTag,{value:"Module"})),di=`---
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
`,fi=Object.freeze(Object.defineProperty({__proto__:null,default:di},Symbol.toStringTag,{value:"Module"})),hi=`---
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
`,pi=Object.freeze(Object.defineProperty({__proto__:null,default:hi},Symbol.toStringTag,{value:"Module"})),gi=`---
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
`,mi=Object.freeze(Object.defineProperty({__proto__:null,default:gi},Symbol.toStringTag,{value:"Module"})),yi=`---
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
`,bi=Object.freeze(Object.defineProperty({__proto__:null,default:yi},Symbol.toStringTag,{value:"Module"})),wi=`---
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
`,ki=Object.freeze(Object.defineProperty({__proto__:null,default:wi},Symbol.toStringTag,{value:"Module"})),it=Symbol.for("yaml.alias"),Xe=Symbol.for("yaml.document"),K=Symbol.for("yaml.map"),Et=Symbol.for("yaml.pair"),F=Symbol.for("yaml.scalar"),re=Symbol.for("yaml.seq"),M=Symbol.for("yaml.node.type"),ae=n=>!!n&&typeof n=="object"&&n[M]===it,Be=n=>!!n&&typeof n=="object"&&n[M]===Xe,be=n=>!!n&&typeof n=="object"&&n[M]===K,P=n=>!!n&&typeof n=="object"&&n[M]===Et,O=n=>!!n&&typeof n=="object"&&n[M]===F,we=n=>!!n&&typeof n=="object"&&n[M]===re;function C(n){if(n&&typeof n=="object")switch(n[M]){case K:case re:return!0}return!1}function I(n){if(n&&typeof n=="object")switch(n[M]){case it:case K:case F:case re:return!0}return!1}const Dt=n=>(O(n)||C(n))&&!!n.anchor,W=Symbol("break visit"),vi=Symbol("skip children"),pe=Symbol("remove node");function le(n,e){const t=Si(e);Be(n)?X(null,n.contents,t,Object.freeze([n]))===pe&&(n.contents=null):X(null,n,t,Object.freeze([]))}le.BREAK=W;le.SKIP=vi;le.REMOVE=pe;function X(n,e,t,s){const i=_i(n,e,t,s);if(I(i)||P(i))return Ti(n,s,i),X(n,i,t,s);if(typeof i!="symbol"){if(C(e)){s=Object.freeze(s.concat(e));for(let o=0;o<e.items.length;++o){const r=X(o,e.items[o],t,s);if(typeof r=="number")o=r-1;else{if(r===W)return W;r===pe&&(e.items.splice(o,1),o-=1)}}}else if(P(e)){s=Object.freeze(s.concat(e));const o=X("key",e.key,t,s);if(o===W)return W;o===pe&&(e.key=null);const r=X("value",e.value,t,s);if(r===W)return W;r===pe&&(e.value=null)}}return i}function Si(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function _i(n,e,t,s){if(typeof t=="function")return t(n,e,s);if(be(e))return t.Map?.(n,e,s);if(we(e))return t.Seq?.(n,e,s);if(P(e))return t.Pair?.(n,e,s);if(O(e))return t.Scalar?.(n,e,s);if(ae(e))return t.Alias?.(n,e,s)}function Ti(n,e,t){const s=e[e.length-1];if(C(s))s.items[n]=t;else if(P(s))n==="key"?s.key=t:s.value=t;else if(Be(s))s.contents=t;else{const i=ae(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const Ai={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},Oi=n=>n.replace(/[!,[\]{}]/g,e=>Ai[e]);class D{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},D.defaultYaml,e),this.tags=Object.assign({},D.defaultTags,t)}clone(){const e=new D(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new D(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:D.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},D.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:D.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},D.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[o,r]=s;return this.tags[o]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[o]=s;if(o==="1.1"||o==="1.2")return this.yaml.version=o,!0;{const r=/^\d+\.\d+$/.test(o);return t(6,`Unsupported YAML version ${o}`,r),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const o=this.tags[s];if(o)try{return o+decodeURIComponent(i)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+Oi(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&I(e.contents)){const o={};le(e.contents,(r,a)=>{I(a)&&a.tag&&(o[a.tag]=!0)}),i=Object.keys(o)}else i=[];for(const[o,r]of s)o==="!!"&&r==="tag:yaml.org,2002:"||(!e||i.some(a=>a.startsWith(r)))&&t.push(`%TAG ${o} ${r}`);return t.join(`
`)}}D.defaultYaml={explicit:!1,version:"1.2"};D.defaultTags={"!!":"tag:yaml.org,2002:"};function jt(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Lt(n){const e=new Set;return le(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Bt(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Ci(n,e){const t=[],s=new Map;let i=null;return{onAnchor:o=>{t.push(o),i??(i=Lt(n));const r=Bt(e,i);return i.add(r),r},setAnchors:()=>{for(const o of t){const r=s.get(o);if(typeof r=="object"&&r.anchor&&(O(r.node)||C(r.node)))r.node.anchor=r.anchor;else{const a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=o,a}}},sourceObjects:s}}function Z(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,o=s.length;i<o;++i){const r=s[i],a=Z(n,s,String(i),r);a===void 0?delete s[i]:a!==r&&(s[i]=a)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const o=s.get(i),r=Z(n,s,i,o);r===void 0?s.delete(i):r!==o&&s.set(i,r)}else if(s instanceof Set)for(const i of Array.from(s)){const o=Z(n,s,i,i);o===void 0?s.delete(i):o!==i&&(s.delete(i),s.add(o))}else for(const[i,o]of Object.entries(s)){const r=Z(n,s,i,o);r===void 0?delete s[i]:r!==o&&(s[i]=r)}return n.call(e,t,s)}function B(n,e,t){if(Array.isArray(n))return n.map((s,i)=>B(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Dt(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=o=>{s.res=o,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}class ot{constructor(e){Object.defineProperty(this,M,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:o}={}){if(!Be(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},a=B(this,"",r);if(typeof i=="function")for(const{count:l,res:c}of r.anchors.values())i(c,l);return typeof o=="function"?Z(o,{"":a},"",a):a}}class rt extends ot{constructor(e){super(it),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError("Alias resolution is disabled");let s;t?.aliasResolveCache?s=t.aliasResolveCache:(s=[],le(e,{Node:(o,r)=>{(ae(r)||Dt(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let i;for(const o of s){if(o===this)break;o.anchor===this.source&&(i=o)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:o}=t,r=this.resolve(i,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=s.get(r);if(a||(B(r,null,t),a=s.get(r)),a?.res===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(o>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Pe(i,r,s)),a.count*a.aliasCount>o)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(jt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const o=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(o)}if(e.implicitKey)return`${i} `}return i}}function Pe(n,e,t){if(ae(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(C(e)){let s=0;for(const i of e.items){const o=Pe(n,i,t);o>s&&(s=o)}return s}else if(P(e)){const s=Pe(n,e.key,t),i=Pe(n,e.value,t);return Math.max(s,i)}return 1}const Mt=n=>!n||typeof n!="function"&&typeof n!="object";class _ extends ot{constructor(e){super(F),this.value=e}toJSON(e,t){return t?.keep?this.value:B(this.value,e,t)}toString(){return String(this.value)}}_.BLOCK_FOLDED="BLOCK_FOLDED";_.BLOCK_LITERAL="BLOCK_LITERAL";_.PLAIN="PLAIN";_.QUOTE_DOUBLE="QUOTE_DOUBLE";_.QUOTE_SINGLE="QUOTE_SINGLE";const Ii="tag:yaml.org,2002:";function Pi(n,e,t){if(e){const s=t.filter(o=>o.tag===e),i=s.find(o=>!o.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>s.identify?.(n)&&!s.format)}function me(n,e,t){if(Be(n)&&(n=n.contents),I(n))return n;if(P(n)){const u=t.schema[K].createNode?.(t.schema,null,t);return u.items.push(n),u}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:o,schema:r,sourceObjects:a}=t;let l;if(s&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor??(l.anchor=i(n)),new rt(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=Ii+e.slice(2));let c=Pi(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const u=new _(n);return l&&(l.node=u),u}c=n instanceof Map?r[K]:Symbol.iterator in Object(n)?r[re]:r[K]}o&&(o(c),delete t.onTagObj);const h=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new _(n);return e?h.tag=e:c.default||(h.tag=c.tag),l&&(l.node=h),h}function De(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const o=e[i];if(typeof o=="number"&&Number.isInteger(o)&&o>=0){const r=[];r[o]=s,s=r}else s=new Map([[o,s]])}return me(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const fe=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class $t extends ot{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>I(s)||P(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(fe(e))this.add(t);else{const[s,...i]=e,o=this.get(s,!0);if(C(o))o.addIn(i,t);else if(o===void 0&&this.schema)this.set(s,De(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(C(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,o=this.get(s,!0);return i.length===0?!t&&O(o)?o.value:o:C(o)?o.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!P(t))return!1;const s=t.value;return s==null||e&&O(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return C(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const o=this.get(s,!0);if(C(o))o.setIn(i,t);else if(o===void 0&&this.schema)this.set(s,De(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const Ni=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function R(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const G=(n,e,t)=>n.endsWith(`
`)?R(t,e):t.includes(`
`)?`
`+R(t,e):(n.endsWith(" ")?"":" ")+t,xt="flow",Ze="block",Ne="quoted";function Me(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:o=20,onFold:r,onOverflow:a}={}){if(!i||i<0)return n;i<o&&(o=0);const l=Math.max(1+o,1+i-e.length);if(n.length<=l)return n;const c=[],h={};let u=i-e.length;typeof s=="number"&&(s>i-Math.max(2,o)?c.push(0):u=i-s);let d,g,m=!1,f=-1,p=-1,b=-1;t===Ze&&(f=kt(n,f,e.length),f!==-1&&(u=f+l));for(let k;k=n[f+=1];){if(t===Ne&&k==="\\"){switch(p=f,n[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}b=f}if(k===`
`)t===Ze&&(f=kt(n,f,e.length)),u=f+e.length+l,d=void 0;else{if(k===" "&&g&&g!==" "&&g!==`
`&&g!=="	"){const v=n[f+1];v&&v!==" "&&v!==`
`&&v!=="	"&&(d=f)}if(f>=u)if(d)c.push(d),u=d+l,d=void 0;else if(t===Ne){for(;g===" "||g==="	";)g=k,k=n[f+=1],m=!0;const v=f>b+1?f-2:p-1;if(h[v])return n;c.push(v),h[v]=!0,u=v+l,d=void 0}else m=!0}g=k}if(m&&a&&a(),c.length===0)return n;r&&r();let w=n.slice(0,c[0]);for(let k=0;k<c.length;++k){const v=c[k],S=c[k+1]||n.length;v===0?w=`
${e}${n.slice(0,S)}`:(t===Ne&&h[v]&&(w+=`${n[v]}\\`),w+=`
${e}${n.slice(v+1,S)}`)}return w}function kt(n,e,t){let s=e,i=e+1,o=n[i];for(;o===" "||o==="	";)if(e<i+t)o=n[++e];else{do o=n[++e];while(o&&o!==`
`);s=e,i=e+1,o=n[i]}return s}const $e=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),xe=n=>/^(%|---|\.\.\.)/m.test(n);function Ei(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let o=0,r=0;o<i;++o)if(n[o]===`
`){if(o-r>s)return!0;if(r=o+1,i-r<=s)return!1}return!0}function ge(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,o=e.indent||(xe(n)?"  ":"");let r="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(a,l);const h=t.substr(l+2,4);switch(h){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:h.substr(0,2)==="00"?r+="\\x"+h.substr(2):r+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(r+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=o,t[l+2]===" "&&(r+="\\"),l+=1,a=l+1}break;default:l+=1}return r=a?r+t.slice(a):t,s?r:Me(r,o,Ne,$e(e,!1))}function et(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ge(n,e);const t=e.indent||(xe(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Me(s,t,xt,$e(e,!1))}function ee(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ge;else{const i=n.includes('"'),o=n.includes("'");i&&!o?s=et:o&&!i?s=ge:s=t?et:ge}return s(n,e)}let tt;try{tt=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{tt=/\n+(?!\n|$)/g}function Ee({comment:n,type:e,value:t},s,i,o){const{blockQuote:r,commentString:a,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return ee(t,s);const c=s.indent||(s.forceBlockIndent||xe(t)?"  ":""),h=r==="literal"?!0:r==="folded"||e===_.BLOCK_FOLDED?!1:e===_.BLOCK_LITERAL?!0:!Ei(t,l,c.length);if(!t)return h?`|
`:`>
`;let u,d;for(d=t.length;d>0;--d){const S=t[d-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let g=t.substring(d);const m=g.indexOf(`
`);m===-1?u="-":t===g||m!==g.length-1?(u="+",o&&o()):u="",g&&(t=t.slice(0,-g.length),g[g.length-1]===`
`&&(g=g.slice(0,-1)),g=g.replace(tt,`$&${c}`));let f=!1,p,b=-1;for(p=0;p<t.length;++p){const S=t[p];if(S===" ")f=!0;else if(S===`
`)b=p;else break}let w=t.substring(0,b<p?b+1:p);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let v=(f?c?"2":"1":"")+u;if(n&&(v+=" "+a(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!h){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let T=!1;const A=$e(s,!0);r!=="folded"&&e!==_.BLOCK_FOLDED&&(A.onOverflow=()=>{T=!0});const y=Me(`${w}${S}${g}`,c,Ze,A);if(!T)return`>${v}
${c}${y}`}return t=t.replace(/\n+/g,`$&${c}`),`|${v}
${c}${w}${t}${g}`}function Di(n,e,t,s){const{type:i,value:o}=n,{actualString:r,implicitKey:a,indent:l,indentStep:c,inFlow:h}=e;if(a&&o.includes(`
`)||h&&/[[\]{},]/.test(o))return ee(o,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))return a||h||!o.includes(`
`)?ee(o,e):Ee(n,e,t,s);if(!a&&!h&&i!==_.PLAIN&&o.includes(`
`))return Ee(n,e,t,s);if(xe(o)){if(l==="")return e.forceBlockIndent=!0,Ee(n,e,t,s);if(a&&l===c)return ee(o,e)}const u=o.replace(/\n+/g,`$&
${l}`);if(r){const d=f=>f.default&&f.tag!=="tag:yaml.org,2002:str"&&f.test?.test(u),{compat:g,tags:m}=e.doc.schema;if(m.some(d)||g?.some(d))return ee(o,e)}return a?u:Me(u,l,xt,$e(e,!1))}function at(n,e,t,s){const{implicitKey:i,inFlow:o}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:a}=n;a!==_.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(a=_.QUOTE_DOUBLE);const l=h=>{switch(h){case _.BLOCK_FOLDED:case _.BLOCK_LITERAL:return i||o?ee(r.value,e):Ee(r,e,t,s);case _.QUOTE_DOUBLE:return ge(r.value,e);case _.QUOTE_SINGLE:return et(r.value,e);case _.PLAIN:return Di(r,e,t,s);default:return null}};let c=l(a);if(c===null){const{defaultKeyType:h,defaultStringType:u}=e.options,d=i&&h||u;if(c=l(d),c===null)throw new Error(`Unsupported default string type ${d}`)}return c}function Ft(n,e){const t=Object.assign({blockQuote:!0,commentString:Ni,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function ji(n,e){if(e.tag){const i=n.filter(o=>o.tag===e.tag);if(i.length>0)return i.find(o=>o.format===e.format)??i[0]}let t,s;if(O(e)){s=e.value;let i=n.filter(o=>o.identify?.(s));if(i.length>1){const o=i.filter(r=>r.test);o.length>0&&(i=o)}t=i.find(o=>o.format===e.format)??i.find(o=>!o.format)}else s=e,t=n.find(i=>i.nodeClass&&s instanceof i.nodeClass);if(!t){const i=s?.constructor?.name??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${i} value`)}return t}function Li(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],o=(O(n)||C(n))&&n.anchor;o&&jt(o)&&(t.add(o),i.push(`&${o}`));const r=n.tag??(e.default?null:e.tag);return r&&i.push(s.directives.tagString(r)),i.join(" ")}function ie(n,e,t,s){if(P(n))return n.toString(e,t,s);if(ae(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const o=I(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=ji(e.doc.schema.tags,o));const r=Li(o,i,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const a=typeof i.stringify=="function"?i.stringify(o,e,t,s):O(o)?at(o,e,t,s):o.toString(e,t,s);return r?O(o)||a[0]==="{"||a[0]==="["?`${r} ${a}`:`${r}
${e.indent}${a}`:a}function Bi({key:n,value:e},t,s,i){const{allNullValues:o,doc:r,indent:a,indentStep:l,options:{commentString:c,indentSeq:h,simpleKeys:u}}=t;let d=I(n)&&n.comment||null;if(u){if(d)throw new Error("With simple keys, key nodes cannot have comments");if(C(n)||!I(n)&&typeof n=="object"){const A="With simple keys, collection cannot be used as a key value";throw new Error(A)}}let g=!u&&(!n||d&&e==null&&!t.inFlow||C(n)||(O(n)?n.type===_.BLOCK_FOLDED||n.type===_.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!g&&(u||!o),indent:a+l});let m=!1,f=!1,p=ie(n,t,()=>m=!0,()=>f=!0);if(!g&&!t.inFlow&&p.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");g=!0}if(t.inFlow){if(o||e==null)return m&&s&&s(),p===""?"?":g?`? ${p}`:p}else if(o&&!u||e==null&&g)return p=`? ${p}`,d&&!m?p+=G(p,t.indent,c(d)):f&&i&&i(),p;m&&(d=null),g?(d&&(p+=G(p,t.indent,c(d))),p=`? ${p}
${a}:`):(p=`${p}:`,d&&(p+=G(p,t.indent,c(d))));let b,w,k;I(e)?(b=!!e.spaceBefore,w=e.commentBefore,k=e.comment):(b=!1,w=null,k=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!g&&!d&&O(e)&&(t.indentAtStart=p.length+1),f=!1,!h&&l.length>=2&&!t.inFlow&&!g&&we(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let v=!1;const S=ie(e,t,()=>v=!0,()=>f=!0);let T=" ";if(d||b||w){if(T=b?`
`:"",w){const A=c(w);T+=`
${R(A,t.indent)}`}S===""&&!t.inFlow?T===`
`&&k&&(T=`

`):T+=`
${t.indent}`}else if(!g&&C(e)){const A=S[0],y=S.indexOf(`
`),N=y!==-1,z=t.inFlow??e.flow??e.items.length===0;if(N||!z){let J=!1;if(N&&(A==="&"||A==="!")){let E=S.indexOf(" ");A==="&"&&E!==-1&&E<y&&S[E+1]==="!"&&(E=S.indexOf(" ",E+1)),(E===-1||y<E)&&(J=!0)}J||(T=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(T="");return p+=T+S,t.inFlow?v&&s&&s():k&&!v?p+=G(p,t.indent,c(k)):f&&i&&i(),p}function Rt(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Se="<<",U={identify:n=>n===Se||typeof n=="symbol"&&n.description===Se,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new _(Symbol(Se)),{addToJSMap:Ut}),stringify:()=>Se},Mi=(n,e)=>(U.identify(e)||O(e)&&(!e.type||e.type===_.PLAIN)&&U.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===U.tag&&t.default);function Ut(n,e,t){const s=zt(n,t);if(we(s))for(const i of s.items)We(n,e,i);else if(Array.isArray(s))for(const i of s)We(n,e,i);else We(n,e,s)}function We(n,e,t){const s=zt(n,t);if(!be(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[o,r]of i)e instanceof Map?e.has(o)||e.set(o,r):e instanceof Set?e.add(o):Object.prototype.hasOwnProperty.call(e,o)||Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function zt(n,e){return n&&ae(e)?e.resolve(n.doc,n):e}function qt(n,e,{key:t,value:s}){if(I(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Mi(n,t))Ut(n,e,s);else{const i=B(t,"",n);if(e instanceof Map)e.set(i,B(s,i,n));else if(e instanceof Set)e.add(i);else{const o=$i(t,i,n),r=B(s,o,n);o in e?Object.defineProperty(e,o,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[o]=r}}return e}function $i(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(I(n)&&t?.doc){const s=Ft(t.doc,{});s.anchors=new Set;for(const o of t.anchors.keys())s.anchors.add(o.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let o=JSON.stringify(i);o.length>40&&(o=o.substring(0,36)+'..."'),Rt(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function lt(n,e,t){const s=me(n,void 0,t),i=me(e,void 0,t);return new j(s,i)}class j{constructor(e,t=null){Object.defineProperty(this,M,{value:Et}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return I(t)&&(t=t.clone(e)),I(s)&&(s=s.clone(e)),new j(t,s)}toJSON(e,t){const s=t?.mapAsMap?new Map:{};return qt(t,s,this)}toString(e,t,s){return e?.doc?Bi(this,e,t,s):JSON.stringify(this)}}function Kt(n,e,t){return(e.inFlow??n.flow?Fi:xi)(n,e,t)}function xi({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:o,onChompKeep:r,onComment:a}){const{indent:l,options:{commentString:c}}=t,h=Object.assign({},t,{indent:o,type:null});let u=!1;const d=[];for(let m=0;m<e.length;++m){const f=e[m];let p=null;if(I(f))!u&&f.spaceBefore&&d.push(""),je(t,d,f.commentBefore,u),f.comment&&(p=f.comment);else if(P(f)){const w=I(f.key)?f.key:null;w&&(!u&&w.spaceBefore&&d.push(""),je(t,d,w.commentBefore,u))}u=!1;let b=ie(f,h,()=>p=null,()=>u=!0);p&&(b+=G(b,o,c(p))),u&&p&&(u=!1),d.push(s+b)}let g;if(d.length===0)g=i.start+i.end;else{g=d[0];for(let m=1;m<d.length;++m){const f=d[m];g+=f?`
${l}${f}`:`
`}}return n?(g+=`
`+R(c(n),l),a&&a()):u&&r&&r(),g}function Fi({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:o,flowCollectionPadding:r,options:{commentString:a}}=e;s+=o;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,h=0;const u=[];for(let m=0;m<n.length;++m){const f=n[m];let p=null;if(I(f))f.spaceBefore&&u.push(""),je(e,u,f.commentBefore,!1),f.comment&&(p=f.comment);else if(P(f)){const w=I(f.key)?f.key:null;w&&(w.spaceBefore&&u.push(""),je(e,u,w.commentBefore,!1),w.comment&&(c=!0));const k=I(f.value)?f.value:null;k?(k.comment&&(p=k.comment),k.commentBefore&&(c=!0)):f.value==null&&w?.comment&&(p=w.comment)}p&&(c=!0);let b=ie(f,l,()=>p=null);c||(c=u.length>h||b.includes(`
`)),m<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=u.reduce((w,k)=>w+k.length+2,2)+(b.length+2)>e.options.lineWidth)),c&&(b+=",")),p&&(b+=G(b,s,a(p))),u.push(b),h=u.length}const{start:d,end:g}=t;if(u.length===0)return d+g;if(!c){const m=u.reduce((f,p)=>f+p.length+2,2);c=e.options.lineWidth>0&&m>e.options.lineWidth}if(c){let m=d;for(const f of u)m+=f?`
${o}${i}${f}`:`
`;return`${m}
${i}${g}`}else return`${d}${r}${u.join(" ")}${r}${g}`}function je({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const o=R(e(s),n);t.push(o.trimStart())}}function H(n,e){const t=O(e)?e.value:e;for(const s of n)if(P(s)&&(s.key===e||s.key===t||O(s.key)&&s.key.value===t))return s}class L extends $t{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(K,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:o}=s,r=new this(e),a=(l,c)=>{if(typeof o=="function")c=o.call(t,l,c);else if(Array.isArray(o)&&!o.includes(l))return;(c!==void 0||i)&&r.items.push(lt(l,c,s))};if(t instanceof Map)for(const[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){let s;P(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new j(e,e?.value):s=new j(e.key,e.value);const i=H(this.items,s.key),o=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);O(i.value)&&Mt(s.value)?i.value.value=s.value:i.value=s.value}else if(o){const r=this.items.findIndex(a=>o(s,a)<0);r===-1?this.items.push(s):this.items.splice(r,0,s)}else this.items.push(s)}delete(e){const t=H(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const i=H(this.items,e)?.value;return(!t&&O(i)?i.value:i)??void 0}has(e){return!!H(this.items,e)}set(e,t){this.add(new j(e,t),!0)}toJSON(e,t,s){const i=s?new s:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(const o of this.items)qt(t,i,o);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!P(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Kt(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const ce={collection:"map",default:!0,nodeClass:L,tag:"tag:yaml.org,2002:map",resolve(n,e){return be(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>L.from(n,e,t)};class V extends $t{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(re,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=_e(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=_e(e);if(typeof s!="number")return;const i=this.items[s];return!t&&O(i)?i.value:i}has(e){const t=_e(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=_e(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];O(i)&&Mt(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t?.onCreate&&t.onCreate(s);let i=0;for(const o of this.items)s.push(B(o,String(i++),t));return s}toString(e,t,s){return e?Kt(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,o=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let a of t){if(typeof i=="function"){const l=t instanceof Set?a:String(r++);a=i.call(t,l,a)}o.items.push(me(a,void 0,s))}}return o}}function _e(n){let e=O(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ue={collection:"seq",default:!0,nodeClass:V,tag:"tag:yaml.org,2002:seq",resolve(n,e){return we(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>V.from(n,e,t)},Fe={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),at(n,e,t,s)}},Re={identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new _(null),stringify:({source:n},e)=>typeof n=="string"&&Re.test.test(n)?n:e.options.nullStr},ct={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new _(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ct.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function x({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let o=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(o)&&!o.includes("e")){let r=o.indexOf(".");r<0&&(r=o.length,o+=".");let a=e-(o.length-r-1);for(;a-- >0;)o+="0"}return o}const Wt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:x},Gt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():x(n)}},Ht={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new _(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:x},Ue=n=>typeof n=="bigint"||Number.isInteger(n),ut=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Vt(n,e,t){const{value:s}=n;return Ue(s)&&s>=0?t+s.toString(e):x(n)}const Jt={identify:n=>Ue(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ut(n,2,8,t),stringify:n=>Vt(n,8,"0o")},Yt={identify:Ue,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ut(n,0,10,t),stringify:x},Qt={identify:n=>Ue(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ut(n,2,16,t),stringify:n=>Vt(n,16,"0x")},Ri=[ce,ue,Fe,Re,ct,Jt,Yt,Qt,Wt,Gt,Ht];function vt(n){return typeof n=="bigint"||Number.isInteger(n)}const Te=({value:n})=>JSON.stringify(n),Ui=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Te},{identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Te},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Te},{identify:vt,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>vt(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Te}],zi={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},qi=[ce,ue].concat(Ui,zi),dt={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,o){if(!t)return"";const r=t;let a;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=_.BLOCK_LITERAL),e!==_.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(a.length/l),h=new Array(c);for(let u=0,d=0;u<c;++u,d+=l)h[u]=a.substr(d,l);a=h.join(e===_.BLOCK_LITERAL?`
`:" ")}return at({comment:n,type:e,value:a},s,i,o)}};function Xt(n,e){if(we(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!P(s)){if(be(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new j(new _(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const o=i.value??i.key;o.comment=o.comment?`${s.comment}
${o.comment}`:s.comment}s=i}n.items[t]=P(s)?s:new j(s)}}else e("Expected a sequence for this tag");return n}function Zt(n,e,t){const{replacer:s}=t,i=new V(n);i.tag="tag:yaml.org,2002:pairs";let o=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(o++),r));let a,l;if(Array.isArray(r))if(r.length===2)a=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)a=c[0],l=r[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=r;i.items.push(lt(a,l,t))}return i}const ft={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Xt,createNode:Zt};class te extends V{constructor(){super(),this.add=L.prototype.add.bind(this),this.delete=L.prototype.delete.bind(this),this.get=L.prototype.get.bind(this),this.has=L.prototype.has.bind(this),this.set=L.prototype.set.bind(this),this.tag=te.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t?.onCreate&&t.onCreate(s);for(const i of this.items){let o,r;if(P(i)?(o=B(i.key,"",t),r=B(i.value,o,t)):o=B(i,"",t),s.has(o))throw new Error("Ordered maps must not include duplicate keys");s.set(o,r)}return s}static from(e,t,s){const i=Zt(e,t,s),o=new this;return o.items=i.items,o}}te.tag="tag:yaml.org,2002:omap";const ht={collection:"seq",identify:n=>n instanceof Map,nodeClass:te,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Xt(n,e),s=[];for(const{key:i}of t.items)O(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new te,t)},createNode:(n,e,t)=>te.from(n,e,t)};function en({value:n,source:e},t){return e&&(n?tn:nn).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const tn={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new _(!0),stringify:en},nn={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new _(!1),stringify:en},Ki={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:x},Wi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():x(n)}},Gi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new _(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:x},ke=n=>typeof n=="bigint"||Number.isInteger(n);function ze(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return i==="-"?BigInt(-1)*r:r}const o=parseInt(n,t);return i==="-"?-1*o:o}function pt(n,e,t){const{value:s}=n;if(ke(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return x(n)}const Hi={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>ze(n,2,2,t),stringify:n=>pt(n,2,"0b")},Vi={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>ze(n,1,8,t),stringify:n=>pt(n,8,"0")},Ji={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>ze(n,0,10,t),stringify:x},Yi={identify:ke,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>ze(n,2,16,t),stringify:n=>pt(n,16,"0x")};class ne extends L{constructor(e){super(e),this.tag=ne.tag}add(e){let t;P(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new j(e.key,null):t=new j(e,null),H(this.items,t.key)||this.items.push(t)}get(e,t){const s=H(this.items,e);return!t&&P(s)?O(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=H(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new j(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,o=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof i=="function"&&(r=i.call(t,r,r)),o.items.push(lt(r,null,s));return o}}ne.tag="tag:yaml.org,2002:set";const gt={collection:"map",identify:n=>n instanceof Set,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>ne.from(n,e,t),resolve(n,e){if(be(n)){if(n.hasAllNullValues(!0))return Object.assign(new ne,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function mt(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=r=>e?BigInt(r):Number(r),o=s.replace(/_/g,"").split(":").reduce((r,a)=>r*i(60)+i(a),i(0));return t==="-"?i(-1)*o:o}function sn(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return x(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),o=[e%i];return e<60?o.unshift(0):(e=(e-o[0])/i,o.unshift(e%i),e>=60&&(e=(e-o[0])/i,o.unshift(e))),s+o.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const on={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>mt(n,t),stringify:sn},rn={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>mt(n,!1),stringify:sn},qe={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(qe.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,o,r,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,o||0,r||0,a||0,l);const h=e[8];if(h&&h!=="Z"){let u=mt(h,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},St=[ce,ue,Fe,Re,tn,nn,Hi,Vi,Ji,Yi,Ki,Wi,Gi,dt,U,ht,ft,gt,on,rn,qe],_t=new Map([["core",Ri],["failsafe",[ce,ue,Fe]],["json",qi],["yaml11",St],["yaml-1.1",St]]),Tt={binary:dt,bool:ct,float:Ht,floatExp:Gt,floatNaN:Wt,floatTime:rn,int:Yt,intHex:Qt,intOct:Jt,intTime:on,map:ce,merge:U,null:Re,omap:ht,pairs:ft,seq:ue,set:gt,timestamp:qe},Qi={"tag:yaml.org,2002:binary":dt,"tag:yaml.org,2002:merge":U,"tag:yaml.org,2002:omap":ht,"tag:yaml.org,2002:pairs":ft,"tag:yaml.org,2002:set":gt,"tag:yaml.org,2002:timestamp":qe};function Ge(n,e,t){const s=_t.get(e);if(s&&!n)return t&&!s.includes(U)?s.concat(U):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const o=Array.from(_t.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${o} or define customTags array`)}if(Array.isArray(n))for(const o of n)i=i.concat(o);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(U)),i.reduce((o,r)=>{const a=typeof r=="string"?Tt[r]:r;if(!a){const l=JSON.stringify(r),c=Object.keys(Tt).map(h=>JSON.stringify(h)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return o.includes(a)||o.push(a),o},[])}const Xi=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class yt{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:o,sortMapEntries:r,toStringDefaults:a}){this.compat=Array.isArray(e)?Ge(e,"compat"):e?Ge(null,e):null,this.name=typeof o=="string"&&o||"core",this.knownTags=i?Qi:{},this.tags=Ge(t,this.name,s),this.toStringOptions=a??null,Object.defineProperty(this,K,{value:ce}),Object.defineProperty(this,F,{value:Fe}),Object.defineProperty(this,re,{value:ue}),this.sortMapEntries=typeof r=="function"?r:r===!0?Xi:null}clone(){const e=Object.create(yt.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Zi(n,e){const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ft(n,e),{commentString:o}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=o(n.commentBefore);t.unshift(R(l,""))}let r=!1,a=null;if(n.contents){if(I(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const h=o(n.contents.commentBefore);t.push(R(h,""))}i.forceBlockIndent=!!n.comment,a=n.contents.comment}const l=a?void 0:()=>r=!0;let c=ie(n.contents,i,()=>a=null,l);a&&(c+=G(c,"",o(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ie(n.contents,i));if(n.directives?.docEnd)if(n.comment){const l=o(n.comment);l.includes(`
`)?(t.push("..."),t.push(R(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||a)&&t[t.length-1]!==""&&t.push(""),t.push(R(o(l),"")))}return t.join(`
`)+`
`}class Ke{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,M,{value:Xe});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const o=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=o;let{version:r}=o;s?._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new D({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Ke.prototype,{[M]:{value:Xe}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=I(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Y(this.contents)&&this.contents.add(e)}addIn(e,t){Y(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Lt(this);e.anchor=!t||s.has(t)?Bt(t||"a",s):t}return new rt(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const p=w=>typeof w=="number"||w instanceof String||w instanceof Number,b=t.filter(p).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:o,anchorPrefix:r,flow:a,keepUndefined:l,onTagObj:c,tag:h}=s??{},{onAnchor:u,setAnchors:d,sourceObjects:g}=Ci(this,r||"a"),m={aliasDuplicateObjects:o??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:g},f=me(e,h,m);return a&&C(f)&&(f.flow=!0),d(),f}createPair(e,t,s={}){const i=this.createNode(e,null,s),o=this.createNode(t,null,s);return new j(i,o)}delete(e){return Y(this.contents)?this.contents.delete(e):!1}deleteIn(e){return fe(e)?this.contents==null?!1:(this.contents=null,!0):Y(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return C(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return fe(e)?!t&&O(this.contents)?this.contents.value:this.contents:C(this.contents)?this.contents.getIn(e,t):void 0}has(e){return C(this.contents)?this.contents.has(e):!1}hasIn(e){return fe(e)?this.contents!==void 0:C(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=De(this.schema,[e],t):Y(this.contents)&&this.contents.set(e,t)}setIn(e,t){fe(e)?this.contents=t:this.contents==null?this.contents=De(this.schema,Array.from(e),t):Y(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new D({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new D({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new yt(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:o,reviver:r}={}){const a={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=B(this.contents,t??"",a);if(typeof o=="function")for(const{count:c,res:h}of a.anchors.values())o(h,c);return typeof r=="function"?Z(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Zi(this,e)}}function Y(n){if(C(n))return!0;throw new Error("Expected a YAML collection as document contents")}class an extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class he extends an{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class eo extends an{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const At=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let o=i-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(o>=60&&r.length>80){const a=Math.min(o-39,r.length-79);r="…"+r.substring(a),o-=a-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,o))){let a=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);a.length>80&&(a=a.substring(0,79)+`…
`),r=a+r}if(/[^ ]/.test(r)){let a=1;const l=t.linePos[1];l?.line===s&&l.col>i&&(a=Math.max(1,Math.min(l.col-i,80-o)));const c=" ".repeat(o)+"^".repeat(a);t.message+=`:

${r}
${c}
`}};function oe(n,{flow:e,indicator:t,next:s,offset:i,onError:o,parentIndent:r,startOnNewline:a}){let l=!1,c=a,h=a,u="",d="",g=!1,m=!1,f=null,p=null,b=null,w=null,k=null,v=null,S=null;for(const y of n)switch(m&&(y.type!=="space"&&y.type!=="newline"&&y.type!=="comma"&&o(y.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m=!1),f&&(c&&y.type!=="comment"&&y.type!=="newline"&&o(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),f=null),y.type){case"space":!e&&(t!=="doc-start"||s?.type!=="flow-collection")&&y.source.includes("	")&&(f=y),h=!0;break;case"comment":{h||o(y,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const N=y.source.substring(1)||" ";u?u+=d+N:u=N,d="",c=!1;break}case"newline":c?u?u+=y.source:(!v||t!=="seq-item-ind")&&(l=!0):d+=y.source,c=!0,g=!0,(p||b)&&(w=y),h=!0;break;case"anchor":p&&o(y,"MULTIPLE_ANCHORS","A node can have at most one anchor"),y.source.endsWith(":")&&o(y.offset+y.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),p=y,S??(S=y.offset),c=!1,h=!1,m=!0;break;case"tag":{b&&o(y,"MULTIPLE_TAGS","A node can have at most one tag"),b=y,S??(S=y.offset),c=!1,h=!1,m=!0;break}case t:(p||b)&&o(y,"BAD_PROP_ORDER",`Anchors and tags must be after the ${y.source} indicator`),v&&o(y,"UNEXPECTED_TOKEN",`Unexpected ${y.source} in ${e??"collection"}`),v=y,c=t==="seq-item-ind"||t==="explicit-key-ind",h=!1;break;case"comma":if(e){k&&o(y,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=y,c=!1,h=!1;break}default:o(y,"UNEXPECTED_TOKEN",`Unexpected ${y.type} token`),c=!1,h=!1}const T=n[n.length-1],A=T?T.offset+T.source.length:i;return m&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&o(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f&&(c&&f.indent<=r||s?.type==="block-map"||s?.type==="block-seq")&&o(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:v,spaceBefore:l,comment:u,hasNewline:g,anchor:p,tag:b,newlineAfterProp:w,end:A,start:S??A}}function ye(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ye(e.key)||ye(e.value))return!0}return!1;default:return!0}}function nt(n,e,t){if(e?.type==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ye(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function ln(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(o,r)=>o===r||O(o)&&O(r)&&o.value===r.value;return e.some(o=>i(o.key,t))}const Ot="All mapping items must start at the same column";function to({composeNode:n,composeEmptyNode:e},t,s,i,o){const r=o?.nodeClass??L,a=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const h of s.items){const{start:u,key:d,sep:g,value:m}=h,f=oe(u,{indicator:"explicit-key-ind",next:d??g?.[0],offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),p=!f.found;if(p){if(d&&(d.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==s.indent&&i(l,"BAD_INDENT",Ot)),!f.anchor&&!f.tag&&!g){c=f.end,f.comment&&(a.comment?a.comment+=`
`+f.comment:a.comment=f.comment);continue}(f.newlineAfterProp||ye(d))&&i(d??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else f.found?.indent!==s.indent&&i(l,"BAD_INDENT",Ot);t.atKey=!0;const b=f.end,w=d?n(t,d,f,i):e(t,b,u,null,f,i);t.schema.compat&&nt(s.indent,d,i),t.atKey=!1,ln(t,a.items,w)&&i(b,"DUPLICATE_KEY","Map keys must be unique");const k=oe(g??[],{indicator:"map-value-ind",next:m,offset:w.range[2],onError:i,parentIndent:s.indent,startOnNewline:!d||d.type==="block-scalar"});if(l=k.end,k.found){p&&(m?.type==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&f.start<k.found.offset-1024&&i(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const v=m?n(t,m,k,i):e(t,l,g,null,k,i);t.schema.compat&&nt(s.indent,m,i),l=v.range[2];const S=new j(w,v);t.options.keepSourceTokens&&(S.srcToken=h),a.items.push(S)}else{p&&i(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(w.comment?w.comment+=`
`+k.comment:w.comment=k.comment);const v=new j(w);t.options.keepSourceTokens&&(v.srcToken=h),a.items.push(v)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[s.offset,l,c??l],a}function no({composeNode:n,composeEmptyNode:e},t,s,i,o){const r=o?.nodeClass??V,a=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:h,value:u}of s.items){const d=oe(h,{indicator:"seq-item-ind",next:u,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||u)u?.type==="block-seq"?i(d.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=d.end,d.comment&&(a.comment=d.comment);continue}const g=u?n(t,u,d,i):e(t,d.end,h,null,d,i);t.schema.compat&&nt(s.indent,u,i),l=g.range[2],a.items.push(g)}return a.range=[s.offset,l,c??l],a}function ve(n,e,t,s){let i="";if(n){let o=!1,r="";for(const a of n){const{source:l,type:c}=a;switch(c){case"space":o=!0;break;case"comment":{t&&!o&&s(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const h=l.substring(1)||" ";i?i+=r+h:i=h,r="";break}case"newline":i&&(r+=l),o=!0;break;default:s(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const He="Block collections are not allowed within flow collections",Ve=n=>n&&(n.type==="block-map"||n.type==="block-seq");function so({composeNode:n,composeEmptyNode:e},t,s,i,o){const r=s.start.source==="{",a=r?"flow map":"flow sequence",l=o?.nodeClass??(r?L:V),c=new l(t.schema);c.flow=!0;const h=t.atRoot;h&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=s.offset+s.start.source.length;for(let p=0;p<s.items.length;++p){const b=s.items[p],{start:w,key:k,sep:v,value:S}=b,T=oe(w,{flow:a,indicator:"explicit-key-ind",next:k??v?.[0],offset:u,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!T.found){if(!T.anchor&&!T.tag&&!v&&!S){p===0&&T.comma?i(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):p<s.items.length-1&&i(T.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),T.comment&&(c.comment?c.comment+=`
`+T.comment:c.comment=T.comment),u=T.end;continue}!r&&t.options.strict&&ye(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(p===0)T.comma&&i(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(T.comma||i(T.start,"MISSING_CHAR",`Missing , between ${a} items`),T.comment){let A="";e:for(const y of w)switch(y.type){case"comma":case"space":break;case"comment":A=y.source.substring(1);break e;default:break e}if(A){let y=c.items[c.items.length-1];P(y)&&(y=y.value??y.key),y.comment?y.comment+=`
`+A:y.comment=A,T.comment=T.comment.substring(A.length+1)}}if(!r&&!v&&!T.found){const A=S?n(t,S,T,i):e(t,T.end,v,null,T,i);c.items.push(A),u=A.range[2],Ve(S)&&i(A.range,"BLOCK_IN_FLOW",He)}else{t.atKey=!0;const A=T.end,y=k?n(t,k,T,i):e(t,A,w,null,T,i);Ve(k)&&i(y.range,"BLOCK_IN_FLOW",He),t.atKey=!1;const N=oe(v??[],{flow:a,indicator:"map-value-ind",next:S,offset:y.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(N.found){if(!r&&!T.found&&t.options.strict){if(v)for(const E of v){if(E===N.found)break;if(E.type==="newline"){i(E,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}T.start<N.found.offset-1024&&i(N.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&S.source?.[0]===":"?i(S,"MISSING_CHAR",`Missing space after : in ${a}`):i(N.start,"MISSING_CHAR",`Missing , or : between ${a} items`));const z=S?n(t,S,N,i):N.found?e(t,N.end,v,null,N,i):null;z?Ve(S)&&i(z.range,"BLOCK_IN_FLOW",He):N.comment&&(y.comment?y.comment+=`
`+N.comment:y.comment=N.comment);const J=new j(y,z);if(t.options.keepSourceTokens&&(J.srcToken=b),r){const E=c;ln(t,E.items,y)&&i(A,"DUPLICATE_KEY","Map keys must be unique"),E.items.push(J)}else{const E=new L(t.schema);E.flow=!0,E.items.push(J);const wt=(z??y).range;E.range=[y.range[0],wt[1],wt[2]],c.items.push(E)}u=z?z.range[2]:N.end}}const d=r?"}":"]",[g,...m]=s.end;let f=u;if(g?.source===d)f=g.offset+g.source.length;else{const p=a[0].toUpperCase()+a.substring(1),b=h?`${p} must end with a ${d}`:`${p} in block collection must be sufficiently indented and end with a ${d}`;i(u,h?"MISSING_CHAR":"BAD_INDENT",b),g&&g.source.length!==1&&m.unshift(g)}if(m.length>0){const p=ve(m,f,t.options.strict,i);p.comment&&(c.comment?c.comment+=`
`+p.comment:c.comment=p.comment),c.range=[s.offset,f,p.offset]}else c.range=[s.offset,f,f];return c}function Je(n,e,t,s,i,o){const r=t.type==="block-map"?to(n,e,t,s,o):t.type==="block-seq"?no(n,e,t,s,o):so(n,e,t,s,o),a=r.constructor;return i==="!"||i===a.tagName?(r.tag=a.tagName,r):(i&&(r.tag=i),r)}function io(n,e,t,s,i){const o=s.tag,r=o?e.directives.tagName(o.source,d=>i(o,"TAG_RESOLVE_FAILED",d)):null;if(t.type==="block-seq"){const{anchor:d,newlineAfterProp:g}=s,m=d&&o?d.offset>o.offset?d:o:d??o;m&&(!g||g.offset<m.offset)&&i(m,"MISSING_CHAR","Missing newline after block sequence props")}const a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!o||!r||r==="!"||r===L.tagName&&a==="map"||r===V.tagName&&a==="seq")return Je(n,e,t,i,r);let l=e.schema.tags.find(d=>d.tag===r&&d.collection===a);if(!l){const d=e.schema.knownTags[r];if(d?.collection===a)e.schema.tags.push(Object.assign({},d,{default:!1})),l=d;else return d?i(o,"BAD_COLLECTION_TYPE",`${d.tag} used for ${a} collection, but expects ${d.collection??"scalar"}`,!0):i(o,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Je(n,e,t,i,r)}const c=Je(n,e,t,i,r,l),h=l.resolve?.(c,d=>i(o,"TAG_RESOLVE_FAILED",d),e.options)??c,u=I(h)?h:new _(h);return u.range=c.range,u.tag=r,l?.format&&(u.format=l.format),u}function oo(n,e,t){const s=e.offset,i=ro(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const o=i.mode===">"?_.BLOCK_FOLDED:_.BLOCK_LITERAL,r=e.source?ao(e.source):[];let a=r.length;for(let f=r.length-1;f>=0;--f){const p=r[f][1];if(p===""||p==="\r")a=f;else break}if(a===0){const f=i.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let p=s+i.length;return e.source&&(p+=e.source.length),{value:f,type:o,comment:i.comment,range:[s,p,p]}}let l=e.indent+i.indent,c=e.offset+i.length,h=0;for(let f=0;f<a;++f){const[p,b]=r[f];if(b===""||b==="\r")i.indent===0&&p.length>l&&(l=p.length);else{p.length<l&&t(c+p.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=p.length),h=f,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=p.length+b.length+1}for(let f=r.length-1;f>=a;--f)r[f][0].length>l&&(a=f+1);let u="",d="",g=!1;for(let f=0;f<h;++f)u+=r[f][0].slice(l)+`
`;for(let f=h;f<a;++f){let[p,b]=r[f];c+=p.length+b.length+1;const w=b[b.length-1]==="\r";if(w&&(b=b.slice(0,-1)),b&&p.length<l){const v=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-b.length-(w?2:1),"BAD_INDENT",v),p=""}o===_.BLOCK_LITERAL?(u+=d+p.slice(l)+b,d=`
`):p.length>l||b[0]==="	"?(d===" "?d=`
`:!g&&d===`
`&&(d=`

`),u+=d+p.slice(l)+b,d=`
`,g=!0):b===""?d===`
`?u+=`
`:d=`
`:(u+=d+b,d=" ",g=!1)}switch(i.chomp){case"-":break;case"+":for(let f=a;f<r.length;++f)u+=`
`+r[f][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}const m=s+i.length+e.source.length;return{value:u,type:o,comment:i.comment,range:[s,m,m]}}function ro({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],o=i[0];let r=0,a="",l=-1;for(let d=1;d<i.length;++d){const g=i[d];if(!a&&(g==="-"||g==="+"))a=g;else{const m=Number(g);!r&&m?r=m:l===-1&&(l=n+d)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,h="",u=i.length;for(let d=1;d<e.length;++d){const g=e[d];switch(g.type){case"space":c=!0;case"newline":u+=g.source.length;break;case"comment":t&&!c&&s(g,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=g.source.length,h=g.source.substring(1);break;case"error":s(g,"UNEXPECTED_TOKEN",g.message),u+=g.source.length;break;default:{const m=`Unexpected token in block scalar header: ${g.type}`;s(g,"UNEXPECTED_TOKEN",m);const f=g.source;f&&typeof f=="string"&&(u+=f.length)}}}return{mode:o,indent:r,chomp:a,comment:h,length:u}}function ao(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),o=[s?.[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)o.push([e[r],e[r+1]]);return o}function lo(n,e,t){const{offset:s,type:i,source:o,end:r}=n;let a,l;const c=(d,g,m)=>t(s+d,g,m);switch(i){case"scalar":a=_.PLAIN,l=co(o,c);break;case"single-quoted-scalar":a=_.QUOTE_SINGLE,l=uo(o,c);break;case"double-quoted-scalar":a=_.QUOTE_DOUBLE,l=fo(o,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+o.length,s+o.length]}}const h=s+o.length,u=ve(r,h,e,t);return{value:l,type:a,comment:u.comment,range:[s,h,u.offset]}}function co(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),cn(n)}function uo(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),cn(n.slice(1,-1)).replace(/''/g,"'")}function cn(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],o=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?o===`
`?i+=o:o=`
`:(i+=o+s[1],o=" "),r=t.lastIndex;const a=/[ \t]*(.*)/sy;return a.lastIndex=r,s=a.exec(n),i+o+(s?.[1]??"")}function fo(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:o,offset:r}=ho(n,s);t+=o,s=r}else if(i==="\\"){let o=n[++s];const r=po[o];if(r)t+=r;else if(o===`
`)for(o=n[s+1];o===" "||o==="	";)o=n[++s+1];else if(o==="\r"&&n[s+1]===`
`)for(o=n[++s+1];o===" "||o==="	";)o=n[++s+1];else if(o==="x"||o==="u"||o==="U"){const a=o==="x"?2:o==="u"?4:8;t+=go(n,s+1,a,e),s+=a}else{const a=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(i===" "||i==="	"){const o=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>o?n.slice(o,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function ho(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const po={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function go(n,e,t,s){const i=n.substr(e,t),r=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(r)}catch{const a=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}}function un(n,e,t,s){const{value:i,type:o,comment:r,range:a}=e.type==="block-scalar"?oo(n,e,s):lo(e,n.options.strict,s),l=t?n.directives.tagName(t.source,u=>s(t,"TAG_RESOLVE_FAILED",u)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[F]:l?c=mo(n.schema,i,l,t,s):e.type==="scalar"?c=yo(n,i,e,s):c=n.schema[F];let h;try{const u=c.resolve(i,d=>s(t??e,"TAG_RESOLVE_FAILED",d),n.options);h=O(u)?u:new _(u)}catch(u){const d=u instanceof Error?u.message:String(u);s(t??e,"TAG_RESOLVE_FAILED",d),h=new _(i)}return h.range=a,h.source=i,o&&(h.type=o),l&&(h.tag=l),c.format&&(h.format=c.format),r&&(h.comment=r),h}function mo(n,e,t,s,i){if(t==="!")return n[F];const o=[];for(const a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)o.push(a);else return a;for(const a of o)if(a.test?.test(e))return a;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[F])}function yo({atKey:n,directives:e,schema:t},s,i,o){const r=t.tags.find(a=>(a.default===!0||n&&a.default==="key")&&a.test?.test(s))||t[F];if(t.compat){const a=t.compat.find(l=>l.default&&l.test?.test(s))??t[F];if(r.tag!==a.tag){const l=e.tagString(r.tag),c=e.tagString(a.tag),h=`Value may be parsed as either ${l} or ${c}`;o(i,"TAG_RESOLVE_FAILED",h,!0)}}return r}function bo(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];i?.type==="space";)n+=i.source.length,i=e[++s];break}}return n}const wo={composeNode:dn,composeEmptyNode:bt};function dn(n,e,t,s){const i=n.atKey,{spaceBefore:o,comment:r,anchor:a,tag:l}=t;let c,h=!0;switch(e.type){case"alias":c=ko(n,e,s),(a||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=un(n,e,l,s),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=io(wo,n,e,t,s),a&&(c.anchor=a.source.substring(1))}catch(u){const d=u instanceof Error?u.message:String(u);s(e,"RESOURCE_EXHAUSTION",d)}break;default:{const u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",u),h=!1}}return c??(c=bt(n,e.offset,void 0,null,t,s)),a&&c.anchor===""&&s(a,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!O(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),o&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&h&&(c.srcToken=e),c}function bt(n,e,t,s,{spaceBefore:i,comment:o,anchor:r,tag:a,end:l},c){const h={type:"scalar",offset:bo(e,t,s),indent:-1,source:""},u=un(n,h,a,c);return r&&(u.anchor=r.source.substring(1),u.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),o&&(u.comment=o,u.range[2]=l),u}function ko({options:n},{offset:e,source:t,end:s},i){const o=new rt(t.substring(1));o.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),o.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,a=ve(s,r,n.strict,i);return o.range=[e,r,a.offset],a.comment&&(o.comment=a.comment),o}function vo(n,e,{offset:t,start:s,value:i,end:o},r){const a=Object.assign({_directives:e},n),l=new Ke(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},h=oe(s,{indicator:"doc-start",next:i??o?.[0],offset:t,onError:r,parentIndent:0,startOnNewline:!0});h.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!h.hasNewline&&r(h.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?dn(c,i,h,r):bt(c,h.end,s,null,h,r);const u=l.contents.range[2],d=ve(o,u,!1,r);return d.comment&&(l.comment=d.comment),l.range=[t,u,d.offset],l}function de(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ct(n){let e="",t=!1,s=!1;for(let i=0;i<n.length;++i){const o=n[i];switch(o[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(o.substring(1)||" "),t=!0,s=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class So{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,o)=>{const r=de(t);o?this.warnings.push(new eo(r,s,i)):this.errors.push(new he(r,s,i))},this.directives=new D({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=Ct(this.prelude);if(s){const o=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!o)e.commentBefore=s;else if(C(o)&&!o.flow&&o.items.length>0){let r=o.items[0];P(r)&&(r=r.key);const a=r.commentBefore;r.commentBefore=a?`${s}
${a}`:s}else{const r=o.commentBefore;o.commentBefore=r?`${s}
${r}`:s}}if(t){for(let o=0;o<this.errors.length;++o)e.errors.push(this.errors[o]);for(let o=0;o<this.warnings.length;++o)e.warnings.push(this.warnings[o])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ct(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const o=de(e);o[0]+=t,this.onError(o,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=vo(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new he(de(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new he(de(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=ve(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new he(de(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Ke(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const fn="\uFEFF",hn="",pn="",st="";function _o(n){switch(n){case fn:return"byte-order-mark";case hn:return"doc-mode";case pn:return"flow-error-end";case st:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function $(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const It=new Set("0123456789ABCDEFabcdef"),To=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ae=new Set(",[]{}"),Ao=new Set(` ,[]{}
\r	`),Ye=n=>!n||Ao.has(n);class Oo{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&$(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===fn&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const o=e[s-1];if(o===" "||o==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const o=e[t-1];if(o===" "||o==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield hn,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&$(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!$(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&$(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Ye),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&$(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield pn,yield*this.parseLineStart();let o=0;for(;i[o]===",";)o+=yield*this.pushCount(1),o+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(o+=yield*this.pushIndicators(),i[o]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-o),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Ye),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||$(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let o=0;for(;this.buffer[t-1-o]==="\\";)o+=1;if(o%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const o=this.continueScalar(i+1);if(o===-1)break;i=s.indexOf(`
`,o)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>$(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let o=this.pos;s=this.buffer[o];++o)switch(s){case" ":t+=1;break;case`
`:e=o,t=0;break;case"\r":{const r=this.buffer[o+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const o=this.continueScalar(e+1);if(o===-1)break;e=this.buffer.indexOf(`
`,o)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let o=e-1,r=this.buffer[o];r==="\r"&&(r=this.buffer[--o]);const a=o;for(;r===" ";)r=this.buffer[--o];if(r===`
`&&o>=this.pos&&o+1+t>a)e=o;else break}while(!0);return yield st,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const o=this.buffer[s+1];if($(o)||e&&Ae.has(o))break;t=s}else if($(i)){let o=this.buffer[s+1];if(i==="\r"&&(o===`
`?(s+=1,i=`
`,o=this.buffer[s+1]):t=s),o==="#"||e&&Ae.has(o))break;if(i===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Ae.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield st,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(Ye),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,s=this.charAt(1);if($(s)||t&&Ae.has(s)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!$(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(To.has(t))t=this.buffer[++e];else if(t==="%"&&It.has(this.buffer[e+1])&&It.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class Co{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const o=t+s>>1;this.lineStarts[o]<e?t=o+1:s=o}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function q(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Pt(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function gn(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Oe(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Q(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function Le(n,e){if(e.length<1e5)Array.prototype.push.apply(n,e);else for(let t=0;t<e.length;++t)n.push(e[t])}function Nt(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!q(e.start,"explicit-key-ind")&&!q(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,gn(e.value)?e.value.end?Le(e.value.end,e.sep):e.value.end=e.sep:Le(e.start,e.sep),delete e.sep)}class Io{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new Oo,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=_o(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Nt(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Pt(i.start)===-1&&(t.indent===0||i.start.every(o=>o.type!=="comment"||o.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Pt(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Oe(this.peek(2)),s=Q(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Le(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,i=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let o=[];if(i&&t.sep&&!t.value){const r=[];for(let a=0;a<t.sep.length;++a){const l=t.sep[a];switch(l.type){case"newline":r.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(r.length=0);break;default:r.length=0}}r.length>=2&&(o=t.sep.splice(r[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(o.push(this.sourceToken),e.items.push({start:o}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(o.push(this.sourceToken),e.items.push({start:o,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(q(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]});else if(gn(t.key)&&!q(t.sep,"newline")){const r=Q(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:a,sep:l}]})}else o.length>0?t.sep=t.sep.concat(o,this.sourceToken):t.sep.push(this.sourceToken);else if(q(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const r=Q(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:o,key:null,sep:[this.sourceToken]}):q(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const r=this.flowScalar(this.type);i||t.value?(e.items.push({start:o,key:r,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(r):(Object.assign(t,{key:r,sep:[]}),this.onKeyLine=!0);return}default:{const r=this.startBlockValue(e);if(r){if(r.type==="block-seq"){if(!t.explicitKey&&t.sep&&!q(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:o});this.stack.push(r);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Le(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||q(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while(s?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Oe(s),o=Q(i);Nt(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:o,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Oe(e),s=Q(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Oe(e),s=Q(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function Po(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new Co||null,prettyErrors:e}}function No(n,e={}){const{lineCounter:t,prettyErrors:s}=Po(e),i=new Io(t?.addNewLine),o=new So(e);let r=null;for(const a of o.compose(i.parse(n),!0,n.length))if(!r)r=a;else if(r.options.logLevel!=="silent"){r.errors.push(new he(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(At(n,t)),r.warnings.forEach(At(n,t))),r}function Eo(n,e,t){let s;const i=No(n,t);if(!i)return null;if(i.warnings.forEach(o=>Rt(i.options.logLevel,o)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}function Do(n){const e=n.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!e)return{data:Object.create(null),content:n};const t=e[1],s=e[2];try{const i=Eo(t),o=Object.create(null);return i&&typeof i=="object"&&Object.assign(o,i),{data:o,content:s}}catch(i){return console.error("Error parsing frontmatter:",i),{data:Object.create(null),content:s}}}const Ce={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":bn,"/content/posts/2026-04-18-financial-literacy-dancers.md":kn,"/content/posts/2026-04-18-github-actions.md":Sn,"/content/posts/2026-04-18-halloween-costumes.md":Tn,"/content/posts/2026-04-18-make-shoe-dance.md":On,"/content/posts/2026-04-18-why-finals-are-hard.md":In,"/content/posts/2026-04-19-gear-essentials.md":Nn,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":Dn,"/content/posts/2026-06-01-event-travel-packing.md":Ln,"/content/posts/2026-06-01-general-health-home-care.md":Mn,"/content/posts/2026-06-01-outdoor-dancing.md":xn,"/content/posts/2026-06-01-power-charging.md":Rn,"/content/posts/2026-06-01-practice-review-tech.md":zn,"/content/posts/2026-06-01-practice-social-dance-apparel.md":Kn,"/content/posts/2026-06-01-shoe-care-modification.md":Gn,"/content/posts/2026-06-01-theme-wear-costumes-accessories.md":Vn,"/content/posts/2026-06-01-wcs-essentials.md":Yn}),blog:Object.assign({"/content/blog/2026-06-14-the-story-behind-the-merch-page.md":Xn}),resources:Object.assign({"/content/resources/2023-10-01-loop-earplugs.md":es,"/content/resources/2023-11-01-travel-steamer.md":ns,"/content/resources/2024-01-01-portable-speaker.md":is,"/content/resources/2024-06-01-alien-mask.md":rs,"/content/resources/2024-06-01-charging-cables.md":ls,"/content/resources/2024-06-01-compression-cubes.md":us,"/content/resources/2024-06-01-crop-tops.md":fs,"/content/resources/2024-06-01-fishnet-tights.md":ps,"/content/resources/2024-06-01-foam-roller.md":ms,"/content/resources/2024-06-01-green-bodysuit.md":bs,"/content/resources/2024-06-01-light-up-suspenders.md":ks,"/content/resources/2024-06-01-love-neon-follow-shirt.md":Ss,"/content/resources/2024-06-01-love-neon-lead-shirt.md":Ts,"/content/resources/2024-06-01-love-neon-switch-shirt.md":Os,"/content/resources/2024-06-01-love-unisex-shirt.md":Is,"/content/resources/2024-06-01-mesh-fishnet-top.md":Ns,"/content/resources/2024-06-01-nerd-set.md":Ds,"/content/resources/2024-06-01-norcal-bear-tank.md":Ls,"/content/resources/2024-06-01-norcal-bestcal-tshirt.md":Ms,"/content/resources/2024-06-01-norcal-crop-top.md":xs,"/content/resources/2024-06-01-norcal-gate-crop-hoodie.md":Rs,"/content/resources/2024-06-01-norcal-pride-bear-shirt.md":zs,"/content/resources/2024-06-01-norcal-pride-gate-shirt.md":Ks,"/content/resources/2024-06-01-portable-charger.md":Gs,"/content/resources/2024-06-01-pumpkin-headbands.md":Vs,"/content/resources/2024-06-01-pumpkin-stickers.md":Ys,"/content/resources/2024-06-01-rave-fan.md":Xs,"/content/resources/2024-06-01-reflective-crop-tops.md":ei,"/content/resources/2024-06-01-running-belt.md":ni,"/content/resources/2024-06-01-shoe-dryer.md":ii,"/content/resources/2024-06-01-sunscreen.md":ri,"/content/resources/2024-06-01-travel-bottles.md":li,"/content/resources/2024-06-01-tripod.md":ui,"/content/resources/2024-06-01-visor.md":fi,"/content/resources/2024-06-01-war-eagle-shirt.md":pi,"/content/resources/2026-04-12-suede-shoe-diy.md":mi}),studies:Object.assign({"/content/studies/ai-devops-pipeline.md":bi,"/content/studies/wcs-scraper-initial-sync.md":ki})},jo=n=>n.split("/").pop()?.replace(".md","")||"";function Lo(n){if(typeof n!="string")return;const e=n.toLowerCase();return["published","draft","planned"].includes(e)?e:void 0}function Bo(n){if(typeof n=="number")return n;if(typeof n=="string"){const e=parseInt(n.replace(/[^\d]/g,""),10);return isNaN(e)?void 0:e}}function $o(n){if(!(n===""||n===void 0||n===null))return typeof n!="string"?n:n.startsWith("/")&&!n.startsWith(Qe)?`${Qe}${n}`:n}function Ie(n,e){const t=s=>Array.isArray(s)?s:[];return Object.entries(n).map(([s,i])=>{const o=typeof i=="string"?i:i.default,{data:r,content:a}=Do(o),l=r.type||e,c=u=>{if(u!=="")return typeof u=="string"&&u.startsWith("/")?`${Qe}${u}`:u};return r.image=c(r.image),r.imageBack=c(r.imageBack),{...r,type:l,title:String(r.title||"Untitled"),category:String(r.category||"General"),excerpt:String(r.excerpt||""),date:String(r.date||""),author:String(r.author||""),tags:t(r.tags),affiliateIds:t(r.affiliateIds),internalSku:r.internalSku?String(r.internalSku):r.sku?String(r.sku):void 0,priceCategory:r.priceCategory?String(r.priceCategory):void 0,seoTitle:r.seoTitle?String(r.seoTitle):void 0,seoDescription:r.seoDescription?String(r.seoDescription):void 0,imageAlt:r.imageAlt?String(r.imageAlt):void 0,productType:r.productType?String(r.productType):void 0,fulfillmentType:r.fulfillmentType?String(r.fulfillmentType):void 0,provider:r.provider?String(r.provider):void 0,shippingPolicySummary:r.shippingPolicySummary?String(r.shippingPolicySummary):void 0,returnPolicySummary:r.returnPolicySummary?String(r.returnPolicySummary):void 0,affiliateProvider:r.affiliateProvider?String(r.affiliateProvider):void 0,affiliateDisclosure:r.affiliateDisclosure?String(r.affiliateDisclosure):void 0,priceDisplayPolicy:r.priceDisplayPolicy?String(r.priceDisplayPolicy):void 0,availabilityDisplayPolicy:r.availabilityDisplayPolicy?String(r.availabilityDisplayPolicy):void 0,recommendedFor:t(r.recommendedFor),printfulProductId:r.printfulProductId?String(r.printfulProductId):void 0,printfulVariantIds:t(r.printfulVariantIds),status:Lo(r.status),readTime:Bo(r.readTime),content:a||"",slug:jo(s)}}).filter(s=>s.draft?s.type==="study"&&(s.status==="planned"||s.status==="draft"):!0).sort((s,i)=>{const o=s.date?new Date(s.date).getTime():0,r=i.date?new Date(i.date).getTime():0,a=Number.isNaN(o)?0:o;return(Number.isNaN(r)?0:r)-a})}const se={posts:[...Ie(Ce.posts,"post"),...Ie(Ce.blog,"blog")],resources:Ie(Ce.resources,"resource"),studies:Ie(Ce.studies,"study")},mn={posts:new Map(se.posts.map(n=>[n.slug,n])),resources:new Map(se.resources.map(n=>[n.slug,n])),studies:new Map(se.studies.map(n=>[n.slug,n]))},xo=()=>se.posts.sort((n,e)=>{const t=n.date?new Date(n.date).getTime():0;return(e.date?new Date(e.date).getTime():0)-t}),Fo=()=>se.resources,Ro=()=>se.studies,Uo=n=>mn.posts.get(n),zo=n=>mn.resources.get(n),qo=(n,e)=>{if(n&&n.trim().length>0)return Math.max(1,Math.round(n.split(/\s+/).length/200));const t=e?.split(/\s+/).length??0;return Math.max(1,Math.round(t/20))};export{Uo as a,Fo as b,zo as c,Ro as d,xo as g,$o as n,qo as r};
