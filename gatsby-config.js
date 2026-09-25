const cheerio = require('cheerio');
const { createFeedSanitizer } = require('./src/utils/feedSanitizer');
const { toTitleCase } = require('./src/utils/titleCase');

require('dotenv').config({ path: `.env` });

const sanitizeFeedHtml = createFeedSanitizer(cheerio);

module.exports = {
  siteMetadata: {
    author: {
      name: `Marc Collado`,
    },
    // Site name for og:site_name, WebSite structured data and page titles
    title: `Marc Collado`,
    description: `Thoughts on pretty much everything`,
    siteLanguage: `en`,
    siteUrl: `https://collado.io`,
    social: {
      email: `maroon_05_midway@icloud.com`,
      twitter: `@MarcCollado`,
      // Full URLs for sameAs (entity-graph disambiguation): only profiles
      // that identify the person, matching the Wikidata identifiers.
      // Empty strings are skipped by seo.js — fill in or leave blank.
      github: `https://github.com/MarcCollado`,
      linkedin: `https://linkedin.com/in/MarcCollado/`,
      wikidata: `https://www.wikidata.org/wiki/Q139658833`,
    },
    person: {
      // Same positioning string as the Wikidata description
      description: `Catalan entrepreneur and podcaster, Head of Product at RSS.com, co-host of Foc a Terra`,
      jobTitle: `Head of Product`,
      worksFor: {
        name: `RSS.com`,
        url: `https://rss.com`,
      },
      address: {
        addressLocality: `Barcelona`,
        addressRegion: `Catalonia`,
        addressCountry: `ES`,
      },
      knowsLanguage: [`ca`, `es`, `en`],
      // Stable identifier so other schemas can reference this Person via @id.
      // The fragment makes it unique per page-with-person while pointing back to the canonical URL.
      id: `https://collado.io/#marc-collado`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/media/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `static pages`,
        path: `${__dirname}/src/media/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/media/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              maxWidth: 630,
              related: false,
              noIframeBorder: true,
              loadingStrategy: 'lazy',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
              quality: 80,
              withWebp: true,
              loading: 'lazy',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-block-end: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              // offsetY: 0,
              icon: `<svg aria-hidden="true" width="18" height="18" viewBox="0 -3 16 16" version="1.1"  ><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `anchor-link`,
              // maintainCase: true,
              // removeAccents: true,
              isIconAfterHeader: true,
              // elements: [''],
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // RSS FEED — BLOG
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            output: '/rss.xml',
            title: 'Marc Collado',
            language: 'en',
            // Add Atom namespace + self link
            custom_namespaces: {
              atom: 'http://www.w3.org/2005/Atom',
            },
            custom_elements: [
              {
                'atom:link': {
                  _attr: {
                    href: 'https://collado.io/rss.xml',
                    rel: 'self',
                    type: 'application/rss+xml',
                  },
                },
              },
            ],

            // Query the latest Markdown posts: full content makes every item
            // heavy, and readers keep the items they've already fetched
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    fileAbsolutePath: { regex: "/src/media/posts/" }
                  }
                  sort: { frontmatter: { date: DESC } }
                  limit: 20
                ) {
                  nodes {
                    frontmatter {
                      date
                      excerpt
                      language
                      path
                      tags
                      title
                    }
                    html
                    id
                  }
                }
              }
            `,

            // Build feed items
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const { siteUrl } = site.siteMetadata;

              return allMarkdownRemark.nodes.map((node) => {
                const sanitizedHtml = sanitizeFeedHtml(node.html, siteUrl);

                return Object.assign({}, node.frontmatter, {
                  // Same casing as the on-page <h1>
                  title: toTitleCase(
                    node.frontmatter.title,
                    node.frontmatter.language,
                  ),
                  date: node.frontmatter.date,
                  description: node.frontmatter.excerpt,
                  url: siteUrl + node.frontmatter.path,
                  guid: siteUrl + node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': sanitizedHtml }],
                });
              });
            },
          },
        ],
      },
    },

    // IMPORT EXTERNAL RSS FEED
    // https://github.com/mottox2/gatsby-source-rss-feed
    // FEED: BUGADA
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://safareig.netlify.app/rss.xml`,
        name: `Bugada`,
      },
    },
    // FEED: FOC A TERRA
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://media.rss.com/focaterra/feed.xml`,
        name: `FocATerra`,
      },
    },
    // FEED: SAFAREIG
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://media.rss.com/safareig/feed.xml`,
        name: `Safareig`,
      },
    },
    // FEED: RADIO LANZA
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://feeds.simplecast.com/lR0q9QeN`,
        name: `RadioLanza`,
      },
    },
    // Client-side navigation for internal links inside Markdown content
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Tag archives are noindex (see tag-page.js), so keep them out
        excludes: [`/tags/*/`],
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-transformer-sharp`,
  ],
  trailingSlash: `always`,
};
