/**
 * Extracts page information from the corresponding markdown file
 * @param {array} edges with one object inside
 * @returns {object} with the page information
 */
export function extractMarkdown(edges) {
  if (typeof edges !== 'object' || edges.length !== 1) {
    throw new Error('Expected an array with one item.');
  }
  const markdownFile = {
    excerpt: edges[0].node?.frontmatter?.excerpt,
    path: edges[0].node?.frontmatter?.path,
    title: edges[0].node?.frontmatter?.title,
    html: edges[0].node?.html,
    id: edges[0].node?.id,
  };
  return markdownFile;
}

export function toTitleCase(str) {
  const lowerCaseFilter = [
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
    'of',
    'on',
    'or',
    'the',
    'to',
    'vs.',
    // Català
    'de',
    'des',
    // Ad-hoc
    'collado.io',
    'ebay',
    'iomando',
    'v2',
  ];
  const upperCaseFilter = ['AI', 'API', 'II', 'III', 'IV', 'V'];
  let isFirstWord = true;
  return str.replace(/\w\S*/g, function (txt) {
    // Ignore the first word
    if (isFirstWord) {
      isFirstWord = false;
      return txt;
    }

    // Return these words lowercase
    if (lowerCaseFilter.includes(txt.toLowerCase())) {
      return txt.toLowerCase();
    }

    // Return these words upperCase
    if (upperCaseFilter.includes(txt.toUpperCase())) {
      return txt.toUpperCase();
    }

    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
