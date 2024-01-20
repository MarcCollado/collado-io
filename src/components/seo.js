import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import favicon from '../../static/favicon.ico';
import seoImage from '../../static/marc-avatar.png';

const Seo = ({ pageDescription, pageTitle, pathname }) => {
  const { site } = useStaticQuery(graphql`
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
            strava
            twitter
          }
        }
      }
    }
  `);

  const author = site.siteMetadata?.author.name;
  const authorEmail = site.siteMetadata?.social.email;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const image = seoImage;
  const language = site.siteMetadata?.siteLanguage;
  const title = pageTitle || site.siteMetadata?.defaultTitle;
  const url = pathname
    ? `${site.siteMetadata?.siteUrl}${pathname}`
    : site.siteMetadata?.siteUrl;

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

        // OG TAGS — https://opengraphprotocol.org
        { property: `og:title`, content: title },
        { property: `og:description`, content: description },
        { property: `og:image`, content: image },
        { property: `og:url`, content: url },
        { property: `og:email`, content: authorEmail },

        // COLORED TABS
        { name: `theme-color`, content: `#19e597` },
      ]}
    >
      <link rel="icon" type="image/x-icon" href={favicon} />
    </Helmet>
  );
};

export default Seo;
