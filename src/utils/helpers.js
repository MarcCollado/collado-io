import React from 'react';
import { Link } from 'gatsby';

import ExternalLinkIcon from './../media/icons/external-link.svg';

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
    // Ad-hoc
    'collado.io',
    'ebay',
    'iomando',
    'v2',
  ];
  const upperCaseFilter = ['AI', 'API', 'II', 'III', 'IV', 'V'];
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

export function createFeed(data) {
  // Append "project" property to each collection
  data.posts.edges.map((e) => (e.node['project'] = 'collado.io'));
  data.safareigEpisodes.edges.map((e) => (e.node['project'] = 'safareig.fm'));
  data.fatEpisodes.edges.map((e) => (e.node['project'] = 'focaterra.com'));
  data.bugadaPosts.edges.map((e) => (e.node['project'] = 'bugada.blog'));

  // Create unified feed
  const blogPosts = data.posts.edges;
  const podcastEpisodes = [
    ...data.safareigEpisodes.edges,
    ...data.fatEpisodes.edges,
    ...data.bugadaPosts.edges,
  ];
  const feed = [...blogPosts, ...podcastEpisodes];

  // Sort unified feed by date
  return (
    feed
      .sort((a, b) => {
        const dateA = new Date(a.node.frontmatter?.date || a.node.isoDate);
        const dateB = new Date(b.node.frontmatter?.date || b.node.isoDate);
        return dateB - dateA;
      })
      // Render feed's item depending on the RSS source
      .map((e) => {
        if (e.node.frontmatter?.date) {
          const { date, excerpt, featured, title, path } = e.node.frontmatter;
          return (
            <li key={e.node.id}>
              <article
                className="post-list-item"
                // itemScope
                // itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={path} itemProp="url">
                      <span itemProp="title">{toTitleCase(title)}</span>
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
              </article>
            </li>
          );
        } else {
          const { link, id, itunes, isoDate: date, title } = e.node;
          return (
            <li key={id} className="post-list-item">
              <header>
                <h2 className="external-link">
                  <a href={link} itemProp="url">
                    <span itemProp="title">
                      {itunes?.episode
                        ? `${itunes.episode}: ${title}`
                        : `${title}`}{' '}
                      <ExternalLinkIcon />
                    </span>
                  </a>
                </h2>
                <small itemProp="date">{date}</small>
              </header>
            </li>
          );
        }
      })
  );
}
