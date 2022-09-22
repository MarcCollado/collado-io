import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import favicon from '../../static/favicon.ico';
import seoImage from '../../static/marc-avatar.png';

const SEO = ({
  meta = [],
  pageDescription,
  pageImage,
  pageTitle,
  location,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author {
              name
            }
            defaultTitle: title
            defaultDescription: description
            siteLanguage
            siteUrl
            social {
              email
              github
              linkedin
              reddit
              strava
              twitter
            }
          }
        }
      }
    `
  );

  const author = site.siteMetadata?.author.name;
  const authorEmail = site.siteMetadata?.social.email;
  const authorTwitter = site.siteMetadata?.social.twitter;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const image = pageImage || seoImage;
  const language = site.siteMetadata?.siteLanguage || `EN`;
  const title = pageTitle || site.siteMetadata?.defaultTitle;
  const url =
    `${site.siteMetadata?.siteUrl}${location.pathname}` ||
    site.siteMetadata?.siteUrl;

  return (
    <Helmet
      title={title}
      meta={[
        // HTML TAGS — https://gist.github.com/whitingx/3840905
        { name: `description`, content: description },
        { name: `image`, content: image },
        { name: `url`, content: url },
        { name: `author`, content: author },
        { name: `language`, content: language },

        // OG TAGS — https://opengraphprotocol.org
        { property: `og:title`, content: title },
        { property: `og:description`, content: description },
        { property: `og:image`, content: image },
        { property: `og:url`, content: url },
        { property: `og:email`, content: authorEmail },

        // TWITTER CARD
        // { name: `twitter:title`, content: title },
        // { name: `twitter:description`, content: description },
        // { name: `twitter:image`, content: image },
        // { name: `twitter:creator`, content: twitter },
        // { name: `twitter:card`, content: `summary_large_image` },

        // COLORED TABS
        { name: `theme-color`, content: `#19e597` },
      ].concat(meta)}
    >
      <link rel="icon" type="image/x-icon" href={favicon} />
    </Helmet>
  );
};

export default SEO;
