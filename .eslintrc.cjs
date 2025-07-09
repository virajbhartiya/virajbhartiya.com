module.exports = {
  root: true,
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
    "vite.config.ts",
  ],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint", "react", "react-refresh"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
      ],
      settings: {
        react: { version: "detect" },
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      },
    },
    {
      files: ["**/*.js"],
      extends: ["eslint:recommended"],
      rules: {},
    },
  ],
};
