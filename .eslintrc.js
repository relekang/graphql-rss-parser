module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
  },
  plugins: ['prettier', '@typescript-eslint'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        semi: false,
        printWidth: 100,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
}
