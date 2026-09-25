import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import seoImage from '../../static/marc-avatar.jpg';

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
          siteName: title
          tagline
          defaultDescription: description
          siteLanguage
          siteUrl
          social {
            email
            twitter
            github
            linkedin
            wikidata
          }
          person {
            description
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
  const siteName = site.siteMetadata?.siteName;
  const defaultLanguage = (site.siteMetadata?.siteLanguage || '').trim();
  const language = pageLanguage || defaultLanguage;
  // Every page carries the name: "Blog — Marc Collado"; the home page
  // leads with it: "Marc Collado — product, podcasts and writing"
  const tagline = site.siteMetadata?.tagline;
  const title = pageTitle
    ? `${pageTitle} — ${siteName}`
    : [siteName, tagline].filter(Boolean).join(' — ');
  const description = pageDescription || site.siteMetadata?.defaultDescription;
  const url = pathname ? `${siteUrl}${pathname}` : siteUrl;
  const social = site.siteMetadata?.social || {};
  const person = site.siteMetadata?.person || {};

  const imagePath = seoImage || '';
  const image = imagePath.startsWith('http')
    ? imagePath
    : `${siteUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  const canonicalUrl = url || siteUrl;

  // sameAs lists profiles that identify the person, not related sites
  const socialProfiles = [];
  if (social.twitter) {
    socialProfiles.push(
      `https://twitter.com/${social.twitter.replace(/^@/, '')}`,
    );
  }
  if (social.github) socialProfiles.push(social.github);
  if (social.linkedin) socialProfiles.push(social.linkedin);
  if (social.wikidata) socialProfiles.push(social.wikidata);

  const personId = person.id || `${siteUrl}/#person`;

  const personStructuredData = {
    '@type': 'Person',
    '@id': personId,
    name: author,
    url: siteUrl,
    // A fixed bio, so every page describes the person the same way
    ...(person.description ? { description: person.description } : {}),
    image,
    ...(social.email ? { email: social.email } : {}),
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

  // Home page only: tells Google which name to show for the site
  const websiteStructuredData = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: siteName,
    url: `${siteUrl}/`,
    inLanguage: defaultLanguage,
    publisher: { '@id': personId },
  };

  const profileStructuredData = {
    '@type': 'ProfilePage',
    url,
    name: title,
    inLanguage: language,
    mainEntity: { '@id': personId },
  };

  const articleStructuredData = {
    '@type': 'BlogPosting',
    inLanguage: language,
    headline: pageTitle,
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

  // One graph per page, so the other nodes can reference the Person by @id
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      personStructuredData,
      ...(pathname === '/' ? [websiteStructuredData] : []),
      ...(type === 'profile' ? [profileStructuredData] : []),
      ...(type === 'article' ? [articleStructuredData] : []),
    ],
  };

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
      <meta property="og:site_name" content={siteName} />
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

      {/* TWITTER TAGS (`summary` fits the square avatar without cropping) */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:site" content={social.twitter} />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:image:alt" content={title} />

      {/* ICONS (plain paths: small files would otherwise be inlined as data URIs) */}
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
