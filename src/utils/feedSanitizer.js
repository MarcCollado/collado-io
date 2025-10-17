const isRelativeUrl = (value = '') => {
  if (!value) {
    return false;
  }

  if (value.startsWith('//')) {
    return false;
  }

  return value.startsWith('/') || value.startsWith('./') || value.startsWith('../');
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
    throw new Error('A DOM parser with a load function is required to sanitize feed HTML.');
  }

  return (html, siteUrl) => {
    if (!html) {
      return '';
    }

    const $ = domUtility.load(html, { decodeEntities: false });

    $('.anchor-link').remove();
    $('svg').remove();

    $('[style]').each((_, element) => {
      $(element).removeAttr('style');
    });

    $('iframe').each((_, element) => {
      const $element = $(element);
      const source = $element.attr('src');

      if (!source) {
        $element.remove();
        return;
      }

      const absoluteSource = isRelativeUrl(source) ? toAbsoluteUrl(source, siteUrl) : source;
      const replacement = `<p><a href="${absoluteSource}">${absoluteSource}</a></p>`;
      $element.replaceWith(replacement);
    });

    ['href', 'src'].forEach((attribute) => {
      $(`[${attribute}]`).each((_, element) => {
        const $element = $(element);
        const value = $element.attr(attribute);

        if (!value) {
          return;
        }

        if (value.startsWith('#')) {
          return;
        }

        if (isRelativeUrl(value)) {
          $element.attr(attribute, toAbsoluteUrl(value, siteUrl));
        }
      });
    });

    return $.root().html();
  };
};

module.exports = {
  createFeedSanitizer,
};
