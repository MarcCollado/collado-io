const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { allTags, tagProblems } = require('../tags');

const postsDir = path.join(__dirname, '../../media/posts');

// Posts keep their tags on one frontmatter line: tags: ['iomando', 'changelog']
const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const text = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const line = frontmatter.match(/^tags: \[(.*)\]$/m)?.[1] ?? '';
    const tags = line
      .split(',')
      .map((tag) => tag.trim().replace(/^'|'$/g, ''))
      .filter(Boolean);
    return { file, tags };
  });

test('every post follows the tagging rule', () => {
  const broken = posts
    .map(({ file, tags }) => ({ file, problems: tagProblems(tags) }))
    .filter(({ problems }) => problems.length);
  assert.deepEqual(broken, []);
});

test('every tag in the list is on at least two posts', () => {
  const lonely = allTags.filter(
    (tag) => posts.filter(({ tags }) => tags.includes(tag)).length < 2,
  );
  assert.deepEqual(lonely, []);
});

test('accepts a shelf, changelog and sorted topics', () => {
  assert.deepEqual(
    tagProblems(['iomando', 'changelog', 'business', 'product']),
    [],
  );
  assert.deepEqual(tagProblems(['udacity', 'sub3', 'changelog']), []);
  assert.deepEqual(tagProblems(['changelog', 'coding']), []);
  assert.deepEqual(tagProblems(['insight']), []);
});

test('explains how tags break the rule', () => {
  assert.deepEqual(tagProblems(['editorial', 'product']), [
    'unknown tags: editorial',
  ]);
  assert.deepEqual(tagProblems(['product', 'insight']), [
    'the first tag must be a shelf or changelog',
    'shelves go first, then changelog, then topics',
  ]);
  assert.deepEqual(tagProblems(['insight', 'podcasting', 'devices']), [
    'insight is only for posts outside every project and series',
  ]);
  assert.deepEqual(tagProblems(['books', 'psychology', 'habits']), [
    'topics go in alphabetical order',
  ]);
  assert.deepEqual(
    tagProblems(['books', 'art', 'habits', 'health', 'history']),
    ['more than three topics'],
  );
});
