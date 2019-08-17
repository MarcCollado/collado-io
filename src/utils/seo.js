import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import OpenGraph from './og';
import marc from '../../static/img/marc-collado.jpg';
import favicon16 from '../../static/favicon/favicon-16x16.png';
import favicon32 from '../../static/favicon/favicon-32x32.png';
import favicon96 from '../../static/favicon/favicon-96x96.png';
import favicon196 from '../../static/favicon/favicon-196x196.png';
import apple120 from '../../static/favicon/apple-touch-icon-120x120.png';
import apple152 from '../../static/favicon/apple-touch-icon-152x152.png';

const query = graphql`
  query SEO {
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
`;

const SEO = ({ title, description, pathname, image, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          defaultDescription,
          siteUrl,
          author,
          shortName,
          twitter,
          siteLanguage
        }
      }
    }) => {
      const seo = {
        // Composed attributes
        title: `${defaultTitle} — ${title}`,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname || '/'}`,
        image: image || marc,
        // Layout props attributes
        article,
        // GraphQL siteMetaData
        author,
        shortName,
        twitter,
        siteLanguage
      };

      return (
        <>
          <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
            <meta name="apple-mobile-web-app-title" content={seo.shortName} />
            <meta name="application-name" content={seo.shortName} />
            <meta
              name="google-site-verification"
              content="vFwB-R5enzdQD5dGriZ1LWEt8Vs2gS9FPjXeeCg4LAI"
            />
            <html lang={seo.siteLanguage} />
            <link rel="icon" type="image/png" href={favicon16} sizes="16x16" />
            <link rel="icon" type="image/png" href={favicon32} sizes="32x32" />
            <link rel="icon" type="image/png" href={favicon96} sizes="96x96" />
            <link
              rel="icon"
              type="image/png"
              href={favicon196}
              sizes="196x196"
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="120x120"
              href={apple120}
            />
            <link
              rel="apple-touch-icon-precomposed"
              sizes="152x152"
              href={apple152}
            />
          </Helmet>
          <OpenGraph
            title={seo.title}
            description={seo.description}
            url={seo.url}
            image={seo.image}
            article={seo.article}
            username={seo.twitter}
          />
        </>
      );
    }}
  />
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  article: PropTypes.bool.isRequired
};

export default SEO;
