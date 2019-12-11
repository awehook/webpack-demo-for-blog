const pluginName = "loader-execute-internal-plugin";

class TerminologyVisualizationPlugin {
  constructor(opts = {}) {
    this.opts = {
      mode: "server",
      host: "127.0.0.1",
      ...opts,
      port: "port" in opts ? (opts.port === "auto" ? 0 : opts.port) : 9999
    };
    this.server = null;
    this.opts = opts;
    this.visualizeObj = {};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, compilation => {
      compilation.hooks.finishModules.tap(pluginName, modules => {
        console.log("compilation finishModules:", modules);
        this.visualizeObj.modules = modules;
      });
    });

    compiler.hooks.done.tapAsync(pluginName, (status, callback) => {
      callback = callback || (() => {});
      const actions = [];
      if (this.opts.mode === "server") {
        actions.push(() => this.startServer(status.toJson()));
      }

      if (actions.length) {
        setImmediate(async () => {
          try {
            await Promise.all(actions.map(action => action()));
            callback();
          } catch (e) {
            callback(e);
          }
        });
      } else {
        callback();
      }
    });
  }

  async startServer(status) {}
}

export default TerminologyVisualizationPlugin;
