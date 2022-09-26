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
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
