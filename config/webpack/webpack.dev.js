const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// * ---------------- webpackConfig

const webpackConfig = {
  devtool: 'source-map',
  mode: 'development',
  plugins: [new CleanWebpackPlugin()],
  optimization: { moduleIds: 'named' },
};

module.exports = webpackConfig;
