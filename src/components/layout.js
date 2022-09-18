import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

// import SEO from '';

const Layout = ({ children, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <nav className="global-navbar">
        <Link className="global-navbar-image-link" to="/">
          <StaticImage
            className="global-navbar-avatar"
            layout="fixed"
            formats={['auto', 'webp', 'avif']}
            src="../../static/marc-avatar.png"
            width={50}
            height={50}
            quality={80}
            alt="Marc Collado — profile picture"
          />
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'active-global-navbar-link'}
          to="/"
        >
          About
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'active-global-navbar-link'}
          to="/blog"
        >
          Blog
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'active-global-navbar-link'}
          to="/now"
        >
          Now
        </Link>
      </nav>
      <main>{children}</main>
      <footer className="footer">
        © {new Date().getFullYear()} — Built from sunny Barcelona ☀️
      </footer>
    </div>
  );
};

export default Layout;
