/* global rm:false */
require('shelljs/global');
const assert = require('assert');
const lib = require('../lib');
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
      let validity = validator.validate(locale, {
        type: 'object',
        properties: {
          thousand: { type: 'string' },
          decimal: { type: 'string' },
          currencyFormat: { type: 'string' }
        },
        required: ['thousand', 'decimal', 'currencyFormat']
      });
      assert.equal(validity.errors.length, 0);
    });

    // schema of currencies
    Object.keys(lib.metadata.currencies).forEach(key => {
      // currency codes are uppercased
      assert.equal(key.toUpperCase(), key);
      let currency = lib.metadata.currencies[key];
      let validity = validator.validate(currency, {
        type: 'object',
        properties: {
          symbol: { type: 'string' },
          precision: { type: 'integer' }
        },
        required: ['symbol', 'precision']
      });
      assert.equal(validity.errors.length, 0);
    });
  });
});

describe('mod rewrite partial regexp string', () => {
  it('should return a partial rule for all the dotnet locales', () => {
    assert.equal(
      lib.getModRewriteRex(),
      'ar-ae|bg-bg|bs-latn-ba|ca-es|cs-cz|de-de|el-gr|en-gb|es-es|fr-fr|he-il|hu-hu|it-it|ka-ge|lt-lt|lv-lv|mk-mk|nb-no|nl-nl|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|sq-al|sr-cyrl-cs|sv-se|uk-ua'
    );
  });

  it('should return a partial rule for rtl only locales', () => {
    assert.equal(lib.getModRewriteRex({ rtl: true }), 'ar-ae|he-il');
  });

  it('should return a partial rule for non rtl locales', () => {
    assert.equal(
      lib.getModRewriteRex({ rtl: false }),
      'bg-bg|bs-latn-ba|ca-es|cs-cz|de-de|el-gr|en-gb|es-es|fr-fr|hu-hu|it-it|ka-ge|lt-lt|lv-lv|mk-mk|nb-no|nl-nl|pl-pl|pt-pt|ro-ro|ru-ru|sk-sk|sq-al|sr-cyrl-cs|sv-se|uk-ua'
    );
  });
});
