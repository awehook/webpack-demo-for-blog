const { runLoaders } = require("loader-runner");
const fs = require("fs");
const options =   {
  resource: require.resolve("./src/style1.css"),
  loaders: [
    {
      loader: require.resolve("css-loader"),
    }
  ],
  readResource: fs.readFile.bind(this)
};
runLoaders(
  options,
  function(err, result) {
    if (err) {
      console.log("error:" + err);
    }
    console.log("result:\n"+ result.result);
  }
);
