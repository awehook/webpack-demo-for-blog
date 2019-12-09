const { runLoaders } = require("loader-runner");
const fs = require("fs");
const options =   {
  resource: require.resolve("./src/index.js"),
  loaders: [
    // {
    //   loader: require.resolve('../my-loader/lib/loader-a.js')
    // },
    {
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          [
            "@babel/preset-env",
            {
              modules: "commonjs"
            }
          ]
        ]
      }
    }
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
