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

test('removes script and style tags', () => {
  const html = `
    <p>Content</p>
    <script>alert('xss')</script>
    <style>body { color: red; }</style>
    <p>More content</p>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('<script'));
  assert.ok(!sanitized.includes('<style'));
  assert.ok(!sanitized.includes('alert'));
  assert.match(sanitized, /<p>Content<\/p>/);
});

test('removes event handlers', () => {
  const html = `
    <img src="image.jpg" onclick="malicious()" onerror="alert('xss')" />
    <div onload="bad()" onmouseover="worse()">Content</div>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('onclick'));
  assert.ok(!sanitized.includes('onerror'));
  assert.ok(!sanitized.includes('onload'));
  assert.ok(!sanitized.includes('onmouseover'));
  assert.ok(!sanitized.includes('malicious'));
});

test('replaces iframes with hyperlinks using absolute URLs', () => {
  const html =
    '<p><iframe src="/embed/video/123" style="border: 0"></iframe></p>';

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('<iframe'));
  assert.match(
    sanitized,
    /<p><a href="https:\/\/www\.collado\.io\/embed\/video\/123">https:\/\/www\.collado\.io\/embed\/video\/123<\/a><\/p>/,
  );
});

test('removes iframes without src attribute', () => {
  const html = '<p><iframe></iframe></p>';

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.ok(!sanitized.includes('<iframe'));
});

test('rewrites relative media sources to absolute URLs', () => {
  const html = `
    <figure>
      <img src="../images/photo.jpg" alt="Photo" style="width: 100%" />
    </figure>
    <p><a href="/about">About page</a></p>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.match(
    sanitized,
    /src="https:\/\/www\.collado\.io\/images\/photo\.jpg"/,
  );
  assert.match(sanitized, /href="https:\/\/www\.collado\.io\/about"/);
});

test('preserves absolute URLs unchanged', () => {
  const html = `
    <img src="https://example.com/image.jpg" />
    <a href="https://example.com/page">Link</a>
  `;

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.match(sanitized, /src="https:\/\/example\.com\/image\.jpg"/);
  assert.match(sanitized, /href="https:\/\/example\.com\/page"/);
});

test('preserves fragment-only anchors', () => {
  const html = '<a href="#section">Jump to section</a>';

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.match(sanitized, /href="#section"/);
});

test('skips protocol-relative URLs', () => {
  const html = '<img src="//cdn.example.com/image.jpg" />';

  const sanitized = sanitizeFeedHtml(html, siteUrl);

  assert.match(sanitized, /src="\/\/cdn\.example\.com\/image\.jpg"/);
});

test('handles empty or missing input gracefully', () => {
  assert.equal(sanitizeFeedHtml('', siteUrl), '');
  assert.equal(sanitizeFeedHtml(null, siteUrl), '');
  assert.equal(sanitizeFeedHtml(undefined, siteUrl), '');
});

test('throws error when DOM utility is missing', () => {
  assert.throws(
    () => createFeedSanitizer(null),
    /A DOM parser with a load function is required/,
  );

  assert.throws(
    () => createFeedSanitizer({ load: 'not a function' }),
    /A DOM parser with a load function is required/,
  );
});
