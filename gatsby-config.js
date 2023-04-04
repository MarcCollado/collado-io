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
            resolve: 'gatsby-plugin-react-svg',
            options: {
              rule: {
                include: /icons/,
              },
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // RSS FEED — BLOG
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
                    frontmatter: { tags: { nin: ["drafts", "now"] } }
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
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-twitter`,
    `gatsby-transformer-sharp`,
  ],
  trailingSlash: `never`,
};
