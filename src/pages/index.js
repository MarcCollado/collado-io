import React from 'react';
import { graphql } from 'gatsby';

import Header from '../components/header';
import Layout from '../components/layout';

import { extractMarkdown } from '../utils/helpers';

const HomePage = ({ data, location }) => {
  const md = extractMarkdown(data.md.edges);

  return (
    <Layout
      article={false}
      description={md.excerpt}
      image={null}
      pathname={location.pathname}
      title={md.title}
    >
      <Header title={md.title} subtitle={md.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: md.html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/home.md/" } }
      limit: 1
    ) {
      ...pageMarkdown
    }
  }
`;

export default HomePage;
