module.exports = {
  siteMetadata: {
    title: "Marc Collado's personal website",
    author: 'Marc Collado',
    shortName: 'collado.io',
    description:
      'An overly opinionated blog about my personal experiences at iomando, Ironhack, or Radio Lanza — plus a miscellaneous discussion around the Internet, technology, education, health and great products in general.',
    siteUrl: 'https://www.collado.io',
    twitter: '@MarcCollado',
    image: '/static/img/marc-collado.jpg',
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
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links'
  ]
};
