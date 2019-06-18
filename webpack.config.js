/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DartSass = require('dart-sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const PreloadWebpackPlugin = require('preload-webpack-plugin');

const argv = require('yargs').argv;
const projRoot = require('app-root-path').path;

// * ---------------- uglify plugin

const TerserPlugin = require('terser-webpack-plugin');

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

// * ---------------- build time analyzer wrapper

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

// * ---------------- const variables

const srcDir = path.resolve(projRoot, 'src');
const distDir = path.resolve(projRoot, 'dist');

const mode = argv.mode || 'development';
const source_map = argv.devtool || 'source-map';

// * ---------------------------------------------------------------- main conifg

const outputName = mode === 'production' ? '[name].[contenthash:8].js' : '[name].[hash:8].js';

const webpackCfg = {
  stats: {
    colors: true,
  },
  devtool: source_map,
  mode,

  entry: {
    app: path.resolve(srcDir, 'index.js'),
  },
  output: {
    // TODO support HtmlWebpackPlugin // seognil LC 2019/06/17
    filename: outputName,
    chunkFilename: outputName,
    sourceMapFilename: 'source-map/' + outputName,
    path: distDir,
  },

  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    mainFiles: ['index', 'main'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        // // * transpile everything now, maybe there's a babel es6 auto-detect in the future // seognil LC 2019/06/14
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
      },
      {
        test: /\.(scss|sass|less|css)$/,
        use: [
          // * splitted css file
          MiniCssExtractPlugin.loader,
          // * or packed in js
          // 'style-loader',

          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer()],
            },
          },

          // * will parse less too
          {
            loader: 'sass-loader',
            options: {
              implementation: DartSass,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|TTF|woff|svg|png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(projRoot, 'public', 'index.html'),
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    }),
    // TODO preload // seognil LC 2019/06/18
    // new PreloadWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].built.css',
      chunkFilename: '[id].[hash].bundle.css',
    }),
    new RemoveStrictPlugin(),
    new CleanWebpackPlugin(),
    // ...(mode == 'production' ? [new CleanWebpackPlugin()] : []),
  ],

  optimization: {
    minimizer: [terserUglify],
    namedModules: true,
    namedChunks: true,
    moduleIds: 'named',
    chunkIds: 'named',
    runtimeChunk: {
      name: 'runtime',
    },

    // * tree shaking
    usedExports: true,

    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // * promise for dynamic import
        promise: {
          test: /promise-polyfill/,
          name: `npm/promise-polyfill`,
        },

        // *big npm packages
        bigNpm: {
          test: /[\\/]node_modules[\\/](lodash|core-js|vue|react-dom)([\\/]|$)/,
          name: module => {
            const moduleName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm/${moduleName.replace('@', '-')}`;
          },
          priority: -100,
        },

        // * other vendors, must be called vendors to override webpack default setting
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -1000,
          name: 'npm/vendors',
        },

        // TODO refactor // seognil LC 2019/06/18
        // srcSubModule: {
        //   test: /src[\\/](.*)?([\\/]|$)/,
        //   name: (module, chunks, cacheGroupKey) => {
        //     if (!module.userRequest) return;

        //     const moduleRelativePath = path.relative(projRoot, module.userRequest);

        //     // * not from our src, maybe matched by node_modules/XXX/src
        //     if (!moduleRelativePath.match(/^src/)) return;

        //     // * deep level 1
        //     const output = moduleRelativePath.match(/^(.+[\\/.]){0,1}/);

        //     return output ? output[0].slice(0, -1).replace('@', '-') : 'main';
        //   },
        // },

        srcSubModule: {
          test: /src[\\/]demo[\\/](.*)?[\\/]/,
          name: module => {
            // // * not from our src, maybe matched by node_modules/XXX/src
            // if (!module.userRequest || !path.relative(projRoot, module.userRequest).match(/^src/))
            //   return;

            const moduleName = module.context.match(/[\\/]src[\\/]demo[\\/](.*?)([\\/]|$)/)[1];
            return `src/demo/${moduleName.replace('@', '-')}`;
          },
        },
      },
    },
  },
};

// * ----------------------------------------------------------------  output

module.exports = smp.wrap(webpackCfg);
