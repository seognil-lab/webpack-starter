const argv = require('yargs').argv;
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// * ---------------- search configs

const task = argv.liveReload ? 'server' : argv.mode === 'production' ? 'prod' : 'dev';
const subConfig = require(`./webpack.${task}.js`);
const baseConfig = require(`./webpack.base.js`);
const hwp = require('./hwp-preload-plugins');

// * ---------------- merge config and `build time` analyzer

const smp = new SpeedMeasurePlugin();
let webpackConfig = smp.wrap(merge(baseConfig, subConfig));

// ! tircky PATCH for SpeedMeasurePlugin + HtmlWebpackPlugin // seognil LC 2019/06/19
webpackConfig.plugins.push(...hwp.plugins);

module.exports = webpackConfig;
