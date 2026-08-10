import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default [
  {
    ignores: ["node_modules/", ".next/", "out/", "legacy/", "**/*.config.*"],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];
