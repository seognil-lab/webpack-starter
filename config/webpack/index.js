const appRootPath = require('app-root-path').path;
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const task = argv.liveReload ? 'server' : argv.mode === 'production' ? 'prod' : 'dev';
const subConfig = require(`./webpack.${task}.js`);
const baseConfig = require(`./webpack.base.js`);

// * ---------------- merge config and `build time` analyzer

const smp = new SpeedMeasurePlugin();
let webpackConfig = smp.wrap(merge(baseConfig, subConfig));

// ! tircky PATCH for SpeedMeasurePlugin + HtmlWebpackPlugin // seognil LC 2019/06/19
webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: path.join(appRootPath, 'public', 'index.html'),
    // removeComments: true,
    // collapseWhitespace: true,
    // removeAttributeQuotes: true,
  }),
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

    // * exclude, chunkName is from splitChunk
    fileBlacklist: [/(core-js)/],
  }),
);

module.exports = webpackConfig;
