const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerminologyVisualizationPlugin = require("terminology-visualization-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
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
  plugins: [new TerminologyVisualizationPlugin({port:9998}), new BundleAnalyzerPlugin()],
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   exclude: [/node_modules/],
      //   use: [
      //     {
      //       loader: loaderA
      //     }
      //   ]
      // },
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
    modules: ["node_modules", "node_modules/my-loader/lib"]
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        external: {
          test: /node_modules/,
          name: 'external',
          chunks: 'initial'
        }
      }
    }
  }
};
