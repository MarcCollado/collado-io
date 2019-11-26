module.exports = {
  siteMetadata: {
    title: `Marc Collado' personal website`,
    description:
      'An opinionated blog about my personal experiences at iomando, Ironhack, or Radio Lanza — plus a miscellaneous discussion around entrepreneurship, technology, education, health, and great products in general.',
    siteUrl: 'https://www.collado.io',
    shortName: 'collado.io',
    author: 'Marc Collado',
    twitter: '@MarcCollado',
    siteLanguage: 'en'
  },
  plugins: [
    // Source filesystem
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/img`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/markdown`
      }
    },
    // Markdown parser
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 75
            }
          },

          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              related: false,
              noIframeBorder: true
            }
          },
          'gatsby-remark-responsive-iframe'
        ]
      }
    },
    // Image processing
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: true,
        defaultQuality: 75
      }
    },
    'gatsby-transformer-sharp',
    // Offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marc Collado's Personal Website`,
        short_name: `collado.io`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#b3e4c8`,
        display: `standalone`,
        icon: `static/favicon/icon.png`
      }
    },
    `gatsby-plugin-offline`,
    // Utils & Helpers
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://d5f01249b62045b8a9ae3a529b781008@sentry.io/1835268'
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links'
  ]
};
