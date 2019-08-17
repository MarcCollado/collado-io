import React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styles from './Layout.module.css';
import { Snackbar } from '../Snackbar';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import SEO from '../../utils/seo';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderSnackBar: true };
  }

  componentDidMount() {
    const token = localStorage.getItem('collado.io:token');
    if (token) {
      this.shouldSnackBarRender(JSON.parse(token));
    }
  }

  shouldSnackBarRender = (token) => {
    const timeNow = Date.now();
    const timeToken = token.timestamp;
    const timeDiff = timeNow - timeToken;
    const timeDiffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
    // timeDiff < 24h honor user prefs for the day and do not show SnackBar
    // timeDiff > 24h reset SnackBar state
    if (timeDiffInHours < 24) {
      this.setState({ renderSnackBar: false });
    }
  };

  renewToken = (timeNow) => {
    const token = {
      timestamp: timeNow,
      renderSnackBar: false
    };
    localStorage.setItem('collado.io:token', JSON.stringify(token));
  };

  handleUnmountSnackBar = () => {
    const timeNow = new Date().getTime();
    this.renewToken(timeNow);
    this.setState({ renderSnackBar: false });
  };

  render() {
    const {
      children,
      title,
      description,
      pathname,
      image,
      article
    } = this.props;
    const { renderSnackBar } = this.state;

    return (
      <div className={styles.out__container}>
        <SEO
          title={title}
          description={description}
          pathname={pathname}
          image={image}
          article={article}
        />
        {renderSnackBar ? (
          <Snackbar unmount={this.handleUnmountSnackBar} />
        ) : null}
        <Navbar />
        <div className={styles.in__container}>{children}</div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  image: PropTypes.string,
  article: PropTypes.bool
};

Layout.defaultProps = {
  image: null,
  article: false
};

export default Layout;
