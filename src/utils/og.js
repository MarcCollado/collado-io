import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const OpenGraph = ({ title, description, url, image, article, username }) => (
  <Helmet>
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
    {article ? (
      <meta property="og:type" content="article" />
    ) : (
      <meta property="og:type" content="website" />
    )}
    {username && <meta name="twitter:creator" content={username} />}
    <meta name="twitter:card" content="summary" />
  </Helmet>
);

OpenGraph.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  article: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};

export default OpenGraph;
