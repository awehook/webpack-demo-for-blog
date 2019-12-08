const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { loaderA, loaderB, loaderPitch } = require("my-loader");
const resolveApp = p => path.resolve(__dirname, p);
const appHtml = resolveApp("public/index.html");
const appSrc = resolveApp("src");

module.exports = {
  mode: "production",
  entry: {
    main: resolveApp("src/index.js")
  },
  output: {
    path: resolveApp("build"),
    filename: "static/js/[name].[contenthash:8].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: loaderPitch
          },
          {
            loader: loaderA
          },
          {
            loader: loaderB
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // publicPath: "./public/"
          //   }
          // },
          {
            loader: "css-loader",
            options: {
              modules: true
              // localIdentName: '[name]--[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: resolveApp("build"),
    compress: true,
    port: 9000
  }
};
