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

export default tseslint.config(
  [
    globalIgnores(['dist', 'scripts/template', '.storybook', 'src/stories']),
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
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
    prettier,
  ],
  storybook.configs['flat/recommended']
);
