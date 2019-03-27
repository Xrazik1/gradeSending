const webpack = require("webpack");
const path = require("path")

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.join(__dirname, "server/react-backend/src"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
                loader: "file-loader"
            }
        ]
    }
}