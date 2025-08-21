// eslint.config.js (Flat Config, ESLint v9+)
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  // Ignore build/dist
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    "node": true,
    extends: [
      js.configs.recommended,             // ESLint base
      tseslint.configs.recommended,       // TS rules
      tseslint.configs.strict,            // Strict TS rules
      reactHooks.configs['recommended-latest'], // React hooks best practices
      reactRefresh.configs.vite           // React Refresh for Vite
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // ban `any`
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }],
      "no-unused-vars": "off"
    },
  }
)
