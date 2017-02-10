var momentLoader = require('./moment-loader');
var metadata = require('./metadata');

module.exports = {
  getMomentLoader: momentLoader.getMomentLoader,
  writeMomentLoader: momentLoader.writeMomentLoader,
  metadata: metadata
};
