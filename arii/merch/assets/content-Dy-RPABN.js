import{A as kt}from"./index-DZA-iEJd.js";const bn=`---
type: post
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
`,wn=Object.freeze(Object.defineProperty({__proto__:null,default:bn},Symbol.toStringTag,{value:"Module"})),vn=`---
type: post
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
`,kn=Object.freeze(Object.defineProperty({__proto__:null,default:vn},Symbol.toStringTag,{value:"Module"})),Sn=`---
type: post
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
`,_n=Object.freeze(Object.defineProperty({__proto__:null,default:Sn},Symbol.toStringTag,{value:"Module"})),Tn=`---
type: post
title: "Halloween costumes you can dance in"
date: "2026-10-31"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "How to stay thematic without sacrificing your spin or frame. Featuring the pumpkin outfit stress-test."
image: ""
tags:
  - fashion
  - halloween
  - wcs
---

## Functional Theming

Halloween social dancing requires Dance gear that doesn't restrict you.

### The Pumpkin Outfit

I've stress-tested a specific **Pumpkin outfit** that works perfectly for the social floor. It includes:

- **Headband:** Low profile, doesn't catch on partner's arms during turns.
- **Jack O' Lantern Stickers:** Lightweight, zero drag.

The key is keeping the costume flexible. Avoid anything that restricts the ribcage or the shoulder blades. You want to look like a pumpkin but move with the freedom of a social dancer.

[Check out the Gear specific review here](/gear)
`,An=Object.freeze(Object.defineProperty({__proto__:null,default:Tn},Symbol.toStringTag,{value:"Module"})),In=`---
type: post
title: "Make any shoe a dance shoe"
date: "2026-04-18"
author: "Ariel Anders, PhD"
category: "Gear"
excerpt: "Suede your dance shoes with a $15 DIY hack. A comparison of sticker coverage and traction response."
image: ""
tags:
  - diy
  - shoes
  - wcs
---

## Suede Your Dance Shoes

Dedicated dance shoes cost more and offer limited styles. My preferred approach is to "upgrade" high-comfort sneakers or flats using adhesive suede.

### Potential Options and Analysis

I've experimented with several placement strategies for the suede stickers:

1. **Split the sticker:** Some on the ball of the foot and some on the heel. Good for specialized traction but can feel disconnected.
2. **Just ball of the foot:** Minimalist. Allows for grip on the heel when you need it for stopping power.
3. **Entire sticker coverage:** My preferred method. I like this best because it provides a uniform, consistent grip under your whole foot.

When you're dancing on unpredictable hotel carpets or sticky social floors, it's a great way to save your knees.
`,Cn=Object.freeze(Object.defineProperty({__proto__:null,default:In},Symbol.toStringTag,{value:"Module"})),Dn=`---
type: post
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
`,On=Object.freeze(Object.defineProperty({__proto__:null,default:Dn},Symbol.toStringTag,{value:"Module"})),Nn=`---
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
`,Pn=Object.freeze(Object.defineProperty({__proto__:null,default:Nn},Symbol.toStringTag,{value:"Module"})),En=`---
type: post
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
`,Bn=Object.freeze(Object.defineProperty({__proto__:null,default:En},Symbol.toStringTag,{value:"Module"})),Ln=`---
type: resource
title: "Loop Experience Earplugs"
date: "2023-10-01"
author: "Ariel Anders, PhD"
category: "Dance Gear"
excerpt: "A must-have for protecting your hearing in loud ballroom and social dance settings without sacrificing sound quality."
image: "/images/gear/sketches/loop-earplugs.webp"
affiliateIds: ["loop-experience"]
tags: ["safety", "ballroom", "music"]
verdict: "Highly Recommended"
updatedDate: "Oct 2023"
affiliateProvider: "amazon"
---

## Why Dancers Need Hearing Protection

BALLROOMS ARE LOUD. Loop Experience earplugs reduce noise by 18 decibels while keeping music and speech clear. Perfect for social dancing where the music volume is high but you still need to hear your partner.
`,jn=Object.freeze(Object.defineProperty({__proto__:null,default:Ln},Symbol.toStringTag,{value:"Module"})),Mn=`---
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
`,Fn=Object.freeze(Object.defineProperty({__proto__:null,default:Mn},Symbol.toStringTag,{value:"Module"})),$n=`---
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
`,Wn=Object.freeze(Object.defineProperty({__proto__:null,default:$n},Symbol.toStringTag,{value:"Module"})),Rn=`---
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
`,xn=Object.freeze(Object.defineProperty({__proto__:null,default:Rn},Symbol.toStringTag,{value:"Module"})),zn=`---
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
`,Un=Object.freeze(Object.defineProperty({__proto__:null,default:zn},Symbol.toStringTag,{value:"Module"})),Kn=`---
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
`,qn=Object.freeze(Object.defineProperty({__proto__:null,default:Kn},Symbol.toStringTag,{value:"Module"})),Jn=`---
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
`,Hn=Object.freeze(Object.defineProperty({__proto__:null,default:Jn},Symbol.toStringTag,{value:"Module"})),Gn=`---
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
`,Vn=Object.freeze(Object.defineProperty({__proto__:null,default:Gn},Symbol.toStringTag,{value:"Module"})),Yn=`---
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
`,Qn=Object.freeze(Object.defineProperty({__proto__:null,default:Yn},Symbol.toStringTag,{value:"Module"})),Xn=`---
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
`,Zn=Object.freeze(Object.defineProperty({__proto__:null,default:Xn},Symbol.toStringTag,{value:"Module"})),es=`---
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
`,ts=Object.freeze(Object.defineProperty({__proto__:null,default:es},Symbol.toStringTag,{value:"Module"})),ns=`---
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
`,ss=Object.freeze(Object.defineProperty({__proto__:null,default:ns},Symbol.toStringTag,{value:"Module"})),is=`---
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
`,os=Object.freeze(Object.defineProperty({__proto__:null,default:is},Symbol.toStringTag,{value:"Module"})),rs=`---
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
`,as=Object.freeze(Object.defineProperty({__proto__:null,default:rs},Symbol.toStringTag,{value:"Module"})),ls=`---
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
`,cs=Object.freeze(Object.defineProperty({__proto__:null,default:ls},Symbol.toStringTag,{value:"Module"})),hs=`---
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
`,us=Object.freeze(Object.defineProperty({__proto__:null,default:hs},Symbol.toStringTag,{value:"Module"})),ds=`---
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
`,fs=Object.freeze(Object.defineProperty({__proto__:null,default:ds},Symbol.toStringTag,{value:"Module"})),ps=`---
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
`,gs=Object.freeze(Object.defineProperty({__proto__:null,default:ps},Symbol.toStringTag,{value:"Module"})),ms=`---
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
`,ys=Object.freeze(Object.defineProperty({__proto__:null,default:ms},Symbol.toStringTag,{value:"Module"})),bs=`---
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
`,ws=Object.freeze(Object.defineProperty({__proto__:null,default:bs},Symbol.toStringTag,{value:"Module"})),vs=`---
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
`,ks=Object.freeze(Object.defineProperty({__proto__:null,default:vs},Symbol.toStringTag,{value:"Module"})),Ss=`---
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
`,_s=Object.freeze(Object.defineProperty({__proto__:null,default:Ss},Symbol.toStringTag,{value:"Module"})),Ts=`---
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
`,As=Object.freeze(Object.defineProperty({__proto__:null,default:Ts},Symbol.toStringTag,{value:"Module"})),Is=`---
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
`,Cs=Object.freeze(Object.defineProperty({__proto__:null,default:Is},Symbol.toStringTag,{value:"Module"})),Ds=`---
type: resource
title: "Halloween Pumpkin Headbands"
date: "2024-06-01"
author: "Ariel Anders, PhD"
category: "Fashion"
excerpt: "Cute pumpkin headbands for themed social dancing without sacrificing movement."
image: "/images/gear/sketches/halloween-headbands-2-pack-pumpkin-hat-headbands-for-halloween-costume.webp"
affiliateIds: ["pumpkin-headbands"]
tags: ["fashion", "halloween", "accessories"]
verdict: "Best for theming"
updatedDate: "Jun 2024"
affiliateProvider: "amazon"
bestFor: ["Theming"]
---

Perfect for Halloween-themed social dances. Lightweight and won't interfere with dancing.
`,Os=Object.freeze(Object.defineProperty({__proto__:null,default:Ds},Symbol.toStringTag,{value:"Module"})),Ns=`---
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
`,Ps=Object.freeze(Object.defineProperty({__proto__:null,default:Ns},Symbol.toStringTag,{value:"Module"})),Es=`---
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
`,Bs=Object.freeze(Object.defineProperty({__proto__:null,default:Es},Symbol.toStringTag,{value:"Module"})),Ls=`---
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
`,js=Object.freeze(Object.defineProperty({__proto__:null,default:Ls},Symbol.toStringTag,{value:"Module"})),Ms=`---
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
`,Fs=Object.freeze(Object.defineProperty({__proto__:null,default:Ms},Symbol.toStringTag,{value:"Module"})),$s=`---
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
`,Ws=Object.freeze(Object.defineProperty({__proto__:null,default:$s},Symbol.toStringTag,{value:"Module"})),Rs=`---
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
`,xs=Object.freeze(Object.defineProperty({__proto__:null,default:Rs},Symbol.toStringTag,{value:"Module"})),zs=`---
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
`,Us=Object.freeze(Object.defineProperty({__proto__:null,default:zs},Symbol.toStringTag,{value:"Module"})),Ks=`---
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
`,qs=Object.freeze(Object.defineProperty({__proto__:null,default:Ks},Symbol.toStringTag,{value:"Module"})),Js=`---
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
`,Hs=Object.freeze(Object.defineProperty({__proto__:null,default:Js},Symbol.toStringTag,{value:"Module"})),Gs=`---
type: resource
title: How to Suede Your Own Dance Shoes
date: '2026-04-12'
author: Ariel Anders, PhD
category: Dance Gear
excerpt: The DIY hack for perfect traction on any ballroom floor.
image: /images/gear/amazon/suede-stick-on-sheets.jpg
affiliateIds:
- suede-sheets
tags:
- diy
- footwear
- budget
verdict: Best Budget Hack
updatedDate: Mar 2024
affiliateProvider: amazon
---


## The Pain Point: Inconsistent Traction

There is nothing worse than arriving at a major WSDC convention only to find that the hotel ballroom floor is either a "slip-and-slide" or effectively a sheet of flypaper. When your equipment fails to provide predictable friction, your technique—and your knee health—takes the hit.

## The Solution: How to Suede Your Shoes

Instead of paying for expensive professional shoes, I use a DIY approach to convert my favorite comfortable sneakers into dance shoes.

### Required Gear

| Asset             | What it does    | Value     |
| ----------------- | --------------- | --------- |
| Adhesive Suede    | Better grip     | High      |
| Isopropyl Alcohol | Cleans the sole | Essential |

### Step-by-Step Protocol

1.  **Clean the sole**: Clean the rubber sole with isopropyl alcohol. Any oils will mess up the adhesive during 4:00 AM social sets.
2.  **Apply suede**: Peel the backing and stick the adhesive suede to the sole. Press firmly.
3.  **Let it cure**: Let the adhesive cure for 24 hours. They will hold up on any social floor.

## Suede Coverage Analysis Diagram

A key to effective traction is selecting the right coverage pattern for your movement style. Here is a comparison:

- **Ball Only:** Offers great spinning capability but minimal breaking control. Slippery on high-speed moves.
- **Split (Ball and Heel separated):** Adds braking power but can catch the edge of the suede during rolling steps.
- **Entire Sticker Coverage (My Preferred Method):** The most consistent friction profile across the entire foot, ensuring safety and predictable slip during complex patterns.

## Performance Notes

These modification have survived 8+ hour social sets at major conventions. The bond is permanent and the friction is highly consistent.

## Verdict

Suede your own shoes. It's the only way to get a truly robust connection on unpredictable ballroom floors.

_Affiliate disclosure: Links in this guide may earn a commission at no cost to you._
`,Vs=Object.freeze(Object.defineProperty({__proto__:null,default:Gs},Symbol.toStringTag,{value:"Module"})),Ys=`---
title: "WCS Scraper: Initial Synchronization & Data Integrity Study"
date: "2026-05-13"
category: "Data Science"
image: "/assets/posts/competition-data-thumb.svg"
excerpt: "Analysis of the initial large-scale synchronization of West Coast Swing competition results, focusing on historical backfill and data accuracy."
---

# WCS Scraper: Initial Synchronization Study

This study documents the initial deployment and synchronization phase of the WCS Scraper tool. Our goal is to provide a comprehensive, transparent, and accurate dataset of West Coast Swing preliminary competition results for research and statistical analysis.

## Synchronization Progress

As of May 2026, we have successfully implemented the core data processing pipeline and completed the following:

- **2026 Data**: Real-time results from the 2026 season are being captured with high accuracy.
- **Historical Results**: We are currently processing results from 2023 to 2025 to provide better historical context for our analysis.
- **Data checks**: All records undergo strict validation to ensure they are correctly assigned to each dancer.

## Data Integrity Focus

We have addressed several critical issues identified during the pilot phase:

1. **Registry Link Resilience**: Competitors without direct WSDC registry links are no longer dropped; they are indexed using robust temporary identifiers.
2. **Result Restoration**: Missing prelim and semi-final data for specific events (e.g., Easter Swing) have been manually audited and restored.
3. **Accuracy Verification**: We use several metadata points to ensure that event locations and dates are correctly associated with scoring records.

## Community Feedback (Interactive Data Lab)

We believe that data integrity is a community-driven effort. If you identify any discrepancies, missing results, or formatting errors in the live dataset, please help us improve the tool.

### Report a Data Issue

We are looking for feedback on:
- Missing historical events from 2023–2025.
- Incorrectly parsed names or scores.
- Events with custom HTML formats that may require specialized parsing logic (e.g., H-Town Throwdown).

**How to contribute:**
Please send an email to [research@ariidance.com](mailto:research@ariidance.com?subject=WCS%20Scraper%20Data%20Feedback) with the following details:
- Event Name & Date
- Link to the original result page (if available)
- Description of the discrepancy

Your input directly helps us improve our data processing and ensure accuracy for the entire community.
`,Qs=Object.freeze(Object.defineProperty({__proto__:null,default:Ys},Symbol.toStringTag,{value:"Module"})),Xs=`---
type: event
title: Boogie by the Bay
date: '2026-10-08'
startDate: '2026-10-08'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: San Francisco's flagship WCS event held in Northern California.
location: Hyatt Regency San Francisco Airport
city: Burlingame, CA
region: NorCal
schedule: October 8 - 11, 2026
url: https://boogiebythebay.com/
heroImage: '/assets/events/boogie-by-the-bay-hero.svg'
description: Boogie by the Bay is the premier West Coast Swing event in Northern California. Hosted by the The Next Generation Swing Dance Club, it features top-tier competitions, workshops, and social dancing in a beautiful waterfront setting near SFO.
whyAttending: >
  The highlight of the NorCal WCS calendar. The level of competition is exceptionally high, and the Sunday night show is always a must-watch.
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

Boogie by the Bay is a cornerstone of the WCS circuit. Held at the Hyatt Regency SFO, the venue features a stunning 10-story atrium and is famous for its late-night social energy and competitive \\"California\\" vibe.

## Flagship weekend packing strategy

Boogie is less about a costume theme and more about showing up prepared for a polished, high-energy NorCal weekend. Prioritize reliable dance shoes, backup shoe maintenance, a portable charger, earplugs, and layers for the SFO/Burlingame weather shift. Since the Hyatt has an outdoor hot tub, don't forget to pack a swimsuit, sunscreen, and a visor.

### Airport Logistics
The hotel is located right next to San Francisco International Airport (SFO), making it extremely convenient for those flying in.
- **Shuttle:** The Hyatt Regency offers a free 24-hour shuttle to and from all SFO terminals.
- **Packing:** Because most attendees fly in, we highly recommend using compression packing cubes to fit your dance wardrobe into a carry-on.

### Hotel Layout
The Hyatt is massive. The ballroom is located on the ground floor, while the atrium (and its famous glass elevators) serves as the social hub. Pro tip: Rooms facing the atrium can be loud during social dancing hours—request an exterior-facing room if you're a light sleeper.

### Weather
October in the Bay Area is usually mild, but Burlingame can be foggy and chilly in the evenings due to its proximity to the water. Bring a light jacket for walks to nearby restaurants.

### Ballroom Pacing
The floor is legendary—large, fast, and often crowded. The spotlight finals and late-night social dancing are major highlights of the weekend.

### Nearby Food
While the hotel restaurant (3Sixty) is convenient, there are several great options within walking distance or a short Uber ride in downtown Burlingame. Max's of Burlingame is a dancer favorite for late-night or pre-comp meals.
`,Zs=Object.freeze(Object.defineProperty({__proto__:null,default:Xs},Symbol.toStringTag,{value:"Module"})),ei=`---
type: event
title: "Jack & Jill O'Rama"
date: "2026-06-04"
startDate: "2026-06-04"
author: "Ariel Anders, PhD"
category: "WSDC Registry Event"
excerpt: "The ultimate West Coast Swing party and competition weekend in Southern California."
location: "Hyatt Regency Orange County"
city: "Garden Grove, CA"
region: "SoCal"
schedule: "June 4 - 8, 2026"
url: "https://jackandjillorama.com"
heroImage: "/assets/events/jjo-hero.svg"
description: >
  Organized by Ben Morris, Jack & Jill O'Rama is one of the most popular events on the circuit. It is famous for its creative competition formats, high-energy social dancing, and prime location near Disneyland.
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
- wild-wild-westie
- swingtacular-the-galactic-open
- boogie-by-the-bay
---

Jack & Jill O'Rama is more than just a competition; it's a celebration of the WCS community. Hosted at the Hyatt Regency Orange County, it's just minutes from Disneyland and features some of the largest ballrooms on the circuit.

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

Browse the full collection at [https://boomtick.printful.me/](https://boomtick.printful.me/) for more styles. Bonus: use the [Printful referral link](https://www.printful.com/give-5-get-5/GZB6C4) for $5 off your order.
`,ti=Object.freeze(Object.defineProperty({__proto__:null,default:ei},Symbol.toStringTag,{value:"Module"})),ni=`---
type: event
title: "Mission City Swing"
date: "2026-05-01"
startDate: "2026-05-01"
author: "Ariel Anders, PhD"
category: "Event"
excerpt: "The premier weekly West Coast Swing social and workshop hub in the South Bay."
location: "San Jose, CA"
city: "San Jose"
region: "NorCal"
schedule: "Every Wednesday"
url: "https://missioncityswing.com"
heroImage: ""
description: "A cornerstone of the NorCal dance community, offering top-tier instruction and a welcoming social environment every Wednesday."

whyAttending: >
  Mission City Swing is the heartbeat of the South Bay WCS community. Whether you're a beginner or a seasoned pro, the welcoming atmosphere and consistent quality of instruction make it a weekly must-visit.
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

Weekly social dance in San Jose.

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
`,si=Object.freeze(Object.defineProperty({__proto__:null,default:ni},Symbol.toStringTag,{value:"Module"})),ii=`---
type: event
title: Phoenix 4th of July
date: '2026-07-02'
startDate: '2026-07-02'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: Heat, pool parties, and high-energy WCS in the Arizona desert.
location: JW Marriott Scottsdale Camelback Inn Resort & Spa
city: Scottsdale, AZ
region: Southwest
schedule: July 2 - 5, 2026
url: https://phx4th.com/
heroImage: '/assets/events/phoenix-4th-of-july-hero.svg'
description: Phoenix 4th of July is a legendary West Coast Swing event known for its incredible resort venue, massive pool parties, and competitive energy. It's one of the largest events in the Southwest and a highlight of the summer circuit.
whyAttending: >
  The combination of a world-class resort and world-class dancing is unbeatable. The pool parties are a unique WCS experience that you have to see to believe.
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
- wild-wild-westie
- jack-and-jill-orama
---

The JW Marriott Desert Ridge is one of the most beautiful venues on the circuit. While the Arizona heat is intense outside, the ballroom is kept cool, and the resort’s lazy river is the perfect place to recover between workshops.

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
`,oi=Object.freeze(Object.defineProperty({__proto__:null,default:ii},Symbol.toStringTag,{value:"Module"})),ri=`---
type: event
draft: true
title: Sample Event Guide
date: '2026-10-01'
startDate: '2026-10-01'
author: Jules Agent
category: Verification Event
excerpt: A fully populated sample event for schema and rendering verification.
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
relatedEvents:
- jack-and-jill-orama
- wild-wild-westie
---

# Sample Event Notes

This is the markdown body content which renders in the Notes section of the event guide.

## Subheading

- Bullet point 1
- Bullet point 2
`,ai=Object.freeze(Object.defineProperty({__proto__:null,default:ri},Symbol.toStringTag,{value:"Module"})),li=`---
type: event
title: SOswing
date: '2026-05-14'
startDate: '2026-05-14'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: A charming WCS experience in beautiful Ashland, OR.
location: Ashland Hills Hotel & Suites
city: Ashland, OR
region: Pacific Northwest
schedule: May 14 - 17, 2026
url: https://soswing.com
heroImage: '/assets/events/soswing-hero.svg'
bestFor: ["Intimate settings", "First-time competitors", "Road-trip vibe"]
description: SOswing offers a unique, community-focused atmosphere in beautiful Ashland. Known for its 'Westie' hospitality, the event features WSDC Jack & Jill competitions, leveled workshops with top-tier pros, and late-night social dancing.
whyAttending: >
  SOswing has the most welcoming, community-first atmosphere on the Pacific Northwest circuit. It's a perfect event to focus on dancing without the pressure of a huge field.
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
  essentialDescription: "Standard recovery and hygiene for the relaxed PNW circuit pace."
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

Ashland is beautiful, small, and surprisingly walkable from the hotel. The Ashland Hills Hotel & Suites has a retro-chic vibe that fits the community feel perfectly. Book early; the room block is limited and often sells out months in advance.

## Ashland travel notes

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
`,ci=Object.freeze(Object.defineProperty({__proto__:null,default:li},Symbol.toStringTag,{value:"Module"})),hi=`---
type: event
title: "Swingtacular: The Galactic Open"
date: '2026-08-06'
startDate: '2026-08-06'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: A sci-fi themed WCS adventure in the San Francisco Bay Area.
location: Hyatt Regency San Francisco Airport
city: Burlingame, CA
region: NorCal
schedule: August 6 - 9, 2026
url: https://swingtacular.com/
heroImage: '/assets/events/swingtacular-hero.svg'
description: Swingtacular is a one-of-a-kind West Coast Swing event with a deep commitment to high production values and its famous Galactic theme. It's a weekend of world-class competition, immersive storytelling, and top-tier social dancing.
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
  shoeDescription: "Reliable footwear for the fast SFO Hyatt ballroom floor."
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

Swingtacular is where WCS meets a full galactic theme weekend. Held at the Hyatt Regency SFO, the venue’s futuristic atrium provides the perfect backdrop for a weekend of sci-fi themed dancing and world-class competition.

## Galactic & Nerd Theme notes

This is the event where metallics, neons, and futuristic accessories make sense.
- **Nerd Night:** A classic Swingtacular tradition. Pack a **nerd set** with glasses and suspenders for a quick and easy costume that doesn't restrict your dancing.
- **Dress to Impress / Alien Theme:** For the big theme night, a **green bodysuit** or metallic reflective gear is the way to go. If you're going all out, an **alien mask** makes for a great grand entrance or hallway photo (just remember to swap it for something more breathable before hitting the social floor!).

Keep all costume pieces dance-safe: no sharp edges, no loose LED strands, and nothing that restricts connection or floorcraft.

## What to pack for the SFO Hyatt

Swingtacular is an airport-hotel event, so the useful gear is practical: a portable charger for long days, packing cubes to keep theme outfits organized, and a steamer for those metallic fabrics. High-quality earplugs are a must; the event is known for its high-production sound and lighting.

### Production & Show Notes
The Saturday night shows are high-production events with professional lighting, sound, and staging. Get to the ballroom early to secure a good seat—it's often standing room only for the showcase.

### Burlingame/SFO Logistics
- **Transport:** Use the free Hyatt SFO shuttle if flying in.
- **Food:** Downtown Burlingame is a short Uber ride away and offers fantastic dining options (Max's is a dancer favorite).
- **Hotel Hub:** The atrium is the place to be for late-night social energy and catching up with friends between workshops.
`,ui=Object.freeze(Object.defineProperty({__proto__:null,default:hi},Symbol.toStringTag,{value:"Module"})),di=`---
type: event
title: "Weekly Classes & Local Dances"
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
description: "Taking regular lessons and hitting the floor for social dancing are absolutely key to building your skills."

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

The best way to learn West Coast Swing is to do it consistently. Taking regular lessons and hitting the floor for social dancing are absolutely key to building your skills and finding your rhythm. While this list is incomplete, it serves as a great starting point for tracking down local communities, practices, and events across different regions.

Here are some of the best regional West Coast Swing event lists and calendars to help you get out on the floor:

## Pacific Northwest (PNW)
*   **[Seattle West Coast Swing Calendar](https://seattleswingdanceclub.com/seattlewcscalendar):** Run by the Seattle Swing Dance Club, this tracks major weekenders and local dances across Washington, Oregon, and Idaho.
*   **Portland WCS Events:** Frequently updated community tracking for social dances in the Portland area.

## Northeast & Mid-Atlantic
*   **[NYCWCS Comprehensive Calendar](https://www.nycwcs.com/):** An all-inclusive dashboard for local practices, pop-ups, and regional workshops in the New York City tri-state area.
*   **[Jersey Westies Calendar](https://jerseywesties.com/):** A dedicated calendar tracking weekly lessons, pop-up parties, and social events across New Jersey.
*   **[UniversityCity Swing Local List](https://www.ucswing.com/philadelphia-west-coast-swing-events):** The go-to resource for Philadelphia and surrounding driving-distance weekenders.

## Midwest
*   **[Madison WCS Club Directory](https://mwcsc.org/dance-events/dance-conventions/):** Centralizes convention tracking, weekenders, and local dances across Wisconsin, Minnesota, and Illinois.
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
`,fi=Object.freeze(Object.defineProperty({__proto__:null,default:di},Symbol.toStringTag,{value:"Module"})),pi=`---
type: event
title: Wild Wild Westie
date: '2026-07-02'
startDate: '2026-07-02'
author: Ariel Anders, PhD
category: WSDC Registry Event
excerpt: A high-energy, competitive WCS weekend in the heart of Texas.
location: Hyatt Regency DFW International Airport, 2334 North International Parkway
city: Dallas, TX
region: South
schedule: July 2 - 5, 2026
url: https://wildwildwestie.com/
heroImage: '/assets/events/wild-wild-westie-hero.svg'
description: Wild Wild Westie (WWW) is one of the most competitive and high-energy events on the WCS circuit. Held over the 4th of July weekend, it attracts top dancers from across the globe for intense competitions and legendary late-night social dancing.
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
  shoeDescription: "The Dallas Hyatt ballroom floor is fantastic but can be fast."
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
---

Wild Wild Westie is famous for its \\"go big or go home\\" Texas attitude. Held at the iconic Hyatt Regency Dallas (the one with the glowing ball on top), it's a weekend of intense dancing, serious competition, and southern hospitality.

## Western theme notes

While our current product selection doesn't include specialized Western dance apparel, this is the perfect weekend to break out your own Western-inspired pieces like denim, bandanas, or boots for hallway photos. For the social floor, stick to breathable pieces that handle the high-energy Texas vibe. Keep Western boots for photos and use proper dance shoes for social dancing to ensure safety and floor compliance.

### Dallas Airport Logistics
- **DFW Airport:** About 25-30 minutes away. This is the primary hub for American Airlines and offers the most flight options.
- **Dallas Love Field (DAL):** About 15 minutes away. This is the primary hub for Southwest Airlines.
- **Transport:** Both airports are easily accessible via Uber/Lyft. DART (light rail) also runs from DFW directly to the hotel (Union Station stop).

### Hotel-Room-Block Urgency
The WWW room block at the Hyatt Regency Dallas is notorious for selling out within minutes of being released. Follow the event's social media closely and be ready to book the second the link goes live.

### Summer Heat Notes
Texas in July is brutally hot. Luckily, the Hyatt is large and fully climate-controlled. You can easily spend the entire weekend without leaving the AC. If you do go outside, be prepared for intense humidity. Even though you're indoors, the Dallas summer heat and intense dancing mean it is useful to pack hydration support and portable fans.

### Comp/Social Energy
The competition field at WWW is deep. Jack & Jill heats can have many couples in certain divisions. The social dancing energy is equally intense, peaking around 2:00 AM and often continuing until the sun comes up over the Dallas skyline.
`,gi=Object.freeze(Object.defineProperty({__proto__:null,default:pi},Symbol.toStringTag,{value:"Module"})),it=Symbol.for("yaml.alias"),Xe=Symbol.for("yaml.document"),q=Symbol.for("yaml.map"),Bt=Symbol.for("yaml.pair"),W=Symbol.for("yaml.scalar"),re=Symbol.for("yaml.seq"),M=Symbol.for("yaml.node.type"),ae=n=>!!n&&typeof n=="object"&&n[M]===it,je=n=>!!n&&typeof n=="object"&&n[M]===Xe,be=n=>!!n&&typeof n=="object"&&n[M]===q,O=n=>!!n&&typeof n=="object"&&n[M]===Bt,I=n=>!!n&&typeof n=="object"&&n[M]===W,we=n=>!!n&&typeof n=="object"&&n[M]===re;function C(n){if(n&&typeof n=="object")switch(n[M]){case q:case re:return!0}return!1}function D(n){if(n&&typeof n=="object")switch(n[M]){case it:case q:case W:case re:return!0}return!1}const Lt=n=>(I(n)||C(n))&&!!n.anchor,J=Symbol("break visit"),mi=Symbol("skip children"),pe=Symbol("remove node");function le(n,e){const t=yi(e);je(n)?Z(null,n.contents,t,Object.freeze([n]))===pe&&(n.contents=null):Z(null,n,t,Object.freeze([]))}le.BREAK=J;le.SKIP=mi;le.REMOVE=pe;function Z(n,e,t,s){const o=bi(n,e,t,s);if(D(o)||O(o))return wi(n,s,o),Z(n,o,t,s);if(typeof o!="symbol"){if(C(e)){s=Object.freeze(s.concat(e));for(let i=0;i<e.items.length;++i){const r=Z(i,e.items[i],t,s);if(typeof r=="number")i=r-1;else{if(r===J)return J;r===pe&&(e.items.splice(i,1),i-=1)}}}else if(O(e)){s=Object.freeze(s.concat(e));const i=Z("key",e.key,t,s);if(i===J)return J;i===pe&&(e.key=null);const r=Z("value",e.value,t,s);if(r===J)return J;r===pe&&(e.value=null)}}return o}function yi(n){return typeof n=="object"&&(n.Collection||n.Node||n.Value)?Object.assign({Alias:n.Node,Map:n.Node,Scalar:n.Node,Seq:n.Node},n.Value&&{Map:n.Value,Scalar:n.Value,Seq:n.Value},n.Collection&&{Map:n.Collection,Seq:n.Collection},n):n}function bi(n,e,t,s){if(typeof t=="function")return t(n,e,s);if(be(e))return t.Map?.(n,e,s);if(we(e))return t.Seq?.(n,e,s);if(O(e))return t.Pair?.(n,e,s);if(I(e))return t.Scalar?.(n,e,s);if(ae(e))return t.Alias?.(n,e,s)}function wi(n,e,t){const s=e[e.length-1];if(C(s))s.items[n]=t;else if(O(s))n==="key"?s.key=t:s.value=t;else if(je(s))s.contents=t;else{const o=ae(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${o} parent`)}}const vi={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},ki=n=>n.replace(/[!,[\]{}]/g,e=>vi[e]);class E{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},E.defaultYaml,e),this.tags=Object.assign({},E.defaultTags,t)}clone(){const e=new E(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new E(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:E.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},E.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:E.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},E.defaultTags),this.atNextDocument=!1);const s=e.trim().split(/[ \t]+/),o=s.shift();switch(o){case"%TAG":{if(s.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[i,r]=s;return this.tags[i]=r,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[i]=s;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;{const r=/^\d+\.\d+$/.test(i);return t(6,`Unsupported YAML version ${i}`,r),!1}}default:return t(0,`Unknown directive ${o}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const r=e.slice(2,-1);return r==="!"||r==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),r)}const[,s,o]=e.match(/^(.*!)([^!]*)$/s);o||t(`The ${e} tag has no suffix`);const i=this.tags[s];if(i)try{return i+decodeURIComponent(o)}catch(r){return t(String(r)),null}return s==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,s]of Object.entries(this.tags))if(e.startsWith(s))return t+ki(e.substring(s.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let o;if(e&&s.length>0&&D(e.contents)){const i={};le(e.contents,(r,a)=>{D(a)&&a.tag&&(i[a.tag]=!0)}),o=Object.keys(i)}else o=[];for(const[i,r]of s)i==="!!"&&r==="tag:yaml.org,2002:"||(!e||o.some(a=>a.startsWith(r)))&&t.push(`%TAG ${i} ${r}`);return t.join(`
`)}}E.defaultYaml={explicit:!1,version:"1.2"};E.defaultTags={"!!":"tag:yaml.org,2002:"};function jt(n){if(/[\x00-\x19\s,[\]{}]/.test(n)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;throw new Error(t)}return!0}function Mt(n){const e=new Set;return le(n,{Value(t,s){s.anchor&&e.add(s.anchor)}}),e}function Ft(n,e){for(let t=1;;++t){const s=`${n}${t}`;if(!e.has(s))return s}}function Si(n,e){const t=[],s=new Map;let o=null;return{onAnchor:i=>{t.push(i),o??(o=Mt(n));const r=Ft(e,o);return o.add(r),r},setAnchors:()=>{for(const i of t){const r=s.get(i);if(typeof r=="object"&&r.anchor&&(I(r.node)||C(r.node)))r.node.anchor=r.anchor;else{const a=new Error("Failed to resolve repeated object (this should not happen)");throw a.source=i,a}}},sourceObjects:s}}function ee(n,e,t,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let o=0,i=s.length;o<i;++o){const r=s[o],a=ee(n,s,String(o),r);a===void 0?delete s[o]:a!==r&&(s[o]=a)}else if(s instanceof Map)for(const o of Array.from(s.keys())){const i=s.get(o),r=ee(n,s,o,i);r===void 0?s.delete(o):r!==i&&s.set(o,r)}else if(s instanceof Set)for(const o of Array.from(s)){const i=ee(n,s,o,o);i===void 0?s.delete(o):i!==o&&(s.delete(o),s.add(i))}else for(const[o,i]of Object.entries(s)){const r=ee(n,s,o,i);r===void 0?delete s[o]:r!==i&&(s[o]=r)}return n.call(e,t,s)}function j(n,e,t){if(Array.isArray(n))return n.map((s,o)=>j(s,String(o),t));if(n&&typeof n.toJSON=="function"){if(!t||!Lt(n))return n.toJSON(e,t);const s={aliasCount:0,count:1,res:void 0};t.anchors.set(n,s),t.onCreate=i=>{s.res=i,delete t.onCreate};const o=n.toJSON(e,t);return t.onCreate&&t.onCreate(o),o}return typeof n=="bigint"&&!t?.keep?Number(n):n}class ot{constructor(e){Object.defineProperty(this,M,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:s,onAnchor:o,reviver:i}={}){if(!je(e))throw new TypeError("A document argument is required");const r={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},a=j(this,"",r);if(typeof o=="function")for(const{count:l,res:c}of r.anchors.values())o(c,l);return typeof i=="function"?ee(i,{"":a},"",a):a}}class rt extends ot{constructor(e){super(it),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if(t?.maxAliasCount===0)throw new ReferenceError("Alias resolution is disabled");let s;t?.aliasResolveCache?s=t.aliasResolveCache:(s=[],le(e,{Node:(i,r)=>{(ae(r)||Lt(r))&&s.push(r)}}),t&&(t.aliasResolveCache=s));let o;for(const i of s){if(i===this)break;i.anchor===this.source&&(o=i)}return o}toJSON(e,t){if(!t)return{source:this.source};const{anchors:s,doc:o,maxAliasCount:i}=t,r=this.resolve(o,t);if(!r){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let a=s.get(r);if(a||(j(r,null,t),a=s.get(r)),a?.res===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(i>=0&&(a.count+=1,a.aliasCount===0&&(a.aliasCount=Oe(o,r,s)),a.count*a.aliasCount>i)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return a.res}toString(e,t,s){const o=`*${this.source}`;if(e){if(jt(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(i)}if(e.implicitKey)return`${o} `}return o}}function Oe(n,e,t){if(ae(e)){const s=e.resolve(n),o=t&&s&&t.get(s);return o?o.count*o.aliasCount:0}else if(C(e)){let s=0;for(const o of e.items){const i=Oe(n,o,t);i>s&&(s=i)}return s}else if(O(e)){const s=Oe(n,e.key,t),o=Oe(n,e.value,t);return Math.max(s,o)}return 1}const $t=n=>!n||typeof n!="function"&&typeof n!="object";class _ extends ot{constructor(e){super(W),this.value=e}toJSON(e,t){return t?.keep?this.value:j(this.value,e,t)}toString(){return String(this.value)}}_.BLOCK_FOLDED="BLOCK_FOLDED";_.BLOCK_LITERAL="BLOCK_LITERAL";_.PLAIN="PLAIN";_.QUOTE_DOUBLE="QUOTE_DOUBLE";_.QUOTE_SINGLE="QUOTE_SINGLE";const _i="tag:yaml.org,2002:";function Ti(n,e,t){if(e){const s=t.filter(i=>i.tag===e),o=s.find(i=>!i.format)??s[0];if(!o)throw new Error(`Tag ${e} not found`);return o}return t.find(s=>s.identify?.(n)&&!s.format)}function me(n,e,t){if(je(n)&&(n=n.contents),D(n))return n;if(O(n)){const u=t.schema[q].createNode?.(t.schema,null,t);return u.items.push(n),u}(n instanceof String||n instanceof Number||n instanceof Boolean||typeof BigInt<"u"&&n instanceof BigInt)&&(n=n.valueOf());const{aliasDuplicateObjects:s,onAnchor:o,onTagObj:i,schema:r,sourceObjects:a}=t;let l;if(s&&n&&typeof n=="object"){if(l=a.get(n),l)return l.anchor??(l.anchor=o(n)),new rt(l.anchor);l={anchor:null,node:null},a.set(n,l)}e?.startsWith("!!")&&(e=_i+e.slice(2));let c=Ti(n,e,r.tags);if(!c){if(n&&typeof n.toJSON=="function"&&(n=n.toJSON()),!n||typeof n!="object"){const u=new _(n);return l&&(l.node=u),u}c=n instanceof Map?r[q]:Symbol.iterator in Object(n)?r[re]:r[q]}i&&(i(c),delete t.onTagObj);const f=c?.createNode?c.createNode(t.schema,n,t):typeof c?.nodeClass?.from=="function"?c.nodeClass.from(t.schema,n,t):new _(n);return e?f.tag=e:c.default||(f.tag=c.tag),l&&(l.node=f),f}function Ee(n,e,t){let s=t;for(let o=e.length-1;o>=0;--o){const i=e[o];if(typeof i=="number"&&Number.isInteger(i)&&i>=0){const r=[];r[i]=s,s=r}else s=new Map([[i,s]])}return me(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:n,sourceObjects:new Map})}const de=n=>n==null||typeof n=="object"&&!!n[Symbol.iterator]().next().done;class Wt extends ot{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(s=>D(s)||O(s)?s.clone(e):s),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(de(e))this.add(t);else{const[s,...o]=e,i=this.get(s,!0);if(C(i))i.addIn(o,t);else if(i===void 0&&this.schema)this.set(s,Ee(this.schema,o,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${o}`)}}deleteIn(e){const[t,...s]=e;if(s.length===0)return this.delete(t);const o=this.get(t,!0);if(C(o))return o.deleteIn(s);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`)}getIn(e,t){const[s,...o]=e,i=this.get(s,!0);return o.length===0?!t&&I(i)?i.value:i:C(i)?i.getIn(o,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!O(t))return!1;const s=t.value;return s==null||e&&I(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(e){const[t,...s]=e;if(s.length===0)return this.has(t);const o=this.get(t,!0);return C(o)?o.hasIn(s):!1}setIn(e,t){const[s,...o]=e;if(o.length===0)this.set(s,t);else{const i=this.get(s,!0);if(C(i))i.setIn(o,t);else if(i===void 0&&this.schema)this.set(s,Ee(this.schema,o,t));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${o}`)}}}const Ai=n=>n.replace(/^(?!$)(?: $)?/gm,"#");function R(n,e){return/^\n+$/.test(n)?n.substring(1):e?n.replace(/^(?! *$)/gm,e):n}const H=(n,e,t)=>n.endsWith(`
`)?R(t,e):t.includes(`
`)?`
`+R(t,e):(n.endsWith(" ")?"":" ")+t,Rt="flow",Ze="block",Ne="quoted";function Me(n,e,t="flow",{indentAtStart:s,lineWidth:o=80,minContentWidth:i=20,onFold:r,onOverflow:a}={}){if(!o||o<0)return n;o<i&&(i=0);const l=Math.max(1+i,1+o-e.length);if(n.length<=l)return n;const c=[],f={};let u=o-e.length;typeof s=="number"&&(s>o-Math.max(2,i)?c.push(0):u=o-s);let d,p,m=!1,h=-1,g=-1,b=-1;t===Ze&&(h=St(n,h,e.length),h!==-1&&(u=h+l));for(let v;v=n[h+=1];){if(t===Ne&&v==="\\"){switch(g=h,n[h+1]){case"x":h+=3;break;case"u":h+=5;break;case"U":h+=9;break;default:h+=1}b=h}if(v===`
`)t===Ze&&(h=St(n,h,e.length)),u=h+e.length+l,d=void 0;else{if(v===" "&&p&&p!==" "&&p!==`
`&&p!=="	"){const k=n[h+1];k&&k!==" "&&k!==`
`&&k!=="	"&&(d=h)}if(h>=u)if(d)c.push(d),u=d+l,d=void 0;else if(t===Ne){for(;p===" "||p==="	";)p=v,v=n[h+=1],m=!0;const k=h>b+1?h-2:g-1;if(f[k])return n;c.push(k),f[k]=!0,u=k+l,d=void 0}else m=!0}p=v}if(m&&a&&a(),c.length===0)return n;r&&r();let w=n.slice(0,c[0]);for(let v=0;v<c.length;++v){const k=c[v],S=c[v+1]||n.length;k===0?w=`
${e}${n.slice(0,S)}`:(t===Ne&&f[k]&&(w+=`${n[k]}\\`),w+=`
${e}${n.slice(k+1,S)}`)}return w}function St(n,e,t){let s=e,o=e+1,i=n[o];for(;i===" "||i==="	";)if(e<o+t)i=n[++e];else{do i=n[++e];while(i&&i!==`
`);s=e,o=e+1,i=n[o]}return s}const Fe=(n,e)=>({indentAtStart:e?n.indent.length:n.indentAtStart,lineWidth:n.options.lineWidth,minContentWidth:n.options.minContentWidth}),$e=n=>/^(%|---|\.\.\.)/m.test(n);function Ii(n,e,t){if(!e||e<0)return!1;const s=e-t,o=n.length;if(o<=s)return!1;for(let i=0,r=0;i<o;++i)if(n[i]===`
`){if(i-r>s)return!0;if(r=i+1,o-r<=s)return!1}return!0}function ge(n,e){const t=JSON.stringify(n);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:s}=e,o=e.options.doubleQuotedMinMultiLineLength,i=e.indent||($e(n)?"  ":"");let r="",a=0;for(let l=0,c=t[l];c;c=t[++l])if(c===" "&&t[l+1]==="\\"&&t[l+2]==="n"&&(r+=t.slice(a,l)+"\\ ",l+=1,a=l,c="\\"),c==="\\")switch(t[l+1]){case"u":{r+=t.slice(a,l);const f=t.substr(l+2,4);switch(f){case"0000":r+="\\0";break;case"0007":r+="\\a";break;case"000b":r+="\\v";break;case"001b":r+="\\e";break;case"0085":r+="\\N";break;case"00a0":r+="\\_";break;case"2028":r+="\\L";break;case"2029":r+="\\P";break;default:f.substr(0,2)==="00"?r+="\\x"+f.substr(2):r+=t.substr(l,6)}l+=5,a=l+1}break;case"n":if(s||t[l+2]==='"'||t.length<o)l+=1;else{for(r+=t.slice(a,l)+`

`;t[l+2]==="\\"&&t[l+3]==="n"&&t[l+4]!=='"';)r+=`
`,l+=2;r+=i,t[l+2]===" "&&(r+="\\"),l+=1,a=l+1}break;default:l+=1}return r=a?r+t.slice(a):t,s?r:Me(r,i,Ne,Fe(e,!1))}function et(n,e){if(e.options.singleQuote===!1||e.implicitKey&&n.includes(`
`)||/[ \t]\n|\n[ \t]/.test(n))return ge(n,e);const t=e.indent||($e(n)?"  ":""),s="'"+n.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?s:Me(s,t,Rt,Fe(e,!1))}function te(n,e){const{singleQuote:t}=e.options;let s;if(t===!1)s=ge;else{const o=n.includes('"'),i=n.includes("'");o&&!i?s=et:i&&!o?s=ge:s=t?et:ge}return s(n,e)}let tt;try{tt=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{tt=/\n+(?!\n|$)/g}function Pe({comment:n,type:e,value:t},s,o,i){const{blockQuote:r,commentString:a,lineWidth:l}=s.options;if(!r||/\n[\t ]+$/.test(t))return te(t,s);const c=s.indent||(s.forceBlockIndent||$e(t)?"  ":""),f=r==="literal"?!0:r==="folded"||e===_.BLOCK_FOLDED?!1:e===_.BLOCK_LITERAL?!0:!Ii(t,l,c.length);if(!t)return f?`|
`:`>
`;let u,d;for(d=t.length;d>0;--d){const S=t[d-1];if(S!==`
`&&S!=="	"&&S!==" ")break}let p=t.substring(d);const m=p.indexOf(`
`);m===-1?u="-":t===p||m!==p.length-1?(u="+",i&&i()):u="",p&&(t=t.slice(0,-p.length),p[p.length-1]===`
`&&(p=p.slice(0,-1)),p=p.replace(tt,`$&${c}`));let h=!1,g,b=-1;for(g=0;g<t.length;++g){const S=t[g];if(S===" ")h=!0;else if(S===`
`)b=g;else break}let w=t.substring(0,b<g?b+1:g);w&&(t=t.substring(w.length),w=w.replace(/\n+/g,`$&${c}`));let k=(h?c?"2":"1":"")+u;if(n&&(k+=" "+a(n.replace(/ ?[\r\n]+/g," ")),o&&o()),!f){const S=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${c}`);let T=!1;const A=Fe(s,!0);r!=="folded"&&e!==_.BLOCK_FOLDED&&(A.onOverflow=()=>{T=!0});const y=Me(`${w}${S}${p}`,c,Ze,A);if(!T)return`>${k}
${c}${y}`}return t=t.replace(/\n+/g,`$&${c}`),`|${k}
${c}${w}${t}${p}`}function Ci(n,e,t,s){const{type:o,value:i}=n,{actualString:r,implicitKey:a,indent:l,indentStep:c,inFlow:f}=e;if(a&&i.includes(`
`)||f&&/[[\]{},]/.test(i))return te(i,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(i))return a||f||!i.includes(`
`)?te(i,e):Pe(n,e,t,s);if(!a&&!f&&o!==_.PLAIN&&i.includes(`
`))return Pe(n,e,t,s);if($e(i)){if(l==="")return e.forceBlockIndent=!0,Pe(n,e,t,s);if(a&&l===c)return te(i,e)}const u=i.replace(/\n+/g,`$&
${l}`);if(r){const d=h=>h.default&&h.tag!=="tag:yaml.org,2002:str"&&h.test?.test(u),{compat:p,tags:m}=e.doc.schema;if(m.some(d)||p?.some(d))return te(i,e)}return a?u:Me(u,l,Rt,Fe(e,!1))}function at(n,e,t,s){const{implicitKey:o,inFlow:i}=e,r=typeof n.value=="string"?n:Object.assign({},n,{value:String(n.value)});let{type:a}=n;a!==_.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value)&&(a=_.QUOTE_DOUBLE);const l=f=>{switch(f){case _.BLOCK_FOLDED:case _.BLOCK_LITERAL:return o||i?te(r.value,e):Pe(r,e,t,s);case _.QUOTE_DOUBLE:return ge(r.value,e);case _.QUOTE_SINGLE:return et(r.value,e);case _.PLAIN:return Ci(r,e,t,s);default:return null}};let c=l(a);if(c===null){const{defaultKeyType:f,defaultStringType:u}=e.options,d=o&&f||u;if(c=l(d),c===null)throw new Error(`Unsupported default string type ${d}`)}return c}function xt(n,e){const t=Object.assign({blockQuote:!0,commentString:Ai,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},n.schema.toStringOptions,e);let s;switch(t.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:n,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:s,options:t}}function Di(n,e){if(e.tag){const o=n.filter(i=>i.tag===e.tag);if(o.length>0)return o.find(i=>i.format===e.format)??o[0]}let t,s;if(I(e)){s=e.value;let o=n.filter(i=>i.identify?.(s));if(o.length>1){const i=o.filter(r=>r.test);i.length>0&&(o=i)}t=o.find(i=>i.format===e.format)??o.find(i=>!i.format)}else s=e,t=n.find(o=>o.nodeClass&&s instanceof o.nodeClass);if(!t){const o=s?.constructor?.name??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${o} value`)}return t}function Oi(n,e,{anchors:t,doc:s}){if(!s.directives)return"";const o=[],i=(I(n)||C(n))&&n.anchor;i&&jt(i)&&(t.add(i),o.push(`&${i}`));const r=n.tag??(e.default?null:e.tag);return r&&o.push(s.directives.tagString(r)),o.join(" ")}function ie(n,e,t,s){if(O(n))return n.toString(e,t,s);if(ae(n)){if(e.doc.directives)return n.toString(e);if(e.resolvedAliases?.has(n))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(n):e.resolvedAliases=new Set([n]),n=n.resolve(e.doc)}let o;const i=D(n)?n:e.doc.createNode(n,{onTagObj:l=>o=l});o??(o=Di(e.doc.schema.tags,i));const r=Oi(i,o,e);r.length>0&&(e.indentAtStart=(e.indentAtStart??0)+r.length+1);const a=typeof o.stringify=="function"?o.stringify(i,e,t,s):I(i)?at(i,e,t,s):i.toString(e,t,s);return r?I(i)||a[0]==="{"||a[0]==="["?`${r} ${a}`:`${r}
${e.indent}${a}`:a}function Ni({key:n,value:e},t,s,o){const{allNullValues:i,doc:r,indent:a,indentStep:l,options:{commentString:c,indentSeq:f,simpleKeys:u}}=t;let d=D(n)&&n.comment||null;if(u){if(d)throw new Error("With simple keys, key nodes cannot have comments");if(C(n)||!D(n)&&typeof n=="object"){const A="With simple keys, collection cannot be used as a key value";throw new Error(A)}}let p=!u&&(!n||d&&e==null&&!t.inFlow||C(n)||(I(n)?n.type===_.BLOCK_FOLDED||n.type===_.BLOCK_LITERAL:typeof n=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!p&&(u||!i),indent:a+l});let m=!1,h=!1,g=ie(n,t,()=>m=!0,()=>h=!0);if(!p&&!t.inFlow&&g.length>1024){if(u)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");p=!0}if(t.inFlow){if(i||e==null)return m&&s&&s(),g===""?"?":p?`? ${g}`:g}else if(i&&!u||e==null&&p)return g=`? ${g}`,d&&!m?g+=H(g,t.indent,c(d)):h&&o&&o(),g;m&&(d=null),p?(d&&(g+=H(g,t.indent,c(d))),g=`? ${g}
${a}:`):(g=`${g}:`,d&&(g+=H(g,t.indent,c(d))));let b,w,v;D(e)?(b=!!e.spaceBefore,w=e.commentBefore,v=e.comment):(b=!1,w=null,v=null,e&&typeof e=="object"&&(e=r.createNode(e))),t.implicitKey=!1,!p&&!d&&I(e)&&(t.indentAtStart=g.length+1),h=!1,!f&&l.length>=2&&!t.inFlow&&!p&&we(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let k=!1;const S=ie(e,t,()=>k=!0,()=>h=!0);let T=" ";if(d||b||w){if(T=b?`
`:"",w){const A=c(w);T+=`
${R(A,t.indent)}`}S===""&&!t.inFlow?T===`
`&&v&&(T=`

`):T+=`
${t.indent}`}else if(!p&&C(e)){const A=S[0],y=S.indexOf(`
`),N=y!==-1,z=t.inFlow??e.flow??e.items.length===0;if(N||!z){let Y=!1;if(N&&(A==="&"||A==="!")){let P=S.indexOf(" ");A==="&"&&P!==-1&&P<y&&S[P+1]==="!"&&(P=S.indexOf(" ",P+1)),(P===-1||y<P)&&(Y=!0)}Y||(T=`
${t.indent}`)}}else(S===""||S[0]===`
`)&&(T="");return g+=T+S,t.inFlow?k&&s&&s():v&&!k?g+=H(g,t.indent,c(v)):h&&o&&o(),g}function zt(n,e){(n==="debug"||n==="warn")&&console.warn(e)}const Se="<<",x={identify:n=>n===Se||typeof n=="symbol"&&n.description===Se,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new _(Symbol(Se)),{addToJSMap:Ut}),stringify:()=>Se},Pi=(n,e)=>(x.identify(e)||I(e)&&(!e.type||e.type===_.PLAIN)&&x.identify(e.value))&&n?.doc.schema.tags.some(t=>t.tag===x.tag&&t.default);function Ut(n,e,t){const s=Kt(n,t);if(we(s))for(const o of s.items)qe(n,e,o);else if(Array.isArray(s))for(const o of s)qe(n,e,o);else qe(n,e,s)}function qe(n,e,t){const s=Kt(n,t);if(!be(s))throw new Error("Merge sources must be maps or map aliases");const o=s.toJSON(null,n,Map);for(const[i,r]of o)e instanceof Map?e.has(i)||e.set(i,r):e instanceof Set?e.add(i):Object.prototype.hasOwnProperty.call(e,i)||Object.defineProperty(e,i,{value:r,writable:!0,enumerable:!0,configurable:!0});return e}function Kt(n,e){return n&&ae(e)?e.resolve(n.doc,n):e}function qt(n,e,{key:t,value:s}){if(D(t)&&t.addToJSMap)t.addToJSMap(n,e,s);else if(Pi(n,t))Ut(n,e,s);else{const o=j(t,"",n);if(e instanceof Map)e.set(o,j(s,o,n));else if(e instanceof Set)e.add(o);else{const i=Ei(t,o,n),r=j(s,i,n);i in e?Object.defineProperty(e,i,{value:r,writable:!0,enumerable:!0,configurable:!0}):e[i]=r}}return e}function Ei(n,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(D(n)&&t?.doc){const s=xt(t.doc,{});s.anchors=new Set;for(const i of t.anchors.keys())s.anchors.add(i.anchor);s.inFlow=!0,s.inStringifyKey=!0;const o=n.toString(s);if(!t.mapKeyWarned){let i=JSON.stringify(o);i.length>40&&(i=i.substring(0,36)+'..."'),zt(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${i}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return o}return JSON.stringify(e)}function lt(n,e,t){const s=me(n,void 0,t),o=me(e,void 0,t);return new B(s,o)}class B{constructor(e,t=null){Object.defineProperty(this,M,{value:Bt}),this.key=e,this.value=t}clone(e){let{key:t,value:s}=this;return D(t)&&(t=t.clone(e)),D(s)&&(s=s.clone(e)),new B(t,s)}toJSON(e,t){const s=t?.mapAsMap?new Map:{};return qt(t,s,this)}toString(e,t,s){return e?.doc?Ni(this,e,t,s):JSON.stringify(this)}}function Jt(n,e,t){return(e.inFlow??n.flow?Li:Bi)(n,e,t)}function Bi({comment:n,items:e},t,{blockItemPrefix:s,flowChars:o,itemIndent:i,onChompKeep:r,onComment:a}){const{indent:l,options:{commentString:c}}=t,f=Object.assign({},t,{indent:i,type:null});let u=!1;const d=[];for(let m=0;m<e.length;++m){const h=e[m];let g=null;if(D(h))!u&&h.spaceBefore&&d.push(""),Be(t,d,h.commentBefore,u),h.comment&&(g=h.comment);else if(O(h)){const w=D(h.key)?h.key:null;w&&(!u&&w.spaceBefore&&d.push(""),Be(t,d,w.commentBefore,u))}u=!1;let b=ie(h,f,()=>g=null,()=>u=!0);g&&(b+=H(b,i,c(g))),u&&g&&(u=!1),d.push(s+b)}let p;if(d.length===0)p=o.start+o.end;else{p=d[0];for(let m=1;m<d.length;++m){const h=d[m];p+=h?`
${l}${h}`:`
`}}return n?(p+=`
`+R(c(n),l),a&&a()):u&&r&&r(),p}function Li({items:n},e,{flowChars:t,itemIndent:s}){const{indent:o,indentStep:i,flowCollectionPadding:r,options:{commentString:a}}=e;s+=i;const l=Object.assign({},e,{indent:s,inFlow:!0,type:null});let c=!1,f=0;const u=[];for(let m=0;m<n.length;++m){const h=n[m];let g=null;if(D(h))h.spaceBefore&&u.push(""),Be(e,u,h.commentBefore,!1),h.comment&&(g=h.comment);else if(O(h)){const w=D(h.key)?h.key:null;w&&(w.spaceBefore&&u.push(""),Be(e,u,w.commentBefore,!1),w.comment&&(c=!0));const v=D(h.value)?h.value:null;v?(v.comment&&(g=v.comment),v.commentBefore&&(c=!0)):h.value==null&&w?.comment&&(g=w.comment)}g&&(c=!0);let b=ie(h,l,()=>g=null);c||(c=u.length>f||b.includes(`
`)),m<n.length-1?b+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(c||(c=u.reduce((w,v)=>w+v.length+2,2)+(b.length+2)>e.options.lineWidth)),c&&(b+=",")),g&&(b+=H(b,s,a(g))),u.push(b),f=u.length}const{start:d,end:p}=t;if(u.length===0)return d+p;if(!c){const m=u.reduce((h,g)=>h+g.length+2,2);c=e.options.lineWidth>0&&m>e.options.lineWidth}if(c){let m=d;for(const h of u)m+=h?`
${i}${o}${h}`:`
`;return`${m}
${o}${p}`}else return`${d}${r}${u.join(" ")}${r}${p}`}function Be({indent:n,options:{commentString:e}},t,s,o){if(s&&o&&(s=s.replace(/^\n+/,"")),s){const i=R(e(s),n);t.push(i.trimStart())}}function G(n,e){const t=I(e)?e.value:e;for(const s of n)if(O(s)&&(s.key===e||s.key===t||I(s.key)&&s.key.value===t))return s}class L extends Wt{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(q,e),this.items=[]}static from(e,t,s){const{keepUndefined:o,replacer:i}=s,r=new this(e),a=(l,c)=>{if(typeof i=="function")c=i.call(t,l,c);else if(Array.isArray(i)&&!i.includes(l))return;(c!==void 0||o)&&r.items.push(lt(l,c,s))};if(t instanceof Map)for(const[l,c]of t)a(l,c);else if(t&&typeof t=="object")for(const l of Object.keys(t))a(l,t[l]);return typeof e.sortMapEntries=="function"&&r.items.sort(e.sortMapEntries),r}add(e,t){let s;O(e)?s=e:!e||typeof e!="object"||!("key"in e)?s=new B(e,e?.value):s=new B(e.key,e.value);const o=G(this.items,s.key),i=this.schema?.sortMapEntries;if(o){if(!t)throw new Error(`Key ${s.key} already set`);I(o.value)&&$t(s.value)?o.value.value=s.value:o.value=s.value}else if(i){const r=this.items.findIndex(a=>i(s,a)<0);r===-1?this.items.push(s):this.items.splice(r,0,s)}else this.items.push(s)}delete(e){const t=G(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const o=G(this.items,e)?.value;return(!t&&I(o)?o.value:o)??void 0}has(e){return!!G(this.items,e)}set(e,t){this.add(new B(e,t),!0)}toJSON(e,t,s){const o=s?new s:t?.mapAsMap?new Map:{};t?.onCreate&&t.onCreate(o);for(const i of this.items)qt(t,o,i);return o}toString(e,t,s){if(!e)return JSON.stringify(this);for(const o of this.items)if(!O(o))throw new Error(`Map items must all be pairs; found ${JSON.stringify(o)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),Jt(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:s,onComment:t})}}const ce={collection:"map",default:!0,nodeClass:L,tag:"tag:yaml.org,2002:map",resolve(n,e){return be(n)||e("Expected a mapping for this tag"),n},createNode:(n,e,t)=>L.from(n,e,t)};class V extends Wt{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(re,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=_e(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const s=_e(e);if(typeof s!="number")return;const o=this.items[s];return!t&&I(o)?o.value:o}has(e){const t=_e(e);return typeof t=="number"&&t<this.items.length}set(e,t){const s=_e(e);if(typeof s!="number")throw new Error(`Expected a valid index, not ${e}.`);const o=this.items[s];I(o)&&$t(t)?o.value=t:this.items[s]=t}toJSON(e,t){const s=[];t?.onCreate&&t.onCreate(s);let o=0;for(const i of this.items)s.push(j(i,String(o++),t));return s}toString(e,t,s){return e?Jt(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:s,onComment:t}):JSON.stringify(this)}static from(e,t,s){const{replacer:o}=s,i=new this(e);if(t&&Symbol.iterator in Object(t)){let r=0;for(let a of t){if(typeof o=="function"){const l=t instanceof Set?a:String(r++);a=o.call(t,l,a)}i.items.push(me(a,void 0,s))}}return i}}function _e(n){let e=I(n)?n.value:n;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const he={collection:"seq",default:!0,nodeClass:V,tag:"tag:yaml.org,2002:seq",resolve(n,e){return we(n)||e("Expected a sequence for this tag"),n},createNode:(n,e,t)=>V.from(n,e,t)},We={identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify(n,e,t,s){return e=Object.assign({actualString:!0},e),at(n,e,t,s)}},Re={identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new _(null),stringify:({source:n},e)=>typeof n=="string"&&Re.test.test(n)?n:e.options.nullStr},ct={identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:n=>new _(n[0]==="t"||n[0]==="T"),stringify({source:n,value:e},t){if(n&&ct.test.test(n)){const s=n[0]==="t"||n[0]==="T";if(e===s)return n}return e?t.options.trueStr:t.options.falseStr}};function $({format:n,minFractionDigits:e,tag:t,value:s}){if(typeof s=="bigint")return String(s);const o=typeof s=="number"?s:Number(s);if(!isFinite(o))return isNaN(o)?".nan":o<0?"-.inf":".inf";let i=Object.is(s,-0)?"-0":JSON.stringify(s);if(!n&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(i)&&!i.includes("e")){let r=i.indexOf(".");r<0&&(r=i.length,i+=".");let a=e-(i.length-r-1);for(;a-- >0;)i+="0"}return i}const Ht={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:$},Gt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():$(n)}},Vt={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(n){const e=new _(parseFloat(n)),t=n.indexOf(".");return t!==-1&&n[n.length-1]==="0"&&(e.minFractionDigits=n.length-t-1),e},stringify:$},xe=n=>typeof n=="bigint"||Number.isInteger(n),ht=(n,e,t,{intAsBigInt:s})=>s?BigInt(n):parseInt(n.substring(e),t);function Yt(n,e,t){const{value:s}=n;return xe(s)&&s>=0?t+s.toString(e):$(n)}const Qt={identify:n=>xe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(n,e,t)=>ht(n,2,8,t),stringify:n=>Yt(n,8,"0o")},Xt={identify:xe,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(n,e,t)=>ht(n,0,10,t),stringify:$},Zt={identify:n=>xe(n)&&n>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(n,e,t)=>ht(n,2,16,t),stringify:n=>Yt(n,16,"0x")},ji=[ce,he,We,Re,ct,Qt,Xt,Zt,Ht,Gt,Vt];function _t(n){return typeof n=="bigint"||Number.isInteger(n)}const Te=({value:n})=>JSON.stringify(n),Mi=[{identify:n=>typeof n=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:n=>n,stringify:Te},{identify:n=>n==null,createNode:()=>new _(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Te},{identify:n=>typeof n=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:n=>n==="true",stringify:Te},{identify:_t,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(n,e,{intAsBigInt:t})=>t?BigInt(n):parseInt(n,10),stringify:({value:n})=>_t(n)?n.toString():JSON.stringify(n)},{identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:n=>parseFloat(n),stringify:Te}],Fi={default:!0,tag:"",test:/^/,resolve(n,e){return e(`Unresolved plain scalar ${JSON.stringify(n)}`),n}},$i=[ce,he].concat(Mi,Fi),ut={identify:n=>n instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(n,e){if(typeof atob=="function"){const t=atob(n.replace(/[\n\r]/g,"")),s=new Uint8Array(t.length);for(let o=0;o<t.length;++o)s[o]=t.charCodeAt(o);return s}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),n},stringify({comment:n,type:e,value:t},s,o,i){if(!t)return"";const r=t;let a;if(typeof btoa=="function"){let l="";for(let c=0;c<r.length;++c)l+=String.fromCharCode(r[c]);a=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=_.BLOCK_LITERAL),e!==_.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),c=Math.ceil(a.length/l),f=new Array(c);for(let u=0,d=0;u<c;++u,d+=l)f[u]=a.substr(d,l);a=f.join(e===_.BLOCK_LITERAL?`
`:" ")}return at({comment:n,type:e,value:a},s,o,i)}};function en(n,e){if(we(n))for(let t=0;t<n.items.length;++t){let s=n.items[t];if(!O(s)){if(be(s)){s.items.length>1&&e("Each pair must have its own sequence indicator");const o=s.items[0]||new B(new _(null));if(s.commentBefore&&(o.key.commentBefore=o.key.commentBefore?`${s.commentBefore}
${o.key.commentBefore}`:s.commentBefore),s.comment){const i=o.value??o.key;i.comment=i.comment?`${s.comment}
${i.comment}`:s.comment}s=o}n.items[t]=O(s)?s:new B(s)}}else e("Expected a sequence for this tag");return n}function tn(n,e,t){const{replacer:s}=t,o=new V(n);o.tag="tag:yaml.org,2002:pairs";let i=0;if(e&&Symbol.iterator in Object(e))for(let r of e){typeof s=="function"&&(r=s.call(e,String(i++),r));let a,l;if(Array.isArray(r))if(r.length===2)a=r[0],l=r[1];else throw new TypeError(`Expected [key, value] tuple: ${r}`);else if(r&&r instanceof Object){const c=Object.keys(r);if(c.length===1)a=c[0],l=r[a];else throw new TypeError(`Expected tuple with one key, not ${c.length} keys`)}else a=r;o.items.push(lt(a,l,t))}return o}const dt={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:en,createNode:tn};class ne extends V{constructor(){super(),this.add=L.prototype.add.bind(this),this.delete=L.prototype.delete.bind(this),this.get=L.prototype.get.bind(this),this.has=L.prototype.has.bind(this),this.set=L.prototype.set.bind(this),this.tag=ne.tag}toJSON(e,t){if(!t)return super.toJSON(e);const s=new Map;t?.onCreate&&t.onCreate(s);for(const o of this.items){let i,r;if(O(o)?(i=j(o.key,"",t),r=j(o.value,i,t)):i=j(o,"",t),s.has(i))throw new Error("Ordered maps must not include duplicate keys");s.set(i,r)}return s}static from(e,t,s){const o=tn(e,t,s),i=new this;return i.items=o.items,i}}ne.tag="tag:yaml.org,2002:omap";const ft={collection:"seq",identify:n=>n instanceof Map,nodeClass:ne,default:!1,tag:"tag:yaml.org,2002:omap",resolve(n,e){const t=en(n,e),s=[];for(const{key:o}of t.items)I(o)&&(s.includes(o.value)?e(`Ordered maps must not include duplicate keys: ${o.value}`):s.push(o.value));return Object.assign(new ne,t)},createNode:(n,e,t)=>ne.from(n,e,t)};function nn({value:n,source:e},t){return e&&(n?sn:on).test.test(e)?e:n?t.options.trueStr:t.options.falseStr}const sn={identify:n=>n===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new _(!0),stringify:nn},on={identify:n=>n===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new _(!1),stringify:nn},Wi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:n=>n.slice(-3).toLowerCase()==="nan"?NaN:n[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:$},Ri={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:n=>parseFloat(n.replace(/_/g,"")),stringify(n){const e=Number(n.value);return isFinite(e)?e.toExponential():$(n)}},xi={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(n){const e=new _(parseFloat(n.replace(/_/g,""))),t=n.indexOf(".");if(t!==-1){const s=n.substring(t+1).replace(/_/g,"");s[s.length-1]==="0"&&(e.minFractionDigits=s.length)}return e},stringify:$},ve=n=>typeof n=="bigint"||Number.isInteger(n);function ze(n,e,t,{intAsBigInt:s}){const o=n[0];if((o==="-"||o==="+")&&(e+=1),n=n.substring(e).replace(/_/g,""),s){switch(t){case 2:n=`0b${n}`;break;case 8:n=`0o${n}`;break;case 16:n=`0x${n}`;break}const r=BigInt(n);return o==="-"?BigInt(-1)*r:r}const i=parseInt(n,t);return o==="-"?-1*i:i}function pt(n,e,t){const{value:s}=n;if(ve(s)){const o=s.toString(e);return s<0?"-"+t+o.substr(1):t+o}return $(n)}const zi={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(n,e,t)=>ze(n,2,2,t),stringify:n=>pt(n,2,"0b")},Ui={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(n,e,t)=>ze(n,1,8,t),stringify:n=>pt(n,8,"0")},Ki={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(n,e,t)=>ze(n,0,10,t),stringify:$},qi={identify:ve,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(n,e,t)=>ze(n,2,16,t),stringify:n=>pt(n,16,"0x")};class se extends L{constructor(e){super(e),this.tag=se.tag}add(e){let t;O(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new B(e.key,null):t=new B(e,null),G(this.items,t.key)||this.items.push(t)}get(e,t){const s=G(this.items,e);return!t&&O(s)?I(s.key)?s.key.value:s.key:s}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const s=G(this.items,e);s&&!t?this.items.splice(this.items.indexOf(s),1):!s&&t&&this.items.push(new B(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,s){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,s);throw new Error("Set items must all have null values")}static from(e,t,s){const{replacer:o}=s,i=new this(e);if(t&&Symbol.iterator in Object(t))for(let r of t)typeof o=="function"&&(r=o.call(t,r,r)),i.items.push(lt(r,null,s));return i}}se.tag="tag:yaml.org,2002:set";const gt={collection:"map",identify:n=>n instanceof Set,nodeClass:se,default:!1,tag:"tag:yaml.org,2002:set",createNode:(n,e,t)=>se.from(n,e,t),resolve(n,e){if(be(n)){if(n.hasAllNullValues(!0))return Object.assign(new se,n);e("Set items must all have null values")}else e("Expected a mapping for this tag");return n}};function mt(n,e){const t=n[0],s=t==="-"||t==="+"?n.substring(1):n,o=r=>e?BigInt(r):Number(r),i=s.replace(/_/g,"").split(":").reduce((r,a)=>r*o(60)+o(a),o(0));return t==="-"?o(-1)*i:i}function rn(n){let{value:e}=n,t=r=>r;if(typeof e=="bigint")t=r=>BigInt(r);else if(isNaN(e)||!isFinite(e))return $(n);let s="";e<0&&(s="-",e*=t(-1));const o=t(60),i=[e%o];return e<60?i.unshift(0):(e=(e-i[0])/o,i.unshift(e%o),e>=60&&(e=(e-i[0])/o,i.unshift(e))),s+i.map(r=>String(r).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const an={identify:n=>typeof n=="bigint"||Number.isInteger(n),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(n,e,{intAsBigInt:t})=>mt(n,t),stringify:rn},ln={identify:n=>typeof n=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:n=>mt(n,!1),stringify:rn},Ue={identify:n=>n instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(n){const e=n.match(Ue.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,s,o,i,r,a]=e.map(Number),l=e[7]?Number((e[7]+"00").substr(1,3)):0;let c=Date.UTC(t,s-1,o,i||0,r||0,a||0,l);const f=e[8];if(f&&f!=="Z"){let u=mt(f,!1);Math.abs(u)<30&&(u*=60),c-=6e4*u}return new Date(c)},stringify:({value:n})=>n?.toISOString().replace(/(T00:00:00)?\.000Z$/,"")??""},Tt=[ce,he,We,Re,sn,on,zi,Ui,Ki,qi,Wi,Ri,xi,ut,x,ft,dt,gt,an,ln,Ue],At=new Map([["core",ji],["failsafe",[ce,he,We]],["json",$i],["yaml11",Tt],["yaml-1.1",Tt]]),It={binary:ut,bool:ct,float:Vt,floatExp:Gt,floatNaN:Ht,floatTime:ln,int:Xt,intHex:Zt,intOct:Qt,intTime:an,map:ce,merge:x,null:Re,omap:ft,pairs:dt,seq:he,set:gt,timestamp:Ue},Ji={"tag:yaml.org,2002:binary":ut,"tag:yaml.org,2002:merge":x,"tag:yaml.org,2002:omap":ft,"tag:yaml.org,2002:pairs":dt,"tag:yaml.org,2002:set":gt,"tag:yaml.org,2002:timestamp":Ue};function Je(n,e,t){const s=At.get(e);if(s&&!n)return t&&!s.includes(x)?s.concat(x):s.slice();let o=s;if(!o)if(Array.isArray(n))o=[];else{const i=Array.from(At.keys()).filter(r=>r!=="yaml11").map(r=>JSON.stringify(r)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${i} or define customTags array`)}if(Array.isArray(n))for(const i of n)o=o.concat(i);else typeof n=="function"&&(o=n(o.slice()));return t&&(o=o.concat(x)),o.reduce((i,r)=>{const a=typeof r=="string"?It[r]:r;if(!a){const l=JSON.stringify(r),c=Object.keys(It).map(f=>JSON.stringify(f)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${c}`)}return i.includes(a)||i.push(a),i},[])}const Hi=(n,e)=>n.key<e.key?-1:n.key>e.key?1:0;class yt{constructor({compat:e,customTags:t,merge:s,resolveKnownTags:o,schema:i,sortMapEntries:r,toStringDefaults:a}){this.compat=Array.isArray(e)?Je(e,"compat"):e?Je(null,e):null,this.name=typeof i=="string"&&i||"core",this.knownTags=o?Ji:{},this.tags=Je(t,this.name,s),this.toStringOptions=a??null,Object.defineProperty(this,q,{value:ce}),Object.defineProperty(this,W,{value:We}),Object.defineProperty(this,re,{value:he}),this.sortMapEntries=typeof r=="function"?r:r===!0?Hi:null}clone(){const e=Object.create(yt.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function Gi(n,e){const t=[];let s=e.directives===!0;if(e.directives!==!1&&n.directives){const l=n.directives.toString(n);l?(t.push(l),s=!0):n.directives.docStart&&(s=!0)}s&&t.push("---");const o=xt(n,e),{commentString:i}=o.options;if(n.commentBefore){t.length!==1&&t.unshift("");const l=i(n.commentBefore);t.unshift(R(l,""))}let r=!1,a=null;if(n.contents){if(D(n.contents)){if(n.contents.spaceBefore&&s&&t.push(""),n.contents.commentBefore){const f=i(n.contents.commentBefore);t.push(R(f,""))}o.forceBlockIndent=!!n.comment,a=n.contents.comment}const l=a?void 0:()=>r=!0;let c=ie(n.contents,o,()=>a=null,l);a&&(c+=H(c,"",i(a))),(c[0]==="|"||c[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${c}`:t.push(c)}else t.push(ie(n.contents,o));if(n.directives?.docEnd)if(n.comment){const l=i(n.comment);l.includes(`
`)?(t.push("..."),t.push(R(l,""))):t.push(`... ${l}`)}else t.push("...");else{let l=n.comment;l&&r&&(l=l.replace(/^\n+/,"")),l&&((!r||a)&&t[t.length-1]!==""&&t.push(""),t.push(R(i(l),"")))}return t.join(`
`)+`
`}class Ke{constructor(e,t,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,M,{value:Xe});let o=null;typeof t=="function"||Array.isArray(t)?o=t:s===void 0&&t&&(s=t,t=void 0);const i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=i;let{version:r}=i;s?._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(r=this.directives.yaml.version)):this.directives=new E({version:r}),this.setSchema(r,s),this.contents=e===void 0?null:this.createNode(e,o,s)}clone(){const e=Object.create(Ke.prototype,{[M]:{value:Xe}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=D(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){Q(this.contents)&&this.contents.add(e)}addIn(e,t){Q(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const s=Mt(this);e.anchor=!t||s.has(t)?Ft(t||"a",s):t}return new rt(e.anchor)}createNode(e,t,s){let o;if(typeof t=="function")e=t.call({"":e},"",e),o=t;else if(Array.isArray(t)){const g=w=>typeof w=="number"||w instanceof String||w instanceof Number,b=t.filter(g).map(String);b.length>0&&(t=t.concat(b)),o=t}else s===void 0&&t&&(s=t,t=void 0);const{aliasDuplicateObjects:i,anchorPrefix:r,flow:a,keepUndefined:l,onTagObj:c,tag:f}=s??{},{onAnchor:u,setAnchors:d,sourceObjects:p}=Si(this,r||"a"),m={aliasDuplicateObjects:i??!0,keepUndefined:l??!1,onAnchor:u,onTagObj:c,replacer:o,schema:this.schema,sourceObjects:p},h=me(e,f,m);return a&&C(h)&&(h.flow=!0),d(),h}createPair(e,t,s={}){const o=this.createNode(e,null,s),i=this.createNode(t,null,s);return new B(o,i)}delete(e){return Q(this.contents)?this.contents.delete(e):!1}deleteIn(e){return de(e)?this.contents==null?!1:(this.contents=null,!0):Q(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return C(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return de(e)?!t&&I(this.contents)?this.contents.value:this.contents:C(this.contents)?this.contents.getIn(e,t):void 0}has(e){return C(this.contents)?this.contents.has(e):!1}hasIn(e){return de(e)?this.contents!==void 0:C(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=Ee(this.schema,[e],t):Q(this.contents)&&this.contents.set(e,t)}setIn(e,t){de(e)?this.contents=t:this.contents==null?this.contents=Ee(this.schema,Array.from(e),t):Q(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let s;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new E({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new E({version:e}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const o=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${o}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(s)this.schema=new yt(Object.assign(s,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:s,maxAliasCount:o,onAnchor:i,reviver:r}={}){const a={anchors:new Map,doc:this,keep:!e,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof o=="number"?o:100},l=j(this.contents,t??"",a);if(typeof i=="function")for(const{count:c,res:f}of a.anchors.values())i(f,c);return typeof r=="function"?ee(r,{"":l},"",l):l}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return Gi(this,e)}}function Q(n){if(C(n))return!0;throw new Error("Expected a YAML collection as document contents")}class cn extends Error{constructor(e,t,s,o){super(),this.name=e,this.code=s,this.message=o,this.pos=t}}class fe extends cn{constructor(e,t,s){super("YAMLParseError",e,t,s)}}class Vi extends cn{constructor(e,t,s){super("YAMLWarning",e,t,s)}}const Ct=(n,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(a=>e.linePos(a));const{line:s,col:o}=t.linePos[0];t.message+=` at line ${s}, column ${o}`;let i=o-1,r=n.substring(e.lineStarts[s-1],e.lineStarts[s]).replace(/[\n\r]+$/,"");if(i>=60&&r.length>80){const a=Math.min(i-39,r.length-79);r="…"+r.substring(a),i-=a-1}if(r.length>80&&(r=r.substring(0,79)+"…"),s>1&&/^ *$/.test(r.substring(0,i))){let a=n.substring(e.lineStarts[s-2],e.lineStarts[s-1]);a.length>80&&(a=a.substring(0,79)+`…
`),r=a+r}if(/[^ ]/.test(r)){let a=1;const l=t.linePos[1];l?.line===s&&l.col>o&&(a=Math.max(1,Math.min(l.col-o,80-i)));const c=" ".repeat(i)+"^".repeat(a);t.message+=`:

${r}
${c}
`}};function oe(n,{flow:e,indicator:t,next:s,offset:o,onError:i,parentIndent:r,startOnNewline:a}){let l=!1,c=a,f=a,u="",d="",p=!1,m=!1,h=null,g=null,b=null,w=null,v=null,k=null,S=null;for(const y of n)switch(m&&(y.type!=="space"&&y.type!=="newline"&&y.type!=="comma"&&i(y.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m=!1),h&&(c&&y.type!=="comment"&&y.type!=="newline"&&i(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),h=null),y.type){case"space":!e&&(t!=="doc-start"||s?.type!=="flow-collection")&&y.source.includes("	")&&(h=y),f=!0;break;case"comment":{f||i(y,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const N=y.source.substring(1)||" ";u?u+=d+N:u=N,d="",c=!1;break}case"newline":c?u?u+=y.source:(!k||t!=="seq-item-ind")&&(l=!0):d+=y.source,c=!0,p=!0,(g||b)&&(w=y),f=!0;break;case"anchor":g&&i(y,"MULTIPLE_ANCHORS","A node can have at most one anchor"),y.source.endsWith(":")&&i(y.offset+y.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),g=y,S??(S=y.offset),c=!1,f=!1,m=!0;break;case"tag":{b&&i(y,"MULTIPLE_TAGS","A node can have at most one tag"),b=y,S??(S=y.offset),c=!1,f=!1,m=!0;break}case t:(g||b)&&i(y,"BAD_PROP_ORDER",`Anchors and tags must be after the ${y.source} indicator`),k&&i(y,"UNEXPECTED_TOKEN",`Unexpected ${y.source} in ${e??"collection"}`),k=y,c=t==="seq-item-ind"||t==="explicit-key-ind",f=!1;break;case"comma":if(e){v&&i(y,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),v=y,c=!1,f=!1;break}default:i(y,"UNEXPECTED_TOKEN",`Unexpected ${y.type} token`),c=!1,f=!1}const T=n[n.length-1],A=T?T.offset+T.source.length:o;return m&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&i(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),h&&(c&&h.indent<=r||s?.type==="block-map"||s?.type==="block-seq")&&i(h,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:v,found:k,spaceBefore:l,comment:u,hasNewline:p,anchor:g,tag:b,newlineAfterProp:w,end:A,start:S??A}}function ye(n){if(!n)return null;switch(n.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(n.source.includes(`
`))return!0;if(n.end){for(const e of n.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of n.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(ye(e.key)||ye(e.value))return!0}return!1;default:return!0}}function nt(n,e,t){if(e?.type==="flow-collection"){const s=e.end[0];s.indent===n&&(s.source==="]"||s.source==="}")&&ye(e)&&t(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function hn(n,e,t){const{uniqueKeys:s}=n.options;if(s===!1)return!1;const o=typeof s=="function"?s:(i,r)=>i===r||I(i)&&I(r)&&i.value===r.value;return e.some(i=>o(i.key,t))}const Dt="All mapping items must start at the same column";function Yi({composeNode:n,composeEmptyNode:e},t,s,o,i){const r=i?.nodeClass??L,a=new r(t.schema);t.atRoot&&(t.atRoot=!1);let l=s.offset,c=null;for(const f of s.items){const{start:u,key:d,sep:p,value:m}=f,h=oe(u,{indicator:"explicit-key-ind",next:d??p?.[0],offset:l,onError:o,parentIndent:s.indent,startOnNewline:!0}),g=!h.found;if(g){if(d&&(d.type==="block-seq"?o(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in d&&d.indent!==s.indent&&o(l,"BAD_INDENT",Dt)),!h.anchor&&!h.tag&&!p){c=h.end,h.comment&&(a.comment?a.comment+=`
`+h.comment:a.comment=h.comment);continue}(h.newlineAfterProp||ye(d))&&o(d??u[u.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else h.found?.indent!==s.indent&&o(l,"BAD_INDENT",Dt);t.atKey=!0;const b=h.end,w=d?n(t,d,h,o):e(t,b,u,null,h,o);t.schema.compat&&nt(s.indent,d,o),t.atKey=!1,hn(t,a.items,w)&&o(b,"DUPLICATE_KEY","Map keys must be unique");const v=oe(p??[],{indicator:"map-value-ind",next:m,offset:w.range[2],onError:o,parentIndent:s.indent,startOnNewline:!d||d.type==="block-scalar"});if(l=v.end,v.found){g&&(m?.type==="block-map"&&!v.hasNewline&&o(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&h.start<v.found.offset-1024&&o(w.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const k=m?n(t,m,v,o):e(t,l,p,null,v,o);t.schema.compat&&nt(s.indent,m,o),l=k.range[2];const S=new B(w,k);t.options.keepSourceTokens&&(S.srcToken=f),a.items.push(S)}else{g&&o(w.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),v.comment&&(w.comment?w.comment+=`
`+v.comment:w.comment=v.comment);const k=new B(w);t.options.keepSourceTokens&&(k.srcToken=f),a.items.push(k)}}return c&&c<l&&o(c,"IMPOSSIBLE","Map comment with trailing content"),a.range=[s.offset,l,c??l],a}function Qi({composeNode:n,composeEmptyNode:e},t,s,o,i){const r=i?.nodeClass??V,a=new r(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let l=s.offset,c=null;for(const{start:f,value:u}of s.items){const d=oe(f,{indicator:"seq-item-ind",next:u,offset:l,onError:o,parentIndent:s.indent,startOnNewline:!0});if(!d.found)if(d.anchor||d.tag||u)u?.type==="block-seq"?o(d.end,"BAD_INDENT","All sequence items must start at the same column"):o(l,"MISSING_CHAR","Sequence item without - indicator");else{c=d.end,d.comment&&(a.comment=d.comment);continue}const p=u?n(t,u,d,o):e(t,d.end,f,null,d,o);t.schema.compat&&nt(s.indent,u,o),l=p.range[2],a.items.push(p)}return a.range=[s.offset,l,c??l],a}function ke(n,e,t,s){let o="";if(n){let i=!1,r="";for(const a of n){const{source:l,type:c}=a;switch(c){case"space":i=!0;break;case"comment":{t&&!i&&s(a,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const f=l.substring(1)||" ";o?o+=r+f:o=f,r="";break}case"newline":o&&(r+=l),i=!0;break;default:s(a,"UNEXPECTED_TOKEN",`Unexpected ${c} at node end`)}e+=l.length}}return{comment:o,offset:e}}const He="Block collections are not allowed within flow collections",Ge=n=>n&&(n.type==="block-map"||n.type==="block-seq");function Xi({composeNode:n,composeEmptyNode:e},t,s,o,i){const r=s.start.source==="{",a=r?"flow map":"flow sequence",l=i?.nodeClass??(r?L:V),c=new l(t.schema);c.flow=!0;const f=t.atRoot;f&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let u=s.offset+s.start.source.length;for(let g=0;g<s.items.length;++g){const b=s.items[g],{start:w,key:v,sep:k,value:S}=b,T=oe(w,{flow:a,indicator:"explicit-key-ind",next:v??k?.[0],offset:u,onError:o,parentIndent:s.indent,startOnNewline:!1});if(!T.found){if(!T.anchor&&!T.tag&&!k&&!S){g===0&&T.comma?o(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`):g<s.items.length-1&&o(T.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${a}`),T.comment&&(c.comment?c.comment+=`
`+T.comment:c.comment=T.comment),u=T.end;continue}!r&&t.options.strict&&ye(v)&&o(v,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(g===0)T.comma&&o(T.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${a}`);else if(T.comma||o(T.start,"MISSING_CHAR",`Missing , between ${a} items`),T.comment){let A="";e:for(const y of w)switch(y.type){case"comma":case"space":break;case"comment":A=y.source.substring(1);break e;default:break e}if(A){let y=c.items[c.items.length-1];O(y)&&(y=y.value??y.key),y.comment?y.comment+=`
`+A:y.comment=A,T.comment=T.comment.substring(A.length+1)}}if(!r&&!k&&!T.found){const A=S?n(t,S,T,o):e(t,T.end,k,null,T,o);c.items.push(A),u=A.range[2],Ge(S)&&o(A.range,"BLOCK_IN_FLOW",He)}else{t.atKey=!0;const A=T.end,y=v?n(t,v,T,o):e(t,A,w,null,T,o);Ge(v)&&o(y.range,"BLOCK_IN_FLOW",He),t.atKey=!1;const N=oe(k??[],{flow:a,indicator:"map-value-ind",next:S,offset:y.range[2],onError:o,parentIndent:s.indent,startOnNewline:!1});if(N.found){if(!r&&!T.found&&t.options.strict){if(k)for(const P of k){if(P===N.found)break;if(P.type==="newline"){o(P,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}T.start<N.found.offset-1024&&o(N.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else S&&("source"in S&&S.source?.[0]===":"?o(S,"MISSING_CHAR",`Missing space after : in ${a}`):o(N.start,"MISSING_CHAR",`Missing , or : between ${a} items`));const z=S?n(t,S,N,o):N.found?e(t,N.end,k,null,N,o):null;z?Ge(S)&&o(z.range,"BLOCK_IN_FLOW",He):N.comment&&(y.comment?y.comment+=`
`+N.comment:y.comment=N.comment);const Y=new B(y,z);if(t.options.keepSourceTokens&&(Y.srcToken=b),r){const P=c;hn(t,P.items,y)&&o(A,"DUPLICATE_KEY","Map keys must be unique"),P.items.push(Y)}else{const P=new L(t.schema);P.flow=!0,P.items.push(Y);const vt=(z??y).range;P.range=[y.range[0],vt[1],vt[2]],c.items.push(P)}u=z?z.range[2]:N.end}}const d=r?"}":"]",[p,...m]=s.end;let h=u;if(p?.source===d)h=p.offset+p.source.length;else{const g=a[0].toUpperCase()+a.substring(1),b=f?`${g} must end with a ${d}`:`${g} in block collection must be sufficiently indented and end with a ${d}`;o(u,f?"MISSING_CHAR":"BAD_INDENT",b),p&&p.source.length!==1&&m.unshift(p)}if(m.length>0){const g=ke(m,h,t.options.strict,o);g.comment&&(c.comment?c.comment+=`
`+g.comment:c.comment=g.comment),c.range=[s.offset,h,g.offset]}else c.range=[s.offset,h,h];return c}function Ve(n,e,t,s,o,i){const r=t.type==="block-map"?Yi(n,e,t,s,i):t.type==="block-seq"?Qi(n,e,t,s,i):Xi(n,e,t,s,i),a=r.constructor;return o==="!"||o===a.tagName?(r.tag=a.tagName,r):(o&&(r.tag=o),r)}function Zi(n,e,t,s,o){const i=s.tag,r=i?e.directives.tagName(i.source,d=>o(i,"TAG_RESOLVE_FAILED",d)):null;if(t.type==="block-seq"){const{anchor:d,newlineAfterProp:p}=s,m=d&&i?d.offset>i.offset?d:i:d??i;m&&(!p||p.offset<m.offset)&&o(m,"MISSING_CHAR","Missing newline after block sequence props")}const a=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!i||!r||r==="!"||r===L.tagName&&a==="map"||r===V.tagName&&a==="seq")return Ve(n,e,t,o,r);let l=e.schema.tags.find(d=>d.tag===r&&d.collection===a);if(!l){const d=e.schema.knownTags[r];if(d?.collection===a)e.schema.tags.push(Object.assign({},d,{default:!1})),l=d;else return d?o(i,"BAD_COLLECTION_TYPE",`${d.tag} used for ${a} collection, but expects ${d.collection??"scalar"}`,!0):o(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${r}`,!0),Ve(n,e,t,o,r)}const c=Ve(n,e,t,o,r,l),f=l.resolve?.(c,d=>o(i,"TAG_RESOLVE_FAILED",d),e.options)??c,u=D(f)?f:new _(f);return u.range=c.range,u.tag=r,l?.format&&(u.format=l.format),u}function eo(n,e,t){const s=e.offset,o=to(e,n.options.strict,t);if(!o)return{value:"",type:null,comment:"",range:[s,s,s]};const i=o.mode===">"?_.BLOCK_FOLDED:_.BLOCK_LITERAL,r=e.source?no(e.source):[];let a=r.length;for(let h=r.length-1;h>=0;--h){const g=r[h][1];if(g===""||g==="\r")a=h;else break}if(a===0){const h=o.chomp==="+"&&r.length>0?`
`.repeat(Math.max(1,r.length-1)):"";let g=s+o.length;return e.source&&(g+=e.source.length),{value:h,type:i,comment:o.comment,range:[s,g,g]}}let l=e.indent+o.indent,c=e.offset+o.length,f=0;for(let h=0;h<a;++h){const[g,b]=r[h];if(b===""||b==="\r")o.indent===0&&g.length>l&&(l=g.length);else{g.length<l&&t(c+g.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),o.indent===0&&(l=g.length),f=h,l===0&&!n.atRoot&&t(c,"BAD_INDENT","Block scalar values in collections must be indented");break}c+=g.length+b.length+1}for(let h=r.length-1;h>=a;--h)r[h][0].length>l&&(a=h+1);let u="",d="",p=!1;for(let h=0;h<f;++h)u+=r[h][0].slice(l)+`
`;for(let h=f;h<a;++h){let[g,b]=r[h];c+=g.length+b.length+1;const w=b[b.length-1]==="\r";if(w&&(b=b.slice(0,-1)),b&&g.length<l){const k=`Block scalar lines must not be less indented than their ${o.indent?"explicit indentation indicator":"first line"}`;t(c-b.length-(w?2:1),"BAD_INDENT",k),g=""}i===_.BLOCK_LITERAL?(u+=d+g.slice(l)+b,d=`
`):g.length>l||b[0]==="	"?(d===" "?d=`
`:!p&&d===`
`&&(d=`

`),u+=d+g.slice(l)+b,d=`
`,p=!0):b===""?d===`
`?u+=`
`:d=`
`:(u+=d+b,d=" ",p=!1)}switch(o.chomp){case"-":break;case"+":for(let h=a;h<r.length;++h)u+=`
`+r[h][0].slice(l);u[u.length-1]!==`
`&&(u+=`
`);break;default:u+=`
`}const m=s+o.length+e.source.length;return{value:u,type:i,comment:o.comment,range:[s,m,m]}}function to({offset:n,props:e},t,s){if(e[0].type!=="block-scalar-header")return s(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:o}=e[0],i=o[0];let r=0,a="",l=-1;for(let d=1;d<o.length;++d){const p=o[d];if(!a&&(p==="-"||p==="+"))a=p;else{const m=Number(p);!r&&m?r=m:l===-1&&(l=n+d)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${o}`);let c=!1,f="",u=o.length;for(let d=1;d<e.length;++d){const p=e[d];switch(p.type){case"space":c=!0;case"newline":u+=p.source.length;break;case"comment":t&&!c&&s(p,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),u+=p.source.length,f=p.source.substring(1);break;case"error":s(p,"UNEXPECTED_TOKEN",p.message),u+=p.source.length;break;default:{const m=`Unexpected token in block scalar header: ${p.type}`;s(p,"UNEXPECTED_TOKEN",m);const h=p.source;h&&typeof h=="string"&&(u+=h.length)}}}return{mode:i,indent:r,chomp:a,comment:f,length:u}}function no(n){const e=n.split(/\n( *)/),t=e[0],s=t.match(/^( *)/),i=[s?.[1]?[s[1],t.slice(s[1].length)]:["",t]];for(let r=1;r<e.length;r+=2)i.push([e[r],e[r+1]]);return i}function so(n,e,t){const{offset:s,type:o,source:i,end:r}=n;let a,l;const c=(d,p,m)=>t(s+d,p,m);switch(o){case"scalar":a=_.PLAIN,l=io(i,c);break;case"single-quoted-scalar":a=_.QUOTE_SINGLE,l=oo(i,c);break;case"double-quoted-scalar":a=_.QUOTE_DOUBLE,l=ro(i,c);break;default:return t(n,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${o}`),{value:"",type:null,comment:"",range:[s,s+i.length,s+i.length]}}const f=s+i.length,u=ke(r,f,e,t);return{value:l,type:a,comment:u.comment,range:[s,f,u.offset]}}function io(n,e){let t="";switch(n[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${n[0]}`;break}case"@":case"`":{t=`reserved character ${n[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),un(n)}function oo(n,e){return(n[n.length-1]!=="'"||n.length===1)&&e(n.length,"MISSING_CHAR","Missing closing 'quote"),un(n.slice(1,-1)).replace(/''/g,"'")}function un(n){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=e.exec(n);if(!s)return n;let o=s[1],i=" ",r=e.lastIndex;for(t.lastIndex=r;s=t.exec(n);)s[1]===""?i===`
`?o+=i:i=`
`:(o+=i+s[1],i=" "),r=t.lastIndex;const a=/[ \t]*(.*)/sy;return a.lastIndex=r,s=a.exec(n),o+i+(s?.[1]??"")}function ro(n,e){let t="";for(let s=1;s<n.length-1;++s){const o=n[s];if(!(o==="\r"&&n[s+1]===`
`))if(o===`
`){const{fold:i,offset:r}=ao(n,s);t+=i,s=r}else if(o==="\\"){let i=n[++s];const r=lo[i];if(r)t+=r;else if(i===`
`)for(i=n[s+1];i===" "||i==="	";)i=n[++s+1];else if(i==="\r"&&n[s+1]===`
`)for(i=n[++s+1];i===" "||i==="	";)i=n[++s+1];else if(i==="x"||i==="u"||i==="U"){const a=i==="x"?2:i==="u"?4:8;t+=co(n,s+1,a,e),s+=a}else{const a=n.substr(s-1,2);e(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),t+=a}}else if(o===" "||o==="	"){const i=s;let r=n[s+1];for(;r===" "||r==="	";)r=n[++s+1];r!==`
`&&!(r==="\r"&&n[s+2]===`
`)&&(t+=s>i?n.slice(i,s+1):o)}else t+=o}return(n[n.length-1]!=='"'||n.length===1)&&e(n.length,"MISSING_CHAR",'Missing closing "quote'),t}function ao(n,e){let t="",s=n[e+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&n[e+2]!==`
`);)s===`
`&&(t+=`
`),e+=1,s=n[e+1];return t||(t=" "),{fold:t,offset:e}}const lo={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function co(n,e,t,s){const o=n.substr(e,t),r=o.length===t&&/^[0-9a-fA-F]+$/.test(o)?parseInt(o,16):NaN;try{return String.fromCodePoint(r)}catch{const a=n.substr(e-2,t+2);return s(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${a}`),a}}function dn(n,e,t,s){const{value:o,type:i,comment:r,range:a}=e.type==="block-scalar"?eo(n,e,s):so(e,n.options.strict,s),l=t?n.directives.tagName(t.source,u=>s(t,"TAG_RESOLVE_FAILED",u)):null;let c;n.options.stringKeys&&n.atKey?c=n.schema[W]:l?c=ho(n.schema,o,l,t,s):e.type==="scalar"?c=uo(n,o,e,s):c=n.schema[W];let f;try{const u=c.resolve(o,d=>s(t??e,"TAG_RESOLVE_FAILED",d),n.options);f=I(u)?u:new _(u)}catch(u){const d=u instanceof Error?u.message:String(u);s(t??e,"TAG_RESOLVE_FAILED",d),f=new _(o)}return f.range=a,f.source=o,i&&(f.type=i),l&&(f.tag=l),c.format&&(f.format=c.format),r&&(f.comment=r),f}function ho(n,e,t,s,o){if(t==="!")return n[W];const i=[];for(const a of n.tags)if(!a.collection&&a.tag===t)if(a.default&&a.test)i.push(a);else return a;for(const a of i)if(a.test?.test(e))return a;const r=n.knownTags[t];return r&&!r.collection?(n.tags.push(Object.assign({},r,{default:!1,test:void 0})),r):(o(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),n[W])}function uo({atKey:n,directives:e,schema:t},s,o,i){const r=t.tags.find(a=>(a.default===!0||n&&a.default==="key")&&a.test?.test(s))||t[W];if(t.compat){const a=t.compat.find(l=>l.default&&l.test?.test(s))??t[W];if(r.tag!==a.tag){const l=e.tagString(r.tag),c=e.tagString(a.tag),f=`Value may be parsed as either ${l} or ${c}`;i(o,"TAG_RESOLVE_FAILED",f,!0)}}return r}function fo(n,e,t){if(e){t??(t=e.length);for(let s=t-1;s>=0;--s){let o=e[s];switch(o.type){case"space":case"comment":case"newline":n-=o.source.length;continue}for(o=e[++s];o?.type==="space";)n+=o.source.length,o=e[++s];break}}return n}const po={composeNode:fn,composeEmptyNode:bt};function fn(n,e,t,s){const o=n.atKey,{spaceBefore:i,comment:r,anchor:a,tag:l}=t;let c,f=!0;switch(e.type){case"alias":c=go(n,e,s),(a||l)&&s(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":c=dn(n,e,l,s),a&&(c.anchor=a.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{c=Zi(po,n,e,t,s),a&&(c.anchor=a.source.substring(1))}catch(u){const d=u instanceof Error?u.message:String(u);s(e,"RESOURCE_EXHAUSTION",d)}break;default:{const u=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;s(e,"UNEXPECTED_TOKEN",u),f=!1}}return c??(c=bt(n,e.offset,void 0,null,t,s)),a&&c.anchor===""&&s(a,"BAD_ALIAS","Anchor cannot be an empty string"),o&&n.options.stringKeys&&(!I(c)||typeof c.value!="string"||c.tag&&c.tag!=="tag:yaml.org,2002:str")&&s(l??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),i&&(c.spaceBefore=!0),r&&(e.type==="scalar"&&e.source===""?c.comment=r:c.commentBefore=r),n.options.keepSourceTokens&&f&&(c.srcToken=e),c}function bt(n,e,t,s,{spaceBefore:o,comment:i,anchor:r,tag:a,end:l},c){const f={type:"scalar",offset:fo(e,t,s),indent:-1,source:""},u=dn(n,f,a,c);return r&&(u.anchor=r.source.substring(1),u.anchor===""&&c(r,"BAD_ALIAS","Anchor cannot be an empty string")),o&&(u.spaceBefore=!0),i&&(u.comment=i,u.range[2]=l),u}function go({options:n},{offset:e,source:t,end:s},o){const i=new rt(t.substring(1));i.source===""&&o(e,"BAD_ALIAS","Alias cannot be an empty string"),i.source.endsWith(":")&&o(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const r=e+t.length,a=ke(s,r,n.strict,o);return i.range=[e,r,a.offset],a.comment&&(i.comment=a.comment),i}function mo(n,e,{offset:t,start:s,value:o,end:i},r){const a=Object.assign({_directives:e},n),l=new Ke(void 0,a),c={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},f=oe(s,{indicator:"doc-start",next:o??i?.[0],offset:t,onError:r,parentIndent:0,startOnNewline:!0});f.found&&(l.directives.docStart=!0,o&&(o.type==="block-map"||o.type==="block-seq")&&!f.hasNewline&&r(f.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=o?fn(c,o,f,r):bt(c,f.end,s,null,f,r);const u=l.contents.range[2],d=ke(i,u,!1,r);return d.comment&&(l.comment=d.comment),l.range=[t,u,d.offset],l}function ue(n){if(typeof n=="number")return[n,n+1];if(Array.isArray(n))return n.length===2?n:[n[0],n[1]];const{offset:e,source:t}=n;return[e,e+(typeof t=="string"?t.length:1)]}function Ot(n){let e="",t=!1,s=!1;for(let o=0;o<n.length;++o){const i=n[o];switch(i[0]){case"#":e+=(e===""?"":s?`

`:`
`)+(i.substring(1)||" "),t=!0,s=!1;break;case"%":n[o+1]?.[0]!=="#"&&(o+=1),t=!1;break;default:t||(s=!0),t=!1}}return{comment:e,afterEmptyLine:s}}class yo{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,s,o,i)=>{const r=ue(t);i?this.warnings.push(new Vi(r,s,o)):this.errors.push(new fe(r,s,o))},this.directives=new E({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:s,afterEmptyLine:o}=Ot(this.prelude);if(s){const i=e.contents;if(t)e.comment=e.comment?`${e.comment}
${s}`:s;else if(o||e.directives.docStart||!i)e.commentBefore=s;else if(C(i)&&!i.flow&&i.items.length>0){let r=i.items[0];O(r)&&(r=r.key);const a=r.commentBefore;r.commentBefore=a?`${s}
${a}`:s}else{const r=i.commentBefore;i.commentBefore=r?`${s}
${r}`:s}}if(t){for(let i=0;i<this.errors.length;++i)e.errors.push(this.errors[i]);for(let i=0;i<this.warnings.length;++i)e.warnings.push(this.warnings[i])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ot(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,s=-1){for(const o of e)yield*this.next(o);yield*this.end(t,s)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,s,o)=>{const i=ue(e);i[0]+=t,this.onError(i,"BAD_DIRECTIVE",s,o)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=mo(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,s=new fe(ue(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new fe(ue(e),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const t=ke(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new fe(ue(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const s=Object.assign({_directives:this.directives},this.options),o=new Ke(void 0,s);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),o.range=[0,t,t],this.decorate(o,!1),yield o}}}const pn="\uFEFF",gn="",mn="",st="";function bo(n){switch(n){case pn:return"byte-order-mark";case gn:return"doc-mode";case mn:return"flow-error-end";case st:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(n[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function F(n){switch(n){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Nt=new Set("0123456789ABCDEFabcdef"),wo=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Ae=new Set(",[]{}"),vo=new Set(` ,[]{}
\r	`),Ye=n=>!n||vo.has(n);class ko{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let s=this.next??"stream";for(;s&&(t||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let s=0;for(;t===" ";)t=this.buffer[++s+e];if(t==="\r"){const o=this.buffer[s+e+1];if(o===`
`||!o&&!this.atEnd)return e+s+1}return t===`
`||s>=this.indentNext||!t&&!this.atEnd?e+s:-1}if(t==="-"||t==="."){const s=this.buffer.substr(e,3);if((s==="---"||s==="...")&&F(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===pn&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,s=e.indexOf("#");for(;s!==-1;){const i=e[s-1];if(i===" "||i==="	"){t=s-1;break}else s=e.indexOf("#",s+1)}for(;;){const i=e[t-1];if(i===" "||i==="	")t-=1;else break}const o=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-o),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield gn,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&F(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!F(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&F(t)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Ye),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,s=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=s=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const o=this.getLine();if(o===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&o[0]!=="#"||s===0&&(o.startsWith("---")||o.startsWith("..."))&&F(o[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(o[0]==="]"||o[0]==="}")))return this.flowLevel=0,yield mn,yield*this.parseLineStart();let i=0;for(;o[i]===",";)i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),o[i]){case void 0:return"flow";case"#":return yield*this.pushCount(o.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Ye),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const r=this.charAt(1);if(this.flowKey||F(r)||r===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let i=0;for(;this.buffer[t-1-i]==="\\";)i+=1;if(i%2===0)break;t=this.buffer.indexOf('"',t+1)}const s=this.buffer.substring(0,t);let o=s.indexOf(`
`,this.pos);if(o!==-1){for(;o!==-1;){const i=this.continueScalar(o+1);if(i===-1)break;o=s.indexOf(`
`,i)}o!==-1&&(t=o-(s[o-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>F(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,s;e:for(let i=this.pos;s=this.buffer[i];++i)switch(s){case" ":t+=1;break;case`
`:e=i,t=0;break;case"\r":{const r=this.buffer[i+1];if(!r&&!this.atEnd)return this.setNext("block-scalar");if(r===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const i=this.continueScalar(e+1);if(i===-1)break;e=this.buffer.indexOf(`
`,i)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let o=e+1;for(s=this.buffer[o];s===" ";)s=this.buffer[++o];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++o];e=o-1}else if(!this.blockScalarKeep)do{let i=e-1,r=this.buffer[i];r==="\r"&&(r=this.buffer[--i]);const a=i;for(;r===" ";)r=this.buffer[--i];if(r===`
`&&i>=this.pos&&i+1+t>a)e=i;else break}while(!0);return yield st,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,s=this.pos-1,o;for(;o=this.buffer[++s];)if(o===":"){const i=this.buffer[s+1];if(F(i)||e&&Ae.has(i))break;t=s}else if(F(o)){let i=this.buffer[s+1];if(o==="\r"&&(i===`
`?(s+=1,o=`
`,i=this.buffer[s+1]):t=s),i==="#"||e&&Ae.has(i))break;if(o===`
`){const r=this.continueScalar(s+1);if(r===-1)break;s=Math.max(s,r-2)}}else{if(e&&Ae.has(o))break;t=s}return!o&&!this.atEnd?this.setNext("plain-scalar"):(yield st,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const s=this.buffer.slice(this.pos,e);return s?(yield s,this.pos+=s.length,s.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(Ye),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,s=this.charAt(1);if(F(s)||t&&Ae.has(s)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!F(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(wo.has(t))t=this.buffer[++e];else if(t==="%"&&Nt.has(this.buffer[e+1])&&Nt.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,s;do s=this.buffer[++t];while(s===" "||e&&s==="	");const o=t-this.pos;return o>0&&(yield this.buffer.substr(this.pos,o),this.pos=t),o}*pushUntil(e){let t=this.pos,s=this.buffer[t];for(;!e(s);)s=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class So{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,s=this.lineStarts.length;for(;t<s;){const i=t+s>>1;this.lineStarts[i]<e?t=i+1:s=i}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const o=this.lineStarts[t-1];return{line:t,col:e-o+1}}}}function U(n,e){for(let t=0;t<n.length;++t)if(n[t].type===e)return!0;return!1}function Pt(n){for(let e=0;e<n.length;++e)switch(n[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function yn(n){switch(n?.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Ie(n){switch(n.type){case"document":return n.start;case"block-map":{const e=n.items[n.items.length-1];return e.sep??e.start}case"block-seq":return n.items[n.items.length-1].start;default:return[]}}function X(n){if(n.length===0)return[];let e=n.length;e:for(;--e>=0;)switch(n[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;n[++e]?.type==="space";);return n.splice(e,n.length)}function Le(n,e){if(e.length<1e5)Array.prototype.push.apply(n,e);else for(let t=0;t<e.length;++t)n.push(e[t])}function Et(n){if(n.start.type==="flow-seq-start")for(const e of n.items)e.sep&&!e.value&&!U(e.start,"explicit-key-ind")&&!U(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,yn(e.value)?e.value.end?Le(e.value.end,e.sep):e.value.end=e.sep:Le(e.start,e.sep),delete e.sep)}class _o{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new ko,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(e,t))yield*this.next(s);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=bo(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const s=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&e?.type!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const s=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in s?s.indent:0:t.type==="flow-collection"&&s.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Et(t),s.type){case"document":s.value=t;break;case"block-scalar":s.props.push(t);break;case"block-map":{const o=s.items[s.items.length-1];if(o.value){s.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(o.sep)o.value=t;else{Object.assign(o,{key:t,sep:[]}),this.onKeyLine=!o.explicitKey;return}break}case"block-seq":{const o=s.items[s.items.length-1];o.value?s.items.push({start:[],value:t}):o.value=t;break}case"flow-collection":{const o=s.items[s.items.length-1];!o||o.value?s.items.push({start:[],key:t,sep:[]}):o.sep?o.value=t:Object.assign(o,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const o=t.items[t.items.length-1];o&&!o.sep&&!o.value&&o.start.length>0&&Pt(o.start)===-1&&(t.indent===0||o.start.every(i=>i.type!=="comment"||i.indent<t.indent))&&(s.type==="document"?s.end=o.start:s.items.push({start:o.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Pt(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=Ie(this.peek(2)),s=X(t);let o;e.end?(o=e.end,o.push(this.sourceToken),delete e.end):o=[this.sourceToken];const i={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:s,key:e,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const o=e.items[e.items.length-2]?.value?.end;if(Array.isArray(o)){Le(o,t.start),o.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,o=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let i=[];if(o&&t.sep&&!t.value){const r=[];for(let a=0;a<t.sep.length;++a){const l=t.sep[a];switch(l.type){case"newline":r.push(a);break;case"space":break;case"comment":l.indent>e.indent&&(r.length=0);break;default:r.length=0}}r.length>=2&&(i=t.sep.splice(r[1]))}switch(this.type){case"anchor":case"tag":o||t.value?(i.push(this.sourceToken),e.items.push({start:i}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):o||t.value?(i.push(this.sourceToken),e.items.push({start:i,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(U(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:i,key:null,sep:[this.sourceToken]}]});else if(yn(t.key)&&!U(t.sep,"newline")){const r=X(t.start),a=t.key,l=t.sep;l.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:a,sep:l}]})}else i.length>0?t.sep=t.sep.concat(i,this.sourceToken):t.sep.push(this.sourceToken);else if(U(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const r=X(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||o?e.items.push({start:i,key:null,sep:[this.sourceToken]}):U(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const r=this.flowScalar(this.type);o||t.value?(e.items.push({start:i,key:r,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(r):(Object.assign(t,{key:r,sep:[]}),this.onKeyLine=!0);return}default:{const r=this.startBlockValue(e);if(r){if(r.type==="block-seq"){if(!t.explicitKey&&t.sep&&!U(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:i});this.stack.push(r);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0;(Array.isArray(s)?s[s.length-1]:void 0)?.type==="comment"?s?.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const o=e.items[e.items.length-2]?.value?.end;if(Array.isArray(o)){Le(o,t.start),o.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||U(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while(s?.type==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const o=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:o,sep:[]}):t.sep?this.stack.push(o):Object.assign(t,{key:o,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const s=this.startBlockValue(e);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===e.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const o=Ie(s),i=X(o);Et(e);const r=e.end.splice(1,e.end.length);r.push(this.sourceToken);const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:i,key:e,sep:r}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=Ie(e),s=X(t);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=Ie(e),s=X(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function To(n){const e=n.prettyErrors!==!1;return{lineCounter:n.lineCounter||e&&new So||null,prettyErrors:e}}function Ao(n,e={}){const{lineCounter:t,prettyErrors:s}=To(e),o=new _o(t?.addNewLine),i=new yo(e);let r=null;for(const a of i.compose(o.parse(n),!0,n.length))if(!r)r=a;else if(r.options.logLevel!=="silent"){r.errors.push(new fe(a.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&t&&(r.errors.forEach(Ct(n,t)),r.warnings.forEach(Ct(n,t))),r}function Io(n,e,t){let s;const o=Ao(n,t);if(!o)return null;if(o.warnings.forEach(i=>zt(o.options.logLevel,i)),o.errors.length>0){if(o.options.logLevel!=="silent")throw o.errors[0];o.errors=[]}return o.toJS(Object.assign({reviver:s},t))}function Co(n){const e=n.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);if(!e)return{data:Object.create(null),content:n};const t=e[1],s=e[2];try{const o=Io(t),i=Object.create(null);return o&&typeof o=="object"&&Object.assign(i,o),{data:i,content:s}}catch(o){return console.error("Error parsing frontmatter:",o),{data:Object.create(null),content:s}}}const Ce={posts:Object.assign({"/content/posts/2026-04-18-competition-metrics.md":wn,"/content/posts/2026-04-18-financial-literacy-dancers.md":kn,"/content/posts/2026-04-18-github-actions.md":_n,"/content/posts/2026-04-18-halloween-costumes.md":An,"/content/posts/2026-04-18-make-shoe-dance.md":Cn,"/content/posts/2026-04-18-why-finals-are-hard.md":On,"/content/posts/2026-04-19-gear-essentials.md":Pn,"/content/posts/2026-05-06-boomtick-and-b-the-rhythmic-architecture-of-west-coast-swing.md":Bn}),resources:Object.assign({"/content/resources/2023-10-01-loop-earplugs.md":jn,"/content/resources/2023-11-01-travel-steamer.md":Fn,"/content/resources/2024-01-01-portable-speaker.md":Wn,"/content/resources/2024-06-01-alien-mask.md":xn,"/content/resources/2024-06-01-charging-cables.md":Un,"/content/resources/2024-06-01-compression-cubes.md":qn,"/content/resources/2024-06-01-crop-tops.md":Hn,"/content/resources/2024-06-01-fishnet-tights.md":Vn,"/content/resources/2024-06-01-foam-roller.md":Qn,"/content/resources/2024-06-01-green-bodysuit.md":Zn,"/content/resources/2024-06-01-light-up-suspenders.md":ts,"/content/resources/2024-06-01-love-neon-follow-shirt.md":ss,"/content/resources/2024-06-01-love-neon-lead-shirt.md":os,"/content/resources/2024-06-01-love-neon-switch-shirt.md":as,"/content/resources/2024-06-01-love-unisex-shirt.md":cs,"/content/resources/2024-06-01-mesh-fishnet-top.md":us,"/content/resources/2024-06-01-nerd-set.md":fs,"/content/resources/2024-06-01-norcal-bear-tank.md":gs,"/content/resources/2024-06-01-norcal-bestcal-tshirt.md":ys,"/content/resources/2024-06-01-norcal-crop-top.md":ws,"/content/resources/2024-06-01-norcal-gate-crop-hoodie.md":ks,"/content/resources/2024-06-01-norcal-pride-bear-shirt.md":_s,"/content/resources/2024-06-01-norcal-pride-gate-shirt.md":As,"/content/resources/2024-06-01-portable-charger.md":Cs,"/content/resources/2024-06-01-pumpkin-headbands.md":Os,"/content/resources/2024-06-01-rave-fan.md":Ps,"/content/resources/2024-06-01-reflective-crop-tops.md":Bs,"/content/resources/2024-06-01-running-belt.md":js,"/content/resources/2024-06-01-shoe-dryer.md":Fs,"/content/resources/2024-06-01-sunscreen.md":Ws,"/content/resources/2024-06-01-travel-bottles.md":xs,"/content/resources/2024-06-01-tripod.md":Us,"/content/resources/2024-06-01-visor.md":qs,"/content/resources/2024-06-01-war-eagle-shirt.md":Hs,"/content/resources/2026-04-12-suede-shoe-diy.md":Vs}),studies:Object.assign({"/content/studies/wcs-scraper-initial-sync.md":Qs}),events:Object.assign({"/content/events/boogie-by-the-bay.md":Zs,"/content/events/jack-and-jill-orama.md":ti,"/content/events/mission-city-swing.md":si,"/content/events/phoenix-4th-of-july.md":oi,"/content/events/sample-event.md":ai,"/content/events/soswing.md":ci,"/content/events/swingtacular-the-galactic-open.md":ui,"/content/events/weekly.md":fi,"/content/events/wild-wild-westie.md":gi})},Do=n=>n.split("/").pop()?.replace(".md","")||"";function Qe(n){if(!(n===""||n===void 0||n===null))return typeof n!="string"?n:n.startsWith("/")&&!n.startsWith(kt)?`${kt}${n}`:n}function De(n){const e=t=>Array.isArray(t)?t:[];return Object.entries(n).map(([t,s])=>{const o=typeof s=="string"?s:s.default,{data:i,content:r}=Co(o);i.image=Qe(i.image),i.imageBack=Qe(i.imageBack),i.heroImage=Qe(i.heroImage);const a=["NorCal","SoCal","Southwest","Pacific Northwest","South","International","Other"],l={...i,title:String(i.title||"Untitled"),category:String(i.category||"General"),region:i.region&&a.includes(String(i.region))?String(i.region):void 0,excerpt:String(i.excerpt||""),date:String(i.date||""),author:String(i.author||""),startDate:i.startDate?String(i.startDate):void 0,earlyBirdDate:i.earlyBirdDate?String(i.earlyBirdDate):void 0,registrationDeadline:i.registrationDeadline?String(i.registrationDeadline):void 0,hotelCutoffDate:i.hotelCutoffDate?String(i.hotelCutoffDate):void 0,packingReminderDate:i.packingReminderDate?String(i.packingReminderDate):void 0,tags:e(i.tags),affiliateIds:e(i.affiliateIds),internalSku:i.internalSku?String(i.internalSku):i.sku?String(i.sku):void 0,priceCategory:i.priceCategory?String(i.priceCategory):void 0,seoTitle:i.seoTitle?String(i.seoTitle):void 0,seoDescription:i.seoDescription?String(i.seoDescription):void 0,imageAlt:i.imageAlt?String(i.imageAlt):void 0,productType:i.productType?String(i.productType):void 0,fulfillmentType:i.fulfillmentType?String(i.fulfillmentType):void 0,provider:i.provider?String(i.provider):void 0,shippingPolicySummary:i.shippingPolicySummary?String(i.shippingPolicySummary):void 0,returnPolicySummary:i.returnPolicySummary?String(i.returnPolicySummary):void 0,affiliateProvider:i.affiliateProvider?String(i.affiliateProvider):void 0,affiliateDisclosure:i.affiliateDisclosure?String(i.affiliateDisclosure):void 0,priceDisplayPolicy:i.priceDisplayPolicy?String(i.priceDisplayPolicy):void 0,availabilityDisplayPolicy:i.availabilityDisplayPolicy?String(i.availabilityDisplayPolicy):void 0,recommendedFor:e(i.recommendedFor),eventUseCase:i.eventUseCase?String(i.eventUseCase):void 0,printfulProductId:i.printfulProductId?String(i.printfulProductId):void 0,printfulVariantIds:e(i.printfulVariantIds),content:r||"",slug:Do(t)};if(i.type==="event"){const f=i.themeName||i.themeLabel||i.themeDescription||i.themeColors||i.themeOutfitIds||i.themeAccessoryIds?{name:String(i.themeName||""),label:i.themeLabel?String(i.themeLabel):void 0,description:i.themeDescription?String(i.themeDescription):void 0,colors:e(i.themeColors),outfitIds:e(i.themeOutfitIds),accessoryIds:e(i.themeAccessoryIds)}:void 0,d=i.gearOutfitIds||i.gearOutfitDescription||i.gearAccessoryIds||i.gearAccessoryDescription||i.gearShoeIds||i.gearShoeDescription||i.gearEssentialIds||i.gearEssentialDescription||i.gearTravelIds||i.gearTravelDescription?{outfitIds:e(i.gearOutfitIds),outfitDescription:i.gearOutfitDescription?String(i.gearOutfitDescription):void 0,accessoryIds:e(i.gearAccessoryIds),accessoryDescription:i.gearAccessoryDescription?String(i.gearAccessoryDescription):void 0,shoeIds:e(i.gearShoeIds),shoeDescription:i.gearShoeDescription?String(i.gearShoeDescription):void 0,essentialIds:e(i.gearEssentialIds),essentialDescription:i.gearEssentialDescription?String(i.gearEssentialDescription):void 0,travelIds:e(i.gearTravelIds),travelDescription:i.gearTravelDescription?String(i.gearTravelDescription):void 0}:void 0,p=i.theme,m=p?{name:String(p.name||""),label:p.label?String(p.label):void 0,description:p.description?String(p.description):void 0,colors:e(p.colors),outfitIds:e(p.outfitIds),accessoryIds:e(p.accessoryIds)}:void 0,h=i.gear,g=h?{outfitIds:e(h.outfitIds),outfitDescription:h.outfitDescription?String(h.outfitDescription):void 0,accessoryIds:e(h.accessoryIds),accessoryDescription:h.accessoryDescription?String(h.accessoryDescription):void 0,shoeIds:e(h.shoeIds),shoeDescription:h.shoeDescription?String(h.shoeDescription):void 0,essentialIds:e(h.essentialIds),essentialDescription:h.essentialDescription?String(h.essentialDescription):void 0,travelIds:e(h.travelIds),travelDescription:h.travelDescription?String(h.travelDescription):void 0}:void 0;l.theme=m??f,l.gear=g??d,l.relatedEvents=e(i.relatedEvents)}return l}).filter(t=>!t.draft).sort((t,s)=>{const o=t.date?new Date(t.date).getTime():0,i=s.date?new Date(s.date).getTime():0,r=Number.isNaN(o)?0:o;return(Number.isNaN(i)?0:i)-r})}const K={posts:De(Ce.posts),resources:De(Ce.resources),studies:De(Ce.studies),events:De(Ce.events)},wt={posts:new Map(K.posts.map(n=>[n.slug,n])),resources:new Map(K.resources.map(n=>[n.slug,n])),studies:new Map(K.studies.map(n=>[n.slug,n])),events:new Map(K.events.map(n=>[n.slug,n]))},No=()=>K.posts,Po=()=>K.resources,Eo=()=>K.studies,Bo=()=>K.events,Lo=n=>wt.posts.get(n),jo=n=>wt.resources.get(n),Mo=n=>wt.events.get(n),Fo=(n,e)=>{if(n&&n.trim().length>0)return Math.max(1,Math.round(n.split(/\s+/).length/200));const t=e?.split(/\s+/).length??0;return Math.max(1,Math.round(t/20))};export{No as a,Lo as b,Po as c,jo as d,Mo as e,Eo as f,Bo as g,Qe as n,Fo as r};
