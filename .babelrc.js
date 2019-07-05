// * ES polyfill for src and node_modules is so hard :(

module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    // // * # Polyfill Method 1 #
    // ['@babel/plugin-transform-runtime', { corejs: 3 }],

    // * # Polyfill Method 4 #  don't by babel, by `polyfill.io` service in .html
    // * http://cbutech.net/index.php/archives/264
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        corejs: false,
        regenerator: false,
      },
    ],
  ],
  ignore: [],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',

        // // * # Polyfill Method 2 #  patch `src/` usage polyfill to window
        // // * # Polyfill Method 3 #  use both THIS transform-runtime
        // useBuiltIns: 'usage',
        // corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
