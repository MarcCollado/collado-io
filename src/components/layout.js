import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

// import SEO from '';

const Layout = ({ children, location }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;

  return (
    <div className="global-wrapper">
      <nav className="global-navbar">
        <Link
          className="global-navbar-image-link"
          data-is-root-path={isRootPath}
          to="/"
        >
          <StaticImage
            className="global-navbar-image"
            layout="fixed"
            formats={['auto', 'webp', 'avif']}
            src="../../static/marc-avatar.png"
            width={50}
            height={50}
            quality={100}
            alt="Marc Collado's profile picture"
          />
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
          to="/about"
        >
          About
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
