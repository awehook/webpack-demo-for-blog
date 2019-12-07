const path = require("path");

const resolveApp = p => path.resolve(__dirname, p);
module.exports = {
  mode: "production",
  entry: {
    main: resolveApp("src/index.js")
  },
  output: {
    path: resolveApp("build"),
    filename: "static/js/[name].[contenthash:8].js"
  }
};
