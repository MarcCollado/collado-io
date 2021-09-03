module.exports = {
  siteMetadata: {
    title: 'Marc Collado',
    description: 'Marc Collado personal website',
    siteUrl: 'https://www.collado.io',
    shortName: 'collado.io',
    author: 'Marc Collado',
    email: 'marc@collado.io',
    twitter: '@MarcCollado',
    siteLanguage: 'en',
  },
  plugins: [
    // FILESYSTEM
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/src/content/img`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown',
        path: `${__dirname}/src/content/md`,
      },
    },
    // MARKDOWN
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 960,
              related: false,
              noIframeBorder: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 80,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    // IMAGES & ASSETS
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: true,
        defaultQuality: 80,
      },
    },
    // UTILS & HELPERS
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-styled-components`,
    'gatsby-plugin-twitter',
  ],
};
