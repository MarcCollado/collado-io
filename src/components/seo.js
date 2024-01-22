import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '../../static/favicon.ico';
import seoImage from '../../static/marc-avatar.png';

const Seo = ({ pageTitle, pageDescription, location, children }) => {
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
            twitter
          }
        }
      }
    }
  `);

  const { pathname } = location;
  const author = site.siteMetadata?.author.name;
  const image = seoImage;
  const language = site.siteMetadata?.siteLanguage;
  const title = pageTitle || site.siteMetadata?.defaultTitle;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const url = pathname
    ? `${site.siteMetadata?.siteUrl}${pathname}`
    : site.siteMetadata?.siteUrl;
  const social = site.siteMetadata?.social;

  return (
    <>
      <title>{title}</title>

      {/* HTML TAGS */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="url" content={url} />
      <meta name="author" content={author} />
      <meta name="language" content={language} />

      {/* OG TAGS */}
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:url" content={url} />

      {/* TWITTER TAGS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:creator" content={social.twitter} />

      {/* FAVICON */}
      <link rel="icon" type="image/x-icon" href={favicon} />

      {/* COLOR TABS */}
      <meta name="theme-color" content="#19e597" />

      {children}
    </>
  );
};

export default Seo;
