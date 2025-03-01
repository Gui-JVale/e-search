import baseConfig from "../../eslint.config.mjs";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    rules: {
      // Service-specific overrides if needed
    },
  },
];
