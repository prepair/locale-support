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

## adding new locales

Add new data to _./src/config.js_

* .NET locale id (see: http://www.localeplanet.com/)
* preferred currency
* cldr id
* moment id

then run `npm run build`.
