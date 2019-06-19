const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const terserUglify = require('./terser');

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
