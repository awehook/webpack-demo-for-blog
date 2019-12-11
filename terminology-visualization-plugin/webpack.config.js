module.exports = opts => {
  opts = Object.assign(
    {
      env: "dev"
    },
    opts
  );

  const isDev = opts.env === "dev";

  return {
    mode: isDev ? "development" : "production",
    context: __dirname,
    entry: "./client/index.jsx",
    output: {
      path: `${__dirname}/public`,
      filename: "viewer.js",
      publicPath: "/"
    },

    resolve: {
      modules: ["node_modules"],
      extensions: [".js", ".jsx"],
      alias: {
        mobx: require.resolve("mobx/lib/mobx.es6.js")
      }
    },
    devtool: isDev ? "eval" : "source-map",
    watch: isDev,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node-modules/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  // useBuiltIns: "usage",
                  // corejs: 2,
                  // debug: true,
                  // exclude: [
                  //   // Excluding unused polyfills to completely get rid of `core.js` in the resulting bundle
                  //   "web.dom.iterable",
                  //   "es7.symbol.async-iterator"
                  // ]
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              "lodash",
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              [
                "@babel/plugin-transform-runtime",
                {
                  useESModules: true
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]__[local]",
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: "url-loader"
        }
      ]
    },
    plugins: (plugins => {
      return plugins;
    })([])
  };
};
