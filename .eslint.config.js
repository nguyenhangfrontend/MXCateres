import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules/*",
      "public/*",
      "scripts/*",
      "**/*.css",
      "**/*.svg",
      "**/.vscode",
      "**/package.json",
      "**/package-lock.json",
    ],
  },
  {
    // specify the formats on which to apply the rules below
    files: ["**/*.{ts,tsx}"],
    // use predefined configs in installed eslint plugins
    extends: [
      // js
      js.configs.recommended,
      // ts
      ...tseslint.configs.recommended,
      // react
      react.configs.flat.recommended,
      // import
      importPlugin.flatConfigs.recommended,
      // a11y (accessibility
      jsxA11y.flatConfigs.recommended,
      // prettier
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // specify used plugins
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      // for eslint-plugin-react to auto detect react version
      react: {
        version: "detect",
      },
      // for eslint-plugin-import to use import alias
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": "warn",
      "react/button-has-type": "error",
      "react/react-in-jsx-scope": ["off"],
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/prefer-const": 0,
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      camelcase: "warn",
      "spaced-comment": "error",
      quotes: ["error", "single"],
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          jsxSingleQuote: true,
          semi: true,
          printWidth: 120,
          trailingComma: "all",
          useTabs: false,
          tabWidth: 2,
          bracketSpacing: true,
        },
      ],
      // 'no-unused-vars': ['error'],
      "prefer-const": 0,
      "import/imports-first": 0,
      "import/newline-after-import": 0,
      "lines-between-class-members": ["error", "always"],
      "padded-blocks": ["error", "never"],
      "object-shorthand": ["error", "always"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "jsx-quotes": ["error", "prefer-single"],
      "max-lines": ["error", 800],
      "max-len": ["error", { code: 120 }],
      complexity: ["error", 30],
      "no-console": "warn",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "always", prev: ["if"], next: "*" },
        { blankLine: "always", prev: ["*"], next: "if" },
      ],
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "comma-dangle": "off",
      "linebreak-style": "off",
      eqeqeq: ["error", "always"],
      indent: ["error", 2, { ignoredNodes: ["PropertyDefinition"] }],
      "no-multiple-empty-lines": "error",
      semi: "error",
      "no-duplicate-imports": "error",
    },
  }
);
