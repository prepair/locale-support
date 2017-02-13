// if you need to add new items, check http://www.localeplanet.com/ and the cldr-data package
// currency may be an array, in that case the preferred currencyCode must be the first
const supportedLocales = [
  { dotNetId: 'hu-HU', currency: 'HUF', cldr: 'hu', momentId: 'hu' },
  { dotNetId: 'bg-BG', currency: 'BGN', cldr: 'bg', momentId: 'bg' },
  { dotNetId: 'cs-CZ', currency: 'CZK', cldr: 'cs', momentId: 'cs' },
  { dotNetId: 'bs-Latn-BA', currency: 'BAM', cldr: 'bs-Latn', momentId: 'bs' },
  { dotNetId: 'de-DE', currency: 'EUR', cldr: 'de', momentId: 'de' },
  { dotNetId: 'en-GB', currency: ['GBP', 'EUR', 'HRK', 'USD', 'CHF', 'AED'], cldr: 'en-GB', momentId: 'en-gb' },
  { dotNetId: 'es-ES', currency: 'EUR', cldr: 'es', momentId: 'es' },
  { dotNetId: 'fr-FR', currency: 'EUR', cldr: 'fr', momentId: 'fr' },
  { dotNetId: 'he-IL', currency: 'ILS', cldr: 'he', momentId: 'he', rtl: true },
  { dotNetId: 'it-IT', currency: 'EUR', cldr: 'it', momentId: 'it' },
  { dotNetId: 'lv-LV', currency: ['EUR', 'LVL'], cldr: 'lv', momentId: 'lv' },
  { dotNetId: 'mk-MK', currency: 'MKD', cldr: 'mk', momentId: 'mk' },
  { dotNetId: 'lt-LT', currency: 'EUR', cldr: 'lt', momentId: 'lt' },
  { dotNetId: 'nl-NL', currency: 'EUR', cldr: 'nl', momentId: 'nl' },
  { dotNetId: 'nb-NO', currency: 'NOK', cldr: 'nb', momentId: 'nb' },
  { dotNetId: 'pl-PL', currency: 'PLN', cldr: 'pl', momentId: 'pl' },
  { dotNetId: 'pt-PT', currency: 'EUR', cldr: 'pt-PT', momentId: 'pt' },
  { dotNetId: 'ro-RO', currency: 'RON', cldr: 'ro', momentId: 'ro' },
  { dotNetId: 'ru-RU', currency: 'RUB', cldr: 'ru', momentId: 'ru' },
  { dotNetId: 'sk-SK', currency: 'EUR', cldr: 'sk', momentId: 'sk' },
  { dotNetId: 'sv-SE', currency: 'SEK', cldr: 'sv', momentId: 'sv' },
  { dotNetId: 'sr-Cyrl-CS', currency: 'RSD', cldr: 'sr-Cyrl', momentId: 'sr-cyrl' },
  { dotNetId: 'uk-UA', currency: 'UAH', cldr: 'uk', momentId: 'uk' },
  { dotNetId: 'ka-GE', currency: 'GEL', cldr: 'ka', momentId: 'ka' }
];

module.exports = {
  supportedLocales
};
