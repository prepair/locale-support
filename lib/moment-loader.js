// this utility method must be called within the node context!
// -----------------------------------------------------------

const dedent = require('dedent');
const config = require('../src/config');
const supportedLocales = config.supportedLocales;

// creates an importable javascript code that contains all the
// needed moment locales, so webpack can create one relevant chunk
// other possible solutions: https://github.com/moment/moment/issues/1435
function getMomentLoader () {
  const importTags = supportedLocales.map(item => `import 'moment/locale/${item.momentId}';`).join('\n');
  const dotNetLocales = {};
  supportedLocales.forEach(item => { dotNetLocales[item.dotNetId.toLowerCase()] = item.momentId; });
  const dotNetLocalesStr = JSON.stringify(dotNetLocales).replace(/"/g, '\'');
  return dedent`
    // !!! THIS IS A GENERATED FILE, DO NOT EDIT !!!
    // generated by @prepair/locale-support (probably in your gulpfile.js)
    // -------------------------------------------------------------------
    import moment from 'moment';
    ${importTags}
    const dotNetLocales = ${dotNetLocalesStr};
    export default function setLocale(localeId) {
      moment.locale(dotNetLocales[localeId] || localeId);
    }\n
  `;
}

module.exports = {
  getMomentLoader
};