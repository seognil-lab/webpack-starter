const argv = require('yargs').argv;
const merge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const task = argv.liveReload ? 'server' : argv.mode === 'production' ? 'prod' : 'dev';
const subConfig = require(`./config/webpack.${task}.js`);
const baseConfig = require(`./config/webpack.base.js`);

// * ---------------- merge config and `build time` analyzer

const webpackConfig = new SpeedMeasurePlugin().wrap(merge(baseConfig, subConfig));

module.exports = webpackConfig;
