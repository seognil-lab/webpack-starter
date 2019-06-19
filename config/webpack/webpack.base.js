const autoprefixer = require('autoprefixer');
const DartSass = require('dart-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const argv = require('yargs').argv;
const projRoot = require('app-root-path').path;

// * ---------------- const variables

const srcDir = path.resolve(projRoot, 'src');
const distDir = path.resolve(projRoot, 'dist');

const mode = argv.mode || 'development';
const source_map = argv.devtool || 'source-map';

// * ---------------------------------------------------------------- main conifg

// * for production long term cache, use `contenthash`
// * for HtmlWebpackPlugin, simply use `hash`
const outHash = mode === 'production' ? '[contenthash:8]' : '[hash:8]';

const webpackCfg = {
  stats: {
    colors: true,
  },

  // * default, should be overwrite
  devtool: source_map,
  mode,

  // * -------------------------------- input output

  entry: {
    app: path.resolve(srcDir, 'index.js'),
  },
  output: {
    filename: `[name].${outHash}.js`,
    chunkFilename: `[name].${outHash}.js`,
    sourceMapFilename: `source-map/[name].${outHash}.js.map`,
    path: distDir,
  },

  // * -------------------------------- resolve loader

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
        // TODO later // seognil LC 2019/06/18
        // // * transpile everything now, maybe there's a babel es6 auto-detect in the future // seognil LC 2019/06/14
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,

        // ! seems confilt with webpack cache, so disable it
        // use: ['babel-loader?cacheDirectory=true'],

        use: ['babel-loader'],
      },
      {
        test: /\.(scss|sass|less|css)$/,
        use: [
          // * ---------------- load style, choose one

          // * splitted css file
          MiniCssExtractPlugin.loader,

          // * or packed in js
          // 'style-loader',

          // * ---------------- parser

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

  // * -------------------------------- plugins optimization

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // TODO optimize  // seognil LC 2019/06/19
      filename: '[name].built.css',
      chunkFilename: `[id].${outHash}.css`,
    }),
    new WebpackNotifierPlugin({
      title: 'Webpack Build',
      excludeWarnings: true,
    }),
    // new RemoveStrictPlugin(),
  ],

  optimization: {
    // * enabled in prod.js
    // minimizer: [terserUglify],

    namedModules: true,
    namedChunks: true,
    moduleIds: 'named',
    chunkIds: 'named',
    runtimeChunk: {
      name: 'runtime',
    },

    // * tree shaking ?
    usedExports: true,

    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        // * other vendors, must be called vendors to override webpack default setting
        // * automatic split everything // seognil LC 2019/06/19
        vendors: {
          test: /./,
          priority: -1000,
          // name: 'npm/vendors',
          name: module => {
            const context = module.context;

            if (context.match(/[\\/]node_modules[\\/]/)) {
              // * ---- npm package

              const moduleName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm/${moduleName.replace('@', '')}`;
            } else if (context.match(/[\\/]src\b/)) {
              // * ---- src package

              const moduleRelativePath = path.relative(projRoot, context);
              if (moduleRelativePath.match(/^src./)) {
                // * max deep 2
                return moduleRelativePath.match(/^src([\\/]+[^\\/.]+){1,2}/)[0];
              }

              // * '/src' folder
              return 'src/index';
            }
          },
        },
      },
    },
  },
};

// * ----------------------------------------------------------------  output

module.exports = webpackCfg;
