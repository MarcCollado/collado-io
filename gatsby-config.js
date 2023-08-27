require('dotenv').config({ path: `.env` });

module.exports = {
  siteMetadata: {
    author: {
      name: `Marc Collado`,
    },
    title: `Personal website — by Marc Collado`,
    description: `The place where I ramble on pretty much everything.`,
    siteLanguage: `en`,
    siteUrl: `https://www.collado.io`,
    social: {
      email: `marc@collado.io`,
      github: `https://github.com/MarcCollado/`,
      linkedin: `https://www.linkedin.com/in/MarcCollado/`,
      reddit: `https://www.reddit.com/user/MarcCollado/`,
      strava: `https://www.strava.com/athletes/MarcCollado/`,
      twitter: `https://twitter.com/MarcCollado/`,
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
        name: `markdown`,
        path: `${__dirname}/src/media/markdown`,
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
          `gatsby-remark-copy-linked-files`,
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.frontmatter.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    fileAbsolutePath: { regex: "/src/media/markdown/posts/" }
                    frontmatter: { tags: { nin: ["drafts"] } }
                  }
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    frontmatter {
                      date
                      excerpt
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
            match: '^/blog/20',
            output: '/rss.xml',
            title: 'Marc Collado',
          },
        ],
      },
    },
    // IMPORT EXTERNAL RSS FEED
    // https://github.com/mottox2/gatsby-source-rss-feed
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
    // FEED: BUGADA
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://safareig.netlify.app/rss.xml`,
        name: `Bugada`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-twitter`,
    `gatsby-transformer-sharp`,
  ],
  trailingSlash: `always`,
};
