/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  globals: {
    defineOptions: "readonly",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "vue/component-name-in-template-casing": [2, "kebab-case"],
        "vue/multi-word-component-names": 0,
      },
    },
  ],
};
