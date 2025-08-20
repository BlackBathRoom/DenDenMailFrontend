// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  [
    globalIgnores([
      'dist',
      'scripts/template',
      '.storybook',
      'src/routeTree.gen.ts',
    ]),
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['src/**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        parser: tseslintParser,
        parserOptions: {
          project: './tsconfig.app.json',
          sourceType: 'module',
        },
      },
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        import: importPlugin,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            groups: [
              'builtin',
              'external',
              'internal',
              ['parent', 'sibling', 'index'],
            ],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'react-dom',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'next',
                group: 'external',
                position: 'before',
              },
              {
                pattern: 'next/**',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/lib/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/hooks/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/types/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/components/**',
                group: 'internal',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom', 'next'],
            distinctGroup: false,
            warnOnUnassignedImports: true,
            alphabetize: {
              order: 'asc',
              orderImportKind: 'asc',
            },
          },
        ],
      },
    },
    prettier,
  ],
  storybook.configs['flat/recommended']
);
