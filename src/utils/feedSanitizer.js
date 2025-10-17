const isRelativeUrl = (value = '') => {
  if (!value) {
    return false;
  }

  if (value.startsWith('//')) {
    return false;
  }

  return (
    value.startsWith('/') || value.startsWith('./') || value.startsWith('../')
  );
};

const toAbsoluteUrl = (value, siteUrl) => {
  try {
    return new URL(value, siteUrl).toString();
  } catch (error) {
    return value;
  }
};

const createFeedSanitizer = (domUtility) => {
  if (!domUtility || typeof domUtility.load !== 'function') {
    throw new Error(
      'A DOM parser with a load function is required to sanitize feed HTML.',
    );
  }

  return (html, siteUrl) => {
    if (!html) {
      return '';
    }

    const $ = domUtility.load(html, { decodeEntities: false });

    // Remove problematic elements
    $('.anchor-link').remove();
    $('svg').remove();
    $('script').remove();
    $('style').remove();

    // Remove inline styles
    $('[style]').each((_, element) => {
      $(element).removeAttr('style');
    });

    // Remove event handlers
    $('[onclick], [onload], [onerror], [onmouseover]').each((_, element) => {
      const $element = $(element);
      $element
        .removeAttr('onclick')
        .removeAttr('onload')
        .removeAttr('onerror')
        .removeAttr('onmouseover');
    });

    // Convert iframes to links
    $('iframe').each((_, element) => {
      const $element = $(element);
      const source = $element.attr('src');

      if (!source) {
        $element.remove();
        return;
      }

      const absoluteSource = isRelativeUrl(source)
        ? toAbsoluteUrl(source, siteUrl)
        : source;
      const replacement = `<p><a href="${absoluteSource}">${absoluteSource}</a></p>`;
      $element.replaceWith(replacement);
    });

    // Fix relative URLs in href and src attributes
    ['href', 'src'].forEach((attribute) => {
      $(`[${attribute}]`).each((_, element) => {
        const $element = $(element);
        const value = $element.attr(attribute);

        if (!value) {
          return;
        }

        // Skip fragment-only links
        if (value.startsWith('#')) {
          return;
        }

        // Convert relative URLs to absolute
        if (isRelativeUrl(value)) {
          $element.attr(attribute, toAbsoluteUrl(value, siteUrl));
        }
      });
    });

    // Return only the sanitized fragment without HTML document wrappers
    return $('body')
      .contents()
      .map((_, el) => $.html(el))
      .get()
      .join('');
  };
};

module.exports = {
  createFeedSanitizer,
};
