# locale-support

Locale related data in a neat bundle.

Warning: locale and currency connections are defined by @prepair specs
(meaning that even though in a country the standard currency may be XXX, we support payments in
YYY so we will use the latter in the config file).

## supported locales

```js
supportedLocales = ["ar-ae","bg-BG","bs-Latn-BA","ca-ES","cs-CZ","de-DE","el-GR","en-GB","es-ES","fr-FR","he-IL","hu-HU","it-IT","ka-GE","lt-LT","lv-LV","mk-MK","nb-NO","nl-NL","pl-PL","pt-PT","ro-RO","ru-RU","sk-SK","sq-AL","sr-Cyrl-CS","sv-SE","uk-UA"];
```

## installation

```shell
npm i -S @prepair/locale-support
```

* metadata code generator assumes a node context.
* use metadata in the browser with webpack or browserify.
* use generated code in your own repository.

## usage

### metadata

```js
import { metadata } from '@prepair/locale-support';
```

* contains locale data for [accounting](http://openexchangerates.github.io/accounting.js/)
* contains currency data (code, short symbol, precision)

### mod rewrite partial regexp

Returns a regexpish partial string for mod rewrite, created from the dotnet lang ids.

For example: `bg-bg|bs-latn-ba|cs-cz`

```js
const localeSupport = require('@prepair/locale-support');
const ruleChunk = localeSupport.getModRewriteRex();
```

* with no params it returns all the lang ids
* ids are sorted before concatenation
* `localeSupport.getModRewriteRex({rtl: true})` - rtl only ids
* `localeSupport.getModRewriteRex({rtl: false})` - non rtl only ids

## adding new locales

Add new data to _./src/config.js_

* .NET locale id (see: http://www.localeplanet.com/)
* currency preferred by @prepair
* cldr id

then run `npm run build`.

## TODO

* refactor "src - lib - lib-es5" so that instead of 2 build cycles we should use 1
* transpile config.js, before someone accidentally adds an es6 keyword there
