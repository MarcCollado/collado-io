import React from 'react';
import { Link } from 'gatsby';

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

export function toTitleCase(str) {
  const lowerCaseFilter = [
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'if',
    'in',
    'is',
    'of',
    'on',
    'or',
    'the',
    'to',
    'vs.',
    // Català
    'de',
    'des',
    'el',
    'la',
    'part',
    // Ad-hoc
    'collado.io',
    'ebay',
    'iomando',
    'v2',
  ];
  const upperCaseFilter = ['AI', 'API', 'II', 'III', 'IV', 'V', 'WWDC'];
  let isFirstWord = true;
  return str.replace(/\w\S*/g, function (txt) {
    // Ignore the first word
    if (isFirstWord) {
      isFirstWord = false;
      return txt;
    }

    // Return these words lowercase
    if (lowerCaseFilter.includes(txt.toLowerCase())) {
      return txt.toLowerCase();
    }

    // Return these words upperCase
    if (upperCaseFilter.includes(txt.toUpperCase())) {
      return txt.toUpperCase();
    }

    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function blogFeedGenerator(data) {
  const feed = [...data.posts.edges, ...data.bugadaPosts.edges];
  return feed
    .sort((a, b) => {
      const dateA = new Date(a.node.frontmatter?.date || a.node.isoDate);
      const dateB = new Date(b.node.frontmatter?.date || b.node.isoDate);
      return dateB - dateA;
    })
    .map((e) => {
      if (e.node.frontmatter?.date) {
        const { date, excerpt, featured, title, path } = e.node.frontmatter;
        return (
          <li key={e.node.id}>
            <div
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={path} itemProp="url">
                    <span itemProp="headline">{toTitleCase(title)}</span>
                  </Link>
                </h2>
                <small itemProp="date">{date}</small>
              </header>
              {featured && (
                <section>
                  <small
                    dangerouslySetInnerHTML={{
                      __html: excerpt || e.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              )}
            </div>
          </li>
        );
      } else {
        const { link, id, isoDate: date, title } = e.node;
        return (
          <li key={id} className="post-list-item">
            <header>
              <h2 className="external-link">
                <a href={link} itemProp="url">
                  <span itemProp="headline">
                    {title}
                    {' ↗'}
                  </span>
                </a>
              </h2>
              <small itemProp="date">{date}</small>
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

  return feed
    .sort((a, b) => new Date(b.node.isoDate) - new Date(a.node.isoDate))
    .map((e) => {
      const { link, id, itunes, isoDate: date, title } = e.node;
      return (
        <li key={id} className="post-list-item">
          <header>
            <h2 className="external-link">
              <a href={link} itemProp="url">
                <span itemProp="headline">
                  {itunes.episode ? `${itunes.episode}: ${title}` : title}
                </span>
              </a>
            </h2>
            <small itemProp="date">{date}</small>
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
