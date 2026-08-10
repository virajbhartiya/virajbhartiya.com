import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    // Keep in sync with .gitignore. Build output is not committed, so linting
    // it passes in CI on a fresh clone but fails locally for anyone who has
    // run a build.
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      "coverage/",
      ".vercel/",
      "legacy/",
      "**/*.config.*",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];
