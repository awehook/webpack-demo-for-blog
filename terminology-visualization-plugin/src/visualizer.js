const path = require("path");
const fs = require("fs");
const http = require("http");
const ws = require("ws");
const _ = require("lodash");
const express = require("express");
const ejs = require("ejs");
const opener = require('opener');
const { bold } = require("chalk");
const utils = require("./utils");

const projRoot = path.resolve(__dirname, "..");
const assetsRoot = path.join(projRoot, "public");
const title = `${process.env.npm_package_name ||
  "Webpack terminolopy Visualization"} [${utils.getCurrentTime()}]`;

async function startServer(status, opts) {
  const { port = 9999, host, openBrowser = true } = opts || {};

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
  await new Promise(resolve => {
    server.listen(port, host, () => {
      resolve();

      const url = `http://${host}:${server.address().port}`;

      console.info(
        `${bold("Webpack Terminology Visualization")} is started at ${bold(
          url
        )} \n` + `Use ${bold("Ctrl+C")} to close it`
      );
      if(openBrowser) {
        opener(url);
      }
    });
  });

  const wss = new ws.Server({server});
  wss.on('connection', ws => {
    ws.on('error', err => {
      if(err.errno) return;

      console.warn(err.message);
    })
  });
  return {
    ws: wss,
    http: server
  }
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
}
