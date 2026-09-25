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

// Newest first, comparing raw ISO dates (posts keep theirs in frontmatter)
const byNewest = (a, b) => {
  const dateA = a.node.frontmatter?.isoDate || a.node.isoDate;
  const dateB = b.node.frontmatter?.isoDate || b.node.isoDate;
  return new Date(dateB) - new Date(dateA);
};

export function blogFeedGenerator(data) {
  const feed = [...data.posts.edges, ...data.bugadaPosts.edges];
  return feed.sort(byNewest).map((e) => {
    if (e.node.frontmatter) {
      const { displayDate, excerpt, featured, language, path, title } =
        e.node.frontmatter;
      return (
        <li key={e.node.id}>
          <div className="post-list-item">
            <header>
              <h2>
                <Link to={path}>{toTitleCase(title, language)}</Link>
              </h2>
              <small>{displayDate}</small>
            </header>
            {featured && excerpt && (
              <section>
                <small>{excerpt}</small>
              </section>
            )}
          </div>
        </li>
      );
    } else {
      const { displayDate, id, link, title } = e.node;
      return (
        <li key={id} className="post-list-item">
          <header>
            <h2 className="external-link">
              <a href={link}>{`${title} ↗`}</a>
            </h2>
            <small>{displayDate}</small>
          </header>
        </li>
      );
    }
  });
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
