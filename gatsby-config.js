module.exports = {
  siteMetadata: {
    title: `Marc Collado`,
    description: `Marc Collado — personal website`,
    siteUrl: `https://www.collado.io`,
    siteLanguage: `en`,
    author: {
      name: `Marc Collado`,
    },
    social: {
      email: `marc@collado.io`,
      twitter: `@MarcCollado`,
    },
  },
  plugins: [
    // FILESYSTEM
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/content/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/content/md`,
      },
    },
    // MARKDOWN
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 960,
              related: false,
              noIframeBorder: true,
              loadingStrategy: 'lazy',
            },
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
              showCaptions: false,
              quality: 80,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    // IMAGES & ASSETS
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 100,
        },
      },
    },
    `gatsby-transformer-sharp`,
    // OFFLINE -> https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Marc Collado`,
        short_name: `Marc Collado`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#B3E4C8`,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
        lang: `en`,
      },
    },
    `gatsby-plugin-offline`,
    // UTILS & HELPERS
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-twitter`,
  ],
};
