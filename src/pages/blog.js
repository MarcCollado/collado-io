import React from 'react';
import { graphql } from 'gatsby';

import Header from '../components/header';
import Layout from '../components/layout';

import { renderPosts } from '../utils/helpers';

const BlogPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout
      article={false}
      description="Things I've written"
      image={null}
      pathname={location.pathname}
      title="Blog"
    >
      <Header title="Blog" subtitle="Things I've written" />
      {renderPosts(posts)}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { nin: ["books", "now"] } }
      }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
  }
`;

export default BlogPage;
