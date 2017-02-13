'use strict';

var momentLoader = require('./moment-loader');
var metadata = require('./metadata');
var modRewrite = require('./mod-rewrite');

module.exports = {
  getMomentLoader: momentLoader.getMomentLoader,
  getModRewriteRex: modRewrite.getPartialRex,
  metadata: metadata
};