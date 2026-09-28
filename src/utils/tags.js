// The tag list and the tagging rule (README.md § Tags). A post starts with its
// shelf, adds `changelog` for milestones, then up to three topics.

// Shelves: where a post lives. `insight` takes posts outside all of them
const projects = [
  'iomando',
  'ironhack',
  'gamestry',
  'pansa',
  'sub3',
  'udacity',
  'podcasting',
];
const series = ['books', 'til', 'now'];

// Topics: what a post is substantially about
const topics = [
  'ai',
  'art',
  'attention',
  'business',
  'career',
  'coding',
  'devices',
  'economics',
  'education',
  'habits',
  'happiness',
  'health',
  'history',
  'media',
  'minimalism',
  'mobility',
  'philosophy',
  'product',
  'psychology',
  'reading',
  'society',
  'travel',
  'vr',
];

const allTags = [...projects, ...series, 'insight', 'changelog', ...topics];

// Shelves rank first, then `changelog`, then topics
const rank = (tag) => (topics.includes(tag) ? 2 : tag === 'changelog' ? 1 : 0);

// Lists how a post's tags break the rule; empty when they follow it
const tagProblems = (tags) => {
  const problems = [];
  const unknown = tags.filter((tag) => !allTags.includes(tag));
  const own = tags.filter((tag) => topics.includes(tag));

  if (unknown.length) problems.push(`unknown tags: ${unknown.join(', ')}`);
  if (new Set(tags).size !== tags.length) problems.push('a tag appears twice');
  if (!tags.length || rank(tags[0]) === 2)
    problems.push('the first tag must be a shelf or changelog');
  if (tags.some((tag, i) => i > 0 && rank(tag) < rank(tags[i - 1])))
    problems.push('shelves go first, then changelog, then topics');
  if (
    tags.includes('insight') &&
    tags.some((tag) => projects.includes(tag) || series.includes(tag))
  )
    problems.push('insight is only for posts outside every project and series');
  if (own.length > 3) problems.push('more than three topics');
  if (own.join() !== [...own].sort().join())
    problems.push('topics go in alphabetical order');

  return problems;
};

module.exports = {
  allTags,
  projects,
  series,
  tagProblems,
  topics,
};
