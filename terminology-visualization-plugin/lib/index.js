"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const visualizer = require('./visualizer');

const pluginName = "loader-execute-internal-plugin";

class TerminologyVisualizationPlugin {
  constructor(opts = {}) {
    this.opts = _objectSpread({
      mode: "server",
      host: "127.0.0.1"
    }, opts, {
      port: "port" in opts ? opts.port === "auto" ? 0 : opts.port : 9999
    });
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
        setImmediate(
        /*#__PURE__*/
        _asyncToGenerator(function* () {
          try {
            yield Promise.all(actions.map(action => action()));
            callback();
          } catch (e) {
            callback(e);
          }
        }));
      } else {
        callback();
      }
    });
  }

  startServer(stats) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.server) {} else {
        _this.server = visualizer.startServer(stats, _objectSpread({}, _this.opts));
      }
    })();
  }

}

var _default = TerminologyVisualizationPlugin;
exports.default = _default;