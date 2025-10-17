import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from '../../static/favicon.ico';
import seoImage from '../../static/marc-avatar.png';

const Seo = ({
  pageTitle,
  pageDescription,
  location,
  type = 'website',
  publishedTime,
  modifiedTime,
  articleSection,
  children,
}) => {
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

  const pathname = location?.pathname;
  const siteUrl = site.siteMetadata?.siteUrl || '';
  const author = site.siteMetadata?.author.name;
  const language = site.siteMetadata?.siteLanguage;
  const defaultTitle = site.siteMetadata?.defaultTitle;
  const title = pageTitle || defaultTitle;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const url = pathname ? `${siteUrl}${pathname}` : siteUrl;
  const social = site.siteMetadata?.social || {};

  const imagePath = seoImage || '';
  const image = imagePath.startsWith('http')
    ? imagePath
    : `${siteUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  const canonicalUrl = url || siteUrl;

  const socialProfiles = [];
  if (social.twitter) {
    socialProfiles.push(
      `https://twitter.com/${social.twitter.replace(/^@/, '')}`,
    );
  }
  if (social.email) {
    socialProfiles.push(`mailto:${social.email}`);
  }

  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author,
    url: siteUrl,
    description,
    image,
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: [image],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Person',
      name: author,
      url: siteUrl,
      ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    },
    publisher: {
      '@type': 'Person',
      name: author,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: image,
      },
    },
    ...(articleSection ? { articleSection } : {}),
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  };

  const structuredData =
    type === 'article' ? articleStructuredData : personStructuredData;

  return (
    <>
      <html lang={language} />
      <title>{title}</title>

      {/* META TAGS */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="url" content={url} />
      <meta name="author" content={author} />
      <meta name="robots" content="index,follow" />

      {/* OG TAGS (Open Graph requires the `property` attribute; others use `name`) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={defaultTitle} />
      {language && (
        <meta property="og:locale" content={language.replace('-', '_')} />
      )}
      <meta property="og:image:alt" content={title} />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}

      {/* TWITTER TAGS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:site" content={social.twitter} />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:image:alt" content={title} />

      {/* FAVICON */}
      <link rel="icon" type="image/x-icon" href={favicon} />
      <link rel="canonical" href={canonicalUrl} />

      {/* COLOR TABS */}
      <meta name="theme-color" content="#19e597" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {children}
    </>
  );
};

export default Seo;
