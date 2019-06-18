const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const appRootPath = require('app-root-path').path;

// * ---------------- webpackConfig

const webpackConfig = {
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appRootPath, 'public', 'index.html'),
      // removeComments: true,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true,
    }),
    // TODO preload // seognil LC 2019/06/18
    // new PreloadWebpackPlugin(),
  ],
};

module.exports = webpackConfig;
