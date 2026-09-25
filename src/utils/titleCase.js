const lowerCaseWords = [
  'a',
  'an',
  'and',
  'as',
  'at',
  'but',
  'by',
  'for',
  'if',
  'in',
  'is',
  'of',
  'on',
  'or',
  'the',
  'to',
  'vs.',
  // Català
  'de',
  'des',
  'el',
  'la',
  'part',
  // Ad-hoc
  'collado.io',
  'iomando',
  'v2',
];
const upperCaseWords = ['AI', 'API', 'II', 'III', 'IV', 'V', 'WWDC'];

/**
 * Title-cases an English post title for display.
 *
 * Words that already carry capitals after their first letter (eBay,
 * JavaScript, TikTok, WWDC) are kept as written. Titles in other languages
 * are returned untouched: Catalan and Spanish use sentence case.
 * @param {string} title
 * @param {string} [language] post language; missing means English
 * @returns {string}
 */
const toTitleCase = (title, language) => {
  if (!title || (language && language !== 'en')) {
    return title;
  }

  let isFirstWord = true;
  return title.replace(/[\p{L}\p{N}_]\S*/gu, (word) => {
    // Ignore the first word
    if (isFirstWord) {
      isFirstWord = false;
      return word;
    }

    // Keep deliberate capitals
    if (/\p{Lu}/u.test(word.slice(1))) {
      return word;
    }

    // Return these words lowercase
    if (lowerCaseWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }

    // Return these words uppercase
    if (upperCaseWords.includes(word.toUpperCase())) {
      return word.toUpperCase();
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
  });
};

module.exports = {
  toTitleCase,
};
