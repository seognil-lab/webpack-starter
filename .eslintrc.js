module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'eslint:recommended'],
  plugins: ['mocha', 'jest'],

  // * simple global way
  env: {
    es6: true,
    browser: true,
  },

  // * for different codes
  overrides: [
    {
      files: ['src/**/*.js'],
      env: { browser: true, node: true },
    },
    {
      files: ['test/**/*.js', '*.test.js'],
      env: { jest: true, mocha: true },
    },
    {
      files: ['config/**/*.js', 'webpack.*.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': 0,
        'import/no-dynamic-require': 0,
        'require-jsdoc': 'off',
        'consistent-return': 0,
      },
    },
  ],

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-console': ['warn'],
    'no-unused-vars': ['warn'],

    // TODO quick fix for react, check later // seognil LC 2019/06/17

    'react/prefer-stateless-function': [0],
    'react/jsx-indent': [0],
    'react/jsx-indent-props': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': ['warn'],
    'react/jsx-one-expression-per-line': ['warn'],
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
