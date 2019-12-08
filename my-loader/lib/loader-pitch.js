const loaderUtils = require('loader-utils');
module.exports = function() {};

module.exports.pitch = function loader(request) {
  console.log(request);
  const d = loaderUtils.stringifyRequest(this,`!!${request}`);
  return d;
}