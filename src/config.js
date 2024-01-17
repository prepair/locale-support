// WARN: this file is included in the es5 context

// if you need to add new items, check http://www.localeplanet.com/ and the cldr-data package
// currency may be an array, in that case the preferred currencyCode must be the first
module.exports = {
  supportedLocales: [
    { dotNetId: 'hu-HU', currency: 'HUF', cldr: 'hu' },
    { dotNetId: 'bg-BG', currency: 'BGN', cldr: 'bg' },
    { dotNetId: 'bs-Latn-BA', currency: 'BAM', cldr: 'bs-Latn' },
    { dotNetId: 'ca-ES', currency: 'EUR', cldr: 'ca' },
    { dotNetId: 'cs-CZ', currency: 'CZK', cldr: 'cs' },
    { dotNetId: 'de-DE', currency: 'EUR', cldr: 'de' },
    { dotNetId: 'en-GB', currency: ['GBP', 'EUR', 'HRK', 'USD', 'CHF', 'AED', 'DKK'], cldr: 'en-GB' },
    { dotNetId: 'es-ES', currency: 'EUR', cldr: 'es' },
    { dotNetId: 'fr-FR', currency: 'EUR', cldr: 'fr' },
    { dotNetId: 'he-IL', currency: 'ILS', cldr: 'he', rtl: true },
    { dotNetId: 'it-IT', currency: 'EUR', cldr: 'it' },
    { dotNetId: 'lv-LV', currency: ['EUR', 'LVL'], cldr: 'lv' },
    { dotNetId: 'mk-MK', currency: 'MKD', cldr: 'mk' },
    { dotNetId: 'lt-LT', currency: 'EUR', cldr: 'lt' },
    { dotNetId: 'nl-NL', currency: 'EUR', cldr: 'nl' },
    { dotNetId: 'nb-NO', currency: 'NOK', cldr: 'nb' },
    { dotNetId: 'pl-PL', currency: 'PLN', cldr: 'pl' },
    { dotNetId: 'pt-PT', currency: 'EUR', cldr: 'pt-PT' },
    { dotNetId: 'ro-RO', currency: ['RON', 'MDL'], cldr: 'ro' },
    { dotNetId: 'ru-RU', currency: 'RUB', cldr: 'ru' },
    { dotNetId: 'sk-SK', currency: 'EUR', cldr: 'sk' },
    { dotNetId: 'sq-AL', currency: 'ALL', cldr: 'sq' },
    { dotNetId: 'sv-SE', currency: 'SEK', cldr: 'sv' },
    { dotNetId: 'sr-Cyrl-CS', currency: 'RSD', cldr: 'sr-Cyrl' },
    { dotNetId: 'uk-UA', currency: 'UAH', cldr: 'uk' },
    { dotNetId: 'ka-GE', currency: 'GEL', cldr: 'ka' },
    { dotNetId: 'el-GR', currency: 'EUR', cldr: 'el' },
    { dotNetId: 'ar-ae', currency: 'AED', cldr: 'ar', rtl: true }
  ]
};
