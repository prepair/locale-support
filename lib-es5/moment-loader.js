'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    // !!! THIS IS A GENERATED FILE, DO NOT EDIT !!!\n    // generated by @prepair/locale-support (probably in your gulpfile.js)\n    // -------------------------------------------------------------------\n    import moment from \'moment\';\n    ', '\n    const dotNetLocales = ', ';\n    export default function setLocale(localeId) {\n      moment.locale(dotNetLocales[localeId] || localeId);\n    }\n\n  '], ['\n    // !!! THIS IS A GENERATED FILE, DO NOT EDIT !!!\n    // generated by @prepair/locale-support (probably in your gulpfile.js)\n    // -------------------------------------------------------------------\n    import moment from \'moment\';\n    ', '\n    const dotNetLocales = ', ';\n    export default function setLocale(localeId) {\n      moment.locale(dotNetLocales[localeId] || localeId);\n    }\\n\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// this utility method must be called within the node context!
// -----------------------------------------------------------

var dedent = require('dedent');
var config = require('../src/config');
var supportedLocales = config.supportedLocales;

// creates an importable javascript code that contains all the
// needed moment locales, so webpack can create one relevant chunk
// other possible solutions: https://github.com/moment/moment/issues/1435
function getMomentLoader() {
  var importTags = supportedLocales.map(function (item) {
    return 'import \'moment/locale/' + item.momentId + '\';';
  }).join('\n');
  var dotNetLocales = {};
  supportedLocales.forEach(function (item) {
    dotNetLocales[item.dotNetId.toLowerCase()] = item.momentId;
  });
  var dotNetLocalesStr = JSON.stringify(dotNetLocales).replace(/"/g, '\'');
  return dedent(_templateObject, importTags, dotNetLocalesStr);
}

module.exports = {
  getMomentLoader: getMomentLoader
};