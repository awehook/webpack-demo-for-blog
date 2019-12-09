const { runLoaders } = require("loader-runner");
const fs = require("fs");
const options =   {
  resource: require.resolve("./src/index.js"),
  loaders: [
    require.resolve('../my-loader/lib/loader-a'),
    require.resolve('../my-loader/lib/loader-b')
  ],
  readResource: fs.readFile.bind(this)
};
// console.log(options);
runLoaders(
  options,
  function(err, result) {
    if (err) {
      console.log("error:" + err);
    }
    console.log("result:\n"+ result.result);
  }
);
