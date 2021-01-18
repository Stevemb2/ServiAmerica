const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./client/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\/.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|pdf|csv)$/i,
                type: "asset/resource"    
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./client/index.html"
        })
    ]
}