## ANTI-AI-SLOP
The PR has a CI failure. Parameterized route paths (`?category=...`) in the route config are anti-patterns for routing libraries, and the E2E test locator is broken.

## FINDINGS
This PR updates the homepage and featured guide panel to "Option D". The `Deployment Impact Analysis` check failed. The addition of parameterized routes in `routes.ts` is problematic. In `verify_homepage_guide.spec.ts`, the locator change to `name: /Featured Guide/i` doesn't match the new UI text `Read Guide →`.

## FINAL RECOMMENDATION
Not Approved

<!-- td-review-manager-comment -->
