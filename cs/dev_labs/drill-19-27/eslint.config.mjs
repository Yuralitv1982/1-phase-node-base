// eslint.config.js

import n from 'eslint-plugin-n';
import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';
import stylistic from '@stylistic/eslint-plugin';
import importX from 'eslint-plugin-import-x';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import promise from 'eslint-plugin-promise';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

// eslint-disable-next-line import-x/no-default-export
export default [
  {
    files: ['**/*.{js,ts,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'import-x': importX,
      '@typescript-eslint': tseslint,
      promise: promise,
      unicorn: unicorn,
      jsdoc: jsdoc,
      n: n,
      sonarjs: sonarjs,
      security: security,
    },
    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.ts', '.mjs', '.cjs'],
        },
      },
    },
    rules: {
      // 1. Именование
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['camelCase'],
            custom: {
              regex: '^(is|has|can|should)[A-Z][a-zA-Z0-9]*$',
              match: true,
            },
        },
        {
          selector: 'function',
          format: ['camelCase'],
            // Это гарантирует, что функция будет выглядеть как getSomething,
            // а не get_something или get_something_else
            custom: {
              regex:
              '^(get|set|fetch|calculate|validate|is|has|can|should)[A-Z][a-zA-Z0-9]*$',
              match: true,
            },
        },
        { selector: 'class', format: ['PascalCase'] },
      ],

      // 2. Сложность
      'sonarjs/cognitive-complexity': ['error', 4],
      'sonarjs/no-identical-functions': 'error',

      // 3. Безопасность
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'consistent-return': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'security/detect-object-injection': 'warn',

      // 4. Импорты
      'import-x/no-unresolved': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-default-export': 'error',
      'import-x/order': ['error', { 'newlines-between': 'always' }],

      // 5. Асинхронность
      '@typescript-eslint/no-floating-promises': 'error',
      'promise/prefer-await-to-then': 'error',

      // 6. Архитектура
      'unicorn/filename-case': ['error', { case: 'camelCase' }],
      'unicorn/prefer-module': 'error',
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-null': 'warn',
      'unicorn/prefer-ternary': 'warn',

      // 7. Документация
      'jsdoc/require-jsdoc': ['warn', { publicOnly: true }],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  },
];
