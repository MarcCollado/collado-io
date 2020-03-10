import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styles from './BlogCard.module.css';
import { PublishedAt } from '../PublishedAt';
// TODO: { title, date, excerpt } (even html and the rest of BlogPost params could be requested from the query) could be passed down as props to BlogPost through state (location.state) within the Link component. But the data doesn't persist on BlogPost upon refresh.
const BlogCard = ({ image, title, date, path, excerpt }) => (
  <Link className={styles.card__link} to={path}>
    <div className={styles.card__container}>
      {image && (
        <div className={styles.card__image}>
          <Img fluid={image} alt={title} />
        </div>
      )}
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>{title}</h2>
        <p className={styles.card__excerpt}>{excerpt}</p>
        {date && <PublishedAt date={date} />}
      </div>
    </div>
  </Link>
);

BlogCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  path: PropTypes.string.isRequired,
  excerpt: PropTypes.string
};

BlogCard.defaultProps = {
  image: '',
  date: '',
  excerpt: ''
};

export default BlogCard;
