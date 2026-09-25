const test = require('node:test');
const assert = require('node:assert/strict');

const {
  HEIGHT,
  WIDTH,
  cardTree,
  loadFonts,
  titleFontSize,
} = require('../socialCard');

test('long titles step down so they fit', () => {
  assert.equal(titleFontSize('Farewell, eBay'), 72);
  assert.equal(titleFontSize('x'.repeat(40)), 72);
  assert.equal(titleFontSize('x'.repeat(41)), 60);
  assert.equal(titleFontSize('x'.repeat(70)), 60);
  assert.equal(titleFontSize('x'.repeat(71)), 50);
});

test('the card carries the title, author and site', () => {
  const tree = cardTree({
    title: 'Farewell, eBay',
    author: 'Marc Collado',
    host: 'collado.io',
    avatar: 'data:image/png;base64,',
  });
  const texts = JSON.stringify(tree);

  assert.equal(tree.props.style.width, WIDTH);
  assert.equal(tree.props.style.height, HEIGHT);
  assert.ok(texts.includes('"Farewell, eBay"'));
  assert.ok(texts.includes('"Marc Collado"'));
  assert.ok(texts.includes('"collado.io"'));
});

test('loads Inter in every weight the card uses, in both subsets', () => {
  const fonts = loadFonts();

  assert.deepEqual([...new Set(fonts.map((f) => f.weight))], [400, 600, 700]);
  assert.ok(fonts.every((f) => f.name === 'Inter' && f.data.length > 0));
  // latin and latin-ext subsets for each weight
  assert.equal(fonts.length, 6);
});
