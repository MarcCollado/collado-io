import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import OpenGraph from './og';
import marc from '../../static/marc-collado.jpg';
import favicon from '../../static/favicon.png';

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

const SEO = ({ article, description, image, pathname, title }) => (
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
          siteLanguage,
        },
      },
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
        siteLanguage,
      };

      return (
        <>
          <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
            <meta
              name="google-site-verification"
              content="vFwB-R5enzdQD5dGriZ1LWEt8Vs2gS9FPjXeeCg4LAI"
            />
            <html lang={seo.siteLanguage} />
            <link rel="icon" type="image/x-icon" href={favicon} />
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
  article: PropTypes.bool.isRequired,
};

export default SEO;
