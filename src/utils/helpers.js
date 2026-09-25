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

export function blogFeedGenerator(data) {
  const feed = [...data.posts.edges, ...data.bugadaPosts.edges].sort(byNewest);

  // The feed is sorted, so each year's items are consecutive
  const years = [];
  feed.forEach((e) => {
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
        {edges.map((e) => {
          const date = monthDay.format(new Date(isoDateOf(e)));
          if (e.node.frontmatter) {
            const { excerpt, featured, language, path, title } =
              e.node.frontmatter;
            return (
              <li key={e.node.id}>
                <div className="post-list-item">
                  <header>
                    <h3>
                      <Link to={path}>{toTitleCase(title, language)}</Link>
                    </h3>
                    <small>{date}</small>
                  </header>
                  {featured && excerpt && (
                    <section>
                      <small>{excerpt}</small>
                    </section>
                  )}
                </div>
              </li>
            );
          }
          const { id, link, title } = e.node;
          return (
            <li key={id} className="post-list-item">
              <header>
                <h3 className="external-link">
                  <a href={link}>{`${title} ↗`}</a>
                </h3>
                <small>{date}</small>
              </header>
            </li>
          );
        })}
      </ol>
    </section>
  ));
}

export function podcastFeedGenerator(data) {
  const feed = [
    ...data.safareigEpisodes.edges,
    ...data.fatEpisodes.edges,
    ...data.radioLanzaEpisodes.edges,
  ];

  return feed.sort(byNewest).map((e) => {
    const { displayDate, id, itunes, link, title } = e.node;
    return (
      <li key={id} className="post-list-item">
        <header>
          <h2 className="external-link">
            <a href={link}>
              {itunes.episode ? `${itunes.episode}: ${title}` : title}
            </a>
          </h2>
          <small>{displayDate}</small>
        </header>
      </li>
    );
  });
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
