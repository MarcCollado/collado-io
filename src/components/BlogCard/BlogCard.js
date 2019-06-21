import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './BlogCard.module.css';
import { PublishedAt } from '../PublishedAt';

const BlogCard = ({ title, date, path, excerpt }) => (
  <div className={styles.card}>
    <Link className={styles.card__link} to={path}>
      <h2 className={styles.card__title}>{title}</h2>
      <p className={styles.card__excerpt}>{excerpt}</p>
      <PublishedAt date={date} />
    </Link>
  </div>
);

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  excerpt: PropTypes.string
};

BlogCard.defaultProps = {
  excerpt: ''
};

export default BlogCard;
