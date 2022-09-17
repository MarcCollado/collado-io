import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Now = ({ location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Now, now, now...`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Now, now, now..." />
      <p className="global-header">Welcome! To the,</p>
      <h1 className="main-heading">About Page</h1>
      <p>Lorem ipsum...</p>
      <h2>Work</h2>
      <p>Lorem ipsum...</p>
      <h2>Side projects</h2>
      <p>Lorem ipsum...</p>
    </Layout>
  );
};

export default Now;
