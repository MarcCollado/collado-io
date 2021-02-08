module.exports = {
  siteMetadata: {
    title: `Marc Collado' personal website`,
    description:
      'An opinionated blog about my personal experiences at iomando, Ironhack, or Radio Lanza — plus a miscellaneous discussion around entrepreneurship, technology, education, health, and great products in general.',
    siteUrl: 'https://www.collado.io',
    shortName: 'collado.io',
    author: 'Marc Collado',
    twitter: '@MarcCollado',
    siteLanguage: 'en',
  },
  plugins: [
    // FILESYSTEM
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/img`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/markdown`,
      },
    },
    // MARKDOWN
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 75,
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              related: false,
              noIframeBorder: true,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    // IMAGES & ASSETS
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    // OFFLINE
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marc Collado's Personal Website`,
        short_name: `collado.io`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#b3e4c8`,
        display: `standalone`,
        icon: `static/favicon/icon.png`,
      },
    },
    // UTILS & HELPERS
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links',
  ],
};
