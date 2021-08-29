import React from 'react';
import { graphql } from 'gatsby';

// Components
import Header from '../components/header';
import Layout from '../components/layout';

// Utils
import { renderPosts } from '../utils/helpers';

const BlogPage = ({ data, location }) => {
  const allPosts = data.allMarkdownRemark.edges;
  return (
    <Layout
      title="Blog"
      description="Things I've written"
      pathname={location.pathname}
    >
      <Header title="Blog" subtitle="Things I've written" />
      {renderPosts(allPosts)}
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
