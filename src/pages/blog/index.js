import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { renderAllBlogCards } from '../../utils/helpers';

const BlogPage = ({ data, location }) => {
  const allBlogPosts = data.allMarkdownRemark.edges;
  return (
    <Layout
      title="Blog"
      description="Things I've written"
      pathname={location.pathname}
    >
      <Header title="Blog" tagline="Things I've written" />
      {renderAllBlogCards(allBlogPosts)}
    </Layout>
  );
};

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/posts/" } }
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allBlogPosts
    }
  }
`;

BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string,
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              date: PropTypes.string,
              path: PropTypes.string,
              tags: PropTypes.arrayOf(PropTypes.string),
              featured: PropTypes.string,
              excerpt: PropTypes.string,
              source: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }).isRequired,
};

export default BlogPage;
