module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  globals: {
    JSX: true,
  },
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ['babel', 'import', 'prettier', '@typescript-eslint/eslint-plugin', 'sonarjs', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:sonarjs/recommended'],
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-mutable-exports': 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        warnOnUnassignedImports: true,
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '**.+(css|svg)',
            patternOptions: { matchBase: true },
            group: 'type',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-default-export': 'error',
    'unused-imports/no-unused-imports': 'error',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-identical-functions': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'no-empty-pattern': 'off',
      },
    },
    {
      files: ['*.test.*'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['src/pages/**/index.tsx', '*.config.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-named-export': 'error',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
