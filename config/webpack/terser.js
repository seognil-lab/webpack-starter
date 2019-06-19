const TerserPlugin = require('terser-webpack-plugin');

const terserUglify = new TerserPlugin({
  cache: true,
  terserOptions: {
    compress: {
      // drop_console: true,
    },
    output: {
      comments: false,
    },
  },
  sourceMap: true,
});

module.exports = terserUglify;
