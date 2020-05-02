import React from 'react';
import PropTypes from 'prop-types';
import styles from './Snackbar.module.css';

const Snackbar = ({ unmount }) => (
  <div className={styles.snackbar__container}>
    <p className={styles.snackbar__text}>
      {`🎧 Jimmy Flores and I just launched a new podcast:`}{' '}
      <a href="/work/radio-lanza"> say hi to Radio Lanza</a>
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
