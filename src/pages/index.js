import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { extractMarkdown } from '../utils/helpers';

const HomePage = ({ data, location }) => {
  const md = extractMarkdown(data.md.edges);

  return (
    <Layout
      article={false}
      coverImage={false}
      md={md}
      pathname={location.pathname}
      seoImage={false}
    />
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/index.md/" } }
      limit: 1
    ) {
      ...pageMarkdown
    }
  }
`;

export default HomePage;
