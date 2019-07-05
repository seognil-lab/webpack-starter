const TerserPlugin = require('terser-webpack-plugin');

const terserUglify = new TerserPlugin({
  cache: true,
  terserOptions: {
    toplevel: true,
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
