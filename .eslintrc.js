require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['relekang', 'relekang/configs/typescript', 'relekang/configs/jest'],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    'eslint-config-relekang': {
      babel: false,
      typescript: true,
      react: false,
      jest: true,
    },
  },
};
