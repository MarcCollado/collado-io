import React from 'react';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';

/*
Input:
  - data: ...allBlogPosts GraphQL query results
Output: generates an array of BlogCard
Used by: BlogPage,
 */
export function renderAllBlogCards(data) {
  return data
    .filter((edge) => !!edge.node.frontmatter.date)
    .map((edge) => (
      <BlogCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
      />
    ));
}

/*
- Generates a tag-filtered array of BlogCards
@ Params:
  - data: object returned from the allMarkdownRemark GraphQL query
  - tag: string with the tag filter
@ Returns: array of tag-filtered BlogCards
 */

export function renderFilteredBlogCards(data, tag) {
  return data
    .filter((edge) => edge.node.frontmatter.tags.includes(tag))
    .map((edge) => (
      <BlogCard
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        path={edge.node.frontmatter.path}
        excerpt={edge.node.frontmatter.excerpt}
      />
    ));
}

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
      />
    ));
}
