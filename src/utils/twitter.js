import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

const Twitter = ({ card, username, title, description, image }) => (
  <Helmet>
    <meta name="twitter:card" content={card} />
    {username && <meta name="twitter:creator" content={username} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}
  </Helmet>
);

Twitter.propTypes = {
  card: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

Twitter.defaultProps = {
  card: 'summary_large_image',
  username: null,
  title: null,
  description: null,
  image: null
};

export default Twitter;
