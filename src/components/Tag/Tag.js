import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import * as styles from './Tag.module.css';

const Tag = ({ children }) => (
  <div className={styles.tag}>
    <span className={styles.tag__hash}>#</span>
    <Link className={styles.tag__link} to={`/tags/${children}`}>
      {`${children}`.toLowerCase()}
    </Link>
  </div>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Tag;
