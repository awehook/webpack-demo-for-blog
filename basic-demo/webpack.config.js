const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LoaderExecuteInternalPlugin = require("loader-execute-internal-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { loaderA, loaderB, loaderPitch } = require("my-loader");
const resolveApp = p => path.resolve(__dirname, p);
const appHtml = resolveApp("public/index.html");
const appSrc = resolveApp("src");

module.exports = {
  mode: "none",
  entry: {
    main: resolveApp("src/index.js")
  },
  output: {
    path: resolveApp("build"),
    filename: "static/js/bundle.js"
  },
  plugins: [
    new LoaderExecuteInternalPlugin(),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: appHtml
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: [/node_modules/,/src/],
        use: [
          {
            loader: loaderA
          },
          {
            loader: loaderPitch
          },
          {
            loader: loaderB
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: resolveApp("build"),
    compress: true,
    port: 9000
  },
  resolveLoader: {
    modules: ['node_modules','node_modules/my-loader/lib']
  }
};
