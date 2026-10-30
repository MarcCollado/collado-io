const test = require('node:test');
const assert = require('node:assert/strict');

const { safeHref } = require('../safeHref');

test('keeps web links as written', () => {
  assert.equal(
    safeHref('https://rss.com/podcasts/safareig/123/'),
    'https://rss.com/podcasts/safareig/123/',
  );
  assert.equal(
    safeHref('http://example.com/episode'),
    'http://example.com/episode',
  );
});

test('drops links that would run script', () => {
  assert.equal(safeHref('javascript:alert(1)'), undefined);
  assert.equal(safeHref('JavaScript:alert(1)'), undefined);
  assert.equal(safeHref('  javascript:alert(1)'), undefined);
  assert.equal(safeHref('java\tscript:alert(1)'), undefined);
  assert.equal(safeHref('data:text/html,<script>alert(1)</script>'), undefined);
  assert.equal(safeHref('vbscript:msgbox(1)'), undefined);
});

test('drops missing and relative links', () => {
  assert.equal(safeHref(undefined), undefined);
  assert.equal(safeHref(''), undefined);
  assert.equal(safeHref('/blog/2021/learning-framework/'), undefined);
});
