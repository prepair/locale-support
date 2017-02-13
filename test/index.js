/* global rm:false */
require('shelljs/global');
const assert = require('assert');
const moment = require('moment');
const lib = require('../lib');
const babel = require('babel-core');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

function describe (s, cb) {
  console.log(`describe ${s}`);
  cb();
  console.log();
}

function it (s, cb) {
  console.log(`* it ${s}`);
  cb();
}

describe('metadata', () => {
  it('should contain locales and currencies rendered', () => {
    assert.equal(typeof lib.metadata.locales, 'object');
    assert.equal(typeof lib.metadata.currencies, 'object');
  });

  it('should have currency and locale data in key-value format', () => {
    // schema of locales
    Object.keys(lib.metadata.locales).forEach(key => {
      let locale = lib.metadata.locales[key];
      let validity = (validator.validate(locale, {
        type: 'object',
        properties: {
          thousand: { type: 'string' },
          decimal: { type: 'string' },
          currencyFormat: { type: 'string' }
        },
        required: [ 'thousand', 'decimal', 'currencyFormat' ]
      }));
      assert.equal(validity.errors.length, 0);
    });

    // schema of currencies
    Object.keys(lib.metadata.currencies).forEach(key => {
      // currency codes are uppercased
      assert.equal(key.toUpperCase(), key);
      let currency = lib.metadata.currencies[key];
      let validity = (validator.validate(currency, {
        type: 'object',
        properties: {
          symbol: { 'type': 'string' },
          precision: { 'type': 'integer' }
        },
        required: [ 'symbol', 'precision' ]
      }));
      assert.equal(validity.errors.length, 0);
    });
  });
});

describe('moment loader', () => {
  it('should generate a valid js', () => {
    let code = lib.getMomentLoader();
    let result = babel.transform(code, { presets: ['es2015-ie'] }).code;
    result.to('tmp.js');
    let momentLoader = require('../tmp.js'); // eval and vm will not work with the require
    assert.equal(typeof momentLoader.default, 'function');

    // the last inserted locale was ka
    assert.equal(moment.locale(), 'ka');

    // now we select an added locale
    momentLoader.default('hu');
    assert.equal(moment.locale(), 'hu');
    assert.equal(moment(1486734611189).format('dddd'), 'péntek');

    // in node require moment will load all locales
    // so basically that's all we can test for now
    // momentLoader.default('ja');

    rm('tmp.js');
  });
});

describe('mod rewrite partial regexp string', () => {
  it('should return a partial rule for all the dotnet locales', () => {
    assert.equal(lib.getModRewriteRex(), 'bg-bg|bs-latn-ba|cs-cz|de-de|en-gb|es-es|fr-fr|he-il|hu-hu|it-it|ka-ge|lt-lt|lv-lv|mk-mk|nb-no|nl-nl|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|sr-cyrl-cs|sv-se|uk-ua');
  });

  it('should return a partial rule for rtl only locales', () => {
    assert.equal(lib.getModRewriteRex({ rtl: true }), 'he-il');
  });

  it('should return a partial rule for non rtl locales', () => {
    assert.equal(lib.getModRewriteRex({ rtl: false }), 'bg-bg|bs-latn-ba|cs-cz|de-de|en-gb|es-es|fr-fr|hu-hu|it-it|ka-ge|lt-lt|lv-lv|mk-mk|nb-no|nl-nl|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|sr-cyrl-cs|sv-se|uk-ua');
  });
});
