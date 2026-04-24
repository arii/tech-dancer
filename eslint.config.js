import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage', 'playwright-report', 'scripts', 'dev-tools', 'src/App.tsx', 'src/components/layout/DetailElements.tsx', 'src/components/ui/CategoryPlaceholder.tsx', 'src/features/dashboard/Dashboard.tsx', 'src/features/journal/components/BlogPostDetail.tsx', 'src/features/lab/components/GearPostDetail.tsx', 'src/features/research/ResearchAnalytics.tsx', 'src/features/research/useResearch.ts', 'src/features/ux-auditor/useUXAuditor.ts', 'src/hooks/use-contact-form.ts', 'src/hooks/useHotkeys.ts', 'src/layouts/Box.tsx', 'src/styles/design-tokens.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
);
