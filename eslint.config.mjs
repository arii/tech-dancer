import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'playwright-report', 'test-results', '.venv'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/purity': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='require'][arguments.0.value='url']",
          message: "Please use 'import' instead of 'require(\"url\")'.",
        },
        {
          selector: "MemberExpression[object.name='url'][property.name='parse']",
          message: "Please use the WHATWG URL API (new URL()) instead of url.parse().",
        },
        {
          selector: "CallExpression[callee.object.callee.name='require'][callee.object.arguments.0.value='url'][callee.property.name='parse']",
          message: "Please use the WHATWG URL API (new URL()) instead of url.parse().",
        },
        {
          selector: "ImportDeclaration[source.value='url'] > ImportSpecifier[imported.name='parse']",
          message: "Please use the WHATWG URL API (new URL()) instead of url.parse().",
        }
      ],
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: [
      'src/layouts/**/*.tsx',
      'src/components/ui/**/*.tsx',
      'src/components/editorial/**/*.tsx'
    ],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'off',
    },
  },
);
