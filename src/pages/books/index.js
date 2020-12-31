import React from 'react';
import { graphql } from 'gatsby';
// import PropTypes from 'prop-types';

// Components
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';

// Utils
import { renderPosts, extractPageInfo } from '../../utils/helpers';

const BooksPage = ({ data, location }) => {
  const pageInfo = extractPageInfo(data.booksPageInfo.edges);
  const booksPosts = data.booksPosts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
    >
      <Header title={pageInfo.title} tagline={pageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      {renderPosts(booksPosts)}
    </Layout>
  );
};

export const query = graphql`
  {
    booksPageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/markdown/pages/books.md/" } }
    ) {
      ...pageInfo
    }
    booksPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        frontmatter: { tags: { in: ["books"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
  }
`;

export default BooksPage;
