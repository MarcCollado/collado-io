import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styles from './Layout.module.css';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import SEO from '../../utils/seo';

const Layout = ({ article, children, description, image, pathname, title }) => {
  return (
    <div className={styles.out__container}>
      <SEO
        title={title}
        description={description}
        pathname={pathname}
        image={image}
        article={article}
      />
      <Navbar />
      <div className={styles.in__container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  image: PropTypes.string,
  article: PropTypes.bool,
};

Layout.defaultProps = {
  image: '',
  article: false,
};

export default Layout;
