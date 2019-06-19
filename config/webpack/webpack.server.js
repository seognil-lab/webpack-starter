const DashboardPlugin = require('webpack-dashboard/plugin');

// * ---------------- webpackConfig

const webpackConfig = {
  devtool: 'source-map',
  mode: 'development',

  plugins: [
    // * HtmlWebpackPlugin move to separated files for works with SMP

    // * Dashboard may called by scripts/start.sh
    new DashboardPlugin(),
  ],
};

module.exports = webpackConfig;
