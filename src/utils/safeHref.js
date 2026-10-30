/**
 * Returns an external feed item's link only when it's a web address, so a
 * tampered feed can't put a javascript: or data: URL on the page. Anything
 * else returns undefined, which renders the title without a link.
 * @param {string} link
 * @returns {string|undefined}
 */
function safeHref(link) {
  try {
    const { protocol } = new URL(link);
    return protocol === 'https:' || protocol === 'http:' ? link : undefined;
  } catch {
    return undefined;
  }
}

module.exports = {
  safeHref,
};
