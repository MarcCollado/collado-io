import React from 'react';
import { graphql } from 'gatsby';
// import PropTypes from 'prop-types';

// Components
import Header from '../components/header';
import Layout from '../components/layout';

// Utils
import { renderPosts, extractPageInfo } from '../utils/helpers';

const NowPage = ({ data, location }) => {
  const pageInfo = extractPageInfo(data.pageInfo.edges);
  const posts = data.posts.edges;
  return (
    <Layout
      title={pageInfo.title}
      description={pageInfo.excerpt}
      pathname={location.pathname}
    >
      <Header title={pageInfo.title} subtitle={pageInfo.excerpt} />
      <div dangerouslySetInnerHTML={{ __html: pageInfo.html }} />
      {renderPosts(posts)}
    </Layout>
  );
};

export const query = graphql`
  {
    pageInfo: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/md/pages/now.md/" } }
    ) {
      ...pageInfo
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/src/content/md/posts/" }
        frontmatter: { tags: { in: ["now"] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...allPosts
    }
  }
`;

export default NowPage;
