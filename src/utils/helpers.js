import React from 'react';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';

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
      <BlogCard
        key={edge.node.id}
        title={edge.node.frontmatter?.title}
        date={edge.node.frontmatter?.date}
        path={edge.node.frontmatter?.path}
        excerpt={edge.node.frontmatter?.excerpt}
      />
    ));
}

// /**
//  * Generates and renders a tag-filtered array of posts
//  * @generator
//  * @param {array} edges - allPosts from GraphQL query results
//  * @param {string} tag — tag to filter posts
//  * @returns {array} - list of cards w/o the html
//  */
// export function renderFilteredPosts(data, tag) {
//   return data
//     .filter((edge) => )
//     .map((edge) => (
//       <BlogCard
//         key={edge.node.id}
//         title={edge.node.frontmatter.title}
//         date={edge.node.frontmatter.date}
//         path={edge.node.frontmatter.path}
//         excerpt={edge.node.frontmatter.excerpt}
//       />
//     ));
// }

/*
Input:
  - data: ...allRadioLanzaEpisodes GraphQL query results
Output: generates an array of EpisodeCard
 */

export function renderAllEpisodeCards(data) {
  return data
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <EpisodeCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
        episode={edge.node.frontmatter.episode}
      />
    ));
}
