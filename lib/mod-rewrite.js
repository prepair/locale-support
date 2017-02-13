const config = require('../src/config');
const supportedLocales = config.supportedLocales;

function getPartialRex (options) {
  // with options.rtl return a filtered list
  if (typeof options === 'object') {
    return supportedLocales.filter(item => options.rtl === true ? item.rtl : !item.rtl).map(item => item.dotNetId.toLowerCase()).sort().join('|');
  }
  // otherwise return a full list
  return supportedLocales.map(item => item.dotNetId.toLowerCase()).sort().join('|');
}

module.exports = {
  getPartialRex: getPartialRex
};
