import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import oxlint from 'eslint-plugin-oxlint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'src/routeTree.gen.ts',
      'stats.html',
      'src/main.tsx',
      'vite.config.ts',
      'vitest.config.ts',
      'postcss.config.js',
      'tailwind.config.ts',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: true,
        tsconfigRootDir: dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'core', pattern: 'src/core/**/*' },
        { type: 'ui', pattern: 'src/ui/**/*' },
        { type: 'pattern', pattern: 'src/pattern/**/*' },
        { type: 'layouts', pattern: 'src/layouts/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'routes', pattern: 'src/routes/**/*' },
        { type: 'mocks', pattern: 'src/mocks/**/*' },
      ],
      'boundaries/ignore': ['**/*.spec.ts', '**/*.spec.tsx', '**/__specs__/**', '**/*.gen.ts'],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'core', allow: ['core', 'mocks'] },
            { from: 'ui', allow: ['ui'] },
            { from: 'pattern', allow: ['core', 'ui', 'pattern'] },
            { from: 'layouts', allow: ['core', 'ui', 'layouts'] },
            { from: 'features', allow: ['core', 'ui', 'pattern', 'features'] },
            { from: 'routes', allow: ['core', 'ui', 'pattern', 'layouts', 'features'] },
            { from: 'mocks', allow: ['core', 'mocks', 'features'] },
          ],
        },
      ],
    },
  },
  oxlint.configs['flat/recommended'],
)
