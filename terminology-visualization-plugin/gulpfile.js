const gulp = require('gulp');

const PLUGIN_SRC = './src/**/*.js';
const PLUGIN_DEST = './lib';

const cli = require('commander')
  .usage('<task> [options]')
  .option('-e, --env <environment>','Can be `prod` or `dev`. Default is `dev`', /^(dev|prod)$/u, 'dev')
  .parse(process.argv);

const task = cli.args[0] || 'watch';

gulp.task('clean',gulp.parallel(cleanPluginScripts,cleanClientScripts));
gulp.task('build',gulp.series('clean',compilePluginScripts,complileClientScripts))

class TaskError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskError';
    // Internal Gulp flag that says "don't display error stack trace"
    this.showStack = false;
  }
}

function cleanClientScripts() {
  const del = require('del');
  return del('public');
}

function cleanPluginScripts() {
  const del = require('del');
  return del(PLUGIN_DEST);
}

function compilePluginScripts() {
  const babel = require('gulp-babel');
  return gulp.src(PLUGIN_SRC).pipe(babel()).pipe(gulp.dest(PLUGIN_DEST));
}

function complileClientScripts() {
  const webpack = require('webpack');
  const config = require("./webpack.config")(
    {
      env: cli.env,
    }
  );

  return new Promise((resolve,reject) => {
    webpack(config,(err,stats)=> {
      if(cli.env === 'dev') {
        if (err) {
          console.error(err);
        } else {
          console.log(stats.toString({colors: true}));
        }
        resolve();
      } else {
        if (err) return reject(err);

        if (stats.hasErrors()) {
          reject(
            new TaskError('Webpack compilation error')
          );
        }
        console.log(stats.toString({colors: true}));
        resolve();
      }
    });
  });
}

function watch() {
  gulp.watch(PLUGIN_SRC,gulp.series(cleanPluginScripts,compilePluginScripts))
  .on('error', () => {});
}