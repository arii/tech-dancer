export interface PromptCategory {
  id: string;
  name: string;
  matcher: (files: string[]) => boolean;
  guidance: string;
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: 'ci-cd',
    name: 'CI/CD Workflows',
    matcher: (files) => files.some(f => f.startsWith('.github/workflows/') || f.endsWith('.yml') || f.endsWith('.yaml')),
    guidance: `CI/CD Workflows:
- Ensure all GitHub Actions use specific versions (e.g., @v4) rather than @main.
- Verify that secret variables are only passed to steps that explicitly require them.
- Check for redundant or overlapping workflow triggers.
- Ensure that shell blocks use double quotes for environment variables to prevent injection.`,
  },
  {
    id: 'llm-integration',
    name: 'LLM Client Integrations',
    matcher: (files) => files.some(f => f.includes('clients/') || f.includes('llm') || f.includes('ai') || f.includes('CodeReviewClient')),
    guidance: `LLM Client Integrations:
- Verify that API keys and sensitive tokens are never hardcoded and are always sourced from environment variables.
- Check that error handling is robust, especially for network timeouts or API rate limits.
- Ensure that model parameters (like temperature, maxTokens) are tuned for the specific use case.
- For GitHub Models, confirm the baseURL is correctly set to 'https://models.inference.ai.azure.com'.`,
  },
  {
    id: 'build-config',
    name: 'Build/Bundler Configurations',
    matcher: (files) => files.some(f => f.includes('vite.config') || f.includes('tsconfig.json') || f.includes('package.json') || f.includes('rollup')),
    guidance: `Build/Bundler Configurations:
- Ensure new dependencies added to package.json are actually used in the code.
- Check that build artifacts (like dist/, build/) are not accidentally committed.
- Verify that TypeScript configuration changes don't inadvertently loosen type-checking rules.`,
  },
  {
    id: 'react-components',
    name: 'React Components',
    matcher: (files) => files.some(f => f.endsWith('.tsx') || f.endsWith('.jsx')),
    guidance: `React Components:
- Check for proper use of React hooks (e.g., dependency arrays in useEffect/useMemo).
- Ensure components are accessible (ARIA labels, semantic HTML).
- Verify that components handle loading and error states gracefully.
- Follow the design system's color palette and avoid hardcoded 'neon' or 'vibrant' colors.`,
  },
  {
    id: 'typescript-types',
    name: 'TypeScript Definitions',
    matcher: (files) => files.some(f => f.endsWith('.d.ts') || f.includes('types.ts')),
    guidance: `TypeScript Definitions:
- Favor interfaces over types for public APIs to allow for declaration merging.
- Avoid using 'any' unless absolutely necessary; prefer 'unknown' for untrusted data.
- Ensure that optional properties are correctly marked with '?'.`,
  },
  {
    id: 'python-scripts',
    name: 'Python Scripts',
    matcher: (files) => files.some(f => f.endsWith('.py')),
    guidance: `Python Scripts:
- Follow PEP 8 style guidelines.
- Ensure proper error handling and logging rather than silent failures.
- Check that dependencies are properly managed and not assumed to be globally available.`,
  },
  {
    id: 'tests',
    name: 'Test Files',
    matcher: (files) => files.some(f => f.includes('.test.') || f.includes('.spec.') || f.startsWith('tests/')),
    guidance: `Test Files:
- Ensure tests cover both happy paths and edge cases (error conditions, empty states).
- Use descriptive test names that explain the expected behavior.
- Avoid overly brittle tests that rely on specific implementation details rather than outcomes.`,
  },
];
