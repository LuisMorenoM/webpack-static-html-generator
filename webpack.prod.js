const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

let minifyHtmlOptions = {
    collapseWhitespace: true, // to collapse set to true.
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
}

module.exports = {
    
    // This option controls if and how source maps are generated.
    // https://webpack.js.org/configuration/devtool/
    // devtool: 'source-map',
    
    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: { import: ['./src/pages/index/index.js', './src/pages/index/index.scss'] },
        // one: { import: './src/pages/one/one.js', filename: '[name]/[name].[fullhash:20].js'} // folder structure
        one: { import: ['./src/pages/one/one.js', './src/pages/one/one.scss'] }
    },
    
    // how to write the compiled files to disk
    // https://webpack.js.org/concepts/output/
    output: {
        filename: '[name].[fullhash:20].js',
        path: buildPath
    },
    
    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            // TO IMPORT WITH JS:
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            //     options: {
            //         minimize: false,
            //     },
            // },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/[name].[hash].[ext]',
                            esModule: false,
                            limit: 8192,
                            publicPath: '/',
                        }
                    }
                ]
            }
        ]
    },
    
    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new CleanWebpackPlugin(), // cleans output.path by default
        new HtmlWebpackPlugin({
            template: './src/pages/index/index.html',
            inject: 'body',
            chunks: ['index'],
            filename: 'index.html',
            minify: minifyHtmlOptions
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/one/one.html',
            inject: 'body',
            chunks: ['one'],
            filename: 'one.html',
            minify: minifyHtmlOptions
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        })
    ],
    
    // https://webpack.js.org/configuration/optimization/
    // if you want all minified, uncomment this:
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin()
      ]
    }
    // optimization: {
    //     minimize: false
    // }
}
