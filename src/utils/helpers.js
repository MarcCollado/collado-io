import React from 'react';
import { BlogCard } from '../components/BlogCard';
import { EpisodeCard } from '../components/EpisodeCard';

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
- Generates an array of BlogCards
@ Params:
  - data: object returned from the allMarkdownRemark GraphQL query
@ Returns: array of BlogCards
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
- Generates an array of EpisodeCards
@ Params:
  - data: object returned from the allMarkdownRemark GraphQL query
@ Returns: array of EpisodeCards
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
