module.exports = function(input) {
  return `//require('my-loader/lib/lib-a')\n${input}\nconsole.log('a');`
}