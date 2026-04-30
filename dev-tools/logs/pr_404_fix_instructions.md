# Instructions to Fix PR 404 (Link Validator TSX Coverage)

Currently, the link validator in PR 404 only scans Markdown files (`content/**/*.md`), completely missing broken links in the website's source code (like the Footer or About pages). Follow these steps to expand the validator and fix the broken links:

1.  **Checkout the PR Branch**
    Ensure you are on the correct branch for the PR.
    ```bash
    git checkout feat/link-validator-automation-4691993855369166304
    ```

2.  **Expand `scripts/validate-links.ts` to Scan TSX Files**
    Add logic to scan the `src/` directory for `.tsx` components and extract hardcoded links. Add the following logic after the markdown parsing loop:
    ```typescript
    const tsxFiles = globSync('src/**/*.tsx');
    const tsxLinkRegex = /(?:href|to|src)=["']([^"']+)["']/g;
    
    for (const file of tsxFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      let match;
      while ((match = tsxLinkRegex.exec(content)) !== null) {
        const url = match[1];
        if (url.startsWith('{')) continue; // Skip dynamic bindings
        
        if (url.startsWith('http')) {
          extractedLinks.push({ file, type: 'external', url });
        } else if (url.startsWith('/')) {
          extractedLinks.push({ file, type: 'internal', url });
        }
      }
    }
    ```

3.  **Ensure Base Application Routes are Registered**
    Verify that `validRoutes` in `validate-links.ts` includes standard app pages that might not be loaded via `content-loader` (e.g., `/privacy`, `/terms`, `/resume`, etc., if they actually exist).

4.  **Fix the Broken Footer Links**
    The expanded validator will now flag the broken links in the footer.
    *   Open `src/layouts/Footer.tsx`.
    *   Update or remove the invalid `href` or `to` attributes for **Privacy**, **Terms**, and **Contact**.

5.  **Fix the Broken About Page Links**
    The validator will also catch broken links on the About page.
    *   Open the About page component.
    *   Update or remove the invalid links to the **Resume** or **CV**.

6.  **Verify and Commit**
    Run the validator locally to confirm it catches the TSX links and that your fixes resolve the errors:
    ```bash
    pnpm tsx scripts/validate-links.ts
    ```
    Commit and push the fixes:
    ```bash
    git add scripts/validate-links.ts src/layouts/Footer.tsx
    git commit -m "fix: expand validator to TSX and fix broken internal routes"
    git push origin feat/link-validator-automation-4691993855369166304
    ```
