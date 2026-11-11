import * as React from 'react';

import Layout from './layout';

// Shared by gatsby-browser.js and gatsby-ssr.js, which must wrap pages the
// same way. The layout stays mounted while the page inside it changes
export const wrapPageElement = ({ element, props }) => (
  <Layout location={props.location}>{element}</Layout>
);
