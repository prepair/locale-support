/* global cat */
require('shelljs/global');
const oget = require('object-get');
const path = require('path');
const currencyFormat = require('../node_modules/currency-format/currency-format.json');
const config = require('./config');
const supportedLocales = config.supportedLocales;

const metaDataTarget = '../lib/metadata.js';

// cldr does not contain ALL the currency data (for exmaple ro-RO -> ro -> currencies -> RON)
// neither intl polyfill nor cldr has the name of the default currency
// fix missing currencies here, or report them to https://github.com/xsolla/currency-format/issues/new
const currencyOverlay = {
  GEL: { symbol: { grapheme: '₾' } }
};

// ----

// load cldr json from cldr-data module
function loadCldr (id) {
  let prefix = path.resolve(__dirname, '../node_modules/cldr-data/main');
  const numbers = JSON.parse(cat(`${prefix}/${id}/numbers.json`));
  const currencies = JSON.parse(cat(`${prefix}/${id}/currencies.json`));
  return { numbers, currencies };
}

// the unique list of currencies we will include in the rendered file
// for example: ['AED', 'BAM, 'CHF' ...]
function getCurrenciesToInclude () {
  let currencies = [];
  supportedLocales.forEach(item => {
    let curr = item.currency;
    if (typeof curr === 'string') {
      currencies.push(curr);
    } else {
      currencies.push(...curr);
    }
  });
  return [...new Set(currencies)].sort();
}

// http://cldr.unicode.org/translation/number-patterns
function parseCldrPattern (pattern) {
  let convert = s => s.replace(/[#,.0]/g, '0').replace(/0+/g, '%v').replace('¤', '%s');
  let patterns = pattern.split(';');
  let positive = patterns[0];
  let negative = (patterns[1] || '').replace(/^\(/, '').replace(/\)$/, '');
  if (negative && negative !== positive) {
    negative = convert(negative);
  } else {
    negative = false;
  }
  positive = convert(positive);
  return negative ? { positive, negative } : positive;
}

// supportedLocaleIds is not required anymore, if you want to enable a new
// language, you may just add it to supported-locales.js
function localeMetaDataBuilder () {
  let output = { locales: {}, currencies: {} };

  getCurrenciesToInclude().forEach(id => {
    let symbol = oget(currencyFormat, `${id}.symbol.grapheme`) || oget(currencyOverlay, `${id}.symbol.grapheme`);
    let precision = oget(currencyFormat, `${id}.fractionSize`); // this can be 0, which is totally valid
    if (!symbol) {
      symbol = id;
      console.warn(`Currency "${id}" has no grapheme symbol, using the id.`);
    }
    if (typeof precision === 'undefined') {
      throw new Error(`Incomplete currency data for '${id}'`); // ahh, sorry :(
    }
    output.currencies[id] = {
      // short symbol
      symbol,
      // fraction size, Navitaire uses 2 as a hardcoded value
      precision
    };
  });

  supportedLocales.forEach(item => {
    let dotNetLangId = item.dotNetId;
    if (!item) {
      throw new Error(`Can not map locale (${dotNetLangId}) to currency. Add new locale to the supported locales in the config please.`);
    }
    let cldr = loadCldr(item.cldr);
    // we prefer lowercase lang ids
    output.locales[dotNetLangId.toLowerCase()] = {
      // " " (thousand separator)
      thousand: cldr.numbers.main[item.cldr].numbers['symbols-numberSystem-latn'].group,
      // , (decimal separator aka. group)
      decimal: cldr.numbers.main[item.cldr].numbers['symbols-numberSystem-latn'].decimal,
      // "%s %v"
      currencyFormat: parseCldrPattern(cldr.numbers.main[item.cldr].numbers['currencyFormats-numberSystem-latn'].accounting)
    };
  });

  return `module.exports = ${JSON.stringify(output, null, '  ')};\n`;
}

function updateMetaData () {
  let code = localeMetaDataBuilder();
  code.to(path.resolve(__dirname, metaDataTarget));
}

function updateReadme () {
  let readmePath = path.resolve(__dirname, '../README.md');
  let target = cat(readmePath) + '';
  let locales = supportedLocales.map(item => item.momentId).sort();
  target = target.replace(/(supportedLocales = )\[.*?](;)/, `$1${JSON.stringify(locales)}$2`);
  target.to(readmePath);
}

// ----

updateMetaData();
updateReadme();
