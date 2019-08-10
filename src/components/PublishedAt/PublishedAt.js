import React from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedAt.module.css';

const PublishedAt = ({ date }) => (
  <span>
    <p className={styles.date}>{`Published on ${date}`}</p>
  </span>
);

PublishedAt.propTypes = {
  date: PropTypes.string.isRequired
};

export default PublishedAt;
