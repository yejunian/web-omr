/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  // Plugin: @ianvs/prettier-plugin-sort-imports
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^vite($|[:/])",
    "^react($|[:/])",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.0.0",

  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};

export default config;
