"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const path = require("path");

const fs = require("fs");

const http = require("http");

const ws = require("ws");

const _ = require("lodash");

const express = require("express");

const ejs = require("ejs");

const opener = require('opener');

const {
  bold
} = require("chalk");

const utils = require("./utils");

const projRoot = path.resolve(__dirname, "..");
const assetsRoot = path.join(projRoot, "public");
const title = `${process.env.npm_package_name || "Webpack terminolopy Visualization"} [${utils.getCurrentTime()}]`;

function startServer(_x, _x2) {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = _asyncToGenerator(function* (status, opts) {
    const {
      port = 9999,
      host,
      openBrowser = true
    } = opts || {};
    const viewerData = getViewerData(status);
    const app = express();
    app.engine("ejs", require("ejs").renderFile);
    app.set("views", `${projRoot}/views`);
    app.use(express.static(`${projRoot}/public`));
    app.use("/", (req, res) => {
      res.render("viewer", {
        mode: "server",
        title,
        enableWebSocket: true,

        get viewerData() {
          return viewerData;
        },

        escapeJson
      });
    });
    const server = http.createServer(app);
    yield new Promise(resolve => {
      server.listen(port, host, () => {
        resolve();
        const url = `http://${host}:${server.address().port}`;
        console.info(`${bold("Webpack Terminology Visualization")} is started at ${bold(url)} \n` + `Use ${bold("Ctrl+C")} to close it`);

        if (openBrowser) {
          opener(url);
        }
      });
    });
    const wss = new ws.Server({
      server
    });
    wss.on('connection', ws => {
      ws.on('error', err => {
        if (err.errno) return;
        console.warn(err.message);
      });
    });
    return {
      ws: wss,
      http: server
    };
  });
  return _startServer.apply(this, arguments);
}

function getViewerData(status) {
  return {
    modules: status.modules
  };
}
/**
 * Escapes `<` characters in JSON to safely use it in `<script>` tag.
 */


function escapeJson(json) {
  return JSON.stringify(json).replace(/</gu, "\\u003c");
}

module.exports = {
  startServer
};