const localizations = {
  /*eslint-disable*/
  // NOTE: this is a Dirty fix to have corresponding JSON files loaded in memory, as I were unable to pass it syntactically correcly using Webpack
  // NOTE: Hu is being used for en as well.
  en: require('../content/i18n/hu.json'),
  hu: require('../content/i18n/hu.json'),
  /*eslint-enable*/
};

function translate(title, language = null) {
  const lang = (language || ENV.language || '');
  // TODO / LOWPRIOR receive localizations as argument list only for the actual lang?
  const localization = (localizations && localizations[lang]) || {};

  // use only the first line as key for searching in the localization array
  const key=(title.indexOf('\n') && title.split('\n') && title.split('\n')[0].trim()) || title;
  const retString = (
    localization && localization[key] && (
      (Array.isArray(localization[key]) && localization[key].join('\n')) || localization[key]
    )
  ) || title;

  if (Array.isArray(localization[key])) {
    // console.debug('__', key, '=>', retString);
  } else if (!localization[key]) {
    // console.warn('__ NOT FOUND', lang, '/', key);
  }

  return retString;
}

module.exports = translate;
