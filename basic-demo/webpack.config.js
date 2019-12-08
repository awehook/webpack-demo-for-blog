const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolveApp = p => path.resolve(__dirname, p);
module.exports = {
  mode: "production",
  entry: {
    main: resolveApp("src/index.js")
  },
  output: {
    path: resolveApp("build"),
    filename: "static/js/[name].[contenthash:8].js"
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [{ test: /\.css/, use: [ "style-loader","css-loader"] }]
  },
  devServer: {
    contentBase: resolveApp("build"),
    compress: true,
    port: 9000
  }
};
