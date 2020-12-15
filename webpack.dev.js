const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/pages/index/index.js',
        // one: { import: './src/pages/one/one.js', filename: '[name]/[name].[fullhash:20].js'} // folder structure
        one: { import: './src/pages/one/one.js' }
    },
    
    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        port: 8080
    },

    // https://webpack.js.org/concepts/loaders/
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                    require('precss')
                                ]
                            }
                        }
                    }
                ]
            },
            // TO IMPORT WITH JS:
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            //     options: {
            //         minimize: false,
            //     },
            // }
        ]
    },
    
    // https://webpack.js.org/concepts/plugins/
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pages/index/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/one/one.html',
            inject: true,
            chunks: ['one'],
            // filename: 'one/one.html' // folder structure
            filename: 'one.html'
        })
    ]
};