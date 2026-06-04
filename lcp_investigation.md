largest-contentful-paint failure for maxNumericValue assertion

expected: <= 9000 found: 9461.609700000005

all values: 9539.0478 9533.696174999997 9461.609700000005

 
So the page at: 
 
```txt 
http://localhost:4173/tech-dancer/ 
is taking about 9.46–9.54 seconds LCP, while the CI budget allows only 9.0 seconds.

The punycode warning is not the failure. This line is the actual failure:

Assertion failed. Exiting with status code 1. 
Likely cause
Because this is the arii/merch branch, the likely regression is that the merch work added or changed something above the fold on the homepage that Lighthouse treats as the LCP element, such as:

- a large hero image 
- a merch image/mockup 
- an oversized product graphic 
- an image without width/height 
- a non-optimized PNG 
- an eager-loaded below-the-fold image 
- a layout shift that delays final paint 
- heavy JS or CSS blocking first render 
The important clue is that all three Lighthouse runs are consistently above the limit, so this is probably a real performance regression, not just flakiness.

What to check first
Run Lighthouse locally on the PR branch and inspect the LCP element:

git checkout arii/merch 
pnpm install --frozen-lockfile 
pnpm build 
VITE_BASE_PATH=/tech-dancer/ pnpm run preview 
CHROME_PATH=/ms-playwright/chromium-1148/chrome-linux/chrome pnpm lhci autorun --collect.url=http://localhost:4173/tech-dancer/ 
Then open the report from the log:

https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1780521454144-26941.report.html 
Look for:

Performance → Largest Contentful Paint element 
That will tell you exactly which element is causing the failure.

Likely fixes
If the LCP element is a merch/product/hero image:

- Resize the source image to the actual rendered size. 
- Use WebP/AVIF instead of a large PNG where possible. 
- Add explicit `width` and `height`. 
- Use responsive `srcset` / `sizes`. 
- Avoid full-resolution mockups in the first viewport. 
- Lazy-load images below the fold. 
- Do not lazy-load the actual LCP hero image; instead optimize it and consider preloading it. 
- Reduce mobile/desktop hero image height if it dominates the first viewport. 
If the LCP element is text:

- Check whether web fonts are blocking rendering. 
- Make sure font loading uses `font-display: swap`. 
- Reduce render-blocking CSS or unnecessary initial JS. 
If the merch branch added many images to the homepage:

- Move non-critical merch cards lower on the page. 
- Lazy-load merch thumbnails. 
- Use smaller thumbnails instead of full product images. 
- Avoid rendering hidden carousel images eagerly. 
Lighthouse CI is failing because LCP regressed above the configured budget. 
 
The budget is `largest-contentful-paint <= 9000ms`, but this branch reports: 
 
- 9539ms 
- 9534ms 
- 9462ms 
 
This is a consistent failure across all three Lighthouse runs, so it looks like a real performance issue rather than a flaky run. 
 
Please inspect the Lighthouse report’s “Largest Contentful Paint element” and optimize the above-the-fold element. Since this is the merch branch, likely fixes include resizing/compressing merch or hero images, adding explicit image dimensions, lazy-loading below-the-fold images, and avoiding oversized product graphics in the first viewport. 
 
Do not raise the Lighthouse threshold unless we confirm the budget is unrealistic. The first fix should be reducing the LCP element cost. 



1 result(s) for http://localhost:4173/tech-dancer/ : 
 
  ✘  largest-contentful-paint failure for maxNumericValue assertion 
       Largest Contentful Paint 
       https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/ 
 
        expected: <=9000 
           found: 9461.609700000005 
      all values: 9539.0478, 9533.696174999997, 9461.609700000005 
 
Assertion failed. Exiting with status code 1. 
 
(node:2075) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. 
(Use `node --trace-deprecation ...` to show where the warning was created) 
Uploading median LHR of http://localhost:4173/tech-dancer/...success! 
Open the report at https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1780521454144-26941.report.html 
GitHub token found, attempting to set status... 
GitHub accepted "failure" status for "lhci/url/tech-dancer/". 
assert command failed. Exiting with status code 1. 
 
 ELIFECYCLE  Command failed with exit code 1.

I've investigated the LCP failure on the homepage. The Lighthouse reports indicate that the <h2> element containing the text "Explore by topic" is the Largest Contentful Paint element.

It seems to be delayed primarily by a large renderDelay (~8.9 seconds). The total LCP time is around 9.4s.

The font-display property for fonts does seem to be set to swap via the Google Fonts link in index.html.

Looking at the main chunk size warning during the build process:

(!) Some chunks are larger than 400 kB after minification. Consider:
- Using dynamic import() to code-split the application
And bootup-time and unused-javascript audits report ~1.5 - 1.8s of wasted execution time due to a large JS chunk. The HeroParticleCanvas takes up significant scripting time too (~200ms).

Another potential culprit is HeroSection.tsx which contains animation classes with delays, such as:

.hero-cta-anim {
  animation: fadeIn 0.8s ease forwards 1.0s;
}
However, the LCP element itself ("Explore by topic") is below the fold.

Wait, if it's considered the Largest Contentful Paint, maybe the font loading or some blocking JS is preventing the text from rendering earlier? The text font is font-display which means it is delayed by the web font loading if it's the font-family: var(--raw-font-display); which maps to Bricolage Grotesque.

Or maybe we can improve the LCP by using content-visibility: auto on TopicGrid.tsx or moving something to improve the render delay? Or removing the animation delay on the hero that might block rendering?

Since this branch added the merch feature, I noticed that src/pages/Home.tsx has LatestPosts and DevLabCallout below. Where is the merch? Wait, I couldn't find merch on Home.tsx but maybe it's in the navbar or added somewhere else that increased bundle size?

Should I try code-splitting the router or lazy loading the below-the-fold components in Home.tsx like TopicGrid, FeaturedEventGuide, GearShelf, LatestPosts, and DevLabCallout? Or should I investigate why the LCP element is delayed by 8.9s? Any specific direction you want me to take?

Investigate why the LCP element is delayed by 8.9s. publish changes

Today 15:05
I've investigated the LCP issue:

The LCP element reported by Lighthouse on the arii/merch branch is the <h2> text element "Explore by topic" inside TopicGrid.tsx, which sits below the fold. It has a significant Render Delay of ~8.9s, resulting in a total LCP of ~9.4s.

After comparing the files, it seems the LCP issue might be caused by two things:

HeroSection.tsx has opacity: 0 CSS animations like fadeUp and fadeIn with delays ranging from 0.4s to 1.0s (.hero-tagline-anim, .hero-cta-anim). These animations on the hero (which is above the fold) might cause Lighthouse to pick up elements below the hero (like TopicGrid's text) as the LCP element, or delay the paint due to rendering.
The TopicGrid itself is not lazy loaded.
The Merch PR might have added large CSS/JS (e.g. from the Printful integration or merch assets).
I tested removing the animation classes (opacity-0, hero-tagline-anim, etc.) from HeroSection.tsx but Lighthouse still reported an LCP of ~9.35s and pointed to a different text element within the Hero section ("Training notes, event guides, gear reviews...") with a render delay of 8.8s.

This 8.8s render delay for an above-the-fold text element indicates that a resource (likely a web font or blocking JS/CSS) is holding up the first paint. Looking at index.html:

<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?...&display=swap" />
<link href="https://fonts.googleapis.com/css2?...&display=swap" rel="stylesheet">
Although it has display=swap, Lighthouse reports that total-blocking-time is relatively low, but mainthread-work-breakdown points to script evaluation taking ~1.0s.

Wait! A major hint from vite.config.ts:

      ViteImageOptimizer({
        includePublic: true, ...
      })
Is there a large image being loaded eagerly above the fold? The FeaturedGuidePanel next to the hero has an image:

      <img
        src={`${ASSET_PREFIX}${FEATURED.image}`}
        alt={FEATURED.title}
        width={420}
        height={600}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden="true"
      />
And the merch work added wcs-travel-pack.webp which is ~271 KB. Wait, that's not excessively huge.

To properly fix the LCP issue, we need to reduce the render delay.

What do you recommend I try next? Should I:

Remove opacity: 0 and the long animation delays from the HeroSection text so it paints immediately?
Preload the primary font files instead of relying entirely on the Google Fonts CSS?
Defer loading the large TopicGrid components using React lazy?
Modify lighthouserc.json temporarily to see if it's the font-display: swap causing the LCP metric delay in a headless browser?
Investigate the font loading (Bricolage Grotesque) and potentially lazy-load below-the-fold components like TopicGrid, FeaturedEventGuide, GearShelf, LatestPosts, and DevLabCallout to address the LCP failure, as the 'Explore by topic' header is currently being delayed by font loading and script execution. Please prioritize testing the lazy-loading of these components first.


Today 15:41
I've investigated the LCP issue. The reported LCP element is the "Explore by topic" header (or the paragraph block in the hero section when the DOM is lazy loaded). The delay is primarily driven by the Render Delay phase, which takes up ~95% of the total time (about 7.4s - 9.1s depending on the configuration).

This large render delay is usually caused by long-running main thread tasks (like script evaluation) and render-blocking CSS/fonts. I've tried a few things:

Lazy-loading components below the fold: I attempted to lazy load the TopicGrid, FeaturedEventGuide, GearShelf, LatestPosts, and DevLabCallout components using React's lazy and Suspense. This reduced the DOM size and decreased the total blocking time slightly, but the LCP was still around 9.3s.
Font optimization: I added a specific <link rel="preload"> for the WOFF2 font files in index.html to prioritize the loading of the Bricolage Grotesque and Albert Sans fonts. I also tested swapping the font-display: swap property to optional or removing it, but neither yielded a significant drop in the LCP metric.
Removing CSS animation delays: I removed the opacity-0 and delay classes from HeroSection.tsx to force the hero text to paint immediately. Even with these animations removed, the LCP remained high (around 8.0s - 8.6s).
The Lighthouse audit reports large potential savings by reducing unused JavaScript (the main chunk index-xxxx.js is ~785KB and has ~305KB of wasted bytes) and minimizing main-thread work. Script evaluation is taking roughly 1.0s.

Given that these targeted fixes didn't bring the LCP down to the required <= 9.0s threshold (it fluctuates between 8.0s to 9.5s on my machine, which is still perilously close or above the budget), I suspect the underlying cause is the overall JavaScript bundle size and execution cost introduced in the arii/merch branch. The merch branch likely brought in a heavy dependency or component that's impacting the global script evaluation time.

Should I try:

Implementing route-level code splitting using React.lazy in src/config/routes.ts or App.tsx?
Checking the dependencies added in the merch branch and seeing if we can dynamically import them?
Or are there specific elements in HeroSection.tsx or FeaturedGuidePanel.tsx that I should further simplify?
Let's prioritize option 2: investigate the heavy dependencies from the 'merch' branch and see if they can be dynamically imported, as that seems to be the primary driver of the LCP delay. Please also implement the route-level code splitting mentioned in option 1. Once these are applied, publish changes.
