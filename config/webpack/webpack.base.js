const autoprefixer = require('autoprefixer');
const DartSass = require('dart-sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const argv = require('yargs').argv;
const projRoot = require('app-root-path').path;

// * ================================================================================ chunk name calculator

const pathRegMaker = str => new RegExp(str.replace(/[/]/g, '[\\\\/]'));

const pathReg = {
  node_modules: pathRegMaker(`/node_modules/`),
  package: pathRegMaker(`/node_modules/(.*?)(/|$)`),
  lodash: pathRegMaker(`/node_modules/lodash`),
  lodashmin: pathRegMaker(`lodash.min`),
  lodashfp: pathRegMaker(`lodash/fp`),
};

// * ----------------------------------------------------------------

const chunkNameCalc = module => {
  const context = module.context;

  // * -------------------------------- node_modules

  if (context.match(pathReg.node_modules)) {
    // * ---------------- if using lodash/fp, it will load lodash.min

    if (context.match(pathReg.lodash)) {
      if (module.resource.match(pathReg.lodashmin)) {
        return 'npm/lodash.min';
      }
      if (module.resource.match(pathReg.lodashfp)) {
        return 'npm/lodashfp';
      }
    }

    // * ---------------- other npm packages, split by name or scope

    const moduleName = context.match(pathReg.package)[1];
    return `npm/${moduleName.replace('@', '')}`;
  }

  // * -------------------------------- src files

  if (context.match(/[\\/]src\b/)) {
    const moduleRelativePath = path.relative(projRoot, context);
    if (moduleRelativePath.match(/^src./)) {
      // * max deep 2
      return moduleRelativePath.match(/^src([\\/]+[^\\/.]+){1,2}/)[0];
    }

    // * '/src' folder
    return 'src/index';
  }
};

// * ================================================================================ const variables

const srcDir = path.resolve(projRoot, 'src');
const distDir = path.resolve(projRoot, 'dist');

const mode = argv.mode || 'development';
const source_map = argv.devtool || 'source-map';

// * ================================================================================ main conifg

// * for production long term cache, use `contenthash`
// * for HtmlWebpackPlugin, simply use `hash`
const outHash = mode === 'production' ? '[contenthash:8]' : '';

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

    alias: {
      // ! `lodash/fp` will load `lodash.min` any way,
      // * point `lodash` to `lodash.min`, so this will prevent load both `lodash` and `lodash.min`
      lodash$: require.resolve('lodash/lodash.min.js'),
    },

    // * force using `main` (cjs version) in `package.json` of packages
    // * avoiding other Modular specification (e.g. esm with ES6 codes)
    mainFields: ['main'],
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        // ! seems almost every npm package provides transpiled ES5 cjs codes, so it's safe,
        // * include some of them if there are any issues
        // * https://github.com/babel/babel/issues/8672#issuecomment-420168497

        // * maybe it would have a `babel es6 auto-detect blahblah` in the future // seognil LC 2019/06/14
        // * https://github.com/facebook/create-react-app/issues/1125#issuecomment-264217076

        // * babel 7 will exclude node_modules anyway, so it's unnecessery
        // exclude: /node_modules/,

        test: /\.(js|jsx|ts|tsx)$/,

        // ! seems confilt with webpack cache, so disable the cache
        // use: ['babel-loader?cacheDirectory=true'],

        use: ['babel-loader'],
      },
      {
        test: /\.(scss|sass|less|css)$/,
        use: [
          // * ---------------- load style, pick one

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
        test: /\.(eot|ttf|TTF|woff|woff2|svg|png|jpg|gif)$/i,
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
    moduleIds: 'hashed',
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
          name: chunkNameCalc,
        },
      },
    },
  },
};

// * ================================================================================  output

module.exports = webpackCfg;
