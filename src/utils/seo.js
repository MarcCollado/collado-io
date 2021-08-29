import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import marc from '../../static/marc-collado.jpg';
import favicon from '../../static/favicon.png';

const Seo = ({
  isArticle,
  meta = [],
  pageDescription,
  pageImage,
  pageTitle,
  pathname,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            shortName
            author
            twitter
            siteLanguage
          }
        }
      }
    `
  );

  const title = pageTitle || site.siteMetadata?.defaultTitle;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const url = `${site.siteMetadata?.siteUrl}${pathname || '/'}`;
  // const shortName = site.siteMetadata?.shortName;
  const author = site.siteMetadata?.author;
  // const email = site.siteMetadata?.email;
  const twitter = site.siteMetadata?.twitter;
  const language = site.siteMetadata?.siteLanguage || `en`;
  const image = marc;

  return (
    <Helmet
      title={title}
      meta={[
        // HTML TAGS — https://gist.github.com/whitingx/3840905
        { name: `description`, content: description },
        { name: `image`, content: image },
        { name: `language`, content: language },
        { name: `url`, content: url },
        { name: `author`, content: author },
        {
          name: `google-site-verification`,
          content: `vFwB-R5enzdQD5dGriZ1LWEt8Vs2gS9FPjXeeCg4LAI`,
        },

        // OG TAGS — https://opengraphprotocol.org
        { property: `og:title`, content: title },
        { property: `og:description`, content: description },
        { property: `og:image`, content: image },
        { property: `og:url`, content: url },
        // { property: `og:email`, content: email },
        {
          property: `og:type`,
          content: isArticle ? 'article' : 'website',
        },

        // TWITTER CARD
        { name: `twitter:title`, content: title },
        { name: `twitter:description`, content: description },
        { name: `twitter:image`, content: image },
        { name: `twitter:creator`, content: twitter },
        { name: `twitter:card`, content: `summary_large_image` },
      ].concat(meta)}
    >
      <link rel="icon" type="image/x-icon" href={favicon} />
    </Helmet>
  );
};

export default Seo;
