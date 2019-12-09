const loaderUtils = require('loader-utils');
module.exports = function() {};

module.exports.pitch = function loader(request) {
  console.log(request);
  const processedRequest = loaderUtils.stringifyRequest(this,`!!${request}`);
  return `var content = require(${processedRequest})`;
}