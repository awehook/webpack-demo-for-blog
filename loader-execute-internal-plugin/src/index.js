const pluginName = "loader-execute-internal-plugin";

class LoaderExecuteInternalPlugin {
  constructor(options = {}) {}

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(pluginName, function(factory) {
      factory.hooks.parser.tap("javascript/auto", pluginName, function(
        parser,
        parserOptions
      ) {
        // console.log("parser", parser, parserOptions);
        parser.hooks.program.tap(pluginName, function(ast, comments) {
          console.log("parser program hook");
        });
      });
    });

    compiler.hooks.compile.tap(pluginName, function(compilationParams) {
      // console.log(compiler);
    });

    compiler.hooks.compilation.tap(pluginName, function(compilation) {
      console.log("compilation hook:");
      compilation.hooks.succeedModule.tap(pluginName, function(module) {
        console.log("compilation succeedModule:", module);
        console.log('name:',module._source._name);
        console.log('source:',module._source._value);
      });

      compilation.hooks.addEntry.tap(pluginName, function(entry, name) {
        console.log("compilation addEntry:", entry, name);
      });

      compilation.hooks.succeedEntry.tap(pluginName, function(
        entry,
        name,
        module
      ) {
        console.log("compilation succeedEntry:", entry, name, module);
      });

      compilation.hooks.dependencyReference.tap(pluginName, function(
        dependencyReference,
        dependency,
        module
      ) {
        console.log("compilation dependencyReference:", module);
      });
      compilation.hooks.finishModules.tap(pluginName, function(
        modules
      ) {
        console.log("compilation finishModules:", modules);
      });
    });
  }
}

export default LoaderExecuteInternalPlugin;
