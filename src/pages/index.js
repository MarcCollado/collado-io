import React from 'react';
import { graphql } from 'gatsby';

import Header from '../components/header';
import { Layout } from '../components/Layout';

// Main Components

const HomePage = ({ data, location }) => {
  // const { frontmatter, html, id } = data.md.edges[0].node;
  const { frontmatter, html } = data.md.edges[0].node;
  // const { date, excerpt, path, title } = frontmatter;
  const { excerpt, title } = frontmatter;

  return (
    <Layout
      article={false}
      description={excerpt}
      image={null}
      pathname={location.pathname}
      title={title}
    >
      <Header title={title} subtitle={excerpt} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  {
    md: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/home.md/" } }
      limit: 1
    ) {
      ...pageInfo
    }
  }
`;

export default HomePage;
