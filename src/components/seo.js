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
  pageLanguage,
  pageRobots = 'index,follow',
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
            github
            linkedin
            focaterra
            rssCom
            wikidata
          }
          person {
            jobTitle
            worksFor {
              name
              url
            }
            address {
              addressLocality
              addressRegion
              addressCountry
            }
            knowsLanguage
            id
          }
        }
      }
    }
  `);

  const pathname = location?.pathname;
  const siteUrl = site.siteMetadata?.siteUrl || '';
  const author = site.siteMetadata?.author.name;
  const defaultLanguage = (site.siteMetadata?.siteLanguage || '').trim();
  const language = pageLanguage || defaultLanguage;
  const defaultTitle = site.siteMetadata?.defaultTitle;
  const title = pageTitle || defaultTitle;
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const url = pathname ? `${siteUrl}${pathname}` : siteUrl;
  const social = site.siteMetadata?.social || {};
  const person = site.siteMetadata?.person || {};

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
  if (social.github) socialProfiles.push(social.github);
  if (social.linkedin) socialProfiles.push(social.linkedin);
  if (social.focaterra) socialProfiles.push(social.focaterra);
  if (social.rssCom) socialProfiles.push(social.rssCom);
  if (social.wikidata) socialProfiles.push(social.wikidata);
  if (social.email) {
    socialProfiles.push(`mailto:${social.email}`);
  }

  const personId = person.id || `${siteUrl}/#person`;

  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: author,
    url: siteUrl,
    description,
    image,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.worksFor?.name
      ? {
          worksFor: {
            '@type': 'Organization',
            name: person.worksFor.name,
            ...(person.worksFor.url ? { url: person.worksFor.url } : {}),
          },
        }
      : {}),
    ...(person.address?.addressLocality
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: person.address.addressLocality,
            ...(person.address.addressRegion
              ? { addressRegion: person.address.addressRegion }
              : {}),
            ...(person.address.addressCountry
              ? { addressCountry: person.address.addressCountry }
              : {}),
          },
        }
      : {}),
    ...(person.knowsLanguage?.length
      ? { knowsLanguage: person.knowsLanguage }
      : {}),
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
  };

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: language,
    headline: title,
    description,
    image: [image],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: { '@id': personId },
    publisher: { '@id': personId },
    ...(articleSection ? { articleSection } : {}),
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    ...(modifiedTime ? { dateModified: modifiedTime } : {}),
  };

  // For article pages, emit a graph so the BlogPosting can resolve its @id
  // reference to the canonical Person on the same page.
  const structuredData =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@graph': [personStructuredData, articleStructuredData],
        }
      : personStructuredData;

  return (
    <>
      <html lang={language} />
      <title>{title}</title>

      {/* META TAGS */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="url" content={url} />
      <meta name="author" content={author} />
      <meta name="robots" content={pageRobots} />

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
