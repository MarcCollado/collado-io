const test = require('node:test');
const assert = require('node:assert/strict');
const cheerio = require('cheerio');

const { createFeedSanitizer } = require('../feedSanitizer');

const sanitizeFeedHtml = createFeedSanitizer(cheerio);
const siteUrl = 'https://www.collado.io';

test('removes anchor icons and inline styles', () => {
  const html = `
    <h2 id="heading">Heading<a class="anchor-link" href="#heading"><svg aria-hidden="true"></svg></a></h2>
    <p style="color: red">Styled <span style="font-weight: bold">text</span></p>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('anchor-link'));
  assert.ok(!sanitized.includes('<svg'));
  assert.ok(!sanitized.includes('style='));
  assert.match(sanitized, /<h2 id="heading">Heading<\/h2>/);
});

test('replaces iframes with hyperlinks using absolute URLs', () => {
  const html = '<p><iframe src="/embed/video/123" style="border: 0"></iframe></p>';

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('<iframe'));
  assert.match(
    sanitized,
    /<p><a href="https:\/\/www\.collado\.io\/embed\/video\/123">https:\/\/www\.collado\.io\/embed\/video\/123<\/a><\/p>/,
  );
});

test('rewrites relative media sources to absolute URLs', () => {
  const html = `
    <figure>
      <img src="../images/photo.jpg" alt="Photo" style="width: 100%" />
    </figure>
    <p><a href="/about">About page</a></p>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.match(sanitized, /src="https:\/\/www\.collado\.io\/images\/photo\.jpg"/);
  assert.match(sanitized, /href="https:\/\/www\.collado\.io\/about"/);
});
