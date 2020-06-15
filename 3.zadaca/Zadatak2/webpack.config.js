const webpack = require('webpack');
const chokidar = require('chokidar');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => ({
    entry: [
        './src/scripts/main.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash].js'
    },
    resolve: {
        // Aliases for imports
        alias: {
            scripts: path.resolve(__dirname, 'src/scripts'),
            styles: path.resolve(__dirname, 'src/styles'),
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false,
                            attributes: false, // Disables attributes processing
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(sc|sa)ss$/,
                use: [
                    argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings or extract to separate file
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        // Minify JS & CSS
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new CleanWebpackPlugin(['dist/*.*']), // Remove all files in dist folder
    ],
    devServer: {
        open: true,
        port: 3000,
        hot: true,
        progress: false,
        contentBase: path.join(__dirname, 'dist'),
        before(app, server) {
            // Workaround for reload on html files changes
            // [If we set content base to "src" and set "watchContentBase" to true, full page refresh will be triggered each time]
            chokidar.watch([
                './src/**/*.html'
            ]).on('all', function() {
                // Force reload
                server.sockWrite(server.sockets, 'content-changed');
            })
        }
    },
});
