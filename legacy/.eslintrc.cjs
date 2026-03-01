module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "out/",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "warn",
  },
};
