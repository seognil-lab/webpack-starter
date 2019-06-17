/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DartSass = require('dart-sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const RemoveStrictPlugin = require('remove-strict-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// * ---------------- uglify plugin

const TerserPlugin = require('terser-webpack-plugin');

const uglifyJS = new TerserPlugin({
    cache: true,
    terserOptions: {
        compress: {
            drop_console: true,
        },
        output: {
            comments: false,
        },
    },
});

// * ---------------- build time analyzer wrapper

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

// * ---------------- const variables

const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

const mode = process.env.NODE_ENV || 'development';
const source_map = process.env.SOURCE_MAP;

// * ---------------------------------------------------------------- main conifg

const webpackCfg = {
    stats: {
        colors: true,
    },
    devtool: source_map,
    mode,

    entry: ['@babel/polyfill', path.resolve(srcDir, 'index.js')],
    output: {
        filename: 'index.bundle.js',
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
            template: path.join(__dirname, 'public', 'index.html'),
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].built.css',
            chunkFilename: '[id].[hash].bundle.css',
        }),
        new RemoveStrictPlugin(),
        ...(mode == 'production' ? [new CleanWebpackPlugin()] : []),
    ],

    optimization: {
        minimizer: [uglifyJS],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};

// * ----------------------------------------------------------------  output

module.exports = smp.wrap(webpackCfg);
