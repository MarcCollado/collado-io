import React from 'react';
import { graphql } from 'gatsby';

// Components
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';

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
      <Header title="Blog" tagline="Things I've written" />
      {renderPosts(allPosts)}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
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
