const DashboardPlugin = require('webpack-dashboard/plugin');

// * ---------------- webpackConfig

const webpackConfig = {
  devtool: 'source-map',
  mode: 'development',

  plugins: [
    // * HtmlWebpackPlugin move to base
    new DashboardPlugin(),
  ],
};

module.exports = webpackConfig;
