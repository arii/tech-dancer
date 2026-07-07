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
    // Scoped to actual workflow/action files, not every .yml in the repo
    // (which would also match unrelated config like Renovate, docs frontmatter, etc.)
    matcher: (files) => files.some(f =>
      f.startsWith('.github/workflows/') || f.startsWith('.github/actions/')
    ),
    guidance: `CI/CD Workflows:
- \`if: always()\` combined with \`continue-on-error: true\` is an intentional pattern for
  non-blocking advisory steps (e.g. AI review agents) here — do not flag this combination as
  "errors are silently swallowed" without checking whether a later step aggregates verdicts
  and exits non-zero on real failures.
- \`\${{ secrets.X }}\` and \`\${{ vars.X }}\` are GitHub Actions' own interpolation syntax —
  do not suggest replacing them with JS template literals or flag them as injection risks
  without evidence the value flows into an actual shell command unsafely.
- Action version pins (e.g. \`@v6\`, \`@v7\`) reflect this repo's current, intentional choices —
  do not flag a specific version as "should be @v4" or any other version you assume is current;
  only flag a pin if the diff itself shows a regression to a less-pinned form (e.g. \`@main\`,
  no version at all).
- Only flag as blocking: a step consuming a secret/output that's never produced anywhere in the
  file, a \`needs:\` reference to a nonexistent job, or YAML that would fail to parse.`,
  },
  {
    id: 'llm-integration',
    name: 'LLM Client Integrations',
    // Scoped to actual client files, not any path containing the substring "ai"
    // (which previously matched unrelated files like domain.ts, container.ts, etc.)
    matcher: (files) => files.some(f =>
      f.includes('clients/') ||
      f.endsWith('CodeReviewClient.ts') ||
      f.endsWith('VisualReviewClient.ts') ||
      f.includes('modelPicker.ts')
    ),
    guidance: `LLM Client Integrations — READ BEFORE FLAGGING AUTH/MODEL ISSUES:
This codebase calls two different LLM providers through a shared OpenAI-compatible interface.
Do NOT assume \`ChatOpenAI\` always means talking to OpenAI's own API.
- "GitHub Models" clients use \`ChatOpenAI\` but override \`configuration.baseURL\` to point at
  GitHub's own inference proxy. In this pattern, \`process.env.GITHUB_TOKEN\` IS the correct
  credential (GitHub Models authenticates with a GitHub token that has \`models: read\`
  permission) — this is NOT an OpenAI API key and should not be flagged as one.
- Model name strings like 'gpt-4o-mini' refer to GitHub's own model catalog
  (\`models.github.ai/catalog/models\`), not OpenAI's direct catalog — do not flag these as
  "invalid OpenAI model names."
- Gemini clients use \`ChatGoogleGenerativeAI\` and \`process.env.GEMINI_API_KEY\` — a separate,
  correctly-scoped credential.
- Only flag this pattern as broken if the diff itself removes/breaks the \`baseURL\` override,
  the auth header construction, or the catalog fetch URL — not merely because a client class is
  named \`ChatOpenAI\` or because a hardcoded baseURL string doesn't match what you expect.
- API keys/tokens sourced from \`process.env.*\` are the established pattern here — only flag a
  credential as hardcoded if you see a literal string value in the diff, not an env var read.
- Token-budget code (input/output token estimation, dynamic \`maxTokens\`) is defensive
  engineering against real provider errors — treat heuristic estimates as intentional unless the
  diff shows the estimate omitting a real component of the request payload.`,
  },
  {
    id: 'build-config',
    name: 'Build/Bundler Configurations',
    matcher: (files) => files.some(f =>
      f.includes('vite.config') || (f.includes('tsconfig') && f.endsWith('.json')) ||
      f === 'package.json' || f.includes('rollup.config') || f === '.npmrc'
    ),
    guidance: `Build/Bundler Configurations:
- \`pnpm-lock.yaml\`-adjacent \`package.json\` diffs are often auto-generated alongside dependency
  bumps — do not flag a version bump alone as risky without evidence of a breaking change cited
  from the diff or PR goal.
- A \`tsconfig*.json\` or \`vite.config.ts\` change is only HIGH severity if you can point to a
  specific import, path alias, or build target elsewhere in the diff/external context that it
  demonstrably breaks. Do not speculate about hypothetical future breakage with no evidence.
- Env var prefixing rules (e.g. Vite requires \`VITE_\` for client-exposed vars) matter — flag a
  new env var read in client-side code that lacks the required prefix.
- Do not flag missing type-checking strictness changes as a problem unless the diff is the one
  loosening an existing strict setting (e.g. removing \`strict: true\`).
- DO NOT allow \`use-node-version\` in \`.npmrc\`. This property breaks Vercel deployments.
  Node versioning must be handled via \`engines\` in \`package.json\`, \`.node-version\`, or \`.nvmrc\`.`,
  },
  {
    id: 'react-components',
    name: 'React Components',
    matcher: (files) => files.some(f => f.endsWith('.tsx') || f.endsWith('.jsx')),
    guidance: `React Components:
- Flag as blocking: conditional/early-return hook calls (real rules-of-hooks violations),
  \`useEffect\`/\`useMemo\` dependency arrays that are demonstrably stale given the diff.
- Do NOT flag the absence of \`React.memo\`, \`useCallback\`, or \`useMemo\` as a bug — these are
  performance opinions, not correctness issues, unless the PR's stated goal is specifically a
  performance optimization.
- This project enforces color usage via CSS variables / design tokens (\`tokens.css\`), checked
  by a dedicated CI step that greps for raw hex literals outside that file. Flag new raw hex
  color literals (e.g. \`#3fae2f\`) in \`.tsx\` as a real anti-pattern — but don't invent
  subjective color-taste judgments ("too vibrant," "too neon") beyond that mechanical rule.`,
  },
  {
    id: 'typescript-types',
    name: 'TypeScript Definitions',
    matcher: (files) => files.some(f => f.endsWith('.d.ts') || f.endsWith('Types.ts')),
    guidance: `TypeScript Definitions:
- A type/interface change is only blocking if you can also see, in the SAME diff or in the
  provided EXTERNAL CONTEXT, a concrete usage site that becomes invalid as a result. State what
  file/line you'd need to see to verify it rather than assuming downstream code breaks.
- Removing a field from an interface is not automatically a regression if the diff (or external
  context) also shows the only call sites reading that field were updated in the same change.
- Prefer noting a missing \`?\` on an optional property only when the diff shows a call site that
  doesn't always provide that property — not as a blanket style preference.`,
  },
  {
    id: 'python-scripts',
    name: 'Python Scripts',
    matcher: (files) => files.some(f => f.endsWith('.py')),
    guidance: `Python Scripts:
- \`sys.path\` manipulation at the top of dev-tools scripts (e.g. \`sys.path.append(...)\`) is
  intentional for this repo's CI invocation pattern (\`PYTHONPATH=dev-tools python3 -m ...\`) —
  do not flag it as a code smell.
- \`logger\` usage follows this codebase's existing stdlib \`logging\` convention — don't suggest
  swapping to \`print()\` or a different logging library.
- Flag as blocking: incorrect exit codes (an error path that calls \`sys.exit(0)\`), or genuine
  exceptions that would propagate uncaught and crash the CI step.`,
  },
  {
    id: 'tests',
    name: 'Test Files',
    matcher: (files) => files.some(f =>
      f.includes('.test.') || f.includes('.spec.') || f.startsWith('tests/')
    ),
    guidance: `Test Files:
- Mocking/spying on \`console\`, \`process.stdout\`, or filesystem calls is standard test hygiene
  here, not a sign of hiding errors.
- Flag as blocking only if: an assertion checks the wrong thing relative to the test's own
  setup, or a test would pass regardless of the implementation (a tautological assertion) — and
  you can demonstrate this from the test body itself.
- Do not require 100% edge-case coverage as a blocking issue; suggest missing cases as a
  non-blocking note instead, per the general hedge-language severity rules.`,
  },
];
