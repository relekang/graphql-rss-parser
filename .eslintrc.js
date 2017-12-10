module.exports = {
  extends: ["eslint:recommended",  "prettier"],
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: [
    "prettier"
  ],
  env: {
    node: true,
    es6: true ,
  },
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      "bracketSpacing": true,
      "semi": false,
      "printWidth": 100,
    }]
  }
}
