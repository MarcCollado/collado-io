import React from 'react';

import PostCard from '../components/postCard';

// Dictionary used by work.js to translate k/v pairs
export const workmaps = {
  iomando: 'iomando',
  Ironhack: 'ironhack',
  'Radio Lanza': 'radioLanza',
  Gamestry: 'gamestry',
  Safareig: 'safareig',
  Pansa: 'pansa',
  Sub3: 'sub3',
  '#TIL': 'til',
  Udacity: 'udacity',
};

/**
 * Extracts page information from the corresponding markdown file
 * @param {array} edges - pageMarkdown from GraphQL query results
 * @returns {object} - page information
 */
export function extractMarkdown(edges) {
  if (typeof edges !== 'object' || edges.length !== 1) {
    throw new Error('Expected an array with one item.');
  }

  const md = {
    date: edges[0].node.frontmatter?.date,
    excerpt: edges[0].node.frontmatter?.excerpt,
    path: edges[0].node.frontmatter?.path,
    // seo: edges[0].node.frontmatter?.seo,
    title: edges[0].node.frontmatter?.title,
    html: edges[0].node.html,
    id: edges[0].node.id,
  };

  return md;
}

/**
 * Generates and renders a list of posts
 * @generator
 * @param {array} edges - allPosts from GraphQL query results
 * @param {string} filterTag — render exclusively posts with that tag
 * @returns {array} - list of cards w/o the html
 */
export function renderPosts(edges, filterTag = '') {
  if (typeof edges !== 'object') {
    throw new Error('Expected an array of posts.');
  }

  return edges
    .filter((edge) =>
      filterTag !== '' ? edge.node.frontmatter?.tags.includes(filterTag) : edge
    )
    .filter((edge) => !!edge.node.frontmatter?.date)
    .map((edge) => (
      <PostCard
        key={edge.node.id}
        date={edge.node.frontmatter?.date}
        excerpt={edge.node.frontmatter?.excerpt}
        image={false}
        path={edge.node.frontmatter?.path}
        title={edge.node.frontmatter?.title}
      />
    ));
}

/**
 * Currently deprecated
 * @generator
 * @param {array} tagsIn - tags to be included
 * @param {array} tagsIni — tags to be excluded
 * @returns {string} - GraphQL query
 */
export const filterPosts = (tagsIn = [], tagsIni = []) => {
  const include = tagsIn.length > 0;
  const notInclude = tagsIni.length > 0;

  return !include && !notInclude
    ? `{ fileAbsolutePath: { regex: "/src/content/md/posts/" } }`
    : `{
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        ${include ? `frontmatter: { tags: { in: ${tagsIn} } }` : ''}
        ${notInclude ? `frontmatter: { tags: { ini: ${tagsIni} } }` : ''}
      }`;
};
