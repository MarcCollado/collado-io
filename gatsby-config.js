module.exports = {
  siteMetadata: {
    title: "Marc Collado's Personal Website.",
    shortName: 'Marc',
    author: 'Marc Collado',
    siteLanguage: 'en',
    image: '/static/img/marc-collado.jpg',
    description:
      'An opinionated blog about my experiences at iomando and Ironhack, plus a miscellaneous discussion around technology, education, health and great products in general.',
    siteUrl: 'https://www.collado.io',
    twitter: '@MarcCollado'
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

    // Utils & Helpers
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-131366514-1',
        respectDNT: true
      }
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-netlify-cms'
  ]
};
