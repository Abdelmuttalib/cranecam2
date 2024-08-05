/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "src/xeokitsdk/vite.config.js",
    "src/types/*.d.ts",
    "src/xeokitsdk/types/viewer/scene/postfx/CrossSections.d.ts",
    "src/xeokitsdk/types/viewer/scene/geometry/builders/buildPolylineGeometry.d.ts",
    "src/xeokitsdk/types/viewer/scene/geometry/builders/buildLineGeometry.d.ts",
    "src/xeokitsdk/types/viewer/scene/geometry/builders",
  ],
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/consistent-indexed-object-style": ["warn", "record"],
    "no-dupe-class-members": "off",
    // any
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    // Function
    "@typescript-eslint/ban-types": [
      "warn",
      {
        types: {
          Function: false,
        },
      },
    ],
    // unused vars
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    // disable prefer const

    "prefer-const": "off",

    "@typescript-eslint/no-floating-promises": "off",

    "@typescript-eslint/no-unsafe-argument": "off",

    "no-var": "off",

    "@next/next/no-sync-scripts": "off",
  },
};
module.exports = config;
