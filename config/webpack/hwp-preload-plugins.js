const appRootPath = require('app-root-path').path;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const webpackConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appRootPath, 'public', 'index.html'),
      // removeComments: true,
      // collapseWhitespace: true,
      // removeAttributeQuotes: true,
    }),

    // preload dynamic import
    new PreloadWebpackPlugin({
      rel: 'preload',
      // as(entry) {
      //   if (/\.css$/.test(entry)) return 'style';
      //   if (/\.woff$/.test(entry)) return 'font';
      //   if (/\.png$/.test(entry)) return 'image';
      //   return 'script';
      // },
      // include: 'asyncChunks',
      // fileWhitelist: [/\.files/, /\.to/, /\.include/],

      // * exclude source-map
      // * exclude your dynamic components, name is from splitChunk
      fileBlacklist: [/(^source-map[\\/]|demo)/],
    }),
  ],
};

module.exports = webpackConfig;
