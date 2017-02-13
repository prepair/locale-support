'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var config = require('../src/config');
var supportedLocales = config.supportedLocales;

function getPartialRex(options) {
  // with options.rtl return a filtered list
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    return supportedLocales.filter(function (item) {
      return options.rtl === true ? item.rtl : !item.rtl;
    }).map(function (item) {
      return item.dotNetId.toLowerCase();
    }).sort().join('|');
  }
  // otherwise return a full list
  return supportedLocales.map(function (item) {
    return item.dotNetId.toLowerCase();
  }).sort().join('|');
}

module.exports = {
  getPartialRex: getPartialRex
};