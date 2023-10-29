import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Seo from './seo';
import DarkMode from '../utils/dark';

const Layout = ({ children, location, seoData = {} }) => {
  const { pathname } = location;
  const { pageDescription, pageTitle } = seoData;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = pathname === rootPath;

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
            src="../../static/favicon.ico"
            width={50}
            height={50}
            quality={100}
            alt="Marc Collado's profile picture"
          />
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'global-navbar-link-active'}
          to="/blog"
        >
          Blog
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'global-navbar-link-active'}
          to="/podcast"
        >
          Podcast
        </Link>
        <Link
          className="global-navbar-link"
          activeClassName={'global-navbar-link-active'}
          to="/about"
        >
          About
        </Link>
        <DarkMode />
      </nav>
      <Seo
        pageDescription={pageDescription}
        pageTitle={pageTitle}
        pathname={pathname}
      ></Seo>
      <main>{children}</main>
      <footer>
        <small>
          {`© ${new Date().getFullYear()}`}
          {` · `}
          {process.env.NODE_ENV === 'development' ? (
            <a href="https://develop--collado-io.netlify.app/rss.xml">RSS</a>
          ) : (
            <a href="https://www.collado.io/rss.xml">RSS</a>
          )}
          {` · `}
          <a href="https://twitter.com/MarcCollado/">@MarcCollado</a>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
