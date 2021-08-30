import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as styles from './BlogPostMeta.module.css';
import Published from '../published';
import Tag from '../tag';

const BlogPostMeta = ({ date, tags, next, prev }) => (
  <>
    <div className={styles.nav__container}>
      <div
        className={prev ? styles.prev : `${styles.prev}, ${styles.disabled}`}
      >
        <span
          className={
            prev ? styles.arrow : `${styles.arrow}, ${styles.disabled}`
          }
        >
          {`—— `}
        </span>
        <Link className={styles.prev__link} to={prev}>
          previous post
        </Link>
      </div>
      <div
        className={next ? styles.next : `${styles.next}, ${styles.disabled}`}
      >
        <Link className={styles.next__link} to={next}>
          next post
        </Link>
        <span
          className={
            next ? styles.arrow : `${styles.arrow}, ${styles.disabled}`
          }
        >
          {` ——`}
        </span>
      </div>
    </div>
    <hr className={styles.line} />
    <div className={styles.meta}>
      <Published date={date} />
      <div className={styles.tag__container}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  </>
);

BlogPostMeta.propTypes = {
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  next: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired,
};

export default BlogPostMeta;
