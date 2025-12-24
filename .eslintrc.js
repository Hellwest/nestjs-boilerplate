module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint/eslint-plugin", "prettier", "import"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    // general
    "max-lines": ["error", 500],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@prettier/semi": "off",
    semi: ["error", "never"],

    // prettier
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        semi: false,
        arrowParens: "always",
      },
    ],

    // imports
    "import/order": [
      "error",
      {
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": "warn",
    "import/no-anonymous-default-export": "warn",
    "import/no-default-export": "error",
  },
}
