import React from 'react';

// Components
import PostCard from '../components/postCard';

/**
 * Extracts page information from the corresponding markdown file
 * @param {array} edges - pageInfo from GraphQL query results
 * @returns {object} - page information
 */
export function extractPageInfo(edges) {
  if (typeof edges !== 'object' || edges.length !== 1) {
    throw new Error('Expected an array with one item.');
  }

  const pageInfo = {
    title: edges[0].node.frontmatter?.title,
    date: edges[0].node.frontmatter?.date,
    path: edges[0].node.frontmatter?.path,
    excerpt: edges[0].node.frontmatter?.excerpt,
    // seo: edges[0].node.frontmatter?.seo,
    html: edges[0].node.html,
  };

  return pageInfo;
}

/**
 * Generates and renders a list of posts
 * @generator
 * @param {array} edges - allPosts from GraphQL query results
 * @returns {array} - list of cards w/o the html
 */
export function renderPosts(edges, tag = '') {
  if (typeof edges !== 'object') {
    throw new Error('Expected an array of posts.');
  }

  return edges
    .filter((edge) =>
      tag !== '' ? edge.node.frontmatter?.tags.includes(tag) : edge
    )
    .filter((edge) => !!edge.node.frontmatter?.date)
    .map((edge) => (
      <PostCard
        key={edge.node.id}
        title={edge.node.frontmatter?.title}
        date={edge.node.frontmatter?.date}
        path={edge.node.frontmatter?.path}
        excerpt={edge.node.frontmatter?.excerpt}
      />
    ));
}
