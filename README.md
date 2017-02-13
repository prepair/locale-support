# locale-support

Locale related data in a neat bundle.

## supported locales

```js
supportedLocales = ["bg","bs","cs","de","en-gb","es","fr","he","hu","it","ka","lt","lv","mk","nb","nl","pl","pt","ro","ru","sk","sr-cyrl","sv","uk"];
```

## installation

```shell
npm i -S @prepair/locale-support
```

* metadata and moment code generator assumes a node context.
* use metadata in the browser with webpack or browserify.
* use generated code in your own repository.

## usage

### metadata

```js
import { metadata } from '@prepair/locale-support';
```

* contains locale data for [accounting](http://openexchangerates.github.io/accounting.js/)
* contains currency data (code, short symbol, precision)

### moment proxy code

```js
require('shelljs/global');
const localeSupport = require('@prepair/locale-support');
const getMomentLoader = localeSupport.getMomentLoader;

getMomentLoader().to('./moment.js');
```

* use this inside the 'localization' gulp task
* generates js code with moment locales as dependency
* output requires babel transpilation
* include the generated file in your vendor pack

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
* preferred currency
* cldr id
* moment id

then run `npm run build`.

## TODO

* refactor "src - lib - lib-es5" so that instead of 2 build cycles we should use 1
* transpile config.js, before someone accidentally adds an es6 keyword there
