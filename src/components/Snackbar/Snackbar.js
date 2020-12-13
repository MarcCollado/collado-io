import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './Snackbar.module.css';

const Snackbar = ({ unmount }) => (
  <div className={styles.snackbar__container}>
    <p className={styles.snackbar__text}>
      {`🎙 Ramon Gilabert and I just launched a new podcast —`}{' '}
      <Link to="/blog/2020/safareig"> say hi to Safareig</Link>
    </p>
    <button onClick={unmount} className={styles.snackbar__close}>
      <span>✕</span>
    </button>
  </div>
);

Snackbar.propTypes = {
  unmount: PropTypes.func.isRequired,
};

export default Snackbar;
