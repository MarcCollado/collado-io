module.exports = {
  siteMetadata: {
    title: 'Marc Collado — collado.io',
    description:
      'Marc Collado personal website — iomando, Ironhack, Radio Lanza, Gamestry, Safareig.',
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
              width: 800,
              related: false,
              noIframeBorder: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 75,
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
        defaultQuality: 75,
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
