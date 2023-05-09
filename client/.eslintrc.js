module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  ignorePatterns: [
    '/public/',
  ],
  rules: {
    'jsx-a11y/label-has-associated-control': 0,
    'max-len': 1,
    'no-unused-vars': 1,
    'import/no-named-as-default': 0,
  },
};
