const test = require('node:test');
const assert = require('node:assert/strict');

const { toTitleCase } = require('../titleCase');

test('capitalizes words and lowercases minor words after the first', () => {
  assert.equal(
    toTitleCase('A guide to the good life'),
    'A Guide to the Good Life',
  );
  assert.equal(
    toTitleCase('Services And Subscriptions'),
    'Services and Subscriptions',
  );
});

test('keeps the first word as written', () => {
  assert.equal(
    toTitleCase('iomando 2.0 — behind the scenes'),
    'iomando 2.0 — Behind the Scenes',
  );
  assert.equal(toTitleCase('#TIL side effects'), '#TIL Side Effects');
});

test('keeps words that already carry inner capitals', () => {
  assert.equal(toTitleCase('Farewell, eBay'), 'Farewell, eBay');
  assert.equal(toTitleCase('Just JavaScript'), 'Just JavaScript');
  assert.equal(toTitleCase('20.43: notes on TikTok'), '20.43: Notes on TikTok');
  assert.equal(toTitleCase('Notes on WWDC'), 'Notes on WWDC');
});

test('uppercases known acronyms and numerals', () => {
  assert.equal(toTitleCase('Notes on ai'), 'Notes on AI');
  assert.equal(toTitleCase('Rocky ii'), 'Rocky II');
});

test('handles words that start with an accented letter', () => {
  assert.equal(toTitleCase('Notes on émile zola'), 'Notes on Émile Zola');
});

test('treats a missing language as English', () => {
  assert.equal(toTitleCase('Love what you do', null), 'Love What You Do');
  assert.equal(toTitleCase('Love what you do', 'en'), 'Love What You Do');
});

test('leaves non-English titles untouched', () => {
  const title = "La mètrica de l'originalitat — part I";
  assert.equal(toTitleCase(title, 'ca'), title);
  assert.equal(
    toTitleCase('En resum, Silicon Valley Bank', 'ca'),
    'En resum, Silicon Valley Bank',
  );
});

test('returns empty values as they are', () => {
  assert.equal(toTitleCase(''), '');
  assert.equal(toTitleCase(undefined), undefined);
});
