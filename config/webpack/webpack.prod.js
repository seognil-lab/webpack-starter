const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// * ---------------- TerserPlugin

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

// * ---------------- webpackConfig

const webpackConfig = {
  devtool: 'source-map',
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [terserUglify],
  },
};

module.exports = webpackConfig;
