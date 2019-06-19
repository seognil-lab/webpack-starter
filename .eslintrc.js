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
        'import/no-extraneous-dependencies': false,
        'import/no-unresolved': false,
        'import/no-dynamic-require': false,
        'require-jsdoc': 'off',
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

    'react/prefer-stateless-function': [false],
    'react/jsx-indent': [false],
    'react/jsx-indent-props': [false],
    'react/jsx-filename-extension': [true, { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': ['warn'],
    'react/jsx-one-expression-per-line': ['warn'],
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
