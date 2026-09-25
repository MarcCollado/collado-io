import React from 'react';
import { Link } from 'gatsby';

import { toTitleCase } from './titleCase';

/**
 * Extracts page information from the corresponding markdown file
 * @param {array} edges with one object inside
 * @returns {object} with the page information
 */
export function extractMarkdown(edges) {
  if (typeof edges !== 'object' || edges.length !== 1) {
    throw new Error('Expected an array with one item.');
  }
  const markdownFile = {
    excerpt: edges[0].node?.frontmatter?.excerpt,
    path: edges[0].node?.frontmatter?.path,
    title: edges[0].node?.frontmatter?.title,
    html: edges[0].node?.html,
    id: edges[0].node?.id,
  };
  return markdownFile;
}

// Raw ISO date of a post (kept in frontmatter) or of an external feed item
const isoDateOf = ({ node }) => node.frontmatter?.isoDate || node.isoDate;

// Newest first, comparing raw ISO dates
const byNewest = (a, b) => new Date(isoDateOf(b)) - new Date(isoDateOf(a));

// "September 05": the year is already in the group heading. UTC, so the
// server render and the browser agree on the day
const monthDay = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: '2-digit',
  timeZone: 'UTC',
});

/**
 * Renders a feed newest first, one section per year: the year as <h2>,
 * then each item as a list row with its title (<h3>) and month and day
 * @param {array} edges posts and/or external feed items
 * @param {function} rowTitle returns the title link for an edge
 */
function yearSections(edges, rowTitle) {
  // Sorted, so each year's items are consecutive
  const years = [];
  [...edges].sort(byNewest).forEach((e) => {
    const year = isoDateOf(e).slice(0, 4);
    if (years[years.length - 1]?.year !== year) {
      years.push({ year, edges: [] });
    }
    years[years.length - 1].edges.push(e);
  });

  return years.map(({ year, edges }) => (
    <section key={year}>
      <h2 className="post-list-year">{year}</h2>
      <ol className="post-list">
        {edges.map((e) => (
          <li key={e.node.id} className="post-list-item">
            <header>
              {rowTitle(e)}
              <small>{monthDay.format(new Date(isoDateOf(e)))}</small>
            </header>
          </li>
        ))}
      </ol>
    </section>
  ));
}

export function blogFeedGenerator(data) {
  return yearSections(
    [...data.posts.edges, ...data.bugadaPosts.edges],
    ({ node }) => {
      if (node.frontmatter) {
        const { language, path, title } = node.frontmatter;
        return (
          <h3>
            <Link to={path}>{toTitleCase(title, language)}</Link>
          </h3>
        );
      }
      return (
        <h3 className="external-link">
          <a href={node.link}>{`${node.title} ↗`}</a>
        </h3>
      );
    },
  );
}

export function podcastFeedGenerator(data) {
  return yearSections(
    [
      ...data.safareigEpisodes.edges,
      ...data.fatEpisodes.edges,
      ...data.radioLanzaEpisodes.edges,
    ],
    ({ node: { itunes, link, title } }) => (
      <h3 className="external-link">
        <a href={link}>
          {itunes.episode ? `${itunes.episode}: ${title}` : title}
        </a>
      </h3>
    ),
  );
}

export function tagListGenerator(tags) {
  return (
    <div className="tag-container">
      {tags.map((tag) => {
        const tagPath = `/tags/${tag}`;
        return (
          <small key={tag}>
            <Link to={tagPath}>{`#${tag}`}</Link>
          </small>
        );
      })}
    </div>
  );
}
