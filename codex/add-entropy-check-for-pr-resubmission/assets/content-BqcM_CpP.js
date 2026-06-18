import{A as Ye}from"./index-CldUvaRe.js";const gn=`---
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
`,yn=Object.freeze(Object.defineProperty({__proto__:null,default:gn},Symbol.toStringTag,{value:"Module"})),bn=`---
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
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Costumes"
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

`,Tn=Object.freeze(Object.defineProperty({__proto__:null,default:Sn},Symbol.toStringTag,{value:"Module"})),_n=`---
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
`,An=Object.freeze(Object.defineProperty({__proto__:null,default:_n},Symbol.toStringTag,{value:"Module"})),In=`---
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
`,On=Object.freeze(Object.defineProperty({__proto__:null,default:In},Symbol.toStringTag,{value:"Module"})),Cn=`---
type: post
title: "The WCS Travel Pack"
date: "2026-04-19"
updated: "2026-05-29"
excerpt: "A practical packing checklist for West Coast Swing weekends, covering shoes, earplugs, layers, recovery, hygiene, and travel tech."
category: "Travel"
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
`,Nn=Object.freeze(Object.defineProperty({__proto__:null,default:Cn},Symbol.toStringTag,{value:"Module"})),En=`---
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
`,Ln=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"})),Pn=`---
type: post
title: "Event Travel & Packing"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Travel"
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


### Travel-Sized Essentials
Silicone travel bottles are leak-proof and TSA-approved, making it easy to bring your favorite shampoos and lotions without worry.

<notice type="affiliate" id="travel-bottles" />

### Wrinkle-Free Outfits
Don't let suitcase wrinkles ruin your competition look. A portable garment steamer is small enough to fit in your bag and powerful enough to freshen up your shirts and dresses in minutes.

<notice type="affiliate" id="portable-steamer" />

### Steaming vs. Folding
| Care Method | Best For | Considerations |
| :--- | :--- | :--- |
| **Steaming** | Delicate fabrics, competition wear | Requires bringing a portable steamer |
| **Folding** | Practice wear, casual outfits | Use compression cubes to minimize wrinkles |
`,jn=Object.freeze(Object.defineProperty({__proto__:null,default:Pn},Symbol.toStringTag,{value:"Module"})),Bn=`---
type: post
title: "General Health & Home Care for Dancers"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Health"
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

`,Dn=Object.freeze(Object.defineProperty({__proto__:null,default:Bn},Symbol.toStringTag,{value:"Module"})),Mn=`---
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

![Slim Running Belt](/images/gear/amazon/ushake-slim-running-belt-ultra-light-bounce-free-waist-pouch-fitness-w.jpg)

### Keep Your Valuables Safe
A slim fanny pack or running belt is perfect for keeping your phone, keys, and cash secure without adding bulk or restricting your movement.


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
`,Fn=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),qn=`---
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
`,Un=Object.freeze(Object.defineProperty({__proto__:null,default:qn},Symbol.toStringTag,{value:"Module"})),Kn=`---
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
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:Kn},Symbol.toStringTag,{value:"Module"})),Wn=`---
type: post
title: "Shoe Care & Modification"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Products focused on modifying, drying, and preserving dance footwear."
image: "/images/gear/sketches/shoe-dryer-and-deodorizer-enhanced-deodorising-boot-dryer-with-timer-s.webp"
affiliateIds:
  - "suede-sheets"
  - "shoe-dryer"
tags:
  - "shoes"
  - "diy"
  - "maintenance"
---

Your shoes are your most important piece of equipment. Taking care of them (and modifying them to fit your needs) can save you money and improve your dancing.

![Suede Stick-on Sheets](/images/gear/amazon/suede-stick-on-sheets.jpg)

### DIY Dance Shoes
Not every comfortable shoe comes with a dance-ready sole. Adhesive suede sheets allow you to turn your favorite sneakers into high-performance dance shoes with just a pair of scissors.


### Fresh and Dry
Sweaty shoes are not only unpleasant but also deteriorate faster. An electric shoe dryer and deodorizer is a game-changer for multi-day events, ensuring your shoes are dry and fresh every morning.

<notice type="affiliate" id="shoe-dryer" />
`,Hn=Object.freeze(Object.defineProperty({__proto__:null,default:Wn},Symbol.toStringTag,{value:"Module"})),Gn=`---
type: post
title: "Theme Wear, Costumes & Accessories"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Costumes"
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
![Green Bodysuit](/images/gear/sketches/green-bodysuit.webp)
![Alien Mask](/images/gear/sketches/alien-mask.webp)

Commit to the alien look with a full-body spandex suit and a latex mask.

<notice type="affiliate" id="alien-mask" />


### Glow & Nerd Nights
Light up the dance floor with LED suspenders, or go for the classic nerd look with a pre-assembled set.

<notice type="affiliate" id="light-up-suspenders" />
<notice type="affiliate" id="nerd-set" />

### Halloween Fun
Quick and easy pumpkin costumes are perfect for social dancing. A headband and some adhesive felt stickers are all you need to be festive in seconds.

<notice type="affiliate" id="pumpkin-headbands" />
<notice type="affiliate" id="pumpkin-stickers" />
`,Vn=Object.freeze(Object.defineProperty({__proto__:null,default:Gn},Symbol.toStringTag,{value:"Module"})),Jn=`---
type: post
title: "WCS Essentials (Local & Travel)"
date: "2026-06-01"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "High-priority essentials to bring to any West Coast Swing event, whether local or out-of-town."
image: "/images/gear/sketches/loop-earplugs.webp"
affiliateIds:
  - "rave-fan"
  - "loop-experience"
tags:
  - "essentials"
  - "gear"
  - "wcs"
---

Whether you're heading to a local social or traveling across the country for a convention, these items are high-priority essentials for any West Coast Swing dancer.

![Gear Essentials Layout](/images/gear/sketches/zolee-large-rave-folding-hand-fan-with-bamboo-ribs-for-men-women-chine.webp)

### Stay Cool on the Floor
Crowded dance floors can get incredibly hot. A large folding fan is the most effective way to cool yourself down (and your partners!) between songs.


### Protect Your Hearing
Ballroom sound systems are often cranked up to high volumes. To enjoy the music without the ringing in your ears the next morning, high-fidelity earplugs are a must. They lower the decibels while preserving the clarity of the music and conversation.

<notice type="affiliate" id="loop-experience" />

### Last Minute Checklist
* Extra socks
* Blister kit / bandaids
* Mints or gum
* Deodorant
* Refillable water bottle
`,zn=Object.freeze(Object.defineProperty({__proto__:null,default:Jn},Symbol.toStringTag,{value:"Module"})),Yn=`---
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
`,Qn=Object.freeze(Object.defineProperty({__proto__:null,default:Yn},Symbol.toStringTag,{value:"Module"})),Xn=`---
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
`,Zn=Object.freeze(Object.defineProperty({__proto__:null,default:Xn},Symbol.toStringTag,{value:"Module"})),es=`---
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
`,ts=Object.freeze(Object.defineProperty({__proto__:null,default:es},Symbol.toStringTag,{value:"Module"})),st=Symbol.for("yaml.alias"),Qe=Symbol.for("yaml.document"),W=Symbol.for("yaml.map"),Lt=Symbol.for("yaml.pair"),F=Symbol.for("yaml.scalar"),oe=Symbol.for("yaml.seq"),M=Symbol.for("yaml.node.type"),ae=n=>!!n&&typeof n=="object"&&n[M]===st,je=n=>!!n&&typeof n=="object"&&n[M]===Qe,ye=n=>!!n&&typeof n=="object"&&n[M]===W,N=n=>!!n&&typeof n=="object"&&n[M]===Lt,I=n=>!!n&&typeof n=="object"&&n[M]===F,be=n=>!!n&&typeof n=="object"&&n[M]===oe;function O(n){if(n&&typeof n=="object")switch(n[M]){case W:case oe:return!0}return!1}function C(n){if(n&&typeof n=="object")switch(n[M]){case st:case W:case F:case oe:return!0}return!1}const Pt=n=>(I(n)||O(n))&&!!n.anchor,H=Symbol("break visit"),ns=Symbol("skip children"),de=Symbol("remove node");function re(n,e){const t=ss(e);je(n)?X(null,n.contents,t,Object.freeze([n]))===de&&(n.contents=null):X(null,n,t,Object.freeze([]))}re.BREAK=H;re.SKIP=ns;re.REMOVE=de;function X(n,e,t,s){const i=is(n,e,t,s);if(C(i)||N(i))return os(n,s,i),X(n,i,t,s);if(typeof i!="symbol"){if(O(e)){s=Object.freeze(s.concat(e));for(let o=0;o<e.items.length;++o){const a=X(o,e.items[o],t,s);if(typeof a=="number")o=a-1;else{if(a===H)return H;a===de&&(e.items.splice(o,1),o-=1)}}}else if(N(e)){s=Object.freeze(s.concat(e));const o=X("key",e.key,t,s);if(o===H)return H;o===de&&(e.key=null);const a=X("value",e.value,t,s);if(a===H)return H;a===de&&(e.value=null)}}return i}function ss(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function is(n,e,t,s){if(typeof t=="function")return t(n,e,s);if(ye(e))return t.Map?.(n,e,s);if(be(e))return t.Seq?.(n,e,s);if(N(e))return t.Pair?.(n,e,s);if(I(e))return t.Scalar?.(n,e,s);if(ae(e))return t.Alias?.(n,e,s)}function os(n,e,t){const s=e[e.length-1];if(O(s))s.items[n]=t;else if(N(s))n==="key"?s.key=t:s.value=t;else if(je(s))s.contents=t;else{const i=ae(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${i} parent`)}}const as={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},rs=n=>n.replace(/[!,[\]{}]/g,e=>as[e]);class P{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},P.defaultYaml,e),this.tags=Object.assign({},P.defaultTags,t)}clone(){const e=new P(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new P(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:P.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},P.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:P.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},P.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),i=s.shift();switch(i){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[o,a]=s;return this.tags[o]=a,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[o]=s;if(o==="1.1"||o==="1.2")return this.yaml.version=o,!0;{const a=/^\d+\.\d+$/.test(o);return t(6,`Unsupported YAML version ${o}`,a),!1}}default:return t(0,`Unknown directive ${i}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const a=e.slice(2,-1);return a==="!"||a==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),a)}const[,s,i]=e.match(/^(.*!)([^!]*)$/s);i||t(`The ${e} tag has no suffix`);const o=this.tags[s];if(o)try{return o+decodeURIComponent(i)}catch(a){return t(String(a)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+rs(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let i;if(e&&s.length>0&&C(e.contents)){const o={};re(e.contents,(a,r)=>{C(r)&&r.tag&&(o[r.tag]=!0)}),i=Object.keys(o)}else i=[];for(const[o,a]of s)o==="!!"&&a==="tag:yaml.org,2002:"||(!e||i.some(r=>r.startsWith(a)))&&t.push(`%TAG ${o} ${a}`);return t.join(`
`)}}P.defaultYaml={explicit:!1,version:"1.2"};P.defaultTags={"!!":"tag:yaml.org,2002:"};function jt(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Bt(n){const e=new Set;return re(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Dt(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function ls(n,e){const t=[],s=new Map;let i=null;return{onAnchor:o=>{t.push(o),i??(i=Bt(n));const a=Dt(e,i);return i.add(a),a},setAnchors:()=>{for(const o of t){const a=s.get(o);if(typeof a=="object"&&a.anchor&&(I(a.node)||O(a.node)))a.node.anchor=a.anchor;else{const r=new Error("Failed to resolve repeated object (this should not happen)");throw r.source=o,r}}},sourceObjects:s}}function Z(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let i=0,o=s.length;i<o;++i){const a=s[i],r=Z(n,s,String(i),a);r===void 0?delete s[i]:r!==a&&(s[i]=r)}else if(s instanceof Map)for(const i of Array.from(s.keys())){const o=s.get(i),a=Z(n,s,i,o);a===void 0?s.delete(i):a!==o&&s.set(i,a)}else if(s instanceof Set)for(const i of Array.from(s)){const o=Z(n,s,i,i);o===void 0?s.delete(i):o!==i&&(s.delete(i),s.add(o))}else for(const[i,o]of Object.entries(s)){const a=Z(n,s,i,o);a===void 0?delete s[i]:a!==o&&(s[i]=a)}return n.call(e,t,s)}function D(n,e,t){if(Array.isArray(n))return n.map((s,i)=>D(s,String(i),t));if(n&&typeof n.toJSON=="function"){if(!t||!Pt(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=o=>{s.res=o,delete t.onCreate};const i=n.toJSON(e,t);return t.onCreate&&t.onCreate(i),i}return typeof n=="bigint"&&!t?.keep?Number(n):n}class it{constructor(e){Object.defineProperty(this,M,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:i,reviver:o}={}){if(!je(e))throw new TypeError("A document argument is required");const a={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},r=D(this,"",a);if(typeof i=="function")for(const{count:l,res:c}of a.anchors.values())i(c,l);return typeof o=="function"?Z(o,{"":r},"",r):r}}class ot extends it{constructor(e){super(st),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError("Alias resolution is disabled");let s;t?.aliasResolveCache?s=t.aliasResolveCache:(s=[],re(e,{Node:(o,a)=>{(ae(a)||Pt(a))&&s.push(a)}}),t&&(t.aliasResolveCache=s));let i;for(const o of s){if(o===this)break;o.anchor===this.source&&(i=o)}return i}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:i,maxAliasCount:o}=t,a=this.resolve(i,t);if(!a){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let r=s.get(a);if(r||(D(a,null,t),r=s.get(a)),r?.res===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(o>=0&&(r.count+=1,r.aliasCount===0&&(r.aliasCount=Ie(i,a,s)),r.count*r.aliasCount>o)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return r.res}toString(e,t,s){const i=`*${this.source}`;if(e){if(jt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const o=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(o)}if(e.implicitKey)return`${i} `}return i}}function Ie(n,e,t){if(ae(e)){const s=e.resolve(n),i=t&&s&&t.get(s);return i?i.count*i.aliasCount:0}else if(O(e)){let s=0;for(const i of e.items){const o=Ie(n,i,t);o>s&&(s=o)}return s}else if(N(e)){const s=Ie(n,e.key,t),i=Ie(n,e.value,t);return Math.max(s,i)}return 1}const Mt=n=>!n||typeof n!="function"&&typeof n!="object";class T extends it{constructor(e){super(F),this.value=e}toJSON(e,t){return t?.keep?this.value:D(this.value,e,t)}toString(){return String(this.value)}}T.BLOCK_FOLDED="BLOCK_FOLDED";T.BLOCK_LITERAL="BLOCK_LITERAL";T.PLAIN="PLAIN";T.QUOTE_DOUBLE="QUOTE_DOUBLE";T.QUOTE_SINGLE="QUOTE_SINGLE";const cs="tag:yaml.org,2002:";function us(n,e,t){if(e){const s=t.filter(o=>o.tag===e),i=s.find(o=>!o.format)??s[0];if(!i)throw new Error(`Tag ${e} not found`);return i}return t.find(s=>s.identify?.(n)&&!s.format)}function me(n,e,t){if(je(n)&&(n=n.contents),C(n))return n;if(N(n)){const u=t.schema[W].createNode?.(t.schema,null,t);return u.items.push(n),u}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:i,onTagObj:o,schema:a,sourceObjects:r}=t;let l;if(s&&n&&typeof n=="object"){if(l=r.get(n),l)return l.anchor??(l.anchor=i(n)),new ot(l.anchor);l={anchor:null,node:null},r.set(n,l)}e?.startsWith("!!")&&(e=cs+e.slice(2));let c=us(n,e,a.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const u=new T(n);return l&&(l.node=u),u}c=n instanceof Map?a[W]:Symbol.iterator in Object(n)?a[oe]:a[W]}o&&(o(c),delete t.onTagObj);const d=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new T(n);return e?d.tag=e:c.default||(d.tag=c.tag),l&&(l.node=d),d}function Ne(n,e,t){let s=t;for(let i=e.length-1;i>=0;--i){const o=e[i];if(typeof o=="number"&&Number.isInteger(o)&&o>=0){const a=[];a[o]=s,s=a}else s=new Map([[o,s]])}return me(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const he=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class $t extends it{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>C(s)||N(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(he(e))this.add(t);else{const[s,...i]=e,o=this.get(s,!0);if(O(o))o.addIn(i,t);else if(o===void 0&&this.schema)this.set(s,Ne(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const i=this.get(t,!0);if(O(i))return i.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...i]=e,o=this.get(s,!0);return i.length===0?!t&&I(o)?o.value:o:O(o)?o.getIn(i,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!N(t))return!1;const s=t.value;return s==null||e&&I(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const i=this.get(t,!0);return O(i)?i.hasIn(s):!1}setIn(e,t){const[s,...i]=e;if(i.length===0)this.set(s,t);else{const o=this.get(s,!0);if(O(o))o.setIn(i,t);else if(o===void 0&&this.schema)this.set(s,Ne(this.schema,i,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`)}}}const hs=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function q(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const G=(n,e,t)=>n.endsWith(`
`)?q(t,e):t.includes(`
`)?`
`+q(t,e):(n.endsWith(" ")?"":" ")+t,Rt="flow",Xe="block",Oe="quoted";function Be(n,e,t="flow",{indentAtStart:s,lineWidth:i=80,minContentWidth:o=20,onFold:a,onOverflow:r}={}){if(!i||i<0)return n;i<o&&(o=0);const l=Math.max(1+o,1+i-e.length);if(n.length<=l)return n;const c=[],d={};let u=i-e.length;typeof s=="number"&&(s>i-Math.max(2,o)?c.push(0):u=i-s);let h,m,g=!1,f=-1,p=-1,b=-1;t===Xe&&(f=wt(n,f,e.length),f!==-1&&(u=f+l));for(let k;k=n[f+=1];){if(t===Oe&&k==="\\"){switch(p=f,n[f+1]){case"x":f+=3;break;case"u":f+=5;break;case"U":f+=9;break;default:f+=1}b=f}if(k===`
`)t===Xe&&(f=wt(n,f,e.length)),u=f+e.length+l,h=void 0;else{if(k===" "&&m&&m!==" "&&m!==`
`&&m!=="	"){const v=n[f+1];v&&v!==" "&&v!==`
`&&v!=="	"&&(h=f)}if(f>=u)if(h)c.push(h),u=h+l,h=void 0;else if(t===Oe){for(;m===" "||m==="	";)m=k,k=n[f+=1],g=!0;const v=f>b+1?f-2:p-1;if(d[v])return n;c.push(v),d[v]=!0,u=v+l,h=void 0}else g=!0}m=k}if(g&&r&&r(),c.length===0)return n;a&&a();let w=n.slice(0,c[0]);for(let k=0;k<c.length;++k){const v=c[k],S=c[k+1]||n.length;v===0?w=`
${e}${n.slice(0,S)}`:(t===Oe&&d[v]&&(w+=`${n[v]}\\`),w+=`
${e}${n.slice(v+1,S)}`)}return w}function wt(n,e,t){let s=e,i=e+1,o=n[i];for(;o===" "||o==="	";)if(e<i+t)o=n[++e];else{do o=n[++e];while(o&&o!==`
`);s=e,i=e+1,o=n[i]}return s}const De=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),Me=n=>/^(%|---|\.\.\.)/m.test(n);function fs(n,e,t){if(!e||e<0)return!1;const s=e-t,i=n.length;if(i<=s)return!1;for(let o=0,a=0;o<i;++o)if(n[o]===`
`){if(o-a>s)return!0;if(a=o+1,i-a<=s)return!1}return!0}function pe(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,i=e.options.doubleQuotedMinMultiLineLength,o=e.indent||(Me(n)?"  ":"");let a="",r=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(a+=t.slice(r,l)+"\\ ",l+=1,r=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{a+=t.slice(r,l);const d=t.substr(l+2,4);switch(d){case"0000":a+="\\0";break;case"0007":a+="\\a";break;case"000b":a+="\\v";break;case"001b":a+="\\e";break;case"0085":a+="\\N";break;case"00a0":a+="\\_";break;case"2028":a+="\\L";break;case"2029":a+="\\P";break;default:d.substr(0,2)==="00"?a+="\\x"+d.substr(2):a+=t.substr(l,6)}l+=5,r=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<i)l+=1;else{for(a+=t.slice(r,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)a+=`
`,l+=2;a+=o,t[l+2]===" "&&(a+="\\"),l+=1,r=l+1}break;default:l+=1}return a=r?a+t.slice(r):t,s?a:Be(a,o,Oe,De(e,!1))}function Ze(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return pe(n,e);const t=e.indent||(Me(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Be(s,t,Rt,De(e,!1))}function ee(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=pe;else{const i=n.includes('"'),o=n.includes("'");i&&!o?s=Ze:o&&!i?s=pe:s=t?Ze:pe}return s(n,e)}let et;try{et=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{et=/\n+(?!\n|$)/g}function Ce({comment:n,type:e,value:t},s,i,o){const{blockQuote:a,commentString:r,lineWidth:l}=s.options;if(!a||/\n[\t ]+$/.test(t))return ee(t,s);const c=s.indent||(s.forceBlockIndent||Me(t)?"  ":""),d=a==="literal"?!0:a==="folded"||e===T.BLOCK_FOLDED?!1:e===T.BLOCK_LITERAL?!0:!fs(t,l,c.length);if(!t)return d?`|
`:`>
`;let u,h;for(h=t.length;h>0;--h){const S=t[h-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let m=t.substring(h);const g=m.indexOf(`
`);g===-1?u="-":t===m||g!==m.length-1?(u="+",o&&o()):u="",m&&(t=t.slice(0,-m.length),m[m.length-1]===`
`&&(m=m.slice(0,-1)),m=m.replace(et,`$&${c}`));let f=!1,p,b=-1;for(p=0;p<t.length;++p){const S=t[p];if(S===" ")f=!0;else if(S===`
`)b=p;else break}let w=t.substring(0,b<p?b+1:p);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let v=(f?c?"2":"1":"")+u;if(n&&(v+=" "+r(n.replace(/ ?[\r\n]+/g," ")),i&&i()),!d){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let _=!1;const A=De(s,!0);a!=="folded"&&e!==T.BLOCK_FOLDED&&(A.onOverflow=()=>{_=!0});const y=Be(`${w}${S}${m}`,c,Xe,A);if(!_)return`>${v}
${c}${y}`}return t=t.replace(/\n+/g,`$&${c}`),`|${v}
${c}${w}${t}${m}`}function ds(n,e,t,s){const{type:i,value:o}=n,{actualString:a,implicitKey:r,indent:l,indentStep:c,inFlow:d}=e;if(r&&o.includes(`
`)||d&&/[[\]{},]/.test(o))return ee(o,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(o))return r||d||!o.includes(`
`)?ee(o,e):Ce(n,e,t,s);if(!r&&!d&&i!==T.PLAIN&&o.includes(`
`))return Ce(n,e,t,s);if(Me(o)){if(l==="")return e.forceBlockIndent=!0,Ce(n,e,t,s);if(r&&l===c)return ee(o,e)}const u=o.replace(/\n+/g,`$&
${l}`);if(a){const h=f=>f.default&&f.tag!=="tag:yaml.org,2002:str"&&f.test?.test(u),{compat:m,tags:g}=e.doc.schema;if(g.some(h)||m?.some(h))return ee(o,e)}return r?u:Be(u,l,Rt,De(e,!1))}function at(n,e,t,s){const{implicitKey:i,inFlow:o}=e,a=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:r}=n;r!==T.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(a.value)&&(r=T.QUOTE_DOUBLE);const l=d=>{switch(d){case T.BLOCK_FOLDED:case T.BLOCK_LITERAL:return i||o?ee(a.value,e):Ce(a,e,t,s);case T.QUOTE_DOUBLE:return pe(a.value,e);case T.QUOTE_SINGLE:return Ze(a.value,e);case T.PLAIN:return ds(a,e,t,s);default:return null}};let c=l(r);if(c===null){const{defaultKeyType:d,defaultStringType:u}=e.options,h=i&&d||u;if(c=l(h),c===null)throw new Error(`Unsupported default string type ${h}`)}return c}function Ft(n,e){const t=Object.assign({blockQuote:!0,commentString:hs,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function ps(n,e){if(e.tag){const i=n.filter(o=>o.tag===e.tag);if(i.length>0)return i.find(o=>o.format===e.format)??i[0]}let t,s;if(I(e)){s=e.value;let i=n.filter(o=>o.identify?.(s));if(i.length>1){const o=i.filter(a=>a.test);o.length>0&&(i=o)}t=i.find(o=>o.format===e.format)??i.find(o=>!o.format)}else s=e,t=n.find(i=>i.nodeClass&&s instanceof i.nodeClass);if(!t){const i=s?.constructor?.name??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${i} value`)}return t}function ms(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const i=[],o=(I(n)||O(n))&&n.anchor;o&&jt(o)&&(t.add(o),i.push(`&${o}`));const a=n.tag??(e.default?null:e.tag);return a&&i.push(s.directives.tagString(a)),i.join(" ")}function se(n,e,t,s){if(N(n))return n.toString(e,t,s);if(ae(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let i;const o=C(n)?n:e.doc.createNode(n,{onTagObj:l=>i=l});i??(i=ps(e.doc.schema.tags,o));const a=ms(o,i,e);a.length>0&&(e.indentAtStart=(e.indentAtStart??0)+a.length+1);const r=typeof i.stringify=="function"?i.stringify(o,e,t,s):I(o)?at(o,e,t,s):o.toString(e,t,s);return a?I(o)||r[0]==="{"||r[0]==="["?`${a} ${r}`:`${a}
${e.indent}${r}`:r}function gs({key:n,value:e},t,s,i){const{allNullValues:o,doc:a,indent:r,indentStep:l,options:{commentString:c,indentSeq:d,simpleKeys:u}}=t;let h=C(n)&&n.comment||null;if(u){if(h)throw new Error("With simple keys, key nodes cannot have comments");if(O(n)||!C(n)&&typeof n=="object"){const A="With simple keys, collection cannot be used as a key value";throw new Error(A)}}let m=!u&&(!n||h&&e==null&&!t.inFlow||O(n)||(I(n)?n.type===T.BLOCK_FOLDED||n.type===T.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!m&&(u||!o),indent:r+l});let g=!1,f=!1,p=se(n,t,()=>g=!0,()=>f=!0);if(!m&&!t.inFlow&&p.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");m=!0}if(t.inFlow){if(o||e==null)return g&&s&&s(),p===""?"?":m?`? ${p}`:p}else if(o&&!u||e==null&&m)return p=`? ${p}`,h&&!g?p+=G(p,t.indent,c(h)):f&&i&&i(),p;g&&(h=null),m?(h&&(p+=G(p,t.indent,c(h))),p=`? ${p}
${r}:`):(p=`${p}:`,h&&(p+=G(p,t.indent,c(h))));let b,w,k;C(e)?(b=!!e.spaceBefore,w=e.commentBefore,k=e.comment):(b=!1,w=null,k=null,e&&typeof e=="object"&&(e=a.createNode(e))),t.implicitKey=!1,!m&&!h&&I(e)&&(t.indentAtStart=p.length+1),f=!1,!d&&l.length>=2&&!t.inFlow&&!m&&be(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let v=!1;const S=se(e,t,()=>v=!0,()=>f=!0);let _=" ";if(h||b||w){if(_=b?`
`:"",w){const A=c(w);_+=`
${q(A,t.indent)}`}S===""&&!t.inFlow?_===`
`&&k&&(_=`

`):_+=`
${t.indent}`}else if(!m&&O(e)){const A=S[0],y=S.indexOf(`
`),E=y!==-1,K=t.inFlow??e.flow??e.items.length===0;if(E||!K){let z=!1;if(E&&(A==="&"||A==="!")){let L=S.indexOf(" ");A==="&"&&L!==-1&&L<y&&S[L+1]==="!"&&(L=S.indexOf(" ",L+1)),(L===-1||y<L)&&(z=!0)}z||(_=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(_="");return p+=_+S,t.inFlow?v&&s&&s():k&&!v?p+=G(p,t.indent,c(k)):f&&i&&i(),p}function qt(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const ve="<<",U={identify:n=>n===ve||typeof n=="symbol"&&n.description===ve,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new T(Symbol(ve)),{addToJSMap:Ut}),stringify:()=>ve},ys=(n,e)=>(U.identify(e)||I(e)&&(!e.type||e.type===T.PLAIN)&&U.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===U.tag&&t.default);function Ut(n,e,t){const s=Kt(n,t);if(be(s))for(const i of s.items)xe(n,e,i);else if(Array.isArray(s))for(const i of s)xe(n,e,i);else xe(n,e,s)}function xe(n,e,t){const s=Kt(n,t);if(!ye(s))throw new Error("Merge sources must be maps or map aliases");const i=s.toJSON(null,n,Map);for(const[o,a]of i)e instanceof Map?e.has(o)||e.set(o,a):e instanceof Set?e.add(o):Object.prototype.hasOwnProperty.call(e,o)||Object.defineProperty(e,o,{value:a,writable:!0,enumerable:!0,configurable:!0});return e}function Kt(n,e){return n&&ae(e)?e.resolve(n.doc,n):e}function xt(n,e,{key:t,value:s}){if(C(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(ys(n,t))Ut(n,e,s);else{const i=D(t,"",n);if(e instanceof Map)e.set(i,D(s,i,n));else if(e instanceof Set)e.add(i);else{const o=bs(t,i,n),a=D(s,o,n);o in e?Object.defineProperty(e,o,{value:a,writable:!0,enumerable:!0,configurable:!0}):e[o]=a}}return e}function bs(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(C(n)&&t?.doc){const s=Ft(t.doc,{});s.anchors=new Set;for(const o of t.anchors.keys())s.anchors.add(o.anchor);s.inFlow=!0,s.inStringifyKey=!0;const i=n.toString(s);if(!t.mapKeyWarned){let o=JSON.stringify(i);o.length>40&&(o=o.substring(0,36)+'..."'),qt(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${o}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return i}return JSON.stringify(e)}function rt(n,e,t){const s=me(n,void 0,t),i=me(e,void 0,t);return new j(s,i)}class j{constructor(e,t=null){Object.defineProperty(this,M,{value:Lt}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return C(t)&&(t=t.clone(e)),C(s)&&(s=s.clone(e)),new j(t,s)}toJSON(e,t){const s=t?.mapAsMap?new Map:{};return xt(t,s,this)}toString(e,t,s){return e?.doc?gs(this,e,t,s):JSON.stringify(this)}}function Wt(n,e,t){return(e.inFlow??n.flow?ks:ws)(n,e,t)}function ws({comment:n,items:e},t,{blockItemPrefix:s,flowChars:i,itemIndent:o,onChompKeep:a,onComment:r}){const{indent:l,options:{commentString:c}}=t,d=Object.assign({},t,{indent:o,type:null});let u=!1;const h=[];for(let g=0;g<e.length;++g){const f=e[g];let p=null;if(C(f))!u&&f.spaceBefore&&h.push(""),Ee(t,h,f.commentBefore,u),f.comment&&(p=f.comment);else if(N(f)){const w=C(f.key)?f.key:null;w&&(!u&&w.spaceBefore&&h.push(""),Ee(t,h,w.commentBefore,u))}u=!1;let b=se(f,d,()=>p=null,()=>u=!0);p&&(b+=G(b,o,c(p))),u&&p&&(u=!1),h.push(s+b)}let m;if(h.length===0)m=i.start+i.end;else{m=h[0];for(let g=1;g<h.length;++g){const f=h[g];m+=f?`
${l}${f}`:`
`}}return n?(m+=`
`+q(c(n),l),r&&r()):u&&a&&a(),m}function ks({items:n},e,{flowChars:t,itemIndent:s}){const{indent:i,indentStep:o,flowCollectionPadding:a,options:{commentString:r}}=e;s+=o;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,d=0;const u=[];for(let g=0;g<n.length;++g){const f=n[g];let p=null;if(C(f))f.spaceBefore&&u.push(""),Ee(e,u,f.commentBefore,!1),f.comment&&(p=f.comment);else if(N(f)){const w=C(f.key)?f.key:null;w&&(w.spaceBefore&&u.push(""),Ee(e,u,w.commentBefore,!1),w.comment&&(c=!0));const k=C(f.value)?f.value:null;k?(k.comment&&(p=k.comment),k.commentBefore&&(c=!0)):f.value==null&&w?.comment&&(p=w.comment)}p&&(c=!0);let b=se(f,l,()=>p=null);c||(c=u.length>d||b.includes(`
`)),g<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=u.reduce((w,k)=>w+k.length+2,2)+(b.length+2)>e.options.lineWidth)),c&&(b+=",")),p&&(b+=G(b,s,r(p))),u.push(b),d=u.length}const{start:h,end:m}=t;if(u.length===0)return h+m;if(!c){const g=u.reduce((f,p)=>f+p.length+2,2);c=e.options.lineWidth>0&&g>e.options.lineWidth}if(c){let g=h;for(const f of u)g+=f?`
${o}${i}${f}`:`
`;return`${g}
${i}${m}`}else return`${h}${a}${u.join(" ")}${a}${m}`}function Ee({indent:n,options:{commentString:e}},t,s,i){if(s&&i&&(s=s.replace(/^\n+/,"")),s){const o=q(e(s),n);t.push(o.trimStart())}}function V(n,e){const t=I(e)?e.value:e;for(const s of n)if(N(s)&&(s.key===e||s.key===t||I(s.key)&&s.key.value===t))return s}class B extends $t{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(W,e),this.items=[]}static from(e,t,s){const{keepUndefined:i,replacer:o}=s,a=new this(e),r=(l,c)=>{if(typeof o=="function")c=o.call(t,l,c);else if(Array.isArray(o)&&!o.includes(l))return;(c!==void 0||i)&&a.items.push(rt(l,c,s))};if(t instanceof Map)for(const[l,c]of t)r(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))r(l,t[l]);return typeof e.sortMapEntries=="function"&&a.items.sort(e.sortMapEntries),a}add(e,t){let s;N(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new j(e,e?.value):s=new j(e.key,e.value);const i=V(this.items,s.key),o=this.schema?.sortMapEntries;if(i){if(!t)throw new Error(`Key ${s.key} already set`);I(i.value)&&Mt(s.value)?i.value.value=s.value:i.value=s.value}else if(o){const a=this.items.findIndex(r=>o(s,r)<0);a===-1?this.items.push(s):this.items.splice(a,0,s)}else this.items.push(s)}delete(e){const t=V(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const i=V(this.items,e)?.value;return(!t&&I(i)?i.value:i)??void 0}has(e){return!!V(this.items,e)}set(e,t){this.add(new j(e,t),!0)}toJSON(e,t,s){const i=s?new s:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(i);for(const o of this.items)xt(t,i,o);return i}toString(e,t,s){if(!e)return JSON.stringify(this);for(const i of this.items)if(!N(i))throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Wt(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const le={collection:"map",default:!0,nodeClass:B,tag:"tag:yaml.org,2002:map",resolve(n,e){return ye(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>B.from(n,e,t)};class J extends $t{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(oe,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=Se(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=Se(e);if(typeof s!="number")return;const i=this.items[s];return!t&&I(i)?i.value:i}has(e){const t=Se(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=Se(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const i=this.items[s];I(i)&&Mt(t)?i.value=t:this.items[s]=t}toJSON(e,t){const s=[];t?.onCreate&&t.onCreate(s);let i=0;for(const o of this.items)s.push(D(o,String(i++),t));return s}toString(e,t,s){return e?Wt(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:i}=s,o=new this(e);if(t&&Symbol.iterator in Object(t)){let a=0;for(let r of t){if(typeof i=="function"){const l=t instanceof Set?r:String(a++);r=i.call(t,l,r)}o.items.push(me(r,void 0,s))}}return o}}function Se(n){let e=I(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const ce={collection:"seq",default:!0,nodeClass:J,tag:"tag:yaml.org,2002:seq",resolve(n,e){return be(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>J.from(n,e,t)},$e={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),at(n,e,t,s)}},Re={identify:n=>n==null,createNode:()=>new T(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new T(null),stringify:({source:n},e)=>typeof n=="string"&&Re.test.test(n)?n:e.options.nullStr},lt={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new T(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&lt.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function R({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const i=typeof s=="number"?s:Number(s);if(!isFinite(i))return isNaN(i)?".nan":i<0?"-.inf":".inf";let o=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(o)&&!o.includes("e")){let a=o.indexOf(".");a<0&&(a=o.length,o+=".");let r=e-(o.length-a-1);for(;r-- >0;)o+="0"}return o}const Ht={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:R},Gt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():R(n)}},Vt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new T(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:R},Fe=n=>typeof n=="bigint"||Number.isInteger(n),ct=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Jt(n,e,t){const{value:s}=n;return Fe(s)&&s>=0?t+s.toString(e):R(n)}const zt={identify:n=>Fe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ct(n,2,8,t),stringify:n=>Jt(n,8,"0o")},Yt={identify:Fe,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ct(n,0,10,t),stringify:R},Qt={identify:n=>Fe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ct(n,2,16,t),stringify:n=>Jt(n,16,"0x")},vs=[le,ce,$e,Re,lt,zt,Yt,Qt,Ht,Gt,Vt];function kt(n){return typeof n=="bigint"||Number.isInteger(n)}const Te=({value:n})=>JSON.stringify(n),Ss=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Te},{identify:n=>n==null,createNode:()=>new T(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Te},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Te},{identify:kt,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>kt(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Te}],Ts={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},_s=[le,ce].concat(Ss,Ts),ut={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let i=0;i<t.length;++i)s[i]=t.charCodeAt(i);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,i,o){if(!t)return"";const a=t;let r;if(typeof btoa=="function"){let l="";for(let c=0;c<a.length;++c)l+=String.fromCharCode(a[c]);r=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=T.BLOCK_LITERAL),e!==T.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(r.length/l),d=new Array(c);for(let u=0,h=0;u<c;++u,h+=l)d[u]=r.substr(h,l);r=d.join(e===T.BLOCK_LITERAL?`
`:" ")}return at({comment:n,type:e,value:r},s,i,o)}};function Xt(n,e){if(be(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!N(s)){if(ye(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const i=s.items[0]||new j(new T(null));if(s.commentBefore&&(i.key.commentBefore=i.key.commentBefore?`${s.commentBefore}
${i.key.commentBefore}`:s.commentBefore),s.comment){const o=i.value??i.key;o.comment=o.comment?`${s.comment}
${o.comment}`:s.comment}s=i}n.items[t]=N(s)?s:new j(s)}}else e("Expected a sequence for this tag");return n}function Zt(n,e,t){const{replacer:s}=t,i=new J(n);i.tag="tag:yaml.org,2002:pairs";let o=0;if(e&&Symbol.iterator in Object(e))for(let a of e){typeof s=="function"&&(a=s.call(e,String(o++),a));let r,l;if(Array.isArray(a))if(a.length===2)r=a[0],l=a[1];else throw new TypeError(`Expected [key, value] tuple: ${a}`);else if(a&&a instanceof Object){const c=Object.keys(a);if(c.length===1)r=c[0],l=a[r];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else r=a;i.items.push(rt(r,l,t))}return i}const ht={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Xt,createNode:Zt};class te extends J{constructor(){super(),this.add=B.prototype.add.bind(this),this.delete=B.prototype.delete.bind(this),this.get=B.prototype.get.bind(this),this.has=B.prototype.has.bind(this),this.set=B.prototype.set.bind(this),this.tag=te.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t?.onCreate&&t.onCreate(s);for(const i of this.items){let o,a;if(N(i)?(o=D(i.key,"",t),a=D(i.value,o,t)):o=D(i,"",t),s.has(o))throw new Error("Ordered maps must not include duplicate keys");s.set(o,a)}return s}static from(e,t,s){const i=Zt(e,t,s),o=new this;return o.items=i.items,o}}te.tag="tag:yaml.org,2002:omap";const ft={collection:"seq",identify:n=>n instanceof Map,nodeClass:te,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=Xt(n,e),s=[];for(const{key:i}of t.items)I(i)&&(s.includes(i.value)?e(`Ordered maps must not include duplicate keys: ${i.value}`):s.push(i.value));return Object.assign(new te,t)},createNode:(n,e,t)=>te.from(n,e,t)};function en({value:n,source:e},t){return e&&(n?tn:nn).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const tn={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new T(!0),stringify:en},nn={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new T(!1),stringify:en},As={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:R},Is={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():R(n)}},Os={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new T(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:R},we=n=>typeof n=="bigint"||Number.isInteger(n);function qe(n,e,t,{intAsBigInt:s}){const i=n[0];if((i==="-"||i==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const a=BigInt(n);return i==="-"?BigInt(-1)*a:a}const o=parseInt(n,t);return i==="-"?-1*o:o}function dt(n,e,t){const{value:s}=n;if(we(s)){const i=s.toString(e);return s<0?"-"+t+i.substr(1):t+i}return R(n)}const Cs={identify:we,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>qe(n,2,2,t),stringify:n=>dt(n,2,"0b")},Ns={identify:we,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>qe(n,1,8,t),stringify:n=>dt(n,8,"0")},Es={identify:we,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>qe(n,0,10,t),stringify:R},Ls={identify:we,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>qe(n,2,16,t),stringify:n=>dt(n,16,"0x")};class ne extends B{constructor(e){super(e),this.tag=ne.tag}add(e){let t;N(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new j(e.key,null):t=new j(e,null),V(this.items,t.key)||this.items.push(t)}get(e,t){const s=V(this.items,e);return!t&&N(s)?I(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=V(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new j(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:i}=s,o=new this(e);if(t&&Symbol.iterator in Object(t))for(let a of t)typeof i=="function"&&(a=i.call(t,a,a)),o.items.push(rt(a,null,s));return o}}ne.tag="tag:yaml.org,2002:set";const pt={collection:"map",identify:n=>n instanceof Set,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>ne.from(n,e,t),resolve(n,e){if(ye(n)){if(n.hasAllNullValues(!0))return Object.assign(new ne,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function mt(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,i=a=>e?BigInt(a):Number(a),o=s.replace(/_/g,"").split(":").reduce((a,r)=>a*i(60)+i(r),i(0));return t==="-"?i(-1)*o:o}function sn(n){let{value:e}=n,t=a=>a;if(typeof e=="bigint")t=a=>BigInt(a);else if(isNaN(e)||!isFinite(e))return R(n);let s="";e<0&&(s="-",e*=t(-1));const i=t(60),o=[e%i];return e<60?o.unshift(0):(e=(e-o[0])/i,o.unshift(e%i),e>=60&&(e=(e-o[0])/i,o.unshift(e))),s+o.map(a=>String(a).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const on={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>mt(n,t),stringify:sn},an={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>mt(n,!1),stringify:sn},Ue={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Ue.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,i,o,a,r]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,i,o||0,a||0,r||0,l);const d=e[8];if(d&&d!=="Z"){let u=mt(d,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},vt=[le,ce,$e,Re,tn,nn,Cs,Ns,Es,Ls,As,Is,Os,ut,U,ft,ht,pt,on,an,Ue],St=new Map([["core",vs],["failsafe",[le,ce,$e]],["json",_s],["yaml11",vt],["yaml-1.1",vt]]),Tt={binary:ut,bool:lt,float:Vt,floatExp:Gt,floatNaN:Ht,floatTime:an,int:Yt,intHex:Qt,intOct:zt,intTime:on,map:le,merge:U,null:Re,omap:ft,pairs:ht,seq:ce,set:pt,timestamp:Ue},Ps={"tag:yaml.org,2002:binary":ut,"tag:yaml.org,2002:merge":U,"tag:yaml.org,2002:omap":ft,"tag:yaml.org,2002:pairs":ht,"tag:yaml.org,2002:set":pt,"tag:yaml.org,2002:timestamp":Ue};function We(n,e,t){const s=St.get(e);if(s&&!n)return t&&!s.includes(U)?s.concat(U):s.slice();let i=s;if(!i)if(Array.isArray(n))i=[];else{const o=Array.from(St.keys()).filter(a=>a!=="yaml11").map(a=>JSON.stringify(a)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${o} or define customTags array`)}if(Array.isArray(n))for(const o of n)i=i.concat(o);else typeof n=="function"&&(i=n(i.slice()));return t&&(i=i.concat(U)),i.reduce((o,a)=>{const r=typeof a=="string"?Tt[a]:a;if(!r){const l=JSON.stringify(a),c=Object.keys(Tt).map(d=>JSON.stringify(d)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return o.includes(r)||o.push(r),o},[])}const js=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class gt{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:i,schema:o,sortMapEntries:a,toStringDefaults:r}){this.compat=Array.isArray(e)?We(e,"compat"):e?We(null,e):null,this.name=typeof o=="string"&&o||"core",this.knownTags=i?Ps:{},this.tags=We(t,this.name,s),this.toStringOptions=r??null,Object.defineProperty(this,W,{value:le}),Object.defineProperty(this,F,{value:$e}),Object.defineProperty(this,oe,{value:ce}),this.sortMapEntries=typeof a=="function"?a:a===!0?js:null}clone(){const e=Object.create(gt.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Bs(n,e){const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const i=Ft(n,e),{commentString:o}=i.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=o(n.commentBefore);t.unshift(q(l,""))}let a=!1,r=null;if(n.contents){if(C(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const d=o(n.contents.commentBefore);t.push(q(d,""))}i.forceBlockIndent=!!n.comment,r=n.contents.comment}const l=r?void 0:()=>a=!0;let c=se(n.contents,i,()=>r=null,l);r&&(c+=G(c,"",o(r))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(se(n.contents,i));if(n.directives?.docEnd)if(n.comment){const l=o(n.comment);l.includes(`
`)?(t.push("..."),t.push(q(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&a&&(l=l.replace(/^\n+/,"")),l&&((!a||r)&&t[t.length-1]!==""&&t.push(""),t.push(q(o(l),"")))}return t.join(`
`)+`
`}class Ke{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,M,{value:Qe});let i=null;typeof t=="function"||Array.isArray(t)?i=t:s===void 0&&t&&(s=t,t=void 0);const o=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=o;let{version:a}=o;s?._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(a=this.directives.yaml.version)):this.directives=new P({version:a}),this.setSchema(a,s),this.contents=e===void 0?null:this.createNode(e,i,s)}clone(){const e=Object.create(Ke.prototype,{[M]:{value:Qe}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=C(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Y(this.contents)&&this.contents.add(e)}addIn(e,t){Y(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Bt(this);e.anchor=!t||s.has(t)?Dt(t||"a",s):t}return new ot(e.anchor)}createNode(e,t,s){let i;if(typeof t=="function")e=t.call({"":e},"",e),i=t;else if(Array.isArray(t)){const p=w=>typeof w=="number"||w instanceof String||w instanceof Number,b=t.filter(p).map(String);b.length>0&&(t=t.concat(b)),i=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:o,anchorPrefix:a,flow:r,keepUndefined:l,onTagObj:c,tag:d}=s??{},{onAnchor:u,setAnchors:h,sourceObjects:m}=ls(this,a||"a"),g={aliasDuplicateObjects:o??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:i,schema:this.schema,sourceObjects:m},f=me(e,d,g);return r&&O(f)&&(f.flow=!0),h(),f}createPair(e,t,s={}){const i=this.createNode(e,null,s),o=this.createNode(t,null,s);return new j(i,o)}delete(e){return Y(this.contents)?this.contents.delete(e):!1}deleteIn(e){return he(e)?this.contents==null?!1:(this.contents=null,!0):Y(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return O(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return he(e)?!t&&I(this.contents)?this.contents.value:this.contents:O(this.contents)?this.contents.getIn(e,t):void 0}has(e){return O(this.contents)?this.contents.has(e):!1}hasIn(e){return he(e)?this.contents!==void 0:O(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ne(this.schema,[e],t):Y(this.contents)&&this.contents.set(e,t)}setIn(e,t){he(e)?this.contents=t:this.contents==null?this.contents=Ne(this.schema,Array.from(e),t):Y(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new P({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new P({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const i=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new gt(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:i,onAnchor:o,reviver:a}={}){const r={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof i=="number"?i:100},l=D(this.contents,t??"",r);if(typeof o=="function")for(const{count:c,res:d}of r.anchors.values())o(d,c);return typeof a=="function"?Z(a,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Bs(this,e)}}function Y(n){if(O(n))return!0;throw new Error("Expected a YAML collection as document contents")}class rn extends Error{constructor(e,t,s,i){super(),this.name=e,this.code=s,this.message=i,this.pos=t}}class fe extends rn{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Ds extends rn{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const _t=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(r=>e.linePos(r));const{line:s,col:i}=t.linePos[0];t.message+=` at line ${s}, column ${i}`;let o=i-1,a=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(o>=60&&a.length>80){const r=Math.min(o-39,a.length-79);a="…"+a.substring(r),o-=r-1}if(a.length>80&&(a=a.substring(0,79)+"…"),s>1&&/^ *$/.test(a.substring(0,o))){let r=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);r.length>80&&(r=r.substring(0,79)+`…
`),a=r+a}if(/[^ ]/.test(a)){let r=1;const l=t.linePos[1];l?.line===s&&l.col>i&&(r=Math.max(1,Math.min(l.col-i,80-o)));const c=" ".repeat(o)+"^".repeat(r);t.message+=`:

${a}
${c}
`}};function ie(n,{flow:e,indicator:t,next:s,offset:i,onError:o,parentIndent:a,startOnNewline:r}){let l=!1,c=r,d=r,u="",h="",m=!1,g=!1,f=null,p=null,b=null,w=null,k=null,v=null,S=null;for(const y of n)switch(g&&(y.type!=="space"&&y.type!=="newline"&&y.type!=="comma"&&o(y.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g=!1),f&&(c&&y.type!=="comment"&&y.type!=="newline"&&o(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),f=null),y.type){case"space":!e&&(t!=="doc-start"||s?.type!=="flow-collection")&&y.source.includes("	")&&(f=y),d=!0;break;case"comment":{d||o(y,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const E=y.source.substring(1)||" ";u?u+=h+E:u=E,h="",c=!1;break}case"newline":c?u?u+=y.source:(!v||t!=="seq-item-ind")&&(l=!0):h+=y.source,c=!0,m=!0,(p||b)&&(w=y),d=!0;break;case"anchor":p&&o(y,"MULTIPLE_ANCHORS","A node can have at most one anchor"),y.source.endsWith(":")&&o(y.offset+y.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),p=y,S??(S=y.offset),c=!1,d=!1,g=!0;break;case"tag":{b&&o(y,"MULTIPLE_TAGS","A node can have at most one tag"),b=y,S??(S=y.offset),c=!1,d=!1,g=!0;break}case t:(p||b)&&o(y,"BAD_PROP_ORDER",`Anchors and tags must be after the ${y.source} indicator`),v&&o(y,"UNEXPECTED_TOKEN",`Unexpected ${y.source} in ${e??"collection"}`),v=y,c=t==="seq-item-ind"||t==="explicit-key-ind",d=!1;break;case"comma":if(e){k&&o(y,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),k=y,c=!1,d=!1;break}default:o(y,"UNEXPECTED_TOKEN",`Unexpected ${y.type} token`),c=!1,d=!1}const _=n[n.length-1],A=_?_.offset+_.source.length:i;return g&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&o(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),f&&(c&&f.indent<=a||s?.type==="block-map"||s?.type==="block-seq")&&o(f,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:k,found:v,spaceBefore:l,comment:u,hasNewline:m,anchor:p,tag:b,newlineAfterProp:w,end:A,start:S??A}}function ge(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ge(e.key)||ge(e.value))return!0}return!1;default:return!0}}function tt(n,e,t){if(e?.type==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ge(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function ln(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const i=typeof s=="function"?s:(o,a)=>o===a||I(o)&&I(a)&&o.value===a.value;return e.some(o=>i(o.key,t))}const At="All mapping items must start at the same column";function Ms({composeNode:n,composeEmptyNode:e},t,s,i,o){const a=o?.nodeClass??B,r=new a(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const d of s.items){const{start:u,key:h,sep:m,value:g}=d,f=ie(u,{indicator:"explicit-key-ind",next:h??m?.[0],offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0}),p=!f.found;if(p){if(h&&(h.type==="block-seq"?i(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in h&&h.indent!==s.indent&&i(l,"BAD_INDENT",At)),!f.anchor&&!f.tag&&!m){c=f.end,f.comment&&(r.comment?r.comment+=`
`+f.comment:r.comment=f.comment);continue}(f.newlineAfterProp||ge(h))&&i(h??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else f.found?.indent!==s.indent&&i(l,"BAD_INDENT",At);t.atKey=!0;const b=f.end,w=h?n(t,h,f,i):e(t,b,u,null,f,i);t.schema.compat&&tt(s.indent,h,i),t.atKey=!1,ln(t,r.items,w)&&i(b,"DUPLICATE_KEY","Map keys must be unique");const k=ie(m??[],{indicator:"map-value-ind",next:g,offset:w.range[2],onError:i,parentIndent:s.indent,startOnNewline:!h||h.type==="block-scalar"});if(l=k.end,k.found){p&&(g?.type==="block-map"&&!k.hasNewline&&i(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&f.start<k.found.offset-1024&&i(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const v=g?n(t,g,k,i):e(t,l,m,null,k,i);t.schema.compat&&tt(s.indent,g,i),l=v.range[2];const S=new j(w,v);t.options.keepSourceTokens&&(S.srcToken=d),r.items.push(S)}else{p&&i(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),k.comment&&(w.comment?w.comment+=`
`+k.comment:w.comment=k.comment);const v=new j(w);t.options.keepSourceTokens&&(v.srcToken=d),r.items.push(v)}}return c&&c<l&&i(c,"IMPOSSIBLE","Map comment with trailing content"),r.range=[s.offset,l,c??l],r}function $s({composeNode:n,composeEmptyNode:e},t,s,i,o){const a=o?.nodeClass??J,r=new a(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:d,value:u}of s.items){const h=ie(d,{indicator:"seq-item-ind",next:u,offset:l,onError:i,parentIndent:s.indent,startOnNewline:!0});if(!h.found)if(h.anchor||h.tag||u)u?.type==="block-seq"?i(h.end,"BAD_INDENT","All sequence items must start at the same column"):i(l,"MISSING_CHAR","Sequence item without - indicator");else{c=h.end,h.comment&&(r.comment=h.comment);continue}const m=u?n(t,u,h,i):e(t,h.end,d,null,h,i);t.schema.compat&&tt(s.indent,u,i),l=m.range[2],r.items.push(m)}return r.range=[s.offset,l,c??l],r}function ke(n,e,t,s){let i="";if(n){let o=!1,a="";for(const r of n){const{source:l,type:c}=r;switch(c){case"space":o=!0;break;case"comment":{t&&!o&&s(r,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const d=l.substring(1)||" ";i?i+=a+d:i=d,a="";break}case"newline":i&&(a+=l),o=!0;break;default:s(r,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:i,offset:e}}const He="Block collections are not allowed within flow collections",Ge=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Rs({composeNode:n,composeEmptyNode:e},t,s,i,o){const a=s.start.source==="{",r=a?"flow map":"flow sequence",l=o?.nodeClass??(a?B:J),c=new l(t.schema);c.flow=!0;const d=t.atRoot;d&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=s.offset+s.start.source.length;for(let p=0;p<s.items.length;++p){const b=s.items[p],{start:w,key:k,sep:v,value:S}=b,_=ie(w,{flow:r,indicator:"explicit-key-ind",next:k??v?.[0],offset:u,onError:i,parentIndent:s.indent,startOnNewline:!1});if(!_.found){if(!_.anchor&&!_.tag&&!v&&!S){p===0&&_.comma?i(_.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`):p<s.items.length-1&&i(_.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${r}`),_.comment&&(c.comment?c.comment+=`
`+_.comment:c.comment=_.comment),u=_.end;continue}!a&&t.options.strict&&ge(k)&&i(k,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(p===0)_.comma&&i(_.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`);else if(_.comma||i(_.start,"MISSING_CHAR",`Missing , between ${r} items`),_.comment){let A="";e:for(const y of w)switch(y.type){case"comma":case"space":break;case"comment":A=y.source.substring(1);break e;default:break e}if(A){let y=c.items[c.items.length-1];N(y)&&(y=y.value??y.key),y.comment?y.comment+=`
`+A:y.comment=A,_.comment=_.comment.substring(A.length+1)}}if(!a&&!v&&!_.found){const A=S?n(t,S,_,i):e(t,_.end,v,null,_,i);c.items.push(A),u=A.range[2],Ge(S)&&i(A.range,"BLOCK_IN_FLOW",He)}else{t.atKey=!0;const A=_.end,y=k?n(t,k,_,i):e(t,A,w,null,_,i);Ge(k)&&i(y.range,"BLOCK_IN_FLOW",He),t.atKey=!1;const E=ie(v??[],{flow:r,indicator:"map-value-ind",next:S,offset:y.range[2],onError:i,parentIndent:s.indent,startOnNewline:!1});if(E.found){if(!a&&!_.found&&t.options.strict){if(v)for(const L of v){if(L===E.found)break;if(L.type==="newline"){i(L,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}_.start<E.found.offset-1024&&i(E.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&S.source?.[0]===":"?i(S,"MISSING_CHAR",`Missing space after : in ${r}`):i(E.start,"MISSING_CHAR",`Missing , or : between ${r} items`));const K=S?n(t,S,E,i):E.found?e(t,E.end,v,null,E,i):null;K?Ge(S)&&i(K.range,"BLOCK_IN_FLOW",He):E.comment&&(y.comment?y.comment+=`
`+E.comment:y.comment=E.comment);const z=new j(y,K);if(t.options.keepSourceTokens&&(z.srcToken=b),a){const L=c;ln(t,L.items,y)&&i(A,"DUPLICATE_KEY","Map keys must be unique"),L.items.push(z)}else{const L=new B(t.schema);L.flow=!0,L.items.push(z);const bt=(K??y).range;L.range=[y.range[0],bt[1],bt[2]],c.items.push(L)}u=K?K.range[2]:E.end}}const h=a?"}":"]",[m,...g]=s.end;let f=u;if(m?.source===h)f=m.offset+m.source.length;else{const p=r[0].toUpperCase()+r.substring(1),b=d?`${p} must end with a ${h}`:`${p} in block collection must be sufficiently indented and end with a ${h}`;i(u,d?"MISSING_CHAR":"BAD_INDENT",b),m&&m.source.length!==1&&g.unshift(m)}if(g.length>0){const p=ke(g,f,t.options.strict,i);p.comment&&(c.comment?c.comment+=`
`+p.comment:c.comment=p.comment),c.range=[s.offset,f,p.offset]}else c.range=[s.offset,f,f];return c}function Ve(n,e,t,s,i,o){const a=t.type==="block-map"?Ms(n,e,t,s,o):t.type==="block-seq"?$s(n,e,t,s,o):Rs(n,e,t,s,o),r=a.constructor;return i==="!"||i===r.tagName?(a.tag=r.tagName,a):(i&&(a.tag=i),a)}function Fs(n,e,t,s,i){const o=s.tag,a=o?e.directives.tagName(o.source,h=>i(o,"TAG_RESOLVE_FAILED",h)):null;if(t.type==="block-seq"){const{anchor:h,newlineAfterProp:m}=s,g=h&&o?h.offset>o.offset?h:o:h??o;g&&(!m||m.offset<g.offset)&&i(g,"MISSING_CHAR","Missing newline after block sequence props")}const r=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!o||!a||a==="!"||a===B.tagName&&r==="map"||a===J.tagName&&r==="seq")return Ve(n,e,t,i,a);let l=e.schema.tags.find(h=>h.tag===a&&h.collection===r);if(!l){const h=e.schema.knownTags[a];if(h?.collection===r)e.schema.tags.push(Object.assign({},h,{default:!1})),l=h;else return h?i(o,"BAD_COLLECTION_TYPE",`${h.tag} used for ${r} collection, but expects ${h.collection??"scalar"}`,!0):i(o,"TAG_RESOLVE_FAILED",`Unresolved tag: ${a}`,!0),Ve(n,e,t,i,a)}const c=Ve(n,e,t,i,a,l),d=l.resolve?.(c,h=>i(o,"TAG_RESOLVE_FAILED",h),e.options)??c,u=C(d)?d:new T(d);return u.range=c.range,u.tag=a,l?.format&&(u.format=l.format),u}function qs(n,e,t){const s=e.offset,i=Us(e,n.options.strict,t);if(!i)return{value:"",type:null,comment:"",range:[s,s,s]};const o=i.mode===">"?T.BLOCK_FOLDED:T.BLOCK_LITERAL,a=e.source?Ks(e.source):[];let r=a.length;for(let f=a.length-1;f>=0;--f){const p=a[f][1];if(p===""||p==="\r")r=f;else break}if(r===0){const f=i.chomp==="+"&&a.length>0?`
`.repeat(Math.max(1,a.length-1)):"";let p=s+i.length;return e.source&&(p+=e.source.length),{value:f,type:o,comment:i.comment,range:[s,p,p]}}let l=e.indent+i.indent,c=e.offset+i.length,d=0;for(let f=0;f<r;++f){const[p,b]=a[f];if(b===""||b==="\r")i.indent===0&&p.length>l&&(l=p.length);else{p.length<l&&t(c+p.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),i.indent===0&&(l=p.length),d=f,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=p.length+b.length+1}for(let f=a.length-1;f>=r;--f)a[f][0].length>l&&(r=f+1);let u="",h="",m=!1;for(let f=0;f<d;++f)u+=a[f][0].slice(l)+`
`;for(let f=d;f<r;++f){let[p,b]=a[f];c+=p.length+b.length+1;const w=b[b.length-1]==="\r";if(w&&(b=b.slice(0,-1)),b&&p.length<l){const v=`Block scalar lines must not be less indented than their ${i.indent?"explicit indentation indicator":"first line"}`;t(c-b.length-(w?2:1),"BAD_INDENT",v),p=""}o===T.BLOCK_LITERAL?(u+=h+p.slice(l)+b,h=`
`):p.length>l||b[0]==="	"?(h===" "?h=`
`:!m&&h===`
`&&(h=`

`),u+=h+p.slice(l)+b,h=`
`,m=!0):b===""?h===`
`?u+=`
`:h=`
`:(u+=h+b,h=" ",m=!1)}switch(i.chomp){case"-":break;case"+":for(let f=r;f<a.length;++f)u+=`
`+a[f][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}const g=s+i.length+e.source.length;return{value:u,type:o,comment:i.comment,range:[s,g,g]}}function Us({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:i}=e[0],o=i[0];let a=0,r="",l=-1;for(let h=1;h<i.length;++h){const m=i[h];if(!r&&(m==="-"||m==="+"))r=m;else{const g=Number(m);!a&&g?a=g:l===-1&&(l=n+h)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${i}`);let c=!1,d="",u=i.length;for(let h=1;h<e.length;++h){const m=e[h];switch(m.type){case"space":c=!0;case"newline":u+=m.source.length;break;case"comment":t&&!c&&s(m,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=m.source.length,d=m.source.substring(1);break;case"error":s(m,"UNEXPECTED_TOKEN",m.message),u+=m.source.length;break;default:{const g=`Unexpected token in block scalar header: ${m.type}`;s(m,"UNEXPECTED_TOKEN",g);const f=m.source;f&&typeof f=="string"&&(u+=f.length)}}}return{mode:o,indent:a,chomp:r,comment:d,length:u}}function Ks(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),o=[s?.[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let a=1;a<e.length;a+=2)o.push([e[a],e[a+1]]);return o}function xs(n,e,t){const{offset:s,type:i,source:o,end:a}=n;let r,l;const c=(h,m,g)=>t(s+h,m,g);switch(i){case"scalar":r=T.PLAIN,l=Ws(o,c);break;case"single-quoted-scalar":r=T.QUOTE_SINGLE,l=Hs(o,c);break;case"double-quoted-scalar":r=T.QUOTE_DOUBLE,l=Gs(o,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${i}`),{value:"",type:null,comment:"",range:[s,s+o.length,s+o.length]}}const d=s+o.length,u=ke(a,d,e,t);return{value:l,type:r,comment:u.comment,range:[s,d,u.offset]}}function Ws(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),cn(n)}function Hs(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),cn(n.slice(1,-1)).replace(/''/g,"'")}function cn(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let i=s[1],o=" ",a=e.lastIndex;for(t.lastIndex=a;s=t.exec(n);)s[1]===""?o===`
`?i+=o:o=`
`:(i+=o+s[1],o=" "),a=t.lastIndex;const r=/[ \t]*(.*)/sy;return r.lastIndex=a,s=r.exec(n),i+o+(s?.[1]??"")}function Gs(n,e){let t="";for(let s=1;s<n.length-1;++s){const i=n[s];if(!(i==="\r"&&n[s+1]===`
`))if(i===`
`){const{fold:o,offset:a}=Vs(n,s);t+=o,s=a}else if(i==="\\"){let o=n[++s];const a=Js[o];if(a)t+=a;else if(o===`
`)for(o=n[s+1];o===" "||o==="	";)o=n[++s+1];else if(o==="\r"&&n[s+1]===`
`)for(o=n[++s+1];o===" "||o==="	";)o=n[++s+1];else if(o==="x"||o==="u"||o==="U"){const r=o==="x"?2:o==="u"?4:8;t+=zs(n,s+1,r,e),s+=r}else{const r=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),t+=r}}else if(i===" "||i==="	"){const o=s;let a=n[s+1];for(;a===" "||a==="	";)a=n[++s+1];a!==`
`&&!(a==="\r"&&n[s+2]===`
`)&&(t+=s>o?n.slice(o,s+1):i)}else t+=i}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function Vs(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const Js={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function zs(n,e,t,s){const i=n.substr(e,t),a=i.length===t&&/^[0-9a-fA-F]+$/.test(i)?parseInt(i,16):NaN;try{return String.fromCodePoint(a)}catch{const r=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),r}}function un(n,e,t,s){const{value:i,type:o,comment:a,range:r}=e.type==="block-scalar"?qs(n,e,s):xs(e,n.options.strict,s),l=t?n.directives.tagName(t.source,u=>s(t,"TAG_RESOLVE_FAILED",u)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[F]:l?c=Ys(n.schema,i,l,t,s):e.type==="scalar"?c=Qs(n,i,e,s):c=n.schema[F];let d;try{const u=c.resolve(i,h=>s(t??e,"TAG_RESOLVE_FAILED",h),n.options);d=I(u)?u:new T(u)}catch(u){const h=u instanceof Error?u.message:String(u);s(t??e,"TAG_RESOLVE_FAILED",h),d=new T(i)}return d.range=r,d.source=i,o&&(d.type=o),l&&(d.tag=l),c.format&&(d.format=c.format),a&&(d.comment=a),d}function Ys(n,e,t,s,i){if(t==="!")return n[F];const o=[];for(const r of n.tags)if(!r.collection&&r.tag===t)if(r.default&&r.test)o.push(r);else return r;for(const r of o)if(r.test?.test(e))return r;const a=n.knownTags[t];return a&&!a.collection?(n.tags.push(Object.assign({},a,{default:!1,test:void 0})),a):(i(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[F])}function Qs({atKey:n,directives:e,schema:t},s,i,o){const a=t.tags.find(r=>(r.default===!0||n&&r.default==="key")&&r.test?.test(s))||t[F];if(t.compat){const r=t.compat.find(l=>l.default&&l.test?.test(s))??t[F];if(a.tag!==r.tag){const l=e.tagString(a.tag),c=e.tagString(r.tag),d=`Value may be parsed as either ${l} or ${c}`;o(i,"TAG_RESOLVE_FAILED",d,!0)}}return a}function Xs(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let i=e[s];switch(i.type){case"space":case"comment":case"newline":n-=i.source.length;continue}for(i=e[++s];i?.type==="space";)n+=i.source.length,i=e[++s];break}}return n}const Zs={composeNode:hn,composeEmptyNode:yt};function hn(n,e,t,s){const i=n.atKey,{spaceBefore:o,comment:a,anchor:r,tag:l}=t;let c,d=!0;switch(e.type){case"alias":c=ei(n,e,s),(r||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=un(n,e,l,s),r&&(c.anchor=r.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=Fs(Zs,n,e,t,s),r&&(c.anchor=r.source.substring(1))}catch(u){const h=u instanceof Error?u.message:String(u);s(e,"RESOURCE_EXHAUSTION",h)}break;default:{const u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",u),d=!1}}return c??(c=yt(n,e.offset,void 0,null,t,s)),r&&c.anchor===""&&s(r,"BAD_ALIAS","Anchor cannot be an empty string"),i&&n.options.stringKeys&&(!I(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),o&&(c.spaceBefore=!0),a&&(e.type==="scalar"&&e.source===""?c.comment=a:c.commentBefore=a),n.options.keepSourceTokens&&d&&(c.srcToken=e),c}function yt(n,e,t,s,{spaceBefore:i,comment:o,anchor:a,tag:r,end:l},c){const d={type:"scalar",offset:Xs(e,t,s),indent:-1,source:""},u=un(n,d,r,c);return a&&(u.anchor=a.source.substring(1),u.anchor===""&&c(a,"BAD_ALIAS","Anchor cannot be an empty string")),i&&(u.spaceBefore=!0),o&&(u.comment=o,u.range[2]=l),u}function ei({options:n},{offset:e,source:t,end:s},i){const o=new ot(t.substring(1));o.source===""&&i(e,"BAD_ALIAS","Alias cannot be an empty string"),o.source.endsWith(":")&&i(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const a=e+t.length,r=ke(s,a,n.strict,i);return o.range=[e,a,r.offset],r.comment&&(o.comment=r.comment),o}function ti(n,e,{offset:t,start:s,value:i,end:o},a){const r=Object.assign({_directives:e},n),l=new Ke(void 0,r),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},d=ie(s,{indicator:"doc-start",next:i??o?.[0],offset:t,onError:a,parentIndent:0,startOnNewline:!0});d.found&&(l.directives.docStart=!0,i&&(i.type==="block-map"||i.type==="block-seq")&&!d.hasNewline&&a(d.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=i?hn(c,i,d,a):yt(c,d.end,s,null,d,a);const u=l.contents.range[2],h=ke(o,u,!1,a);return h.comment&&(l.comment=h.comment),l.range=[t,u,h.offset],l}function ue(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function It(n){let e="",t=!1,s=!1;for(let i=0;i<n.length;++i){const o=n[i];switch(o[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(o.substring(1)||" "),t=!0,s=!1;break;case"%":n[i+1]?.[0]!=="#"&&(i+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class ni{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,i,o)=>{const a=ue(t);o?this.warnings.push(new Ds(a,s,i)):this.errors.push(new fe(a,s,i))},this.directives=new P({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:i}=It(this.prelude);if(s){const o=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(i||e.directives.docStart||!o)e.commentBefore=s;else if(O(o)&&!o.flow&&o.items.length>0){let a=o.items[0];N(a)&&(a=a.key);const r=a.commentBefore;a.commentBefore=r?`${s}
${r}`:s}else{const a=o.commentBefore;o.commentBefore=a?`${s}
${a}`:s}}if(t){for(let o=0;o<this.errors.length;++o)e.errors.push(this.errors[o]);for(let o=0;o<this.warnings.length;++o)e.warnings.push(this.warnings[o])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:It(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const i of e)yield*this.next(i);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,i)=>{const o=ue(e);o[0]+=t,this.onError(o,"BAD_DIRECTIVE",s,i)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=ti(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new fe(ue(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new fe(ue(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=ke(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new fe(ue(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),i=new Ke(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),i.range=[0,t,t],this.decorate(i,!1),yield i}}}const fn="\uFEFF",dn="",pn="",nt="";function si(n){switch(n){case fn:return"byte-order-mark";case dn:return"doc-mode";case pn:return"flow-error-end";case nt:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function $(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Ot=new Set("0123456789ABCDEFabcdef"),ii=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),_e=new Set(",[]{}"),oi=new Set(` ,[]{}
\r	`),Je=n=>!n||oi.has(n);class ai{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const i=this.buffer[s+e+1];if(i===`
`||!i&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&$(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===fn&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const o=e[s-1];if(o===" "||o==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const o=e[t-1];if(o===" "||o==="	")t-=1;else break}const i=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-i),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield dn,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&$(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!$(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&$(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Je),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const i=this.getLine();if(i===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&i[0]!=="#"||s===0&&(i.startsWith("---")||i.startsWith("..."))&&$(i[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(i[0]==="]"||i[0]==="}")))return this.flowLevel=0,yield pn,yield*this.parseLineStart();let o=0;for(;i[o]===",";)o+=yield*this.pushCount(1),o+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(o+=yield*this.pushIndicators(),i[o]){case void 0:return"flow";case"#":return yield*this.pushCount(i.length-o),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Je),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const a=this.charAt(1);if(this.flowKey||$(a)||a===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let o=0;for(;this.buffer[t-1-o]==="\\";)o+=1;if(o%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let i=s.indexOf(`
`,this.pos);if(i!==-1){for(;i!==-1;){const o=this.continueScalar(i+1);if(o===-1)break;i=s.indexOf(`
`,o)}i!==-1&&(t=i-(s[i-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>$(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let o=this.pos;s=this.buffer[o];++o)switch(s){case" ":t+=1;break;case`
`:e=o,t=0;break;case"\r":{const a=this.buffer[o+1];if(!a&&!this.atEnd)return this.setNext("block-scalar");if(a===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const o=this.continueScalar(e+1);if(o===-1)break;e=this.buffer.indexOf(`
`,o)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let i=e+1;for(s=this.buffer[i];s===" ";)s=this.buffer[++i];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++i];e=i-1}else if(!this.blockScalarKeep)do{let o=e-1,a=this.buffer[o];a==="\r"&&(a=this.buffer[--o]);const r=o;for(;a===" ";)a=this.buffer[--o];if(a===`
`&&o>=this.pos&&o+1+t>r)e=o;else break}while(!0);return yield nt,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,i;for(;i=this.buffer[++s];)if(i===":"){const o=this.buffer[s+1];if($(o)||e&&_e.has(o))break;t=s}else if($(i)){let o=this.buffer[s+1];if(i==="\r"&&(o===`
`?(s+=1,i=`
`,o=this.buffer[s+1]):t=s),o==="#"||e&&_e.has(o))break;if(i===`
`){const a=this.continueScalar(s+1);if(a===-1)break;s=Math.max(s,a-2)}}else{if(e&&_e.has(i))break;t=s}return!i&&!this.atEnd?this.setNext("plain-scalar"):(yield nt,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(Je),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,s=this.charAt(1);if($(s)||t&&_e.has(s)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!$(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(ii.has(t))t=this.buffer[++e];else if(t==="%"&&Ot.has(this.buffer[e+1])&&Ot.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const i=t-this.pos;return i>0&&(yield this.buffer.substr(this.pos,i),this.pos=t),i}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class ri{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const o=t+s>>1;this.lineStarts[o]<e?t=o+1:s=o}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const i=this.lineStarts[t-1];return{line:t,col:e-i+1}}}}function x(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Ct(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function mn(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ae(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function Q(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function Le(n,e){if(e.length<1e5)Array.prototype.push.apply(n,e);else for(let t=0;t<e.length;++t)n.push(e[t])}function Nt(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!x(e.start,"explicit-key-ind")&&!x(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,mn(e.value)?e.value.end?Le(e.value.end,e.sep):e.value.end=e.sep:Le(e.start,e.sep),delete e.sep)}class li{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ai,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=si(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Nt(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const i=s.items[s.items.length-1];if(i.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(i.sep)i.value=t;else{Object.assign(i,{key:t,sep:[]}),this.onKeyLine=!i.explicitKey;return}break}case"block-seq":{const i=s.items[s.items.length-1];i.value?s.items.push({start:[],value:t}):i.value=t;break}case"flow-collection":{const i=s.items[s.items.length-1];!i||i.value?s.items.push({start:[],key:t,sep:[]}):i.sep?i.value=t:Object.assign(i,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const i=t.items[t.items.length-1];i&&!i.sep&&!i.value&&i.start.length>0&&Ct(i.start)===-1&&(t.indent===0||i.start.every(o=>o.type!=="comment"||o.indent<t.indent))&&(s.type==="document"?s.end=i.start:s.items.push({start:i.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Ct(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Ae(this.peek(2)),s=Q(t);let i;e.end?(i=e.end,i.push(this.sourceToken),delete e.end):i=[this.sourceToken];const o={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:i}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=o}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Le(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,i=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let o=[];if(i&&t.sep&&!t.value){const a=[];for(let r=0;r<t.sep.length;++r){const l=t.sep[r];switch(l.type){case"newline":a.push(r);break;case"space":break;case"comment":l.indent>e.indent&&(a.length=0);break;default:a.length=0}}a.length>=2&&(o=t.sep.splice(a[1]))}switch(this.type){case"anchor":case"tag":i||t.value?(o.push(this.sourceToken),e.items.push({start:o}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):i||t.value?(o.push(this.sourceToken),e.items.push({start:o,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(x(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]});else if(mn(t.key)&&!x(t.sep,"newline")){const a=Q(t.start),r=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:a,key:r,sep:l}]})}else o.length>0?t.sep=t.sep.concat(o,this.sourceToken):t.sep.push(this.sourceToken);else if(x(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const a=Q(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:a,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||i?e.items.push({start:o,key:null,sep:[this.sourceToken]}):x(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const a=this.flowScalar(this.type);i||t.value?(e.items.push({start:o,key:a,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(a):(Object.assign(t,{key:a,sep:[]}),this.onKeyLine=!0);return}default:{const a=this.startBlockValue(e);if(a){if(a.type==="block-seq"){if(!t.explicitKey&&t.sep&&!x(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:o});this.stack.push(a);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const i=e.items[e.items.length-2]?.value?.end;if(Array.isArray(i)){Le(i,t.start),i.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||x(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while(s?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const i=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:i,sep:[]}):t.sep?this.stack.push(i):Object.assign(t,{key:i,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const i=Ae(s),o=Q(i);Nt(e);const a=e.end.splice(1,e.end.length);a.push(this.sourceToken);const r={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:o,key:e,sep:a}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Ae(e),s=Q(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Ae(e),s=Q(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function ci(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new ri||null,prettyErrors:e}}function ui(n,e={}){const{lineCounter:t,prettyErrors:s}=ci(e),i=new li(t?.addNewLine),o=new ni(e);let a=null;for(const r of o.compose(i.parse(n),!0,n.length))if(!a)a=r;else if(a.options.logLevel!=="silent"){a.errors.push(new fe(r.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(a.errors.forEach(_t(n,t)),a.warnings.forEach(_t(n,t))),a}function hi(n,e,t){let s;const i=ui(n,t);if(!i)return null;if(i.warnings.forEach(o=>qt(i.options.logLevel,o)),i.errors.length>0){if(i.options.logLevel!=="silent")throw i.errors[0];i.errors=[]}return i.toJS(Object.assign({reviver:s},t))}function fi(n){const e=n.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!e)return{data:Object.create(null),content:n};const t=e[1],s=e[2];try{const i=hi(t),o=Object.create(null);return i&&typeof i=="object"&&Object.assign(o,i),{data:o,content:s}}catch(i){return console.error("Error parsing frontmatter:",i),{data:Object.create(null),content:s}}}const ze={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":yn,"/content/posts/2026-04-18-financial-literacy-dancers.md":wn,"/content/posts/2026-04-18-github-actions.md":vn,"/content/posts/2026-04-18-halloween-costumes.md":Tn,"/content/posts/2026-04-18-make-shoe-dance.md":An,"/content/posts/2026-04-18-why-finals-are-hard.md":On,"/content/posts/2026-04-19-practical-tools-essentials.md":Nn,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":Ln,"/content/posts/2026-06-01-event-travel-packing.md":jn,"/content/posts/2026-06-01-general-health-home-care.md":Dn,"/content/posts/2026-06-01-outdoor-dancing.md":$n,"/content/posts/2026-06-01-power-charging.md":Fn,"/content/posts/2026-06-01-practice-review-tech.md":Un,"/content/posts/2026-06-01-practice-social-dance-apparel.md":xn,"/content/posts/2026-06-01-shoe-care-modification.md":Hn,"/content/posts/2026-06-01-theme-wear-costumes-accessories.md":Vn,"/content/posts/2026-06-01-wcs-essentials.md":zn}),blogs:Object.assign({"/content/blog/2026-06-14-the-story-behind-the-merch-page.md":Qn}),studies:Object.assign({"/content/studies/ai-devops-pipeline.md":Zn,"/content/studies/wcs-scraper-initial-sync.md":ts})},di=n=>n.split("/").pop()?.replace(".md","")||"";function pi(n){if(typeof n!="string")return;const e=n.toLowerCase();return["published","draft","planned"].includes(e)?e:void 0}function mi(n){if(typeof n=="number")return n;if(typeof n=="string"){const e=parseInt(n.replace(/[^\d]/g,""),10);return isNaN(e)?void 0:e}}function bi(n){if(!(n===""||n===void 0||n===null))return typeof n!="string"?n:n.startsWith("/")&&!n.startsWith(Ye)?`${Ye}${n}`:n}function Et(n,e){const t=s=>Array.isArray(s)?s:[];return Object.entries(n).map(([s,i])=>{const o=typeof i=="string"?i:i.default,{data:a,content:r}=fi(o),l=a.type||e,c=u=>{if(u!=="")return typeof u=="string"&&u.startsWith("/")?`${Ye}${u}`:u};return a.image=c(a.image),a.imageBack=c(a.imageBack),{...a,type:l,title:String(a.title||"Untitled"),category:String(a.category||"General"),excerpt:String(a.excerpt||""),date:String(a.date||""),author:String(a.author||""),tags:t(a.tags),affiliateIds:t(a.affiliateIds),seoTitle:a.seoTitle?String(a.seoTitle):void 0,seoDescription:a.seoDescription?String(a.seoDescription):void 0,imageAlt:a.imageAlt?String(a.imageAlt):void 0,status:pi(a.status),readTime:mi(a.readTime),content:r||"",slug:di(s)}}).filter(s=>s.draft?s.type==="study"&&(s.status==="planned"||s.status==="draft"):!0).sort((s,i)=>{const o=s.date?new Date(s.date).getTime():0,a=i.date?new Date(i.date).getTime():0,r=Number.isNaN(o)?0:o;return(Number.isNaN(a)?0:a)-r})}const Pe={posts:Et({...ze.posts,...ze.blogs},"post"),studies:Et(ze.studies,"study")},gi={posts:new Map(Pe.posts.map(n=>[n.slug,n])),studies:new Map(Pe.studies.map(n=>[n.slug,n]))},wi=()=>Pe.posts,ki=()=>Pe.studies,vi=n=>gi.posts.get(n),Si=(n,e)=>{if(n&&n.trim().length>0)return Math.max(1,Math.round(n.split(/\s+/).length/200));const t=e?.split(/\s+/).length??0;return Math.max(1,Math.round(t/20))};export{vi as a,ki as b,wi as g,bi as n,Si as r};
