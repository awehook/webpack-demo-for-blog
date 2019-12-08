const loaderA = require.resolve('./loader-a');
const loaderB = require.resolve('./loader-b');
const loaderPitch = require.resolve('./loader-pitch');

module.exports = {
  loaderA,
  loaderB,
  loaderPitch
}