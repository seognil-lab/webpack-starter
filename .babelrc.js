module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // * now auto-patched in src/polyfills-loader // seognil LC 2019/06/18
    // ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
