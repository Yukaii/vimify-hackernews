/* eslint-env node */
module.exports = {
  extends: [
    "semistandard",
    "prettier",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true
}
